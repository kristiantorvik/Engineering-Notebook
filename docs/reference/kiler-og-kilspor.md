---
title: Kiler og kilspor — DIN 6885
summary: Mål og toleranser for passkiler og kilspor (DIN 6885-1), lav form, skivekiler (DIN 6888), pasninger, tegningsmål og kontroll av flatetrykk. Søkeord passfeder, keyway, parallel key, feather key, kilespor, not
tags:
  - Engineering
  - Maskinelementer
  - Toleranser
type: referanse
aliases: [passkile, passfeder, kilespor, keyway, parallel key, feather key, woodruff, skivekile]
updated: 2026-11-15
---

# Kiler og kilspor

Passkile (ty. *Passfeder*, eng. *parallel key / feather key*) overfører moment mellom aksel og nav gjennom **flankene**. Kilen skal ha klaring i toppen (ryggklaring), og navet må derfor låses aksialt på annen måte.

## Oversikt over standarder

| Standard | Innhold | Merknad |
|---|---|---|
| DIN 6885-1 | Passkiler og kilspor, høy form | Normalvalget. Tilsvarer ISO 773 (tilbaketrukket) og BS 4235-1 |
| DIN 6885-2 | Høy form for verktøymaskiner | Dypere akselspor, grunnere navspor. Samme tverrsnitt b × h |
| DIN 6885-3 | Lav form | For tynne nav / hule aksler. Tilsvarer ISO 2491 |
| DIN 6888 | Skivekiler (Woodruff) | Tilsvarer ISO 3912 |
| DIN 6886 / 6887 | Drivkiler / nesekiler, helning 1:100 | Tilsvarer ISO 774 |
| DIN 6880 | Blankt kilestål (stangmateriale) | Emne for å lage egne kiler |
| DIN 6892 | Beregning av passkileforbindelser | Utgave 2012-08 er brukt her. Ny utgave 2025-10 |

## Symboler og tegningsmål

<div style="max-width:440px">
<svg viewBox="0 0 440 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tverrsnitt av aksel, nav og passkile med målene b, h, t1, t2, d minus t1 og d pluss t2" style="width:100%;height:auto;color:var(--md-default-fg-color);font-family:inherit;font-size:13px">
  <g fill="none" stroke="currentColor" stroke-width="1.5">
    <!-- nav (ytre) -->
    <circle cx="200" cy="180" r="135" stroke-dasharray="6 4" opacity="0.6"/>
    <!-- aksel med spor -->
    <path d="M175 93.5 A90 90 0 1 0 225 93.5 L225 118 L175 118 Z"/>
    <!-- navspor -->
    <path d="M175 93.5 L175 66 L225 66 L225 93.5"/>
    <!-- kile -->
    <rect x="175" y="72" width="50" height="46" fill="currentColor" fill-opacity="0.18"/>
  </g>
  <g stroke="currentColor" stroke-width="1" fill="none" opacity="0.85">
    <!-- senterlinjer -->
    <path d="M200 30 V320 M50 180 H350" stroke-dasharray="12 3 2 3" opacity="0.5"/>
    <!-- b -->
    <path d="M175 62 V40 M225 62 V40 M175 46 H225"/>
    <!-- t1 -->
    <path d="M229 90 H300 M229 118 H300 M292 90 V118"/>
    <!-- t2 -->
    <path d="M229 66 H330 M322 66 V90 M300 90 H330"/>
    <!-- d - t1 -->
    <path d="M171 118 H40 M200 270 H40 M48 118 V270"/>
    <!-- d + t2 -->
    <path d="M171 66 H12 M48 270 H12 M20 66 V270"/>
    <!-- h -->
    <path d="M229 72 H262 M254 72 V118"/>
  </g>
  <g fill="currentColor" stroke="none">
    <text x="200" y="38" text-anchor="middle">b</text>
    <text x="297" y="109">t₁</text>
    <text x="327" y="83">t₂</text>
    <text x="259" y="100">h</text>
    <text x="52" y="200">d − t₁</text>
    <text x="24" y="160" transform="rotate(-90 24 160)" text-anchor="middle">d + t₂</text>
    <text x="200" y="230" text-anchor="middle">aksel Ød</text>
    <text x="318" y="290" text-anchor="middle">nav</text>
  </g>
