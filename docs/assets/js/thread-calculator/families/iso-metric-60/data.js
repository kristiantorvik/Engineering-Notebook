// thread-calculator/families/iso-metric-60/data.js
// Standard size lookup data for ISO metric 60° threads.
// Sources: ISO 261 (preferred sizes), ISO 262, ISO 724 (metric thread geometry).

(function () {
  "use strict";

  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["iso-metric-60"] = TC.families["iso-metric-60"] || {};

  // ── Coarse pitch series (ISO 261 preferred sizes + second choice) ─────────────
  // Format: { key, label, d (mm), p (mm) }
  var COARSE = [
    { key: "M1x0.25",    label: "M1 \u00d7 0.25",    d:  1.0,  p: 0.25  },
    { key: "M1.1x0.25",  label: "M1.1 \u00d7 0.25",  d:  1.1,  p: 0.25  },
    { key: "M1.2x0.25",  label: "M1.2 \u00d7 0.25",  d:  1.2,  p: 0.25  },
    { key: "M1.4x0.3",   label: "M1.4 \u00d7 0.3",   d:  1.4,  p: 0.3   },
    { key: "M1.6x0.35",  label: "M1.6 \u00d7 0.35",  d:  1.6,  p: 0.35  },
    { key: "M1.8x0.35",  label: "M1.8 \u00d7 0.35",  d:  1.8,  p: 0.35  },
    { key: "M2x0.4",     label: "M2 \u00d7 0.4",     d:  2.0,  p: 0.4   },
    { key: "M2.2x0.45",  label: "M2.2 \u00d7 0.45",  d:  2.2,  p: 0.45  },
    { key: "M2.5x0.45",  label: "M2.5 \u00d7 0.45",  d:  2.5,  p: 0.45  },
    { key: "M3x0.5",     label: "M3 \u00d7 0.5",     d:  3.0,  p: 0.5   },
    { key: "M3.5x0.6",   label: "M3.5 \u00d7 0.6",   d:  3.5,  p: 0.6   },
    { key: "M4x0.7",     label: "M4 \u00d7 0.7",     d:  4.0,  p: 0.7   },
    { key: "M4.5x0.75",  label: "M4.5 \u00d7 0.75",  d:  4.5,  p: 0.75  },
    { key: "M5x0.8",     label: "M5 \u00d7 0.8",     d:  5.0,  p: 0.8   },
    { key: "M6x1",       label: "M6 \u00d7 1",       d:  6.0,  p: 1.0   },
    { key: "M7x1",       label: "M7 \u00d7 1",       d:  7.0,  p: 1.0   },
    { key: "M8x1.25",    label: "M8 \u00d7 1.25",    d:  8.0,  p: 1.25  },
    { key: "M9x1.25",    label: "M9 \u00d7 1.25",    d:  9.0,  p: 1.25  },
    { key: "M10x1.5",    label: "M10 \u00d7 1.5",    d: 10.0,  p: 1.5   },
    { key: "M11x1.5",    label: "M11 \u00d7 1.5",    d: 11.0,  p: 1.5   },
    { key: "M12x1.75",   label: "M12 \u00d7 1.75",   d: 12.0,  p: 1.75  },
    { key: "M14x2",      label: "M14 \u00d7 2",      d: 14.0,  p: 2.0   },
    { key: "M16x2",      label: "M16 \u00d7 2",      d: 16.0,  p: 2.0   },
    { key: "M18x2.5",    label: "M18 \u00d7 2.5",    d: 18.0,  p: 2.5   },
    { key: "M20x2.5",    label: "M20 \u00d7 2.5",    d: 20.0,  p: 2.5   },
    { key: "M22x2.5",    label: "M22 \u00d7 2.5",    d: 22.0,  p: 2.5   },
    { key: "M24x3",      label: "M24 \u00d7 3",      d: 24.0,  p: 3.0   },
    { key: "M27x3",      label: "M27 \u00d7 3",      d: 27.0,  p: 3.0   },
    { key: "M30x3.5",    label: "M30 \u00d7 3.5",    d: 30.0,  p: 3.5   },
    { key: "M33x3.5",    label: "M33 \u00d7 3.5",    d: 33.0,  p: 3.5   },
    { key: "M36x4",      label: "M36 \u00d7 4",      d: 36.0,  p: 4.0   },
    { key: "M39x4",      label: "M39 \u00d7 4",      d: 39.0,  p: 4.0   },
    { key: "M42x4.5",    label: "M42 \u00d7 4.5",    d: 42.0,  p: 4.5   },
    { key: "M45x4.5",    label: "M45 \u00d7 4.5",    d: 45.0,  p: 4.5   },
    { key: "M48x5",      label: "M48 \u00d7 5",      d: 48.0,  p: 5.0   },
    { key: "M52x5",      label: "M52 \u00d7 5",      d: 52.0,  p: 5.0   },
    { key: "M56x5.5",    label: "M56 \u00d7 5.5",    d: 56.0,  p: 5.5   },
    { key: "M60x5.5",    label: "M60 \u00d7 5.5",    d: 60.0,  p: 5.5   },
    { key: "M64x6",      label: "M64 \u00d7 6",      d: 64.0,  p: 6.0   },
    { key: "M68x6",      label: "M68 \u00d7 6",      d: 68.0,  p: 6.0   },
    { key: "M72x6",      label: "M72 \u00d7 6",      d: 72.0,  p: 6.0   },
    { key: "M76x6",      label: "M76 \u00d7 6",      d: 76.0,  p: 6.0   },
    { key: "M80x6",      label: "M80 \u00d7 6",      d: 80.0,  p: 6.0   },
    { key: "M85x6",      label: "M85 \u00d7 6",      d: 85.0,  p: 6.0   },
    { key: "M90x6",      label: "M90 \u00d7 6",      d: 90.0,  p: 6.0   },
    { key: "M95x6",      label: "M95 \u00d7 6",      d: 95.0,  p: 6.0   },
    { key: "M100x6",     label: "M100 \u00d7 6",     d:100.0,  p: 6.0   },
  ];

  // ── Fine pitch series (common selections from ISO 261) ────────────────────────
  var FINE = [
    { key: "M8x1",      label: "M8 \u00d7 1",      d:  8.0, p: 1.0  },
    { key: "M10x1.25",  label: "M10 \u00d7 1.25",  d: 10.0, p: 1.25 },
    { key: "M10x1",     label: "M10 \u00d7 1",     d: 10.0, p: 1.0  },
    { key: "M12x1.5",   label: "M12 \u00d7 1.5",   d: 12.0, p: 1.5  },
    { key: "M12x1.25",  label: "M12 \u00d7 1.25",  d: 12.0, p: 1.25 },
    { key: "M12x1",     label: "M12 \u00d7 1",     d: 12.0, p: 1.0  },
    { key: "M14x1.5",   label: "M14 \u00d7 1.5",   d: 14.0, p: 1.5  },
    { key: "M16x1.5",   label: "M16 \u00d7 1.5",   d: 16.0, p: 1.5  },
    { key: "M18x2",     label: "M18 \u00d7 2",     d: 18.0, p: 2.0  },
    { key: "M18x1.5",   label: "M18 \u00d7 1.5",   d: 18.0, p: 1.5  },
    { key: "M20x2",     label: "M20 \u00d7 2",     d: 20.0, p: 2.0  },
    { key: "M20x1.5",   label: "M20 \u00d7 1.5",   d: 20.0, p: 1.5  },
    { key: "M22x2",     label: "M22 \u00d7 2",     d: 22.0, p: 2.0  },
    { key: "M22x1.5",   label: "M22 \u00d7 1.5",   d: 22.0, p: 1.5  },
    { key: "M24x2",     label: "M24 \u00d7 2",     d: 24.0, p: 2.0  },
    { key: "M24x1.5",   label: "M24 \u00d7 1.5",   d: 24.0, p: 1.5  },
    { key: "M27x2",     label: "M27 \u00d7 2",     d: 27.0, p: 2.0  },
    { key: "M30x3",     label: "M30 \u00d7 3",     d: 30.0, p: 3.0  },
    { key: "M30x2",     label: "M30 \u00d7 2",     d: 30.0, p: 2.0  },
    { key: "M33x3",     label: "M33 \u00d7 3",     d: 33.0, p: 3.0  },
    { key: "M33x2",     label: "M33 \u00d7 2",     d: 33.0, p: 2.0  },
    { key: "M36x3",     label: "M36 \u00d7 3",     d: 36.0, p: 3.0  },
    { key: "M36x2",     label: "M36 \u00d7 2",     d: 36.0, p: 2.0  },
    { key: "M39x3",     label: "M39 \u00d7 3",     d: 39.0, p: 3.0  },
    { key: "M39x2",     label: "M39 \u00d7 2",     d: 39.0, p: 2.0  },
    { key: "M42x3",     label: "M42 \u00d7 3",     d: 42.0, p: 3.0  },
    { key: "M42x2",     label: "M42 \u00d7 2",     d: 42.0, p: 2.0  },
    { key: "M45x3",     label: "M45 \u00d7 3",     d: 45.0, p: 3.0  },
    { key: "M48x3",     label: "M48 \u00d7 3",     d: 48.0, p: 3.0  },
    { key: "M48x2",     label: "M48 \u00d7 2",     d: 48.0, p: 2.0  },
    { key: "M52x4",     label: "M52 \u00d7 4",     d: 52.0, p: 4.0  },
    { key: "M52x3",     label: "M52 \u00d7 3",     d: 52.0, p: 3.0  },
    { key: "M52x2",     label: "M52 \u00d7 2",     d: 52.0, p: 2.0  },
    { key: "M56x4",     label: "M56 \u00d7 4",     d: 56.0, p: 4.0  },
    { key: "M56x2",     label: "M56 \u00d7 2",     d: 56.0, p: 2.0  },
    { key: "M64x4",     label: "M64 \u00d7 4",     d: 64.0, p: 4.0  },
    { key: "M64x3",     label: "M64 \u00d7 3",     d: 64.0, p: 3.0  },
    { key: "M64x2",     label: "M64 \u00d7 2",     d: 64.0, p: 2.0  },
    { key: "M72x4",     label: "M72 \u00d7 4",     d: 72.0, p: 4.0  },
    { key: "M72x3",     label: "M72 \u00d7 3",     d: 72.0, p: 3.0  },
    { key: "M72x2",     label: "M72 \u00d7 2",     d: 72.0, p: 2.0  },
    { key: "M80x4",     label: "M80 \u00d7 4",     d: 80.0, p: 4.0  },
    { key: "M80x3",     label: "M80 \u00d7 3",     d: 80.0, p: 3.0  },
    { key: "M80x2",     label: "M80 \u00d7 2",     d: 80.0, p: 2.0  },
    { key: "M90x4",     label: "M90 \u00d7 4",     d: 90.0, p: 4.0  },
    { key: "M90x3",     label: "M90 \u00d7 3",     d: 90.0, p: 3.0  },
    { key: "M90x2",     label: "M90 \u00d7 2",     d: 90.0, p: 2.0  },
    { key: "M100x4",    label: "M100 \u00d7 4",    d:100.0, p: 4.0  },
    { key: "M100x3",    label: "M100 \u00d7 3",    d:100.0, p: 3.0  },
    { key: "M100x2",    label: "M100 \u00d7 2",    d:100.0, p: 2.0  },
  ];

  // Build lookup maps for fast access
  var _coarseMap = {};
  COARSE.forEach(function (e) { _coarseMap[e.key] = e; });

  var _fineMap = {};
  FINE.forEach(function (e) { _fineMap[e.key] = e; });

  TC.families["iso-metric-60"].data = {
    coarse:    COARSE,
    fine:      FINE,
    coarseMap: _coarseMap,
    fineMap:   _fineMap,

    /** Lookup a size entry by key from either series. Returns null if not found. */
    lookup: function (key, isFine) {
      return isFine ? (_fineMap[key] || null) : (_coarseMap[key] || null);
    },
  };

})();
