---
title: Bevegelseslikninger ved konstant akselerasjon
summary: De tre kinematiske ligningene for rettlinjet bevegelse med konstant akselerasjon, samt rotasjonsanalogene
tags:
  - Fysikk
  - Engineering
  - Dynamikk
  - Kinematikk
type: formel
aliases:
search_words: konstant akselerasjon, kinematikk, suvat, hastighet, posisjon, integrasjon, rotasjon, vinkelakselerasjon, bremselengde, fritt fall
updated: 2026-05-26
---

# Bevegelseslikninger ved konstant akselerasjon

Tre ligninger som relaterer posisjon, hastighet, tid og akselerasjon når akselerasjonen er **konstant**. Klassisk verktøy for fritt fall, bremselengde, akselerasjonsfaser og lignende.

---

## Formel

### Rettlinjet (translasjon)

$$
v = v_0 + a t
$$

$$
x = x_0 + v_0 t + \tfrac{1}{2} a t^2
$$

$$
v^2 = v_0^2 + 2 a (x - x_0)
$$

### Rotasjon (samme form, andre symbol)

$$
\omega = \omega_0 + \alpha t
$$

$$
\theta = \theta_0 + \omega_0 t + \tfrac{1}{2} \alpha t^2
$$

$$
\omega^2 = \omega_0^2 + 2 \alpha (\theta - \theta_0)
$$

---

## Variabler

### Rettlinjet
$x =$ Posisjon ved tid $t$ [$m$]
$x_0 =$ Startposisjon [$m$]
$v =$ Hastighet ved tid $t$ [$m/s$]
$v_0 =$ Starthastighet [$m/s$]
$a =$ Akselerasjon (konstant) [$m/s^2$]
$t =$ Tid [$s$]

### Rotasjon
$\theta =$ Vinkelposisjon ved tid $t$ [$rad$]
$\theta_0 =$ Startvinkel [$rad$]
$\omega =$ Vinkelhastighet ved tid $t$ [$rad/s$]
$\omega_0 =$ Start-vinkelhastighet [$rad/s$]
$\alpha =$ Vinkelakselerasjon (konstant) [$rad/s^2$]
$t =$ Tid [$s$]

---

## Enheter og antagelser

- SI-enheter, men formlene fungerer i alle enhetssystem så lenge du er konsekvent.
- **Krav: Akselerasjonen må være konstant gjennom hele intervallet.** Hvis $a$ varierer med tid, posisjon eller hastighet må man integrere — se [Derivasjon](../notes/derivasjon.md) og [Integrasjon](../notes/integrasjon.md).
- Bevegelsen er rettlinjet, eller projektert på én akse. I 2D/3D bruker man formlene komponentvis (f.eks. for [Prosjektilbevegelse](../notes/prosjektilbevegelse.md)).
- Tyngdekraft nær jordoverflaten gir $a = g = 9{,}81 \ m/s^2$ rettet nedover. Standard valg for fritt fall.
- Vinkelstørrelser må være i radianer (ikke grader eller rpm).

---

## Velge riktig ligning

| Du kjenner | Du vil finne | Bruk |
| --- | --- | --- |
| $v_0, a, t$ | $v$ | $v = v_0 + at$ |
| $v_0, a, t$ | $x$ | $x = x_0 + v_0 t + \tfrac{1}{2} a t^2$ |
| $v_0, a, \Delta x$ | $v$ (uten tid) | $v^2 = v_0^2 + 2a\,\Delta x$ |
| $v, v_0, a$ | $t$ | Løs første for $t$ |
| $v, v_0, \Delta x$ | $a$ | Løs tredje for $a$ |

---

## Utledning

Når $a$ er konstant og $a = dv/dt$:

$\int_{v_0}^{v} dv = \int_0^t a \, dt \quad \Rightarrow \quad v = v_0 + a t$

Setter $v = dx/dt$ og integrerer en gang til:

$\int_{x_0}^{x} dx = \int_0^t (v_0 + a t) \, dt \quad \Rightarrow \quad x = x_0 + v_0 t + \tfrac{1}{2} a t^2$

Den tredje ligningen (uten tid) får man ved å eliminere $t$ fra de to første, eller direkte ved kjerneregelen $a = v \, dv/dx$:

$\int_{v_0}^v v \, dv = \int_{x_0}^x a \, dx \quad \Rightarrow \quad \tfrac{1}{2}(v^2 - v_0^2) = a(x - x_0)$

For rotasjon er utledningen identisk med $\theta \leftrightarrow x$, $\omega \leftrightarrow v$, $\alpha \leftrightarrow a$.

---

## Eksempel — bremselengde

En bil bremser fra 80 km/t til full stopp på 50 m. Hva er den (konstante) retardasjonen?

$v_0 = 80/3.6 \approx 22{,}22 \ m/s, \quad v = 0, \quad \Delta x = 50 \ m$

Bruker $v^2 = v_0^2 + 2a\,\Delta x$:

$0 = 22{,}22^2 + 2a \cdot 50 \quad \Rightarrow \quad a = -\dfrac{22{,}22^2}{100} \approx -4{,}94 \ m/s^2$

Bilen retarderer ca. **$5 \ m/s^2$** — tilsvarende rundt $0{,}5 \ g$.

---

## Eksempel — fritt fall

En stein slippes fra hvile fra et 30 m høyt stup. Hvor lang tid bruker den ned, og hvor stor er nedslagshastigheten?

$v_0 = 0, \quad a = g = 9{,}81 \ m/s^2$ (nedover), $\quad \Delta x = 30 \ m$

Tid: $\Delta x = \tfrac{1}{2} g t^2 \Rightarrow t = \sqrt{2 \cdot 30 / 9{,}81} \approx 2{,}47 \ s$

Hastighet: $v = g t \approx 9{,}81 \cdot 2{,}47 \approx 24{,}3 \ m/s \approx 87{,}5 \ km/t$

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
v = v_0 + a t
$$

$$
x = x_0 + v_0 t + \tfrac{1}{2} a t^2
$$

$$
v^2 = v_0^2 + 2 a (x - x_0)
$$
```

---

## Relatert
- [Newtons andre lov](newtons-andre-lov.md)
- [Prosjektilbevegelse](../notes/prosjektilbevegelse.md)
- [Sentripetal akselerasjon](sentripetal-akselerasjon.md)
- [Derivasjon](../notes/derivasjon.md)
- [Integrasjon](../notes/integrasjon.md)
