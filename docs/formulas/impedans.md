---
title: Impedans
summary: Den totale "AC-motstanden" i en krets med resistans og reaktans.
tags:
  - Elektrisk
  - Engineering
type: formel
search_words: impedans, impedance, Z, AC, vekselstraum, fase, faseforskyving, cos phi
updated: 2026-05-10
---

# Impedans
Impedans $Z$ er det vekselstraum-analoge til resistans — den effektive "motstanden" ein AC-spenning ser, både i magnitude *og* i faseforskyving. Saman med [Reaktans](reaktans.md) og [Ohms lov](ohms-lov.md) er dette grunnsteinen i AC-analyse.

For ein serie-RLC-krets stiller resistansen $R$ og total reaktansen $X = X_L - X_C$ vinkelrett på kvarandre i kompleksplanet. Impedansen er hypotenusen.

---

## Formel

**Magnitude:**

$$
\huge Z = \sqrt{R^2 + X^2}
$$

der $X = X_L - X_C$ er netto reaktans.

**Faseforskyving** mellom spenning og straum:

$$
\large \tan \varphi = \dfrac{X}{R} \qquad \cos \varphi = \dfrac{R}{Z}
$$

**Ohms lov for AC** (med rms-verdiar):

$$
\large U = Z \cdot I
$$

---

## Variabler
$Z =$ Impedans ($\Omega$)
$R =$ Resistans ($\Omega$)
$X =$ Netto reaktans, $X_L - X_C$ ($\Omega$) — sjå [Reaktans](reaktans.md)
$X_L =$ Induktiv reaktans, $2\pi f L$ ($\Omega$)
$X_C =$ Kapasitiv reaktans, $1/(2\pi f C)$ ($\Omega$)
$\varphi =$ Faseforskyving mellom $U$ og $I$ ($rad$ eller $°$)
$\cos \varphi =$ Effektfaktor (–)

---

## Enheter og antagelser
SI-enheter: Ohm, radianer.

Formelen gjeld for **serie-RLC** (alle elementa i ein straumveg). For parallell-kopling må ein anten reise inn i kompleksplanet:

$\large Z = R + j(X_L - X_C)$

og bruke [serie/parallell-reglane](resistans-serie-parallell.md) på dei komplekse verdiane, eller arbeide med admittans $Y = 1/Z$.

Verdiane $U$ og $I$ er **rms** (effektivverdiar). Toppverdi er $\sqrt{2}$ gonger større.

Fortegnskonvensjon:
- $\varphi > 0$ (induktiv): straumen ligg **etter** spenninga.
- $\varphi < 0$ (kapasitiv): straumen ligg **før** spenninga.
- $\varphi = 0$ (resonans, $X_L = X_C$): rein resistiv, $Z = R$.

Effektrelasjonar (sjå òg [Trefase effekt](trefase-effekt.md)):
- Aktiv effekt $P = U \cdot I \cdot \cos \varphi$
- Tilsynelatande effekt $S = U \cdot I = Z \cdot I^2$
- Reaktiv effekt $Q = U \cdot I \cdot \sin \varphi$

---

## Utledning

I serie deler $R$, $X_L$ og $X_C$ same straum $I$. Spenningsfallet over kvar er $I R$, $I X_L$ og $I X_C$ — men fasevektorane peiker i ulike retningar:

- Spenninga over $R$ er i fase med $I$ (peikar langs reell akse).
- Spenninga over $X_L$ ligg **+90°** før $I$ (peikar langs +imaginær akse).
- Spenninga over $X_C$ ligg **–90°** etter $I$ (peikar langs –imaginær akse).

Total spenning er vektorsummen:

$\large U = I \cdot \sqrt{R^2 + (X_L - X_C)^2}$

Definer $Z = U/I$, og du får impedans-formelen. Faseforskyvinga $\varphi$ er vinkelen mellom $U$-vektoren og $I$-vektoren — som $\tan \varphi = X/R$ frå rettvinkla geometri.

---

## Eksempel

**1) Motor som serie-RL:** Ein einfase motor er modellert som $R = 4 \, \Omega$ i serie med $X_L = 3 \, \Omega$ ved 50 Hz.

$Z = \sqrt{4^2 + 3^2} = \sqrt{25} = 5 \, \Omega$

På 230 V: $I = U/Z = 230/5 = 46 \, A$

$\cos \varphi = R/Z = 4/5 = 0{,}80$ (induktiv)

Aktiv effekt: $P = U \cdot I \cdot \cos \varphi = 230 \cdot 46 \cdot 0{,}80 \approx 8{,}5 \, kW$

Tilsynelatande effekt: $S = U \cdot I = 230 \cdot 46 \approx 10{,}6 \, kVA$

**2) Resonans:** Ein serie-RLC med $R = 10 \, \Omega$, $L = 100 \, mH$, $C = 100 \, \mu F$.

Ved 50 Hz: $X_L = 2\pi \cdot 50 \cdot 0{,}1 \approx 31{,}4 \, \Omega$, $X_C = 1/(2\pi \cdot 50 \cdot 10^{-4}) \approx 31{,}8 \, \Omega$

$X = X_L - X_C \approx -0{,}4 \, \Omega$ (lett kapasitiv, nær resonans)

$Z = \sqrt{10^2 + 0{,}4^2} \approx 10{,}0 \, \Omega$ — nesten reint resistiv.

(Eksakt resonansfrekvens: $f_0 = 1/(2\pi\sqrt{LC}) = 1/(2\pi\sqrt{0{,}1 \cdot 10^{-4}}) \approx 50{,}3 \, Hz$.)

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
Z = \sqrt{R^2 + (X_L - X_C)^2}
$$

$$
\cos \varphi = \dfrac{R}{Z}
$$
```

**Python:**
```python
import math, cmath

def impedans(R, XL=0, XC=0):
    """Magnitude Z [Ω] og faseforskyving φ [rad] for serie-RLC."""
    X = XL - XC
    Z = math.hypot(R, X)
    phi = math.atan2(X, R)
    return Z, phi

def impedans_kompleks(R, XL=0, XC=0):
    """Impedans som komplekst tal Z = R + jX."""
    return complex(R, XL - XC)
```

---

## Relatert
- [Reaktans](reaktans.md)
- [Ohms lov](ohms-lov.md)
- [Resistans serie og parallell](resistans-serie-parallell.md)
- [Trefase effekt](trefase-effekt.md)
