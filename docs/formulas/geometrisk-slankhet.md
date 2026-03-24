---
title: Geometrisk slankhet
summary: Gir et forhold til den geometriske stabiliteten i en søyle, brukt i knekking/buckling formler
tags:
  - Styrkeberegning
  - Engineering
type: formel
aliases:
  - Geometrisk slankhet
updated: 2026-03-22
---

# Geometrisk slankhet
**Geometrisk slankhet** forteller noe om den geometriske stabliteten og er gitt ved:
$L_k  =$ Stavens effektive lengde er lengden ganget med korreksjonsfaktor for innfestning
$i =$ Treghetsradius
$I =$ Treghetsmoment (andre arealmoment)
$\lambda_g =$ Geometrisk slankhetstall

**Sjekk ut notat om knekking for bruk**
- [Knekking Notat](../notes/knekking.md)

---

## Formel

$$
\text{Geometrisk slankhet:}\quad \Large \boxed{\lambda_g = \dfrac{L_k}{i}}
$$

---

## Variabler
$L_k  =$ Stavens effektive lengde er lengden ganget med korreksjonsfaktor for innfestning
$i =$ Treghetsradius
$I =$ Treghetsmoment (andre arealmoment)
$\lambda_g =$ Geometrisk slankhetstall
---

## Enheter og antagelser

Si enheter.

---

## Utledning

Tilpasset empirisk data

---

## Eksempel

neh

---

## For copy/paste

**Python:**
```python
import math
def geom_slankhet(Lk: float, i: float) -> float:
    return Lk / i
```

**Markdown / Latex:**
```Markdown
$$ \boxed{\Large P = \dfrac{\delta_r \cdot E(r_y^2-r_i^2)}{ r_i \cdot 2 \cdot r_y^2}}$$
```

---

## Relatert

- [Knekking Notat](../notes/knekking.md)
