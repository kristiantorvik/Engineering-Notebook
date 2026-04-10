// thread-calculator/families/npt/data.js
// Standard size lookup data for NPT taper pipe threads.
//
// Source: ASME B1.20.1-2013, "Pipe Threads, General Purpose (Inch)"
//         Table 2 "Basic Dimensions of American National Standard Taper Pipe Thread, NPT"
//         Columns 1–24.
//
// All dimensions stored in INCHES to match the standard's native unit system.
// Conversion to SI (mm) is performed exclusively in compute.js.
//
// Column map (Table 2):
//   col  1 : Nominal Pipe Size
//   col  2 : D_in     — outside diameter of pipe [in]
//   col  3 : tpi      — threads per inch
//   col  4 : P        — pitch = 1/tpi [in] (computed, not stored)
//   col  5 : E0_in    — basic pitch dia at small end of external thread [in]
//   col  6 : L1_in    — hand-tight engagement length [in]
//   col  7 : (L1 in threads — not stored)
//   col  8 : E1_in    — basic pitch dia at L1 plane (hand-tight / gaging notch) [in]
//   col  9 : L2_in    — effective thread length, external [in]
//   col 10 : (L2 in threads — not stored)
//   col 11 : E2_in    — basic pitch dia at effective thread length plane L2 [in]
//   col 12 : wm_ext_in — wrench make-up, external = L2 − L1 [in]
//   col 13 : (wm_ext in threads — not stored)
//   col 14 : L3_in    — wrench engagement length, internal thread [in]
//   col 15 : (L3 in threads — not stored)
//   col 16 : E3_in    — basic pitch dia at internal wrench engagement plane [in]
//   col 17 : V_in     — vanish thread length (= P × 3.47, tabulated) [in]
//   col 18 : (V in threads — not stored)
//   col 19 : L4_in    — overall external thread length including vanish [in]
//   col 20 : L5_in    — complete thread length (where thread form becomes full) [in]
//   col 21 : E5_in    — basic pitch dia at complete thread plane L5 [in]
//   col 22 : h_in     — truncated thread height h = 0.800 × P [in]
//   col 23 : delta_d_in — change in pitch dia per one turn = 0.0625/n [in/turn]
//   col 24 : K0_in    — basic minor dia at small end of external thread [in]

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["npt"] = TC.families["npt"] || {};

  // ASME B1.20.1-2013 §3.1.5:
  //   Taper: 1 in 16 measured on diameter = 0.0625 in/in
  var TAPER_IN_PER_IN = 0.0625;

  // ASME B1.20.1-2013 §2.2, §3.1.5:
  //   Half-angle from pipe axis: α = arctan(taper / 2) = arctan(0.0625 / 2)
  //   = 1.78990° = 1° 47' 24"  (stored as degrees for display)
  var HALF_ANGLE_DEG = Math.atan(TAPER_IN_PER_IN / 2) * (180 / Math.PI);

  // ASME B1.20.1-2013, Table 2
  // Values are verbatim from the published table (4–5 decimal place precision).
  // Each row: [col1, col2, col3, col5, col6, col8, col9, col11, col12, col14, col16, col17, col19, col20, col21, col22, col23, col24]
  var SIZES = [
    //  key      label       D_in    tpi     E0_in     L1_in    E1_in     L2_in    E3_in     wm_ext_in L3_in    E5_in     L5_in    L4_in    V_in     E2_in     h_in     delta_d_in K0_in
    { key: "1/16",  label: '1/16"',  D_in: 0.3125,  tpi: 27,   E0_in: 0.27118, L1_in: 0.1600, E1_in: 0.28118, L2_in: 0.2611, E2_in: 0.28750, wm_ext_in: 0.1011, L3_in: 0.1111, E3_in: 0.26424, V_in: 0.1285, L4_in: 0.3896, L5_in: 0.1870, E5_in: 0.28287, h_in: 0.02963, delta_d_in: 0.00231, K0_in: 0.2415 },
    { key: "1/8",   label: '1/8"',   D_in: 0.4050,  tpi: 27,   E0_in: 0.36351, L1_in: 0.1615, E1_in: 0.37360, L2_in: 0.2639, E2_in: 0.38000, wm_ext_in: 0.1024, L3_in: 0.1111, E3_in: 0.35656, V_in: 0.1285, L4_in: 0.3924, L5_in: 0.1898, E5_in: 0.37537, h_in: 0.02963, delta_d_in: 0.00231, K0_in: 0.3338 },
    { key: "1/4",   label: '1/4"',   D_in: 0.5400,  tpi: 18,   E0_in: 0.47739, L1_in: 0.2278, E1_in: 0.49163, L2_in: 0.4018, E2_in: 0.50250, wm_ext_in: 0.1740, L3_in: 0.1667, E3_in: 0.46697, V_in: 0.1928, L4_in: 0.5946, L5_in: 0.2907, E5_in: 0.49556, h_in: 0.04444, delta_d_in: 0.00347, K0_in: 0.4329 },
    { key: "3/8",   label: '3/8"',   D_in: 0.6750,  tpi: 18,   E0_in: 0.61201, L1_in: 0.2400, E1_in: 0.62701, L2_in: 0.4078, E2_in: 0.63750, wm_ext_in: 0.1678, L3_in: 0.1667, E3_in: 0.60160, V_in: 0.1928, L4_in: 0.6006, L5_in: 0.2967, E5_in: 0.63056, h_in: 0.04444, delta_d_in: 0.00347, K0_in: 0.5675 },
    { key: "1/2",   label: '1/2"',   D_in: 0.8400,  tpi: 14,   E0_in: 0.75843, L1_in: 0.3200, E1_in: 0.77843, L2_in: 0.5337, E2_in: 0.79178, wm_ext_in: 0.2137, L3_in: 0.2143, E3_in: 0.74504, V_in: 0.2479, L4_in: 0.7815, L5_in: 0.3909, E5_in: 0.78286, h_in: 0.05714, delta_d_in: 0.00446, K0_in: 0.7014 },
    { key: "3/4",   label: '3/4"',   D_in: 1.0500,  tpi: 14,   E0_in: 0.96768, L1_in: 0.3390, E1_in: 0.98887, L2_in: 0.5457, E2_in: 1.00178, wm_ext_in: 0.2067, L3_in: 0.2143, E3_in: 0.95429, V_in: 0.2479, L4_in: 0.7935, L5_in: 0.4029, E5_in: 0.99286, h_in: 0.05714, delta_d_in: 0.00446, K0_in: 0.9106 },
    { key: "1",     label: '1"',     D_in: 1.3150,  tpi: 11.5, E0_in: 1.21363, L1_in: 0.4000, E1_in: 1.23863, L2_in: 0.6828, E2_in: 1.25631, wm_ext_in: 0.2828, L3_in: 0.2609, E3_in: 1.19733, V_in: 0.3017, L4_in: 0.9845, L5_in: 0.5089, E5_in: 1.24544, h_in: 0.06957, delta_d_in: 0.00543, K0_in: 1.1441 },
    { key: "1-1/4", label: '1-1/4"', D_in: 1.6600,  tpi: 11.5, E0_in: 1.55713, L1_in: 0.4200, E1_in: 1.58338, L2_in: 0.7068, E2_in: 1.60131, wm_ext_in: 0.2868, L3_in: 0.2609, E3_in: 1.54083, V_in: 0.3017, L4_in: 1.0085, L5_in: 0.5329, E5_in: 1.59044, h_in: 0.06957, delta_d_in: 0.00543, K0_in: 1.4876 },
    { key: "1-1/2", label: '1-1/2"', D_in: 1.9000,  tpi: 11.5, E0_in: 1.79609, L1_in: 0.4200, E1_in: 1.82234, L2_in: 0.7235, E2_in: 1.84131, wm_ext_in: 0.3035, L3_in: 0.2609, E3_in: 1.77978, V_in: 0.3017, L4_in: 1.0252, L5_in: 0.5496, E5_in: 1.83044, h_in: 0.06957, delta_d_in: 0.00543, K0_in: 1.7266 },
    { key: "2",     label: '2"',     D_in: 2.3750,  tpi: 11.5, E0_in: 2.26902, L1_in: 0.4360, E1_in: 2.29627, L2_in: 0.7565, E2_in: 2.31630, wm_ext_in: 0.3205, L3_in: 0.2609, E3_in: 2.25272, V_in: 0.3017, L4_in: 1.0582, L5_in: 0.5826, E5_in: 2.30543, h_in: 0.06957, delta_d_in: 0.00543, K0_in: 2.1995 },
    { key: "2-1/2", label: '2-1/2"', D_in: 2.8750,  tpi: 8,    E0_in: 2.71953, L1_in: 0.6820, E1_in: 2.76216, L2_in: 1.1375, E2_in: 2.79063, wm_ext_in: 0.4555, L3_in: 0.2500, E3_in: 2.70391, V_in: 0.4338, L4_in: 1.5712, L5_in: 0.8875, E5_in: 2.77500, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 2.6195 },
    { key: "3",     label: '3"',     D_in: 3.5000,  tpi: 8,    E0_in: 3.34063, L1_in: 0.7660, E1_in: 3.38850, L2_in: 1.2000, E2_in: 3.41563, wm_ext_in: 0.4340, L3_in: 0.2500, E3_in: 3.32500, V_in: 0.4338, L4_in: 1.6337, L5_in: 0.9500, E5_in: 3.40000, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 3.2406 },
    { key: "3-1/2", label: '3-1/2"', D_in: 4.0000,  tpi: 8,    E0_in: 3.83750, L1_in: 0.8210, E1_in: 3.88881, L2_in: 1.2500, E2_in: 3.91563, wm_ext_in: 0.4290, L3_in: 0.2500, E3_in: 3.82188, V_in: 0.4338, L4_in: 1.6837, L5_in: 1.0000, E5_in: 3.90000, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 3.7374 },
    { key: "4",     label: '4"',     D_in: 4.5000,  tpi: 8,    E0_in: 4.33438, L1_in: 0.8440, E1_in: 4.38713, L2_in: 1.3000, E2_in: 4.41563, wm_ext_in: 0.4560, L3_in: 0.2500, E3_in: 4.31875, V_in: 0.4338, L4_in: 1.7337, L5_in: 1.0500, E5_in: 4.40000, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 4.2343 },
    { key: "5",     label: '5"',     D_in: 5.5630,  tpi: 8,    E0_in: 5.39073, L1_in: 0.9370, E1_in: 5.44929, L2_in: 1.4063, E2_in: 5.47863, wm_ext_in: 0.4693, L3_in: 0.2500, E3_in: 5.37511, V_in: 0.4338, L4_in: 1.8400, L5_in: 1.1563, E5_in: 5.46300, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 5.2907 },
    { key: "6",     label: '6"',     D_in: 6.6250,  tpi: 8,    E0_in: 6.44609, L1_in: 0.9580, E1_in: 6.50597, L2_in: 1.5125, E2_in: 6.54063, wm_ext_in: 0.5545, L3_in: 0.2500, E3_in: 6.43047, V_in: 0.4338, L4_in: 1.9462, L5_in: 1.2625, E5_in: 6.52500, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 6.3460 },
    { key: "8",     label: '8"',     D_in: 8.6250,  tpi: 8,    E0_in: 8.43359, L1_in: 1.0630, E1_in: 8.50003, L2_in: 1.7125, E2_in: 8.54063, wm_ext_in: 0.6495, L3_in: 0.2500, E3_in: 8.41797, V_in: 0.4338, L4_in: 2.1462, L5_in: 1.4625, E5_in: 8.52500, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 8.3335 },
    { key: "10",    label: '10"',    D_in: 10.7500, tpi: 8,    E0_in: 10.54531, L1_in: 1.2100, E1_in: 10.62094, L2_in: 1.9250, E2_in: 10.66563, wm_ext_in: 0.7150, L3_in: 0.2500, E3_in: 10.52969, V_in: 0.4338, L4_in: 2.3587, L5_in: 1.6750, E5_in: 10.65000, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 10.4453 },
    { key: "12",    label: '12"',    D_in: 12.7500, tpi: 8,    E0_in: 12.53281, L1_in: 1.3600, E1_in: 12.61781, L2_in: 2.1250, E2_in: 12.66563, wm_ext_in: 0.7650, L3_in: 0.2500, E3_in: 12.51719, V_in: 0.4338, L4_in: 2.5587, L5_in: 1.8750, E5_in: 12.65000, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 12.4328 },
    { key: "14",    label: '14"',    D_in: 14.0000, tpi: 8,    E0_in: 13.77500, L1_in: 1.5620, E1_in: 13.87263, L2_in: 2.2500, E2_in: 13.91563, wm_ext_in: 0.6880, L3_in: 0.2500, E3_in: 13.75938, V_in: 0.4338, L4_in: 2.6837, L5_in: 2.0000, E5_in: 13.90000, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 13.6749 },
    { key: "16",    label: '16"',    D_in: 16.0000, tpi: 8,    E0_in: 15.76250, L1_in: 1.8120, E1_in: 15.87575, L2_in: 2.4500, E2_in: 15.91563, wm_ext_in: 0.6380, L3_in: 0.2500, E3_in: 15.74688, V_in: 0.4338, L4_in: 2.8837, L5_in: 2.2000, E5_in: 15.90000, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 15.6624 },
    { key: "18",    label: '18"',    D_in: 18.0000, tpi: 8,    E0_in: 17.75000, L1_in: 2.0000, E1_in: 17.87500, L2_in: 2.6500, E2_in: 17.91563, wm_ext_in: 0.6500, L3_in: 0.2500, E3_in: 17.73438, V_in: 0.4338, L4_in: 3.0837, L5_in: 2.4000, E5_in: 17.90000, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 17.6499 },
    { key: "20",    label: '20"',    D_in: 20.0000, tpi: 8,    E0_in: 19.73750, L1_in: 2.1250, E1_in: 19.87031, L2_in: 2.8500, E2_in: 19.91563, wm_ext_in: 0.7250, L3_in: 0.2500, E3_in: 19.72188, V_in: 0.4338, L4_in: 3.2837, L5_in: 2.6000, E5_in: 19.90000, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 19.6374 },
    { key: "24",    label: '24"',    D_in: 24.0000, tpi: 8,    E0_in: 23.71250, L1_in: 2.3750, E1_in: 23.86094, L2_in: 3.2500, E2_in: 23.91563, wm_ext_in: 0.8750, L3_in: 0.2500, E3_in: 23.69688, V_in: 0.4338, L4_in: 3.6837, L5_in: 3.0000, E5_in: 23.90000, h_in: 0.10000, delta_d_in: 0.00781, K0_in: 23.6124 },
  ];

  // Build lookup map keyed by size string
  var _sizeMap = {};
  SIZES.forEach(function (s) { _sizeMap[s.key] = s; });

  TC.families["npt"].data = {
    sizes:           SIZES,
    sizeMap:         _sizeMap,
    TAPER_IN_PER_IN: TAPER_IN_PER_IN,
    HALF_ANGLE_DEG:  HALF_ANGLE_DEG,

    /** Return size record by key, or null if not found. */
    lookup: function (key) {
      return _sizeMap[key] || null;
    },
  };

})();
