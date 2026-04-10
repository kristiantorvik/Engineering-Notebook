// thread-calculator/families/npt/compute.js
// Resolver / compute module for NPT taper pipe threads.
//
// Source: ASME B1.20.1-2013, "Pipe Threads, General Purpose (Inch)"
//         Table 2 — all dimensional values looked up from data.js (lookup-driven).
//         No tolerance computation: ASME NPT product tolerance is ±1 turn
//         standoff at gaging (§3.2), not a dimensional band on Table 2 values.
//
// Unit discipline:
//   - data.js stores source values in inches (standard native unit).
//   - All conversions from inches to mm are performed here via TC.units.inToMm().
//   - All output values are in mm (or dimensionless / TPI as noted).
//   - Internal arithmetic uses full floating-point precision; rounding for display
//     is delegated to the formatter functions in config.js.
//
// Depends on: shared/formatting.js, shared/units.js,
//             families/npt/data.js, families/npt/config.js

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["npt"] = TC.families["npt"] || {};

  var data = TC.families["npt"].data;

  // ── Default state ─────────────────────────────────────────────────────────────
  TC.families["npt"].getDefaultState = function () {
    return {
      familyId:   "npt",
      mode:       "standard",
      nptSizeKey: "1/2",
      // ISO fields kept for flat state shape (unused by NPT)
      isoSizeKey:     "M10x1.5",
      isoFine:        false,
      inputMajorDia:  10.0,
      inputPitch:     1.5,
      inputStarts:    1,
      extClass:       "6g",
      intClass:       "6H",
      inputTargetPct: 75,
      inputWireDia:   null,
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
   * NPT is fully lookup-driven from ASME B1.20.1-2013 Table 2.
   * Major and minor diameters are derived from the pitch diameter and thread
   * height: d_major = E_n + h,  d_minor = E_n − h.
   *
   * Verification (1/2" NPT): E2 + h = 0.78286 + 0.05714 = 0.84000" = D ✓
   *                           E0 − h = 0.75843 − 0.05714 = 0.70129" ≈ K0 ✓
   *
   * @param  {object} state        Current calculator state.
   * @param  {string} changedField ID of the field that triggered this call (unused).
   * @returns {{ state, outputs, visibility, warnings, errors }}
   */
  TC.families["npt"].resolve = function (state /*, changedField */) {
    var warnings   = [];
    var errors     = [];
    var outputs    = {};
    var visibility = {};

    // ── 1. Lookup size record ─────────────────────────────────────────────────
    var rec = data.lookup(state.nptSizeKey);
    if (!rec) {
      errors.push({
        fieldId: "npt_size",
        message: "Ugyldig st\u00f8rrelse \u00ab" + state.nptSizeKey + "\u00bb \u2014 ikkje definert i ASME B1.20.1-2013 Tabell 2.",
      });
      // Fall back to 1/2" so outputs remain populated
      rec = data.lookup("1/2");
    }

    // ── 2. Thread form constants ──────────────────────────────────────────────

    // ASME B1.20.1-2013 Table 2, col 3: threads per inch (dimensionless)
    var tpi = rec.tpi;

    // ASME B1.20.1-2013 §3.1.6:
    //   P = 1/n  [in] → mm: P_mm = 25.4 / n
    var pitch_mm = TC.units.tpiToPitch(tpi);

    // ASME B1.20.1-2013 §3.1.5, §2.2 (per Fig. 2):
    //   β = half taper angle from pipe axis = arctan(taper / 2) = arctan(0.0625 / 2)
    //   = 1.78990° = 1° 47' 24"
    //   (α = 30° = half of the 60° thread flank angle — a separate quantity)
    var halfAngle_deg = data.HALF_ANGLE_DEG;

    // ── 3. Thread form geometry ───────────────────────────────────────────────

    // ISO 68-1:2013 §5.1 (60° thread basic profile):
    //   Full sharp 60° V-thread height:
    //   H = P × √3 / 2 = 0.86603 × P  [mm]
    var H_mm = pitch_mm * Math.sqrt(3) / 2;

    // ASME B1.20.1-2013 Table 2, col 22 and §3.1.6:
    //   Truncated thread height h = 0.800 × P  [in] → [mm]
    //   (Tabulated value used directly; formula stated in §3.1.6.)
    var h_mm = TC.units.inToMm(rec.h_in);

    // ASME B1.20.1-2013 §3.1.6:
    //   Thread profile is truncated by equal amounts at crest and root.
    //   Radial truncation per side: Δh = (H − h) / 2
    var trunc_mm = (H_mm - h_mm) / 2;

    // ASME B1.20.1-2013 §3.1.6, 60° thread geometry:
    //   Each flank makes 60° with the thread axis. For radial truncation Δh,
    //   the resulting axial flat width = 2 × Δh / tan(60°) = 2Δh / √3
    //   Flat width is equal at crest and root (equal truncation), and is the
    //   same for both internal and external threads (shared basic profile).
    var flat_mm = 2 * trunc_mm / Math.sqrt(3);

    // ── 4. Convert Table 2 pitch diameters and lengths to mm ─────────────────

    // Pitch diameters (all from Table 2 — see column numbers in data.js header)
    var E0_mm = TC.units.inToMm(rec.E0_in);   // col 5
    var E1_mm = TC.units.inToMm(rec.E1_in);   // col 8
    var E2_mm = TC.units.inToMm(rec.E2_in);   // col 11: pitch dia at L2 (effective thread end)
    var E3_mm = TC.units.inToMm(rec.E3_in);   // col 16: pitch dia at E3 plane (internal wrench)
    var E5_mm = TC.units.inToMm(rec.E5_in);   // col 21: pitch dia at L5 (complete thread plane)
    var K0_mm = TC.units.inToMm(rec.K0_in);   // col 24  (= E0 − h within rounding)

    // Engagement lengths
    var L1_mm     = TC.units.inToMm(rec.L1_in);
    var L2_mm     = TC.units.inToMm(rec.L2_in);
    var wm_ext_mm = TC.units.inToMm(rec.wm_ext_in);
    var L3_mm     = TC.units.inToMm(rec.L3_in);
    var V_mm      = TC.units.inToMm(rec.V_in);    // col 17: V = P × 3.47 (vanish threads)
    var L4_mm     = TC.units.inToMm(rec.L4_in);   // col 19: overall length incl. vanish
    var L5_mm     = TC.units.inToMm(rec.L5_in);   // col 20: complete thread length

    // Core reference data
    var D_mm       = TC.units.inToMm(rec.D_in);
    var delta_d_mm = TC.units.inToMm(rec.delta_d_in);

    // ── Product tolerance at E1 plane ─────────────────────────────────────────
    // ASME B1.20.1-2013 §3.2:
    //   Product tolerance = ±1 turn standoff from the gaging notch.
    //   One turn changes the pitch diameter by delta_d = 0.0625/n [in].
    //   This is the only dimensional tolerance band defined by the standard,
    //   and it applies to the E1 (hand-tight / gaging reference) plane only.
    var tol_mm = delta_d_mm;

    // ── 5. Derived major and minor diameters ──────────────────────────────────
    //
    // For a symmetric truncated 60° thread with height h:
    //   d_major (crest) = d_pitch + h       [on diameter: crest is h/2 above pitch on each side]
    //   d_minor (root)  = d_pitch − h
    //
    // External thread (on pipe nipple):
    //   CREST = major diameter (outer, visible thread tips)
    //   ROOT  = minor diameter (inner, bottom of thread groove)
    //
    // Internal thread (in fitting):
    //   CREST = minor diameter (inner, thread ridge tips inside bore)
    //   ROOT  = major diameter (outer, bottom of thread groove in fitting wall)

    // External thread at small end (E0 plane = pipe face):
    var ext_d0_mm = E0_mm + h_mm;   // major (crest) at small end
    // E0_mm                         // pitch dia at small end
    // K0_mm = E0_mm − h (Table 2)   // minor (root) at small end

    // External thread at E1 plane (hand-tight / gaging reference):
    // Diameters computed inline in outputs (range type — ±tol_mm per ASME §3.2)

    // External thread at E2 plane (end of effective thread length L2):
    //   By definition: E2 + h = D (pipe outside diameter) — verified for all 24 sizes.
    var ext_d2_mm = E2_mm + h_mm;   // major = D within floating-point precision
    // E2_mm                         // pitch dia
    var ext_k2_mm = E2_mm - h_mm;   // minor (root)

    // Internal thread at E1 plane (fitting face / gaging reference, same plane as ext E1):
    //   Diameters computed inline in outputs (range type — ±tol_mm per ASME §3.2)

    // Internal thread at E3 plane (after power wrench make-up):
    var int_d3_mm = E3_mm + h_mm;   // root (major, wall side)
    // E3_mm                         // pitch dia
    var int_k3_mm = E3_mm - h_mm;   // crest (minor, bore)

    // ── 6. Build outputs ──────────────────────────────────────────────────────

    // ── Thread form ───────────────────────────────────────────────────────────
    outputs["npt_tpi"]        = { type: "scalar", value: tpi,           unit: "TPI" };
    outputs["npt_pitch_mm"]   = { type: "scalar", value: pitch_mm,      unit: "mm"  };
    outputs["npt_H_mm"]       = { type: "scalar", value: H_mm,          unit: "mm"  };
    outputs["npt_h_mm"]       = { type: "scalar", value: h_mm,          unit: "mm"  };
    outputs["npt_trunc_mm"]   = { type: "scalar", value: trunc_mm,      unit: "mm"  };
    outputs["npt_flat_mm"]    = { type: "scalar", value: flat_mm,       unit: "mm"  };
    outputs["npt_half_angle"] = { type: "scalar", value: halfAngle_deg, unit: "\u00b0" };

    // ── External thread diameters ─────────────────────────────────────────────
    // At small end / pipe face (E0 plane)
    outputs["npt_ext_d0"]     = { type: "scalar", value: ext_d0_mm, unit: "mm" };
    outputs["npt_ext_e0"]     = { type: "scalar", value: E0_mm,     unit: "mm" };
    outputs["npt_ext_k0"]     = { type: "scalar", value: K0_mm,     unit: "mm" };
    // At E1 plane (hand-tight / gaging reference) — range: ±1 turn per ASME §3.2
    outputs["npt_ext_d1"]     = { type: "range", unit: "mm", min: E1_mm - tol_mm + h_mm, mid: E1_mm + h_mm, max: E1_mm + tol_mm + h_mm };
    outputs["npt_ext_e1"]     = { type: "range", unit: "mm", min: E1_mm - tol_mm,        mid: E1_mm,        max: E1_mm + tol_mm        };
    outputs["npt_ext_k1"]     = { type: "range", unit: "mm", min: E1_mm - tol_mm - h_mm, mid: E1_mm - h_mm, max: E1_mm + tol_mm - h_mm };
    // At E2 plane (end of effective thread length; major ≈ pipe OD D)
    outputs["npt_ext_d2"]     = { type: "scalar", value: ext_d2_mm, unit: "mm" };
    outputs["npt_ext_e2"]     = { type: "scalar", value: E2_mm,     unit: "mm" };
    outputs["npt_ext_k2"]     = { type: "scalar", value: ext_k2_mm, unit: "mm" };
    // At E5 plane (complete thread / full form)
    outputs["npt_ext_e5"]     = { type: "scalar", value: E5_mm,     unit: "mm" };

    // ── Internal thread diameters ─────────────────────────────────────────────
    // Tap drill — scalar (machinist picks nearest standard drill ≤ this value)
    // ASME B1.20.1-2013 Nonmandatory Appendix B:
    //   "The actual hole size prior to tapping ... should approximate the diameter K₀,
    //    column 24 of Table 2 (Basic Minor Diameter at Small End of Pipe)."
    outputs["npt_tap_drill"]  = { type: "scalar", unit: "mm", value: K0_mm };

    // At E1 plane (fitting face — aligns with external E1) — range: ±1 turn per ASME §3.2
    outputs["npt_int_d1"]     = { type: "range", unit: "mm", min: E1_mm - tol_mm + h_mm, mid: E1_mm + h_mm, max: E1_mm + tol_mm + h_mm };
    outputs["npt_int_e1"]     = { type: "range", unit: "mm", min: E1_mm - tol_mm,        mid: E1_mm,        max: E1_mm + tol_mm        };
    outputs["npt_int_k1"]     = { type: "range", unit: "mm", min: E1_mm - tol_mm - h_mm, mid: E1_mm - h_mm, max: E1_mm + tol_mm - h_mm };
    // At E3 plane (power wrench make-up)
    outputs["npt_int_d3"]     = { type: "scalar", value: int_d3_mm, unit: "mm" };
    outputs["npt_int_e3"]     = { type: "scalar", value: E3_mm,     unit: "mm" };
    outputs["npt_int_k3"]     = { type: "scalar", value: int_k3_mm, unit: "mm" };

    // ── Engagement lengths ────────────────────────────────────────────────────
    outputs["npt_L1_mm"]      = { type: "scalar", value: L1_mm,     unit: "mm" };
    outputs["npt_L2_mm"]      = { type: "scalar", value: L2_mm,     unit: "mm" };
    outputs["npt_wm_ext_mm"]  = { type: "scalar", value: wm_ext_mm, unit: "mm" };
    outputs["npt_L3_mm"]      = { type: "scalar", value: L3_mm,     unit: "mm" };
    outputs["npt_L5_mm"]      = { type: "scalar", value: L5_mm,     unit: "mm" };
    outputs["npt_L4_mm"]      = { type: "scalar", value: L4_mm,     unit: "mm" };
    outputs["npt_V_mm"]       = { type: "scalar", value: V_mm,      unit: "mm" };

    // ── Core reference data ───────────────────────────────────────────────────
    outputs["npt_D_mm"]       = { type: "scalar", value: D_mm,       unit: "mm" };
    outputs["npt_delta_d_mm"] = { type: "scalar", value: delta_d_mm, unit: "mm" };

    // ── 7. Updated state ──────────────────────────────────────────────────────
    var newState = Object.assign({}, state, {
      pitch:    pitch_mm,
      majorDia: D_mm,
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
