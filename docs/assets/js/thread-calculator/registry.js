// thread-calculator/registry.js
// Thread family registry — discovers and provides access to all family modules.
// To add a new thread family:
//   1. Create families/{id}/data.js, config.js, compute.js
//   2. Add a TC.registry.register() call at the bottom of this file
//   3. Add the three <script src> tags in thread-calculator.md
//      (before this file's <script src> tag)
//
// Depends on: all family modules being loaded before this file.

(function () {
  "use strict";

  window.TC = window.TC || {};

  var _families = {};

  TC.registry = {
    /**
     * Register a thread family module.
     * @param {string} id  - family id (e.g. "iso-metric-60")
     * @param {Object} mod - module object with meta, config, getDefaultState, resolve
     */
    register: function (id, mod) {
      if (!mod || !mod.meta || !mod.config || !mod.getDefaultState || !mod.resolve) {
        throw new Error("Thread family module '" + id + "' is missing required properties");
      }
      _families[id] = mod;
    },

    /**
     * Get a family module by id.
     * @throws if the family id is not registered
     */
    get: function (id) {
      if (!_families[id]) {
        throw new Error("Unknown thread family: '" + id + "'");
      }
      return _families[id];
    },

    /**
     * List all registered families.
     * @returns {Array<{id, meta}>}
     */
    list: function () {
      return Object.keys(_families).map(function (id) {
        return { id: id, meta: _families[id].meta };
      });
    },
  };

  // ── Register built-in families (V1) ─────────────────────────────────────────
  TC.registry.register("iso-metric-60", TC.families["iso-metric-60"]);
  TC.registry.register("npt",           TC.families["npt"]);

  // To add more families later, add lines here, e.g.:
  // TC.registry.register("iso-trapezoidal-30", TC.families["iso-trapezoidal-30"]);
  // TC.registry.register("unified-60",         TC.families["unified-60"]);

})();
