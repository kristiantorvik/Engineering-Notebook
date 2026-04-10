// thread-calculator/families/iso-metric-60/config.js
// Field schema and section definitions for ISO metric 60° threads.
// Depends on: shared/formatting.js, families/iso-metric-60/data.js

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["iso-metric-60"] = TC.families["iso-metric-60"] || {};

  var data = TC.families["iso-metric-60"].data;

  // ── Sections ─────────────────────────────────────────────────────────────────
  var SECTIONS = [
    { id: "section_std_select",  label: "Standardst\u00f8rrelse" },
    { id: "section_by_input",    label: "Manuell inndata" },
    { id: "section_ext_dims",    label: "Utvendige m\u00e5l" },
    { id: "section_int_dims",    label: "Innvendige m\u00e5l" },
    { id: "section_tolerance",   label: "Toleranse" },
    { id: "section_pitch_lead",  label: "Stigning, starter og gang" },
    { id: "section_mow",         label: "M\u00e5l over tr\u00e5dar" },
    { id: "section_engagement",  label: "Gjengeinngrep" },
  ];

  // ── Tolerance class options ───────────────────────────────────────────────────
  var EXT_CLASS_OPTIONS = [
    { value: "6g", label: "6g \u2014 standard" },
    { value: "6h", label: "6h \u2014 ingen frigang" },
    { value: "4g", label: "4g \u2014 presisjons" },
    { value: "4h", label: "4h \u2014 presisjons, ingen frigang" },
    { value: "8g", label: "8g \u2014 grov" },
  ];

  var INT_CLASS_OPTIONS = [
    { value: "6H", label: "6H \u2014 standard" },
    { value: "5H", label: "5H \u2014 presisjons" },
    { value: "4H", label: "4H \u2014 fin presisjons" },
    { value: "7H", label: "7H \u2014 grov" },
    { value: "6G", label: "6G \u2014 med frigang" },
  ];

  function sizeOptions(state) {
    var list = state.isoFine ? data.fine : data.coarse;
    return list.map(function (e) { return { value: e.key, label: e.label }; });
  }

  // ── Field definitions ─────────────────────────────────────────────────────────
  var FIELDS = [

    // ── Standard mode: series + size ──────────────────────────────────────────
    {
      id: "iso_series", label: "Stigningsserie", type: "select",
      unit: null, section: "section_std_select",
      visible: function (s) { return s.mode === "standard"; },
      editable: true,
      options: function () {
        return [
          { value: "coarse", label: "Grov (Standard)" },
          { value: "fine",   label: "Fin" },
        ];
      },
    },
    {
      id: "iso_size", label: "St\u00f8rrelse", type: "select",
      unit: null, section: "section_std_select",
      visible: function (s) { return s.mode === "standard"; },
      editable: true,
      options: sizeOptions,
    },

    // ── By-input mode ────────────────────────────────────────────────────────
    {
      id: "input_major", label: "Ytterdiameter", type: "number",
      min: 0.001,
      unit: "mm", section: "section_by_input",
      visible: function (s) { return s.mode === "by-input"; },
      editable: true,
      formatter: function (v) { return TC.fmt.mm(v, 3); },
      parser: TC.parse.float,
    },
    {
      id: "input_pitch", label: "Stigning", type: "number",
      min: 0.001,
      unit: "mm", section: "section_by_input",
      visible: function (s) { return s.mode === "by-input"; },
      editable: true,
      formatter: function (v) { return TC.fmt.mm(v, 3); },
      parser: TC.parse.float,
    },

    // ── External dimensions ──────────────────────────────────────────────────
    {
      id: "ext_major", label: "Ytterdiameter (d)", type: "output", outputType: "range",
      unit: "mm", section: "section_ext_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "ext_pitch_dia", label: "Delediameter (d\u2082)", type: "output", outputType: "range",
      unit: "mm", section: "section_ext_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "ext_minor", label: "Rotdiameter (d\u2083)", type: "output", outputType: "range",
      unit: "mm", section: "section_ext_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "ext_top_flat", label: "Toppflat breidd (P/8)", type: "output", outputType: "scalar",
      unit: "mm", section: "section_ext_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "ext_root_radius", label: "Rotradius R (Maks er anbefalt H/6)", type: "output", outputType: "range",
      unit: "mm", section: "section_ext_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "ext_thread_height", label: "Grunnprofil h\u00f8gde (H = \u221a3/2 \u00d7 P)", type: "output", outputType: "scalar",
      unit: "mm", section: "section_ext_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "ext_root_width", label: "Rotflat breidd", type: "output", outputType: "scalar",
      unit: "mm", section: "section_ext_dims",
      visible: function () { return false; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "ext_top_radius", label: "Toppradius", type: "output", outputType: "scalar",
      unit: "mm", section: "section_ext_dims",
      visible: function () { return false; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },

    // ── Internal dimensions ──────────────────────────────────────────────────
    {
      // D = d basic; no tolerance in ISO 965-1 (clearance diameter, not controlled)
      id: "int_major", label: "Stordiameter (D)", type: "output", outputType: "range",
      unit: "mm", section: "section_int_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "int_pitch_dia", label: "Delediameter (D\u2082)", type: "output", outputType: "range",
      unit: "mm", section: "section_int_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "int_minor", label: "Kjernem\u00e5l (D\u2081)", type: "output", outputType: "range",
      unit: "mm", section: "section_int_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "int_top_flat", label: "Kjerneflat breidd ved D\u2081 (P/4)", type: "output", outputType: "scalar",
      unit: "mm", section: "section_int_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "int_root_radius", label: "Rotradius", type: "output", outputType: "scalar",
      unit: "mm", section: "section_int_dims",
      visible: function () { return false; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "int_root_width", label: "Rotflat breidd (ved D)", type: "output", outputType: "scalar",
      unit: "mm", section: "section_int_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "int_thread_height", label: "Grunnprofil h\u00f8gde (H = \u221a3/2 \u00d7 P)", type: "output", outputType: "scalar",
      unit: "mm", section: "section_int_dims",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "int_top_radius", label: "Toppradius", type: "output", outputType: "scalar",
      unit: "mm", section: "section_int_dims",
      visible: function () { return false; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },

    // ── Tolerance ────────────────────────────────────────────────────────────
    {
      id: "ext_class", label: "Utvendig toleranseklasse", type: "select",
      unit: null, section: "section_tolerance",
      visible: function () { return true; },
      editable: true,
      options: function () { return EXT_CLASS_OPTIONS; },
    },
    {
      id: "int_class", label: "Innvendig toleranseklasse", type: "select",
      unit: null, section: "section_tolerance",
      visible: function () { return true; },
      editable: true,
      options: function () { return INT_CLASS_OPTIONS; },
    },

    // ── Pitch, starts, lead ──────────────────────────────────────────────────
    {
      id: "input_starts", label: "Antall starter", type: "integer",
      min: 1,
      unit: null, section: "section_pitch_lead",
      visible: function () { return true; },
      editable: true,
      formatter: function (v) { return v !== null ? String(v) : "1"; },
      parser: TC.parse.int,
    },
    {
      id: "pitch_val", label: "Stigning (p)", type: "output", outputType: "scalar",
      unit: "mm", section: "section_pitch_lead",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    {
      id: "lead_val", label: "Gang / Lead (l)", type: "output", outputType: "scalar",
      unit: "mm", section: "section_pitch_lead",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    {
      id: "H_val", label: "Profilh\u00f8gde (H = \u221a3/2 \u00d7 p)", type: "output", outputType: "scalar",
      unit: "mm", section: "section_pitch_lead",
      visible: function () { return false; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },

    // ── Measurement over wires ───────────────────────────────────────────────
    {
      id: "input_wire_dia", label: "Tr\u00e5ddiameter", type: "number",
      min: 0,
      unit: "mm", section: "section_mow",
      placeholder: function (state) {
        var p = state.pitch || state.inputPitch;
        return p ? TC.fmt.mm(TC.geo.bestWireDia(p), 4) : "";
      },
      visible: function () { return true; },
      editable: true,
      formatter: function (v) { return v ? TC.fmt.mm(v, 4) : "0"; },
      parser: TC.parse.float,
    },
    {
      id: "best_wire", label: "Beste tr\u00e5ddiameter (d\u1d21)", type: "output", outputType: "scalar",
      unit: "mm", section: "section_mow",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "mow_ext", label: "M\u00e5l over tr\u00e5dar, utv. (M)", type: "output", outputType: "range",
      unit: "mm", section: "section_mow",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },

    // ── Thread engagement ────────────────────────────────────────────────────
    {
      id: "input_target_pct", label: "\u00d8nsket gjengeinngrep", type: "number",
      min: 1, max: 100,
      unit: "%", section: "section_engagement",
      visible: function () { return true; },
      editable: true,
      formatter: function (v) { return TC.fmt.percent(v, 0); },
      parser: TC.parse.float,
    },
    {
      id: "drill_dia", label: "Berekna borediameter", type: "output", outputType: "scalar",
      unit: "mm", section: "section_engagement",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
  ];

  TC.families["iso-metric-60"].meta = {
    id:          "iso-metric-60",
    label:       "ISO metrisk 60\u00b0",
    labelShort:  "ISO metrisk",
    modes:       ["standard", "by-input"],
    defaultMode: "standard",
    image:       "../../assets/images/ISO-metric-thread.png",
    imageWidth:  1000,
  };

  TC.families["iso-metric-60"].config = {
    sections: SECTIONS,
    fields:   FIELDS,
  };

})();
