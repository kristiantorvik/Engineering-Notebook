---
title: Overflateruhet — neseradius og mating
summary: Teoretisk overflateruhet (Ra / Rz) ved dreiing frå mating og neseradius, og mating som trengs for å nå ein gitt ruhet.
tags:
  - Maskinering
  - CNC
  - Toleranser
  - Tommelfinger-regel
  - Engineering
type: formel
aliases: [overflatefinhet, surface finish, surface roughness]
search_words: overflatefinhet, overflateruhet, ruhet, Ra, Rz, Rmax, Rt, surface finish, roughness, neseradius, nose radius, hjørneradius, mating, feed, mm/o, dreiing, turning, wiper, kuleendefres, ball nose, scallop, stepover, N-klasse
updated: 2026-11-12
---

# Overflateruhet frå neseradius og mating
Ved dreiing lagar neseradiusen på skjæret ei rekkje små bogar i overflata, ein for kvar omdreining. Høgda på desse bogane gir den teoretiske ruheten.

---

## Formel

**Finn ruheten** (gitt mating og neseradius):

$$
\huge R_z \approx \dfrac{f^2}{8 \, r_\varepsilon} \cdot 1000
$$

$$
\huge R_a \approx \dfrac{f^2}{32 \, r_\varepsilon} \cdot 1000
$$

**Finn matinga** (gitt ønskt ruhet og neseradius):

$$
\huge f \approx \sqrt{0{,}032 \cdot r_\varepsilon \cdot R_a}
$$

$$
\huge f \approx \sqrt{0{,}008 \cdot r_\varepsilon \cdot R_z}
$$

---

## Variabler
$R_a =$ Aritmetisk middelruhet ($\mu m$)
$R_z =$ Teoretisk profilhøgde, topp til botn ($\mu m$) — tilsvarar $R_{max}$ / $R_t$ for den ideelle profilen
$f =$ Mating ($mm/o$, mm per omdreining)
$r_\varepsilon =$ Neseradius på skjæret ($mm$)

Faktoren $1000$ gjer om frå mm til µm. Faktorane $0{,}032$ og $0{,}008$ er $32/1000$ og $8/1000$.

---

## Enheter og antagelser
- **Teoretisk minimum.** Verkeleg ruhet blir nesten alltid høgare pga. vibrasjonar, slitasje, kantoppbygging (BUE), dårleg sponbryting og materialet. Rekn med at verkeleg $R_a$ ligg 1,5–2× over teoretisk ved vanleg skrubbing/halvfin, og nærmare ved god finbearbeiding.
- Gjeld når matinga er godt under neseradiusen. **Tommelfingerregel:** $f \le 0{,}5 \cdot r_\varepsilon$ — over dette blir formelen mindre presis.
- Gjeld vanlege skjær. **Wiper-skjær** gir ca. halv $R_a$ ved same mating, eller kan køyrast med ca. dobbel mating for same $R_a$.
- $R_z \approx 4 \cdot R_a$ for denne ideelle profilen. For verkelege overflater varierer forholdet meir (typisk 4–7).

### Kvar kjem formelen frå?
Kvar omdreining flyttar skjæret seg $f$ sidelengs. Bogen frå neseradiusen lagar ein kam mellom to snitt. Høgda på kammen er pilhøgda til ein sirkelboge med korde $f$:

$\large h = r - \sqrt{r^2 - (f/2)^2} \approx \dfrac{f^2}{8r}$

For ein slik paraboloid profil er middelavviket ca. 1/4 av topp-til-botn, difor $\dfrac{f^2}{32r}$ for $R_a$. (Eksakt faktor er $18\sqrt{3} \approx 31{,}2$, men 32 er godt nok.)

### Same formel for kuleendefres
Kamhøgda (scallop) mellom to banar med kulefres er nøyaktig same geometri, med sidesteg $a_e$ i staden for mating:

$\large h \approx \dfrac{a_e^2}{8 \, r} \qquad a_e \approx \sqrt{8 \, r \, h}$

$r =$ radius til kulefresen, $a_e =$ sidesteg (stepover), $h =$ kamhøgde.

