---
title: Sentripetal akselerasjon
summary: Berekner akselerasjonen et objekt må ha for å kurve med en spesifikk radius
tags:
  - Fysikk
  - Engineering
  - Dynamikk
type: formel
aliases:
  - Sentrifugal akselerasjon
updated: 2026-03-22
---

# Sentripetal akselerasjon
Sentripetal akselerasjon er akselerasjonen et objekt må ha for å kurve med en spesifikk radius.

---


## Formel

$$
a_{\perp}\,=\,{\frac{v^{2}}{r}}
$$

---

## Variabler
$a_{\perp} =$ Sentripetal akselerasjonen [$m/s^2$]
$v =$ Hastigheten [$m/s$]
$r =$ radiusen til buevegelsen [$m$]
---

## Enheter og antagelser
SI enheter, men fungerer også så lenge lengde-enheten er lik for alle variablene


---

## Utledning

### Kurve bevegelse
Her e ofta da enklaste å dela da opp i XYZ komponenta og rekan dei som lineære.

Men du kan og beskriva bevegelsen som 2→3 vinkelrette retningar kor du har ein tangentiell retning og 1→2 vinkelrette.

En kan då relatera retningen på hastigheito direkte med akselerasjonen i normale/vinkelrette retning.

Om ein partikkel $P$ har hastigheit $\vec{v}$ og ein akselerasjon normal på $\vec{v}$ vil hastigheita ikkje endra seg (magnituden til $\vec{v}$), fordi den er vinkelrett.. duh..
Men hastigheita vil likevell endre retning. 

All ikkje linear bevegelse er sjølsagt ikkje perfekte kurver, men når tidrommet du undersøker går mot null og me analysere den umiddelbare bevegelsen er den identisk som om det var et umiddelbart øyeblikk fra en berfekt sirkulær bevegelse.

Me har en partikkel som beveger seg i ein bue rund eit senterpunkt med avstand r fra senter. Den har hastigheitsvektoren $\vec{v_1}$ og etter å ei tidsendring $\Delta \, t$ har den hastigheitsvektoren $\vec{v_2}$. Den har då forflytta seg ein avstand $v \, \Delta \, t$ og endra vinkel med $\theta$ 
Om du tegner $\vec{v_1}$ og $\vec{v_2}$ fra samme startpunkt (rau trekant under) får du ein likebeina trekant med vinkel $\theta$ mellom beina og kortsia $\Delta \, v$ 
Denne trekanten er kongruent med den blå under som viser start og sluttpunktet.
Derfot kan en setta opp ei likning basert på at forholdet mellom beinlengda og kortsia er lik på disse trekantane.

$\large \dfrac{\Delta \, v}{v} = \dfrac{v \, \Delta \, t}{r}$

Om en snur om litt får en:


$\large \dfrac{\Delta \, v}{\Delta \, t} = \dfrac{v^2}{r}$

Viss en ser på et umiddelbart tilfelle der $\Delta \, t$ går mot null får ein den deriverte av hastigheit med hensyn på tid, som er lik aksellerasjon.

$\large \dfrac{d \, v}{d \, t} = \dfrac{v^2}{r}$

$\large a = \dfrac{v^2}{r}$

![[Illustration_sentripetal_acceleration.png]]

relaterer då den normale (vinkelrette) akselerasjonen til kurven til bevegelsen. 

---

## Eksempel

neh

---

## For copy/paste

**Python:**
```python
```

**Markdown / Latex:**
```Markdown
$$
a_{\perp}\,=\,{\frac{v^{2}}{r}}
$$
```

---

## Relatert
