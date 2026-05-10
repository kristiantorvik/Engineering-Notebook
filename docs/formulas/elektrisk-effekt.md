---
title: Elektrisk effekt
summary: Effekt i en likestrømskrets eller 1-fase vekselstrømskrets med rein resistiv last.
tags:
  - Elektrisk
  - Engineering
type: formel
search_words: effekt, power, watt, P=UI, P=I2R, joule, varmetap
updated: 2026-05-10
---

# Elektrisk effekt
Effekten ein komponent omsett — enten som nyttig arbeid (motor, varmeovn) eller som varmetap (i ein kabel).

---

## Formel

$$
\huge P = U \cdot I
$$

Kombinert med Ohms lov ($U = R \cdot I$) får ein dei to nyttige variantane:

$$
\large P = I^2 \cdot R \qquad P = \dfrac{U^2}{R}
$$

---

## Variabler
$P =$ Effekt ($W$, Watt)
$U =$ Spenning ($V$, Volt rms ved AC)
$I =$ Straum ($A$, Ampere rms ved AC)
$R =$ Resistans ($\Omega$, Ohm)

---

## Enheter og antagelser
SI-enheter: Watt, Volt, Ampere, Ohm.

Gjeld direkte for **likestraum (DC)** og for **1-fase vekselstraum (AC) med rein resistiv last** (cos φ = 1) — typisk varmeomnar, glødepærer, varmtvannsbeholder, varmekablar.

For AC med induktiv eller kapasitiv last (motorar, lysrør med drossel, switch-mode-laster) må ein gange med effektfaktoren:

$\large P = U \cdot I \cdot \cos \varphi$

For 3-fase, sjå [Trefase effekt](trefase-effekt.md).

$P = I^2 R$ er særleg nyttig når ein reknar **varmetap i ein leder** — ein kjenner straumen og resistansen, men ikkje spenningsfallet.
$P = U^2/R$ er nyttig når ein kjenner forsyningsspenninga og lasta er spesifisert i ohm (varmeelement).

---

## Eksempel

**1) Panelovn:** Ein 2300 W panelovn er kopla til 230 V. Kor mykje straum trekk han, og kva er resistansen i elementet?

$I = \dfrac{P}{U} = \dfrac{2300}{230} = 10 \, A$

$R = \dfrac{U^2}{P} = \dfrac{230^2}{2300} = 23 \, \Omega$

(10 A passar med ein 16 A-kurs med god margin.)

**2) Varmetap i tilkoplingskabel:** Samme omn, kopla med 25 m 1,5 mm² Cu-kabel (R/m ≈ 0,012 Ω/m, så tur+retur 50 m → 0,6 Ω total leder-resistans).

$P_{tap} = I^2 \cdot R = 10^2 \cdot 0{,}6 = 60 \, W$

60 W tapt som varme i kabelen — ikkje farleg, men illustrerer kvifor ein ikkje legg lange straumkrevjande kursar i tynn kabel.

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
P = U \cdot I
$$

$$
P = I^2 \cdot R = \dfrac{U^2}{R}
$$
```

**Python:**
```python
def power(U=None, I=None, R=None):
    """Effekt i DC / resistiv AC. Gje to av {U, I, R}, få P."""
    if R is None:  return U * I
    if U is None:  return I**2 * R
    if I is None:  return U**2 / R
```

---

## Relatert
- [Ohms lov](ohms-lov.md)
- [Trefase effekt](trefase-effekt.md)
- [Spenningsfall i kabel](spenningsfall-kabel.md)
