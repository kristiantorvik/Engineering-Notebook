// thread-calculator/shared/formatting.js
// Number formatting and parsing utilities for the thread calculator.
// This file must be loaded FIRST — it creates the window.TC namespace.

(function () {
  "use strict";

  window.TC = window.TC || {};

  TC.fmt = {
    /**
     * Format a number to fixed decimal places.
     * Returns "—" for null, undefined, or non-finite values.
     */
    number: function (v, dec) {
      if (v === null || v === undefined || !isFinite(v)) return "\u2014";
      return v.toFixed(dec !== undefined ? dec : 3);
    },

    /** Format a millimeter value (no unit suffix — unit shown in table column). */
    mm: function (v, dec) {
      return TC.fmt.number(v, dec !== undefined ? dec : 4);
    },

    /** Format a pitch value (3 decimals). */
    pitch: function (v) {
      return TC.fmt.number(v, 3);
    },

    /** Format a percent value. */
    percent: function (v, dec) {
      if (v === null || v === undefined || !isFinite(v)) return "\u2014";
      return TC.fmt.number(v, dec !== undefined ? dec : 1);
    },

    /** Format TPI — integer if whole, 1 decimal otherwise. */
    tpi: function (v) {
      if (v === null || v === undefined || !isFinite(v)) return "\u2014";
      return (v % 1 === 0) ? String(Math.round(v)) : v.toFixed(1);
    },

    /** Format a degree angle to 4 decimals. */
    deg: function (v) {
      return TC.fmt.number(v, 4);
    },
  };

  TC.parse = {
    /** Parse a string to float. Returns null on invalid input. */
    float: function (s) {
      if (s === null || s === undefined || String(s).trim() === "") return null;
      var f = parseFloat(s);
      return isFinite(f) ? f : null;
    },

    /** Parse a string to integer. Returns null on invalid input. */
    int: function (s) {
      if (s === null || s === undefined || String(s).trim() === "") return null;
      var i = parseInt(s, 10);
      return isFinite(i) ? i : null;
    },
  };

})();
