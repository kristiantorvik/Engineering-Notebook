---
title: Arealmoment, Treghetsmoment og Motstandsmoment
summary: Oversikt over arealmoment 2. orden, motstandsmoment, polart arealmoment, polart motstandsmoment og massetreghetsmoment — kva dei betyr, kva dei brukes til, og korleis ein reknar dei ut.
tags:
  - Styrkeberegning
  - Engineering
  - Torsjon
  - Dynamikk
type: notat
aliases:
search_words: treghetsmoment, motstandsmoment, arealmoment, polart, torsjon, vridning, aksel, massetreghetsmoment, vinkelakselerasjon, bøying, nedbøying, second moment of area, section modulus, moment of inertia, polar moment, mass moment of inertia, area moment of inertia, polar section modulus
updated: 2026-03-31
---

# Arealmoment, treghetsmoment og motstandsmoment

Det finst fleire storleikar med liknande namn og symbol som lett kan forvekslast — særleg når ein finn formlar på nett der omgrepa ofte er blanda saman. Dette notatet gir ei oversikt over alle dei vanlege typane, kva dei betyr, og korr dei blir brukt og formler på vanlige tversnitt.

---

---

## Oversikt

| Norsk navn | Engelsk navn | Symbol | Enhet | Fysisk tyding | Typisk bruk |
| --- | --- | --- | --- | --- | --- |
| [Arealmoment 2. orden / Treghetsmoment](#arealmoment-2-orden) | Second moment of area / Area moment of inertia | $\large I$ | $\large mm^4$ , $m^4$ | Beskriv kor stivt eit tverrsnitt er mot bøying, avhengig av kor langt frå nøytralaksen arealet ligg | Nedbøying og bøyespenning i bjelkar og profiler |
| [Motstandsmoment](#motstandsmoment) | Section modulus / Elastic section modulus | $\large W$ (også $Z$ eller $W_{el}$ i andre standardar) | $\large mm^3$ , $m^3$ | Forhald mellom treghetsmomentet og avstanden til ytterfiber — gir direkte samanheng mellom moment og spenning | Bøyespenning: $\sigma = M/W$ |
| [Polart arealmoment](#polart-arealmoment) | Polar second moment of area / Polar moment of inertia (of area) | $\large J$ eller $I_p$ | $\large mm^4$ , $m^4$ | Beskriv kor stivt eit tverrsnitt er mot vridning | Vridningsvinkel og skjærspenning i akslar: $\varphi = TL/GJ$ |
| [Polart motstandsmoment](#polart-motstandsmoment) | Polar section modulus | $\large W_t$ | $\large mm^3$ , $m^3$ | Forhald mellom polart arealmoment og ytre radius — gir samanheng mellom dreiemoment og skjærspenning | Torsjonsskjærspenning: $\tau = T/W_t$ |
| [Massetreghetsmoment](#massetreghetsmoment) | Mass moment of inertia / Rotational inertia | $\large I$ eller $J$ | $\large kg \cdot m^2$ | Beskriv kor mykje eit fysisk legeme motstår vinkelakselerasjon | Rotasjonsdynamikk: $T = I \cdot \alpha$ |

> **Merk:** $I$ brukast som symbol både for arealmoment (Enhet: $m^4$) og massetreghetsmoment (Enhet: $kg \cdot m^2$).

---

---

## Arealmoment 2. orden 
*Omtalt som andre arealmoment eller treghetsmoment*
*(Second moment of area)*

Treghetsmomentet $I$ beskriv **kor stivt eit tverrsnitt er mot bøying**. Jo meir areal som ligg langt frå nøytralaksen, jo høgare $I$ — og jo stivare er konstruksjonen. Det er difor I-bjelkar og rør er mykje stivare enn massive stenger med same masse.

Brukast i:
- Nedbøyingsformlar (f.eks. $\delta = FL^3 / 48EI$ for midtlast på bjelke)
- Bøyespenningsformlar: $\sigma = M \cdot c / I$

<h3>Integralform</h3>

$$I = \int y^2 \, dA$$

der $y$ = avstand frå nøytralaksen, $A$ = tverrsnittareal.

<h3>Formlar for vanlege tverrsnitt</h3>

<div class="nb-illustration-table" markdown="1">
| Beskriving | Formel | |
| --- | --- | --- |
| **Rektangel** — akse gjennom senter (nøytralaksen) | $\large I_x = \dfrac{b h^3}{12}$ | ![[Moment_of_area_of_a_rectangle_through_the_centroid.png]] |
| **Rektangel** — akse gjennom base | $\large I_x = \dfrac{b h^3}{3}$ | ![[Moment_of_area_of_a_rectangle_through_the_base.png]] |
| **Massiv aksel** — radius $r$ | $\large I_x = I_y = \dfrac{\pi r^4}{4}$ | ![[Moment_of_area_of_a_circle.png]] |
| **Rør** — indre radius $r_1$, ytre radius $r_2$ | $\large I_x = I_y = \dfrac{\pi (r_2^4 - r_1^4)}{4}$ | ![[Moment_of_area_of_an_annulus.png]] |
| **Ellipse** — halvaksar $a$ (x-retning) og $b$ (y-retning) | $\large I_x = \dfrac{\pi a b^3}{4}$ , $\quad I_y = \dfrac{\pi a^3 b}{4}$ | ![[Moment_of_area_of_an_ellipse.png]] |
| **Sirkelsektor** — radius $r$, halvvinkel $\theta$ — akse gjennom sentrum | $\large I_x = \dfrac{r^4}{8}(\theta - \sin\theta)$ | ![[Moment_of_area_of_a_circular_sector.png]] |
| **Trekant** — akse gjennom tyngdepunkt | $\large I_x = \dfrac{b h^3}{36}$ , $I_y = \dfrac{b^3h-b^2ha + bha^2}{36}$ | ![[Moment_of_inertia_on_a_triangle_through_centroide_with_dimension_a.png]] |
| **Trekant** — akse gjennom base | $\large I_x = \dfrac{b h^3}{12}$ , $I_y = \dfrac{b^3h + b^2ha + bha^2}{12}$ | ![[Moment_of_inertia_on_a_traingle_through_the_base_with_dimension_a.png]] |
| **Rektangulært hulprofil** — ytre $b \times h$, indre $b_1 \times h_1$ | $\large I_x = \dfrac{b h^3 - b_1 h_1^3}{12}$ | ![[Moment_of_area_of_a_hollow_rectangle.png]] |
</div>

<h3>Parallellakseteoremet (Steiners sats)</h3>

Når ein kjenner $I_c$ rundt senteraksen til eit delareal, kan ein finne treghetsmomentet rundt ein parallell akse:

$$I = I_c + A \cdot d^2$$

der $A$ = areal, $d$ = avstand mellom aksene.

Brukast ved samanstilte tverrsnitt (t.d. sveiste profiler, flenser og ribber).

---

---

## Motstandsmoment
*(Section modulus)*

Motstandsmomentet $W$ er ikkje ein sjølvstendig eigenskap, men eit nyttig forholdstall utleda frå $I$. Det gir direkte sammenheng mellom påført bøyemoment og bøyespenning.

$$\sigma = \frac{M}{W}$$

<h3>Definisjon</h3>

$$W = \frac{I}{c}$$

der $c$ = avstand frå nøytralaksen til ytterfiber (der spenningen er størst).

<h3>Formlar for vanlege tverrsnitt</h3>

<div class="nb-illustration-table" markdown="1">
| Beskriving | Formel | |
| --- | --- | --- |
| **Rektangel** — akse gjennom senter | $\large W_x = \dfrac{b h^2}{6}$ | ![[Moment_of_area_of_a_rectangle_through_the_centroid.png]] |
| **Massiv aksel** — radius $r$ | $\large W_x = \dfrac{\pi r^3}{4}$ | ![[Moment_of_area_of_a_circle.png]] |
| **Rør** — indre $r_1$, ytre $r_2$ | $\large W_x = \dfrac{\pi (r_2^4 - r_1^4)}{4 r_2}$ | ![[Moment_of_area_of_an_annulus.png]] |
| **Rektangulært hulprofil** — ytre $b \times h$, indre $b_1 \times h_1$ | $\large I_x = \dfrac{b h^2 - b_1 h_1^2}{6}$ | ![[Moment_of_area_of_a_hollow_rectangle.png]] |
</div>

> For samanstilte tverrsnitt: Bruk Steiners sats til å finne $I$ for heile tverrsnittet, og finn deretter $c$ som avstand frå nøytralaksen til ytterfiber. Så er $W = I/c$.

---

---

## Polart arealmoment
*(Polar second moment of area)*

Det polare arealemomentet $J$ beskriv **kor stivt eit tverrsnitt er mot vridning (torsjon)**. Det er summen av arealmomentane om begge aksane i planet.

Brukast i:
- Vridningsvinkel: $\varphi = \dfrac{T L}{G J}$
- Skjærspenning frå torsjon: $\tau = \dfrac{T \cdot r}{J}$

<h3>Integralform</h3>

$$J = \int r^2 \, dA = I_x + I_y$$

der $r$ = avstand frå tverrsnittet sitt dreiingssenter.

<h3>Formlar for vanlege tverrsnitt</h3>

<div class="nb-illustration-table" markdown="1">
| Beskriving | Formel | |
| --- | --- | --- |
| **Massiv sksel** — radius $r$ | $\large J = \dfrac{\pi r^4}{2}$ | ![[treghetsmoment_aksel_sylinderakse.png]] |
| **Rør** — indre radius $r_1$, ytre radius $r_2$ | $\large J = \dfrac{\pi (r_2^4 - r_1^4)}{2}$ | ![[treghetsmoment_sylinder.png]] |
| **Rektangel** — breidde $b$, høgde $a$ | $\large J = \dfrac{b a (b^2 + a^2)}{12}$ | ![[treghetsmoment_plate.png]] |
</div>

<h3>Parallellakseteoremet</h3>

$$J = J_c + A \cdot d^2$$

same prinsipp som for $I$.

---

---

## Polart motstandsmoment
*(Polar section modulus)*

Det polare motstandsmomentet $W_t$ er utleda frå $J$ og gir direkte samanheng mellom dreiemoment og maksimal torsjonsskjærspenning.

$$\tau_{max} = \frac{T}{W_t}$$

<h3>Definisjon</h3>

$$W_t = \frac{J}{r}$$

der $r$ = avstand frå senter til ytterfiber (største $r$ i tverrsnittet).

<h3>Formlar for vanlege tverrsnitt</h3>

<div class="nb-illustration-table" markdown="1">
| Beskriving | Formel | |
| --- | --- | --- |
| **Massiv aksel** — radius $r$ | $\large W_t = \dfrac{\pi r^3}{2}$ | ![[treghetsmoment_aksel_sylinderakse.png]] |
| **Rør** — indre $r_1$, ytre $r_2$ | $\large W_t = \dfrac{\pi (r_2^4 - r_1^4)}{2 r_2}$ | ![[treghetsmoment_sylinder.png]] |
| **Rektangel** — breidde $b$, høgde $h$ | $\large W_t = \dfrac{b h \sqrt{b^2 + h^2}}{6}$ | ![[treghetsmoment_plate.png]] |
</div>

> **NB — viktig for rektangel:** For eit rektangulært tverrsnitt under torsjon oppstår den faktiske maksimale skjærspenning **ikkje** i hjørna (der $r$ er størst), men i midten av den lengste sida. Den geometriske formelen ovanfor gir difor eit noko optimistisk (for lågt) spenningsestimat. For presis berekning av rektangulære tverrsnitt under torsjon bør ein bruke Saint-Venants torsjonsteori og tabellverdiar.

---

---

## Massetreghetsmoment
*(Mass moment of inertia)*

Massetreghetsmomentet $I$ beskriv **kor mykje eit legeme motstår vinkelakselerasjon** — det rotasjonsmessige motstykket til masse i lineær dynamikk.

$$T = I \cdot \alpha$$

der $T$ = dreiemoment (Nm), $\alpha$ = vinkelakselerasjon (rad/s²).

Dette er **ikkje** eit arealmoment — det har eining kg·m² og er ein fysisk eigenskap av legemet, ikkje berre tverrsnittet.

<h3>Integralform</h3>

$$I = \int r^2 \, dm$$

der $r$ = avstand frå rotasjonsaksen, $m$ = masse.

<h3>Formlar for vanlege geometriar</h3>

<div class="nb-illustration-table" markdown="1">
| Beskriving | Formel | |
| --- | --- | --- |
| **Massiv aksel** — rundt eigen symmetriakse | $\large I = \dfrac{1}{2} m R^2$ | ![[treghetsmoment_aksel_sylinderakse.png]] |
| **Massiv alseø** — akse vinkelrett gjennom senter | $\large I = \dfrac{m(3R^2 + L^2)}{12}$ | ![[treghetsmoment_aksel_vinkelrett.png]] |
| **Rør** — indre radius $R_1$, ytre $R_2$ — rundt eigen symmetriakse | $\large I = \dfrac{1}{2} m (R_1^2 + R_2^2)$ | ![[treghetsmoment_sylinder.png]] |
| **Tynn ring** — rundt eigen symmetriakse | $\large I = m R^2$ | ![[treghetsmoment_ring_sylinderakse.png]] |
| **Tynn ring** — akse vinkelrett gjennom senter (diameter) | $\large I = \dfrac{1}{2} m R^2$ | ![[treghetsmoment_ring_vinkelrett.png]] |
| **Tynn stang** — akse vinkelrett gjennom senter | $\large I = \dfrac{m L^2}{12}$ | ![[treghetsmoment_linje_vinkelrett.png]] |
| **Tynn stang** — akse vinkelrett gjennom eine enden | $\large I = \dfrac{m L^2}{3}$ | ![[treghetsmoment_linje_ende.png]] |
| **Massiv kule** — akse gjennom senter | $\large I = \dfrac{2}{5} m R^2$ | ![[treghetsmoment_kule.png]] |
| **Hult kuleskall** — akse gjennom senter | $\large I = \dfrac{2}{3} m R^2$ | ![[treghetsmoment_kule_skall.png]] |
| **Rektangulær plate** — akse gjennom senter, vinkelrett på plata | $\large I = \dfrac{m(a^2 + b^2)}{12}$ | ![[treghetsmoment_plate.png]] |
</div>

<h3>Parallellakseteoremet</h3>

$$I = I_{cm} + m \cdot d^2$$

der $I_{cm}$ = massetreghetsmoment om senteraksen gjennom tyngdepunktet, $d$ = avstand til den nye aksen.

---

*Noken illustrasjonar er henta frå [Wikipedia — List of second moments of area](https://en.wikipedia.org/wiki/List_of_second_moments_of_area) og er lisensierte under [Creative Commons Attribution-ShareAlike](https://creativecommons.org/licenses/by-sa/4.0/).*