</svg>
</div>

| Symbol | Betydning |
|---|---|
| $d$ | Akseldiameter (= boring i nav) |
| $b$ | Bredde på kile og kilspor |
| $h$ | Høyde på kile |
| $t_1$ | Dybde kilspor i aksel, målt fra akseloverflaten |
| $t_2$ | Dybde kilspor i nav, målt fra boringen |
| $l$ | Lengde på kile |
| $r_1$ | Fas / radius på kilens kanter |
| $r_2$ | Radius i bunnen av kilsporet |

$t_1$ og $t_2$ er vanskelige å måle direkte. På tegning og i produksjon brukes derfor:

- Aksel: $d - t_1$ (måles fra bunnen av sporet til motsatt side av akselen)
- Nav: $d + t_2$ (måles fra bunnen av sporet til motsatt side av boringen)

Toleransen snus for akselmålet: $t_1\,{}^{+0{,}2}_{\;\;0}$ gir $(d - t_1)\,{}^{\;\;0}_{-0{,}2}$. For navet beholdes fortegnet: $(d + t_2)\,{}^{+0{,}2}_{\;\;0}$.

## Passkiler høy form — DIN 6885-1

Kiletverrsnittet velges ut fra akseldiameteren. Alle mål i mm.

| Aksel $d$ over–til | $b \times h$ | $t_1$ aksel | $t_2$ nav (ryggklaring) | $t_2$ nav (overmål) | Tol. $t_1$, $t_2$ | $r_2$ spor maks/min | $r_1$ kile min/maks | Lengde $l$ fra–til |
|---|---|---|---|---|---|---|---|---|
| 6–8 | 2 × 2 | 1,2 | 1,0 | 0,5 | +0,1 / 0 | 0,16 / 0,08 | 0,16 / 0,25 | 6–20 |
| 8–10 | 3 × 3 | 1,8 | 1,4 | 0,9 | +0,1 / 0 | 0,16 / 0,08 | 0,16 / 0,25 | 6–36 |
| 10–12 | 4 × 4 | 2,5 | 1,8 | 1,2 | +0,1 / 0 | 0,16 / 0,08 | 0,16 / 0,25 | 8–45 |
| 12–17 | 5 × 5 | 3,0 | 2,3 | 1,7 | +0,1 / 0 | 0,25 / 0,16 | 0,25 / 0,40 | 10–56 |
| 17–22 | 6 × 6 | 3,5 | 2,8 | 2,2 | +0,1 / 0 | 0,25 / 0,16 | 0,25 / 0,40 | 14–70 |
| 22–30 | 8 × 7 | 4,0 | 3,3 | 2,4 | +0,2 / 0 | 0,25 / 0,16 | 0,25 / 0,40 | 18–90 |
| 30–38 | 10 × 8 | 5,0 | 3,3 | 2,4 | +0,2 / 0 | 0,40 / 0,25 | 0,40 / 0,60 | 22–110 |
| 38–44 | 12 × 8 | 5,0 | 3,3 | 2,4 | +0,2 / 0 | 0,40 / 0,25 | 0,40 / 0,60 | 28–140 |
| 44–50 | 14 × 9 | 5,5 | 3,8 | 2,9 | +0,2 / 0 | 0,40 / 0,25 | 0,40 / 0,60 | 36–160 |
| 50–58 | 16 × 10 | 6,0 | 4,3 | 3,4 | +0,2 / 0 | 0,40 / 0,25 | 0,40 / 0,60 | 45–180 |
| 58–65 | 18 × 11 | 7,0 | 4,4 | 3,4 | +0,2 / 0 | 0,40 / 0,25 | 0,40 / 0,60 | 50–200 |
| 65–75 | 20 × 12 | 7,5 | 4,9 | 3,9 | +0,2 / 0 | 0,60 / 0,40 | 0,60 / 0,80 | 56–220 |
| 75–85 | 22 × 14 | 9,0 | 5,4 | 4,4 | +0,2 / 0 | 0,60 / 0,40 | 0,60 / 0,80 | 63–250 |
| 85–95 | 25 × 14 | 9,0 | 5,4 | 4,4 | +0,2 / 0 | 0,60 / 0,40 | 0,60 / 0,80 | 70–280 |
| 95–110 | 28 × 16 | 10,0 | 6,4 | 5,4 | +0,2 / 0 | 0,60 / 0,40 | 0,60 / 0,80 | 80–320 |
| 110–130 | 32 × 18 | 11,0 | 7,4 | 6,4 | +0,2 / 0 | 0,60 / 0,40 | 0,60 / 0,80 | 90–360 |
| 130–150 | 36 × 20 | 12,0 | 8,4 | 7,1 | +0,3 / 0 | 1,0 / 0,7 | 1,0 / 1,2 | 100–400 |
| 150–170 | 40 × 22 | 13,0 | 9,4 | 8,1 | +0,3 / 0 | 1,0 / 0,7 | 1,0 / 1,2 | 110–400 |
| 170–200 | 45 × 25 | 15,0 | 10,4 | 9,1 | +0,3 / 0 | 1,0 / 0,7 | 1,0 / 1,2 | 125–400 |
| 200–230 | 50 × 28 | 17,0 | 11,4 | 10,1 | +0,3 / 0 | 1,0 / 0,7 | 1,0 / 1,2 | 140–400 |
| 230–260 | 56 × 32 | 20,0 | 12,4 | 11,1 | +0,3 / 0 | 1,6 / 1,2 | 1,6 / 2,0 | 160–400 |
| 260–290 | 63 × 32 | 20,0 | 12,4 | 11,1 | +0,3 / 0 | 1,6 / 1,2 | 1,6 / 2,0 | 180–400 |
| 290–330 | 70 × 36 | 22,0 | 14,4 | 13,1 | +0,3 / 0 | 1,6 / 1,2 | 1,6 / 2,0 | 200–400 |
| 330–380 | 80 × 40 | 25,0 | 15,4 | 14,1 | +0,3 / 0 | 2,5 / 2,0 | 2,5 / 3,0 | 220–400 |
| 380–440 | 90 × 45 | 28,0 | 17,4 | 16,1 | +0,3 / 0 | 2,5 / 2,0 | 2,5 / 3,0 | 250–400 |
| 440–500 | 100 × 50 | 31,0 | 19,5 | 18,1 | +0,3 / 0 | 2,5 / 2,0 | 2,5 / 3,0 | 280–400 |

