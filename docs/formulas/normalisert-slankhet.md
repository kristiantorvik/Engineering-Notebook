---
title: Normalisert slankhet
summary: Normalisert slankhet** er en "forbedret" slankhetsmodell som blir brukt i berekninger i henhold til Eurokodebuckling formler
tags:
  - Styrkeberegning
  - Engineering
type: formula
aliases:
  - Normalisert slankhet
updated: 2026-03-22
---

# Normalisert slankhet
**Normalisert slankhet** er en "forbedret" slankhetsmodell som blir brukt i berekninger i henhold til Eurokode. Den tar hensyn til materialets egenskaper og gir et bedre bilde på kor nærme søylen er å nå flytegrensen før knekking oppstår. Normalisert slankhet får ofte notasjon som $\lambda_{norm} \ , \:  \overline{\lambda} \ , \: \lambda'$

For normalisert slankhet vil $\lambda'$ vera omtrent 1 ved overgang fra plastisk til elastisk brudd.

**Sjekk ut notat om knekking for bruk**
- [Knekking Notat](../notes/knekking.md)

---

## Formel

$$
\text{Normalisert slankhet:}\quad \Large \boxed{\lambda' = \dfrac{\lambda_g}{\pi} \ \sqrt{\dfrac{\sigma_f}{E}} = \dfrac{L_k}{\pi \sqrt{\dfrac{I}{A}}} \ \sqrt{\dfrac{\sigma_f}{E}}}$$

---

## Variabler
$L_k  =$ Stavens effektive lengde er lengden ganget med korreksjonsfaktor for innfestning
$i =$ Treghetsradius
$I =$ Treghetsmoment (andre arealmoment)
$E =$ E-modulen til materialet
$\sigma_f =$ Flytegrensen
$\lambda_g =$ Geometrisk slankhet - [Geometrisk slankhet formel](../formulas/geometrisk-slankhet.md)
---

## Enheter og antagelser

Si enheter.

---

## Utledning

Veit ikkje

---

## Eksempel

neh

---

## For copy/paste

**Python:**
```python
import math
def norm_slankhet(Lk: float, i: float, I: float, E: float, sigmaf: float) -> float:
    return Lk / (math.pi * math.sqrt(I/A)) * math.sqrt(sigmaf / E)
```

**Markdown / Latex:**
```Markdown
$$\text{Normalisert slankhet:}\quad \Large \boxed{\lambda' = \dfrac{\lambda_g}{\pi} \ \sqrt{\dfrac{\sigma_f}{E}} = \dfrac{L_k}{\pi \sqrt{\dfrac{I}{A}}} \ \sqrt{\dfrac{\sigma_f}{E}}}$$
```

---

## Relatert

- [Knekking Notat](../notes/knekking.md)