---

## Tabell — mating (mm/o) for ønskt teoretisk Ra

$f = \sqrt{0{,}032 \cdot r_\varepsilon \cdot R_a}$

| $r_\varepsilon$ (mm) | Ra 0,4 | Ra 0,8 | Ra 1,6 | Ra 3,2 | Ra 6,3 |
| -------------------- | ------ | ------ | ------ | ------ | ------ |
| 0,2                  | 0,05   | 0,07   | 0,10   | 0,14   | *0,20* |
| 0,4                  | 0,07   | 0,10   | 0,14   | 0,20   | *0,28* |
| 0,8                  | 0,10   | 0,14   | 0,20   | 0,29   | 0,40   |
| 1,2                  | 0,12   | 0,18   | 0,25   | 0,35   | 0,49   |
| 1,6                  | 0,14   | 0,20   | 0,29   | 0,40   | 0,57   |

*Kursiv:* over $f = 0{,}5 \cdot r_\varepsilon$ — sjekk skjærdata frå produsenten.

### Ra og gamle merkingar

| Ra (µm) | N-klasse | Ra (µin) | Typisk                             |
| ------- | -------- | -------- | ---------------------------------- |
| 0,1     | N3       | 4        | Polert, lepping                    |
| 0,2     | N4       | 8        | Hona, fin sliping                  |
| 0,4     | N5       | 16       | Sliping, svært fin dreiing         |
| 0,8     | N6       | 32       | Fin dreiing, tetningsflater        |
| 1,6     | N7       | 63       | God dreiing / fresing, lagerseter  |
| 3,2     | N8       | 125      | Vanleg maskinert                   |
| 6,3     | N9       | 250      | Skrubbing, grov dreiing            |
| 12,5    | N10      | 500      | Grov skrubbing                     |

1 µm = 39,37 µin. Kvart steg i N-klassen doblar Ra.

---

## Eksempel

**1) Finn ruheten:** Skjær med $r_\varepsilon = 0{,}8 \, mm$, mating $f = 0{,}2 \, mm/o$.

$R_z = \dfrac{0{,}2^2}{8 \cdot 0{,}8} \cdot 1000 = \dfrac{0{,}04}{6{,}4} \cdot 1000 \approx 6{,}3 \, \mu m$

$R_a = \dfrac{0{,}2^2}{32 \cdot 0{,}8} \cdot 1000 = \dfrac{0{,}04}{25{,}6} \cdot 1000 \approx 1{,}6 \, \mu m$

**2) Finn matinga:** Teikninga krev $R_a \, 0{,}8$, du har eit skjær med $r_\varepsilon = 0{,}4 \, mm$.

$f = \sqrt{0{,}032 \cdot 0{,}4 \cdot 0{,}8} = \sqrt{0{,}01024} \approx 0{,}10 \, mm/o$

Køyr gjerne litt under (0,08–0,09) for å ha margin mot verkeleg ruhet. Byter du til $r_\varepsilon = 0{,}8$ kan du auke til $0{,}14 \, mm/o$ — dobbel neseradius gir $\sqrt{2} \approx 1{,}4 \times$ mating.

**3) Kulefres:** Ø10 kulefres ($r = 5 \, mm$), sidesteg 0,5 mm.

$h = \dfrac{0{,}5^2}{8 \cdot 5} = 0{,}00625 \, mm \approx 6 \, \mu m$

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$ R_z \approx \dfrac{f^2}{8 \, r_\varepsilon} \cdot 1000 $$
$$ R_a \approx \dfrac{f^2}{32 \, r_\varepsilon} \cdot 1000 $$
$$ f \approx \sqrt{0{,}032 \cdot r_\varepsilon \cdot R_a} $$
```

**Excel / kalkulator:** (f i mm/o, r i mm, Ra/Rz i µm)
```
Ra frå mating:     =f^2/(32*r)*1000
Rz frå mating:     =f^2/(8*r)*1000
Mating frå Ra:     =SQRT(0.032*r*Ra)
Mating frå Rz:     =SQRT(0.008*r*Rz)
```