- **Ryggklaring** er normaltilfellet for passkiler: $t_1 + t_2 > h$, slik at kilen ikke bærer i toppen.
- **Overmål** brukes når kilen skal ligge an i toppen, dvs. navspor for drivkiler (DIN 6886/6887). Ikke bruk denne kolonnen for vanlige passkiler.
- Grensene er «over–til og med»: aksel Ø22 får 6 × 6, aksel Ø22,5 får 8 × 7.
- Mindre tverrsnitt enn tabellen kan brukes dersom styrken er tilstrekkelig. Større tverrsnitt anbefales ikke.
- Kantene på kilen ($r_1$) skal alltid være større enn radien i sporbunnen ($r_2$), ellers bærer kilen på hjørnene.

### Standardlengder

6 – 8 – 10 – 12 – 14 – 16 – 18 – 20 – 22 – 25 – 28 – 32 – 36 – 40 – 45 – 50 – 56 – 63 – 70 – 80 – 90 – 100 – 110 – 125 – 140 – 160 – 180 – 200 – 220 – 250 – 280 – 320 – 360 – 400

| Lengde $l$ | Toleranse kile | Toleranse kilspor |
|---|---|---|
| til 28 | 0 / −0,2 | +0,2 / 0 |
| over 28 til 80 | 0 / −0,3 | +0,3 / 0 |
| over 80 | 0 / −0,5 | +0,5 / 0 |

### Former

