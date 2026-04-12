// thread-calculator/families/bspp/config.js
// Field schema and section definitions for BSPP pipe threads (G parallel, ISO 228-1).
//
// Source: ISO 228-1:2000
//         "Pipe threads where pressure-tight joints are not made on the threads —
//          Part 1: Dimensions, tolerances and designation"
// All user-visible strings are in Norwegian (Nynorsk/Bokmål).
// Depends on: shared/formatting.js, families/bspp/data.js

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["bspp"] = TC.families["bspp"] || {};

  var data = TC.families["bspp"].data;

  // ── Sections ──────────────────────────────────────────────────────────────────
  var SECTIONS = [
    { id: "section_bspp_select", label: "BSPP st\u00f8rrelse og klasse"   },
    { id: "section_bspp_form",   label: "Gjengeprofil (55\u00b0)"          },
    { id: "section_bspp_int",    label: "Innvendig gjenge (G)"             },
    { id: "section_bspp_ext",    label: "Utvendig gjenge (G-A / G-B)"      },
  ];

  // ── Field definitions ─────────────────────────────────────────────────────────
  var FIELDS = [

    // ── Selection ───────────────────────────────────────────────────────────────
    {
      id: "bspp_size",
      label: "Nominell r\u00f8rst\u00f8rrelse",
      type: "select",
      unit: null,
      section: "section_bspp_select",
      visible: function () { return true; },
      editable: true,
      options: function () {
        return data.sizes.map(function (s) {
          return { value: s.key, label: s.label + " \u2014 " + s.tpi + " TPI" };
        });
      },
    },
    // ISO 228-1:2000 §4: Class A has tighter tolerances than Class B (external only)
    {
      id: "bspp_ext_class",
      label: "Toleranseklasse utvendig gjenge",
      type: "select",
      unit: null,
      section: "section_bspp_select",
      visible: function () { return true; },
      editable: true,
      options: function () {
        return [
          { value: "A", label: "Klasse A \u2014 smalare toleranse (= \u00b1 T\u1d05\u2082)" },
          { value: "B", label: "Klasse B \u2014 vidare toleranse (= \u00b1 2 \u00d7 T\u1d05\u2082)" },
        ];
      },
    },

    // ── Thread form ─────────────────────────────────────────────────────────────
    // ISO 228-1:2000 Table 1 col 2
    {
      id: "bspp_tpi",
      label: "Stigning per tomme (TPI)",
      type: "output", outputType: "scalar",
      unit: "TPI",
      section: "section_bspp_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.tpi(v); },
    },
    // ISO 228-1:2000 Table 1 col 3
    {
      id: "bspp_pitch_mm",
      label: "Stigning (P)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspp_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ISO 228-1:2000 §4 / Fig. 1: H = 0.960 491 P
    {
      id: "bspp_H_mm",
      label: "teoretisk profilh\u00f8gd (H)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspp_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ISO 228-1:2000 §3 / Fig. 1: h = 0.640 327 P
    {
      id: "bspp_h_mm",
      label: "Gjengedjupne mellom avrunda topp og botn (h)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspp_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ISO 228-1:2000 Fig. 1: crest and root radius r = 0.137 329 P
    {
      id: "bspp_r_mm",
      label: "Topp- og botnavrunding (R)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspp_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ISO 228-1:2000 §4: thread angle 55°, half = 27°30'
    {
      id: "bspp_flank_half",
      label: "Halvvinkel flanke",
      type: "output", outputType: "scalar",
      unit: "\u00b0",
      section: "section_bspp_form",
      visible: function () { return true; },
      formatter: function (v) { return "27\u00b030\u2032  (55\u00b0 total)"; },
    },

    // ── Internal thread (G) ─────────────────────────────────────────────────────
    //
    // ISO 228-1:2000 Table 1:
    //   Internal major D: lower deviation = 0; no upper limit specified.
    //   Shown as range with max = null → displays "—" in Maks column.
    {
      id: "bspp_int_major",
      label: "Toppdiameter innvendig D",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspp_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // ISO 228-1:2000 Table 1 cols 8/9: TD2 lower = 0, upper = +TD2
    {
      id: "bspp_int_pitch",
      label: "Delediameter innvendig D\u2082",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspp_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // ISO 228-1:2000 Table 1 cols 13/14: TD1 lower = 0, upper = +TD1
    {
      id: "bspp_int_minor",
      label: "Rotdiameter innvendig D\u2081",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspp_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },

    // ── External thread (G-A or G-B) ────────────────────────────────────────────
    //
    // ISO 228-1:2000 Table 1 col 15/16: Td lower = -Td, upper = 0
    {
      id: "bspp_ext_major",
      label: "Toppdiameter utvendig d",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspp_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // ISO 228-1:2000 Table 1 cols 10/11:
    //   Class A: lower = -TD2, upper = 0
    //   Class B: lower = -2×TD2, upper = 0
    {
      id: "bspp_ext_pitch",
      label: "Delediameter utvendig d\u2082",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspp_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // Minor diameter of external thread: basic value (no tolerance specified in standard)
    {
      id: "bspp_ext_minor",
      label: "Rotdiameter utvendig d\u2081 (grunnverdi)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspp_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
  ];

  // ── Family metadata ───────────────────────────────────────────────────────────
  TC.families["bspp"].meta = {
    id:          "bspp",
    label:       "BSP sylindisk r\u00f8rgjenge (G)",
    labelShort:  "BSPP",
    modes:       ["standard"],
    defaultMode: "standard",
    image:       "../../assets/images/bspp-thread.png",
    imageWidth:  1000,
  };

  TC.families["bspp"].config = {
    sections: SECTIONS,
    fields:   FIELDS,
  };

})();
