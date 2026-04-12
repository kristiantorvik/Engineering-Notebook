// thread-calculator/families/bspt/compute.js
// Resolver / compute module for BSPT pipe threads (R taper external, Rp parallel internal).
//
// Source: EN 10226-1:2004 / ISO 7-1:1994
//         "Pipe threads where pressure-tight joints are made on the threads —
//          Part 1: Taper external threads and parallel internal threads"
//         Table 1 — all dimensional values looked up from data.js (fully lookup-driven).
//
// Tolerance model:
//   External R:  gauge length tolerance ±T1/2 (positional — not a diametral band).
//                The diameters d, d2, d1 at the gauge plane are basic (nominal) values.
//   Internal Rp: gauge plane position tolerance ±T2/2 (axial positional tolerance only).
//   No diametral tolerance bands are defined by EN 10226-1 for these thread dimensions.
//
// Unit discipline:
//   All source values already in mm. No unit conversion required.
//   Internal arithmetic uses full floating-point precision; display rounding delegated
//   to the formatter functions in config.js.
//
// Depends on: shared/formatting.js, families/bspt/data.js, families/bspt/config.js

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["bspt"] = TC.families["bspt"] || {};

  var data = TC.families["bspt"].data;

  // ── Default state ─────────────────────────────────────────────────────────────
  TC.families["bspt"].getDefaultState = function () {
    return {
      familyId:   "bspt",
      mode:       "standard",
      bsptSizeKey: "1/2",
      // Flat ISO / NPT fields kept for compatible state shape (unused by BSPT)
      isoSizeKey:     "M10x1.5",
      isoFine:        false,
      inputMajorDia:  10.0,
      inputPitch:     1.5,
      inputStarts:    1,
      extClass:       "6g",
      intClass:       "6H",
      inputTargetPct: 75,
      inputWireDia:   null,
      nptSizeKey:     "1/2",
      // Derived — populated by resolve()
      pitch:    null,
      majorDia: null,
      starts:   null,
    };
  };

  // ── resolve() ─────────────────────────────────────────────────────────────────
  /**
   * Resolve current state to outputs.
   *
   * BSPT is fully lookup-driven from EN 10226-1:2004 Table 1.
   * All diameter values (d, d2, d1) are the basic values at the gauge plane.
   * The gauge length has positional tolerance ±T1/2 (not a diametral tolerance).
   * The internal gauge plane has positional tolerance ±T2/2.
   *
   * Verification (R 1/2"):
   *   d2 = d - h = 20.955 - 1.162 = 19.793 ✓
   *   d1 = d - 2h = 20.955 - 2×1.162 = 18.631 ✓
   *   gauge_max = 8.2 + 1.8 = 10.0 ✓
   *   Le_nom = 8.2 + 5.0 = 13.2 ✓
   *
   * @param  {object} state        Current calculator state.
   * @param  {string} changedField ID of the field that triggered this call (unused).
   * @returns {{ state, outputs, visibility, warnings, errors }}
   */
  TC.families["bspt"].resolve = function (state /*, changedField */) {
    var warnings   = [];
    var errors     = [];
    var outputs    = {};
    var visibility = {};

    // ── 1. Lookup size record ─────────────────────────────────────────────────
    var rec = data.lookup(state.bsptSizeKey);
    if (!rec) {
      errors.push({
        fieldId: "bspt_size",
        message: "Ugyldig st\u00f8rrelse \u00ab" + state.bsptSizeKey + "\u00bb \u2014 ikkje definert i EN 10226-1:2004 Tabell 1.",
      });
      rec = data.lookup("1/2");
    }

    // ── 2. Thread form constants ──────────────────────────────────────────────

    // EN 10226-1:2004 Table 1 col 2: threads per 25.4 mm
    var tpi = rec.tpi;

    // EN 10226-1:2004 Table 1 col 3: pitch [mm]
    var p_mm = rec.p_mm;

    // EN 10226-1:2004 Fig. 1 / Fig. 2 (55° thread profile):
    //   H = 0.960 491 × P  [mm]
    //   (full height of the fundamental triangle, 55° angle)
    var H_mm = 0.960491 * p_mm;

    // EN 10226-1:2004 §4 symbols / Table 1 col 4:
    //   h = 0.640 327 × P  [mm]
    //   Tabulated value used directly; formula: h = 0.640 327 P
    var h_mm = rec.h_mm;

    // Taper and flank angles (fixed for all BSPT sizes)
    var halfAngleTaper_deg = data.HALF_ANGLE_TAPER_DEG;  // β ≈ 1.78990°
    var halfAngleFlank_deg = data.HALF_ANGLE_FLANK_DEG;  // 27.5° = 27°30'

    // ── 3. Diameters at gauge plane ───────────────────────────────────────────

    // EN 10226-1:2004 Table 1 col 5: major diameter at gauge plane
    var d_mm  = rec.d_mm;

    // EN 10226-1:2004 Table 1 col 6 / §4:
    //   d2 = D2 = d - 0.640 327 P = d - h
    var d2_mm = rec.d2_mm;

    // EN 10226-1:2004 Table 1 col 7 / §4:
    //   d1 = D1 = d - 1.280 654 P = d - 2h
    var d1_mm = rec.d1_mm;

    // ── 4. Gauge length and assembly lengths ──────────────────────────────────

    // EN 10226-1:2004 Table 1 col 8: nominal gauge length [mm]
    var gauge_nom = rec.gauge_nom_mm;

    // EN 10226-1:2004 Table 1 col 9: T1/2 [mm] (half-tolerance, stored positive)
    // Full tolerance = ±T1/2 on gauge length position
    var T1_half = rec.T1_half_mm;
    var gauge_max = gauge_nom + T1_half;
    var gauge_min = gauge_nom - T1_half;

    // EN 10226-1:2004 Table 1 col 13: assembly length beyond gauge plane [mm]
    var assem_mm = rec.assem_mm;

    // ── 5. Internal thread gauge plane position tolerance ─────────────────────

    // EN 10226-1:2004 Table 1 col 18:
    //   T2/2 = tolerance on axial position of gauge plane of internal Rp thread [mm]
    //   (stored as positive half-value; full tolerance = ±T2/2)
    var T2_half = rec.T2_half_mm;

    // EN 10226-1:2004 Table 1 footnote a:
    //   Equivalent diametral tolerance on parallel internal (Rp) threads.
    //   Derived geometrically: Teq = 2 × T2_half × taper_on_diameter = 2 × T2_half / 16
    //   (axial positional tolerance T2 converted to diametral tolerance via 1:16 taper geometry)
    var Teq = 2 * T2_half * data.TAPER_ON_DIA;

    // EN 10226-1:2004 Fig. 1: crest and root radius r = 0.137 329 × P  [mm]
    var r_mm = 0.137329 * p_mm;

    // ── 6. Build outputs ──────────────────────────────────────────────────────

    // ── Thread form ───────────────────────────────────────────────────────────
    outputs["bspt_tpi"]        = { type: "scalar", unit: "TPI", value: tpi            };
    outputs["bspt_pitch_mm"]   = { type: "scalar", unit: "mm",  value: p_mm           };
    outputs["bspt_H_mm"]       = { type: "scalar", unit: "mm",  value: H_mm           };
    outputs["bspt_h_mm"]       = { type: "scalar", unit: "mm",  value: h_mm           };
    outputs["bspt_r_mm"]       = { type: "scalar", unit: "mm",  value: r_mm           };
    outputs["bspt_flank_half"] = { type: "scalar", unit: "\u00b0", value: halfAngleFlank_deg };
    outputs["bspt_taper_half"] = { type: "scalar", unit: "\u00b0", value: halfAngleTaper_deg };

    // ── External taper R ──────────────────────────────────────────────────────
    // Diameters at gauge plane: basic (nominal) values — no diametral tolerance band
    outputs["bspt_ext_major"]    = { type: "scalar", unit: "mm", value: d_mm  };
    outputs["bspt_ext_pitch"]    = { type: "scalar", unit: "mm", value: d2_mm };
    outputs["bspt_ext_minor"]    = { type: "scalar", unit: "mm", value: d1_mm };

    // ── Pipe face (small end) diameters ───────────────────────────────────────
    // EN 10226-1:2004 §7.1.2: Taper 1:16 on diameter.
    //   d_face = d_gauge − gauge_length × TAPER_ON_DIA
    // Because gauge_length has ±T1/2 tolerance:
    //   max face dia ← shortest gauge (gauge_min): d − gauge_min × t
    //   nom face dia ← nominal gauge (gauge_nom): d − gauge_nom × t
    //   min face dia ← longest  gauge (gauge_max): d − gauge_max × t
    var taper = data.TAPER_ON_DIA;  // 0.0625 = 1/16
    outputs["bspt_face_major"] = { type: "range", unit: "mm",
      min: d_mm  - gauge_max * taper,
      mid: d_mm  - gauge_nom * taper,
      max: d_mm  - gauge_min * taper };
    outputs["bspt_face_pitch"] = { type: "range", unit: "mm",
      min: d2_mm - gauge_max * taper,
      mid: d2_mm - gauge_nom * taper,
      max: d2_mm - gauge_min * taper };
    outputs["bspt_face_minor"] = { type: "range", unit: "mm",
      min: d1_mm - gauge_max * taper,
      mid: d1_mm - gauge_nom * taper,
      max: d1_mm - gauge_min * taper };

    // Gauge length range: [min, nom, max]
    // min column = gauge_min (minimum material), max column = gauge_max (maximum material)
    outputs["bspt_gauge_length"] = { type: "range", unit: "mm", min: gauge_min, mid: gauge_nom, max: gauge_max };
    outputs["bspt_assem_mm"]     = { type: "scalar", unit: "mm", value: assem_mm };
    // Minimum thread length = nominal gauge length + assembly addition
    // (the thread must reach from the pipe face through the gauge plane AND the assembly zone)
    outputs["bspt_min_length"]   = { type: "scalar", unit: "mm", value: gauge_nom + assem_mm };

    // ── Internal parallel Rp ──────────────────────────────────────────────────
    // EN 10226-1:2004 §4 + Table 1 footnote a:
    //   Basic diameters identical to external at gauge plane (D = d, D2 = d2, D1 = d1).
    //   Rp is a PARALLEL thread — diameters are the same at every axial position.
    //   Tolerance on D2 and D1 = Teq (equivalent diametral tolerance from T2/2 × taper geometry).
    //   D (major): lower limit only — no upper limit defined for internal major diameter.
    outputs["bspt_int_major"] = { type: "range", unit: "mm",
      min: d_mm  - Teq / 2,
      mid: d_mm,
      max: d_mm  + Teq / 2 };
    outputs["bspt_int_pitch"] = { type: "range", unit: "mm",
      min: d2_mm - Teq / 2,
      mid: d2_mm,
      max: d2_mm + Teq / 2 };
    outputs["bspt_int_minor"] = { type: "range", unit: "mm",
      min: d1_mm - Teq / 2,
      mid: d1_mm,
      max: d1_mm + Teq / 2 };

    // ── 7. Updated state ──────────────────────────────────────────────────────
    var newState = Object.assign({}, state, {
      pitch:    p_mm,
      majorDia: d_mm,
      starts:   1,
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
