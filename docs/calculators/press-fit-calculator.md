---
title: Press-passning kalkulator
summary: Beregner kontakttrykk, deformasjon, spenninger, monteringskraft og overførbart moment.
tags:
  - Styrkeberegning
  - Trykk
  - Engineering
  - presspassning
  - maskinering
type: kalkulator
updated: 2026-03-22
---

# Press-Fit kalkulator

Beregner kontakttrykk, deformasjon, spenninger, monteringskraft og overførbart moment.
Beregningerne benytter Lamé's ligninger.
Sjå notatet:  [Presspassninger og tykkvegga rør](../notes/presspassninger-og-tykkvegga-rør.md) for forklaring og komplette formler.

**Tegn-konvensjon:** negativt = kompressjon, positivt = strekk.

---

## Kalkulator

<style>
.pf-section { margin: 1.25rem 0 0.4rem; font-size: 0.82rem; font-weight: 600; color: var(--md-default-fg-color--light); text-transform: uppercase; letter-spacing: 0.06em; }
.pf-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.pf-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
.pf-group { display: flex; flex-direction: column; margin-bottom: 0.6rem; }
.pf-group label { font-size: 0.8rem; margin-bottom: 0.2rem; color: var(--md-default-fg-color--light); }
.pf-group input[type="number"],
.pf-group select {
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
.pf-group input[type="number"]:focus,
.pf-group select:focus { border-color: var(--md-primary-fg-color); outline: none; }
.pf-divider { border: none; border-top: 1px solid var(--md-default-fg-color--lightest); margin: 1.25rem 0 0.5rem; }
.pf-panel { border: 1px solid var(--md-default-fg-color--lightest); border-radius: 4px; padding: 0.75rem 1rem; }
.pf-panel-title { font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem; color: var(--md-default-fg-color--light); }
.pf-error { color: #e53935; font-size: 0.88rem; padding: 0.5rem 0; }
.pf-results { margin-top: 1.5rem; }
.pf-kv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 0.5rem; margin-bottom: 1rem; }
.pf-kv { background: var(--md-code-bg-color); border: 1px solid var(--md-default-fg-color--lightest); border-radius: 3px; padding: 0.5rem 0.75rem; }
.pf-kv-label { font-size: 0.72rem; color: var(--md-default-fg-color--light); margin-bottom: 0.15rem; }
.pf-kv-value { font-size: 1.05rem; font-family: var(--md-code-font-family); color: var(--md-accent-fg-color); }
.pf-result-heading { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--md-default-fg-color--light); margin: 1.25rem 0 0.5rem; }
.pf-stress-table { width: 100%; border-collapse: collapse; font-size: 0.86rem; margin-top: 0.25rem; }
.pf-stress-table th, .pf-stress-table td { border: 1px solid var(--md-default-fg-color--lightest); padding: 0.35rem 0.65rem; }
.pf-stress-table th { background: var(--md-code-bg-color); font-weight: 600; text-align: center; white-space: nowrap; }
.pf-stress-table td { font-family: var(--md-code-font-family); text-align: right; }
.pf-stress-table td:first-child, .pf-stress-table td:nth-child(2) { font-family: inherit; text-align: left; }
.pf-note { font-size: 0.78rem; color: var(--md-default-fg-color--light); margin-top: 0.4rem; }
.pf-diagram { float: right; margin: 0 0 0.5rem 1.25rem; max-width: 175px; }
.pf-diagram img { width: 100%; border-radius: 4px; display: block; }
@media (max-width: 640px) {
  .pf-grid-2, .pf-grid-3 { grid-template-columns: 1fr; }
  .pf-diagram { float: none; max-width: 140px; margin: 0 auto 1rem; }
}
</style>

<div class="calc-card" id="press-fit-calc">

<div class="pf-section">Geometri</div>

<div class="pf-diagram">
  <img src="../../assets/images/press-fit-radii.png" alt="Press-fit radii — r₁, r₂, r₃">
</div>

