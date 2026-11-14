/* ============================================================
   Bjelkekalkulator — bjelkekalkulator.js

   Deflection, bending moment and bending stress for the load
   cases in docs/notes/bjelkeformlar.md.

   Method (Euler–Bernoulli, constant EI):
     1. Build the bending moment M(x) from loads and reactions.
        Statically indeterminate supports are solved with the
        force method on a cantilever base system.
     2. Integrate EI·y'' = M twice and apply the support conditions.
     3. Stress: sigma = M_max / W.
   Solving numerically (instead of one closed formula per case)
   makes superposition with self-weight exact.

   Units inside the solver: N, mm, MPa.
   Standard profiles are read from the CSV files in
   docs/assets/staalprofiler-tabeller/csv/.
   ============================================================ */

(function () {
  "use strict";

  var G = 9.81;            // gravitational acceleration [m/s²]
  var N_GRID = 400;        // grid intervals along the beam
  var ASSETS = "../../assets/";

  /* ----------------------------------------------------------
     Load cases — ids match the illustrations bjelke-<id>.svg
     support: ss = simply supported, cant = cantilever,
              ff = fixed both ends, fp = fixed at A + roller at B,
              oh = simply supported with overhang past B
  ---------------------------------------------------------- */
  var CASES = [
    { id: "fritt-opplagt-punktlast-midt",      group: "Fritt opplagt", label: "Punktlast i midten",              support: "ss",   load: "F" },
    { id: "fritt-opplagt-punktlast-vilkarleg", group: "Fritt opplagt", label: "Punktlast på vilkårleg plass",    support: "ss",   load: "F", a: "last" },
    { id: "fritt-opplagt-to-punktlaster",      group: "Fritt opplagt", label: "To like punktlaster, symmetrisk", support: "ss",   load: "F", a: "sym" },
    { id: "fritt-opplagt-jamt-fordelt",        group: "Fritt opplagt", label: "Jamt fordelt last",               support: "ss",   load: "q" },
    { id: "fritt-opplagt-trekantlast",         group: "Fritt opplagt", label: "Trekantlast (størst ved B)",      support: "ss",   load: "q0" },
    { id: "fritt-opplagt-moment",              group: "Fritt opplagt", label: "Moment i enden (ved B)",          support: "ss",   load: "M" },
    { id: "utkragar-punktlast-ende",           group: "Utkragar", label: "Punktlast i enden",                    support: "cant", load: "F" },
    { id: "utkragar-punktlast-vilkarleg",      group: "Utkragar", label: "Punktlast på vilkårleg plass",         support: "cant", load: "F", a: "last" },
    { id: "utkragar-jamt-fordelt",             group: "Utkragar", label: "Jamt fordelt last",                    support: "cant", load: "q" },
    { id: "utkragar-trekantlast",              group: "Utkragar", label: "Trekantlast (størst ved innspenninga)", support: "cant", load: "q0" },
    { id: "utkragar-moment",                   group: "Utkragar", label: "Moment i enden",                       support: "cant", load: "M" },
    { id: "innspent-punktlast-midt",           group: "Fast innspent i begge endar", label: "Punktlast i midten",           support: "ff", load: "F" },
    { id: "innspent-punktlast-vilkarleg",      group: "Fast innspent i begge endar", label: "Punktlast på vilkårleg plass", support: "ff", load: "F", a: "last" },
    { id: "innspent-jamt-fordelt",             group: "Fast innspent i begge endar", label: "Jamt fordelt last",            support: "ff", load: "q" },
    { id: "innspent-opplagt-punktlast-midt",   group: "Innspent i A, fritt opplagt i B", label: "Punktlast i midten", support: "fp", load: "F" },
    { id: "innspent-opplagt-jamt-fordelt",     group: "Innspent i A, fritt opplagt i B", label: "Jamt fordelt last",  support: "fp", load: "q" },
    { id: "overheng-punktlast-ende",           group: "Fritt opplagt med overheng", label: "Punktlast i enden av overhenget", support: "oh", load: "F", a: "overheng" }
  ];

  var A_LABELS = {
    last: "Avstand frå A til lasta, a",
    sym: "Avstand frå opplager til last, a",
    overheng: "Lengde på overhenget, a"
  };

  // Load input: label and units (factor converts to N, N/mm or Nmm)
  var LOAD_TYPES = {
    F:  { label: "Punktlast, F",       units: [["kN", 1000], ["N", 1], ["kg", G]] },
    q:  { label: "Fordelt last, q",    units: [["kN/m", 1], ["N/m", 0.001], ["kg/m", G / 1000]] },
    q0: { label: "Største last, q₀",   units: [["kN/m", 1], ["N/m", 0.001], ["kg/m", G / 1000]] },
    M:  { label: "Moment, M₀",         units: [["kNm", 1e6], ["Nm", 1000]] }
  };

  // Loads of a case. Forces: upward positive. Distributed loads: downward
  // positive, linear from q1 at x1 to q2 at x2. Couples: clockwise positive.
  function caseLoads(c, L, a, P) {
    var loads = { forces: [], dists: [], couples: [] };
    var end = c.support === "oh" ? L + a : L;
    var id = c.id;
    if (c.load === "F") {
      if (/midt$/.test(id)) loads.forces.push({ x: L / 2, f: -P });
      else if (/vilkarleg$/.test(id)) loads.forces.push({ x: a, f: -P });
      else if (/to-punktlaster$/.test(id)) loads.forces.push({ x: a, f: -P }, { x: L - a, f: -P });
      else loads.forces.push({ x: end, f: -P });           // load at the free end
    } else if (c.load === "q") {
      loads.dists.push({ x1: 0, x2: L, q1: P, q2: P });
    } else if (c.load === "q0") {
      // simply supported: 0 at A → q0 at B.  cantilever: q0 at the wall → 0 at the tip
      if (c.support === "ss") loads.dists.push({ x1: 0, x2: L, q1: 0, q2: P });
      else loads.dists.push({ x1: 0, x2: L, q1: P, q2: 0 });
    } else if (c.load === "M") {
      // sense chosen so the beam deflects downward, as in the illustrations
      loads.couples.push({ x: L, c: c.support === "ss" ? -P : P });
    }
    return loads;
  }

  /* ----------------------------------------------------------
     Beam solver
  ---------------------------------------------------------- */
  function distForce(d, x) {            // part of a distributed load left of x
    if (x <= d.x1) return 0;
    var k = (d.q2 - d.q1) / (d.x2 - d.x1), u = Math.min(x, d.x2) - d.x1;
    return d.q1 * u + k * u * u / 2;
  }

  function distMoment(d, x) {           // its moment about the section at x
    if (x <= d.x1) return 0;
    var k = (d.q2 - d.q1) / (d.x2 - d.x1), s = x - d.x1, u = Math.min(x, d.x2) - d.x1;
    return d.q1 * (s * u - u * u / 2) + k * (s * u * u / 2 - u * u * u / 3);
  }

  function momentAt(m, x) {             // sagging positive
    var M = 0, i;
    for (i = 0; i < m.forces.length; i++) if (x > m.forces[i].x) M += m.forces[i].f * (x - m.forces[i].x);
    for (i = 0; i < m.couples.length; i++) if (x > m.couples[i].x || m.couples[i].x === 0) M += m.couples[i].c;
    for (i = 0; i < m.dists.length; i++) M -= distMoment(m.dists[i], x);
    return M;
  }

  function shearAt(m, x) {              // just right of x
    var V = 0, i;
    for (i = 0; i < m.forces.length; i++) if (x >= m.forces[i].x) V += m.forces[i].f;
    for (i = 0; i < m.dists.length; i++) V -= distForce(m.dists[i], x);
    return V;
  }

  function copyLoads(m) {
    return { forces: m.forces.slice(), dists: m.dists.slice(), couples: m.couples.slice() };
  }

  // Add the reactions that follow from statics alone.
  // basis "simple": R_A at 0 and R_B at L.  basis "cant": R_A and wall couple at 0.
  function addReactions(m, basis, L, Lt) {
    var W = 0, E0 = 0, i;               // total downward load, moment of the loads about the right end
    for (i = 0; i < m.forces.length; i++) { W -= m.forces[i].f; E0 += m.forces[i].f * (Lt - m.forces[i].x); }
    for (i = 0; i < m.couples.length; i++) E0 += m.couples[i].c;
    for (i = 0; i < m.dists.length; i++) { W += distForce(m.dists[i], Lt); E0 -= distMoment(m.dists[i], Lt); }
    var r = { RA: 0, RB: 0, CA: 0 };
    if (basis === "simple") {
      r.RA = (-E0 - W * (Lt - L)) / L;
      r.RB = W - r.RA;
      m.forces.push({ x: 0, f: r.RA }, { x: L, f: r.RB });
    } else {
      r.RA = W;
      r.CA = -(r.RA * Lt + E0);
      m.forces.push({ x: 0, f: r.RA });
      m.couples.push({ x: 0, c: r.CA });
    }
    return r;
  }

  function makeGrid(m, L, Lt) {
    var xs = [], i;
    for (i = 0; i <= N_GRID; i++) xs.push(Lt * i / N_GRID);
    var extra = [L];
    for (i = 0; i < m.forces.length; i++) extra.push(m.forces[i].x);
    for (i = 0; i < extra.length; i++) if (extra[i] > 0 && extra[i] < Lt) xs.push(extra[i]);
    xs.sort(function (p, q) { return p - q; });
    return xs.filter(function (x, j) { return j === 0 || x - xs[j - 1] > Lt * 1e-9; });
  }

  // Integrate y'' = M (EI = 1). Returns M, slope and deflection on the grid.
  function integrate(m, xs, basis, L) {
    var M = xs.map(function (x) { return momentAt(m, x); });
    var th = [0], y = [0], i, h;
    for (i = 1; i < xs.length; i++) {
      h = xs[i] - xs[i - 1];
      th.push(th[i - 1] + (M[i - 1] + M[i]) * h / 2);
      y.push(y[i - 1] + (th[i - 1] + th[i]) * h / 2);
    }
    if (basis === "simple") {           // y(0) = y(L) = 0
      var iL = nearest(xs, L), c1 = -y[iL] / L;
      for (i = 0; i < xs.length; i++) { y[i] += c1 * xs[i]; th[i] += c1; }
    }                                   // cantilever: y(0) = y'(0) = 0 already holds
    return { M: M, th: th, y: y };
  }

  function nearest(xs, x) {
    var best = 0, i;
    for (i = 1; i < xs.length; i++) if (Math.abs(xs[i] - x) < Math.abs(xs[best] - x)) best = i;
    return best;
  }

  // support: ss | cant | ff | fp | oh.  L = span (A to B), a = overhang (oh only).
  // loads: { forces, dists, couples }.  EI in Nmm².
  function solveBeam(support, L, a, loads, EI) {
    var Lt = support === "oh" ? L + a : L;
    var basis = support === "ss" || support === "oh" ? "simple" : "cant";
    var m = copyLoads(loads), xs = makeGrid(m, L, Lt), RB = 0, MB = 0;

    if (support === "fp" || support === "ff") {
      // Force method: cantilever fixed at A, redundants at B restore y(L) = 0 (and y'(L) = 0).
      // Unit upward force at L:   y = L³/3,  y' = L²/2.
      // Unit clockwise couple at L: y = −L²/2, y' = −L.
      var base = copyLoads(loads);
      addReactions(base, "cant", L, Lt);
      var s0 = integrate(base, xs, "cant", L), n = xs.length - 1;
      var y0 = s0.y[n], t0 = s0.th[n];
      if (support === "fp") {
        RB = -3 * y0 / (L * L * L);
      } else {
        RB = 12 * (-y0 + t0 * L / 2) / (L * L * L);
        MB = (RB * L * L / 2 + t0) / L;
        m.couples.push({ x: L, c: MB });
      }
      m.forces.push({ x: L, f: RB });
    }

    var r = addReactions(m, basis, L, Lt);
    if (basis === "simple") RB = r.RB;
    var s = integrate(m, xs, basis, L);

    var res = {
      xs: xs, L: L, Lt: Lt, support: support,
      M: s.M,
      y: s.y.map(function (v) { return v / EI; }),
      RA: r.RA, RB: RB,
      MA: basis === "cant" ? -r.CA : 0,          // fixing moments, hogging positive
      MB: MB,
      iM: 0, iDown: 0, iUp: 0, Vmax: 0
    };
    for (var i = 0; i < xs.length; i++) {
      if (Math.abs(res.M[i]) > Math.abs(res.M[res.iM])) res.iM = i;
      if (res.y[i] < res.y[res.iDown]) res.iDown = i;
      if (res.y[i] > res.y[res.iUp]) res.iUp = i;
      res.Vmax = Math.max(res.Vmax, Math.abs(shearAt(m, xs[i])));
    }
    res.iD = Math.abs(res.y[res.iDown]) >= Math.abs(res.y[res.iUp]) ? res.iDown : res.iUp;
    return res;
  }

  /* ----------------------------------------------------------
     Standard profiles (CSV)
  ---------------------------------------------------------- */
  var CSV_DIR = ASSETS + "staalprofiler-tabeller/csv/";
  var FIG_DIR = ASSETS + "staalprofiler-tabeller/figurer/";
  var TWIST_NOTE = "Profilet er ikkje symmetrisk om lastretninga. Verdiane gjeld når lasta går gjennom skjærsenteret, eller når profilet er halde fast mot vriding.";
  var ANGLE_NOTE = "Vinkelprofil bøyer seg skeivt (om hovudaksane) når det ikkje er halde fast sideveis. Verdiane gjeld bøying om aksen parallell med ein flens, med profilet fasthalde.";

  function c0(prefix, suffix) {
    return function (cells) { return prefix + cells[0].replace("*", "") + (suffix || ""); };
  }

  var FAMILIES = [
    { id: "ipe",  label: "IPE",                          file: "tabell_1_1_ipe.csv",  fig: "ipe.svg", name: c0("IPE ") },
    { id: "hea",  label: "HE-A",                         file: "tabell_1_2_hea.csv",  fig: "he.svg",  name: c0("HE ", " A") },
    { id: "heb",  label: "HE-B",                         file: "tabell_1_3_heb.csv",  fig: "he.svg",  name: c0("HE ", " B") },
    { id: "khp",  label: "Kvadratisk hulprofil (KHP)",   file: "tabell_1_4_khp.csv",  fig: "khp.svg", name: function (c) { return c[0] + "x" + c[0] + "x" + c[1]; } },
    { id: "rhp",  label: "Rektangulært hulprofil (RHP)", file: "tabell_1_5_rhp.csv",  fig: "rhp.svg", name: function (c) { return c[0] + "x" + c[1]; } },
    { id: "ror",  label: "Stålrør",                      file: "tabell_1_12_ror.csv", fig: "ror.svg", name: function (c) { return "Ø" + c[0] + " x " + c[1]; } },
    { id: "u",    label: "U — rundkanta kanalprofil",    file: "tabell_1_8_u.csv",    fig: "u.svg",   name: c0("U "), note: TWIST_NOTE },
    { id: "usp",  label: "USP — kanalprofil, parallelle flensar", file: "tabell_1_9_usp.csv", fig: "usp.svg", name: c0("USP "), note: TWIST_NOTE },
    { id: "hipe", label: "½ IPE (T-snitt)",              file: "tabell_1_6_hipe.csv", fig: "t.svg",   name: c0("½ IPE ") },
    { id: "hhea", label: "½ HE-A (T-snitt)",             file: "tabell_1_7_hhea.csv", fig: "t.svg",   name: c0("½ HE-A ") },
    { id: "l",    label: "L — likebeint vinkel",         file: "tabell_1_10_l.csv",   fig: "l.svg",   name: c0("L "), note: ANGLE_NOTE },
    { id: "lu",   label: "L — ulikebeint vinkel",        file: "tabell_1_11_lu.csv",  fig: "lu.svg",  name: c0("L "), note: ANGLE_NOTE }
  ];

  var SUPERSCRIPT = "⁰¹²³⁴⁵⁶⁷⁸⁹";

  function splitCsvLine(line) {
    var out = [], cur = "", quoted = false, i, ch;
    for (i = 0; i < line.length; i++) {
      ch = line[i];
      if (ch === '"') quoted = !quoted;
      else if (ch === "," && !quoted) { out.push(cur); cur = ""; }
      else cur += ch;
    }
    out.push(cur);
    return out;
  }

  // "Iy [10⁶ mm⁴]" → { name: "Iy", scale: 1e6 } so every value ends up in plain mm units
  function parseHeader(h) {
    var mt = /^(.*?)\s*\[(.*)\]$/.exec(h.trim());
    if (!mt) return { name: h.trim(), scale: 1 };
    var exp = /^10([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/.exec(mt[2]), scale = 1;
    if (exp) {
      var digits = exp[1].split("").map(function (ch) { return SUPERSCRIPT.indexOf(ch); }).join("");
      scale = Math.pow(10, parseInt(digits, 10));
    }
    return { name: mt[1], scale: scale };
  }

  function parseProfiles(text, family) {
    var lines = text.replace(/^﻿/, "").split(/\r?\n/).filter(function (l) { return l.trim(); });
    var cols = splitCsvLine(lines[0]).map(parseHeader);
    return lines.slice(1).map(function (line) {
      var cells = splitCsvLine(line), row = { name: family.name(cells) };
      cols.forEach(function (col, i) {
        var v = parseFloat(cells[i]);
        if (i > 0 && isFinite(v)) row[col.name] = v * col.scale;
      });
      return row;
    });
  }

  /* ----------------------------------------------------------
     Custom cross-sections (dimensions in mm)
     Bending about the horizontal axis, load along the height.
  ---------------------------------------------------------- */
  var SHAPES = [
    { id: "rect", label: "Rektangel / flattstål", dims: [["Breidde, b", 20], ["Høgde, h", 50]],
      calc: function (b, h) { return { A: b * h, I: b * h * h * h / 12, c: h / 2 }; } },
    { id: "round", label: "Massiv rund", dims: [["Diameter, d", 30]],
      calc: function (d) { return { A: Math.PI * d * d / 4, I: Math.PI * Math.pow(d, 4) / 64, c: d / 2 }; } },
    { id: "tube", label: "Rør", dims: [["Ytre diameter, D", 60.3], ["Veggtjukn., t", 3.6]],
      calc: function (D, t) {
        var d = D - 2 * t;
        if (d <= 0) throw "Veggtjukna må vere mindre enn halve diameteren.";
        return { A: Math.PI * (D * D - d * d) / 4, I: Math.PI * (Math.pow(D, 4) - Math.pow(d, 4)) / 64, c: D / 2 };
      } },
    { id: "box", label: "Rektangulært hulprofil (skarpe hjørne)", dims: [["Høgde, h", 100], ["Breidde, b", 50], ["Veggtjukn., t", 4]],
      calc: function (h, b, t) {
        var hi = h - 2 * t, bi = b - 2 * t;
        if (hi <= 0 || bi <= 0) throw "Veggtjukna er for stor for måla.";
        return { A: b * h - bi * hi, I: (b * h * h * h - bi * hi * hi * hi) / 12, c: h / 2 };
      } },
    { id: "ibeam", label: "I-profil (sveist, skarpe hjørne)", dims: [["Høgde, h", 200], ["Flensbreidde, b", 100], ["Stegtjukn., s", 6], ["Flenstjukn., t", 10]],
      calc: function (h, b, s, t) {
        var hw = h - 2 * t;
        if (hw <= 0 || s > b) throw "Måla heng ikkje saman (sjekk flens- og stegtjukn.).";
        return { A: b * h - (b - s) * hw, I: (b * h * h * h - (b - s) * hw * hw * hw) / 12, c: h / 2 };
      } }
  ];

  var MATERIALS = [
    { label: "Stål S355",          E: 210000, fy: 355, rho: 7850 },
    { label: "Stål S235",          E: 210000, fy: 235, rho: 7850 },
    { label: "Rustfritt 316",      E: 200000, fy: 230, rho: 7900 },
    { label: "Aluminium 6082-T6",  E: 70000,  fy: 250, rho: 2700 }
  ];

  /* ----------------------------------------------------------
     Formatting
  ---------------------------------------------------------- */
  function fmt(x, sig) {
    if (!isFinite(x)) return "—";
    if (x === 0) return "0";
    var ax = Math.abs(x);
    if (ax >= 1e6 || ax < 1e-3) {
      var e = Math.floor(Math.log10(ax)), mant = x / Math.pow(10, e);
      var es = String(e).split("").map(function (ch) { return ch === "-" ? "⁻" : SUPERSCRIPT[+ch]; }).join("");
      return mant.toFixed(2).replace(".", ",") + "·10" + es;
    }
    return Number(x.toPrecision(sig || 3)).toLocaleString("nb-NO", { maximumFractionDigits: 6 });
  }

  function fmtForce(N) { return Math.abs(N) >= 1000 ? fmt(N / 1000) + " kN" : fmt(N) + " N"; }
  function fmtMoment(Nmm) { return Math.abs(Nmm) >= 1e6 ? fmt(Nmm / 1e6) + " kNm" : fmt(Nmm / 1000) + " Nm"; }

  /* ----------------------------------------------------------
     UI
  ---------------------------------------------------------- */
  var profiles = {};       // family id → rows (filled by fetch)
  var $ = function (id) { return document.getElementById("bk-" + id); };

  function num(id) {
    var v = parseFloat(String($(id).value).replace(",", "."));
    return isFinite(v) ? v : NaN;
  }

  function need(id, name) {
    var v = num(id);
    if (!(v > 0)) throw name + " må vere eit tal større enn 0.";
    return v;
  }

  function fillSelect(el, labels) {
    el.innerHTML = labels.map(function (l, i) { return '<option value="' + i + '">' + l + "</option>"; }).join("");
  }

  function currentCase() { return CASES[+$("case").value]; }
  function currentFamily() { return FAMILIES[+$("family").value]; }

  function onCaseChange() {
    var c = currentCase();
    $("case-img").src = ASSETS + "images/bjelker/bjelke-" + c.id + ".svg";
    $("case-img").alt = c.group + " — " + c.label;
    $("a-group").style.display = c.a ? "" : "none";
    if (c.a) $("a-label").textContent = A_LABELS[c.a];
    var lt = LOAD_TYPES[c.load], unit = $("load-unit");
    $("load-label").textContent = lt.label + (/to-punktlaster/.test(c.id) ? " (kvar last)" : "");
    if (unit.dataset.kind !== c.load) {
      fillSelect(unit, lt.units.map(function (u) { return u[0]; }));
      unit.dataset.kind = c.load;
    }
  }

  function onModeChange() {
    var mode = $("mode").value;
    ["standard", "custom", "direct"].forEach(function (m) {
      $("mode-" + m).style.display = m === mode ? "" : "none";
    });
  }

  function onShapeChange() {
    var shape = SHAPES[+$("shape").value];
    for (var i = 0; i < 4; i++) {
      var d = shape.dims[i];
      $("dim" + i + "-group").style.display = d ? "" : "none";
      if (d) { $("dim" + i + "-label").textContent = d[0]; $("dim" + i).value = d[1]; }
    }
  }

  function onMaterialChange() {
    var mat = MATERIALS[+$("material").value];
    $("E").value = mat.E; $("fy").value = mat.fy; $("rho").value = mat.rho;
  }

  function onFamilyChange(preferred) {
    var fam = currentFamily();
    $("profile-img").src = FIG_DIR + fam.fig;
    $("profile-img").alt = fam.label;
    function populate() {
      var rows = profiles[fam.id], sel = $("size");
      fillSelect(sel, rows.map(function (r) { return r.name; }));
      rows.forEach(function (r, i) { if (r.name === preferred) sel.value = i; });
      $("axis-group").style.display = rows[0].Iy ? "" : "none";
      update();
    }
    if (profiles[fam.id]) return populate();
    $("size").innerHTML = "<option>Lastar …</option>";
    fetch(CSV_DIR + fam.file)
      .then(function (resp) { if (!resp.ok) throw new Error(resp.status); return resp.text(); })
      .then(function (text) { profiles[fam.id] = parseProfiles(text, fam); populate(); })
      .catch(function () { showError("Klarte ikkje å laste profiltabellen (" + fam.file + ")."); });
  }

  // Cross-section in use: { I [mm⁴], W [mm³], mass [kg/m] or NaN, desc, note }
  function getSection() {
    var mode = $("mode").value, rho = num("rho");
    if (mode === "standard") {
      var fam = currentFamily(), rows = profiles[fam.id];
      if (!rows) throw "Profiltabellen er ikkje lasta enno.";
      var row = rows[+$("size").value], ax = row.Iy ? $("axis").value : "";
      return { I: row["I" + ax], W: row["W" + ax], A: row.A, mass: row.A * rho * 1e-6,
               desc: row.name + (ax ? ", bøying om " + ax + "–" + ax : ""), note: fam.note };
    }
    if (mode === "custom") {
      var shape = SHAPES[+$("shape").value];
      var dims = shape.dims.map(function (d, i) { return need("dim" + i, d[0]); });
      var s = shape.calc.apply(null, dims);
      return { I: s.I, W: s.I / s.c, A: s.A, mass: s.A * rho * 1e-6, desc: shape.label };
    }
    return { I: need("I", "I"), W: need("W", "W"), A: NaN, mass: num("mass"), desc: "Eigne verdiar" };
  }

  function showError(msg) {
    $("error").textContent = msg;
    $("error").style.display = msg ? "" : "none";
    if (msg) $("results").style.display = "none";
  }

  function kv(label, value, sub, cls) {
    return '<div class="bk-kv ' + (cls || "") + '"><div class="bk-kv-label">' + label +
      '</div><div class="bk-kv-value">' + value + "</div>" +
      (sub ? '<div class="bk-kv-sub">' + sub + "</div>" : "") + "</div>";
  }

  // Small diagram along the beam. Positive values are drawn downward
  // (deflection downward, moment on the tension side).
  function plot(title, res, vals, label) {
    var W = 640, H = 130, x0 = 24, x1 = W - 24, top = 34, span = 70;
    var lo = Math.min(0, Math.min.apply(null, vals)), hi = Math.max(0, Math.max.apply(null, vals));
    var range = hi - lo || 1;
    var px = function (x) { return x0 + (x1 - x0) * x / res.Lt; };
    var py = function (v) { return top + span * (v - lo) / range; };
    var base = py(0), iMax = 0, i, pts = [];
    for (i = 0; i < vals.length; i++) {
      pts.push(px(res.xs[i]).toFixed(1) + "," + py(vals[i]).toFixed(1));
      if (Math.abs(vals[i]) > Math.abs(vals[iMax])) iMax = i;
    }
    var mx = px(res.xs[iMax]), my = py(vals[iMax]);
    var anchor = mx < W * 0.25 ? "start" : mx > W * 0.75 ? "end" : "middle";
    var ty = vals[iMax] >= 0 ? my + 16 : my - 8;
    var marks = [[0, "A"]];
    if (res.support !== "cant") marks.push([res.L, "B"]);
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" class="bk-plot" role="img" aria-label="' + title + '">' +
      '<text x="' + x0 + '" y="14" class="bk-plot-title">' + title + "</text>" +
      '<polygon class="bk-plot-fill" points="' + px(0) + "," + base.toFixed(1) + " " + pts.join(" ") + " " + px(res.Lt) + "," + base.toFixed(1) + '"/>' +
      '<polyline class="bk-plot-line" points="' + pts.join(" ") + '"/>' +
      '<line class="bk-plot-beam" x1="' + x0 + '" y1="' + base.toFixed(1) + '" x2="' + x1 + '" y2="' + base.toFixed(1) + '"/>';
    marks.forEach(function (mk) {
      var bx = px(mk[0]).toFixed(1);
      svg += '<line class="bk-plot-beam" x1="' + bx + '" y1="' + (base - 5).toFixed(1) + '" x2="' + bx + '" y2="' + (base + 5).toFixed(1) + '"/>' +
        '<text class="bk-plot-mark" x="' + bx + '" y="' + (base - 9).toFixed(1) + '" text-anchor="middle">' + mk[1] + "</text>";
    });
    svg += '<circle class="bk-plot-dot" cx="' + mx.toFixed(1) + '" cy="' + my.toFixed(1) + '" r="3"/>' +
      '<text class="bk-plot-val" x="' + mx.toFixed(1) + '" y="' + ty.toFixed(1) + '" text-anchor="' + anchor + '">' + label + "</text></svg>";
    return svg;
  }

  function update() {
    try {
      var c = currentCase();
      var L = need("L", "Lengda L");
      var a = c.a ? need("a", "Avstanden a") : 0;
      if (c.a === "last" && c.support === "cant" && a > L) throw "a kan ikkje vere større enn L.";
      if (c.a === "last" && c.support !== "cant" && a >= L) throw "a må vere mindre enn L.";
      if (c.a === "sym" && a > L / 2) throw "a kan ikkje vere større enn L/2.";
      var unit = LOAD_TYPES[c.load].units[+$("load-unit").value];
      var P = need("load", "Lasta") * unit[1];
      var E = need("E", "E-modulen");
      var sec = getSection();
      if (!(sec.I > 0) || !(sec.W > 0)) throw "Tverrsnittet manglar I eller W.";

      var loads = caseLoads(c, L, a, P), notes = [], wSelf = 0;
      if ($("selfweight").checked) {
        if (!(sec.mass > 0)) throw "Fyll inn masse per meter (og tettleik) for å rekne med eigenvekt.";
        wSelf = sec.mass * G / 1000;                       // N/mm
        loads.dists.push({ x1: 0, x2: c.support === "oh" ? L + a : L, q1: wSelf, q2: wSelf });
      }

      var res = solveBeam(c.support, L, a, loads, E * sec.I);
      var Mmax = Math.abs(res.M[res.iM]), sigma = Mmax / sec.W;
      var d = res.y[res.iD], dAbs = Math.abs(d);
      var fy = num("fy");

      var dSub = "ved x = " + fmt(res.xs[res.iD]) + " mm frå A" + (d > 0 ? " (oppover)" : "") +
        (dAbs > 0 ? " · L/" + fmt(L / dAbs) : "");
      var sSub = "", sCls = "bk-kv-accent";
      if (fy > 0) {
        sSub = "utnytting " + fmt(100 * sigma / fy) + " % av f<sub>y</sub> · tryggleiksfaktor " + fmt(fy / sigma);
        if (sigma > fy) {
          sCls = "bk-kv-bad";
          notes.push("Spenninga er over flytegrensa. Bjelken får varig deformasjon, og formlane gjeld ikkje lenger.");
        }
      }
      if (dAbs > L / 20) notes.push("Nedbøyinga er stor i forhold til lengda. Bjelketeorien føreset små nedbøyingar, så resultatet er unøyaktig.");
      if (sec.note) notes.push(sec.note);

      var html = '<div class="bk-result-heading">Resultat</div><div class="bk-kv-grid bk-kv-primary">' +
        kv("Maks nedbøying, δ<sub>max</sub>", fmt(dAbs) + " mm", dSub, "bk-kv-accent") +
        kv("Maks bøyemoment, M<sub>max</sub>", fmtMoment(Mmax), "ved x = " + fmt(res.xs[res.iM]) + " mm frå A", "bk-kv-accent") +
        kv("Maks bøyespenning, σ<sub>max</sub>", fmt(sigma) + " MPa", sSub, sCls) + "</div>";

      html += '<div class="bk-result-heading">Opplager og detaljar</div><div class="bk-kv-grid">' +
        kv("Opplagerkraft R<sub>A</sub>", fmtForce(res.RA), res.RA < 0 ? "nedover" : "");
      if (c.support !== "cant") html += kv("Opplagerkraft R<sub>B</sub>", fmtForce(res.RB), res.RB < 0 ? "nedover" : "");
      if (c.support === "cant" || c.support === "ff" || c.support === "fp") html += kv("Innspenningsmoment M<sub>A</sub>", fmtMoment(res.MA));
      if (c.support === "ff") html += kv("Innspenningsmoment M<sub>B</sub>", fmtMoment(res.MB));
      html += kv("Maks skjærkraft, V<sub>max</sub>", fmtForce(res.Vmax));
      if (c.support === "oh") {
        html += kv("Nedbøying i enden", fmt(-res.y[res.y.length - 1]) + " mm") +
          kv("Mellom opplagera", fmt(Math.abs(res.y[res.iUp])) + " mm", "oppover, ved x = " + fmt(res.xs[res.iUp]) + " mm");
      }
      if (wSelf) html += kv("Eigenvekt", fmt(sec.mass) + " kg/m", "= " + fmt(wSelf * 1000) + " N/m, med i resultatet");
      html += "</div>";

      html += '<div class="bk-result-heading">Tverrsnitt i bruk — ' + sec.desc + '</div><div class="bk-kv-grid">' +
        kv("Arealmoment, I", fmt(sec.I) + " mm⁴", "= " + fmt(sec.I / 1e4) + " cm⁴") +
        kv("Motstandsmoment, W", fmt(sec.W) + " mm³", "= " + fmt(sec.W / 1e3) + " cm³") +
        (sec.A > 0 ? kv("Areal, A", fmt(sec.A) + " mm²") : "") +
        (sec.mass > 0 ? kv("Masse", fmt(sec.mass) + " kg/m") : "") + "</div>";

      html += notes.map(function (n) { return '<div class="bk-notice">' + n + "</div>"; }).join("");
      html += plot("Nedbøying", res, res.y.map(function (v) { return -v; }), fmt(dAbs) + " mm") +
        plot("Bøyemoment", res, res.M, fmtMoment(Mmax));

      showError("");
      $("results").innerHTML = html;
      $("results").style.display = "";
    } catch (err) {
      showError(typeof err === "string" ? err : "Noko gjekk gale i utrekninga: " + err.message);
    }
  }

  function init() {
    if (!$("calc")) return;
    var groups = [];
    $("case").innerHTML = CASES.map(function (c, i) {
      var open = "";
      if (groups.indexOf(c.group) < 0) { open = (groups.length ? "</optgroup>" : "") + '<optgroup label="' + c.group + '">'; groups.push(c.group); }
      return open + '<option value="' + i + '">' + c.label + "</option>";
    }).join("") + "</optgroup>";
    fillSelect($("family"), FAMILIES.map(function (f) { return f.label; }));
    fillSelect($("shape"), SHAPES.map(function (s) { return s.label; }));
    fillSelect($("material"), MATERIALS.map(function (m) { return m.label; }));

    $("case").addEventListener("change", onCaseChange);
    $("mode").addEventListener("change", onModeChange);
    $("shape").addEventListener("change", onShapeChange);
    $("material").addEventListener("change", onMaterialChange);
    $("family").addEventListener("change", function () { onFamilyChange(); });
    $("calc").addEventListener("input", update);
    $("calc").addEventListener("change", update);

    onCaseChange(); onModeChange(); onShapeChange(); onMaterialChange();
    onFamilyChange("IPE 100");
  }

  // Exposed for tests and for use from the browser console
  window.bjelkeCalc = { solveBeam: solveBeam, caseLoads: caseLoads, parseProfiles: parseProfiles, CASES: CASES, FAMILIES: FAMILIES, SHAPES: SHAPES };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
