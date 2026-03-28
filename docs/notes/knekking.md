---
title: Knekking / Buckling
summary: Formler og berekning av søyler i kompressjon. Knekking / Buckling 
tags:
  - Styrkeberegning
  - Engineering
type: notat
search_words: 
updated: 2026-03-22
---

# Knekking
## Buckling

Korte stutte element vil ved aksielt trykk svikte ved knusing eller plastisk flyt. Lange tynne/slanke element vil svikte ved knekking, en utbøying.
Knekkemostandigheten vil vera høg for korte og vide og massive elementer som har høg bøyestivhet og lav for lange slanke element med lav bøyestivhet.

### Ulike skademodeller
Fordi noken søyler svikter elastisk (knekking) og noken søyler svikter plastisk (stuking) trenger en forskjellige beregningsmetodar og sikkerhetsvurdering

##### Elastisk knekking:
- Skjer før enn får plastisk flyt
- Skjer på grunn av ustabil konstruksjon og ikkje materialsvikt
- Beregnes med Euler-formelen

##### Plastisk knekking:
- Skjer når materialer er stivt nok til å motstå bøying, og materialet stukes eller knuses når det når flytegrensa
- Svikt på grunn av materialets styrke
- Beregnes med Tetmaier eller Rankine


## Slankhet $\lambda$
Slankhetstall er en størrelse som seier noke om kor stabil ei søyla er under trykkbelastning. Slankhetstallet kan brukes til å vurdere om søyla vil svikte plastisk eller elastisk, og dermed hvilken berekningsmetode som skal brukast og blir brukt i berekningar. Tommelfinger regelen  (Ikkje like nøaktig som normalisert slankhet) for valg av berekningsmetode.

| Material     | Euler                   | Rankine                | Tetmajer         |
| ------------ | ----------------------- | ---------------------- | ---------------- |
| Stål         | $\lambda_g > 100-120$   | $60 < \lambda_g < 120$ | $\lambda_g < 60$ |
| Alumium      | $\lambda_g > 80-100$    |                        |                  |
| Betong       | $\lambda_g > 50-70$     | $20 < \lambda_g < 50$  | $\lambda_g < 20$ |
| Tre (Gran)   | $\lambda_g > 80-100$    | $50 < \lambda_g < 100$ | $\lambda_g < 50$ |


**Geometrisk slankhet** forteller noe om den geometriske stabliteten og er gitt ved:
$L_k  =$ Stavens effektive lengde er lengden ganget med korreksjonsfaktor for innfestning
$i =$ Treghetsradius
$I =$ Treghetsmoment (andre arealmoment)
$\lambda_g =$ Geometrisk slankhetstall
$$\text{Geometrisk slankhet:}\quad \Large \boxed{\lambda_g = \dfrac{L_k}{i}}$$

**Normalisert slankhet** er en "forbedret" slankhetsmodell som blir brukt i berekninger i henhold til Eurokode. Den tar hensyn til materialets egenskaper og gir et bedre bilde på kor nærme søylen er å nå flytegrensen før knekking oppstår. Normalisert slankhet får ofte notasjon som $\lambda_{norm} \ , \:  \overline{\lambda} \ , \: \lambda'$
$L_k  =$ Stavens effektive lengde er lengden ganget med korreksjonsfaktor for innfestning
$i =$ Treghetsradius
$I =$ Treghetsmoment (andre arealmoment)
$E =$ E-modulen til materialet
$\sigma_f =$ Flytegrensen
$\lambda_g =$ Geometrisk slankhet

$$\text{Normalisert slankhet:}\quad \Large \boxed{\lambda' = \dfrac{\lambda_g}{\pi} \ \sqrt{\dfrac{\sigma_f}{E}} = \dfrac{L_k}{\pi \sqrt{\dfrac{I}{A}}} \ \sqrt{\dfrac{\sigma_f}{E}}}$$

For normalisert slankhet vil $\lambda'$ vera omtrent 1 ved overgang fra plastisk til elastisk brudd.



### Treghetsradius
blir og kalt radius of gyration, og er et geometrisk mål og beskriver hvordan arealet er fordelt rundt nøytralaksen under bøying. **NB** om staven ikkje er rotasjonssymetrisk må en berekna den for den svakaste aksen.
$i = \sqrt{\dfrac{I}{A}} =$ Treghetsradius

### Treghetsmoment
og kalt andre arealmoment er integralet av avstanden fra en akse. Altså summen av areal gangen med avstanden fra aksen.
$I_x = \int y^2 dA$


___
## Elastisk knekking
Elastisk knekking skyldes fordi staven/søylen ikkje er stiv nok for bøyemoment til å ta lasta. Derfor bøyer staven seg og eksentrisiteten skaper et bøyemoment i staven som øker spenningen og deformasjonen og dette skaper en positiv tilbakekobling og staven bøyes til den når flytegrensen ok knekker.
Dette bøyemomentet er $M = P \cdot e$
$M =$ Bøyemomentet
$P =$ Den påførte aksiale trykkraften
$e =$ Eksentrisitet (Avstand fra midtlinjen)

Randbetingelsene har stor påvirkning, om staven er låst for rotasjon i endene eller ikkje.
En finner korreksjonsfaktoren $K$ fra tabellen som en bruker til å finne effektiv lengde $L_K = L \cdot K$ 
![[Knekking Eulers effektive lengde.png]]

En bereknar kritisk kritisk knekklast $P_{c\ r}$ med eulers formel for knekking
$I =$ Treghetsmoment (andre arealmoment)
$E =$ E-modulen til materialet
$L =$ Lengden på staven
$K =$ Effektiv lengdefaktor

$$\large \text{Eulers kritisk last}\quad \boxed{P_{c \ r} = \dfrac{\pi^2 \ EI}{(KL)^2}}$$
___

## Plastisk knekking (Tetmajer)
Tetmajer er en empirisk formel for plastisk knekking. Kan og bli kalt Engessers formel?
Den kombinerer den teoretisk euler knekkspenningen med en empirisk konstant $\gamma$ 

$$\large \text{Tetmajers kritisk spenning}\quad \boxed{\sigma_{c \ r} = \dfrac{\sigma_f}{\gamma + \sqrt{\gamma^2 + \dfrac{4 \pi^2 E}{\lambda_g^2 \; \sigma_f}}}}$$

$\gamma$ velges utifra empiriske verdier utifra material

| Material   | E-modul (MPa)   | Flytegrense $\sigma_f$ (MPa) | $\gamma$  |
| ---------- | --------------- | ---------------------------- | --------- |
| Stål       | 210 000         | 235 - 355                    | 1.0       |
| Aluminium  | 70 000          | 100 - 300                    | 1.2 - 1.5 |
| Koppar     | 110 000         | 70 - 200                     | 1.3 - 1.6 |
| Tre (fura) | 10 000 - 14 000 | 30 - 50                      | 1.8 - 2.2 |
| Betong     | 30 000          | 20 - 40 (Trykk)              | 2.0 - 2.5 |
| Messing    | 100 000         | 150 - 300                    | 1.3 - 1.6 |
| Titan      | 110 000         | 800 - 1000                   | 1.0 - 1.2 |

___

## Overgangstilfeller plastisk/elsastisk (Rankine)
Empirisk formel for når søylen ligger en plass mellom plastisk og elsastisk knekking. 

$$\large \text{Tetmajers kritisk spenning}\quad \boxed{\sigma_{c \ r} = \dfrac{\sigma_f}{1 + \dfrac{\lambda^2 \ \sigma_f}{\pi^2 E}}}$$

[text](knekking.md)**OBS ikkje samme konstanter som tetmajer**