<div class="pf-grid-3">
  <div class="pf-group">
    <label>r₁ — Foring inner radius (mm), 0 for massiv aksel</label>
    <input type="number" id="pf-r1" min="0" value="0" step="0.1">
  </div>
  <div class="pf-group">
    <label>r₂ — Foring ytter radius / boss inner radius (mm)</label>
    <input type="number" id="pf-r2" min="0.01" value="6" step="0.1">
  </div>
  <div class="pf-group">
    <label>r₃ — boss ytter radius (mm)</label>
    <input type="number" id="pf-r3" min="0.01" value="20" step="0.1">
  </div>
</div>

<div style="clear:both"></div>

<hr class="pf-divider">

<div class="pf-grid-2">
  <div class="pf-panel">
    <div class="pf-panel-title">Material — A (Foring)</div>
    <div class="pf-group">
      <label>Preset</label>
      <select id="pf-mat-a" onchange="pfApplyPreset('a')">
        <option value="">Custom</option>
        <option value="210000,0.3" selected>Stål (210 GPa)</option>
        <option value="200000,0.28">Rustfritt stål (200 GPa)</option>
        <option value="100000,0.26">Støypejern (100 GPa)</option>
        <option value="70000,0.33">Aluminium (70 GPa)</option>
        <option value="105000,0.34">Bronze (105 GPa)</option>
        <option value="100000,0.37">Messing (100 GPa)</option>
      </select>
    </div>
    <div class="pf-grid-2">
      <div class="pf-group">
        <label>E_A — Young's modulus (MPa)</label>
        <input type="number" id="pf-Ea" min="1" value="210000" step="1000">
      </div>
      <div class="pf-group">
        <label>ν_A — Poisson's ratio</label>
        <input type="number" id="pf-Va" min="0.01" max="0.49" value="0.3" step="0.01">
      </div>
    </div>
  </div>
  <div class="pf-panel">
    <div class="pf-panel-title">Material — B (Nav)</div>
    <div class="pf-group">
      <label>Preset</label>
      <select id="pf-mat-b" onchange="pfApplyPreset('b')">
        <option value="">Custom</option>
        <option value="210000,0.3" selected>Stål (210 GPa)</option>
        <option value="200000,0.28">Rustfritt stål (200 GPa)</option>
        <option value="100000,0.26">Støypejern (100 GPa)</option>
        <option value="70000,0.33">Aluminium (70 GPa)</option>
        <option value="105000,0.34">Bronze (105 GPa)</option>
        <option value="100000,0.37">Messing (100 GPa)</option>
      </select>
    </div>
    <div class="pf-grid-2">
      <div class="pf-group">
        <label>E_B — Young's modulus (MPa)</label>
        <input type="number" id="pf-Eb" min="1" value="210000" step="1000">
      </div>
      <div class="pf-group">
        <label>ν_B — Poisson's ratio</label>
        <input type="number" id="pf-Vb" min="0.01" max="0.49" value="0.3" step="0.01">
      </div>
    </div>
  </div>
</div>

<hr class="pf-divider">

<div class="pf-section">Passning Parameter</div>
<div class="pf-grid-3">
  <div class="pf-group">
    <label>Δ — diametralt pressmonn (mm)</label>
    <input type="number" id="pf-delta" min="0.0001" value="0.04" step="0.001">
  </div>
  <div class="pf-group">
    <label>L — lengde på passning (mm)</label>
    <input type="number" id="pf-length" min="0.1" value="25" step="1">
  </div>
  <div class="pf-group">
    <label>μ — Friksjonskoeffisient</label>
    <input type="number" id="pf-mu" min="0" max="1" value="0.1" step="0.01">
  </div>
</div>

<hr class="pf-divider">

<div class="pf-section">Inspeksjon</div>
<div style="max-width: 300px">
  <div class="pf-group">
    <label>R — inspeksjons radius (mm): r₁ ≤ R ≤ r₂ : Foring, r₂ ≤ R ≤ r₃ : boss</label>
    <input type="number" id="pf-R" min="0" value="6" step="0.1">
  </div>
</div>

<br>
<button onclick="pfCalc()">Kalkuler!</button>

