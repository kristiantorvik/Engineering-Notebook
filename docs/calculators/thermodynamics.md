---
title: Termodynamikk-tabeller
summary: Termodynamiske tabeller. Finn data for, Fasetilstand, Temperatur, Trykk, Entalpi, Indre energi, Entropi, Spesifikt volum, tetthet, varmekapasitet, Cp Cv for medier som Vann, Luft, Amoniakk R-717, co2 R-744, Propan R-290, R-32, R-134a, R-410A. Finn tabeller som følger prosser, Isobar, Isokor, Isoterm, Isentropisk, Isentalpisk.
tags:
  - Termodynamikk
  - Tilstandstabeller
  - Trykk
  - Temperatur
  - Volum
  - Gass
  - Veske
type: kalkulator
search_words: Varmepumpe
updated: 2026-03-27
---

# Termodynamikk-tabeller

Velg medium, prosessfamilie og tabell. Klikk en rad for å vise tilstandssammendraget.

Info om ulike prosesser og bruk av tabellverdiene her: [Termodynamiske Prosesser](../notes/termodynamiske-prosesser.md)
Info om de ulike termodynamiske egenskapene finner du her: [Termodynamiske egenskaper](../notes/termodynamiske-egenskaper.md)

Ref: 0°C = 273.15°K


<link rel="stylesheet" href="../../assets/css/thermo-calculator.css">

<div class="tc-bleed">
<div class="calc-card tc-wrap">

  <div id="tc-status" class="tc-status" style="display:none"></div>

  <div class="tc-selectors">
    <div>
      <label class="tc-field-label" for="tc-medium">Medium</label>
      <select id="tc-medium" class="tc-select" disabled>
        <option value="">— Laster… —</option>
      </select>
    </div>
    <div>
      <label class="tc-field-label" for="tc-family">Prosess</label>
      <select id="tc-family" class="tc-select" disabled>
        <option value="">— Velg medium først —</option>
      </select>
    </div>
  </div>

  <div>
    <label class="tc-field-label" for="tc-table">Tabell</label>
    <select id="tc-table" class="tc-select" disabled>
      <option value="">— Velg prosess først —</option>
    </select>
  </div>

  <div id="tc-meta-panel" class="tc-meta-panel" style="display:none"></div>

  <div id="tc-table-section" style="display:none">
    <div class="tc-table-wrap">
      <table class="tc-data-table">
        <thead id="tc-table-head"></thead>
        <tbody id="tc-table-body"></tbody>
      </table>
    </div>
    <div class="tc-nav-row">
      <button id="tc-prev" class="tc-nav-btn" onclick="tcNavPrev()" disabled>&#8249; Forrige</button>
      <span id="tc-row-counter" class="tc-nav-counter"></span>
      <button id="tc-next" class="tc-nav-btn" onclick="tcNavNext()" disabled>Neste &#8250;</button>
    </div>
  </div>

  <div id="tc-state-card" class="tc-state-card" style="display:none">
    <div class="tc-state-title">Valgt tilstand</div>
    <div id="tc-state-grid" class="tc-state-grid"></div>
  </div>

</div>
</div>

<script src="../../assets/js/thermo-calculator.js"></script>

---

Alle tabellverdier er beregnet med [CoolProp](https://github.com/CoolProp/CoolProp) — et åpen kildekode-bibliotek for termofysiske egenskaper.