| Form | Utførelse |
|---|---|
| A | Runde ender. Ligger i endefrest spor (pinnefres) |
| B | Rette ender. Brukes i gjennomgående spor eller spor frest med skivefres |
| AB | Én rund og én rett ende (ikke i standarden, men lagerføres) |
| C / D | Som A / B, med hull for én festeskrue (fra 8 × 7) |
| E / F | Som A / B, med hull for to festeskruer, fra 12 × 8 også gjenget hull for avdrager |
| G / H | Rette ender med skråfas og én / to festeskruer |
| J | Rette ender med skråfas og hull for spennstift |

Betegnelse: **Passkile DIN 6885 – A 16 × 10 × 80** (form, $b \times h \times l$).

## Toleranser og pasninger

### Kilen

| Mål | Toleranse |
|---|---|
| Bredde $b$ | h9 |
| Høyde $h$ | h9 for kvadratiske tverrsnitt, h11 for rektangulære |
| Materiale | Blankt kilestål C45+C (DIN 6880), strekkfasthet ca. 590 N/mm² eller høyere. Rustfritt: 1.4571 / 1.4401 |

### Sporbredde — valg av pasning

| Pasning | Akselspor | Navspor | Bruk |
|---|---|---|---|
| Fast | P9 | P9 | Vekslende moment, støt, reversering. Kilen sitter fast i begge deler |
| Normal (lett) | N9 | JS9 | Vanligste valg for faste nav. Kilen sitter i akselen, navet kan trekkes av |
| Glidende | H9 | D10 | Nav som skal forskyves aksialt på akselen under drift (kilen skrus da fast i akselen) |

Par akselspor og navspor fra samme rad. Sporene som skal brotsjes kan med fordel tolereres ett trinn finere (P8 / N8 / JS8).

### Grenseavvik for bredde $b$ (mm)

| $b$ | Kile h9 | H9 | N9 | P9 | D10 | JS9 |
|---|---|---|---|---|---|---|
| 2–3 | 0 / −0,025 | +0,025 / 0 | −0,004 / −0,029 | −0,006 / −0,031 | +0,060 / +0,020 | ±0,0125 |
| 4–6 | 0 / −0,030 | +0,030 / 0 | 0 / −0,030 | −0,012 / −0,042 | +0,078 / +0,030 | ±0,015 |
| 8–10 | 0 / −0,036 | +0,036 / 0 | 0 / −0,036 | −0,015 / −0,051 | +0,098 / +0,040 | ±0,018 |
| 12–18 | 0 / −0,043 | +0,043 / 0 | 0 / −0,043 | −0,018 / −0,061 | +0,120 / +0,050 | ±0,0215 |
| 20–28 | 0 / −0,052 | +0,052 / 0 | 0 / −0,052 | −0,022 / −0,074 | +0,149 / +0,065 | ±0,026 |
| 32–50 | 0 / −0,062 | +0,062 / 0 | 0 / −0,062 | −0,026 / −0,088 | +0,180 / +0,080 | ±0,031 |
| 56–80 | 0 / −0,074 | +0,074 / 0 | 0 / −0,074 | −0,032 / −0,106 | +0,220 / +0,100 | ±0,037 |
| 90–100 | 0 / −0,087 | +0,087 / 0 | 0 / −0,087 | −0,037 / −0,124 | +0,260 / +0,120 | ±0,0435 |

Verdiene følger ISO 286. Kildetabellene runder JS9 til ±0,012 og ±0,021.

### Grenseavvik for kilehøyde $h$ (mm)

| $h$ | Toleranse | Avvik |
|---|---|---|
| 2, 3 | h9 | 0 / −0,025 |
| 4, 5, 6 | h9 | 0 / −0,030 |
| 7, 8, 9, 10 | h11 | 0 / −0,090 |
| 11, 12, 14, 16, 18 | h11 | 0 / −0,110 |
| 20, 22, 25, 28 | h11 | 0 / −0,130 |
| 32, 36, 40, 45, 50 | h11 | 0 / −0,160 |

## Eksempel — aksel Ø25, normal pasning

Aksel Ø25 ligger i området 22–30 → kile **8 × 7**, $t_1 = 4{,}0$, $t_2 = 3{,}3$, toleranse +0,2.

