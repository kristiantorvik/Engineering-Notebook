---
title: Strømningshastighet i rør
summary: Berekner strømningshastighet for vatn i rør basert på volumstraum og rørdimensjon.
tags:
  - Hydraulikk
  - Strømning
  - Veske
  - Tommelfinger-regel
type: kalkulator
updated: 2026-03-24
---

# Strømningshastighet i rør

Berekner gjennomsnittleg strømningshastighet for vatn i rør.

Formelen som vert nytta:

$$v = \frac{Q}{A} = \frac{Q/60\,000}{\pi \cdot (d/2)^2 / 10^6}$$

der Q er volumstraum i L/min, d er indre diameter i mm og v er hastighet i m/s.

---

## Kalkulator

<style>
.fs-section { margin: 1.25rem 0 0.4rem; font-size: 0.82rem; font-weight: 600; color: var(--md-default-fg-color--light); text-transform: uppercase; letter-spacing: 0.06em; }
.fs-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.fs-group { display: flex; flex-direction: column; margin-bottom: 0.6rem; }
.fs-group label { font-size: 0.8rem; margin-bottom: 0.2rem; color: var(--md-default-fg-color--light); }
.fs-group input[type="number"] {
  padding: 0.4rem 0.6rem;
  font-size: 0.95rem;
  font-family: var(--md-code-font-family);
  background: var(--md-code-bg-color);
  color: var(--md-default-fg-color);
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
}
.fs-group input[type="number"]:focus { border-color: var(--md-primary-fg-color); outline: none; }
.fs-divider { border: none; border-top: 1px solid var(--md-default-fg-color--lightest); margin: 1.25rem 0 0.5rem; }
.fs-error { color: #e53935; font-size: 0.88rem; padding: 0.5rem 0; }
.fs-results { margin-top: 1.5rem; }
.fs-kv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.5rem; margin-bottom: 1rem; }
.fs-kv { background: var(--md-code-bg-color); border: 1px solid var(--md-default-fg-color--lightest); border-radius: 3px; padding: 0.5rem 0.75rem; }
.fs-kv-label { font-size: 0.72rem; color: var(--md-default-fg-color--light); margin-bottom: 0.15rem; }
.fs-kv-value { font-size: 1.05rem; font-family: var(--md-code-font-family); color: var(--md-accent-fg-color); }
.fs-result-heading { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--md-default-fg-color--light); margin: 1.25rem 0 0.5rem; }
.fs-note { font-size: 0.78rem; color: var(--md-default-fg-color--light); margin-top: 0.5rem; }
@media (max-width: 640px) {
  .fs-grid-2 { grid-template-columns: 1fr; }
}
</style>

<div class="calc-card" id="flow-speed-calc">

<div class="fs-section">Inndata</div>

<div class="fs-grid-2">
  <div class="fs-group">
    <label>Q — Volumstraum (L/min)</label>
    <input type="number" id="fs-Q" min="0.001" value="20" step="0.1">
  </div>
  <div class="fs-group">
    <label>d — Indre røydiameter (mm)</label>
    <input type="number" id="fs-d" min="0.1" value="22" step="0.1">
  </div>
</div>

<br>
<button onclick="fsCalc()">Rekn ut!</button>

<div id="fs-error" class="fs-error" style="display:none"></div>

<div id="fs-results" class="fs-results" style="display:none">
  <hr class="fs-divider">

  <div class="fs-result-heading">Resultat</div>
  <div class="fs-kv-grid">
    <div class="fs-kv">
      <div class="fs-kv-label">Strømningshastighet v</div>
      <div class="fs-kv-value" id="fs-r-v">—</div>
    </div>
    <div class="fs-kv">
      <div class="fs-kv-label">Tverrsnittsareal A</div>
      <div class="fs-kv-value" id="fs-r-A">—</div>
    </div>
    <div class="fs-kv">
      <div class="fs-kv-label">Reynolds-tal Re</div>
      <div class="fs-kv-value" id="fs-r-Re">—</div>
    </div>
  </div>

  <p class="fs-note">Tommelfingerregel: <br> v &lt; 1 m/s for sugeleidningar, v = 1–3 m/s for trykkleidningar.<br><br> Reynolds-tal er rekna for vatn ved 20 °C (ρ = 1000 kg/m³, μ = 0,001 Pa·s).
  </p>
</div>

</div>

<script>
(function () {

  function fmt(v, dec) {
    return isFinite(v) ? v.toFixed(dec) : "—";
  }

  function showError(msg) {
    document.getElementById("fs-error").textContent = msg;
    document.getElementById("fs-error").style.display = "block";
    document.getElementById("fs-results").style.display = "none";
  }

  window.fsCalc = function () {
    document.getElementById("fs-error").style.display = "none";

    var Q = parseFloat(document.getElementById("fs-Q").value);
    var d = parseFloat(document.getElementById("fs-d").value);

    if (!Q || !d || Q <= 0 || d <= 0) {
      showError("Fyll inn gyldige verdiar for Q og d.");
      return;
    }

    // Q [L/min] → [m³/s]
    var Q_m3s = Q / 60000;

    // d [mm] → radius [m]
    var r_m = (d / 2) / 1000;

    // Tverrsnittsareal [m²]
    var A_m2 = Math.PI * r_m * r_m;

    // Strømningshastighet [m/s]
    var v = Q_m3s / A_m2;

    // Reynolds-tal (vatn 20°C: ρ=1000 kg/m³, μ=0.001 Pa·s)
    var Re = v * (d / 1000) * 1000 / 0.001;

    // Vis resultat
    document.getElementById("fs-r-v").textContent  = fmt(v, 3) + " m/s";
    document.getElementById("fs-r-A").textContent  = fmt(A_m2 * 1e6, 2) + " mm²";
    document.getElementById("fs-r-Re").textContent = fmt(Re, 0);

    document.getElementById("fs-results").style.display = "block";
  };

})();
</script>

---

## Bakgrunn

Kontinuitetslikninga for inkompressibel straum:

$$Q = v \cdot A \implies v = \frac{Q}{A}$$

Reynolds-tal seier noko om strømningsregimet:

$$Re = \frac{v \cdot d}{\nu}$$

| Re | Regime |
|----|--------|
| < 2 300 | Laminar |
| 2 300 – 4 000 | Overgang |
| > 4 000 | Turbulent |
