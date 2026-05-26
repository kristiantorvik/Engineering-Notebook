---
title: Prosjektilbevegelse
summary: Bevegelse til et objekt under tyngdekraften alene — formler for posisjon, hastighet, banehøyde, rekkjevidde og treffvinkel
tags:
  - Fysikk
  - Engineering
  - Dynamikk
  - Kinematikk
type: notat
aliases:
search_words: projektil, prosjektil, ballistikk, kast, skrå utskyting, kasteparabel, bane, rekkjevidde, rekkevidde, maks høgde, fritt fall, kasteteknikk
updated: 2026-05-26
---

# Prosjektilbevegelse

Et **prosjektil** er et objekt som etter utløsning kun påvirkes av tyngdekraften (vi ser bort fra luftmotstand). Bevegelsen kan dekomponeres til:

- **Konstant horisontal hastighet** — ingen kraft i x-retning
- **Konstant vertikal akselerasjon** $g = 9{,}81 \ m/s^2$ rettet nedover

Resultatet er en **parabel** — den klassiske kasteparabelen.

---

## Antagelser

- Luftmotstand neglisjeres.
- Tyngdens akselerasjon $g$ er konstant gjennom hele banen.
- Jorda er flat (gyldig for normale kast-avstander).
- Coriolis-effekt fra jordrotasjonen er ubetydelig.

For lange artilleribaner, fallskjermer eller objekter med stor overflate/masse-forhold må luftmotstand legges til, og analytiske formler erstattes av numerisk integrasjon.

---

## Koordinatsystem

Standard valg:

- $x$-aksen horisontalt i kastets retning
- $y$-aksen vertikalt oppover
- Origo i utskytingspunktet (kan flyttes ved behov)

---

## Akselerasjon

$$
a_x = 0, \qquad a_y = -g
$$

---

## Hastighet

Initialhastighet $v_0$ med utskytingsvinkel $\alpha$ over horisontalen gir komponenter:

$$
v_{x0} = v_0 \cos \alpha, \qquad v_{y0} = v_0 \sin \alpha
$$

Som funksjon av tid:

$$
v_x(t) = v_0 \cos \alpha
$$

$$
v_y(t) = v_0 \sin \alpha - g t
$$

Total fart:

$$
v(t) = \sqrt{v_x^2 + v_y^2}
$$

---

## Posisjon

$$
x(t) = v_0 \cos \alpha \cdot t
$$

$$
y(t) = y_0 + v_0 \sin \alpha \cdot t - \tfrac{1}{2} g t^2
$$

---

## Baneligning (uten tid)

Eliminerer man $t$ fra de to posisjonsligningene får man banen som funksjon av $x$:

$$
y(x) = y_0 + x \tan \alpha - \dfrac{g x^2}{2 v_0^2 \cos^2 \alpha}
$$

Dette er en **parabel** — uavhengig av $v_0$ og $\alpha$ vil banen alltid være parabelformet (så lenge antakelsene over holder).

---

## Nyttige avledede formler

> Forutsetning for formlene under: Utskyting fra og landing i **samme høyde** ($y_0 = y_\text{slutt}$).

### Maksimal høyde (over utskytingspunktet)

$$
h_\text{max} = \dfrac{(v_0 \sin \alpha)^2}{2 g}
$$

Nås ved $t = v_0 \sin \alpha / g$.

### Flytid (tid i lufta)

$$
t_\text{flytid} = \dfrac{2 v_0 \sin \alpha}{g}
$$

### Rekkjevidde (horisontal avstand)

$$
R = \dfrac{v_0^2 \sin(2\alpha)}{g}
$$

Maksimal rekkjevidde får man ved $\alpha = 45°$, der $\sin(2\alpha) = 1$:

$$
R_\text{maks} = \dfrac{v_0^2}{g}
$$

### Symmetri

To kastevinkler $\alpha$ og $(90° - \alpha)$ gir samme rekkjevidde — for eksempel $30°$ og $60°$. Den lave vinkelen gir kortere flytid og flatere bane; den høye gir lengre flytid og høyere bane.

---

## Variabler

$v_0 =$ Utskytingsfart [$m/s$]
$\alpha =$ Utskytingsvinkel over horisontalen [$rad$ eller $°$]
$g =$ Tyngdens akselerasjon, $9{,}81 \ m/s^2$
$y_0 =$ Utskytingshøyde over referansenivå [$m$]
$t =$ Tid etter utskyting [$s$]
$x, y =$ Horisontal og vertikal posisjon ved tid $t$ [$m$]
$v_x, v_y =$ Horisontal og vertikal hastighet ved tid $t$ [$m/s$]
$h_\text{max} =$ Maksimal høyde over utskytingspunktet [$m$]
$R =$ Rekkjevidde (horisontal avstand til landing) [$m$]
$t_\text{flytid} =$ Total tid i lufta [$s$]

---

## Utledning av baneligningen

Fra $x$-ligningen:

$x = v_0 \cos \alpha \cdot t \quad \Rightarrow \quad t = \dfrac{x}{v_0 \cos \alpha}$

Setter dette inn i $y$-ligningen (med $y_0 = 0$ for enkelhets skyld):

$y = v_0 \sin \alpha \cdot \dfrac{x}{v_0 \cos \alpha} - \tfrac{1}{2} g \left(\dfrac{x}{v_0 \cos \alpha}\right)^2$

$y = x \tan \alpha - \dfrac{g x^2}{2 v_0^2 \cos^2 \alpha}$

---

## Utledning av rekkjevidde

Ved landing (samme høyde): $y = 0$.

