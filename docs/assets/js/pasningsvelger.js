/* ============================================================
   Pasningsvelger — pasningsvelger.js

   Finds the ISO 286 fits (hole class / shaft class) that best
   match a wanted clearance or interference window.

   Method:
     1. List candidate hole and shaft tolerance classes for the
        nominal size (limit deviations from iso286.js).
     2. For every hole/shaft pair, compute the tightest and the
        loosest case (ISO 286-1 annex B.2).
     3. Score each pair on how well it fills the wanted window
        and how the tolerance is split between hole and shaft.
     4. Show the three best.

   Sign convention: clearance is positive, interference is
   negative. Everything inside the solver is in µm.
   Requires iso286.js to be loaded first.
   ============================================================ */

(function () {
  "use strict";

  var iso = window.iso286;

  /* ----------------------------------------------------------
     Search settings. These are judgement calls, not from the standard.
  ---------------------------------------------------------- */
  var GRADE_MIN = 5, GRADE_MAX = 11;   // tolerance grades searched when "all classes" is chosen
  // Intermediate letters (fine mechanics, tabulated in ISO 286-2 only for small sizes) are left out.
  var SKIP_LETTERS = { CD: 1, EF: 1, FG: 1, cd: 1, ef: 1, fg: 1 };
  var W_OUTSIDE = 6;      // a µm outside the wanted window costs 6 times a µm of unused window
  var W_SPLIT = 2;        // weight of the hole/shaft tolerance split
  var PEN_NOT_LISTED = 0.05;   // fit is not among the preferable fits in Figures 12 and 13
  var PEN_NO_BASIS = 0.10;     // neither H hole nor h shaft
  var PEN_CLASS = 0.03;        // per tolerance class outside Figures 10 and 11
  // Each tolerance grade is about 1.6 times the previous one (IT6 and coarser)
  var GRADE_STEP = 1.6;

  /* ----------------------------------------------------------
     Candidate tolerance classes for one part
  ---------------------------------------------------------- */
  function candidates(d, isHole, basisOnly, preferredOnly) {
    var letters = isHole ? iso.HOLE_LETTERS : iso.SHAFT_LETTERS;
    var pref = isHole ? iso.PREF_HOLES : iso.PREF_SHAFTS;
    var basis = isHole ? "H" : "h";
    var out = [];
    letters.forEach(function (L) {
      if (SKIP_LETTERS[L] || (basisOnly && L !== basis)) return;
      for (var g = GRADE_MIN; g <= GRADE_MAX; g++) {
        var cls = L + g, isPref = pref.indexOf(cls) >= 0;
        if (preferredOnly && !isPref) continue;
        var lim = iso.limits(d, cls);
        if (lim) out.push({ cls: cls, lim: lim, pref: isPref });
      }
    });
    return out;
  }

  /* ----------------------------------------------------------
     Search
       d          nominal size [mm]
       tight      wanted tightest case [µm]  (min clearance / max interference)
       loose      wanted loosest case [µm]   (max clearance / min interference)
       holeShare  wanted share of the total tolerance on the hole, 0..1
       system     "hole" (H holes), "shaft" (h shafts) or "free"
       preferredOnly  only classes from Figures 10 and 11
     Returns the candidates sorted best first.
  ---------------------------------------------------------- */
  function search(d, tight, loose, holeShare, system, preferredOnly) {
    var holes = candidates(d, true, system === "hole", preferredOnly);
    var shafts = candidates(d, false, system === "shaft", preferredOnly);
    // Normalise by the window width, but never by less than the finest tolerance sum on offer
    var ref = Math.max(loose - tight, 2 * iso.itValue(d, GRADE_MIN));
    var out = [];
    holes.forEach(function (h) {
      shafts.forEach(function (s) {
        var cTight = h.lim.lower - s.lim.upper;     // tightest case
        var cLoose = h.lim.upper - s.lim.lower;     // loosest case
        var outside = Math.max(0, tight - cTight) + Math.max(0, cLoose - loose);
        var unused = Math.max(0, cTight - tight) + Math.max(0, loose - cLoose);
        var share = h.lim.it / (h.lim.it + s.lim.it);
        var name = h.cls + "/" + s.cls;
        var listed = iso.FITS_HOLE_BASIS.indexOf(name) >= 0 || iso.FITS_SHAFT_BASIS.indexOf(name) >= 0;
        var score = (W_OUTSIDE * outside + unused) / ref + W_SPLIT * Math.abs(share - holeShare);
        if (!listed) score += PEN_NOT_LISTED;
        if (h.lim.letter !== "H" && s.lim.letter !== "h") score += PEN_NO_BASIS;
        if (!h.pref) score += PEN_CLASS;
        if (!s.pref) score += PEN_CLASS;
        out.push({
          name: name, hole: h, shaft: s, tight: cTight, loose: cLoose,
          outside: outside, share: share, listed: listed, score: score,
          type: cTight >= 0 ? "clearance" : (cLoose <= 0 ? "interference" : "transition")
        });
      });
    });
    out.sort(function (a, b) { return a.score - b.score; });
    return out;
  }

  /* ----------------------------------------------------------
     Formatting (Norwegian: decimal comma)
  ---------------------------------------------------------- */
  function $(id) { return document.getElementById("pv-" + id); }

  function num(v, decimals) { return v.toFixed(decimals).replace(".", ",").replace("-", "−"); }

  // µm as a signed deviation: +25, 0, −9, ±12,5
  function dev(v) {
    var s = num(Math.abs(v), v % 1 ? 1 : 0);
    return v > 0 ? "+" + s : (v < 0 ? "−" + s : "0");
  }

  // Decimals needed to show a µm value exactly in mm (js classes give half micrometres)
  function mmDecimals(v) { return v % 1 ? 4 : 3; }

  function mm(v) { return num(v / 1000, mmDecimals(v)) + " mm"; }

  // A signed clearance in words: "0,009 mm klaring" / "0,018 mm pressmonn"
  function clearanceText(v) {
    if (v > 0) return mm(v) + " klaring";
    if (v < 0) return mm(-v) + " pressmonn";
    return "0 — verken klaring eller pressmonn";
  }

  var TYPE_LABEL = { clearance: "Klaringspasning", transition: "Overgangspasning", interference: "Presspasning" };

  function splitText(share) {
    var k = Math.round(Math.log(share / (1 - share)) / Math.log(GRADE_STEP));
    if (k === 0) return "omtrent lik toleransegrad på hull og aksel (f.eks. H7 mot h7)";
    if (k === 1) return "hullet omtrent én grad grovere enn akselen (f.eks. H7 mot g6)";
    if (k === 2) return "hullet omtrent to grader grovere enn akselen (f.eks. H8 mot g6)";
    if (k >= 3) return "hullet omtrent tre grader grovere enn akselen (f.eks. H9 mot g6)";
    return "akselen grovere enn hullet (f.eks. H6 mot h7)";
  }

  /* ----------------------------------------------------------
     Tolerance interval sketch: hole and shaft relative to the zero line
  ---------------------------------------------------------- */
  function sketch(r, lo, hi) {
    var W = 170, H = 150, top = 12, bottom = 126;
    function y(v) { return bottom - (v - lo) / (hi - lo) * (bottom - top); }
    function bar(x, lim, cls, label) {
      var y1 = y(lim.upper), h = Math.max(y(lim.lower) - y1, 1.5);
      return '<rect class="' + cls + '" x="' + x + '" y="' + y1.toFixed(1) + '" width="42" height="' + h.toFixed(1) + '"/>' +
             '<text class="pv-sk-label" x="' + (x + 21) + '" y="143" text-anchor="middle">' + label + "</text>";
    }
    var y0 = y(0).toFixed(1);
    return '<svg class="pv-sketch" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Toleransefelt for ' + r.name + '">' +
      '<line class="pv-sk-zero" x1="26" x2="' + (W - 4) + '" y1="' + y0 + '" y2="' + y0 + '"/>' +
      '<text class="pv-sk-label" x="22" y="' + (y(0) + 4).toFixed(1) + '" text-anchor="end">0</text>' +
      bar(40, r.hole.lim, "pv-sk-hole", r.hole.cls) + bar(104, r.shaft.lim, "pv-sk-shaft", r.shaft.cls) +
      "</svg>";
  }

  /* ----------------------------------------------------------
     Result cards
  ---------------------------------------------------------- */
  function partRow(label, d, p) {
    var dec = Math.max(mmDecimals(p.lim.upper), mmDecimals(p.lim.lower));
    return "<tr><th>" + label + "</th><td><strong>" + p.cls + "</strong></td>" +
      "<td>" + dev(p.lim.upper) + " / " + dev(p.lim.lower) + "</td>" +
      "<td>" + num(d + p.lim.lower / 1000, dec) + " – " + num(d + p.lim.upper / 1000, dec) + "</td>" +
      "<td>IT" + p.lim.grade + " = " + num(p.lim.it, p.lim.it % 1 ? 1 : 0) + "</td></tr>";
  }

  function kv(label, value, sub, cls) {
    return '<div class="pv-kv ' + (cls || "") + '"><div class="pv-kv-label">' + label + '</div><div class="pv-kv-value">' + value +
      "</div>" + (sub ? '<div class="pv-kv-sub">' + sub + "</div>" : "") + "</div>";
  }

  function card(r, rank, d, tight, loose, lo, hi) {
    var dTight = r.tight - tight, dLoose = r.loose - loose;
    function offset(v, tighterWord, looserWord) {
      if (v === 0) return "som ønsket";
      return mm(Math.abs(v)) + " " + (v < 0 ? tighterWord : looserWord) + " enn ønsket";
    }
    var inside = r.outside === 0;
    return '<div class="pv-card">' +
      '<div class="pv-card-head"><span class="pv-rank">' + rank + '</span><span class="pv-name">Ø' + String(d).replace(".", ",") +
      " " + r.name + '</span><span class="pv-tag">' + TYPE_LABEL[r.type] + "</span>" +
      (r.listed ? '<span class="pv-tag pv-tag-std">Anbefalt i ISO 286-1</span>' : "") +
      '<span class="pv-tag ' + (inside ? "pv-tag-ok" : "pv-tag-warn") + '">' + (inside ? "Innenfor ønsket område" : "Delvis utenfor ønsket område") + "</span></div>" +
      '<div class="pv-card-body">' +
      kv("Strammeste tilfelle", clearanceText(r.tight), offset(dTight, "strammere", "løsere"), dTight < 0 ? "pv-kv-warn" : "") +
      kv("Løseste tilfelle", clearanceText(r.loose), offset(dLoose, "strammere", "løsere"), dLoose > 0 ? "pv-kv-warn" : "") +
      kv("Fordeling hull / aksel", Math.round(r.share * 100) + " % / " + Math.round((1 - r.share) * 100) + " %",
         "spredning " + mm(r.hole.lim.it + r.shaft.lim.it)) +
      sketch(r, lo, hi) + "</div>" +
      '<table class="pv-table"><thead><tr><th></th><th>Klasse</th><th>Grenseavvik [µm]</th><th>Grensemål [mm]</th><th>Toleranse [µm]</th></tr></thead><tbody>' +
      partRow("Hull", d, r.hole) + partRow("Aksel", d, r.shaft) + "</tbody></table></div>";
  }

  /* ----------------------------------------------------------
     UI
  ---------------------------------------------------------- */
  // Slider range follows the size: three times IT9, rounded up to a whole 10 µm
  function sliderRange(d) {
    var it9 = iso.itValue(d, 9);
    return it9 == null ? 200 : Math.ceil(3 * it9 / 10) * 10;
  }

  function readNumber(id) {
    var v = parseFloat(String($(id).value).replace(",", "."));
    return isFinite(v) ? v : NaN;
  }

  // Keep slider and number box in step. The number box may go beyond the slider range.
  function syncPair(name, fromSlider) {
    if (fromSlider) $(name).value = $(name + "-range").value;
    else $(name + "-range").value = readNumber(name);
  }

  function update(changed) {
    var err = $("error"), res = $("results");
    var d = readNumber("d");
    if (!(d > 0) || d > iso.MAX_SIZE) {
      err.textContent = "Nominelt mål må være større enn 0 og høyst " + iso.MAX_SIZE + " mm.";
      err.style.display = ""; res.style.display = "none";
      return;
    }
    var R = sliderRange(d);
    ["tight-range", "loose-range"].forEach(function (id) { $(id).min = -R; $(id).max = R; });
    syncPair("tight", false); syncPair("loose", false);

    var tight = readNumber("tight"), loose = readNumber("loose");
    if (isNaN(tight) || isNaN(loose)) {
      err.textContent = "Fyll inn ønsket strammeste og løseste tilfelle i µm.";
      err.style.display = ""; res.style.display = "none";
      return;
    }
    // The tightest case can never be looser than the loosest: push the other value along
    if (tight > loose) {
      if (changed === "loose") { tight = loose; $("tight").value = tight; syncPair("tight", false); }
      else { loose = tight; $("loose").value = loose; syncPair("loose", false); }
    }
    err.style.display = "none";

    var share = parseFloat($("share").value) / 100;
    $("tight-text").textContent = clearanceText(tight);
    $("loose-text").textContent = clearanceText(loose);
    $("share-text").textContent = "hull " + Math.round(share * 100) + " % · aksel " + Math.round((1 - share) * 100) + " % — " + splitText(share);
    $("window-text").textContent = "Ønsket spredning: " + mm(loose - tight) + ". Den skal deles mellom hullets og akselens toleranse.";

    var all = search(d, tight, loose, share, $("system").value, $("preferred").checked);
    var best = all.slice(0, 3);
    if (!best.length) {
      res.innerHTML = '<div class="pv-notice">Ingen toleranseklasser er definert for dette målet med valgt utvalg.</div>';
      res.style.display = "";
      return;
    }
    // Common scale for the three sketches
    var lo = 0, hi = 0;
    best.forEach(function (r) {
      lo = Math.min(lo, r.hole.lim.lower, r.shaft.lim.lower);
      hi = Math.max(hi, r.hole.lim.upper, r.shaft.lim.upper);
    });
    var html = '<div class="pv-result-heading">De tre beste pasningene</div>';
    if (best[0].outside > 0) {
      html += '<div class="pv-notice">Ingen pasning i utvalget ligger helt innenfor ønsket område. De nærmeste er vist. ' +
        "Utvid området, eller velg et større utvalg under «Utvalg».</div>";
    }
    html += best.map(function (r, i) { return card(r, i + 1, d, tight, loose, lo, hi); }).join("");
    res.innerHTML = html;
    res.style.display = "";
  }

  function init() {
    if (!$("calc") || !iso) return;
    $("tight-range").addEventListener("input", function () { syncPair("tight", true); update("tight"); });
    $("loose-range").addEventListener("input", function () { syncPair("loose", true); update("loose"); });
    $("tight").addEventListener("input", function () { update("tight"); });
    $("loose").addEventListener("input", function () { update("loose"); });
    ["d", "share", "system", "preferred"].forEach(function (id) {
      $(id).addEventListener("input", function () { update(); });
      $(id).addEventListener("change", function () { update(); });
    });
    update();
  }

  // Exposed for tests and for use from the browser console
  window.pasningCalc = { search: search, candidates: candidates };

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})();
