---
title: Newtons andre lov — Kinetikk av partikler
summary: ΣF = ma uttrykt i kartesiske, tangentiell-normal og radial-transversal koordinater
tags:
  - Fysikk
  - Engineering
  - Dynamikk
  - Mekanikk
type: formel
aliases:
search_words: Newton, andre lov, kinetikk, kraft, akselerasjon, koordinatsystem, polar, kartesisk, tangentiell, normal, radial, transvers, sentralkraft
updated: 2026-05-26
---

# Newtons andre lov (kinetikk av partikler)

Summen av krefter som virker på en partikkel er lik massen ganger akselerasjonen.

---

## Formel

$$
\sum \vec F = m \vec a
$$

Når man løser konkrete problemer dekomponerer man vektorligningen i et koordinatsystem som passer geometrien. Valg av koordinatsystem har stor betydning for hvor enkel regningen blir.

---

## Komponentformer i ulike koordinatsystem

### Kartesisk (x, y, z)

$$
\sum F_x = m a_x, \quad \sum F_y = m a_y, \quad \sum F_z = m a_z
$$

**Brukes når:** Bevegelsen er rettlinjet, eller når de naturlige aksene er faste i rommet (horisontalt/vertikalt). Klassisk for projektiler, kasse på skråplan, blokk på bord, osv.

---

### Tangentiell og normal (t, n)

$$
\sum F_t = m a_t = m \dfrac{dv}{dt}
$$

$$
\sum F_n = m a_n = m \dfrac{v^2}{\rho}
$$

**Brukes når:** Partikkelen følger en kjent kurve (bil i sving, perle på tråd, kulebane langs spor). Aksene følger banen: $\hat e_t$ peker langs farten, $\hat e_n$ peker mot krumningssenteret.

Den normale komponenten gir alltid en kraft mot krumningssenteret. Se [Sentripetal akselerasjon](sentripetal-akselerasjon.md).

---

### Radial og transversal / polar (r, θ)

$$
\sum F_r = m(\ddot r - r\dot\theta^2)
$$

$$
\sum F_\theta = m(r\ddot\theta + 2\dot r\dot\theta)
$$

**Brukes når:** Bevegelse beskrives naturlig fra et fast senterpunkt (planetbaner, sentralkrefter, partikkel i roterende spor, robotarm). Aksene roterer med partikkelen: $\hat e_r$ peker fra origo til partikkelen, $\hat e_\theta$ står vinkelrett (i økende $\theta$-retning).

**Spesialtilfelle — sentralkraft:** Når den eneste kraften på partikkelen peker mot eller fra origo, er $\sum F_\theta = 0$. Det fører til at $r^2 \dot\theta = $ konstant (Keplers 2. lov / bevart angulært bevegelsesmoment).

---

## Variabler

$\vec F =$ Kraftvektor [$N$]
$m =$ Masse [$kg$]
$\vec a =$ Akselerasjon [$m/s^2$]
$v =$ Fart langs banen [$m/s$]
$\rho =$ Krumningsradius på banen i punktet [$m$]
$r =$ Avstand fra origo til partikkelen [$m$]
$\theta =$ Vinkel fra fast referanseakse [$rad$]
$\dot r, \ddot r =$ Første og andre tidsderivert av $r$ [$m/s$, $m/s^2$]
$\dot\theta, \ddot\theta =$ Vinkelhastighet og vinkelakselerasjon [$rad/s$, $rad/s^2$]

---

## Enheter og antagelser

- SI-enheter: $N$, $kg$, $m$, $s$, $rad$.
- Gjelder i et **inertialsystem** (ikke-akselererende referansesystem). I roterende referansesystem må man legge til fiktive krefter (sentrifugal- og Corioliskraft).
- $m$ antas konstant. For variabel masse (rakett, transportbånd med pålast) brukes den fullstendige formen $\vec F = d(m\vec v)/dt$.
- Krumningsradiusen $\rho$ er den lokale radiusen til banen — for sirkelbevegelse er $\rho = r$ konstant.

---

## Valg av koordinatsystem — praktisk huskeliste

| Geometri / type problem | Naturlig koordinatsystem |
| --- | --- |
| Rettlinjet, horisontalt/vertikalt | Kartesisk |
| Skråplan, projektil | Kartesisk (gjerne rotert til skråplanet) |
| Sirkulær eller kurvet bane, kjent radius | Tangentiell–normal |
| Bevegelse om et fast senter, sentralkrefter | Radial–transversal |
| Roterende arm/spor med glidende partikkel | Radial–transversal |

---

## Eksempel

En bil på 1200 kg kjører gjennom en horisontal sving med radius 50 m i 60 km/t. Hvor stor sidekraft må veibanen gi for å holde bilen i svingen?

$v = 60/3.6 \approx 16{,}67 \ m/s$
$\rho = 50 \ m, \quad m = 1200 \ kg$

Bruker tangentiell–normal komponent (normalretning er inn mot svingsenteret):

$\sum F_n = m \dfrac{v^2}{\rho} = 1200 \cdot \dfrac{16{,}67^2}{50} \approx 6670 \ N$

Veibanen må gi ca. **6,7 kN sidekraft** — fra friksjon eller dosering (banking) eller en kombinasjon.

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
\sum \vec F = m \vec a
$$

$$
\sum F_t = m \dfrac{dv}{dt}, \qquad \sum F_n = m \dfrac{v^2}{\rho}
$$

$$
\sum F_r = m(\ddot r - r\dot\theta^2), \qquad \sum F_\theta = m(r\ddot\theta + 2\dot r\dot\theta)
$$
```

---

## Relatert
- [Sentripetal akselerasjon](sentripetal-akselerasjon.md)
- [Bevegelseslikninger ved konstant akselerasjon](konstant-akselerasjon.md)
- [Kinetisk energi](kinetisk-energi.md)
- [Treghetsmoment og motstandsmoment](../notes/treghetsmoment-motstandsmoment.md) — rotasjonsmessig analog ($\sum M = I \alpha$)