$0 = x \tan \alpha - \dfrac{g x^2}{2 v_0^2 \cos^2 \alpha}$

$x \left( \tan \alpha - \dfrac{g x}{2 v_0^2 \cos^2 \alpha} \right) = 0$

Den ikke-trivielle løsningen ($x \neq 0$):

$x = \dfrac{2 v_0^2 \sin \alpha \cos \alpha}{g} = \dfrac{v_0^2 \sin(2\alpha)}{g}$

(brukte identiteten $2 \sin\alpha \cos\alpha = \sin 2\alpha$).

---

## Når landing er på annen høyde

Hvis prosjektilet lander på høyde $y_\text{slutt} \neq y_0$ (kastet fra et tak, opp en skråning, e.l.) kan man **ikke** bruke shortcut-formlene over for rekkjevidde og flytid. Da må man:

**Metode 1 — Tidsbasert:** Finn flytida $t$ fra den kvadratiske ligningen

$$
y_\text{slutt} = y_0 + v_0 \sin \alpha \cdot t - \tfrac{1}{2} g t^2
$$

og sett deretter inn i $x(t) = v_0 \cos \alpha \cdot t$ for å få rekkjevidden.

**Metode 2 — Direkte i baneligningen:** Løs

$$
y_\text{slutt} = y_0 + x \tan \alpha - \dfrac{g x^2}{2 v_0^2 \cos^2 \alpha}
$$

for $x$. Velg den positive løsningen i kastretningen.

---

## Eksempel 1 — Klassisk skrå utskyting

En ball kastes med $v_0 = 20 \ m/s$ og vinkel $\alpha = 30°$ over horisontalen (lik utskytings- og landingshøyde). Finn rekkjevidde, maks høyde og flytid.

Trigverdier: $\sin 30° = 0{,}5$, $\cos 30° \approx 0{,}866$, $\sin 60° \approx 0{,}866$.

**Rekkjevidde:**
$R = \dfrac{v_0^2 \sin(2\alpha)}{g} = \dfrac{20^2 \cdot 0{,}866}{9{,}81} \approx 35{,}3 \ m$

**Maks høyde:**
$h_\text{max} = \dfrac{(v_0 \sin \alpha)^2}{2g} = \dfrac{(20 \cdot 0{,}5)^2}{2 \cdot 9{,}81} \approx 5{,}1 \ m$

**Flytid:**
$t_\text{flytid} = \dfrac{2 v_0 \sin \alpha}{g} = \dfrac{2 \cdot 20 \cdot 0{,}5}{9{,}81} \approx 2{,}04 \ s$

---

## Eksempel 2 — Kast fra høyde

En stein blir kastet horisontalt ($\alpha = 0$) fra et 30 m høyt stup med $v_0 = 10 \ m/s$. Hvor langt ute treffer den vannet?

$v_x = v_0 = 10 \ m/s, \quad v_{y0} = 0$

Finn flytida fra $y(t) = 0$ med $y_0 = 30$:

$0 = 30 - \tfrac{1}{2} \cdot 9{,}81 \cdot t^2 \quad \Rightarrow \quad t = \sqrt{60 / 9{,}81} \approx 2{,}47 \ s$

Horisontal avstand:

$x = v_x \cdot t = 10 \cdot 2{,}47 \approx 24{,}7 \ m$

---

## Eksempel 3 — Treffvinkel ved landing

Bruk samme data som eksempel 1 ($v_0 = 20 \ m/s$, $\alpha = 30°$). I hvilken vinkel treffer ballen bakken?

Ved landing (samme høyde) er $|v_y| = v_{y0}$ pga. symmetri, og $v_x$ er uendret.

$v_x = 20 \cos 30° \approx 17{,}32 \ m/s$
$v_y = -20 \sin 30° = -10 \ m/s$ (nedover)

Treffvinkel under horisontalen:

$\theta = \arctan\!\left(\dfrac{|v_y|}{v_x}\right) = \arctan\!\left(\dfrac{10}{17{,}32}\right) \approx 30°$

Lik utskytingsvinkelen — som forventet av symmetrien.

---

## Sjekkliste — vanlige feil

- **Vinkelenhet:** Sørg for at kalkulatoren står i grader når du regner $\sin 30°$ — eller bruk radianer ($30° = \pi/6$) konsekvent.
- **Fortegn på $g$:** I formlene over er $g$ et positivt tall ($9{,}81$) og fortegnet håndteres eksplisitt (`-g` i $a_y$). Ikke putt inn $g = -9{,}81$ i tillegg.
- **Referansenivå for $y$:** Vær konsistent — enten origo i utskytingspunktet ($y_0 = 0$) eller på bakken ($y_0 = h$). Ikke bland.
- **Shortcut-formlene** for $R, h_\text{max}, t_\text{flytid}$ forutsetter lik utskytings- og landingshøyde. Hvis ikke — bruk baneligningen direkte.
- **Luftmotstand:** For lette objekter, høy fart eller lange baner reduserer luftmotstand rekkjevidden betydelig (kan halveres for en pingpongball). Formlene gir en øvre grense.

---

## Relatert
- [Bevegelseslikninger ved konstant akselerasjon](../formulas/konstant-akselerasjon.md)
- [Newtons andre lov](../formulas/newtons-andre-lov.md)
- [Sentripetal akselerasjon](../formulas/sentripetal-akselerasjon.md)
- [Kinetisk energi](../formulas/kinetisk-energi.md)
- [Trigonometriske identiteter](../reference/trigonometriske_identiteter.md)
