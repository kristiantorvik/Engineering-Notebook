---
title: Rørstrøm og pumpekalkulator
summary: Beregner volumstrøm, pumpehøyde og trykk for strøm mellom to reservoarer med ei pumpe (Bernoulli + Darcy-Weisbach).
tags:
  - Hydraulikk
  - Pumpe
  - Strømning
  - Bernoulli
  - Trukk
  - Veske
  - Fluidynamikk
  - Fysikk
type: kalkulator
updated: 2026-03-28
---

# Rørstrøm- og pumpekalkulator

Beregner volumstrøm, pumpehøyde og trykk for et system med to reservoarer og én pumpe.

![Systemskisse: to reservoarer forbundet via pumpe med suge- og trykkside](../assets/images/pumpe-kalkulator-illustrasjon.png)


Kalkulatoren anntar at reservoarene er såpass store at de har ingen hastighet.
Om ett av reservoarene er en buffertank med stor flow blir ikkje dette heilt nøyaktig. Om flowen i begge reservarene er lik blir det korrekt.

Om du vil ha fri flyt uten pumpe skriver du pumpeeffekten til 0

Her ligg formlane og eksempel om du vil rekna sjølv:
[Bernouillis ligningar](../formulas/bernoullis.md)

---

## Kalkulator

Vann: $\rho = 1000$    $\nu = 0.000001$

<link rel="stylesheet" href="../../assets/css/pipe-flow-calculator.css">

<div class="calc-card" id="pf-calc">

<!-- ── 1. Væske ─────────────────────────────────────────── -->
<div class="pf-section">1 — Væske</div>
<div class="pf-grid-2">
  <div class="pf-group">
    <label>Tetthet, ρ <span class="pf-unit">[kg/m³]</span></label>
    <input type="number" id="pf-rho" value="1000" min="0.001" step="1">
  </div>
  <div class="pf-group">
    <label>Kinematisk viskositet, ν <span class="pf-unit">[m²/s]</span></label>
    <input type="number" id="pf-nu" value="0.000001" min="1e-9" step="0.0000001">
  </div>
</div>

<!-- ── 2. Pumpe ─────────────────────────────────────────── -->
<div class="pf-section">2 — Pumpe</div>
<div class="pf-grid-2">
  <div class="pf-group">
    <label>Pumpeeffekt inn, P<sub>inn</sub> <span class="pf-unit">[kW]</span></label>
    <input type="number" id="pf-P_in" value="3.0" min="0" step="0.1">
  </div>
  <div class="pf-group">
    <label>Virkningsgrad, η <span class="pf-unit">[0–1]</span></label>
    <input type="number" id="pf-eta" value="0.70" min="0" max="1" step="0.01">
  </div>
</div>
<p style="font-size:0.75rem;color:var(--md-default-fg-color--light);margin:0.3rem 0 0">
  Hydraulisk effekt: P<sub>hyd</sub> = η · P<sub>inn</sub>. Sett P<sub>inn</sub> = 0 for rent gravitasjons-/trykkdrevet strøm.
</p>

<!-- ── 3. Reservoar 1 ────────────────────────────────────── -->
<div class="pf-section">3 — Reservoar 1</div>
<div class="pf-grid-2">
  <div class="pf-group">
    <label>Trykk i reservoar 1, p₁ <span class="pf-unit">[Pa]</span></label>
    <input type="number" id="pf-p1" value="100000" step="1000">
  </div>
  <div class="pf-group">
    <label>Høyde reservoar 1 relativt til pumpe, y₁ <span class="pf-unit">[m]</span></label>
    <input type="number" id="pf-y1" value="-5" step="0.5">
  </div>
</div>
<p style="font-size:0.75rem;color:var(--md-default-fg-color--light);margin:0.3rem 0 0">
  Positiv høyde = reservoaret er over pumpesentrum. Negativ = under.
</p>

<!-- ── 4. Sugeside ──────────────────────────────────────── -->
<div class="pf-section">4 — Sugeside</div>
<div class="pf-grid-4">
  <div class="pf-group">
    <label>Rørlengde <span class="pf-unit">[m]</span></label>
    <input type="number" id="pf-L_s" value="10" min="0" step="0.5">
  </div>
  <div class="pf-group">
    <label>Innv. diameter <span class="pf-unit">[mm]</span></label>
    <input type="number" id="pf-d_s" value="50" min="0.1" step="1">
  </div>
  <div class="pf-group">
    <label>Ruhet ε <span class="pf-unit">[mm]</span></label>
    <input type="number" id="pf-eps_s" value="0.046" min="0" step="0.001">
  </div>
  <div class="pf-group">
    <label>Tapskoeff. ζ<sub>s</sub> <span class="pf-unit">[–]</span></label>
    <input type="number" id="pf-zeta_s" value="6" min="0" step="0.5">
  </div>
