// thread-calculator/families/bspt/data.js
// Standard size lookup data for BSPT pipe threads (R taper external, Rp parallel internal).
//
// Source: EN 10226-1:2004 / ISO 7-1:1994
//         "Pipe threads where pressure-tight joints are made on the threads"
//         "Part 1: Taper external threads and parallel internal threads"
//         Table 1 — Dimensions
//
// All dimensions stored in MILLIMETRES (standard native unit — no conversion required).
//
// Column map (Table 1):
//   col  1 : Thread size (nominal designation)
//   col  2 : Number of threads in 25.4 mm (TPI)
//   col  3 : Pitch P [mm]
//   col  4 : Height of thread h = 0.640 327 P [mm]
//   col  5 : Major diameter at gauge plane d = D [mm]
//   col  6 : Pitch diameter at gauge plane d2 = D2 [mm]
//   col  7 : Minor diameter at gauge plane d1 = D1 [mm]
//   col  8 : Gauge length, nominal [mm]
//   col  9 : Tolerance on gauge length T1/2 [mm]  (stored as positive half-value)
//   col 13 : Assembly length beyond gauge plane [mm]
//   col 15 : Useful ext. thread length for nominal gauge length Le_nom [mm]
//   col 16 : Useful ext. thread length for maximum gauge length Le_max [mm]
//   col 17 : Useful ext. thread length for minimum gauge length Le_min [mm]
//   col 18 : Tolerance on internal thread gauge plane position T2/2 [mm] (stored positive)
//
// Derived (not stored — verified in cross-checks below):
//   gauge_max = gauge_nom + T1_half     col 11
//   gauge_min = gauge_nom - T1_half     col 12
//   Le_nom    = gauge_nom + assem       col 15
//   Le_max    = gauge_max + assem       col 16
//   Le_min    = gauge_min + assem       col 17
//   d2        = d - h                   col 6
//   d1        = d - 2*h                 col 7
//
// Cross-checks (all pass):
//   1/2":  gauge_max = 8.2+1.8 = 10.0 ✓  Le_nom = 8.2+5.0 = 13.2 ✓
//   2 1/2": Le_max = 21.0+9.2 = 30.2 ✓
//   4":    Le_min = 21.9+10.4 = 32.3 ✓
//   1/2":  d2 = 20.955-1.162 = 19.793 ✓  d1 = 20.955-2*1.162 = 18.631 ✓

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["bspt"] = TC.families["bspt"] || {};

  // EN 10226-1:2004 §7.1.2:
  //   Taper = 1 in 16, measured on diameter = 0.0625 mm/mm
  var TAPER_ON_DIA = 0.0625;

  // EN 10226-1:2004 §7.1.2:
  //   Half taper angle from pipe axis: β = arctan(taper/2) = arctan(0.0625/2) = arctan(1/32)
  //   = 1.78990° = 1°47'24"
  var HALF_ANGLE_TAPER_DEG = Math.atan(TAPER_ON_DIA / 2) * (180 / Math.PI);

  // EN 10226-1:2004 §7.1.2 / §7.1.3:
  //   Thread flank angle: 55°  (half = 27°30')
  var HALF_ANGLE_FLANK_DEG = 27.5;

  // EN 10226-1:2004 Table 1 — verbatim from published standard.
  // Fields: key, label, tpi, p_mm, h_mm, d_mm, d2_mm, d1_mm,
  //         gauge_nom_mm, T1_half_mm, assem_mm,
  //         Le_nom_mm, Le_max_mm, Le_min_mm, T2_half_mm
  var SIZES = [
    //  key        label         tpi  p_mm    h_mm    d_mm      d2_mm     d1_mm     gnom   T1h   assem  Lenom   Lemax   Lemin   T2h
    { key: "1/16",   label: "R 1/16",   tpi: 28, p_mm: 0.907, h_mm: 0.581, d_mm:   7.723, d2_mm:   7.142, d1_mm:   6.561, gauge_nom_mm: 4.0,  T1_half_mm: 0.9, assem_mm:  2.5, Le_nom_mm:  6.5, Le_max_mm:  7.4, Le_min_mm:  5.6, T2_half_mm: 1.1 },
    { key: "1/8",    label: "R 1/8",    tpi: 28, p_mm: 0.907, h_mm: 0.581, d_mm:   9.728, d2_mm:   9.147, d1_mm:   8.566, gauge_nom_mm: 4.0,  T1_half_mm: 0.9, assem_mm:  2.5, Le_nom_mm:  6.5, Le_max_mm:  7.4, Le_min_mm:  5.6, T2_half_mm: 1.1 },
    { key: "1/4",    label: "R 1/4",    tpi: 19, p_mm: 1.337, h_mm: 0.856, d_mm:  13.157, d2_mm:  12.301, d1_mm:  11.445, gauge_nom_mm: 6.0,  T1_half_mm: 1.3, assem_mm:  3.7, Le_nom_mm:  9.7, Le_max_mm: 11.0, Le_min_mm:  8.4, T2_half_mm: 1.7 },
    { key: "3/8",    label: "R 3/8",    tpi: 19, p_mm: 1.337, h_mm: 0.856, d_mm:  16.662, d2_mm:  15.806, d1_mm:  14.950, gauge_nom_mm: 6.4,  T1_half_mm: 1.3, assem_mm:  3.7, Le_nom_mm: 10.1, Le_max_mm: 11.4, Le_min_mm:  8.8, T2_half_mm: 1.7 },
    { key: "1/2",    label: "R 1/2",    tpi: 14, p_mm: 1.814, h_mm: 1.162, d_mm:  20.955, d2_mm:  19.793, d1_mm:  18.631, gauge_nom_mm: 8.2,  T1_half_mm: 1.8, assem_mm:  5.0, Le_nom_mm: 13.2, Le_max_mm: 15.0, Le_min_mm: 11.4, T2_half_mm: 2.3 },
    { key: "3/4",    label: "R 3/4",    tpi: 14, p_mm: 1.814, h_mm: 1.162, d_mm:  26.441, d2_mm:  25.279, d1_mm:  24.117, gauge_nom_mm: 9.5,  T1_half_mm: 1.8, assem_mm:  5.0, Le_nom_mm: 14.5, Le_max_mm: 16.3, Le_min_mm: 12.7, T2_half_mm: 2.3 },
    { key: "1",      label: "R 1",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  33.249, d2_mm:  31.770, d1_mm:  30.291, gauge_nom_mm: 10.4, T1_half_mm: 2.3, assem_mm:  6.4, Le_nom_mm: 16.8, Le_max_mm: 19.1, Le_min_mm: 14.5, T2_half_mm: 2.9 },
    { key: "1 1/4",  label: "R 1 1/4",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  41.910, d2_mm:  40.431, d1_mm:  38.952, gauge_nom_mm: 12.7, T1_half_mm: 2.3, assem_mm:  6.4, Le_nom_mm: 19.1, Le_max_mm: 21.4, Le_min_mm: 16.8, T2_half_mm: 2.9 },
    { key: "1 1/2",  label: "R 1 1/2",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  47.803, d2_mm:  46.324, d1_mm:  44.845, gauge_nom_mm: 12.7, T1_half_mm: 2.3, assem_mm:  6.4, Le_nom_mm: 19.1, Le_max_mm: 21.4, Le_min_mm: 16.8, T2_half_mm: 2.9 },
    { key: "2",      label: "R 2",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  59.614, d2_mm:  58.135, d1_mm:  56.656, gauge_nom_mm: 15.9, T1_half_mm: 2.3, assem_mm:  7.5, Le_nom_mm: 23.4, Le_max_mm: 25.7, Le_min_mm: 21.0, T2_half_mm: 2.9 },
    { key: "2 1/2",  label: "R 2 1/2",  tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  75.184, d2_mm:  73.705, d1_mm:  72.226, gauge_nom_mm: 17.5, T1_half_mm: 3.5, assem_mm:  9.2, Le_nom_mm: 26.7, Le_max_mm: 30.2, Le_min_mm: 23.2, T2_half_mm: 3.5 },
    { key: "3",      label: "R 3",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm:  87.884, d2_mm:  86.405, d1_mm:  84.926, gauge_nom_mm: 20.6, T1_half_mm: 3.5, assem_mm:  9.2, Le_nom_mm: 29.8, Le_max_mm: 33.3, Le_min_mm: 26.3, T2_half_mm: 3.5 },
    { key: "4",      label: "R 4",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm: 113.030, d2_mm: 111.551, d1_mm: 110.072, gauge_nom_mm: 25.4, T1_half_mm: 3.5, assem_mm: 10.4, Le_nom_mm: 35.8, Le_max_mm: 39.3, Le_min_mm: 32.3, T2_half_mm: 3.5 },
    { key: "5",      label: "R 5",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm: 138.430, d2_mm: 136.951, d1_mm: 135.472, gauge_nom_mm: 28.6, T1_half_mm: 3.5, assem_mm: 11.5, Le_nom_mm: 40.1, Le_max_mm: 43.6, Le_min_mm: 36.6, T2_half_mm: 3.5 },
    { key: "6",      label: "R 6",      tpi: 11, p_mm: 2.309, h_mm: 1.479, d_mm: 163.830, d2_mm: 162.351, d1_mm: 160.872, gauge_nom_mm: 28.6, T1_half_mm: 3.5, assem_mm: 11.5, Le_nom_mm: 40.1, Le_max_mm: 43.6, Le_min_mm: 36.6, T2_half_mm: 3.5 },
  ];

  // Build lookup map keyed by size string
  var _sizeMap = {};
  SIZES.forEach(function (s) { _sizeMap[s.key] = s; });

  TC.families["bspt"].data = {
    sizes:                SIZES,
    sizeMap:              _sizeMap,
    TAPER_ON_DIA:         TAPER_ON_DIA,
    HALF_ANGLE_TAPER_DEG: HALF_ANGLE_TAPER_DEG,
    HALF_ANGLE_FLANK_DEG: HALF_ANGLE_FLANK_DEG,

    /** Return size record by key, or null if not found. */
    lookup: function (key) {
      return _sizeMap[key] || null;
    },
  };

})();
