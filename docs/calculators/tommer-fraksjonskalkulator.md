---
title: Tommebrøk fra mm
summary: Finn nærmaste tommebrøk for eit mål i millimeter eller desimaltommer. Nyttig ved reverse engineering av gammelt utstyr laga i tommer.
tags:
  - Konvertering
  - Tommer
  - Imperial
  - Brøk
type: kalkulator
search_words: inch fraction imperial brøk tommer mål desimaltommer omrekne
updated: 2026-04-10
---

# Fraksjonskalkulator – Mål til tommebrøk

Når ein arbeider med gammalt utstyr laga med imperiske tomma-mål er det ofte nyttig å finne tilbake til den opprinnelige nominelle brøkdimensjonen frå eit millimetermål.
Eit slitt eller skada emne vil sjeldan målast til nøyaktig 57,15 mm sjølv om da opprinnelig var ein **2¼″** aksling. Å gå frå tomma-brøk til mm er enkelt, å gå andre veien er litt vrient. Detta løyser denne kalkulatoren.

---

## Kalkulator

<link rel="stylesheet" href="../../assets/css/tommer-fraksjonskalkulator.css">

<div class="calc-card" id="fi-calc">

<div class="fi-section">Inndata</div>

<div class="fi-input-grid">
  <div class="fi-group">
    <label for="fi-mm">Mål i millimeter</label>
    <div class="fi-input-row">
      <input type="number" id="fi-mm" min="0.001" step="0.01" placeholder="t.d. 57.1">
      <span class="fi-unit">mm</span>
    </div>
  </div>
  <div class="fi-group">
    <label for="fi-in">— eller mål i desimaltommer</label>
    <div class="fi-input-row">
      <input type="number" id="fi-in" min="0.00001" step="0.001" placeholder="t.d. 2.248">
      <span class="fi-unit">″</span>
    </div>
  </div>
</div>


<button class="fi-btn" id="fi-btn">Finn nærmaste brøkar</button>

<div id="fi-error" class="fi-error" style="display:none"></div>

<div id="fi-results" class="fi-results" style="display:none">
  <hr class="fi-divider">

  <div class="fi-result-heading">Beste treff</div>
  <div class="fi-kv-grid">
    <div class="fi-kv fi-kv-accent">
      <div class="fi-kv-label">Brøk</div>
      <div class="fi-kv-value" id="fi-r-frac">—</div>
    </div>
    <div class="fi-kv fi-kv-accent">
      <div class="fi-kv-label">Nominell verdi</div>
      <div class="fi-kv-value" id="fi-r-mm">—</div>
    </div>
    <div class="fi-kv fi-kv-accent">
      <div class="fi-kv-label">Avvik</div>
      <div class="fi-kv-value" id="fi-r-dev">—</div>
    </div>
  </div>

  <div class="fi-result-heading">Alle nærmaste brøkar</div>
  <div class="fi-legend">
    <span class="fi-leg fi-leg-green"></span>Svært nær (≤ 0,5&nbsp;%)&nbsp;&nbsp;
    <span class="fi-leg fi-leg-yellow"></span>Akseptabelt (≤ 1,5&nbsp;%)&nbsp;&nbsp;
    <span class="fi-leg fi-leg-red"></span>Langt unna (&gt; 1,5&nbsp;%)
  </div>
  <div class="fi-table-wrapper">
    <table class="fi-table" id="fi-table">
      <thead>
        <tr>
          <th class="fi-th-frac">Brøk</th>
          <th>Desimal&nbsp;(″)</th>
          <th>Millimeter</th>
          <th>Avvik&nbsp;(mm)</th>
          <th>Avvik&nbsp;(%)</th>
        </tr>
      </thead>
      <tbody id="fi-tbody"></tbody>
    </table>
  </div>
</div>


</div>

<script src="../../assets/js/tommer-fraksjonskalkulator.js"></script>
