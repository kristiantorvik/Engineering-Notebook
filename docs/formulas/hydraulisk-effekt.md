---
title: Hydraulisk effekt — trykk og flow til kW
summary: Effekt i ein væskestraum frå trykk og volumstraum. Inkluderer tommelfingerregelen bar · l/min / 600 = kW.
tags:
  - Hydraulikk
  - Trykk
  - Energi
  - Pumpe
  - Tommelfinger-regel
  - Engineering
type: formel
search_words: hydraulisk effekt, hydraulic power, flow, strøm, volumstrøm, kW, kilowatt, hestekrefter, hp, bar, l/min, gpm, psi, 600, 1714, pumpe, sikkerhetsventil, overtrykksventil, varme
updated: 2026-11-12
---

# Hydraulisk effekt
Effekten som blir overført av ein veskestraum er trykk gange volumstraum. Gjeld hydraulikk, vannpumper og alt anna med inkompressibel veske.

---

## Formel

**SI-enheter:**

$$
\huge P = \Delta p \cdot Q
$$

**Praktisk form (bar og l/min → kW):**

$$
\huge P_{kW} = \dfrac{p_{bar} \cdot Q_{l/min}}{600}
$$

---

## Variabler
$P =$ Hydraulisk effekt ($W$ i SI, $kW$ i praktisk form)
$\Delta p =$ Trykkforskjell over pumpa / motoren / komponenten ($Pa$ i SI, $bar$ i praktisk form)
$Q =$ Volumstraum ($m^3/s$ i SI, $l/min$ i praktisk form)

---

## Andre enheter

| Enheter inn                | Formel                                           |
| -------------------------- | ------------------------------------------------ |
| $Pa$ og $m^3/s$ → $W$      | $P = p \cdot Q$                                   |
| $bar$ og $l/min$ → $kW$    | $P = \dfrac{p \cdot Q}{600}$                      |
| $MPa$ og $l/min$ → $kW$    | $P = \dfrac{p \cdot Q}{60}$                       |
| $psi$ og $gpm$ (US) → $hp$ | $P = \dfrac{p \cdot Q}{1714}$                     |

### Kvar kjem 600 frå?

$1 \, bar = 10^5 \, Pa$ og $1 \, l/min = \dfrac{10^{-3} \, m^3}{60 \, s}$

$1 \, bar \cdot 1 \, l/min = 10^5 \cdot \dfrac{10^{-3}}{60} \, W = \dfrac{100}{60} \, W = \dfrac{1}{600} \, kW$

### Kvar kjem 1714 frå?

$1 \, hp = 550 \, ft \cdot lbf/s = 396\,000 \, in \cdot lbf/min$ og $1 \, gpm = 231 \, in^3/min$

$\dfrac{396\,000}{231} = 1714$

---

## Enheter og antagelser
- $p$ er **trykkforskjellen** over komponenten. I eit ope hydraulikksystem med låg returtrykk kan ein bruke manometertrykket direkte. Ved høgt mottrykk i retur: bruk $\Delta p = p_{inn} - p_{ut}$.
- Formelen gir **hydraulisk** effekt — effekten i oljen. Den gjeld uansett om effekten blir til arbeid eller til varme.
- Inkompressibel væske. For olje er dette godt nok ved normale trykk.

**Akseleffekt til pumpe** (det motoren må levere):

$\Large P_{aksel} = \dfrac{p \cdot Q}{600 \cdot \eta_{tot}}$

**Akseleffekt ut frå hydraulikkmotor:**

$\Large P_{aksel} = \dfrac{p \cdot Q \cdot \eta_{tot}}{600}$

Typisk totalverknadsgrad $\eta_{tot}$:

| Pumpe- / motortype      | $\eta_{tot}$ ca. |
| ----------------------- | ---------------- |
| Tannhjulspumpe          | 0,75 – 0,85      |
| Vingepumpe              | 0,75 – 0,85      |
| Stempelpumpe (aksial)   | 0,85 – 0,92      |

**Same formel for vasspumper:** $p = \rho g H$, så $P = \rho g H Q$. Sjå [Rørstrøm og pumpe](../calculators/pipe-flow-calculator.md) og [Bernoullis formel](bernoullis.md).

---

## Eksempel

**1) Traktorhydraulikk:** 180 bar, 60 l/min.

$P = \dfrac{180 \cdot 60}{600} = 18 \, kW$

Med tannhjulspumpe ($\eta \approx 0{,}85$) må motoren levere $\dfrac{18}{0{,}85} \approx 21 \, kW$ til pumpa.

**2) Sikkerhetsventilen blåser:** Same system, men sylinderen står i endestopp og all olje går over overtrykksventilen på 180 bar.
Ingen ting rører seg, så **heile 18 kW blir til varme i oljen** — like mykje som ca. åtte panelovnar. Dette er grunnen til at ein ikkje skal halde ein spake i endestopp, og grunnen til at system med mykje strupetap treng oljekjølar.

**3) Sylinder, SI og praktisk form side om side:** Ø80 mm stempel, 200 bar, 0,1 m/s.

$A = \pi \cdot 0{,}04^2 = 5{,}03 \cdot 10^{-3} \, m^2$

$Q = A \cdot v = 5{,}03 \cdot 10^{-4} \, m^3/s = 30{,}2 \, l/min$

SI: $P = 200 \cdot 10^5 \, Pa \cdot 5{,}03 \cdot 10^{-4} \, m^3/s = 10\,050 \, W$

Praktisk: $P = \dfrac{200 \cdot 30{,}2}{600} = 10{,}05 \, kW$ ✓

**4) Imperial:** 2500 psi, 10 gpm.

$P = \dfrac{2500 \cdot 10}{1714} = 14{,}6 \, hp \approx 10{,}9 \, kW$

(Kontroll: 2500 psi = 172 bar, 10 gpm = 37,9 l/min → $\dfrac{172 \cdot 37{,}9}{600} = 10{,}9 \, kW$ ✓)

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
P = \Delta p \cdot Q
$$

$$
P_{kW} = \dfrac{p_{bar} \cdot Q_{l/min}}{600}
$$
```

**Excel / kalkulator:**
```
kW frå bar og l/min:   =p_bar*Q_lpm/600
l/min frå kW og bar:   =600*P_kW/p_bar
hp frå psi og gpm:     =p_psi*Q_gpm/1714
```
