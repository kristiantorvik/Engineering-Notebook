/* ── Thermodynamics Calculator ────────────────────────────────────── */
/* Static browser-side viewer for pre-generated thermodynamic tables. */
/* Loads: index.json → manifest.json → .meta.yaml → .csv             */
/* No backend, no interpolation, no CoolProp runtime.                 */

(function () {
  "use strict";

  /* ── Base path (relative to /calculators/thermodynamics/) ───────── */
  const BASE = "../../assets/thermodynamics-tables/";

  /* ── Process family display labels ─────────────────────────────── */
  const FAMILY_LABELS = {
    isobaric:    "Isobar",
    isochoric:   "Isokor",
    isothermal:  "Isoterm",
    isentropic:  "Isentropisk",
    isenthalpic: "Isentalpisk",
  };

  /* ── Priority columns for state summary card ────────────────────── */
  const PRIORITY_COLS = [
    "phase", "T_C", "T_K", "P_bar", "P_Pa",
    "h_kJ_kg", "s_kJ_kgK", "u_kJ_kg",
    "rho_kg_m3", "v_m3_kg", "q_quality",
    "cp_J_kgK", "cv_J_kgK",
  ];

  /* ── In-memory cache ────────────────────────────────────────────── */
  const _cache = { manifests: {}, meta: {}, csv: {} };

  /* ── UI state ───────────────────────────────────────────────────── */
  let _state = { medium: null, family: null, tableId: null, rowIdx: -1 };
  let _tableData = { headers: [], rows: [] };

  /* ══════════════════════════════════════════════════════════════════
     DATA LOADING
  ══════════════════════════════════════════════════════════════════ */

  async function fetchText(url) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status} fetching ${url}`);
    return resp.text();
  }

  async function fetchJSON(url) {
    const text = await fetchText(url);
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error(`JSON parse error at ${url}: ${e.message}`);
    }
  }

  async function loadIndex() {
    return fetchJSON(BASE + "index.json");
  }

  async function loadManifest(mediumId) {
    if (_cache.manifests[mediumId]) return _cache.manifests[mediumId];
    const data = await fetchJSON(BASE + mediumId + "/manifest.json");
    _cache.manifests[mediumId] = data;
    return data;
  }

  async function loadMeta(mediumId, metaPath) {
    const key = mediumId + "/" + metaPath;
    if (_cache.meta[key]) return _cache.meta[key];
    const text = await fetchText(BASE + mediumId + "/" + metaPath);
    const data = parseYAML(text);
    _cache.meta[key] = data;
    return data;
  }

  async function loadCSV(mediumId, csvPath) {
    const key = mediumId + "/" + csvPath;
    if (_cache.csv[key]) return _cache.csv[key];
    const text = await fetchText(BASE + mediumId + "/" + csvPath);
    const data = parseCSV(text);
    _cache.csv[key] = data;
    return data;
  }

  /* ══════════════════════════════════════════════════════════════════
     YAML PARSER  (handles the known meta.yaml format only)
     Supports: key: value, key: 'quoted', key: [], nested blocks
  ══════════════════════════════════════════════════════════════════ */

  function parseYAML(text) {
    const result = {};
    const lines = text.split(/\r?\n/);
    let i = 0;

    function parseValue(raw) {
      raw = raw.trim();
      if (raw === "[]") return [];
      if (raw === "true") return true;
      if (raw === "false") return false;
      if (raw === "null" || raw === "~") return null;
      if ((raw.startsWith("'") && raw.endsWith("'")) ||
          (raw.startsWith('"') && raw.endsWith('"'))) {
        return raw.slice(1, -1);
      }
      const num = Number(raw);
      if (raw !== "" && !isNaN(num)) return num;
      return raw;
    }

    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim() || line.trim().startsWith("#")) { i++; continue; }
      const indent = line.match(/^(\s*)/)[1].length;
      if (indent > 0) { i++; continue; } // skip orphan indented lines at top level
      const colon = line.indexOf(":");
      if (colon === -1) { i++; continue; }
      const key = line.slice(0, colon).trim();
      const rest = line.slice(colon + 1).trim();

      if (rest === "" || rest === "|" || rest === ">") {
        // Possibly a block — collect next indented lines as sub-object
        const sub = {};
        i++;
        while (i < lines.length) {
          const subLine = lines[i];
          if (!subLine.trim() || subLine.trim().startsWith("#")) { i++; continue; }
          const subIndent = subLine.match(/^(\s*)/)[1].length;
          if (subIndent === 0) break;
          const sc = subLine.indexOf(":");
          if (sc === -1) { i++; continue; }
          const sk = subLine.slice(subIndent, sc).trim();
          const sv = subLine.slice(sc + 1).trim();
          sub[sk] = parseValue(sv);
          i++;
        }
        result[key] = sub;
      } else {
        result[key] = parseValue(rest);
        i++;
      }
    }
    return result;
  }

  /* ══════════════════════════════════════════════════════════════════
     CSV PARSER
  ══════════════════════════════════════════════════════════════════ */

  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
    if (lines.length === 0) return { headers: [], rows: [] };
    const headers = lines[0].split(",");
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(",");
      const row = {};
      headers.forEach(function (h, j) {
        const raw = (parts[j] || "").trim();
        const num = parseFloat(raw);
        row[h] = isNaN(num) ? raw : num;
      });
      rows.push(row);
    }
    return { headers, rows };
  }

  /* ══════════════════════════════════════════════════════════════════
     FORMATTING HELPERS
  ══════════════════════════════════════════════════════════════════ */

  function fmtNum(v) {
    if (v === null || v === undefined || v === "") return "—";
    if (typeof v === "string") return v;
    if (!isFinite(v)) return "—";
    const abs = Math.abs(v);
    if (abs === 0) return "0";
    if (abs >= 1e9 || (abs > 0 && abs < 1e-4)) return v.toExponential(4);
    return parseFloat(v.toPrecision(6)).toString();
  }

  // Convert fixed_value + fixed_unit to human-readable string
  function fmtFixedValue(value, unit) {
    if (unit === "Pa") {
      if (value >= 1e6) return (value / 1e6).toPrecision(4).replace(/\.?0+$/, "") + " MPa";
      if (value >= 1e3) return (value / 1e3).toPrecision(4).replace(/\.?0+$/, "") + " kPa";
      return value + " Pa";
    }
    if (unit === "J/kg") {
      return (value / 1e3).toPrecision(4).replace(/\.?0+$/, "") + " kJ/kg";
    }
    if (unit === "J/kgK") {
      return (value / 1e3).toPrecision(4).replace(/\.?0+$/, "") + " kJ/(kg·K)";
    }
    if (unit === "K") return value + " K";
    if (unit === "m3/kg") return value + " m³/kg";
    return value + " " + unit;
  }

  // Friendly unit string for metadata display
  function fmtUnit(unit) {
    const map = {
      "Pa": "Pa", "J/kg": "kJ/kg", "J/kgK": "kJ/(kg·K)",
      "K": "K", "m3/kg": "m³/kg", "bar": "bar",
    };
    return map[unit] || unit;
  }

  // Friendly property name
  function fmtProperty(prop) {
    const map = {
      pressure: "Trykk (P)",
      temperature: "Temperatur (T)",
      specific_enthalpy: "Spesifikk entalpi (h)",
      specific_entropy: "Spesifikk entropi (s)",
      specific_volume: "Spesifikt volum (v)",
    };
    return map[prop] || prop;
  }

  // Human-readable column label for state card
  function fmtColLabel(col) {
    const map = {
      T_K: "T [K]", T_C: "T [°C]",
      P_Pa: "P [Pa]", P_bar: "P [bar]",
      rho_kg_m3: "ρ [kg/m³]", v_m3_kg: "v [m³/kg]",
      h_kJ_kg: "h [kJ/kg]", s_kJ_kgK: "s [kJ/(kg·K)]",
      u_kJ_kg: "u [kJ/kg]",
      q_quality: "Kvalitet (x)",
      cp_J_kgK: "cₚ [J/(kg·K)]", cv_J_kgK: "cᵥ [J/(kg·K)]",
      phase: "Fase",
    };
    return map[col] || col;
  }

  // Build table dropdown label from manifest entry
  function makeTableLabel(entry) {
    const fam = FAMILY_LABELS[entry.process_family] || entry.process_family;
    const val = fmtFixedValue(entry.fixed_value, entry.fixed_unit);
    // Determine sweep variable name from table_id suffix
    const m = entry.table_id.match(/sweep_(\w+)$/);
    const sweep = m ? m[1].charAt(0).toUpperCase() + m[1].slice(1) : "?";
    return `${fam} — ${val} — sweep ${sweep}`;
  }

  /* ══════════════════════════════════════════════════════════════════
     DOM HELPERS
  ══════════════════════════════════════════════════════════════════ */

  function el(id) { return document.getElementById(id); }

  function showStatus(msg, isError) {
    const box = el("tc-status");
    if (!msg) { box.style.display = "none"; return; }
    box.textContent = msg;
    box.className = "tc-status " + (isError ? "tc-status--error" : "tc-status--info");
    box.style.display = "block";
  }

  /* ══════════════════════════════════════════════════════════════════
     RENDER FUNCTIONS
  ══════════════════════════════════════════════════════════════════ */

  function renderMediumSelect(manifests) {
    const sel = el("tc-medium");
    sel.innerHTML = '<option value="">— Velg medium —</option>';
    manifests.forEach(function (m) {
      const opt = document.createElement("option");
      opt.value = m.medium_id;
      opt.textContent = m.display_name;
      sel.appendChild(opt);
    });
    sel.disabled = false;
  }

  function renderFamilySelect(families) {
    const sel = el("tc-family");
    sel.innerHTML = '<option value="">— Velg prosess —</option>';
    families.forEach(function (fam) {
      const opt = document.createElement("option");
      opt.value = fam;
      opt.textContent = FAMILY_LABELS[fam] || fam;
      sel.appendChild(opt);
    });
    sel.disabled = false;
  }

  function renderTableSelect(entries) {
    const sel = el("tc-table");
    sel.innerHTML = '<option value="">— Velg tabell —</option>';
    entries.forEach(function (entry) {
      const opt = document.createElement("option");
      opt.value = entry.table_id;
      opt.textContent = makeTableLabel(entry);
      if (entry.has_warnings) opt.textContent += " ⚠";
      sel.appendChild(opt);
    });
    sel.disabled = false;
  }

  function renderMetaPanel(meta) {
    const panel = el("tc-meta-panel");
    if (!meta) { panel.style.display = "none"; return; }

    const rows = [
      ["Stoff",              meta.medium_id || "—"],
      ["Prosess",            FAMILY_LABELS[meta.process_family] || meta.process_family],
      ["Konstant størrelse", fmtProperty(meta.constant_property)],
      ["Konstant verdi",     fmtFixedValue(meta.constant_value_si || meta.constant_value, meta.constant_unit)],
      ["Sweep-variabel",     meta.sweep_variable || "—"],
      ["Sweep-enhet",        meta.sweep_unit || "—"],
      ["Sweep start",        meta.sweep_range ? fmtNum(meta.sweep_range.start) + " " + (meta.sweep_unit || "") : "—"],
      ["Sweep stopp",        meta.sweep_range ? fmtNum(meta.sweep_range.stop)  + " " + (meta.sweep_unit || "") : "—"],
      ["Sweep steg",         meta.sweep_range ? fmtNum(meta.sweep_range.step)  + " " + (meta.sweep_unit || "") : "—"],
      ["Gyldige rader",      meta.valid_rows ?? "—"],
      ["Hoppet over",        meta.skipped_rows ?? "—"],
      ["Generert",           (meta.generated_at || "—").replace("T", " ").replace("Z", " UTC")],
    ];

    let html = '<div class="tc-meta-title">Tabellinfo</div><div class="tc-meta-grid">';
    rows.forEach(function ([k, v]) {
      html += `<span class="tc-meta-key">${k}</span><span class="tc-meta-val">${v}</span>`;
    });
    html += "</div>";
    panel.innerHTML = html;
    panel.style.display = "block";
  }

  function renderTableViewer(headers, rows) {
    const head = el("tc-table-head");
    const body = el("tc-table-body");

    // Header row
    let thHtml = "<tr>";
    headers.forEach(function (h) {
      thHtml += `<th title="${h}">${h}</th>`;
    });
    thHtml += "</tr>";
    head.innerHTML = thHtml;

    // Data rows
    let bodyHtml = "";
    rows.forEach(function (row, idx) {
      bodyHtml += `<tr data-idx="${idx}">`;
      headers.forEach(function (h) {
        const v = row[h];
        bodyHtml += `<td>${typeof v === "number" ? fmtNum(v) : (v ?? "—")}</td>`;
      });
      bodyHtml += "</tr>";
    });
    body.innerHTML = bodyHtml;

    // Attach click handlers
    body.querySelectorAll("tr").forEach(function (tr) {
      tr.addEventListener("click", function () {
        selectRow(parseInt(this.dataset.idx, 10));
      });
    });

    el("tc-table-section").style.display = "block";
  }

  function renderStateSummary(headers, row) {
    const grid = el("tc-state-grid");
    if (!row) { el("tc-state-card").style.display = "none"; return; }

    // Ordered: priority columns first, then any remaining
    const ordered = [];
    PRIORITY_COLS.forEach(function (col) {
      if (headers.includes(col)) ordered.push(col);
    });
    headers.forEach(function (col) {
      if (!ordered.includes(col)) ordered.push(col);
    });

    let html = "";
    ordered.forEach(function (col) {
      const v = row[col];
      if (v === undefined || v === null || v === "") return;
      const isPhase = col === "phase";
      const tileClass = isPhase ? "tc-state-tile tc-state-tile--phase" : "tc-state-tile";
      const label = fmtColLabel(col);
      const display = typeof v === "number" ? fmtNum(v) : v;
      html += `<div class="${tileClass}">
        <div class="tc-state-tile-label">${label}</div>
        <div class="tc-state-tile-value">${display}</div>
      </div>`;
    });

    grid.innerHTML = html;
    el("tc-state-card").style.display = "block";
  }

  /* ══════════════════════════════════════════════════════════════════
     ROW SELECTION
  ══════════════════════════════════════════════════════════════════ */

  function selectRow(idx) {
    const rows = _tableData.rows;
    if (!rows.length) return;
    idx = Math.max(0, Math.min(rows.length - 1, idx));
    _state.rowIdx = idx;

    // Highlight in table
    const body = el("tc-table-body");
    body.querySelectorAll("tr").forEach(function (tr) {
      tr.classList.toggle("tc-selected", parseInt(tr.dataset.idx, 10) === idx);
    });

    // Scroll selected row into view
    const selTr = body.querySelector("tr.tc-selected");
    if (selTr) selTr.scrollIntoView({ block: "nearest" });

    // Update counter
    el("tc-row-counter").textContent = `Rad ${idx + 1} / ${rows.length}`;

    // Nav buttons
    el("tc-prev").disabled = idx <= 0;
    el("tc-next").disabled = idx >= rows.length - 1;

    // State summary
    renderStateSummary(_tableData.headers, rows[idx]);
  }

  /* ══════════════════════════════════════════════════════════════════
     EVENT HANDLERS
  ══════════════════════════════════════════════════════════════════ */

  async function onMediumChange() {
    const mid = el("tc-medium").value;
    _state.medium = mid || null;
    _state.family = null;
    _state.tableId = null;
    _state.rowIdx = -1;

    // Reset downstream controls
    el("tc-family").innerHTML = '<option value="">— Velg prosess —</option>';
    el("tc-family").disabled = true;
    el("tc-table").innerHTML = '<option value="">— Velg tabell —</option>';
    el("tc-table").disabled = true;
    el("tc-meta-panel").style.display = "none";
    el("tc-table-section").style.display = "none";
    el("tc-state-card").style.display = "none";
    showStatus(null);

    if (!mid) return;

    try {
      showStatus("Laster manifest…", false);
      const manifest = await loadManifest(mid);
      // Extract unique families in order they appear
      const seen = new Set();
      const families = [];
      manifest.tables.forEach(function (t) {
        if (!seen.has(t.process_family)) {
          seen.add(t.process_family);
          families.push(t.process_family);
        }
      });
      renderFamilySelect(families);
      showStatus(null);
    } catch (e) {
      showStatus("Feil ved lasting av manifest: " + e.message, true);
    }
  }

  async function onFamilyChange() {
    const family = el("tc-family").value;
    _state.family = family || null;
    _state.tableId = null;
    _state.rowIdx = -1;

    el("tc-table").innerHTML = '<option value="">— Velg tabell —</option>';
    el("tc-table").disabled = true;
    el("tc-meta-panel").style.display = "none";
    el("tc-table-section").style.display = "none";
    el("tc-state-card").style.display = "none";
    showStatus(null);

    if (!family || !_state.medium) return;

    const manifest = _cache.manifests[_state.medium];
    if (!manifest) return;

    const entries = manifest.tables.filter(function (t) {
      return t.process_family === family;
    });
    renderTableSelect(entries);
  }

  async function onTableChange() {
    const tableId = el("tc-table").value;
    _state.tableId = tableId || null;
    _state.rowIdx = -1;

    el("tc-meta-panel").style.display = "none";
    el("tc-table-section").style.display = "none";
    el("tc-state-card").style.display = "none";
    showStatus(null);

    if (!tableId || !_state.medium) return;

    const manifest = _cache.manifests[_state.medium];
    const entry = manifest && manifest.tables.find(function (t) {
      return t.table_id === tableId;
    });
    if (!entry) { showStatus("Tabelloppføring ikke funnet.", true); return; }

    try {
      showStatus("Laster metadata og tabell…", false);

      const [meta, csvData] = await Promise.all([
        loadMeta(_state.medium, entry.meta_path),
        loadCSV(_state.medium, entry.csv_path),
      ]);

      _tableData = csvData;
      renderMetaPanel(meta);

      if (!csvData.rows.length) {
        showStatus("Tabellen er tom.", true);
        return;
      }

      renderTableViewer(csvData.headers, csvData.rows);

      // Nav button initial state
      el("tc-prev").disabled = true;
      el("tc-next").disabled = csvData.rows.length <= 1;
      el("tc-row-counter").textContent = `${csvData.rows.length} rader`;

      showStatus(null);
    } catch (e) {
      showStatus("Feil ved lasting av tabell: " + e.message, true);
    }
  }

  /* ══════════════════════════════════════════════════════════════════
     GLOBAL HANDLERS (referenced from onclick in HTML)
  ══════════════════════════════════════════════════════════════════ */

  window.tcNavPrev = function () { selectRow(_state.rowIdx - 1); };
  window.tcNavNext = function () { selectRow(_state.rowIdx + 1); };

  /* ══════════════════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════════════════ */

  async function init() {
    // Wire up change handlers
    el("tc-medium").addEventListener("change", onMediumChange);
    el("tc-family").addEventListener("change", onFamilyChange);
    el("tc-table").addEventListener("change", onTableChange);

    try {
      showStatus("Laster media-indeks…", false);
      const index = await loadIndex();
      if (!index.media || !index.media.length) {
        showStatus("Ingen media funnet i indeksen.", true);
        return;
      }

      // Load all manifests to get display names
      showStatus("Laster manifester…", false);
      const manifests = await Promise.all(
        index.media.map(function (mid) { return loadManifest(mid); })
      );
      renderMediumSelect(manifests);
      showStatus(null);
    } catch (e) {
      showStatus("Feil ved oppstart: " + e.message, true);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
