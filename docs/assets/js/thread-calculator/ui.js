// thread-calculator/ui.js
// Schema-driven UI renderer for the thread calculator.
// Builds the DOM from family config, renders output values, handles visibility.
//
// Public API:
//   TC.ui.init(containerId, state)  — rebuild full DOM for the given family/state
//   TC.ui.render(state, outputs)    — update output cells and row visibility
//   TC.ui.bindEvents(onChangeCb)    — attach change listeners; calls onChangeCb(fieldId, value)
//   TC.ui.applyVisibility(map)      — show/hide sections and fields by id
//
// Depends on: shared/formatting.js, shared/units.js, registry.js

(function () {
  "use strict";

  window.TC = window.TC || {};

  var _containerId   = null;
  var _currentFamily = null;   // current family module reference

  // ── DOM helpers ──────────────────────────────────────────────────────────────

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function txt(parent, text) {
    parent.appendChild(document.createTextNode(text));
    return parent;
  }

  function setVal(id, text) {
    var e = document.getElementById(id);
    if (e) e.textContent = text || "\u2014";
  }

  // ── Common fields (cross-family, rendered by ui.js, not family config) ───────

  var FAMILY_FIELD = {
    id: "family_select", label: "Gjengefamilie",
    type: "select",
  };

  var MODE_FIELD = {
    id: "mode_select", label: "Modus",
    type: "select",
  };

  // ── Build DOM ────────────────────────────────────────────────────────────────

  /**
   * Rebuild the entire calculator DOM for the given family.
   * @param {string} containerId  - id of the <div class="calc-card"> element
   * @param {Object} state        - current calculator state
   */
  function init(containerId, state) {
    _containerId = containerId;

    var container = document.getElementById(containerId);
    if (!container) {
      console.error("Thread calculator container not found: #" + containerId);
      return;
    }

    container.innerHTML = "";
    _currentFamily = TC.registry.get(state.familyId);

    // ── Top section: family and mode selectors ────────────────────────────────
    var topSection = el("div", "thr-section-block");
    topSection.id = "tc-section-top";



    var topGrid = el("div", "thr-grid-2");

    // Family selector
    topGrid.appendChild(buildSelectField(
      FAMILY_FIELD.id, FAMILY_FIELD.label,
      TC.registry.list().map(function (f) {
        return { value: f.id, label: f.meta.label };
      }),
      state.familyId
    ));

    // Mode selector (hidden if family has only one mode)
    var modeRow = buildSelectField(
      MODE_FIELD.id, MODE_FIELD.label,
      _currentFamily.meta.modes.map(function (m) {
        return { value: m, label: modeLabel(m) };
      }),
      state.mode
    );
    modeRow.id = "tc-row-mode_select";
    if (_currentFamily.meta.modes.length < 2) {
      modeRow.style.display = "none";
    }
    topGrid.appendChild(modeRow);

    topSection.appendChild(topGrid);
    container.appendChild(topSection);

    // ── Family illustration ───────────────────────────────────────────────────
    if (_currentFamily.meta.image) {
      var imgEl = el("img", "thr-family-img");
      imgEl.src = _currentFamily.meta.image;
      imgEl.alt = _currentFamily.meta.label;
      // Optional imageWidth (px) in family meta overrides the default CSS max-height constraint.
      if (_currentFamily.meta.imageWidth) {
        imgEl.style.maxHeight = "none";
        imgEl.style.width     = "100%";
        imgEl.style.maxWidth  = _currentFamily.meta.imageWidth + "px";
      }
      container.appendChild(imgEl);
    }

    // ── Family-specific sections ──────────────────────────────────────────────
    var sections = _currentFamily.config.sections;
    var fields   = _currentFamily.config.fields;

    sections.forEach(function (section) {
      var sectionEl = buildSection(section, fields, state);
      container.appendChild(sectionEl);
    });

    // ── Messages area ─────────────────────────────────────────────────────────
    var messages = el("div", "thr-messages");
    messages.id  = "tc-messages";
    container.appendChild(messages);
  }

  function modeLabel(mode) {
    switch (mode) {
      case "standard": return "Standard gjenge";
      case "by-input": return "Manuell inndata";
      default:         return mode;
    }
  }

  function buildSection(section, allFields, state) {
    var sectionEl = el("div", "thr-section-block");
    sectionEl.id = "tc-section-" + section.id;

    var header = el("div", "thr-section-header");
    header.textContent = section.label;
    sectionEl.appendChild(header);

    // Collect fields for this section
    var sectionFields = allFields.filter(function (f) {
      return f.section === section.id;
    });

    var inputFields  = sectionFields.filter(function (f) { return f.type !== "output"; });
    var outputFields = sectionFields.filter(function (f) { return f.type === "output"; });

    // Render editable inputs in a grid
    if (inputFields.length > 0) {
      var grid = el("div", inputFields.length === 1 ? "thr-grid-1" : "thr-grid-2");
      inputFields.forEach(function (field) {
        var row = buildInputField(field, state);
        grid.appendChild(row);
      });
      sectionEl.appendChild(grid);
    }

    // Render output fields as a table
    if (outputFields.length > 0) {
      var table = buildOutputTable(outputFields);
      sectionEl.appendChild(table);
    }

    return sectionEl;
  }

  function buildSelectField(id, label, options, currentValue) {
    var group = el("div", "thr-group");
    group.id  = "tc-row-" + id;

    var lbl = el("label");
    lbl.setAttribute("for", "tc-input-" + id);
    lbl.textContent = label;
    group.appendChild(lbl);

    var sel = el("select");
    sel.id = "tc-input-" + id;

    options.forEach(function (opt) {
      var o = document.createElement("option");
      o.value       = opt.value;
      o.textContent = opt.label;
      if (opt.value === currentValue) o.selected = true;
      sel.appendChild(o);
    });

    group.appendChild(sel);
    return group;
  }

  function buildInputField(field, state) {
    var group = el("div", "thr-group");
    group.id  = "tc-row-" + field.id;

    // Apply initial visibility
    if (field.visible && !field.visible(state)) {
      group.style.display = "none";
    }

    var lbl = el("label");
    lbl.setAttribute("for", "tc-input-" + field.id);
    lbl.textContent = field.label + (field.unit ? " (" + field.unit + ")" : "");
    group.appendChild(lbl);

    if (field.type === "select") {
      var sel = el("select");
      sel.id = "tc-input-" + field.id;
      var opts = field.options ? field.options(state) : [];
      opts.forEach(function (opt) {
        var o = document.createElement("option");
        o.value       = opt.value;
        o.textContent = opt.label;
        // Set default selection based on state
        var stateVal = stateValueFor(state, field.id);
        if (stateVal !== null && opt.value === String(stateVal)) o.selected = true;
        sel.appendChild(o);
      });
      group.appendChild(sel);

    } else {
      // number or integer
      var input = document.createElement("input");
      input.type  = "number";
      input.id    = "tc-input-" + field.id;
      input.step  = field.type === "integer" ? "1" : "any";
      input.min   = field.min !== undefined ? String(field.min) : "0";
      if (field.max !== undefined) input.max = String(field.max);

      var sv = stateValueFor(state, field.id);
      if (sv !== null && sv !== "") input.value = sv;
      if (field.placeholder) input.placeholder = field.placeholder(state) || "";

      group.appendChild(input);
    }

    return group;
  }

  function buildOutputTable(fields) {
    var wrapper = el("div", "thr-table-wrapper");

    var table = el("table", "thr-results-table");

    // Header row
    var thead = document.createElement("thead");
    var hrow  = document.createElement("tr");
    ["Felt", "Min", "Midt", "Maks", "Enh."].forEach(function (h, i) {
      var th = document.createElement("th");
      th.textContent = h;
      if (i === 0) th.className = "thr-th-label";
      hrow.appendChild(th);
    });
    thead.appendChild(hrow);
    table.appendChild(thead);

    // Data rows
    var tbody = document.createElement("tbody");
    fields.forEach(function (field) {
      var row = el("tr");
      row.id  = "tc-row-" + field.id;

      // Label cell
      var labelCell = document.createElement("td");
      labelCell.className   = "thr-td-label";
      labelCell.textContent = field.label;
      row.appendChild(labelCell);

      if (field.outputType === "range") {
        // Min / Midt / Maks / Unit
        ["min", "mid", "max"].forEach(function (which) {
          var td = document.createElement("td");
          td.className = "thr-td-val" + (which === "mid" ? " thr-mid" : "");
          td.id = "tc-cell-" + field.id + "-" + which;
          td.textContent = "\u2014";
          row.appendChild(td);
        });
        var unitTd = document.createElement("td");
        unitTd.className   = "thr-td-unit";
        unitTd.textContent = field.unit || "";
        row.appendChild(unitTd);

      } else {
        // Scalar: value spans min+midt, maks=unit
        var valTd = document.createElement("td");
        valTd.colSpan   = 2;
        valTd.className = "thr-td-val thr-mid";
        valTd.id        = "tc-cell-" + field.id + "-val";
        valTd.textContent = "\u2014";
        row.appendChild(valTd);

        var emptyTd = document.createElement("td");
        emptyTd.textContent = "";
        row.appendChild(emptyTd);

        var unitTd2 = document.createElement("td");
        unitTd2.className   = "thr-td-unit";
        unitTd2.textContent = field.unit || "";
        row.appendChild(unitTd2);
      }

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    wrapper.appendChild(table);
    return wrapper;
  }

  // ── Render (update values after resolve) ─────────────────────────────────────

  /**
   * Update all output cells and row/section visibility.
   * @param {Object} state   - resolved state
   * @param {Object} outputs - map of fieldId → output entry
   */
  function render(state, outputs) {
    if (!_currentFamily) return;

    var fields = _currentFamily.config.fields;

    // Update iso_size options when series changes (coarse ↔ fine)
    _refreshSelectOptions(state);

    // Update dynamic placeholders (e.g. best-wire hint updates when pitch changes)
    fields.forEach(function (field) {
      if (field.type !== "output" && field.placeholder) {
        var inputEl = document.getElementById("tc-input-" + field.id);
        if (inputEl) inputEl.placeholder = field.placeholder(state) || "";
      }
    });

    // Update each field
    fields.forEach(function (field) {
      // Visibility
      var rowEl = document.getElementById("tc-row-" + field.id);
      if (!rowEl) return;

      var visible = !field.visible || field.visible(state);
      rowEl.style.display = visible ? "" : "none";

      if (field.type !== "output") return;   // editable inputs: don't overwrite

      // Output: fill cells
      var out = outputs ? outputs[field.id] : undefined;
      var dash = "\u2014";

      if (!out || (out.type === "scalar" && (out.value === null || out.value === undefined || !isFinite(out.value)))) {
        if (field.outputType === "range") {
          setVal("tc-cell-" + field.id + "-min", dash);
          setVal("tc-cell-" + field.id + "-mid", dash);
          setVal("tc-cell-" + field.id + "-max", dash);
        } else {
          setVal("tc-cell-" + field.id + "-val", dash);
        }
        return;
      }

      var fmt = field.formatter || function (v) { return TC.fmt.number(v, 4); };

      if (field.outputType === "range") {
        var fmtOrDash = function (v) {
          return (v === null || v === undefined || !isFinite(v)) ? "\u2014" : fmt(v);
        };
        setVal("tc-cell-" + field.id + "-min", fmtOrDash(out.min));
        setVal("tc-cell-" + field.id + "-mid", fmtOrDash(out.mid));
        setVal("tc-cell-" + field.id + "-max", fmtOrDash(out.max));
      } else {
        setVal("tc-cell-" + field.id + "-val", fmt(out.value));
      }
    });

    // Mode selector visibility (hide if only one mode)
    var modeRow = document.getElementById("tc-row-mode_select");
    if (modeRow) {
      modeRow.style.display = _currentFamily.meta.modes.length < 2 ? "none" : "";
    }
  }

  /**
   * Apply section and field visibility from the resolve() visibility map.
   * Map keys are section element ids (e.g. "tc-section-section_by_input") or
   * field row ids (e.g. "tc-row-some_field").
   * @param {Object} visibility - map from element id to boolean
   */
  function applyVisibility(visibility) {
    if (!visibility) return;
    Object.keys(visibility).forEach(function (id) {
      var e = document.getElementById(id);
      if (e) e.style.display = visibility[id] ? "" : "none";
    });
  }

  /**
   * Show user messages (warnings and errors) in the messages area.
   * @param {Array} warnings
   * @param {Array} errors
   */
  function showMessages(warnings, errors) {
    var area = document.getElementById("tc-messages");
    if (!area) return;
    area.innerHTML = "";

    (errors || []).forEach(function (e) {
      var d = el("div", "thr-error");
      d.textContent = e.message;
      area.appendChild(d);
    });

    (warnings || []).forEach(function (w) {
      var d = el("div", "thr-warning");
      d.textContent = w.message;
      area.appendChild(d);
    });
  }

  // ── Event binding ─────────────────────────────────────────────────────────────

  /**
   * Bind change/input listeners to all editable controls.
   * @param {Function} onChangeCb - called as onChangeCb(fieldId, rawValue)
   */
  function bindEvents(onChangeCb) {
    if (!_containerId) return;
    var container = document.getElementById(_containerId);
    if (!container) return;

    // Common selectors: family and mode
    _bindControl("tc-input-" + FAMILY_FIELD.id, "change", FAMILY_FIELD.id, onChangeCb);
    _bindControl("tc-input-" + MODE_FIELD.id,   "change", MODE_FIELD.id,   onChangeCb);

    // Family-specific fields
    if (_currentFamily) {
      _currentFamily.config.fields.forEach(function (field) {
        if (field.type === "output") return;
        var evtType = field.type === "number" || field.type === "integer" ? "input" : "change";
        _bindControl("tc-input-" + field.id, evtType, field.id, onChangeCb);
      });
    }
  }

  function _bindControl(elemId, evtType, fieldId, cb) {
    var el = document.getElementById(elemId);
    if (!el) return;
    // Replace existing listener by cloning (simplest approach for re-init)
    el.addEventListener(evtType, function () {
      cb(fieldId, el.value);
    });
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  /**
   * Map state to the value a field's input element should show.
   * Used when populating inputs during init().
   */
  function stateValueFor(state, fieldId) {
    var map = {
      "iso_series":       state.isoFine ? "fine" : "coarse",
      "iso_size":         state.isoSizeKey,
      "input_major":      state.inputMajorDia,
      "input_pitch":      state.inputPitch,
      "input_starts":     state.inputStarts,
      "ext_class":        state.extClass,
      "int_class":        state.intClass,
      "npt_size":         state.nptSizeKey,
      "input_target_pct": state.inputTargetPct,
      "input_wire_dia":   state.inputWireDia || "",  // empty = auto (placeholder shows best wire)
    };
    var v = map[fieldId];
    return (v !== undefined) ? v : null;
  }

  /**
   * Refresh the iso_size dropdown options when the series (coarse/fine) changes.
   * Called at the start of render() to keep options in sync with state.
   */
  function _refreshSelectOptions(state) {
    if (state.familyId !== "iso-metric-60") return;

    var fields = _currentFamily.config.fields;
    var sizeField = null;
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].id === "iso_size") { sizeField = fields[i]; break; }
    }
    if (!sizeField) return;

    var selEl = document.getElementById("tc-input-iso_size");
    if (!selEl) return;

    var opts = sizeField.options(state);
    // Only rebuild if option count differs (avoids unnecessary DOM churn)
    if (selEl.options.length === opts.length) return;

    selEl.innerHTML = "";
    opts.forEach(function (opt) {
      var o = document.createElement("option");
      o.value       = opt.value;
      o.textContent = opt.label;
      if (opt.value === state.isoSizeKey) o.selected = true;
      selEl.appendChild(o);
    });
  }

  // ── Public API ────────────────────────────────────────────────────────────────

  TC.ui = {
    init:             init,
    render:           render,
    bindEvents:       bindEvents,
    applyVisibility:  applyVisibility,
    showMessages:     showMessages,
  };

})();
