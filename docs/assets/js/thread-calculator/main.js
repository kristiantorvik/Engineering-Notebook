// thread-calculator/main.js
// Application controller for the thread calculator.
// Owns the mutable state, bridges UI events to family compute modules,
// and drives the render loop.
//
// Depends on: all other thread-calculator files (must be loaded last).

(function () {
  "use strict";

  window.TC = window.TC || {};

  var CONTAINER_ID = "thread-calc";

  var _state = null;

  // ── Field → state mapping ────────────────────────────────────────────────────
  // Maps field ids to state mutations. Returns a new state object.
  function applyFieldToState(state, fieldId, rawValue) {
    var s = Object.assign({}, state);

    switch (fieldId) {
      case "family_select":
        s.familyId = rawValue;
        break;
      case "mode_select":
        s.mode = rawValue;
        break;
      case "iso_series":
        s.isoFine = (rawValue === "fine");
        // Reset size key to first valid entry when switching series
        var isoData = TC.families["iso-metric-60"].data;
        var list = s.isoFine ? isoData.fine : isoData.coarse;
        if (list.length > 0 && !isoData.lookup(s.isoSizeKey, s.isoFine)) {
          s.isoSizeKey = list[0].key;
        }
        break;
      case "iso_size":
        s.isoSizeKey = rawValue;
        break;
      case "input_major":
        s.inputMajorDia = TC.parse.float(rawValue);
        break;
      case "input_pitch":
        s.inputPitch = TC.parse.float(rawValue);
        break;
      case "input_starts":
        s.inputStarts = TC.parse.int(rawValue) || 1;
        break;
      case "ext_class":
        s.extClass = rawValue;
        break;
      case "int_class":
        s.intClass = rawValue;
        break;
      case "npt_size":
        s.nptSizeKey = rawValue;
        break;
      case "input_target_pct":
        s.inputTargetPct = TC.parse.float(rawValue) || 75;
        break;
      case "input_wire_dia":
        s.inputWireDia = TC.parse.float(rawValue) || 0;
        break;
      case "bspt_size":
        s.bsptSizeKey = rawValue;
        break;
      case "bspp_size":
        s.bsppSizeKey = rawValue;
        break;
      case "bspp_ext_class":
        s.bsppExtClass = rawValue;
        break;
      // Future fields can be added here without touching ui.js or compute modules
    }

    return s;
  }

  // ── Recompute and render ──────────────────────────────────────────────────────
  function recompute(changedField) {
    var family = TC.registry.get(_state.familyId);
    var result;

    try {
      result = family.resolve(_state, changedField);
    } catch (e) {
      console.error("Thread calculator resolve() error:", e);
      TC.ui.showMessages([], [{ fieldId: null, message: "Intern feil: " + e.message }]);
      return;
    }

    _state = result.state;

    TC.ui.render(_state, result.outputs);
    TC.ui.applyVisibility(result.visibility);
    TC.ui.showMessages(result.warnings, result.errors);
  }

  // ── Field change handler ──────────────────────────────────────────────────────
  function onFieldChange(fieldId, rawValue) {
    // Family switch: rebuild the entire DOM for the new family
    if (fieldId === "family_select") {
      var newFamily = TC.registry.get(rawValue);
      if (!newFamily) return;
      // Merge new family default state, preserving common fields
      var defaultState = newFamily.getDefaultState();
      _state = Object.assign({}, defaultState, {
        familyId:       rawValue,
        mode:           defaultState.mode,
        // Carry over shared numeric inputs if they make sense
        inputMajorDia:  _state.inputMajorDia,
        inputPitch:     _state.inputPitch,
        inputStarts:    _state.inputStarts,
        inputTargetPct: _state.inputTargetPct,
        inputWireDia:   _state.inputWireDia,
      });
      TC.ui.init(CONTAINER_ID, _state);
      TC.ui.bindEvents(onFieldChange);
      recompute(null);
      return;
    }

    // Mode switch: rebuild DOM to show/hide sections cleanly
    if (fieldId === "mode_select") {
      _state = applyFieldToState(_state, fieldId, rawValue);
      // Populate by-input fields from current resolved values when switching to by-input
      if (rawValue === "by-input" && _state.majorDia && _state.pitch) {
        _state.inputMajorDia = _state.majorDia;
        _state.inputPitch    = _state.pitch;
        _state.inputStarts   = _state.starts || 1;
      }
      TC.ui.init(CONTAINER_ID, _state);
      TC.ui.bindEvents(onFieldChange);
      recompute(null);
      return;
    }

    // iso_series switch: size list changes, rebuild to refresh dropdown
    if (fieldId === "iso_series") {
      _state = applyFieldToState(_state, fieldId, rawValue);
      TC.ui.init(CONTAINER_ID, _state);
      TC.ui.bindEvents(onFieldChange);
      recompute(null);
      return;
    }

    // Normal field change
    _state = applyFieldToState(_state, fieldId, rawValue);
    recompute(fieldId);
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────────
  function init() {
    // Start with ISO metric 60° default state
    var defaultFamily = TC.registry.get("iso-metric-60");
    _state = defaultFamily.getDefaultState();

    TC.ui.init(CONTAINER_ID, _state);
    TC.ui.bindEvents(onFieldChange);
    recompute(null);
  }

  // ── Public API ────────────────────────────────────────────────────────────────
  TC.app = {
    init:     init,
    getState: function () { return Object.assign({}, _state); },
  };

  // Auto-start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
