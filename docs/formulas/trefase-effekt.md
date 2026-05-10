---
title: Trefase effekt
summary: Effekt i et symmetrisk 3-fase system, uttrykt med linjespenning og linjestraum.
tags:
  - Elektrisk
  - Engineering
type: formel
search_words: trefase, three phase, 3-phase, effekt, power, cos phi, effektfaktor, motor, 400V
updated: 2026-05-10
---

# Trefase effekt
Aktiv effekt i et symmetrisk 3-fase system. Brukast over alt der ein dimensjonerer motorar, varmebatteri, hovudtavler eller industrielle laster — i Noreg typisk på 400 V TN-S eller 230 V IT.

Faktoren $\sqrt{3}$ kjem av at linjespenninga er $\sqrt{3}$ gonger fasespenninga i ein symmetrisk Y-kopling, kombinert med at dei tre fasane er forskuva 120°.

---

## Formel

$$
\huge P = \sqrt{3} \cdot U \cdot I \cdot \cos \varphi
$$

Med følgjande relaterte størrelsar:

$$
\large S = \sqrt{3} \cdot U \cdot I \qquad Q = \sqrt{3} \cdot U \cdot I \cdot \sin \varphi
$$

---

## Variabler
$P =$ Aktiv (Virkelig) effekt ($W$)
$S =$ Tilsynelatande effekt ($VA$)
$Q =$ Reaktiv effekt ($VAR$)
$U =$ Linjespenning, mellom to fasar ($V$, rms) — typisk 400 V i TN-anlegg
$I =$ Linjestraum ($A$, rms)
$\cos \varphi =$ Effektfaktor, faseforskyving mellom $U$ og $I$ (–)

---

## Enheter og antagelser
SI-enheter: Watt, Volt-Ampere, Volt-Ampere-Reaktiv, Volt, Ampere.

Gjeld for **symmetrisk** 3-fase last — det vil seie lik impedans i alle tre fasane. For usymmetrisk last må kvar fase reknast for seg.

$U$ i formelen er **linjespenning** (mellom to fasar). I Noreg:
- TN-S anlegg: $U_L = 400 \, V$, $U_{fase} = 230 \, V$
- IT-anlegg (eldre, særleg vest): $U_L = 230 \, V$, ingen nøytralleiar

For ein motor er $\cos \varphi$ typisk 0,80–0,90 ved fullast og lågare ved dellast. Står på navneskiltet.

For reint resistiv last (varmebatteri) er $\cos \varphi = 1$ og formelen blir $P = \sqrt{3} \cdot U \cdot I$.

---

## Eksempel

**1) Motorstraum:** Ein 11 kW asynkronmotor på 400 V har $\cos \varphi = 0{,}85$ ved fullast og virkningsgrad $\eta = 0{,}90$. Kor mykje straum trekk han?

Først må vi rekne *opptatt* (elektrisk) effekt — namneeffekten 11 kW er *avgjeven* (mekanisk) effekt:

$P_{el} = \dfrac{P_{mek}}{\eta} = \dfrac{11000}{0{,}90} \approx 12\,200 \, W$

$I = \dfrac{P_{el}}{\sqrt{3} \cdot U \cdot \cos \varphi} = \dfrac{12\,200}{\sqrt{3} \cdot 400 \cdot 0{,}85} \approx 20{,}7 \, A$

Vel 25 A trege motorvern (oppstartsstraum er 5–7× nominell).

**2) Varmebatteri i ventilasjon:** 9 kW reint resistivt varmebatteri på 400 V. $\cos \varphi = 1$.

$I = \dfrac{P}{\sqrt{3} \cdot U} = \dfrac{9000}{\sqrt{3} \cdot 400} \approx 13 \, A$

Passar ein 16 A 3-fase kurs.

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
P = \sqrt{3} \cdot U \cdot I \cdot \cos \varphi
$$
```

**Python:**
```python
import math

def trefase_straum(P, U=400, cos_phi=0.85):
    """Linjestraum frå aktiv effekt P [W], linjespenning U [V], cos phi."""
    return P / (math.sqrt(3) * U * cos_phi)

def trefase_effekt(U, I, cos_phi):
    """Aktiv effekt [W] frå linjespenning, linjestraum, cos phi."""
    return math.sqrt(3) * U * I * cos_phi
```

---

## Relatert
- [Elektrisk effekt](elektrisk-effekt.md)
- [Spenningsfall i kabel](spenningsfall-kabel.md)
- [Impedans](impedans.md)
