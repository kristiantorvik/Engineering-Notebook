---
title: Effektbehov halvplanende skrog
summary: Estimer toppfart og effekt for deplasemangsskrog.
tags:
  - Gestimering
  - Engineering
  - Tommelfinger-regel
  - Båt
type: formel
aliases:
  - Effektbehov for båter
  - Nødvendig hestekrefter båt
  - Toppfart båt
search_words: 
updated: 2026-03-22
---
# Effektbehov for halvplanende skrog (Semi-Displacement Hull)

Et **halvplanende skrog** (semi-displacement hull) er en hybrid mellom deplasementsskrog og planende skrog.
Skroget har en spiss baug, fullt tverrsnitt ved midtskips, og smalner noe mot akter.

Typiske egenskaper:

* **1/4-beam buttock-vinkel:** mellom **2° og 8°**
* Kan delvis **plane ut av vannet** ved høyere fart
* Mindre følsom for lastøkning enn planende skrog
* Kan oppnå høyere fart enn rene deplasementsskrog

Halvplanende skrog er fortsatt begrenset av **baug-bølgefenomenet**, men ved høyere fart-lengde-forhold.

Typisk operasjonsområde:

$$
1.4 < SL < 2.9
$$

---

# Displacement-Length Ratio

Før man kan beregne effektbehovet må **Displacement-Length Ratio (DL)** bestemmes.

$$
\Large \boxed{DL = \dfrac{disp_T}{(0.01 \cdot WL)^3}}
$$

---

## Variabler

$DL =$ Displacement-Length Ratio

$disp_T =$ Deplasement i **long tons**

$$
1 \text{ long ton} = 2240 \text{ pounds}
$$

$WL =$ Vannlinjelengde i **fot**

---

# Maksimalt Speed-Length Ratio

Når $DL$ er kjent kan maksimal tillatt **Speed-Length Ratio** beregnes:

$$
\Large \boxed{SL = \dfrac{8.26}{DL^{0.311}}}
$$

Hvor konstanten **8.26** brukes i Caterpillar-metoden.

Denne verdien representerer **maksimal fart før baug-bølgebegrensning oppstår**.

---

# Effektberegning

Når design-SL er kjent kan samme sammenheng brukes som for deplasementsskrog:

$$
\Large \boxed{\dfrac{Lbs}{Hp} = \dfrac{10.665}{SL^3}}
$$

Deretter beregnes effekt til propellen:

$$
\Large \boxed{Hp = \dfrac{Lbs}{Lbs/Hp}}
$$

---

# Eksempel

Gitt et fartøy med:

* $WL = 62 \ ft$
* $disp = 44$ long tons
* Designfart = $11.5 \ knots$

---

## 1. Beregn DL

$$
DL = \dfrac{44}{(0.01 \cdot 62)^3}
$$

$$
DL = 184.6 \approx 185
$$

---

## 2. Finn maksimal SL

$$
SL = \dfrac{8.26}{185^{0.311}}
$$

$$
SL \approx 1.63
$$

Dette er **maksimal mulig fart-lengde-ratio**.

---

## 3. Beregn design SL

$$
SL = \dfrac{11.5}{\sqrt{62}}
$$

$$
SL = 1.46
$$

Siden:

$$
1.46 < 1.63
$$

er designfarten mulig.

---

## 4. Finn Lbs/Hp

$$
\dfrac{Lbs}{Hp} = \dfrac{10.665}{1.46^3}
$$

$$
\dfrac{Lbs}{Hp} \approx 390
$$

---

## 5. Beregn effekt

Total vekt:

$$
44 \times 2240 = 98560 \ lbs
$$

$$
Hp = \dfrac{98560}{390}
$$

$$
Hp \approx 253
$$

Dette er **effekten levert til propellen**, uten reserve eller drivlinjetap.

---

## For copy/paste

**Python**

```python
import math

def semi_displacement_hp(weight_lbs, speed_kn, wl_ft):
    SL = speed_kn / math.sqrt(wl_ft)
    lbs_per_hp = 10.665 / (SL ** 3)
    hp = weight_lbs / lbs_per_hp
    return hp
```

**Markdown / Latex**

```markdown
$$DL = \dfrac{disp_T}{(0.01 \cdot WL)^3}$$

$$SL = \dfrac{8.26}{DL^{0.311}}$$

$$\dfrac{Lbs}{Hp} = \dfrac{10.665}{SL^3}$$
```
