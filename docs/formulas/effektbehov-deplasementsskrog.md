---
title: Effektbehov deplasemangskrog
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
updated: 2026-03-22
---
# Effektbehov for deplasementsskrog

**Deplasementsskrog** er skrog som beveger seg gjennom vannet ved å fortrenge det, i stedet for å plane oppå vannoverflaten.
Et slikt skrog kjennetegnes ved avsmalning både i baug og akter og en **1/4-beam buttock-vinkel ≥ 8°**.

Når farten øker vil fartøyet til slutt havne i sin egen baug-bølgedal. Dette gjør at fartøyet i praksis må "klatre oppover" bølgen. Resultatet er kraftig økning i motstand og redusert effektivitet i propellen.

Derfor finnes det en **praktisk fartsgrense** for deplasementsskrog, definert ved:

$$
SL \approx 1.34
$$

Forsøk på å drive et deplasementsskrog over denne verdien vil vanligvis være **lite effektivt og sløse drivstoff**.

---

## Formel

For å estimere effektbehovet brukes sammenhengen mellom **vekt per hestekraft** og **fart-lengde-forholdet**.

$$
\Large \boxed{\dfrac{\text{Lbs}}{\text{Hp}} = \dfrac{10.665}{SL^3}}
$$

Effekten som må leveres til propellen kan deretter beregnes som:

$$
\Large \boxed{Hp = \dfrac{\text{Lbs}}{\text{Lbs/Hp}}}
$$

---

## Variabler

$SL =$ Speed-Length Ratio

$Hp =$ Hestekraft levert til propellen

$Lbs =$ Fartøyets deplasement (vekt) i pounds

---

## Speed-Length Ratio

Speed-Length Ratio beskriver forholdet mellom fart og vannlinjelengde.

$$
\Large \boxed{SL = \dfrac{V}{\sqrt{WL}}}
$$

---

## Enheter og antagelser

Typiske enheter brukt i metoden:

* $V$ i **knop**
* $WL$ i **fot**
* $Lbs$ i **pounds**
* $Hp$ i **horsepower**

Metoden gjelder hovedsakelig for **rene deplasementsskrog** hvor:

$$
SL < 1.34
$$

---

## Eksempel

Anta et fartøy med:

* Vannlinjelengde: $WL = 200 \ ft$
* Deplasement: $440000 \ lbs$
* Ønsket fart: $18 \ kn$

### 1. Beregn Speed-Length Ratio

$$
SL = \dfrac{18}{\sqrt{200}}
$$

$$
SL \approx 1.27
$$

Dette er **under grensen 1.34**, så farten er realistisk for et deplasementsskrog.

---

### 2. Finn Lbs/Hp

$$
\dfrac{Lbs}{Hp} = \dfrac{10.665}{1.27^3}
$$

$$
\dfrac{Lbs}{Hp} \approx 592
$$

---

### 3. Beregn nødvendig effekt

$$
Hp = \dfrac{440000}{592}
$$

$$
Hp \approx 743
$$

Dette er **effekten som må leveres til propellen**, og inkluderer ikke:

* drivlinjetap
* reserveeffekt
* bølger og vind
* ekstra last

Derfor vil installert motoreffekt vanligvis være **høyere enn dette tallet**.

---

## For copy/paste

**Python**

```python
import math

def displacement_hp(weight_lbs: float, speed_kn: float, wl_ft: float):
    SL = speed_kn / math.sqrt(wl_ft)
    lbs_per_hp = 10.665 / (SL ** 3)
    hp = weight_lbs / lbs_per_hp
    return hp
```

**Markdown / LaTeX**

```markdown
$$\dfrac{\text{Lbs}}{\text{Hp}} = \dfrac{10.665}{SL^3}$$

$$Hp = \dfrac{\text{Lbs}}{\text{Lbs/Hp}}$$

$$SL = \dfrac{V}{\sqrt{WL}}$$
```