<div id="pf-error" class="pf-error" style="display:none"></div>

<div id="pf-results" class="pf-results" style="display:none">
  <hr class="pf-divider">

  <div class="pf-result-heading">Kontakttrykk &amp; Deformasjon</div>
  <div class="pf-kv-grid">
    <div class="pf-kv">
      <div class="pf-kv-label">Kontakttrykk P</div>
      <div class="pf-kv-value" id="pf-r-P">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Foring radiell deformasjon u_A ved r₂</div>
      <div class="pf-kv-value" id="pf-r-uA">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Boss radiell deformasjon u_B ved r₂</div>
      <div class="pf-kv-value" id="pf-r-uB">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Check: 2u_B − 2u_A = Δ</div>
      <div class="pf-kv-value" id="pf-r-dcheck">—</div>
    </div>
  </div>

  <div class="pf-result-heading">Monterings kraft &amp; Dreiemoment</div>
  <div class="pf-kv-grid">
    <div class="pf-kv">
      <div class="pf-kv-label">Monterings kraft F</div>
      <div class="pf-kv-value" id="pf-r-F">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Overførbart dreiemoment M</div>
      <div class="pf-kv-value" id="pf-r-M">—</div>
    </div>
  </div>

  <div class="pf-result-heading">Spenninger</div>
  <table class="pf-stress-table">
    <thead>
      <tr>
        <th>Komponent</th>
        <th>Plassering</th>
        <th>σ_R (MPa)</th>
        <th>σ_T (MPa)</th>
        <th>σ_VM (MPa)</th>
      </tr>
    </thead>
    <tbody id="pf-stress-body"></tbody>
  </table>
  <p class="pf-note" id="pf-inspect-note"></p>
</div>

</div>

