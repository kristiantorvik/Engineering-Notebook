---
title: Effektbehov planende skrog
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

# Effekt og hastighet for planende skrog (Planing Hull)

Et **planende skrog** er konstruert slik at fartøyet kan **plane opp på vannoverflaten** ved høy fart.

Når skroget planer:

* Reduseres dypgangen
* Baug-bølgen blir liten
* Farten begrenses ikke av samme bølgefenomen som deplasementsskrog

Kjennetegn:

* Spiss baug
* Full bredde ved midtskips
* Lite eller ingen aktertaper
* **1/4-beam buttock-vinkel ≤ 2°**

Planende skrog er derimot **svært følsomme for vektøkning**.

---

# Crouch's Planing Speed Formula

En enkel metode for å estimere fartspotensialet til planende skrog er **Crouch's Planing Speed Formula**.

$$
\Large \boxed{Speed = \dfrac{C}{\sqrt{Lbs/Hp}}}
$$

---

## Variabler

$Speed =$ Båtfart i **knop**

$C =$ Skrogkoeffisient

$Lbs =$ Fartøyvekt i **pounds**

$Hp =$ Effekt levert til propellen

---

## Typiske C-verdier

| Skrogtype              | C   |
| ---------------------- | --- |
| Vanlige fritidsbåter   | 150 |
| Høyhastighets cruisere | 190 |
| Racerbåter             | 210 |

---

# Eksempel

Anta:

* Vekt = **14000 lbs**
* Motorer = **2 × 435 Hp**
* Racetype skrog
* $C = 210$

---

## 1. Total motoreffekt

$$
Hp = 435 \times 2 = 870
$$

---

## 2. Drivlinjetap (3%)

$$
870 \times 0.97 = 844
$$

Tilgjengelig effekt til propell:

$$
Hp = 844
$$

---

## 3. Finn Lbs/Hp

$$
\dfrac{Lbs}{Hp} = \dfrac{14000}{844}
$$

$$
\dfrac{Lbs}{Hp} = 16.59
$$

---

## 4. Beregn fart

$$
Speed = \dfrac{210}{\sqrt{16.59}}
$$

$$
Speed \approx 51.56 \ knots
$$

---

# Effektøkning med fart

Effektbehovet øker omtrent **kubisk med fart**.

$$
\Large \boxed{\dfrac{Hp_2}{Hp_1} =
\left(\dfrac{V_2}{V_1}\right)^3}
$$

---

## Eksempel

Et fartøy går:

* $20 \ knots$
* bruker $500 \ Hp$

Ønsket fart:

* $25 \ knots$

---

### 1. Fartsforhold

$$
\dfrac{25}{20} = 1.25
$$

---

### 2. Kubisk effektforhold

$$
1.25^3 = 1.953125
$$

---

### 3. Ny effekt

$$
500 \times 1.953125
$$

$$
Hp \approx 977
$$

---

# Beregne ny fart fra effekt

Fart kan også finnes fra effekt:

$$
\Large \boxed{V_2 =
V_1 \sqrt[3]{\dfrac{Hp_2}{Hp_1}}}
$$

---

## For copy/paste

**Python**

```python
import math

def crouch_speed(C, weight_lbs, hp):
    lbs_per_hp = weight_lbs / hp
    speed = C / math.sqrt(lbs_per_hp)
    return speed
```

**Markdown / Latex**

```markdown
$$Speed = \dfrac{C}{\sqrt{Lbs/Hp}}$$

$$\dfrac{Hp_2}{Hp_1} =
\left(\dfrac{V_2}{V_1}\right)^3$$

$$V_2 =
V_1 \sqrt[3]{\dfrac{Hp_2}{Hp_1}}$$
```