| | Mål på tegning | Grenser |
|---|---|---|
| Akselspor bredde | 8 N9 | 7,964 – 8,000 |
| Akselspor dybde | $d - t_1 = 21\,{}^{\;\;0}_{-0{,}2}$ | 20,8 – 21,0 |
| Navspor bredde | 8 JS9 | 7,982 – 8,018 |
| Navspor dybde | $d + t_2 = 28{,}3\,{}^{+0{,}2}_{\;\;0}$ | 28,3 – 28,5 |
| Sporradius $r_2$ | 0,16 – 0,25 | |
| Kile | DIN 6885 – A 8 × 7 × $l$ | $b$: 7,964 – 8,000, $h$: 6,910 – 7,000 |

Ryggklaring: $t_1 + t_2 - h = 4{,}0 + 3{,}3 - 7 = 0{,}3$ mm nominelt.

## Tegning og produksjon

**Dette må stå på tegningen**

- Sporbredde med toleranseklasse (f.eks. 8 N9)
- Dybde som $d - t_1$ (aksel) eller $d + t_2$ (nav) med toleranse
- Sporlengde og plassering fra en skulder eller ende. For form A er sporlengden lik kilelengden, med plusstoleranse fra tabellen over
- Radius i sporbunn ($r_2$)
- Symmetri av sporet i forhold til aksel- / boringsaksen. DIN 6892 anbefaler at symmetritoleranse alltid angis, for å unngå tilpassing for hånd ved montering
- Overflateruhet på flankene

DIN 6892 anbefaler også at $r_2$ legges mot øvre grense i tabellen (størst mulig radius gir lavest kjervvirkning), og at aksel og nav har lett presspasning (overmål over ca. 0,25 ‰ av diameteren) for å motvirke slitasje fra mikrobevegelser.

**Vanlig praksis** (verkstedpraksis, ikke hentet fra standarden)

- Symmetritoleranse: velges ut fra sporbredden, grovt regnet i samme størrelsesorden som breddetoleransen. For store avvik gir skjev anlegg og vanskelig montering
- Overflate: flanker Ra 3,2 eller bedre, sporbunn Ra 6,3
- Bryt kantene på sporet lett, men ikke fas så mye at bærehøyden reduseres

**Maskinering**

| Spor | Metode | Merknad |
|---|---|---|
| Akselspor, lukket (form A) | Pinnefres / kilsporfres | Fresdiameter = $b$. Fres gjerne med mindre fres og ta flankene til mål i to passeringer for å treffe N9 / P9 |
| Akselspor, med utløp | Skivefres | Bedre flankekvalitet og lavere kjervvirkning enn pinnefrest spor. Bruk kile form B |
| Navspor | Brotsjing, stikking eller trådgnist | Sporet er gjennomgående. Brotsjer leveres normalt i JS9 / P9 / D10 |

**Måling**

- Bredde: passbiter / sporlære (gå–stopp), eller innvendig mikrometer
- Akseldybde: mikrometer over $d - t_1$
- Navdybde: skyvelære eller innvendig mål over $d + t_2$

**Montering**

- Avgrad og rengjør sporene. Kilen bankes inn i akselsporet med plast- eller kobberhammer uten å vri den
- Kilen skal ikke stikke ut av navet, og bør være litt kortere enn navet
- Kiler med skadde flanker brukes ikke om igjen

## Kontroll av flatetrykk

Etter DIN 6892 er det normalt **akselen** som er det kritiske leddet i forbindelsen, og avskjæring av kilen skjer svært sjelden. Kilen kontrolleres derfor på flatetrykk mot flankene, og akselen på torsjon og bøying med kjervvirkning fra sporet.

Forenklet overslag (metode C i DIN 6892, jevnt fordelt trykk, uten hensyn til faser og radier):

$$
p = \frac{2\,K_A\,T}{d \cdot (h - t_1) \cdot l_{tr} \cdot i \cdot \varphi} \le p_{till}
$$

