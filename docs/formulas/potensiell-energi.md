---
title: Potensiell energi
summary: Energi lagret i tyngdefeltet og i fjærer — nær jordoverflaten, over store avstander, og i elastiske element
tags:
  - Fysikk
  - Engineering
  - Dynamikk
  - Energi
type: formel
aliases:
search_words: potensiell energi, tyngde, gravitasjon, fjær, fjor, spring, elastisk, bevaring av energi, konservativ kraft
updated: 2026-05-26
---

# Potensiell energi

Energi lagret i et **konservativt kraftfelt** — kan omdannes til kinetisk energi (og tilbake) uten tap. De tre vanligste formene i mekanikken er:

- **Tyngdepotensial nær bakken** — når $g$ kan regnes konstant
- **Gravitasjonspotensial over store avstander** — når $g$ varierer med høyden
- **Elastisk potensial i fjær** — Hookes lov

---

## Formel

### Tyngd nær bakken (g konstant)

$$
V_g = m g y
$$

### Gravitasjon over store avstander (g varierer)

$$
V_g = -\dfrac{G M m}{r}
$$

### Elastisk (lineær fjær)

$$
V_e = \tfrac{1}{2} k x^2
$$

---

## Variabler

$V_g =$ Tyngdepotensial [$J$]
$V_e =$ Elastisk potensial [$J$]
$m =$ Masse [$kg$]
$g =$ Tyngdens akselerasjon, $\approx 9{,}81 \ m/s^2$
$y =$ Høyde over et fritt valgt referansenivå [$m$]
$G =$ Gravitasjonskonstant $= 6{,}674 \cdot 10^{-11} \ N \cdot m^2 / kg^2$
$M =$ Masse til det dominerende legemet (jorda, sola, e.l.) [$kg$]
$r =$ Avstand fra senter til senter [$m$]
$k =$ Fjærstivhet [$N/m$]
$x =$ Forskyvning fra avslappet (uspent) lengde [$m$]

---

## Enheter og antagelser

- SI-enheter: $J$, $N$, $m$, $kg$.
- **Tyngd nær bakken:** Forutsetter at $g$ er konstant. Gjelder så lenge høydeendringen er liten mot jordas radius (alle jordnære problem).
- **Gravitasjon (fjern variant):** Brukes for satellitt- og banemekanikk. Negativt fortegn — potensialet er null i uendelig avstand og blir negativt når man nærmer seg legemet. Snarvei: $G M = g R^2$ der $R$ er planetens radius og $g$ er overflateakselerasjonen, slik at man slipper å slå opp $GM$.
- **Fjær:** Forutsetter en lineær fjær (Hookes lov: $F = -k x$) og at $x$ måles fra uspent posisjon. Formelen gjelder både ved trykk og strekk.
- **Referansenivå:** For $V_g = mgy$ kan referansen velges fritt — bare differansen $\Delta V$ har fysisk betydning.

---

## Sammenheng med kraft

Kraft er den negative gradienten av potensiell energi:

$$
F = -\dfrac{dV}{dx}
$$

Sjekk:

- Tyngd: $V = mgy \;\Rightarrow\; F = -mg$ (nedover)
- Fjær: $V = \tfrac{1}{2}kx^2 \;\Rightarrow\; F = -kx$ (mot likevekt)
- Gravitasjon: $V = -GMm/r \;\Rightarrow\; F = -GMm/r^2$ (mot senter)

---

## Bevaring av mekanisk energi

Når kun konservative krefter virker:

$$
T_1 + V_1 = T_2 + V_2
$$

Friksjon, luftmotstand og plastisk deformasjon er **ikke** konservative — da må man legge til arbeidet utført av ikke-konservative krefter:

$$
T_1 + V_1 + U_{\text{ikke-kons}} = T_2 + V_2
$$

Se [Kinetisk energi](kinetisk-energi.md).

---

## Eksempel — bil i fritt rull

En bil ($m = 1500 \ kg$) ruller fritt nedover en bakke som faller 20 m. Hvilken hastighet får den ved foten, dersom vi ser bort fra friksjon og luftmotstand?

Velg referansenivå ved foten av bakken. Topp: $y_1 = 20 \ m, \ v_1 = 0$. Bunn: $y_2 = 0, \ v_2 = ?$

$T_1 + V_1 = T_2 + V_2$
$0 + m g \cdot 20 = \tfrac{1}{2} m v_2^2 + 0$
$v_2 = \sqrt{2 g \cdot 20} = \sqrt{2 \cdot 9{,}81 \cdot 20} \approx 19{,}8 \ m/s \approx 71 \ km/t$

Bilens masse forsvinner ut av regnestykket — et tegn på at man er på rett spor.

---

## Eksempel — sammenpresset fjær

En fjær med stivhet $k = 2000 \ N/m$ er sammenpresset 50 mm fra avslappet lengde. Hvor mye energi er lagret?

$x = 0{,}050 \ m$

$V_e = \tfrac{1}{2} k x^2 = \tfrac{1}{2} \cdot 2000 \cdot 0{,}050^2 = 2{,}5 \ J$

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
V_g = m g y
$$

$$
V_g = -\dfrac{G M m}{r}
$$

$$
V_e = \tfrac{1}{2} k x^2
$$
```

---

## Relatert
- [Kinetisk energi](kinetisk-energi.md)
- [Newtons andre lov](newtons-andre-lov.md)
- [Bevegelseslikninger ved konstant akselerasjon](konstant-akselerasjon.md)
