// thread-calculator/families/iso-metric-60/compute.js
// Resolver for ISO metric 60° threads per ISO 965-1:2013 and ISO 68-1.
// Depends on: shared/formatting.js, shared/units.js, shared/geometry.js,
//             families/iso-metric-60/data.js, families/iso-metric-60/config.js

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["iso-metric-60"] = TC.families["iso-metric-60"] || {};

  var data = TC.families["iso-metric-60"].data;

  // ── ISO 965-1:2013 Tolerance system ─────────────────────────────────────────
  //
  // §10.2 Fundamental deviations (all values in µm, P in mm):
  //   EI_G =  +(15 + 11P)    (internal, position G)
  //   EI_H =   0             (internal, position H)
  //   es_g = -(15 + 11P)     (external, position g)   [eq. 9]
  //   es_f = -(30 + 11P)     (external, position f)   [eq. 8, P > 0.3mm]
  //   es_e = -(50 + 11P)     (external, position e)   [eq. 7, P > 0.45mm]
  //   es_d = -(65 + 19P)     (external, position d)   [eq. 6, P > 0.8mm]
  //   es_h =   0             (external, position h)   [eq. 10]
  //
  // §10.3 Crest diameter tolerances (grade 6 base, µm):
  //   Td(6)   = 180 × ∛(P²) − 3.15/√P                [eq. 11]
  //   TD1(6)  = 433P − 190P^1.22  (P = 0.2–0.8 mm)   [eq. 12]
  //   TD1(6)  = 230P^0.7          (P ≥ 1.0 mm)        [eq. 13]
  //
  // §10.4 Pitch diameter tolerances:
  //   Td2(6)  = 90 × P^0.4 × d^0.1                   [eq. 14]
  //             d = geometric mean of diameter range limits
  //   TD2 uses same Td2(6) base with different grade multipliers (Table 13)
  //
  // §9 Multi-start threads — Td2 and TD2 multiplied by factor per Table 9:
  //   {2: 1.12, 3: 1.25, 4: 1.40, 5+: 1.60}
  //
  // IMPORTANT: When calculated values differ from the ISO 965-1 tables, the
  // table values shall be used (ISO 965-1 §10.1). The formulas give a good
  // approximation for general use; for critical applications verify against
  // the full tables in ISO 965-1:2013.

  // ── Diameter ranges for geometric mean (Tables 4 and 5) ─────────────────────
  var DIAM_RANGES = [
    { lo: 0.99,  hi: 1.4   },
    { lo: 1.4,   hi: 2.8   },
    { lo: 2.8,   hi: 5.6   },
    { lo: 5.6,   hi: 11.2  },
    { lo: 11.2,  hi: 22.4  },
    { lo: 22.4,  hi: 45.0  },
    { lo: 45.0,  hi: 90.0  },
    { lo: 90.0,  hi: 180.0 },
    { lo: 180.0, hi: 355.0 },
  ];

  /** Geometric mean diameter for use in Td2(6) formula (ISO 965-1 §10.4.1). */
  function diamGeomMean(d) {
    for (var i = 0; i < DIAM_RANGES.length; i++) {
      var r = DIAM_RANGES[i];
      if (d > r.lo && d <= r.hi) {
        return Math.sqrt(r.lo * r.hi);
      }
    }
    return d;   // fallback for out-of-range input
  }

  // ── Grade multiplier tables ──────────────────────────────────────────────────

  /** Td2 (external pitch diameter) grade multipliers — Table 12. */
  var Td2_MULT = { 3: 0.50, 4: 0.63, 5: 0.80, 6: 1.00, 7: 1.25, 8: 1.60, 9: 2.00 };

  /** TD2 (internal pitch diameter) grade multipliers — Table 13. */
  var TD2_MULT = { 4: 0.85, 5: 1.06, 6: 1.32, 7: 1.70, 8: 2.12 };

  /** Td (external major diameter) grade multipliers — Table 10.
   *  Grades 5 and 7 are not in the standard; interpolated values used. */
  var Td_MULT  = { 4: 0.63, 5: 0.80, 6: 1.00, 7: 1.25, 8: 1.60 };

  /** TD1 (internal minor diameter) grade multipliers — Table 11. */
  var TD1_MULT = { 4: 0.63, 5: 0.80, 6: 1.00, 7: 1.25, 8: 1.60 };

  // ── Multi-start pitch diameter factor (ISO 965-1 §9, Table 9) ───────────────
  function multiStartFactor(starts) {
    if (starts <= 1) return 1.00;
    if (starts === 2) return 1.12;
    if (starts === 3) return 1.25;
    if (starts === 4) return 1.40;
    return 1.60;
  }

  // ── Tolerance formula functions ──────────────────────────────────────────────

  /** Fundamental deviation [µm]. External: es (upper, ≤ 0). Internal: EI (lower, ≥ 0). */
  function fundamentalDeviation(position, p) {
    switch (position) {
      case "h": return 0;
      case "g": return -(15 + 11 * p);   // eq.9
      case "f": return -(30 + 11 * p);   // eq.8
      case "e": return -(50 + 11 * p);   // eq.7
      case "d": return -(65 + 19 * p);   // eq.6
      case "H": return 0;
      case "G": return  (15 + 11 * p);   // eq.1
      default:  return 0;
    }
  }

  /** Td2(6) base [µm] — ISO 965-1 eq.14. d is the nominal major diameter [mm]. */
  function Td2_grade6(d_nom, p) {
    return 90 * Math.pow(p, 0.4) * Math.pow(diamGeomMean(d_nom), 0.1);
  }

  /** Td(6) base [µm] — ISO 965-1 eq.11. */
  function Td_grade6(p) {
    return 180 * Math.pow(p, 2 / 3) - 3.15 / Math.sqrt(p);
  }

  /** TD1(6) base [µm] — ISO 965-1 eqs.12–13. */
  function TD1_grade6(p) {
    if (p <= 0.8) {
      return 433 * p - 190 * Math.pow(p, 1.22);   // eq.12
    }
    return 230 * Math.pow(p, 0.7);                 // eq.13
  }

  /** Parse tolerance class string e.g. "6g" → {grade:6, position:"g"} */
  function parseTolClass(cls) {
    if (!cls || cls.length < 2) return { grade: 6, position: "g" };
    var position = cls.slice(-1);
    var grade    = parseInt(cls.slice(0, -1), 10);
    if (!isFinite(grade)) grade = 6;
    return { grade: grade, position: position };
  }

  // ── Limit calculations ───────────────────────────────────────────────────────

  /**
   * Compute external thread limits (d, d2, d3_max) from basic values.
   * @param {number} d_basic  Basic major diameter [mm]
   * @param {number} p        Pitch [mm]
   * @param {string} tolClass Tolerance class e.g. "6g"
   * @param {number} starts   Number of starts (for Td2 multi-start factor)
   */
  function externalLimits(d_basic, p, tolClass, starts) {
    var tol   = parseTolClass(tolClass);
    var grade = tol.grade;
    var pos   = tol.position;
    var msf   = multiStartFactor(starts || 1);

    var es_um  = fundamentalDeviation(pos, p);
    var Td2_um = Td2_grade6(d_basic, p) * (Td2_MULT[grade] || 1.00) * msf;
    var Td_um  = Td_grade6(p)           * (Td_MULT[grade]  || 1.00);

    var es  = es_um  / 1000;
    var Td2 = Td2_um / 1000;
    var Td  = Td_um  / 1000;

    var d2_basic = TC.geo.d2(d_basic, p);
    var d2_max   = d2_basic + es;
    var d2_min   = d2_max - Td2;
    var d2_nom   = (d2_max + d2_min) / 2;

    var d_max = d_basic + es;
    var d_min = d_max - Td;
    var d_nom = (d_max + d_min) / 2;

    // d3: only the maximum material limit is standardised
    var d3_basic = TC.geo.d3(d_basic, p);
    var d3_max   = d3_basic + es;

    return {
      d_max: d_max, d_min: d_min, d_nom: d_nom,
      d2_max: d2_max, d2_min: d2_min, d2_nom: d2_nom,
      d3_max: d3_max,
      es_mm: es,
    };
  }

  /**
   * Compute internal thread limits (D2, D1) from basic values.
   * @param {number} d_basic  Basic major diameter [mm]
   * @param {number} p        Pitch [mm]
   * @param {string} tolClass Tolerance class e.g. "6H"
   * @param {number} starts   Number of starts (for TD2 multi-start factor)
   */
  function internalLimits(d_basic, p, tolClass, starts) {
    var tol   = parseTolClass(tolClass);
    var grade = tol.grade;
    var pos   = tol.position;
    var msf   = multiStartFactor(starts || 1);

    var EI_um  = fundamentalDeviation(pos, p);
    var TD2_um = Td2_grade6(d_basic, p) * (TD2_MULT[grade] || 1.32) * msf;
    var TD1_um = TD1_grade6(p)          * (TD1_MULT[grade] || 1.00);

    var EI  = EI_um  / 1000;
    var TD2 = TD2_um / 1000;
    var TD1 = TD1_um / 1000;

    var D2_basic = TC.geo.d2(d_basic, p);
    var D2_min   = D2_basic + EI;
    var D2_max   = D2_min + TD2;
    var D2_nom   = (D2_min + D2_max) / 2;

    var D1_basic = TC.geo.D1(d_basic, p);
    var D1_min   = D1_basic + EI;
    var D1_max   = D1_min + TD1;
    var D1_nom   = (D1_min + D1_max) / 2;

    return {
      D2_max: D2_max, D2_min: D2_min, D2_nom: D2_nom,
      D1_max: D1_max, D1_min: D1_min, D1_nom: D1_nom,
      D1_basic: D1_basic,
    };
  }

  // ── Public interface ─────────────────────────────────────────────────────────

  TC.families["iso-metric-60"].getDefaultState = function () {
    return {
      familyId:       "iso-metric-60",
      mode:           "standard",
      isoSizeKey:     "M10x1.5",
      isoFine:        false,
      inputMajorDia:  10.0,
      inputPitch:     1.5,
      inputStarts:    1,
      extClass:       "6g",
      intClass:       "6H",
      inputTargetPct: 75,
      inputWireDia:   0,       // 0 = auto (use best wire)
      // NPT fields (unused here, kept for flat state shape)
      nptSizeKey:     "1/2",
      // Derived — filled by resolve()
      pitch:          null,
      majorDia:       null,
      starts:         null,
    };
  };

  /**
   * Resolve current state to outputs.
   * @param {Object} state        - current calculator state
   * @param {string|null} changedField
   * @returns {{ state, outputs, visibility, warnings, errors }}
   */
  TC.families["iso-metric-60"].resolve = function (state, changedField) {
    var warnings   = [];
    var errors     = [];
    var outputs    = {};
    var visibility = {};

    // ── 1. Determine d (major) and p (pitch) ─────────────────────────────────
    var d, p;

    if (state.mode === "standard") {
      var entry = data.lookup(state.isoSizeKey, state.isoFine);
      if (!entry) {
        entry = data.coarse[0];
        warnings.push({ fieldId: "iso_size", message: "Ugyldig st\u00f8rrelsesvalt — bruker " + entry.label });
      }
      d = entry.d;
      p = entry.p;
    } else {
      d = state.inputMajorDia;
      p = state.inputPitch;
      if (!d || d <= 0) {
        errors.push({ fieldId: "input_major", message: "Ytterdiameter m\u00e5 v\u00e6re positiv" });
        d = 1;
      }
      if (!p || p <= 0) {
        errors.push({ fieldId: "input_pitch", message: "Stigning m\u00e5 v\u00e6re positiv" });
        p = 0.25;
      }
    }

    var starts = state.inputStarts;
    if (!starts || starts < 1) {
      starts = 1;
      warnings.push({ fieldId: "input_starts", message: "Antall starter sett til 1" });
    }

    // ── 2. Basic geometry ─────────────────────────────────────────────────────
    var H    = TC.geo.H(p);
    var lead = TC.geo.leadFromStarts(p, starts);

    // ── 3. Tolerance bands ────────────────────────────────────────────────────
    var extLim, intLim;
    var d2_basic = TC.geo.d2(d, p);
    var D1_basic = TC.geo.D1(d, p);

    if (errors.length === 0) {
      extLim = externalLimits(d, p, state.extClass, starts);
      intLim = internalLimits(d, p, state.intClass, starts);
    } else {
      extLim = {
        d_max: d, d_min: d, d_nom: d,
        d2_max: d2_basic, d2_min: d2_basic, d2_nom: d2_basic,
        d3_max: TC.geo.d3(d, p),
        es_mm: 0,
      };
      intLim = {
        D2_max: d2_basic, D2_min: d2_basic, D2_nom: d2_basic,
        D1_max: D1_basic, D1_min: D1_basic, D1_nom: D1_basic,
        D1_basic: D1_basic,
      };
    }

    // ── 4. Measurement over wires ─────────────────────────────────────────────
    var bestWire = TC.geo.bestWireDia(p);
    var dw = (state.inputWireDia && state.inputWireDia > 0) ? state.inputWireDia : bestWire;

    var mow_min = TC.geo.measOverWires(extLim.d2_min, dw, p);
    var mow_nom = TC.geo.measOverWires(extLim.d2_nom, dw, p);
    var mow_max = TC.geo.measOverWires(extLim.d2_max, dw, p);

    // ── 5. Thread engagement / drill diameter ─────────────────────────────────
    var targetPct = state.inputTargetPct;
    if (!targetPct || targetPct <= 0 || targetPct > 100) {
      targetPct = 75;
      warnings.push({ fieldId: "input_target_pct", message: "Gjengeinngrep sett til 75 %" });
    }
    // drill = d - (targetPct/100) × (D1_basic coefficient) × p
    var drill_dia = d - (targetPct / 100) * TC.geo.D3_COEFF * p;

    // ── 6. Build outputs ──────────────────────────────────────────────────────

    // External dimensions
    outputs["ext_major"] = {
      type: "range", unit: "mm",
      min: extLim.d_min,  mid: extLim.d_nom,  max: extLim.d_max,
    };
    outputs["ext_pitch_dia"] = {
      type: "range", unit: "mm",
      min: extLim.d2_min, mid: extLim.d2_nom, max: extLim.d2_max,
    };
    // d3: only maximum material limit is standardised (ISO 965-1 §11)
    outputs["ext_minor"] = {
      type: "range", unit: "mm",
      min: null, mid: null, max: extLim.d3_max,
    };
    outputs["ext_top_flat"] = {
      type: "scalar", value: TC.geo.topFlat(p), unit: "mm",
    };
    // Root radius: R_min = 0.125P (min), R_rec = H/6 (recommended per ISO 965-1 §11)
    outputs["ext_root_radius"] = {
      type: "range", unit: "mm",
      min: TC.geo.rootRadiusMin(p),
      mid: TC.geo.rootRadiusRec(p),
      max: TC.geo.rootRadiusRec(p),
    };
    // ext_root_width and ext_top_radius: not defined for ISO metric (outputs omitted → shows —)
    // Basic thread height H (ISO 68-1 basic profile, same for external and internal)
    outputs["ext_thread_height"] = {
      type: "scalar", value: H, unit: "mm",
    };

    // Internal dimensions
    // D (major diameter of internal thread) = d basic; no tolerance specified in ISO 965-1
    // (clearance diameter — nut bore must not infringe this limit)
    outputs["int_major"] = {
      type: "range", unit: "mm",
      min: d, mid: null, max: null,
    };
    outputs["int_thread_height"] = {
      type: "scalar", value: H, unit: "mm",
    };
    outputs["int_pitch_dia"] = {
      type: "range", unit: "mm",
      min: intLim.D2_min, mid: intLim.D2_nom, max: intLim.D2_max,
    };
    outputs["int_minor"] = {
      type: "range", unit: "mm",
      min: intLim.D1_min, mid: intLim.D1_nom, max: intLim.D1_max,
    };
    // Top flat at D1 (root flat of internal bore, P/4 per ISO 68-1 basic profile)
    outputs["int_top_flat"] = {
      type: "scalar", value: TC.geo.rootFlat(p), unit: "mm",
    };
    // int_root_width: flat at D (root of boring groove) = P/8, same geometry as ext crest
    outputs["int_root_width"] = {
      type: "scalar", value: TC.geo.topFlat(p), unit: "mm",
    };
    // int_root_radius, int_top_radius: not defined for ISO metric → omitted (shows —)

    // Pitch, lead, H
    outputs["pitch_val"] = { type: "scalar", value: p,    unit: "mm" };
    outputs["lead_val"]  = { type: "scalar", value: lead, unit: "mm" };
    outputs["H_val"]     = { type: "scalar", value: H,    unit: "mm" };

    // MOW
    outputs["best_wire"] = { type: "scalar", value: bestWire, unit: "mm" };
    outputs["mow_ext"]   = {
      type: "range", unit: "mm",
      min: mow_min, mid: mow_nom, max: mow_max,
    };

    // Engagement / drill
    outputs["drill_dia"] = { type: "scalar", value: drill_dia, unit: "mm" };

    // ── 7. Visibility map ─────────────────────────────────────────────────────
    visibility["tc-section-section_std_select"] = (state.mode === "standard");
    visibility["tc-section-section_by_input"]   = (state.mode === "by-input");

    // ── 8. Updated state ──────────────────────────────────────────────────────
    var newState = Object.assign({}, state, {
      pitch:    p,
      majorDia: d,
      starts:   starts,
    });

    return {
      state:      newState,
      outputs:    outputs,
      visibility: visibility,
      warnings:   warnings,
      errors:     errors,
    };
  };

})();