</div>

<!-- ── 5. Trykkside ─────────────────────────────────────── -->
<div class="pf-section">5 — Trykkside</div>
<div class="pf-grid-4">
  <div class="pf-group">
    <label>Rørlengde <span class="pf-unit">[m]</span></label>
    <input type="number" id="pf-L_t" value="25" min="0" step="0.5">
  </div>
  <div class="pf-group">
    <label>Innv. diameter <span class="pf-unit">[mm]</span></label>
    <input type="number" id="pf-d_t" value="50" min="0.1" step="1">
  </div>
  <div class="pf-group">
    <label>Ruhet ε <span class="pf-unit">[mm]</span></label>
    <input type="number" id="pf-eps_t" value="0.046" min="0" step="0.001">
  </div>
  <div class="pf-group">
    <label>Tapskoeff. ζ<sub>t</sub> <span class="pf-unit">[–]</span></label>
    <input type="number" id="pf-zeta_t" value="4" min="0" step="0.5">
  </div>
</div>

<!-- ── 6. Reservoar 2 ────────────────────────────────────── -->
<div class="pf-section">6 — Reservoar 2</div>
<div class="pf-grid-2">
  <div class="pf-group">
    <label>Trykk i reservoar 2, p₂ <span class="pf-unit">[Pa]</span></label>
    <input type="number" id="pf-p2" value="100000" step="1000">
  </div>
  <div class="pf-group">
    <label>Høyde reservoar 2 relativt til pumpe, y₂ <span class="pf-unit">[m]</span></label>
    <input type="number" id="pf-y2" value="15" step="0.5">
  </div>
</div>

<!-- ── Beregn-knapp ─────────────────────────────────────── -->
<button class="pf-btn" id="pf-btn">Beregn</button>

<div id="pf-error" class="pf-error" style="display:none"></div>

<!-- ── Resultater ────────────────────────────────────────── -->
<div id="pf-results" class="pf-results" style="display:none">
  <hr class="pf-divider">

  <div class="pf-result-heading">Primærresultater</div>
  <div class="pf-kv-primary">
    <div class="pf-kv pf-kv-accent">
      <div class="pf-kv-label">Volumstrøm</div>
      <div class="pf-kv-value" id="pf-r-Q_Ls">—</div>
    </div>
    <div class="pf-kv pf-kv-accent">
      <div class="pf-kv-label">Volumstrøm</div>
      <div class="pf-kv-value" id="pf-r-Q_Lmin">—</div>
    </div>
    <div class="pf-kv pf-kv-accent">
      <div class="pf-kv-label">Pumpehøyde H<sub>p</sub></div>
      <div class="pf-kv-value" id="pf-r-Hp">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Trykk før pumpe</div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-p_suc_Pa">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Trykk før pumpe</div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-p_suc_bar">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Trykk etter pumpe</div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-p_dis_Pa">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Trykk etter pumpe</div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-p_dis_bar">—</div>
    </div>
  </div>

  <div class="pf-result-heading">Detaljer — sugeside</div>
  <div class="pf-kv-secondary">
    <div class="pf-kv">
      <div class="pf-kv-label">Hastighet v<sub>s</sub></div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-v_s">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Reynolds-tall Re<sub>s</sub></div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-Re_s">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Friksjonsfaktor f<sub>s</sub></div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-f_s">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Tapshøyde sugeside</div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-hl_s">—</div>
    </div>
  </div>

  <div class="pf-result-heading">Detaljer — trykkside</div>
  <div class="pf-kv-secondary">
    <div class="pf-kv">
      <div class="pf-kv-label">Hastighet v<sub>t</sub></div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-v_t">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Reynolds-tall Re<sub>t</sub></div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-Re_t">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Friksjonsfaktor f<sub>t</sub></div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-f_t">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Tapshøyde trykkside</div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-hl_t">—</div>
    </div>
  </div>

  <div class="pf-result-heading">Systemhøyder</div>
  <div class="pf-kv-secondary">
    <div class="pf-kv">
      <div class="pf-kv-label">Statisk høydeforskjell (y₂ − y₁)</div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-dy">—</div>
    </div>
    <div class="pf-kv">
      <div class="pf-kv-label">Trykkbidrag (p₂ − p₁)/(ρg)</div>
      <div class="pf-kv-value pf-kv-normal" id="pf-r-dp_head">—</div>
    </div>
  </div>
</div>

