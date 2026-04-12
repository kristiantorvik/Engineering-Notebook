// thread-calculator/families/bspp/compute.js
// Resolver / compute module for BSPP pipe threads (G parallel, ISO 228-1).
//
// Source: ISO 228-1:2000
//         "Pipe threads where pressure-tight joints are not made on the threads —
//          Part 1: Dimensions, tolerances and designation"
//         Table 1 — all dimensional values and tolerances looked up from data.js.
//
// Tolerance model (ISO 228-1:2000 §4, Table 1):
//
//   Internal thread (G):
//     D  (major):  lower = D_basic;  no upper limit specified → max = null
//     D2 (pitch):  lower = D2_basic; upper = D2_basic + TD2
//     D1 (minor):  lower = D1_basic; upper = D1_basic + TD1
//
//   External thread (G-A or G-B):
//     d  (major):  lower = d_basic - Td;  upper = d_basic
//     d2 (pitch):
//       Class A:  lower = d2_basic - TD2;   upper = d2_basic
//       Class B:  lower = d2_basic - 2×TD2; upper = d2_basic
//     d1 (minor):  no tolerance specified; basic value only
//
//   Note: Td = 2 × TD2 for all sizes (ISO 228-1:2000 Table 1 verified).
//         Class B Td2 = 2 × Class A Td2 = 2 × TD2.
//
// Unit discipline:
//   All source values already in mm. No unit conversion required.
//   Full floating-point precision internally; display rounding in formatters (config.js).
//
// Depends on: shared/formatting.js, families/bspp/data.js, families/bspp/config.js

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["bspp"] = TC.families["bspp"] || {};

  var data = TC.families["bspp"].data;

  // ── Default state ─────────────────────────────────────────────────────────────
  TC.families["bspp"].getDefaultState = function () {
    return {
      familyId:     "bspp",
      mode:         "standard",
      bsppSizeKey:  "1/2",
      bsppExtClass: "A",
      // Flat ISO / NPT / BSPT fields kept for compatible state shape (unused by BSPP)
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
      bsptSizeKey:    "1/2",
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
   * BSPP is fully lookup-driven from ISO 228-1:2000 Table 1.
   * Internal thread has one tolerance class only (G).
   * External thread has two classes: A (tighter) and B (wider = 2×A).
   *
   * Verification (G 1/2, Class A):
   *   D2 range = [19.793, —, 19.935] (= 19.793 + 0.142) ✓
   *   D1 range = [18.631, —, 19.172] (= 18.631 + 0.541) ✓
   *   ext d2_A = [19.651, —, 19.793] (= 19.793 − 0.142) ✓
   *   ext d2_B = [19.509, —, 19.793] (= 19.793 − 2×0.142) ✓
   *   ext d    = [20.671, —, 20.955] (= 20.955 − 0.284) ✓
   *
   * @param  {object} state        Current calculator state.
   * @param  {string} changedField ID of the field that triggered this call (unused).
   * @returns {{ state, outputs, visibility, warnings, errors }}
   */
  TC.families["bspp"].resolve = function (state /*, changedField */) {
    var warnings   = [];
    var errors     = [];
    var outputs    = {};
    var visibility = {};

    // ── 1. Lookup size record ─────────────────────────────────────────────────
    var rec = data.lookup(state.bsppSizeKey);
    if (!rec) {
      errors.push({
        fieldId: "bspp_size",
        message: "Ugyldig st\u00f8rrelse \u00ab" + state.bsppSizeKey + "\u00bb \u2014 ikkje definert i ISO 228-1:2000 Tabell 1.",
      });
      rec = data.lookup("1/2");
    }

    // ── 2. External tolerance class ───────────────────────────────────────────
    var extClass = state.bsppExtClass;
    if (extClass !== "A" && extClass !== "B") {
      errors.push({
        fieldId: "bspp_ext_class",
        message: "Ugyldig klasse \u00ab" + extClass + "\u00bb \u2014 m\u00e5 vera A eller B (ISO 228-1:2000 §4).",
      });
      extClass = "A";
    }

    // ── 3. Thread form constants ──────────────────────────────────────────────

    // ISO 228-1:2000 Table 1 col 2
    var tpi = rec.tpi;

    // ISO 228-1:2000 Table 1 col 3
    var p_mm = rec.p_mm;

    // ISO 228-1:2000 §4 / Fig. 1:
    //   H = 0.960 491 × P  [mm]  (55° fundamental triangle height)
    var H_mm = 0.960491 * p_mm;

    // ISO 228-1:2000 Fig. 1: crest and root radius r = 0.137 329 × P  [mm]
    var r_mm = 0.137329 * p_mm;

    // ISO 228-1:2000 §3 / Table 1 col 4:
    //   h = 0.640 327 × P  [mm]  (height between rounded crests and roots)
    var h_mm = rec.h_mm;

    var halfAngleFlank_deg = data.HALF_ANGLE_FLANK_DEG;  // 27.5° = 27°30'

    // ── 4. Basic diameters ────────────────────────────────────────────────────

    // ISO 228-1:2000 Table 1 col 5
    var d_mm  = rec.d_mm;   // major (= D for internal)

    // ISO 228-1:2000 Table 1 col 6 / §3:
    //   D2 = d2 = D − 0.640 327 P
    var d2_mm = rec.d2_mm;  // pitch

    // ISO 228-1:2000 Table 1 col 7 / §3:
    //   D1 = d1 = D − 1.280 654 P
    var d1_mm = rec.d1_mm;  // minor

    // ── 5. Tolerance magnitudes ───────────────────────────────────────────────

    // ISO 228-1:2000 Table 1 col 9
    var TD2 = rec.TD2;   // internal pitch dia tolerance (upper deviation magnitude)

    // ISO 228-1:2000 Table 1 col 14
    var TD1 = rec.TD1;   // internal minor dia tolerance (upper deviation magnitude)

    // ISO 228-1:2000 Table 1 col 15: Td = 2 × TD2 (verified for all sizes)
    var Td  = rec.Td;    // external major dia tolerance (lower deviation magnitude)

    // ── 6. Build limit values ─────────────────────────────────────────────────

    // ISO 228-1:2000 Table 1 cols 8/9:
    //   Internal D (major): lower = D_basic (lower dev = 0); no upper limit
    var int_D_min  = d_mm;
    // var int_D_max = null;  // no upper limit specified

    // ISO 228-1:2000 Table 1 cols 8/9: D2 lower = D2_basic, upper = D2_basic + TD2
    var int_D2_min = d2_mm;
    var int_D2_max = d2_mm + TD2;

    // ISO 228-1:2000 Table 1 cols 13/14: D1 lower = D1_basic, upper = D1_basic + TD1
    var int_D1_min = d1_mm;
    var int_D1_max = d1_mm + TD1;

    // ISO 228-1:2000 Table 1 cols 15/16: ext d lower = d_basic - Td, upper = d_basic
    var ext_d_min  = d_mm  - Td;
    var ext_d_max  = d_mm;

    // ISO 228-1:2000 Table 1 cols 10/11/12:
    //   Class A: lower = d2 - TD2,   upper = d2
    //   Class B: lower = d2 - 2×TD2, upper = d2
    var ext_d2_min = (extClass === "A") ? d2_mm - TD2 : d2_mm - 2 * TD2;
    var ext_d2_max = d2_mm;

    // ── 7. Build outputs ──────────────────────────────────────────────────────

    // ── Thread form ───────────────────────────────────────────────────────────
    outputs["bspp_tpi"]        = { type: "scalar", unit: "TPI",    value: tpi               };
    outputs["bspp_pitch_mm"]   = { type: "scalar", unit: "mm",     value: p_mm              };
    outputs["bspp_H_mm"]       = { type: "scalar", unit: "mm",     value: H_mm              };
    outputs["bspp_h_mm"]       = { type: "scalar", unit: "mm",     value: h_mm              };
    outputs["bspp_r_mm"]       = { type: "scalar", unit: "mm",     value: r_mm              };
    outputs["bspp_flank_half"] = { type: "scalar", unit: "\u00b0", value: halfAngleFlank_deg };

    // ── Internal thread (G) ───────────────────────────────────────────────────
    // ISO 228-1:2000 §4: internal major D has lower limit only (no upper limit)
    // Per guide §4.3: use range with max=null → displays "—" in Maks column
    // mid=null for internal major (no upper limit → no meaningful midpoint)
    outputs["bspp_int_major"] = { type: "range", unit: "mm", min: int_D_min,  mid: null,                          max: null        };
    outputs["bspp_int_pitch"] = { type: "range", unit: "mm", min: int_D2_min, mid: (int_D2_min + int_D2_max) / 2, max: int_D2_max  };
    outputs["bspp_int_minor"] = { type: "range", unit: "mm", min: int_D1_min, mid: (int_D1_min + int_D1_max) / 2, max: int_D1_max  };

    // ── External thread (G-A or G-B) ─────────────────────────────────────────
    outputs["bspp_ext_major"] = { type: "range", unit: "mm", min: ext_d_min,  mid: (ext_d_min  + ext_d_max)  / 2, max: ext_d_max  };
    outputs["bspp_ext_pitch"] = { type: "range", unit: "mm", min: ext_d2_min, mid: (ext_d2_min + ext_d2_max) / 2, max: ext_d2_max };
    // Minor diameter of external thread: no tolerance defined — show basic value
    outputs["bspp_ext_minor"] = { type: "scalar", unit: "mm", value: d1_mm };

    // ── 8. Updated state ──────────────────────────────────────────────────────
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