| Symbol | Betydning | Enhet |
|---|---|---|
| $T$ | Nominelt moment | Nmm |
| $K_A$ | Driftsfaktor (DIN 3990-1). 1,0 for jevn drift, opp til 2,25 eller mer for kraftige støt | – |
| $d$ | Akseldiameter | mm |
| $h - t_1$ | Bærende høyde i navet | mm |
| $l_{tr}$ | Bærende lengde. Form A: $l - b$. Form B: $l$ | mm |
| $i$ | Antall kiler (maks 2) | – |
| $\varphi$ | Bæreandel. 1 for én kile, 0,75 for to kiler | – |
| $p$ | Flatetrykk | N/mm² |

**Vilkår for metode C** (DIN 6892:2012, kap. 7)

- Bare vrimoment er tatt med
- $l_{tr} \le 1{,}3\,d$. Lengde utover dette bidrar ikke nevneverdig
- Høyst to kiler
- Ikke vekslende momentretning. Reverserende drift må regnes etter metode B
- $p_{till}$ bygger på den laveste flytegrensen $R_e$ av aksel, nav og kile. For nav i sprøtt materiale (grått støpejern) brukes $R_m$ i stedet for $R_e$
- Enkeltstående lasttopper på 1,3–1,5 ganger tillatt moment kan overføres

Tallverdien for $p_{till}$ (likning 33 i standarden) lot seg ikke lese fra kilden. Lærebokverdier (Roloff/Matek), **ikke verifisert mot DIN 6892**: stål $p_{till} \approx R_e / S_F$ med $S_F \approx 1{,}1$–$1{,}5$, grått støpejern $p_{till} \approx R_m / S_B$ med $S_B \approx 1{,}5$–$2{,}0$.

**Nav**

- Navspenningen trenger normalt ikke kontrolleres når $d / D < 0{,}6$ ($D$ = ytre navdiameter)
- Tynnveggede nav i støpejern reduserer overførbart moment vesentlig

Eksempel: Ø25, kile A 8 × 7 × 32, $T = 60$ Nm, jevn drift ($K_A = 1$). $l_{tr} = 32 - 8 = 24$ mm ($\le 1{,}3 \cdot 25 = 32{,}5$), $h - t_1 = 3$ mm.

$$
p = \frac{2 \cdot 60\,000}{25 \cdot 3 \cdot 24} \approx 67\ \text{N/mm}^2
$$

For torsjon i akselen, se [Vridning av aksel](../formulas/vridning-aksel.md).

## Passkiler lav form — DIN 6885-3

Brukes der navet er tynt eller akselen er hul. Samme bredder og toleranser som høy form, men lavere kile og grunnere spor.

Tabellen er bare funnet i én kilde (1956-utgaven). Navdybden $t_2$ er ikke bekreftet og er utelatt.

| Aksel $d$ over–til | $b \times h$ | $t_1$ aksel |
|---|---|---|
| 12–17 | 5 × 3 | 1,9 |
| 17–22 | 6 × 4 | 2,5 |
| 22–30 | 8 × 5 | 3,1 |
| 30–38 | 10 × 6 | 3,7 |
| 38–44 | 12 × 6 | 3,9 |
| 44–50 | 14 × 6 | 4,0 |
| 50–58 | 16 × 7 | 4,7 |
| 58–65 | 18 × 7 | 4,8 |
| 65–75 | 20 × 8 | 5,4 |
| 75–85 | 22 × 9 | 6,0 |
| 85–95 | 25 × 9 | 6,2 |
| 95–110 | 28 × 10 | 6,9 |
| 110–130 | 32 × 11 | 7,6 |
| 130–150 | 36 × 12 | 8,3 |

## Skivekiler — DIN 6888 (Woodruff)

Halvmåneformet kile som ligger i et spor frest med skivefres rett ned i akselen. Billig og selvinnstillende, mye brukt på koniske akseltapper. Det dype sporet svekker akselen, og forbindelsen egner seg for små moment og ikke for vekslende last.

Verdiene er lest direkte fra DIN 6888 (utgave 1956). Betegnelse: **Skivekile 4 × 5 DIN 6888**.

