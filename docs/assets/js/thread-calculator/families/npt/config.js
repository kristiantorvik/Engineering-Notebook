// thread-calculator/families/npt/config.js
// Field schema and section definitions for NPT taper pipe threads.
//
// Source: ASME B1.20.1-2013, "Pipe Threads, General Purpose (Inch)"
// All user-visible strings are in Norwegian (Nynorsk/Bokmål).
// Depends on: shared/formatting.js, families/npt/data.js

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["npt"] = TC.families["npt"] || {};

  var data = TC.families["npt"].data;

  // ── Sections ──────────────────────────────────────────────────────────────────
  var SECTIONS = [
    { id: "section_npt_select",  label: "NPT størrelse"                         },
    { id: "section_npt_form",    label: "Gjengeprofil"                               },
    { id: "section_npt_ext",     label: "Utvendig gjenge"           },
    { id: "section_npt_int",     label: "Innvendig gjenge"          },
    { id: "section_npt_lengths", label: "Inngreplengder"                             },
    { id: "section_npt_minor",   label: "Kjernedata"                                 },
  ];

  // ── Field definitions ─────────────────────────────────────────────────────────
  var FIELDS = [

    // ── Size selection ──────────────────────────────────────────────────────────
    {
      id: "npt_size",
      label: "Nominell rørstørrelse",
      type: "select",
      unit: null,
      section: "section_npt_select",
      visible: function () { return true; },
      editable: true,
      options: function () {
        return data.sizes.map(function (s) {
          return { value: s.key, label: s.label + " \u2014 " + s.tpi + " TPI" };
        });
      },
    },

    // ── Thread form ─────────────────────────────────────────────────────────────
    // ASME B1.20.1-2013 §1.3.1, Table 2 col 3
    {
      id: "npt_tpi",
      label: "Stigning per tomme (TPI)",
      type: "output", outputType: "scalar",
      unit: "TPI",
      section: "section_npt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.tpi(v); },
    },
    // ASME B1.20.1-2013 §3.1.6: P = 1/n
    {
      id: "npt_pitch_mm",
      label: "Stigning mm",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ISO 68-1:2013 §5.1, 60° V-thread geometry: H = P × √3/2
    {
      id: "npt_H_mm",
      label: "Full teoretisk gjengehøgde (H)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ASME B1.20.1-2013 Table 2 col 22: h = 0.800 × P
    {
      id: "npt_h_mm",
      label: "Avkorta gjengedjupne (h)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ASME B1.20.1-2013 §3.1.6: equal truncation at crest and root
    // Δh = (H − h) / 2
    {
      id: "npt_trunc_mm",
      label: "Avkorting per side, topp og botn (fr, Ic)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ASME B1.20.1-2013 §3.1.6, 60° geometry: flat = 2Δh / tan(60°) = 2Δh/√3
    // Same flat width at crest and root; same for both internal and external thread.
    {
      id: "npt_flat_mm",
      label: "Flatebreidde ved topp og botn (Fr, Ic)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ASME B1.20.1-2013 §3.1.5: taper 1:16 on diameter, 0.0625 in/in, 0.75 in/ft
    // Fig. 2: β = arctan(0.0625/2) = 1° 47' 24"  (half taper angle from pipe axis)
    //         α = 30°  (half 60° thread flank angle — separate quantity)
    {
      id: "npt_half_angle",
      label: "Halv kjeglevinkel fr\u00e5 aksen (\u03b2)",
      type: "output", outputType: "scalar",
      unit: "\u00b0",
      section: "section_npt_form",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.deg(v) + "\u00b0  (1\u00b0 47\u2032 24\u2033)  \u2014  1:16 p\u00e5 diameter"; },
    },

    // ── External thread diameters ───────────────────────────────────────────────
    //
    // External thread (on pipe nipple): CREST = major (outer tips), ROOT = minor (groove bottom).
    //   d_major = E_n + h,  d_minor = E_n − h
    //
    // At small end / pipe face — E0 plane (ASME B1.20.1-2013 Table 2 cols 5, 24):
    {
      id: "npt_ext_d0",
      label: "Toppdiameter ved rørflaten (E\u2080)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ASME B1.20.1-2013 Table 2 col 5
    {
      id: "npt_ext_e0",
      label: "Delediameter ved rørflaten (E\u2080)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ASME B1.20.1-2013 Table 2 col 24: K0 = E0 − h (tabulated)
    {
      id: "npt_ext_k0",
      label: "Rotdiameter ved rørflaten (E\u2080)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    //
    // At E1 plane — hand-tight / gaging reference (ASME B1.20.1-2013 Table 2 col 8):
    // Range outputs: ±1 turn standoff tolerance per ASME B1.20.1-2013 §3.2.
    // Min = −1 turn, Mid = nominal, Max = +1 turn.
    {
      id: "npt_ext_d1",
      label: "Toppdiameter innspenningsmål (E\u2081) [\u00b11 omdr.]",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_npt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "npt_ext_e1",
      label: "Delediameter ved innspenningsmål (E\u2081) [\u00b11 omdr.]",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_npt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "npt_ext_k1",
      label: "Rotdiameter ved innspenningsmål (E\u2081) [\u00b11 omdr.]",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_npt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    //
    // At E2 plane — end of effective thread length L2 (cols 21, 2):
    //   By definition: d_major at E2 = E2 + h = D (pipe OD). Verified for all 24 sizes.
    {
      id: "npt_ext_d2",
      label: "Toppdiameter ved effektiv gjengelengde (E\u2082)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "npt_ext_e2",
      label: "Delediameter ved effektiv gjengelengde (E\u2082)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "npt_ext_k2",
      label: "Rotdiameter ved effektiv gjengelengde (E\u2082)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // At E5 plane — complete thread (col 16)
    {
      id: "npt_ext_e5",
      label: "Delediameter ved fullstendig gjengeplan (E\u2085)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_ext",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },

    // ── Internal thread diameters ───────────────────────────────────────────────
    //
    // Internal thread (in fitting): CREST = minor (ridge tips inside bore = smallest dia),
    //   ROOT = major (groove bottom in fitting wall = largest dia).
    //   d_root (major) = E_n + h,  d_crest (minor) = E_n − h
    //
    // Nominal values at the same axial planes equal the external thread values.
    // The distinction lies in which surface (crest or root) each diameter belongs to.
    //
    // Tap drill — scalar: nearest drill at or below this value
    // ASME B1.20.1-2013 Nonmandatory Appendix B:
    //   "should approximate the diameter K₀, column 24 of Table 2
    //    (Basic Minor Diameter at Small End of Pipe)"
    {
      id: "npt_tap_drill",
      label: "Gjengeborr for tapping (\u2248 K\u2080)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // At E1 plane — fitting face / hand-tight reference (Table 2 col 8):
    // Range outputs: ±1 turn standoff tolerance per ASME B1.20.1-2013 §3.2.
    {
      id: "npt_int_d1",
      label: "Rotdiameter ved innspenningsmål (E\u2081) [\u00b11 omdr.]",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_npt_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "npt_int_e1",
      label: "Delediameter ved innspenningsmål (E\u2081) [\u00b11 omdr.]",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_npt_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "npt_int_k1",
      label: "Toppdiameter ved innspenningsmål (E\u2081) [\u00b11 omdr.]",
      type: "output", outputType: "range",
      unit: "mm",
      section: "section_npt_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    //
    // At E3 plane — power wrench make-up (Table 2 col 11):
    {
      id: "npt_int_d3",
      label: "Rotdiameter ved tilsnøringsmål (E\u2083)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "npt_int_e3",
      label: "Delediameter ved tilsnøringsmål (E\u2083)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    {
      id: "npt_int_k3",
      label: "Toppdiameter ved tilsnøringsmål (E\u2083)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_int",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },

    // ── Engagement lengths ──────────────────────────────────────────────────────
    // ASME B1.20.1-2013 Table 2 col 6
    {
      id: "npt_L1_mm",
      label: "Håndsnøringslengde (L\u2081)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_lengths",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // ASME B1.20.1-2013 Table 2 col 9
    {
      id: "npt_L2_mm",
      label: "Effektiv gjengelengde, utvendig (L\u2082)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_lengths",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // ASME B1.20.1-2013 Table 2 col 12
    {
      id: "npt_wm_ext_mm",
      label: "Tiltrekningslengde utvendig (L\u2082\u2212L\u2081)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_lengths",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // ASME B1.20.1-2013 Table 2 col 14
    {
      id: "npt_L3_mm",
      label: "Tiltrekningslengde innvendig (L\u2083)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_lengths",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // ASME B1.20.1-2013 Table 2 col 17
    {
      id: "npt_L5_mm",
      label: "Lengde med fulle gjenger (L\u2085)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_lengths",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // ASME B1.20.1-2013 Table 2 col 19
    {
      id: "npt_L4_mm",
      label: "Total gjengelengde (L\u2084)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_lengths",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },
    // ASME B1.20.1-2013 Table 2 col 20
    {
      id: "npt_V_mm",
      label: "Avslutningsgjengelengde, ufulstendig gjenge (V)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_lengths",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 3); },
    },

    // ── Core reference data ─────────────────────────────────────────────────────
    // ASME B1.20.1-2013 Table 2 col 2
    {
      id: "npt_D_mm",
      label: "Nominell ytterdiameter r\u00f8r (D)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_minor",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
    // ASME B1.20.1-2013 Table 2 col 23: 0.0625/n — change in pitch dia per one turn
    {
      id: "npt_delta_d_mm",
      label: "Endring i delediameter per omdreiing (0,0625/n)",
      type: "output", outputType: "scalar",
      unit: "mm",
      section: "section_npt_minor",
      visible: function () { return true; },
      formatter: function (v) { return TC.fmt.mm(v, 4); },
    },
  ];

  // ── Family metadata ───────────────────────────────────────────────────────────
  TC.families["npt"].meta = {
    id:          "npt",
    label:       "NPT konisk r\u00f8rgjenge",
    labelShort:  "NPT",
    modes:       ["standard"],
    defaultMode: "standard",
    image:       "../../assets/images/NPT-thread.png",
    imageWidth:  1000,
  };

  TC.families["npt"].config = {
    sections: SECTIONS,
    fields:   FIELDS,
  };

})();
