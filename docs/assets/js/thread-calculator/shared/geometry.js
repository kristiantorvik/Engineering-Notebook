// thread-calculator/shared/geometry.js
// Pure geometry functions for 60-degree thread profiles.
// Depends on: shared/formatting.js, shared/units.js

(function () {
  "use strict";

  window.TC = window.TC || {};

  // ── ISO 68-1 / basic 60° thread geometry constants ──────────────────────────
  // H  = theoretical full thread depth = (sqrt(3)/2) * p
  // d2 = d - (3*sqrt(3)/8) * p  =  d - 0.6495190 * p   (pitch diameter)
  // D1 = d - (5*sqrt(3)/8) * p  =  d - 1.0825318 * p   (internal minor dia)
  // d3 = d - (9*sqrt(3)/8) * p  =  d - 1.2269430 * p   (external root dia)
  //       Note: d3 accounts for the rounded root at r = H/6; see ISO 68-1.
  //
  // Best-wire diameter for 60° thread: dw = p / (2 * cos(30°)) = p / sqrt(3)
  //   = 0.5773503 * p
  // Measurement over wires (external, 60°): M = d2 + 3*dw - (sqrt(3)/2)*p

  var SQRT3_OVER_2 = 0.8660254037844387;  // sqrt(3)/2
  var D2_COEFF     = 0.6495190528835140;  // 3*sqrt(3)/8 = (3/8)*sqrt(3)
  var D1_COEFF     = 1.0825317547305481;  // 5*sqrt(3)/8
  var D3_COEFF     = 1.2269430161670370;  // d3 coefficient (external root)
  var WIRE_COEFF   = 0.5773502691896258;  // 1/sqrt(3)  (best wire ratio)

  TC.geo = {
    /** Full thread height H = (sqrt(3)/2) * pitch */
    H: function (p) { return SQRT3_OVER_2 * p; },

    /** Basic pitch diameter: d2 = d - 0.6495190 * p */
    d2: function (d, p) { return d - D2_COEFF * p; },

    /** External root diameter: d3 = d - 1.2269430 * p */
    d3: function (d, p) { return d - D3_COEFF * p; },

    /** Internal minor diameter: D1 = d - 1.0825318 * p */
    D1: function (d, p) { return d - D1_COEFF * p; },

    /** Best-wire diameter for 60° thread: dw = p / sqrt(3) */
    bestWireDia: function (p) { return WIRE_COEFF * p; },

    /**
     * Measurement over wires (external 60° thread).
     * M = d2 + 3*dw - (sqrt(3)/2)*p
     * Valid when using the best-wire diameter.
     */
    measOverWires: function (d2, dw, p) {
      return d2 + 3 * dw - SQRT3_OVER_2 * p;
    },

    /** Lead = pitch * number_of_starts */
    leadFromStarts: function (p, starts) { return p * starts; },

    // ── Profile geometry helpers ─────────────────────────────────────────────
    // Crest flat width (at major diameter d or D): H/8 truncation → P/8
    topFlat: function (p) { return p / 8; },

    // Root flat at internal minor diameter D1: H/4 truncation → P/4
    rootFlat: function (p) { return p / 4; },

    // External root radius minimum (ISO 965-1 §11): R_min = 0.125P
    rootRadiusMin: function (p) { return 0.125 * p; },

    // External root radius recommended (H/6 = (√3/2·P)/6 ≈ 0.14434P)
    rootRadiusRec: function (p) { return SQRT3_OVER_2 * p / 6; },

    // Expose coefficients for use in tolerance calculations
    D2_COEFF: D2_COEFF,
    D1_COEFF: D1_COEFF,
    D3_COEFF: D3_COEFF,
  };

})();
