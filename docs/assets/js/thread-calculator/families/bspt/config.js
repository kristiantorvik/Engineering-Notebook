// thread-calculator/families/bspt/config.js
// Field schema and section definitions for BSPT pipe threads (R / Rp).
//
// Source: EN 10226-1:2004 / ISO 7-1:1994
//         "Pipe threads where pressure-tight joints are made on the threads —
//          Part 1: Taper external threads and parallel internal threads"
// All user-visible strings are in Norwegian (Nynorsk/Bokmål).
// Depends on: shared/formatting.js, families/bspt/data.js

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["bspt"] = TC.families["bspt"] || {};

  var data = TC.families["bspt"].data;

  // ── Sections ──────────────────────────────────────────────────────────────────
  var SECTIONS = [
    { id: "section_bspt_select",  label: "BSPT st\u00f8rrelse"                          },
    { id: "section_bspt_form",    label: "Gjengeprofil (55\u00b0)"                       },
    { id: "section_bspt_ext",     label: "Utvendig konisk gjenge (R)"                   },
    { id: "section_bspt_int",     label: "Innvendig sylindisk gjenge (Rp)"               },
  ];

  // ── Field definitions ─────────────────────────────────────────────────────────
  var FIELDS = [

    // ── Size selection ──────────────────────────────────────────────────────────
    {
      id: "bspt_size",
      label: "Nominell r\u00f8rst\u00f8rrelse",
      type: "select",
      unit: null,
      section: "section_bspt_select",
      visible: function () { return true; },
      editable: true,
      options: function () {
        return data.sizes.map(function (s) {
          return { value: s.key, label: s.label + " \u2014 " + s.tpi + " TPI" };
        });
      },
    },

    // ── Thread form ─────────────────────────────────────────────────────────────
    // EN 10226-1:2004 Table 1 col 2
    {
      id: "bspt_tpi",
      label: "Stigning per tomme (TPI)",
      type: "output", outputType: "scalar",
      unit: "TPI",
      section: "section_bspt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.tpi(v); },
    },
    // EN 10226-1:2004 Table 1 col 3
    {
      id: "bspt_pitch_mm",
      label: "Stigning (P)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // EN 10226-1:2004 Fig. 1 / Fig. 2 (55° profile):
    //   H = 0.960 491 P  (full triangle height; h_b in fig. 1 label uses 'H')
    {
      id: "bspt_H_mm",
      label: "Teoretisk profilh\u00f8gde (H)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // EN 10226-1:2004 §4 symbols / Table 1 col 4:
    //   h = 0.640 327 P  (height between rounded crests and roots)
    {
      id: "bspt_h_mm",
      label: "Høgde mellom avrunda topp og botn (h)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // EN 10226-1:2004 Fig. 1: crest and root radius r = 0.137 329 P
    {
      id: "bspt_r_mm",
      label: "Topp- og botnavrunding (R)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // EN 10226-1:2004 §7.1.2 / §7.1.3: Thread flank angle = 55°, half = 27°30'
    {
      id: "bspt_flank_half",
      label: "Halvvinkel flanke",
      type: "output", outputType: "scalar",
      unit: "\u00b0",
      section: "section_bspt_form",
      visible: function () { return true; },
      formatter: function (v) { return "27\u00b030\u2032  (55\u00b0 total)"; },
    },
    // EN 10226-1:2004 §7.1.2: Taper 1:16 on diameter
    //   β = arctan(1/32) = 1.78990° = 1°47'24"
    {
      id: "bspt_taper_half",
      label: "Halvvinkel kjegle fr\u00e5 aksen (\u03b2)",
      type: "output", outputType: "scalar",
      unit: "\u00b0",
      section: "section_bspt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.deg(v) + "\u00b0  (1\u00b047\u203224\u2033)  \u2014  1:16 p\u00e5 diameter"; },
    },

    // ── External taper thread (R) ───────────────────────────────────────────────
    // EN 10226-1:2004 Table 1 col 5: major diameter at gauge plane
    {
      id: "bspt_ext_major",
      label: "Toppdiameter ved m\u00e5lplan (d)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // EN 10226-1:2004 Table 1 col 6: pitch diameter at gauge plane
    {
      id: "bspt_ext_pitch",
      label: "Delediameter ved m\u00e5lplan (d\u2082)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // EN 10226-1:2004 Table 1 col 7: minor diameter at gauge plane
    {
      id: "bspt_ext_minor",
      label: "Rotdiameter ved m\u00e5lplan (d\u2081)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // ── Pipe face (small end) — derived from gauge plane via taper 1:16 ───────────
    // d_face = d_gauge − gauge_length × (1/16)
    // Range because gauge length has ±T₁/2 tolerance:
    //   min = d_gauge − gauge_max/16 (longest gauge → smallest face dia)
    //   mid = d_gauge − gauge_nom/16 (nominal)
    //   max = d_gauge − gauge_min/16 (shortest gauge → largest face dia)
    {
      id: "bspt_face_major",
      label: "Toppdiameter ved r\u00f8rende / liten ende (d_face)",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    {
      id: "bspt_face_pitch",
      label: "Delediameter ved r\u00f8rende / liten ende (d\u2082_face)",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    {
      id: "bspt_face_minor",
      label: "Rotdiameter ved r\u00f8rende / liten ende (d\u2081_face)",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },

    // EN 10226-1:2004 Table 1 cols 8/9/11/12:
    //   Gauge length nominal ± T1/2 → range [min, nom, max]
    //   T1/2 tolerance = ±1 turn for 1/16–2", ±1.5 turns for 2.5"–6"
    {
      id: "bspt_gauge_length",
      label: "Referanseplan fra rørende utvendig (gauge length)",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 1); },
    },
    // EN 10226-1:2004 Table 1 col 13: assembly length (make-up beyond gauge plane)
    {
      id: "bspt_assem_mm",
      label: "Monteringstillegg utover målplan",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 1); },
    },
    // Minimum thread length = gauge_nom + assem_mm.
    // The thread must span from the pipe face to the gauge plane AND cover the assembly zone.
    {
      id: "bspt_min_length",
      label: "Min. gjengelengde fr\u00e5 r\u00f8rende",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_bspt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 1); },
    },

    // ── Internal parallel thread (Rp) ───────────────────────────────────────────
    //
    // Rp is a PARALLEL thread — diameters are constant at every axial position.
    // Tolerances (Min/Midt/Maks) are the equivalent diametral tolerances from
    // EN 10226-1:2004 Table 1 footnote a: Teq = 2 × T2/2 × (1/16).
    // D (major): lower limit only — no upper limit defined in standard.
    //
    // EN 10226-1:2004 §4: D = d (same basic major diameter as external at gauge plane)
    {
      id: "bspt_int_major",
      label: "Toppdiameter D [\u00b1T\u1d07\u1d64/2 \u2014 sylindisk Rp]",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspt_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // EN 10226-1:2004 §4: D2 = D − 0.640 327 P; tolerance = Teq (Table 1 footnote a)
    {
      id: "bspt_int_pitch",
      label: "Delediameter D\u2082 [\u00b1T\u1d07\u1d64]",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspt_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // EN 10226-1:2004 §4: D1 = D − 1.280 654 P; tolerance = Teq (Table 1 footnote a)
    {
      id: "bspt_int_minor",
      label: "Rotdiameter D\u2081 [\u00b1T\u1d07\u1d64]",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_bspt_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
  ];

  // ── Family metadata ───────────────────────────────────────────────────────────
  TC.families["bspt"].meta = {
    id:          "bspt",
    label:       "BSP konisk r\u00f8rgjenge (R/Rp)",
    labelShort:  "BSPT",
    modes:       ["standard"],
    defaultMode: "standard",
    image:       "../../assets/images/bspt-thread.png",
    imageWidth:  1000,
  };

  TC.families["bspt"].config = {
    sections: SECTIONS,
    fields:   FIELDS,
  };

})();
