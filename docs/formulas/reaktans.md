---
title: Reaktans
summary: Den frekvensavhengige "motstanden" til en spole eller kondensator i AC-krets.
tags:
  - Elektrisk
  - Engineering
type: formel
search_words: reaktans, reactance, induktans, kapasitans, inductance, capacitance, XL, XC, spole, kondensator, resonans
updated: 2026-05-10
---

# Reaktans
Reaktans er den frekvensavhengige "motstanden" som ein spole ($X_L$) eller kondensator ($X_C$) gir mot vekselstraum. Til skilnad frå resistans, omset reaktans **ikkje** energi til varme — han lagrar henne (i magnetfelt eller elektrisk felt) og leverer henne tilbake i neste halvperiode.

Saman med [Impedans](impedans.md) og [Ohms lov](ohms-lov.md) utgjer dette grunnlaget for AC-analyse.

---

## Formel

**Induktiv reaktans** (spole):

$$
\huge X_L = 2 \pi f L = \omega L
$$

**Kapasitiv reaktans** (kondensator):

$$
\huge X_C = \dfrac{1}{2 \pi f C} = \dfrac{1}{\omega C}
$$

**Resonansfrekvens** (når $X_L = X_C$):

$$
\large f_0 = \dfrac{1}{2 \pi \sqrt{L \cdot C}}
$$

---

## Variabler
$X_L =$ Induktiv reaktans ($\Omega$)
$X_C =$ Kapasitiv reaktans ($\Omega$)
$f =$ Frekvens ($Hz$) — i Noreg 50 Hz på nettet
$\omega =$ Vinkelfrekvens, $2\pi f$ ($rad/s$)
$L =$ Induktans ($H$, henry)
$C =$ Kapasitans ($F$, farad)
$f_0 =$ Resonansfrekvens ($Hz$)

---

## Enheter og antagelser
SI-enheter: Ohm, Hertz, Henry, Farad. Hugs at praktiske komponentar gjerne er i mH (milli) og µF (mikro):

$1 \, mH = 10^{-3} \, H$, $\quad 1 \, \mu F = 10^{-6} \, F$, $\quad 1 \, nF = 10^{-9} \, F$

Reaktans-formlane gjeld for **ideelle** komponentar — verkelege spolar har òg **resistans** (kobbertap) og parasittisk **kapasitans**, og verkelege kondensatorar har lekkasje og ESR. For 50 Hz-bruk er ideal-modellen som regel god nok.

Karakteristikk-oppførsel:
- **Spole**: $X_L \propto f$ — blokkerer høge frekvensar, sleppar gjennom DC ($X_L = 0$ ved $f = 0$).
- **Kondensator**: $X_C \propto 1/f$ — blokkerer DC ($X_C \to \infty$ ved $f = 0$), sleppar gjennom høge frekvensar.

I serie-RLC oppfører dei seg motsette i fase, og **delvis kansellerer** kvarandre — derav $X = X_L - X_C$ i [impedans](impedans.md)-formelen.

Faseforskyving for ein **ideell** komponent:
- Spole: straumen ligg **90° etter** spenninga.
- Kondensator: straumen ligg **90° før** spenninga.

---

## Utledning

For ein induktor med $u(t) = U_0 \sin(\omega t)$ og relasjon $u = L \, di/dt$:

$\large i(t) = \dfrac{1}{L} \int u \, dt = -\dfrac{U_0}{\omega L} \cos(\omega t) = \dfrac{U_0}{\omega L} \sin(\omega t - 90°)$

Forholdet mellom topp-spenning og topp-straum (= reaktans) er:

$\large X_L = \dfrac{U_0}{I_0} = \omega L = 2\pi f L$

For ein kondensator med $i = C \, du/dt$ og same $u(t)$:

$\large i(t) = C \cdot U_0 \omega \cos(\omega t) = U_0 \omega C \sin(\omega t + 90°)$

$\large X_C = \dfrac{U_0}{I_0} = \dfrac{1}{\omega C} = \dfrac{1}{2\pi f C}$

Faseforskyvingane (±90°) fell ut av sinus/cosinus-relasjonen.

---

## Eksempel

**1) Spole på 50 Hz:** Ein 10 mH spole.

$X_L = 2\pi \cdot 50 \cdot 0{,}010 \approx 3{,}14 \, \Omega$

På 230 V (idealisert): $I = 230/3{,}14 \approx 73 \, A$ — straumen avgrensa berre av reaktansen, men i praksis avgrensar resistans og spole-spesifikasjonar.

**2) Kondensator på 50 Hz:** Ein 100 µF kondensator (typisk fasekompensering).

$X_C = \dfrac{1}{2\pi \cdot 50 \cdot 100 \cdot 10^{-6}} \approx 31{,}8 \, \Omega$

På 230 V: $I = 230/31{,}8 \approx 7{,}2 \, A$ rms reaktiv straum.

Reaktiv effekt: $Q = U \cdot I = 230 \cdot 7{,}2 \approx 1{,}66 \, kVAR$ — typisk fasekompenseringsdose.

**3) Resonans:** $L = 10 \, mH$ og $C = 100 \, \mu F$ i serie.

$f_0 = \dfrac{1}{2\pi \sqrt{0{,}010 \cdot 100 \cdot 10^{-6}}} = \dfrac{1}{2\pi \sqrt{10^{-6}}} = \dfrac{1}{2\pi \cdot 10^{-3}} \approx 159 \, Hz$

Ved 159 Hz kansellerer reaktansane kvarandre, og kretsen oppfører seg reint resistivt.

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
X_L = 2\pi f L
$$

$$
X_C = \dfrac{1}{2\pi f C}
$$

$$
f_0 = \dfrac{1}{2\pi \sqrt{LC}}
$$
```

**Python:**
```python
import math

def XL(f, L):
    """Induktiv reaktans [Ω] for L [H] ved f [Hz]."""
    return 2 * math.pi * f * L

def XC(f, C):
    """Kapasitiv reaktans [Ω] for C [F] ved f [Hz]."""
    return 1 / (2 * math.pi * f * C)

def resonansfrekvens(L, C):
    """f_0 [Hz] der X_L = X_C."""
    return 1 / (2 * math.pi * math.sqrt(L * C))
```

---

## Relatert
- [Impedans](impedans.md)
- [Ohms lov](ohms-lov.md)
- [Trefase effekt](trefase-effekt.md)