<!-- ── Forutsetninger ────────────────────────────────────── -->
<div class="pf-assumptions">
  <strong>Forutsetninger:</strong> Stasjonær strømning &nbsp;·&nbsp; Inkompressibel væske &nbsp;·&nbsp;
  Hastighet i reservoarene = 0 &nbsp;·&nbsp; Én konstant rørdimensjon og én samlet tapskoeffisient per side &nbsp;·&nbsp;
  Darcy-Weisbach for rørfriksjon (Swamee-Jain eksplisitt formel) &nbsp;·&nbsp; Ingen kavitasjonssjekk
</div>

</div>

<script src="../../assets/js/pipe-flow-calculator.js"></script>

---


## Referanseverdier

### Rørruhet

Typiske verdier for innvendig ruhet $\varepsilon$:

| Material | Ruhet $\varepsilon$ (mm) |
|----------|--------------------------|
| Betong, grov | 0.25 |
| Betong, glatt | 0.025 |
| Plastikk (PVC, PE) | 0.003 |
| Støpejern, ny | 0.25 |
| Støpejern, rusta | 1.0 |
| Stål, valsa | 0.05 |
| Stål, rusta | 0.3 |
| Aluminium | 0.03 |

### Lokaltapskoeffisienter

Den samlede tapskoeffisienten $\zeta$ for hver side er summen av alle komponenters $\zeta$-bidrag:

$$\zeta_{\text{total}} = \sum_i \zeta_i$$

Typiske verdier:

| Komponent | Utforming | $\zeta$ |
|-----------|-----------|---------|
| Utløp (rør → reservoar) | Skarpkantet | 1.0 |
| Utløp (rør → reservoar) | Avrundet | 1.0 |
| Innløp (reservoar → rør) | Skarpkantet | 0.5 |
| Innløp (reservoar → rør) | Avrundet | 0.04 |
| Bend 90° | Skarpkantet | 1.0 |
| Bend 90° | Liten krumning | 0.2 |
| Kuleventil | Åpen | 0.05 |
| Kuleventil | 1/3 lukket | 5.5 |
| Kuleventil | 2/3 lukket | 200 |

**Eksempel — sugeside** med skarpkantet innløp + ett 90°-bend (skarpkantet):

$$\zeta_s = 0{,}5 + 1{,}0 = 1{,}5$$

Legg til bidrag for alle komponenter i rørstrekket. Utløpstapet (1.0) regnes normalt på trykksiden.


---


## Fysisk modell

Systemet består av to reservoarer forbundet med en pumpe:

$$\text{Reservoar 1} \;\to\; \text{sugerør} \;\to\; \text{pumpe} \;\to\; \text{trykkreør} \;\to\; \text{Reservoar 2}$$

Energibalansen mellom de frie overflatene (Bernoulli med pumpe og tap):

$$\frac{p_1}{\rho g} + y_1 + H_p = \frac{p_2}{\rho g} + y_2 + h_{f,s} + h_{e,s} + h_{f,t} + h_{e,t}$$

| Symbol | Beskrivelse |
|--------|-------------|
| $p_1, p_2$ | Trykk i reservoar 1 og 2 |
| $y_1, y_2$ | Høyde reservoar 1 og 2 relativt til pumpesentrum |
| $H_p$ | Pumpehøyde |
| $h_{f,s},\ h_{f,t}$ | Darcy-Weisbach friksjonshøyde, suge- og trykkside |
| $h_{e,s},\ h_{e,t}$ | Samlet lokaltap, suge- og trykkside |

### Friksjonsfaktor

Laminar ($Re < 2300$):

$$f = \frac{64}{Re}$$

Turbulent — Swamee-Jain:

$$f = \frac{0{,}25}{\left[\log_{10}\!\left(\dfrac{\varepsilon}{3{,}7\,d} + \dfrac{5{,}74}{Re^{0{,}9}}\right)\right]^2}$$

### Tapshøyder

$$h_f = f \cdot \frac{L}{d} \cdot \frac{v^2}{2g} \qquad h_e = \zeta \cdot \frac{v^2}{2g}$$

### Pumpehøyde fra effekt og strøm

$$P_{\text{hyd}} = \eta \cdot P_{\text{inn}} \qquad H_p = \frac{P_{\text{hyd}}}{\rho g Q}$$

### Trykk ved pumpeinngangen

Bernoulli fra reservoar 1 til pumpeinngang:

$$p_{\text{sug}} = p_1 + \rho g y_1 - \tfrac{1}{2}\rho v_s^2 - \rho g (h_{f,s} + h_{e,s})$$

### Løsningsmetode

Definer residualet $F(Q) = H_p(Q) - H_{\text{req}}(Q)$. Finn $Q > 0$ slik at $F(Q) = 0$ ved hjelp av biseksjonsmetoden.

---

