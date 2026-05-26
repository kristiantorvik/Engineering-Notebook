---
title: Støt
summary: Kort teknisk oversikt over støt mellom partikler og stive legemer — bevegelsesmengde, koeffisient av restitusjon, energitap, og typiske spesialtilfelle
tags:
  - Fysikk
  - Engineering
  - Dynamikk
  - Mekanikk
type: notat
aliases:
search_words: støt, kollisjon, impact, collision, restitusjon, koeffisient av restitusjon, bevegelsesmengde, momentum, elastisk, plastisk, sentralt, skråstilt, eksentrisk
updated: 2026-05-26
---

# Støt

Et **støt** er en kort kontakt mellom to legemer der svært store krefter virker i et svært kort tidsrom. To grunnprinsipp gir oss alt vi treng for å analysere det:

1. **Bevaring av bevegelsesmengde** — sum momentum før = sum momentum etter (gjelder alltid, siden ytre krefter er små i forhold til støtkraften i den korte tida).
2. **Koeffisient av restitusjon ($e$)** — empirisk relasjon mellom relative hastigheter før og etter.

---

## Klassifisering

| Type | Geometri |
| --- | --- |
| **Sentralt** | Massesentrene ligger på støttlinja (linja gjennom kontaktpunktet, vinkelrett på kontaktflata) |
| **Eksentrisk** | Minst ett massesenter ligger utenfor støttlinja — relevant for stive legemer som kan rotere |
| **Direkte** | Hastighetene før støt ligger langs støttlinja |
| **Skråstilt (oblique)** | Hastighetene har komponenter på tvers av støttlinja |

| Energi | $e$-verdi |
| --- | --- |
| Perfekt elastisk | $e = 1$ — kinetisk energi bevart |
| Delvis elastisk | $0 < e < 1$ — vanlig tilfelle |
| Perfekt plastisk | $e = 0$ — legemene fester seg sammen |

---

## Grunnligninger — direkte sentralt støt

**Massesenter A og B beveger seg langs samme linje.**

### Bevegelsesmengde (alltid)

$$
m_A v_A + m_B v_B = m_A v'_A + m_B v'_B
$$

### Koeffisient av restitusjon

$$
\boxed{ \ v'_B - v'_A = e (v_A - v_B), \quad 0 \le e \le 1 \ }
$$

Tolkning: Relativ hastighet etter støt = $e \cdot$ relativ hastighet før, med motsatt fortegn (de skiller seg i stedet for å nærme seg).

To ligninger, to ukjente ($v'_A, v'_B$).

---

## Energitap — direkte sentralt støt

Direkte formel for tap av kinetisk energi (slipper å rekne $T$ før og etter):

$$
\Delta T = -\dfrac{1}{2} \cdot \dfrac{m_A m_B}{m_A + m_B} \cdot (v_A - v_B)^2 \cdot (1 - e^2)
$$

- $e = 1$ (elastisk): $\Delta T = 0$
- $e = 0$ (plastisk): maks energitap

---

## Skråstilt sentralt støt

Dekomponér i komponentar langs støttlinja ($n$, normal til kontaktflata) og vinkelrett på ($t$, tangent):

**Tangentielle komponenter er uendret** (ingen kraft på tvers):

$$
(v_A)_t = (v'_A)_t, \quad (v_B)_t = (v'_B)_t
$$

**Normale komponenter:** Bruk de to grunnligningene over på $n$-komponentane:

$$
m_A (v_A)_n + m_B (v_B)_n = m_A (v'_A)_n + m_B (v'_B)_n
$$

$$
(v'_B)_n - (v'_A)_n = e \left[ (v_A)_n - (v_B)_n \right]
$$

---

## Spesialtilfelle

### Perfekt plastisk ($e = 0$)

Legemene fester seg sammen — felles sluttfart $v'$:

$$
v' = \dfrac{m_A v_A + m_B v_B}{m_A + m_B}
$$

### Perfekt elastisk ($e = 1$) og like masser

Hastighetene bytter plass:

$$
v'_A = v_B, \quad v'_B = v_A
$$

(Klassisk biljardkule-resultat — kvit kule som treffer stillstående rød kule direkte: kvit stopper, rød reiser ut med samme fart.)

---

## Støt mot fast vegg (uendelig masse)

$$
\boxed{ \ v'_n = -e \, v_n, \quad v'_t = v_t \ }
$$

Normalkomponenten snur og blir redusert med faktoren $e$. Tangentialkomponenten er uendret.

**Sprett-høgde i serie:** En ball som droppes fra høgde $h_0$ med restitusjon $e$ mot bakken vil nå:

$$
h_n = e^{2n} h_0
$$

etter $n$ sprett. Faktor $e^2$ per sprett kommer av at både opp- og nedhastigheten reduseres med faktor $e$.

---

## Eksentrisk støt (stive legemer)

Når støtet treff utenfor massesenteret begynner kroppen også å rotere. Da treng man en ny strategi:

**Steg 1 — Bevart angulær bevegelsesmengde om kontaktpunktet $Q$:**

Støtkraften virker i $Q$, så den gir ikkje noko moment om $Q$. Derfor er $H_Q$ bevart for kvart legeme:

$$
H_Q^{\text{før}} = H_Q^{\text{etter}}
$$

der $H_Q = \bar I \omega + m \bar v \cdot d$ (med $d$ = vinkelrett avstand mellom $\bar v$ og $Q$).

**Steg 2 — Restitusjon med kontaktpunkthastigheiter (ikkje massesenter):**

$$
e = \dfrac{(v'_B)_n - (v'_A)_n}{(v_A)_n - (v_B)_n}
$$

