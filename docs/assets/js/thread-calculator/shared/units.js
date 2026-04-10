// thread-calculator/shared/units.js
// Unit conversion utilities.
// Depends on: shared/formatting.js (window.TC must exist)

(function () {
  "use strict";

  window.TC = window.TC || {};

  TC.units = {
    /** Convert inches to millimeters. */
    inToMm: function (i) { return i * 25.4; },

    /** Convert millimeters to inches. */
    mmToIn: function (m) { return m / 25.4; },

    /** Convert TPI (threads per inch) to pitch in mm. */
    tpiToPitch: function (tpi) { return 25.4 / tpi; },

    /** Convert pitch in mm to TPI. */
    pitchToTpi: function (p) { return 25.4 / p; },

    /** Convert degrees to radians. */
    degToRad: function (d) { return d * Math.PI / 180; },

    /** Convert radians to degrees. */
    radToDeg: function (r) { return r * 180 / Math.PI; },
  };

})();
