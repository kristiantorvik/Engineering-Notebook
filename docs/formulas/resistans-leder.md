---
title: Resistans i leder
summary: Berekner DC-resistansen til en leder utfra material, lengd og tverrsnitt.
tags:
  - Elektrisk
  - Engineering
type: formel
search_words: resistans, resistance, resistivity, ρ, rho, leder, conductor, kobber, aluminium, copper
updated: 2026-05-10
---

# Resistans i leder
DC-resistansen til ein metallisk leiar — proporsjonal med lengda, omvendt proporsjonal med tverrsnittet, og skalert med materialets spesifikke resistans $\rho$. Brukast for å rekne kabel-resistans (og dermed [spenningsfall](spenningsfall-kabel.md) og [varmetap](elektrisk-effekt.md)).

---

## Formel

$$
\huge R = \rho \cdot \dfrac{L}{A}
$$

---

## Variabler
$R =$ Resistans ($\Omega$)
$\rho =$ Spesifikk resistans (resistivitet) for materialet ($\Omega \cdot mm^2 / m$ eller $\Omega \cdot m$)
$L =$ Lengd på leiaren ($m$)
$A =$ Tverrsnitt ($mm^2$ eller $m^2$ — må matche $\rho$)

---

## Enheter og antagelser
**Ingeniør-enheten** $\Omega \cdot mm^2/m$ er praktisk fordi du då kan bruke $L$ i meter og $A$ i $mm^2$ direkte — slik kabeltverrsnitt er oppgitte. SI-versjonen er $\Omega \cdot m$ med $L$ i meter og $A$ i $m^2$.

Omrekning: $1 \, \Omega \cdot mm^2/m = 10^{-6} \, \Omega \cdot m$

Formelen gjeld for **DC** og for **AC ved låge frekvensar** (50/60 Hz, vanlege tverrsnitt). Ved høgare frekvensar reduserer **skin-effekten** den effektive tverrsnittet — relevant ved sveiseapparat, høgfrekvent omformerstraum, eller leiarar over ca. 50 mm² ved 50 Hz.

Resistansen er temperaturavhengig:

$\large R_T = R_{20} \cdot [1 + \alpha \cdot (T - 20°C)]$

For kobber er $\alpha \approx 0{,}0039 \, /°C$ — det vil seie ca. 20 % auke frå 20 °C til 70 °C (typisk drifts-temperatur i ein kabel).

### Spesifikk resistans, vanlege material (ved 20 °C)

| Material  | $\rho$ ($\Omega \cdot mm^2/m$) | $\alpha$ ($/°C$) |
| --------- | ------------------------------ | ---------------- |
| Sølv      | 0,0159                         | 0,0038           |
| Kobber    | 0,0175                         | 0,0039           |
| Gull      | 0,022                          | 0,0034           |
| Aluminium | 0,028                          | 0,0040           |
| Stål      | 0,10–0,15                      | 0,005            |
| Konstantan| 0,50                           | 0,00001          |

Ein praktisk hugsregel: **Al har ca. 60 % av leiingsevna til Cu** — for same resistans må Al-tverrsnittet vera ca. 1,6× større.

Sjå [AWG/mm² kabelstørrelse](../reference/AWG-mm2-kabelstørrelse.md) for tverrsnitt-tabell.

---

## Eksempel

**1) 100 m 2,5 mm² Cu installasjonskabel:**

$R = \rho \cdot \dfrac{L}{A} = 0{,}0175 \cdot \dfrac{100}{2{,}5} = 0{,}70 \, \Omega$

(Per leiar — eit kabelpar har $2 \cdot 0{,}70 = 1{,}4 \, \Omega$ tur og retur.)

**2) Same lengd, men i Al:**

$R = 0{,}028 \cdot \dfrac{100}{2{,}5} = 1{,}12 \, \Omega$

For å matche kobberets resistans i Al, treng vi:

$A_{Al} = \dfrac{\rho_{Al} \cdot L}{R_{Cu}} = \dfrac{0{,}028 \cdot 100}{0{,}70} = 4{,}0 \, mm^2$

→ 4 mm² Al ≈ 2,5 mm² Cu, som forventa frå 1,6×-regelen.

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
R = \rho \cdot \dfrac{L}{A}
$$
```

**Python:**
```python
RHO = {
    "Cu": 0.0175,    # Ω·mm²/m ved 20 °C
    "Al": 0.028,
    "Ag": 0.0159,
    "Au": 0.022,
    "Fe": 0.12,
}

def resistans(L, A, material="Cu", T=20.0):
    """Resistans [Ω] for leiar med lengd L [m] og tverrsnitt A [mm²]."""
    rho = RHO[material]
    alpha = 0.0039 if material in ("Cu", "Al", "Ag", "Au") else 0.005
    rho_T = rho * (1 + alpha * (T - 20))
    return rho_T * L / A
```

---

## Relatert
- [Ohms lov](ohms-lov.md)
- [Spenningsfall i kabel](spenningsfall-kabel.md)
- [AWG/mm² kabelstørrelse](../reference/AWG-mm2-kabelstørrelse.md)