der hastighetene er ved sjølve kontaktpunktet:

$$
\vec v_\text{kont} = \vec v_G + \vec\omega \times \vec r_{\text{kont}/G}
$$

For plastisk eksentrisk støt ($e = 0$): kontaktpunkthastighetene matcher etter støt (eller er null mot fast vegg).

---

## Eksempel 1 — Direkte sentralt støt

To pucker på ein friksjonsfri benk: $m_A = 2 \ kg$ med $v_A = 5 \ m/s$ treffer $m_B = 3 \ kg$ med $v_B = -1 \ m/s$ (kjem mot kvarandre). Koeffisient $e = 0{,}6$. Finn farten etter støt.

**Bevegelsesmengde:**
$2 \cdot 5 + 3 \cdot (-1) = 2 v'_A + 3 v'_B$
$7 = 2 v'_A + 3 v'_B \quad (1)$

**Restitusjon:**
$v'_B - v'_A = 0{,}6 \cdot (5 - (-1)) = 3{,}6 \quad (2)$

Frå $(2)$: $v'_B = v'_A + 3{,}6$. Sett inn i $(1)$:
$7 = 2 v'_A + 3(v'_A + 3{,}6) = 5 v'_A + 10{,}8$
$v'_A = -0{,}76 \ m/s$
$v'_B = +2{,}84 \ m/s$

A spretter tilbake (negativ retning), B reiser framover.

**Sjekk energitap:**
$\Delta T = -\tfrac{1}{2} \cdot \dfrac{2 \cdot 3}{2+3} \cdot 6^2 \cdot (1 - 0{,}36)$
$\Delta T = -\tfrac{1}{2} \cdot 1{,}2 \cdot 36 \cdot 0{,}64 \approx -13{,}8 \ J$

---

## Eksempel 2 — Perfekt plastisk (bilkrasj)

En bil på 1500 kg i 60 km/t kjører bakfra inn i en stillstående bil på 1200 kg. Bilane låser seg saman. Felles fart rett etter?

$v_A = 60/3.6 \approx 16{,}67 \ m/s, \quad v_B = 0$

$v' = \dfrac{m_A v_A + m_B v_B}{m_A + m_B} = \dfrac{1500 \cdot 16{,}67}{1500 + 1200} \approx 9{,}26 \ m/s \approx 33{,}3 \ km/t$

**Energitap:**
$T_\text{før} = \tfrac{1}{2} \cdot 1500 \cdot 16{,}67^2 \approx 208 \ kJ$
$T_\text{etter} = \tfrac{1}{2} \cdot 2700 \cdot 9{,}26^2 \approx 115{,}7 \ kJ$
$\Delta T \approx -92 \ kJ$ — omtrent **44 % av rørsleenergien** går tapt til deformasjon/lyd/varme.

---

## Eksempel 3 — Sprett-høgde i serie

En basketball ($e = 0{,}75$ mot harde golvet) droppes frå 2 m. Kor høgt sprett han etter 3. sprett?

$h_3 = e^{2 \cdot 3} \cdot h_0 = 0{,}75^6 \cdot 2 \approx 0{,}178 \cdot 2 \approx 0{,}356 \ m$

Etter 5 sprett: $0{,}75^{10} \cdot 2 \approx 0{,}113 \ m$. Etter 10 sprett: praktisk talt død.

---

## Eksempel 4 — Skråstilt mot vegg

En ball treffer ein vertikal vegg med fart $v = 8 \ m/s$ i vinkel $\theta = 30°$ frå normalen. Restitusjon $e = 0{,}8$. Finn farten og vinkelen etter spretten.

**Dekomponér:**
$v_n = v \cos\theta = 8 \cos 30° \approx 6{,}93 \ m/s$
$v_t = v \sin\theta = 8 \sin 30° = 4{,}00 \ m/s$

**Etter sprett:**
$v'_n = -e \cdot v_n = -0{,}8 \cdot 6{,}93 \approx -5{,}54 \ m/s$ (snur)
$v'_t = v_t = 4{,}00 \ m/s$ (uendra)

Total fart: $v' = \sqrt{5{,}54^2 + 4^2} \approx 6{,}84 \ m/s$
Ny vinkel frå normalen: $\theta' = \arctan(4 / 5{,}54) \approx 35{,}8°$

Spretten er flatare enn innfallsvinkelen — typisk for $e < 1$.

---

## Vanlege fallgruver

- **Bevegelsesmengde er ein vektor.** Pass på fortegn ved 1D-problem og dekomponering ved 2D.
- **Restitusjonsformelen** bruker *relativ* hastighet, ikkje absolutt. Husk å bytta fortegn på $v_B$ hvis dei to går mot kvarandre.
- **Energi er IKKJE bevart** unntatt for perfekt elastisk støt ($e = 1$). Bevegelsesmengde er alltid bevart (i fråvær av eksterne impulsar).
- **Eksentrisk støt:** Bruk kontaktpunkthastighetene i restitusjons-formelen, ikkje massesenter-hastighetene.
- **"Støt"-antakelsen** krev at kontakttida er kort nok til at vanlige ytre krefter (tyngd, fjær) kan neglisjerast i sjølve støtfasen.

---

## Relatert
- [Newtons andre lov](../formulas/newtons-andre-lov.md)
- [Kinetisk energi](../formulas/kinetisk-energi.md)
- [Plan rørsle av stive legemer — krefter og akselerasjon](../formulas/plan-rørsle-stive-legemer.md)
- [Treghetsmoment og motstandsmoment](treghetsmoment-motstandsmoment.md) — for $\bar I$ i eksentrisk støt
