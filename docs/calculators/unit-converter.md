---
title: Enhetsomformer
summary: Konverter mellom enheter i nærmest alle kategorier som Temperatur, Lengde, Masse, Energi, Effekt, Fart, Volum, Areal, Gjennomstrømnin, Vinkel, Drivstofforbruk, Tid, Trykk, Digital lagring.
tags:
  - Konvertering
  - Enheter
  - Lengde
  - Masse
  - Temperatur
type: kalkulator
search_words: Enhet, unit,
updated: 2026-03-26
---

# Enhetsomformer

Velg kategori, skriv inn en verdi og velg enheter for å konvertere.

<style>
.uc-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.uc-field-label {
  display: block;
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .03em;
  text-transform: uppercase;
  color: var(--md-default-fg-color--light);
  margin-bottom: .35rem;
}
.uc-type-select {
  width: 100%;
  padding: .6rem .75rem;
  background: var(--md-code-bg-color);
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: .3rem;
  color: var(--md-default-fg-color);
  font-size: .95rem;
  cursor: pointer;
}
.uc-type-select:focus {
  outline: 2px solid var(--md-primary-fg-color);
  outline-offset: 1px;
}
.uc-converter {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
.uc-io-row {
  display: flex;
  align-items: stretch;
  gap: .6rem;
}
.uc-val-input,
.uc-result-val {
  flex: 1;
  min-width: 0;
  padding: .6rem .75rem;
  background: var(--md-code-bg-color);
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: .3rem;
  color: var(--md-default-fg-color);
  font-family: var(--md-code-font-family);
  font-size: 1rem;
  box-sizing: border-box;
}
.uc-val-input:focus {
  outline: 2px solid var(--md-primary-fg-color);
  outline-offset: 1px;
}
.uc-val-input:disabled {
  opacity: .45;
  cursor: not-allowed;
}
.uc-result-val {
  background: color-mix(in srgb, var(--md-code-bg-color) 60%, var(--md-primary-fg-color) 8%);
  cursor: default;
  color: var(--md-primary-fg-color);
  font-weight: 600;
}
.uc-unit-sel {
  flex-shrink: 0;
  width: clamp(9rem, 35%, 14rem);
  padding: .6rem .5rem;
  background: var(--md-code-bg-color);
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: .3rem;
  color: var(--md-default-fg-color);
  font-size: .88rem;
  cursor: pointer;
  box-sizing: border-box;
}
.uc-unit-sel:focus {
  outline: 2px solid var(--md-primary-fg-color);
  outline-offset: 1px;
}
.uc-unit-sel:disabled {
  opacity: .45;
  cursor: not-allowed;
}
.uc-swap-row {
  display: flex;
  justify-content: center;
  padding: .1rem 0;
}
.uc-swap-btn {
  padding: .35rem 1.1rem;
  background: transparent;
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 2rem;
  color: var(--md-default-fg-color--light);
  font-size: .85rem;
  cursor: pointer;
  transition: background .15s, color .15s, border-color .15s;
}
.uc-swap-btn:hover:not(:disabled) {
  background: var(--md-primary-fg-color);
  border-color: var(--md-primary-fg-color);
  color: var(--md-primary-bg-color);
}
.uc-swap-btn:disabled {
  opacity: .35;
  cursor: not-allowed;
}
.uc-error {
  padding: .55rem .8rem;
  background: color-mix(in srgb, var(--md-code-bg-color) 70%, red 20%);
  border-left: 3px solid #e53935;
  border-radius: .25rem;
  font-size: .88rem;
  color: var(--md-default-fg-color);
}
@media (max-width: 540px) {
  .uc-io-row {
    flex-wrap: wrap;
  }
  .uc-val-input,
  .uc-result-val {
    flex-basis: 100%;
  }
  .uc-unit-sel {
    width: 100%;
    flex-basis: 100%;
  }
}
</style>

<div class="calc-card">
  <div class="uc-wrap">

    <div>
      <label class="uc-field-label" for="uc-type">Kategori</label>
      <select id="uc-type" class="uc-type-select" onchange="ucTypeChanged()">
        <option value="">— Velg kategori —</option>
      </select>
    </div>

    <div class="uc-converter">
      <div>
        <span class="uc-field-label">Fra</span>
        <div class="uc-io-row">
          <input id="uc-from-val" type="number" class="uc-val-input"
                 placeholder="Verdi" oninput="ucConvert()" disabled>
          <select id="uc-from-unit" class="uc-unit-sel" onchange="ucConvert()" disabled>
            <option value="">—</option>
          </select>
        </div>
      </div>

      <div class="uc-swap-row">
        <button id="uc-swap-btn" class="uc-swap-btn" onclick="ucSwap()" disabled>⇅ Bytt</button>
      </div>

      <div>
        <span class="uc-field-label">Til</span>
        <div class="uc-io-row">
          <input id="uc-to-val" type="text" class="uc-result-val"
                 readonly placeholder="—">
          <select id="uc-to-unit" class="uc-unit-sel" onchange="ucConvert()" disabled>
            <option value="">—</option>
          </select>
        </div>
      </div>
    </div>

    <div id="uc-error" class="uc-error" style="display:none"></div>

  </div>
</div>

<script>
(function () {
  "use strict";

  /* ─── Category list ──────────────────────────────────────────── */
  var TYPES = [
    { id: "temperature", name: "Temperatur" },
    { id: "length",      name: "Lengde" },
    { id: "mass",        name: "Masse" },
    { id: "energy",      name: "Energi" },
    { id: "power",       name: "Effekt" },
    { id: "speed",       name: "Fart" },
    { id: "volume",      name: "Volum" },
    { id: "area",        name: "Areal" },
    { id: "flowrate",    name: "Gjennomstrømning" },
    { id: "angle",       name: "Vinkel" },
    { id: "fuel",        name: "Drivstofforbruk" },
    { id: "time",        name: "Tid" },
    { id: "pressure",    name: "Trykk" },
    { id: "digital",     name: "Digital lagring" },
  ];

  /* ─── Unit definitions ───────────────────────────────────────────
     Linear units: use `factor` (value × factor = base SI unit).
     Non-linear:   use explicit toBase / fromBase functions.
  ─────────────────────────────────────────────────────────────── */
  var UNITS = {

    temperature: [
      { id: "C", name: "Celsius (°C)",
        toBase: function(v) { return v + 273.15; },
        fromBase: function(v) { return v - 273.15; } },
      { id: "F", name: "Fahrenheit (°F)",
        toBase: function(v) { return (v - 32) * 5 / 9 + 273.15; },
        fromBase: function(v) { return (v - 273.15) * 9 / 5 + 32; } },
      { id: "K", name: "Kelvin (K)",         factor: 1 },
      { id: "R", name: "Rankine (°R)",
        toBase: function(v) { return v * 5 / 9; },
        fromBase: function(v) { return v * 9 / 5; } },
    ],

    length: [
      { id: "nm",  name: "Nanometer (nm)",    factor: 1e-9 },
      { id: "um",  name: "Mikrometer (µm)",   factor: 1e-6 },
      { id: "mm",  name: "Millimeter (mm)",   factor: 1e-3 },
      { id: "cm",  name: "Centimeter (cm)",   factor: 1e-2 },
      { id: "m",   name: "Meter (m)",         factor: 1 },
      { id: "km",  name: "Kilometer (km)",    factor: 1e3 },
      { id: "in",  name: "Tomme (in)",        factor: 0.0254 },
      { id: "ft",  name: "Fot (ft)",          factor: 0.3048 },
      { id: "yd",  name: "Yard (yd)",         factor: 0.9144 },
      { id: "mi",  name: "Mile (mi)",         factor: 1609.344 },
      { id: "nmi", name: "Nautisk mil (nmi)", factor: 1852 },
    ],

    mass: [
      { id: "ug",   name: "Mikrogram (µg)",   factor: 1e-9 },
      { id: "mg",   name: "Milligram (mg)",   factor: 1e-6 },
      { id: "g",    name: "Gram (g)",         factor: 1e-3 },
      { id: "kg",   name: "Kilogram (kg)",    factor: 1 },
      { id: "tonn", name: "Tonn (t)",         factor: 1e3 },
      { id: "oz",   name: "Unse (oz)",        factor: 0.028349523125 },
      { id: "lb",   name: "Pund (lb)",        factor: 0.45359237 },
      { id: "st",   name: "Stone (st)",               factor: 6.35029318 },
      { id: "ston", name: "Short ton / US ton (tn)",  factor: 907.18474 },
      { id: "lton", name: "Long ton / imp. ton (LT)", factor: 1016.0469088 },
    ],

    energy: [
      { id: "J",    name: "Joule (J)",             factor: 1 },
      { id: "kJ",   name: "Kilojoule (kJ)",        factor: 1e3 },
      { id: "MJ",   name: "Megajoule (MJ)",        factor: 1e6 },
      { id: "Wh",   name: "Watttime (Wh)",         factor: 3600 },
      { id: "kWh",  name: "Kilowatttime (kWh)",    factor: 3.6e6 },
      { id: "MWh",  name: "Megawatttime (MWh)",    factor: 3.6e9 },
      { id: "cal",  name: "Kalorie (cal)",         factor: 4.184 },
      { id: "kcal", name: "Kilokalorie (kcal)",    factor: 4184 },
      { id: "BTU",  name: "BTU",                   factor: 1055.05585 },
      { id: "eV",   name: "Elektronvolt (eV)",     factor: 1.602176634e-19 },
    ],

    power: [
      { id: "W",    name: "Watt (W)",              factor: 1 },
      { id: "kW",   name: "Kilowatt (kW)",         factor: 1e3 },
      { id: "MW",   name: "Megawatt (MW)",         factor: 1e6 },
      { id: "GW",   name: "Gigawatt (GW)",         factor: 1e9 },
      { id: "hk",   name: "Hestekraft, metrisk (hk)",         factor: 735.49875 },
      { id: "bhp",  name: "Hestekraft, britisk/US (bhp/hp)", factor: 745.69987 },
      { id: "BTUh", name: "BTU/time (BTU/h)",      factor: 0.29307107 },
    ],

    speed: [
      { id: "ms",   name: "Meter per sekund (m/s)",     factor: 1 },
      { id: "kmh",  name: "Kilometer per time (km/t)",  factor: 1 / 3.6 },
      { id: "mph",  name: "Miles per hour (mph)",       factor: 0.44704 },
      { id: "kn",   name: "Knop (kn)",                  factor: 0.51444444 },
      { id: "fts",  name: "Fot per sekund (ft/s)",      factor: 0.3048 },
      { id: "mmin", name: "Meter per minutt (m/min)",   factor: 1 / 60 },
    ],

    volume: [
      { id: "mm3",   name: "Kubikkmillimeter (mm³)",  factor: 1e-9 },
      { id: "cm3",   name: "Kubikkcentimeter (cm³)",  factor: 1e-6 },
      { id: "mL",    name: "Milliliter (mL)",         factor: 1e-6 },
      { id: "cL",    name: "Centiliter (cL)",         factor: 1e-5 },
      { id: "dL",    name: "Desiliter (dL)",          factor: 1e-4 },
      { id: "L",     name: "Liter (L)",               factor: 1e-3 },
      { id: "m3",    name: "Kubikkmeter (m³)",        factor: 1 },
      { id: "in3",   name: "Kubikktomme (in³)",       factor: 1.6387e-5},
      { id: "floz",  name: "Fluid ounce US (fl oz)",  factor: 29.5735296e-6 },
      { id: "ptUS",  name: "Pint US (pt)",            factor: 473.176473e-6 },
      { id: "qtUS",  name: "Quart US (qt)",           factor: 946.352946e-6 },
      { id: "galUS", name: "Gallon US (gal)",         factor: 3.785411784e-3 },
      { id: "galUK", name: "Gallon UK (gal)",         factor: 4.54609e-3 },
      { id: "bbl",   name: "Oljefat (bbl)",           factor: 0.158987295 },
    ],

    area: [
      { id: "mm2",  name: "Kvadratmillimeter (mm²)",  factor: 1e-6 },
      { id: "cm2",  name: "Kvadratcentimeter (cm²)",  factor: 1e-4 },
      { id: "m2",   name: "Kvadratmeter (m²)",        factor: 1 },
      { id: "km2",  name: "Kvadratkilometer (km²)",   factor: 1e6 },
      { id: "in2",  name: "Kvadrattomme (in²)",       factor: 6.4516e-4 },
      { id: "ft2",  name: "Kvadratfot (ft²)",         factor: 0.09290304 },
      { id: "yd2",  name: "Kvadratyard (yd²)",        factor: 0.83612736 },
      { id: "acre", name: "Acre",                     factor: 4046.8564224 },
      { id: "ha",   name: "Hektar (ha)",              factor: 10000 },
      { id: "daa",  name: "Dekar / mål (daa)",        factor: 1000 },
    ],

    flowrate: [
      { id: "Ls",    name: "Liter per sekund (L/s)",          factor: 1e-3 },
      { id: "Lmin",  name: "Liter per minutt (L/min)",        factor: 1e-3 / 60 },
      { id: "Lh",    name: "Liter per time (L/t)",            factor: 1e-3 / 3600 },
      { id: "m3s",   name: "Kubikkmeter per sekund (m³/s)",   factor: 1 },
      { id: "m3min", name: "Kubikkmeter per minutt (m³/min)", factor: 1 / 60 },
      { id: "m3h",   name: "Kubikkmeter per time (m³/t)",     factor: 1 / 3600 },
      { id: "GPM",   name: "Gallon per minutt US (GPM)",      factor: 6.30901964e-5 },
      { id: "CFM",   name: "Kubikkfot per minutt (CFM)",      factor: 4.71947443e-4 },
      { id: "CFS",   name: "Kubikkfot per sekund (CFS)",      factor: 0.028316847 },
    ],

    angle: [
      { id: "deg",    name: "Grader (°)",        factor: Math.PI / 180 },
      { id: "rad",    name: "Radian (rad)",       factor: 1 },
      { id: "gon",    name: "Gon (gon)",          factor: Math.PI / 200 },
      { id: "arcmin", name: "Bueminutt (′)",      factor: Math.PI / 10800 },
      { id: "arcsec", name: "Buesekund (″)",      factor: Math.PI / 648000 },
      { id: "rev",    name: "Omdreininger (rev)", factor: 2 * Math.PI },
    ],

    /* Base unit: L/100km. Reciprocal units use 100/v both ways. */
    fuel: [
      { id: "L100km", name: "Liter per 100 km (L/100km)", factor: 1 },
      { id: "kmL",    name: "Kilometer per liter (km/L)",
        toBase: function(v) { return 100 / v; },
        fromBase: function(v) { return 100 / v; } },
      { id: "mpgUS",  name: "Miles per gallon US (mpg)",
        toBase: function(v) { return 235.214583 / v; },
        fromBase: function(v) { return 235.214583 / v; } },
      { id: "mpgUK",  name: "Miles per gallon UK (mpg)",
        toBase: function(v) { return 282.480936 / v; },
        fromBase: function(v) { return 282.480936 / v; } },
    ],

    time: [
      { id: "ns",   name: "Nanosekund (ns)",    factor: 1e-9 },
      { id: "us",   name: "Mikrosekund (µs)",   factor: 1e-6 },
      { id: "ms",   name: "Millisekund (ms)",   factor: 1e-3 },
      { id: "s",    name: "Sekund (s)",         factor: 1 },
      { id: "min",  name: "Minutt (min)",       factor: 60 },
      { id: "h",    name: "Time (t)",           factor: 3600 },
      { id: "dag",  name: "Dag",               factor: 86400 },
      { id: "uke",  name: "Uke",               factor: 604800 },
      { id: "mnd",  name: "Måned (30 dager)",  factor: 2592000 },
      { id: "year", name: "År (365 dager)",     factor: 31536000 },
    ],

    digital: [
      { id: "bit", name: "Bit (bit)",       factor: 0.125 },
      { id: "B",   name: "Byte (B)",        factor: 1 },
      { id: "KB",  name: "Kilobyte (KB)",   factor: 1e3 },
      { id: "MB",  name: "Megabyte (MB)",   factor: 1e6 },
      { id: "GB",  name: "Gigabyte (GB)",   factor: 1e9 },
      { id: "TB",  name: "Terabyte (TB)",   factor: 1e12 },
      { id: "PB",  name: "Petabyte (PB)",   factor: 1e15 },
      { id: "KiB", name: "Kibibyte (KiB)",  factor: 1024 },
      { id: "MiB", name: "Mebibyte (MiB)",  factor: 1048576 },
      { id: "GiB", name: "Gibibyte (GiB)",  factor: 1073741824 },
      { id: "TiB", name: "Tebibyte (TiB)",  factor: 1099511627776 },
    ],

    /* Base unit: Pascal */
    pressure: [
      { id: "Pa",    name: "Pascal (Pa)",                  factor: 1 },
      { id: "hPa",   name: "Hektopascal (hPa)",            factor: 100 },
      { id: "kPa",   name: "Kilopascal (kPa)",             factor: 1e3 },
      { id: "MPa",   name: "Megapascal (MPa)",             factor: 1e6 },
      { id: "bar",   name: "Bar (bar)",                    factor: 1e5 },
      { id: "mbar",  name: "Millibar (mbar)",              factor: 100 },
      { id: "atm",   name: "Atmosfære (atm)",              factor: 101325 },
      { id: "at",    name: "Teknisk atm (at)",             factor: 98066.5 },
      { id: "psi",   name: "Pund per tomme² (psi)",        factor: 6894.757 },
      { id: "ksi",   name: "Kilo-psi (ksi)",               factor: 6894757 },
      { id: "mmHg",  name: "Millimeter kvikksølv (mmHg)",  factor: 133.3224 },
      { id: "inHg",  name: "Tommer kvikksølv (inHg)",      factor: 3386.389 },
      { id: "mH2O",  name: "Meter vannsøyle (mH₂O)",       factor: 9806.65 },
    ],
  };

  /* ─── Normalize linear units ─────────────────────────────────── */
  Object.keys(UNITS).forEach(function(typeId) {
    UNITS[typeId].forEach(function(u) {
      if (!u.toBase) {
        var f = u.factor;
        u.toBase   = function(v) { return v * f; };
        u.fromBase = function(v) { return v / f; };
      }
    });
  });

  /* ─── Core conversion ────────────────────────────────────────── */
  function convert(value, fromId, toId, typeId) {
    var list = UNITS[typeId];
    if (!list) return null;
    var from = null, to = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === fromId) from = list[i];
      if (list[i].id === toId)   to   = list[i];
    }
    if (!from || !to) return null;
    return to.fromBase(from.toBase(value));
  }

  /* ─── Number formatting ──────────────────────────────────────── */
  function fmt(v) {
    if (!isFinite(v)) return "—";
    if (v === 0) return "0";
    var abs = Math.abs(v);
    if (abs >= 1e12 || (abs > 0 && abs < 1e-6)) {
      return v.toExponential(5);
    }
    /* toPrecision(8) gives 8 significant figures; parseFloat strips trailing zeros */
    return parseFloat(v.toPrecision(8)).toString();
  }

  /* ─── DOM helpers ────────────────────────────────────────────── */
  function el(id) { return document.getElementById(id); }

  function setInputsDisabled(disabled) {
    ["uc-from-val", "uc-from-unit", "uc-to-unit", "uc-swap-btn"].forEach(function(id) {
      var e = el(id);
      if (e) e.disabled = disabled;
    });
  }

  function populateSelect(selectId, list, selectedId) {
    var sel = el(selectId);
    sel.innerHTML = "";
    list.forEach(function(u) {
      var opt = document.createElement("option");
      opt.value = u.id;
      opt.textContent = u.name;
      if (u.id === selectedId) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function showError(msg) {
    var e = el("uc-error");
    if (msg) {
      e.textContent = msg;
      e.style.display = "block";
    } else {
      e.style.display = "none";
    }
  }

  /* ─── Public handlers (called from HTML) ─────────────────────── */
  window.ucTypeChanged = function() {
    var typeId = el("uc-type").value;
    el("uc-to-val").value = "";
    el("uc-from-val").value = "";
    showError(null);

    if (!typeId) {
      setInputsDisabled(true);
      el("uc-from-unit").innerHTML = "<option value=''>—</option>";
      el("uc-to-unit").innerHTML   = "<option value=''>—</option>";
      return;
    }

    var list = UNITS[typeId];
    var defaultFrom = list[0].id;
    var defaultTo   = list.length > 1 ? list[1].id : list[0].id;
    populateSelect("uc-from-unit", list, defaultFrom);
    populateSelect("uc-to-unit",   list, defaultTo);
    setInputsDisabled(false);
  };

  window.ucConvert = function() {
    var typeId = el("uc-type").value;
    if (!typeId) return;

    var rawVal = el("uc-from-val").value;
    if (rawVal === "") {
      el("uc-to-val").value = "";
      showError(null);
      return;
    }

    var value = parseFloat(rawVal);
    if (isNaN(value)) {
      el("uc-to-val").value = "";
      showError("Ugyldig verdi.");
      return;
    }

    var fromId = el("uc-from-unit").value;
    var toId   = el("uc-to-unit").value;
    if (!fromId || !toId) return;

    var result = convert(value, fromId, toId, typeId);

    if (result === null || !isFinite(result)) {
      el("uc-to-val").value = "—";
      showError("Kan ikke konvertere (ugyldig inngangsverdi for valgt enhet).");
      return;
    }

    showError(null);
    el("uc-to-val").value = fmt(result);
  };

  window.ucSwap = function() {
    var fromSel = el("uc-from-unit");
    var toSel   = el("uc-to-unit");
    var fromVal = el("uc-from-val");
    var toVal   = el("uc-to-val");

    var tmpUnit = fromSel.value;
    fromSel.value = toSel.value;
    toSel.value   = tmpUnit;

    var currentResult = toVal.value;
    if (currentResult && currentResult !== "—") {
      fromVal.value = currentResult;
    }

    window.ucConvert();
  };

  /* ─── Initialise category dropdown ───────────────────────────── */
  (function init() {
    var typeSelect = el("uc-type");
    TYPES.forEach(function(t) {
      var opt = document.createElement("option");
      opt.value = t.id;
      opt.textContent = t.name;
      typeSelect.appendChild(opt);
    });
    setInputsDisabled(true);
  })();

})();
</script>