| $b \times h$ | $d_2$ | $l \approx$ | $t_1$ rekke A | $t_2$ rekke A | $t_1$ rekke B | $t_2$ rekke B | Aksel $d$, bruk I | Aksel $d$, bruk II |
|---|---|---|---|---|---|---|---|---|
| 1 × 1,4 | 4 | 3,82 | 1,0 | 0,6 | 1,0 | 0,6 | 3–4 | 6–8 |
| 1,5 × 2,6 | 7 | 6,76 | 2,0 | 0,8 | 2,0 | 0,8 | 4–6 | 8–10 |
| 2 × 2,6 | 7 | 6,76 | 1,8 | 1,0 | 1,8 | 1,0 | 6–8 | 10–12 |
| 2 × 3,7 | 10 | 9,66 | 2,9 | 1,0 | 2,9 | 1,0 | 6–8 | 10–12 |
| 2,5 × 3,7 ¹ | 10 | 9,66 | 2,9 | 1,0 | 2,9 | 1,0 | 8–10 | 12–17 |
| 3 × 3,7 | 10 | 9,66 | 2,5 | 1,4 | 2,8 | 1,1 | 8–10 | 12–17 |
| 3 × 5 | 13 | 12,65 | 3,8 | 1,4 | 4,1 | 1,1 | 8–10 | 12–17 |
| 3 × 6,5 | 16 | 15,72 | 5,3 | 1,4 | 5,6 | 1,1 | – | 12–17 |
| 4 × 5 | 13 | 12,65 | 3,5 | 1,7 | 4,1 | 1,1 | 10–12 | 17–22 |
| 4 × 6,5 | 16 | 15,72 | 5,0 | 1,7 | 5,6 | 1,1 | 10–12 | 17–22 |
| 4 × 7,5 | 19 | 18,57 | 6,0 | 1,7 | 6,6 | 1,1 | – | 17–22 |
| 5 × 6,5 | 16 | 15,72 | 4,5 | 2,2 | 5,4 | 1,3 | 12–17 | 22–30 |
| 5 × 7,5 | 19 | 18,57 | 5,5 | 2,2 | 6,4 | 1,3 | 12–17 | 22–30 |
| 5 × 9 | 22 | 21,63 | 7,0 | 2,2 | 7,9 | 1,3 | – | 22–30 |
| 6 × 7,5 | 19 | 18,57 | 5,1 | 2,6 | 6,0 | 1,7 | 17–22 | 30–38 |
| 6 × 9 | 22 | 21,63 | 6,6 | 2,6 | 7,5 | 1,7 | 17–22 | 30–38 |
| 6 × 10 ² | 25 | 24,49 | 7,6 | 2,6 | 8,5 | 1,7 | 17–22 | 30–38 |
| 6 × 11 | 28 | 27,35 | 8,6 | 2,6 | 9,5 | 1,7 | – | 30–38 |
| 8 × 9 | 22 | 21,63 | 6,2 | 3,0 | 7,5 | 1,7 | 22–30 | over 38 |
| 8 × 11 | 28 | 27,35 | 8,2 | 3,0 | 9,5 | 1,7 | 22–30 | over 38 |
| 8 × 13 | 32 | 31,43 | 10,2 | 3,0 | 11,5 | 1,7 | – | over 38 |
| 10 × 11 | 28 | 27,35 | 7,8 | 3,4 | 9,1 | 2,1 | 30–38 | over 38 |
| 10 × 13 | 32 | 31,43 | 9,8 | 3,4 | 11,1 | 2,1 | 30–38 | over 38 |
| 10 × 16 | 45 | 43,08 | 12,8 | 3,4 | 14,1 | 2,1 | – | over 38 |

¹ Bare for kjøretøy. ² Bør unngås.

- **Bruk I:** skivekilen overfører hele momentet, som en passkile.
- **Bruk II:** skivekilen brukes bare til å låse posisjonen, mens f.eks. en kon eller tverrkile overfører momentet.
- **Rekke A** (dypt navspor) er normalvalget og svarer til DIN 6885-1 med ryggklaring. **Rekke B** (grunt navspor) er for verktøymaskiner og svarer til DIN 6885-2.
- Akselsporet freses med skivefres. Spordiameter er $d_2$ med toleranse +0,5.

