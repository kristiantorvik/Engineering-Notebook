(function () {
  "use strict";

  var MM_PER_INCH = 25.4;
  var DENOMINATORS = [1, 2, 4, 8, 16, 32, 64, 128];

  // ── Math helpers ──────────────────────────────────────────────

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      var t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  function reduceFraction(n, d) {
    if (n === 0) return { n: 0, d: 1 };
    var g = gcd(n, d);
    return { n: n / g, d: d / g };
  }

  function formatMixedNumber(whole, n, d) {
    var mark = "\u2033"; // ″
    if (n === 0) {
      return whole + mark;
    }
    if (whole === 0) {
      return n + "/" + d + mark;
    }
    return whole + " " + n + "/" + d + mark;
  }

  // ── Core algorithm ────────────────────────────────────────────

  function findFractions(inputMm, maxDenom, maxRows) {
    var inches = inputMm / MM_PER_INCH;
    var whole = Math.floor(inches);
    var fracPart = inches - whole;

    var seen = {};
    var results = [];

    for (var i = 0; i < DENOMINATORS.length; i++) {
      var d = DENOMINATORS[i];
      if (d > maxDenom) break;

      var n_raw = Math.round(fracPart * d);

      var whole_adj, n_adj;
      if (n_raw === d) {
        whole_adj = whole + 1;
        n_adj = 0;
      } else if (n_raw === 0) {
        whole_adj = whole;
        n_adj = 0;
      } else {
        whole_adj = whole;
        n_adj = n_raw;
      }

      var reduced = reduceFraction(n_adj, d);
      var key = whole_adj + "+" + reduced.n + "/" + reduced.d;
      if (seen[key]) continue;
      seen[key] = true;

      var nominal_in = whole_adj + (reduced.d > 0 ? reduced.n / reduced.d : 0);
      var nominal_mm = nominal_in * MM_PER_INCH;
      var dev_mm = inputMm - nominal_mm;
      var dev_pct = Math.abs(dev_mm) / inputMm * 100;

      results.push({
        whole: whole_adj,
        n: reduced.n,
        d: reduced.d,
        nominal_in: nominal_in,
        nominal_mm: nominal_mm,
        dev_mm: dev_mm,
        dev_pct: dev_pct
      });
    }

    results.sort(function (a, b) {
      return Math.abs(a.dev_mm) - Math.abs(b.dev_mm);
    });

    if (maxRows > 0) {
      results = results.slice(0, maxRows);
    }

    return results;
  }

  // ── Formatting helpers ────────────────────────────────────────

  function fmt(v, dec) {
    if (!isFinite(v)) return "—";
    return v.toFixed(dec);
  }

  function fmtDev(v) {
    if (!isFinite(v)) return "—";
    var sign = v >= 0 ? "+" : "";
    return sign + v.toFixed(3);
  }

  function rowClass(pct) {
    if (pct <= 0.5) return "fi-row-green";
    if (pct <= 1.5) return "fi-row-yellow";
    return "fi-row-red";
  }

  // ── DOM helpers ───────────────────────────────────────────────

  function val(id) {
    var el = document.getElementById(id);
    return el ? parseFloat(el.value) : NaN;
  }

  function show(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = "";
  }

  function hide(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = "none";
  }

  function set(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function showError(msg) {
    var el = document.getElementById("fi-error");
    if (el) {
      el.textContent = msg;
      el.style.display = "";
    }
    hide("fi-results");
  }

  function hideError() {
    hide("fi-error");
  }

  // ── Input tracking ────────────────────────────────────────────

  var lastEdited = "mm";

  // ── Table rendering ───────────────────────────────────────────

  function renderTable(results) {
    var tbody = document.getElementById("fi-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      var tr = document.createElement("tr");
      tr.className = rowClass(r.dev_pct);

      var fracStr = formatMixedNumber(r.whole, r.n, r.d);
      tr.innerHTML =
        '<td class="fi-cell-frac">' + fracStr + "</td>" +
        "<td>" + fmt(r.nominal_in, 5) + "</td>" +
        "<td>" + fmt(r.nominal_mm, 3) + "</td>" +
        "<td>" + fmtDev(r.dev_mm) + "</td>" +
        "<td>" + fmt(r.dev_pct, 2) + "\u00a0%</td>";

      tbody.appendChild(tr);
    }
  }

  // ── Main calculate function ───────────────────────────────────

  function fiCalc() {
    hideError();

    var inputMm;
    if (lastEdited === "in") {
      var inVal = val("fi-in");
      if (isNaN(inVal) || inVal <= 0) {
        showError("Fyll inn eit gyldig tal i desimaltommer (t.d. 2.25).");
        return;
      }
      inputMm = inVal * MM_PER_INCH;
    } else {
      inputMm = val("fi-mm");
      if (isNaN(inputMm) || inputMm <= 0) {
        showError("Fyll inn eit gyldig tal i millimeter (t.d. 57.1).");
        return;
      }
    }

    var maxDenom = 128;
    var maxRows = 10;

    var results = findFractions(inputMm, maxDenom, maxRows);

    if (results.length === 0) {
      showError("Ingen brøkar funne.");
      return;
    }

    var best = results[0];
    set("fi-r-frac", formatMixedNumber(best.whole, best.n, best.d));
    set("fi-r-mm", fmt(best.nominal_mm, 3) + "\u00a0mm");
    set("fi-r-dev", fmtDev(best.dev_mm) + "\u00a0mm  (" + fmt(best.dev_pct, 2) + "\u00a0%)");

    renderTable(results);
    show("fi-results");
  }

  // ── Init ─────────────────────────────────────────────────────

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("fi-btn");
    if (btn) btn.addEventListener("click", fiCalc);

    var mmInput = document.getElementById("fi-mm");
    if (mmInput) {
      mmInput.addEventListener("input", function () { lastEdited = "mm"; });
      mmInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") fiCalc();
      });
    }

    var inInput = document.getElementById("fi-in");
    if (inInput) {
      inInput.addEventListener("input", function () { lastEdited = "in"; });
      inInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") fiCalc();
      });
    }
  });

  window.fiCalc = fiCalc;

})();
