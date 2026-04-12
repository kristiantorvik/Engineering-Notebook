// thread-calculator/families/bspp/data.js
// Standard size lookup data for BSPP pipe threads (G parallel, both internal and external).
//
// Source: ISO 228-1:2000
//         "Pipe threads where pressure-tight joints are not made on the threads —
//          Part 1: Dimensions, tolerances and designation"
//         Table 1 — Thread dimensions
//
// All dimensions stored in MILLIMETRES (standard native unit — no conversion required).
//
// Column map (Table 1):
//   col  1 : Thread designation (size)
//   col  2 : Number of threads in 25.4 mm (TPI)
//   col  3 : Pitch P [mm]
//   col  4 : Height of thread h = 0.640 327 P [mm]
//   col  5 : Major diameter d = D [mm]
//   col  6 : Pitch diameter d2 = D2 [mm]
//   col  7 : Minor diameter d1 = D1 [mm]
//   col  8 : Internal thread pitch dia TD2 lower deviation = 0 (all sizes)
//   col  9 : Internal thread pitch dia TD2 upper deviation = +TD2 [mm]
//   col 10 : External thread pitch dia Class A lower deviation = -TD2 [mm]
//   col 11 : External thread pitch dia Class B lower deviation = -2×TD2 [mm]
//   col 12 : External thread pitch dia upper deviation = 0 (all sizes)
//   col 13 : Internal thread minor dia TD1 lower deviation = 0 (all sizes)
//   col 14 : Internal thread minor dia TD1 upper deviation = +TD1 [mm]
//   col 15 : External thread major dia Td lower deviation = -Td [mm]  (= -2×TD2)
//   col 16 : External thread major dia upper deviation = 0 (all sizes)
//
// Stored tolerances are positive magnitudes; signs applied in compute.js:
//   TD2  : Internal pitch ← [D2_basic,        D2_basic + TD2]
//          External Class A ← [d2_basic - TD2,  d2_basic     ]
//          External Class B ← [d2_basic - 2TD2, d2_basic     ]
//   TD1  : Internal minor ← [D1_basic,         D1_basic + TD1]
//   Td   : External major ← [d_basic - Td,     d_basic       ]
//   Internal major D: min = D_basic, no upper limit defined in standard.
//
// Verification:
//   Td = 2 × TD2 for all sizes (e.g. 1/2": Td=0.284 = 2×0.142 ✓, 1": 0.360=2×0.180 ✓)
//   d2 = d - 0.640 327 P  (e.g. 1/2": 20.955 - 0.640327×1.814 = 19.793 ✓)
//   d1 = d - 1.280 654 P  (e.g. 1/2": 20.955 - 1.280654×1.814 = 18.631 ✓)
//   24 sizes: 1/16 to 6, including 5/8, 7/8, 1 1/8, 1 3/4, 2 1/4, 2 3/4, 3 1/2, 4 1/2, 5 1/2

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["bspp"] = TC.families["bspp"] || {};

  // ISO 228-1:2000 §4 (Fig. 1 / Fig. 2):
  //   Thread flank angle 55°, half = 27°30'
  //   Profile identical to parallel thread in ISO 7-1.
  var HALF_ANGLE_FLANK_DEG = 27.5;

  // ISO 228-1:2000 Table 1 — verbatim from published standard.
  // Fields: key, label, tpi, p_mm, h_mm, d_mm, d2_mm, d1_mm, TD2, TD1, Td
  //
  // Note: Td = 2 × TD2 for all sizes (verified).
  //       TD2 and TD1 stored as positive values; signs applied in compute.js.
  var SIZES = [
    //  key        label         tpi  p_mm    h_mm    d_mm      d2_mm     d1_mm     TD2    TD1    Td
    { key: "1/16",   label: "G 1/16",   tpi: 28, p_mm: 0.907, h_mm: 0.581, d_mm:   7.723, d2_mm:   7.142, d1_mm:   6.561, TD2: 0.107, TD1: 0.282, Td: 0.214 },
    { key: "1/8",    label: "G 1/8",    tpi: 28, p_mm: 0.907, h_mm: 0.581, d_mm:   9.728, d2_mm:   9.147, d1_mm:   8.566, TD2: 0.107, TD1: 0.282, Td: 0.214 },
    { key: "1/4",    label: "G 1/4",    tpi: 19, p_mm: 1.337, h_mm: 0.856, d_mm:  13.157, d2_mm:  12.301, d1_mm:  11.445, TD2: 0.125, TD1: 0.445, Td: 0.250 },
    { key: "3/8",    label: "G 3/8",    tpi: 19, p_mm: 1.337, h_mm: 0.856, d_mm:  16.662, d2_mm:  15.806, d1_mm:  14.950, TD2: 0.125, TD1: 0.445, Td: 0.250 },
    { key: "1/2",    label: "G 1/2",    tpi: 14, p_mm: 1.814, h_mm: 1.162, d_mm:  20.955, d2_mm:  19.793, d1_mm:  18.631, TD2: 0.142, TD1: 0.541, Td: 0.284 },
    { key: "5/8",    label: "G 5/8",    tpi: 14, p_mm: 1.814, h_mm: 1.162, d_mm:  22.911, d2_mm:  21.749, d1_mm:  20.587, TD2: 0.142, TD1: 0.541, Td: 0.284 },
    { key: "3/4",    label: "G 3/4",    tpi: 14, p_mm: 1.814, h_mm: 1.162, d_mm:  26.441, d2_mm:  25.279, d1_mm:  24.117, TD2: 0.142, TD1: 0.541, Td: 0.284 },
    { key: "7/8",    label: "G 7/8",    tpi: 14, p_mm: 1.814, h_mm: 1.162, d_mm:  30.201, d2_mm:  29.039, d1_mm:  27.877, TD2: 0.142, TD1: 0.541, Td: 0.284 },
    { key: "1",      label: "G 1",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  33.249, d2_mm:  31.770, d1_mm:  30.291, TD2: 0.180, TD1: 0.640, Td: 0.360 },
    { key: "1 1/8",  label: "G 1 1/8",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  37.897, d2_mm:  36.418, d1_mm:  34.939, TD2: 0.180, TD1: 0.640, Td: 0.360 },
    { key: "1 1/4",  label: "G 1 1/4",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  41.910, d2_mm:  40.431, d1_mm:  38.952, TD2: 0.180, TD1: 0.640, Td: 0.360 },
    { key: "1 1/2",  label: "G 1 1/2",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  47.803, d2_mm:  46.324, d1_mm:  44.845, TD2: 0.180, TD1: 0.640, Td: 0.360 },
    { key: "1 3/4",  label: "G 1 3/4",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  53.746, d2_mm:  52.267, d1_mm:  50.788, TD2: 0.180, TD1: 0.640, Td: 0.360 },
    { key: "2",      label: "G 2",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  59.614, d2_mm:  58.135, d1_mm:  56.656, TD2: 0.180, TD1: 0.640, Td: 0.360 },
    { key: "2 1/4",  label: "G 2 1/4",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  65.710, d2_mm:  64.231, d1_mm:  62.752, TD2: 0.217, TD1: 0.640, Td: 0.434 },
    { key: "2 1/2",  label: "G 2 1/2",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  75.184, d2_mm:  73.705, d1_mm:  72.226, TD2: 0.217, TD1: 0.640, Td: 0.434 },
    { key: "2 3/4",  label: "G 2 3/4",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  81.534, d2_mm:  80.055, d1_mm:  78.576, TD2: 0.217, TD1: 0.640, Td: 0.434 },
    { key: "3",      label: "G 3",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  87.884, d2_mm:  86.405, d1_mm:  84.926, TD2: 0.217, TD1: 0.640, Td: 0.434 },
    { key: "3 1/2",  label: "G 3 1/2",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm: 100.330, d2_mm:  98.851, d1_mm:  97.372, TD2: 0.217, TD1: 0.640, Td: 0.434 },
    { key: "4",      label: "G 4",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm: 113.030, d2_mm: 111.551, d1_mm: 110.072, TD2: 0.217, TD1: 0.640, Td: 0.434 },
    { key: "4 1/2",  label: "G 4 1/2",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm: 125.730, d2_mm: 124.251, d1_mm: 122.772, TD2: 0.217, TD1: 0.640, Td: 0.434 },
    { key: "5",      label: "G 5",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm: 138.430, d2_mm: 136.951, d1_mm: 135.472, TD2: 0.217, TD1: 0.640, Td: 0.434 },
    { key: "5 1/2",  label: "G 5 1/2",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm: 151.130, d2_mm: 149.651, d1_mm: 148.172, TD2: 0.217, TD1: 0.640, Td: 0.434 },
    { key: "6",      label: "G 6",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm: 163.830, d2_mm: 162.351, d1_mm: 160.872, TD2: 0.217, TD1: 0.640, Td: 0.434 },
  ];

  // Build lookup map keyed by size string
  var _sizeMap = {};
  SIZES.forEach(function (s) { _sizeMap[s.key] = s; });

  TC.families["bspp"].data = {
    sizes:               SIZES,
    sizeMap:             _sizeMap,
    HALF_ANGLE_FLANK_DEG: HALF_ANGLE_FLANK_DEG,

    /** Return size record by key, or null if not found. */
    lookup: function (key) {
      return _sizeMap[key] || null;
    },
  };

})();