<script>
(function () {

  const PRESETS = {
    "210000,0.3":  { E: 210000, v: 0.3  },
    "200000,0.28": { E: 200000, v: 0.28 },
    "100000,0.26": { E: 100000, v: 0.26 },
    "70000,0.33":  { E: 70000,  v: 0.33 },
    "105000,0.34": { E: 105000, v: 0.34 },
    "100000,0.37": { E: 100000, v: 0.37 },
  };

  window.pfApplyPreset = function (which) {
    const key = document.getElementById("pf-mat-" + which).value;
    if (!key || !PRESETS[key]) return;
    document.getElementById("pf-E" + which).value = PRESETS[key].E;
    document.getElementById("pf-V" + which).value = PRESETS[key].v;
  };

  function fmt(v, dec) {
    return isFinite(v) ? v.toFixed(dec) : "—";
  }

  function showError(msg) {
    document.getElementById("pf-error").textContent = msg;
    document.getElementById("pf-error").style.display = "block";
    document.getElementById("pf-results").style.display = "none";
  }

  // ── Stress at radius R inside the BUSHING (external pressure P on outer surface) ──
  // From note — Utvendig trykk, r_i = r₁, r_y = r₂:
  //   σ_R = −P · r₂² / (r₂²−r₁²) · (1 − r₁²/R²)
  //   σ_T = −P · r₂² / (r₂²−r₁²) · (1 + r₁²/R²)
  function bushingStress(P, r1, r2, R) {
    if (r1 === 0) {
      // Limit as r₁→0: uniform biaxial compression σ_R = σ_T = −P
      return { sR: -P, sT: -P };
    }
    var denom = r2*r2 - r1*r1;
    var factor = P * r2*r2 / denom;
    return {
      sR: -factor * (1 - r1*r1 / (R*R)),
      sT: -factor * (1 + r1*r1 / (R*R)),
    };
  }

  // ── Stress at radius R inside the BOSS (internal pressure P on inner surface) ──
  // From note — Innvendig trykk, r_i = r₂, r_y = r₃:
  //   σ_R = +P · r₂² / (r₃²−r₂²) · (1 − r₃²/R²)
  //   σ_T = +P · r₂² / (r₃²−r₂²) · (1 + r₃²/R²)
  function bossStress(P, r2, r3, R) {
    var denom = r3*r3 - r2*r2;
    var factor = P * r2*r2 / denom;
    return {
      sR: factor * (1 - r3*r3 / (R*R)),
      sT: factor * (1 + r3*r3 / (R*R)),
    };
  }

  // Von Mises: σ_VM = √(σ_R² + σ_T² − σ_R·σ_T)
  function vonMises(sR, sT) {
    return Math.sqrt(sR*sR + sT*sT - sR*sT);
  }

  window.pfCalc = function () {
    document.getElementById("pf-error").style.display = "none";

    var r1    = parseFloat(document.getElementById("pf-r1").value) || 0;
    var r2    = parseFloat(document.getElementById("pf-r2").value);
    var r3    = parseFloat(document.getElementById("pf-r3").value);
    var Ea    = parseFloat(document.getElementById("pf-Ea").value);
    var Va    = parseFloat(document.getElementById("pf-Va").value);
    var Eb    = parseFloat(document.getElementById("pf-Eb").value);
    var Vb    = parseFloat(document.getElementById("pf-Vb").value);
    var delta = parseFloat(document.getElementById("pf-delta").value);
    var L     = parseFloat(document.getElementById("pf-length").value);
    var mu    = parseFloat(document.getElementById("pf-mu").value);
    var R_in  = parseFloat(document.getElementById("pf-R").value);

    if (!r2 || !r3 || !Ea || !Eb || !delta || !L) { showError("Please fill in all required fields."); return; }
    if (r1 < 0)    { showError("r₁ must be ≥ 0."); return; }
    if (r2 <= r1)  { showError("r₂ must be greater than r₁."); return; }
    if (r3 <= r2)  { showError("r₃ must be greater than r₂."); return; }
    if (delta <= 0){ showError("Interference Δ must be positive."); return; }

    // ════════════════════════════════════════════════════════════════
    // CONTACT PRESSURE  (note: Kontaktrykk ved kjent pressmonn)
    // Evaluated at R = r₂ (contact surface between bushing and boss)
    //
    //        Δ/2
    // P = ─────────────────────────────────────────────────────────
    //      r₂²·[(1−ν_B)·r₂ + (1+ν_B)·r₃²/r₂]     r₂²·[(1−ν_A)·r₂ + (1+ν_A)·r₁²/r₂]
    //     ──────────────────────────────────────── + ────────────────────────────────────
    //              E_B·(r₃²−r₂²)                           E_A·(r₂²−r₁²)
    // ════════════════════════════════════════════════════════════════

    // Boss term (B)
    var termB = (r2*r2 / (Eb * (r3*r3 - r2*r2)))
                * ((1 - Vb)*r2 + (1 + Vb)*r3*r3/r2);

    // Bushing term (A)
    var termA;
    if (r1 === 0) {
      // Limit as r₁→0: r₂²/(E_A·r₂²)·(1−ν_A)·r₂ = (1−ν_A)·r₂/E_A
      termA = (1 - Va) * r2 / Ea;
    } else {
      termA = (r2*r2 / (Ea * (r2*r2 - r1*r1)))
              * ((1 - Va)*r2 + (1 + Va)*r1*r1/r2);
    }

    var P = (delta / 2) / (termB + termA);

    // ════════════════════════════════════════════════════════════════
    // RADIAL DEFORMATIONS at R = r₂  (contact surface)
    //
    //  u_A = −P · r₂²/(E_A·(r₂²−r₁²)) · [(1−ν_A)·r₂ + (1+ν_A)·r₁²/r₂]
    //      = −P · termA
    //
    //  u_B = +P · r₂²/(E_B·(r₃²−r₂²)) · [(1−ν_B)·r₂ + (1+ν_B)·r₃²/r₂]
    //      = +P · termB
    //
    //  Δ = 2·u_B − 2·u_A  (diametral, should equal input Δ)
    // ════════════════════════════════════════════════════════════════

    var uA = -P * termA;
    var uB =  P * termB;
    var deltaCheck = 2*uB - 2*uA;

    // ════════════════════════════════════════════════════════════════
    // ASSEMBLY FORCE AND TORQUE
    //
    //  F [N]  = P · π · (2·r₂) · L · μ
    //  M [Nm] = F [N] · r₂ [mm] / 1000
    // ════════════════════════════════════════════════════════════════

    var F_N  = P * Math.PI * (2*r2) * L * mu;
    var F_kN = F_N / 1000;
    var M_Nm = F_N * r2 / 1000;

    // ════════════════════════════════════════════════════════════════
    // STRESS ROWS
    // Always show the critical (highest-stress) location for each part.
    // Then show the user-specified inspection radius.
    // ════════════════════════════════════════════════════════════════

    var rows = [];

    // Bushing — critical location: inner surface at R = r₁
    // (σ_R = 0 there by boundary condition; σ_T is maximum in magnitude)
    if (r1 === 0) {
      var s = bushingStress(P, 0, r2, r2);  // uniform regardless of R
      rows.push({ comp: "Bushing (A)", loc: "Uniform — solid (r₁ = 0)", sR: s.sR, sT: s.sT });
    } else {
      var s = bushingStress(P, r1, r2, r1);
      rows.push({ comp: "Bushing (A)", loc: "Inner surface  R = r₁ = " + fmt(r1, 3) + " mm", sR: s.sR, sT: s.sT });
    }

    // Boss — critical location: inner surface at R = r₂
    {
      var s = bossStress(P, r2, r3, r2);
      rows.push({ comp: "Boss (B)", loc: "Inner surface  R = r₂ = " + fmt(r2, 3) + " mm", sR: s.sR, sT: s.sT });
    }

    // Inspection radius (user-defined)
    var inspNote = "";
    if (isFinite(R_in) && R_in > 0) {
      if (R_in >= r1 && R_in < r2) {
        // Inside bushing wall
        var s = bushingStress(P, r1, r2, R_in);
        rows.push({ comp: "Bushing (A)", loc: "Inspection  R = " + fmt(R_in, 3) + " mm", sR: s.sR, sT: s.sT });
      } else if (R_in >= r2 && R_in <= r3) {
        // Inside boss wall (R = r₂ goes here — contact surface, boss side)
        var s = bossStress(P, r2, r3, R_in);
        rows.push({ comp: "Boss (B)", loc: "Inspection  R = " + fmt(R_in, 3) + " mm", sR: s.sR, sT: s.sT });
      } else {
        inspNote = "⚠ R = " + fmt(R_in, 3) + " mm is outside the valid range (r₁ = " + fmt(r1, 3) + " to r₃ = " + fmt(r3, 3) + " mm).";
      }
    }

    // ── Update DOM ───────────────────────────────────────────────────────────

    document.getElementById("pf-r-P").textContent      = fmt(P, 3)          + " MPa";
    document.getElementById("pf-r-uA").textContent     = fmt(uA, 5)         + " mm";
    document.getElementById("pf-r-uB").textContent     = fmt(uB, 5)         + " mm";
    document.getElementById("pf-r-dcheck").textContent = fmt(deltaCheck, 5) + " mm";
    document.getElementById("pf-r-F").textContent      = fmt(F_kN, 3)       + " kN";
    document.getElementById("pf-r-M").textContent      = fmt(M_Nm, 2)       + " Nm";

    document.getElementById("pf-stress-body").innerHTML = rows.map(function (r) {
      var vm = vonMises(r.sR, r.sT);
      return "<tr>"
        + "<td>" + r.comp + "</td>"
        + "<td>" + r.loc  + "</td>"
        + "<td>" + fmt(r.sR, 2) + "</td>"
        + "<td>" + fmt(r.sT, 2) + "</td>"
        + "<td>" + fmt(vm,  2)  + "</td>"
        + "</tr>";
    }).join("");

    document.getElementById("pf-inspect-note").textContent = inspNote;
    document.getElementById("pf-results").style.display = "block";
  };

})();
</script>

---

## Related

- [Presspassninger og tykkvegga rør](../notes/presspassninger-og-tykkvegga-rør.md) — formula derivations and variable definitions