| Mål | Toleranse |
|---|---|
| Kile bredde $b$ | h9 |
| Kile høyde $h$ | h12 |
| Kile diameter $d_2$ | −0,1 til og med $d_2 = 22$, −0,2 fra $d_2 = 25$ |
| Akselspor bredde | P9 (fast) eller N9 (lett) |
| Navspor bredde | P9 (fast) eller J9 (lett; JS9 i nyere kilder). D10 er tillatt ved bruk II |
| Brotsjede spor | Anbefalt IT8 i stedet for IT9 (P8, N8, J8) |
| Akselspor dybde $t_1$ | +0,1. For 5 × 9, 6 × 10, 6 × 11 og alle med $b$ = 8 og 10: +0,2 |
| Navspor dybde $t_2$ | +0,1. Rekke A med $b$ = 10: +0,2 |
| Kantbrytning kile $r_1$ | 0,2 +0,1 for $b \le 5$, 0,4 +0,2 for $b \ge 6$ |
| Radius sporbunn $r_2$ | 0,2 −0,1 for $b \le 5$, 0,4 −0,2 for $b \ge 6$ |
| Materiale | St 60, strekkfasthet minst 60 kg/mm² (ca. 590 N/mm²) |

På tegning brukes $d - t_1$ og $d + t_2$ på samme måte som for passkiler. Ofte er $t_1$ og $d + t_2$ nok.

## Drivkiler og nesekiler — DIN 6886 / 6887

Kiler med helning 1:100 på ryggen som drives inn aksialt og spenner nav og aksel sammen radielt. Overfører moment også via friksjon, men trekker navet eksentrisk og brukes derfor bare ved lave turtall og små krav til rundløp (landbruk, tyngre grovt maskineri).

- Tverrsnitt $b \times h$, akselområder og $t_1$ er de samme som for DIN 6885-1.
- Navsporets dybde er kolonnen **$t_2$ (overmål)** i hovedtabellen, målt i den dypeste enden.
- Nesekile (DIN 6887) har hode for utdriving og brukes der kilen ikke kan slås ut fra baksiden.

## Kilder

- DIN 6888, utgave 1956 (skivekiler, alle verdier i tabellen)
- DIN 6892:2012-08, kap. 4, 6, 7 og 9 (beregning, metode C, anbefalinger for tegning). Likninger og tabeller i kilden var ikke lesbare
- Chiavette Unificate, katalog «Feather keys according to DIN 6885 – UNI 6604» (toleransetabell, former, lengder)
- [RoyMech — Metric keys and keyways (BS 4235-1)](https://www.roymech.co.uk/Useful_Tables/Keyways/keyways.htm)
- [Engineers Edge — Parallel key and taper key dimensions](https://www.engineersedge.com/hardware/parallel_key_and_taper_keys_dimensions_15236.htm)
- [Wilh. Wernecke — Passfedern DIN 6885](https://www.wilh-wernecke.de/passfedernDIN6885.php)
- [fasteners.eu — DIN 6888](https://www.fasteners.eu/de/standards/din/6888/) og [mbo Osswald — Scheibenfeder DIN 6888](https://www.mbo-osswald.de/shop/scheibenfeder-din-6888-5x6-5-edelstahl-blank)
- [fasten.it — DIN 6885-3](https://fasten.it/en/Norms/Norm/DIN%206885-3) (1956-utgaven)
- Reyher, Technische Informationen 2016 (skivekiler, kilestål DIN 6880)
- [CADKite — Keyway calculator](https://www.cadkite.com/tools/keyway/?d=25&fit=normal) (kalkulator for raskt oppslag, ikke brukt til kontroll)

### Om kildene

Tabellen for DIN 6885-1 er kryssjekket mot fire uavhengige leverandør- og oppslagstabeller, ikke mot selve standarden. Følgende er ikke verifisert:

- Om 2021-utgaven av DIN 6885-1 har endret noe i forhold til målene som er gjengitt her
- Om 2022-utgaven av DIN 6888 avviker fra 1956-utgaven
- Navdybde $t_2$ for lav form (DIN 6885-3)
- Tallverdier for tillatt flatetrykk
- Tallverdier for symmetritoleranse og overflateruhet (står som verkstedpraksis)
