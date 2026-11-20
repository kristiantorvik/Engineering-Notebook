---
title: ISO 286 — toleranser og pasninger
summary: Standardtoleranser IT01–IT18, grunnavvik for hull og aksler, grenseavvik for de vanligste toleranseklassene (H7, g6, k6 osv.) og anbefalte pasninger etter ISO 286-1. Med veiledning om når ISO-toleranser brukes, og hvilken toleransegrad som passer til hvilken bearbeiding.
tags:
  - Toleranser
  - Maskinelementer
  - Engineering
  - maskinering
type: referanse
aliases: [ISO 286, ISO-toleranser, IT-grader, pasninger, passninger, limits and fits]
search_words: ISO 286, ISO 286-1, ISO 286-2, ISO-toleranse, ISO-toleranser, toleransetabell, pasningstabell, passningstabell, pasning, passning, pasninger, passninger, standardtoleranse, toleransegrad, IT-grad, IT6, IT7, IT8, IT9, IT11, grunnavvik, grenseavvik, grensemål, toleranseklasse, toleransefelt, H7, H8, H9, H11, g6, h6, h7, h9, h11, js6, k6, m6, n6, p6, r6, s6, f7, e8, d9, hullbasis, akselbasis, enhetshull, enhetsaksel, klaring, pressmonn, klaringspasning, overgangspasning, presspasning, limits and fits, tolerance grade, fundamental deviation, hole basis, shaft basis, clearance fit, transition fit, interference fit
updated: 2026-11-15
---

# ISO 286 — toleranser og pasninger

ISO 286 er kodesystemet bak betegnelser som **Ø40 H7** og **Ø40 H7/g6**. Koden sier hvor bredt toleransefeltet er (tallet) og hvor det ligger i forhold til nominelt mål (bokstaven). Store bokstaver gjelder hull, små bokstaver gjelder aksler.

**Relatert**

- [Pasningsvelger](../calculators/pasningsvelger.md) – finner pasningen som gir ønsket klaring eller pressmonn.
- [Toleransesetting — ISO GPS](../notes/toleransesetting.md) – omhyllingskrav Ⓔ, generelle toleranser og geometriske toleranser.
- [Presspassninger og tykkvegga rør](../notes/presspassninger-og-tykkvegga-rør.md) – hvor mye pressmonn som trengs.
- [Kiler og kilspor](kiler-og-kilspor.md) – eksempel på bruk av toleranseklasser på bredder (P9, N9, JS9).

**Slik leser du tabellene**

- Desimaltegn er komma. Avvik og toleranser er i µm (1 µm = 0,001 mm) der ikke annet står.
- Størrelsesområdene er «over–til og med»: Ø30 hører til 18–30, Ø30,5 hører til 30–50.
- Tabellene her gjelder til og med 500 mm, bortsett fra tabellen over standardtoleranser som går til 3150 mm.

## Begreper

| Begrep | Symbol | Betydning |
|---|---|---|
| Nominelt mål | | Målet på tegningen som avvikene regnes fra. Hull og aksel i en pasning har samme nominelle mål |
| Øvre grenseavvik | $ES$ (hull), $es$ (aksel) | Største tillatte mål minus nominelt mål. Har fortegn |
| Nedre grenseavvik | $EI$ (hull), $ei$ (aksel) | Minste tillatte mål minus nominelt mål. Har fortegn |
| Toleranse | | Øvre minus nedre grenseavvik. Alltid positiv |
| Standardtoleranse | IT | Toleransebredde fra tabellen under, bestemt av toleransegrad og nominelt mål |
| Toleransegrad | IT7 | Nøyaktighetsnivå. Samme grad regnes som like krevende for alle mål |
| Grunnavvik | bokstav | Det grenseavviket som ligger nærmest nominelt mål. Bestemmer plasseringen av toleransefeltet |
| Toleranseklasse | H7, g6 | Grunnavvik + toleransegrad |
| Pasning | H7/g6 | Hull og aksel med samme nominelle mål som skal settes sammen |

«Hull» betyr ethvert innvendig mål og «aksel» ethvert utvendig mål, også mellom to parallelle flater. Bredden på et kilspor er et hull, bredden på en kile er en aksel.

## Slik er en toleranseklasse bygd opp

<div style="max-width:680px">
<svg viewBox="0 0 680 390" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Plassering av toleransefeltene for hull D til U og aksel d til u i forhold til nullinjen, nominelt mål 30 til 40 mm" style="width:100%;height:auto;color:var(--md-default-fg-color);font-family:inherit;font-size:12px">
<g fill="currentColor" stroke="none">
<text x="4" y="12" font-weight="700">Hull, IT7 [µm]</text>
<path d="M58 105.5 H676" stroke="currentColor" stroke-width="1" stroke-dasharray="6 3" opacity="0.6"/>
<text x="52" y="109.5" text-anchor="end">0</text>
<path d="M58 166.0 h6" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="52" y="170.0" text-anchor="end" opacity="0.75">−100</text>
<path d="M58 135.7 h6" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="52" y="139.7" text-anchor="end" opacity="0.75">−50</text>
<path d="M58 75.3 h6" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="52" y="79.3" text-anchor="end" opacity="0.75">+50</text>
<path d="M58 45.1 h6" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="52" y="49.1" text-anchor="end" opacity="0.75">+100</text>
<rect x="70" y="42.0" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="83" y="37.0" text-anchor="middle">D</text>
<rect x="113" y="60.2" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="126" y="55.2" text-anchor="middle">E</text>
<rect x="156" y="75.3" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="169" y="70.3" text-anchor="middle">F</text>
<rect x="199" y="85.0" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="212" y="80.0" text-anchor="middle">G</text>
<rect x="242" y="90.4" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="255" y="85.4" text-anchor="middle">H</text>
<rect x="285" y="98.0" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="298" y="93.0" text-anchor="middle">JS</text>
<rect x="328" y="101.3" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="341" y="130.4" text-anchor="middle">K</text>
<rect x="371" y="105.5" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="384" y="134.6" text-anchor="middle">M</text>
<rect x="414" y="110.3" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="427" y="139.5" text-anchor="middle">N</text>
<rect x="457" y="115.8" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="470" y="144.9" text-anchor="middle">P</text>
<rect x="500" y="120.6" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="513" y="149.7" text-anchor="middle">R</text>
<rect x="543" y="126.1" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="556" y="155.2" text-anchor="middle">S</text>
<rect x="586" y="129.1" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="599" y="158.2" text-anchor="middle">T</text>
<rect x="629" y="136.3" width="26" height="15.1" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
<text x="642" y="165.4" text-anchor="middle">U</text>
<text x="4" y="212" font-weight="700">Aksel, IT6 [µm]</text>
<path d="M58 305.5 H676" stroke="currentColor" stroke-width="1" stroke-dasharray="6 3" opacity="0.6"/>
<text x="52" y="309.5" text-anchor="end">0</text>
<path d="M58 366.0 h6" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="52" y="370.0" text-anchor="end" opacity="0.75">−100</text>
<path d="M58 335.7 h6" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="52" y="339.7" text-anchor="end" opacity="0.75">−50</text>
<path d="M58 275.3 h6" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="52" y="279.3" text-anchor="end" opacity="0.75">+50</text>
<path d="M58 245.1 h6" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="52" y="249.1" text-anchor="end" opacity="0.75">+100</text>
<rect x="70" y="353.9" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="83" y="377.5" text-anchor="middle">d</text>
<rect x="113" y="335.7" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="126" y="359.4" text-anchor="middle">e</text>
<rect x="156" y="320.6" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="169" y="344.3" text-anchor="middle">f</text>
<rect x="199" y="311.0" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="212" y="334.6" text-anchor="middle">g</text>
<rect x="242" y="305.5" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="255" y="329.2" text-anchor="middle">h</text>
<rect x="285" y="300.7" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="298" y="295.7" text-anchor="middle">js</text>
<rect x="328" y="294.6" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="341" y="289.6" text-anchor="middle">k</text>
<rect x="371" y="290.4" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="384" y="285.4" text-anchor="middle">m</text>
<rect x="414" y="285.6" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="427" y="280.6" text-anchor="middle">n</text>
<rect x="457" y="280.1" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="470" y="275.1" text-anchor="middle">p</text>
<rect x="500" y="275.3" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="513" y="270.3" text-anchor="middle">r</text>
<rect x="543" y="269.8" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="556" y="264.8" text-anchor="middle">s</text>
<rect x="586" y="266.8" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="599" y="261.8" text-anchor="middle">t</text>
<rect x="629" y="259.6" width="26" height="9.7" fill="currentColor" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2"/>
<text x="642" y="254.6" text-anchor="middle">u</text>
</g>
</svg>
</div>

Figuren viser toleransefeltene for nominelt mål 30–40 mm, tegnet i målestokk fra tabellene på denne siden.

- **Tallet** er toleransegraden. Lavere tall gir smalere toleransefelt.
- **Bokstaven** er plasseringen. For hull ligger A–G over nullinjen (hullet er alltid større enn nominelt mål), H starter på nullinjen, og K–ZC ligger på eller under. For aksler er det speilvendt: a–g ligger under nullinjen, h slutter på nullinjen, og k–zc ligger over.
- **JS og js** ligger symmetrisk om nullinjen: $\pm\,IT/2$.
- **H-hull** har nedre grenseavvik 0. **h-aksel** har øvre grenseavvik 0.
- Bokstavene I, L, O, Q og W brukes ikke.

### Fra toleranseklasse til grenseavvik

1. Finn standardtoleransen IT for toleransegraden og målet i [tabellen over standardtoleranser](#standardtoleranser-it).
2. Finn grunnavviket for bokstaven og målet i [tabellene over grunnavvik](#grunnavvik).
3. Regn ut det andre grenseavviket:

| Toleranseklasse | Tabellen gir | Det andre avviket |
|---|---|---|
| Hull A–H | $EI$ (nedre) | $ES = EI + IT$ |
| Hull J–ZC | $ES$ (øvre) | $EI = ES - IT$ |
| Aksel a–h | $es$ (øvre) | $ei = es - IT$ |
| Aksel j–zc | $ei$ (nedre) | $es = ei + IT$ |
| JS, js | | $\pm\,IT/2$ |

For hull K, M og N til og med IT8, og P–ZC til og med IT7, skal tabellverdien i tillegg økes med $\Delta$ fra [Δ-tabellen](#-verdier-for-hull-kzc).

**Eksempel 1 — Ø90 F7.** IT7 for 80–120 mm er 35 µm. F for 80–100 mm gir $EI = +36$ µm. Da er $ES = 36 + 35 = +71$ µm. Hullet skal ligge mellom 90,036 og 90,071 mm.

**Eksempel 2 — Ø20 K7** (med Δ). IT7 for 18–30 mm er 21 µm. K for 18–24 mm er $-2 + \Delta$, og Δ for IT7 er 8. Da er $ES = -2 + 8 = +6$ µm og $EI = 6 - 21 = -15$ µm.

**Eksempel 3 — Ø40 U6** (med Δ). IT6 for 30–50 mm er 16 µm. U for 30–40 mm er −60, og Δ for IT6 er 5. Da er $ES = -60 + 5 = -55$ µm og $EI = -55 - 16 = -71$ µm.

## Når brukes ISO-toleranser

**Bruk toleranseklasse (bokstav + tall) når**

- målet er en del av en pasning: aksel i boring, tapp i hull, kile i spor, styring i føring
- målet skal passe mot en innkjøpt del som har ISO-toleranse (lager, styrepinne, kile, blank stang)
- målet skal lages eller kontrolleres med standardverktøy: brotsj, tolk, lære

**Bruk heller ± avvik eller generell toleranse når**

- målet ikke er en diameter eller en avstand mellom to parallelle motstående flater. Trinn, dybder, senteravstander og radier har ikke noe «hull» eller «aksel», og ISO 286 gjelder ikke for dem. Se [Toleransesetting — ISO GPS](../notes/toleransesetting.md)
- målet ikke har noen pasningsfunksjon. Da holder generell toleranse (ISO 2768) eller et vanlig ± avvik

**Dette må være på plass for at pasningen skal virke**

- Hull og aksel må ha **samme nominelle mål**.
- Etter 2010-utgaven kontrollerer ikke toleranseklassen formen på delen. Målet tolkes som topunktsmål, og en bøyd aksel kan ligge innenfor Ø40 g6 over alt og likevel ikke gå inn i hullet. Pasningsmål bør derfor ha **omhyllingskrav Ⓔ** på tegningen (Ø40 H7 Ⓔ). For kraftige presspasninger er Ⓔ ikke nødvendig.
- Formtoleranser og krav til overflateruhet kan være nødvendig i tillegg. Temperatur, materiale og varmebehandling påvirker også pasningen. Målene gjelder ved 20 °C.

### Hullbasis eller akselbasis

Samme klaring kan oppnås på to måter. Funksjonen blir den samme, så valget er økonomisk.

| System | Prinsipp | Brukes når |
|---|---|---|
| **Hullbasis** | Hullet er alltid H. Pasningen bestemmes av akselens bokstav (H7/g6, H7/k6, H7/s6) | Normalvalget. Hull lages med verktøy med fast mål (brotsj, bor), og kontrolleres med tolk. Færre ulike hull gir færre verktøy |
| **Akselbasis** | Akselen er alltid h. Pasningen bestemmes av hullets bokstav (G7/h6, K7/h6, S7/h6) | Bare når det gir en klar økonomisk fordel. Typisk når flere deler med ulike pasninger skal sitte på en blanktrukket stang som ikke skal bearbeides |

### Velg fra det anbefalte utvalget

Systemet tillater svært mange kombinasjoner. For å begrense antall verktøy og lærer anbefaler standarden at toleranseklasser til vanlig bruk velges fra dette utvalget:

**Hull** (ISO 286-1, figur 10)

- G6 · H6 · JS6 · K6 · M6 · N6 · P6 · R6 · S6 · T6
- F7 · G7 · H7 · JS7 · K7 · M7 · N7 · P7 · R7 · S7 · T7 · U7 · X7
- E8 · F8 · H8 · JS8 · K8 · M8 · N8 · P8 · R8
- D9 · E9 · F9 · H9
- C10 · D10 · E10 · H10
- A11 · B11 · C11 · D11 · H11

**Aksler** (ISO 286-1, figur 11)

- g5 · h5 · js5 · k5 · m5 · n5 · p5 · r5 · s5 · t5
- f6 · g6 · h6 · js6 · k6 · m6 · n6 · p6 · r6 · s6 · t6 · u6 · x6
- e7 · f7 · h7 · js7 · k7 · m7 · n7 · p7 · r7 · s7 · t7 · u7
- d8 · e8 · f8 · h8
- b9 · c9 · d9 · e9 · h9
- d10 · h10
- a11 · b11 · c11 · h11

Utvalget gjelder vanlig bruk. Noen maskinelementer har sitt eget utvalg, f.eks. kilspor. JS og js kan byttes med J og j der det er nødvendig.

## Standardtoleranser IT

<div class="nb-compact-tables" markdown="1">

**IT01–IT11, verdier i µm**

| Mål over–til [mm] | IT01 | IT0 | IT1 | IT2 | IT3 | IT4 | IT5 | IT6 | IT7 | IT8 | IT9 | IT10 | IT11 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| til 3 | 0,3 | 0,5 | 0,8 | 1,2 | 2 | 3 | 4 | 6 | 10 | 14 | 25 | 40 | 60 |
| 3–6 | 0,4 | 0,6 | 1 | 1,5 | 2,5 | 4 | 5 | 8 | 12 | 18 | 30 | 48 | 75 |
| 6–10 | 0,4 | 0,6 | 1 | 1,5 | 2,5 | 4 | 6 | 9 | 15 | 22 | 36 | 58 | 90 |
| 10–18 | 0,5 | 0,8 | 1,2 | 2 | 3 | 5 | 8 | 11 | 18 | 27 | 43 | 70 | 110 |
| 18–30 | 0,6 | 1 | 1,5 | 2,5 | 4 | 6 | 9 | 13 | 21 | 33 | 52 | 84 | 130 |
| 30–50 | 0,6 | 1 | 1,5 | 2,5 | 4 | 7 | 11 | 16 | 25 | 39 | 62 | 100 | 160 |
| 50–80 | 0,8 | 1,2 | 2 | 3 | 5 | 8 | 13 | 19 | 30 | 46 | 74 | 120 | 190 |
| 80–120 | 1 | 1,5 | 2,5 | 4 | 6 | 10 | 15 | 22 | 35 | 54 | 87 | 140 | 220 |
| 120–180 | 1,2 | 2 | 3,5 | 5 | 8 | 12 | 18 | 25 | 40 | 63 | 100 | 160 | 250 |
| 180–250 | 2 | 3 | 4,5 | 7 | 10 | 14 | 20 | 29 | 46 | 72 | 115 | 185 | 290 |
| 250–315 | 2,5 | 4 | 6 | 8 | 12 | 16 | 23 | 32 | 52 | 81 | 130 | 210 | 320 |
| 315–400 | 3 | 5 | 7 | 9 | 13 | 18 | 25 | 36 | 57 | 89 | 140 | 230 | 360 |
| 400–500 | 4 | 6 | 8 | 10 | 15 | 20 | 27 | 40 | 63 | 97 | 155 | 250 | 400 |
| 500–630 | – | – | 9 | 11 | 16 | 22 | 32 | 44 | 70 | 110 | 175 | 280 | 440 |
| 630–800 | – | – | 10 | 13 | 18 | 25 | 36 | 50 | 80 | 125 | 200 | 320 | 500 |
| 800–1 000 | – | – | 11 | 15 | 21 | 28 | 40 | 56 | 90 | 140 | 230 | 360 | 560 |
| 1 000–1 250 | – | – | 13 | 18 | 24 | 33 | 47 | 66 | 105 | 165 | 260 | 420 | 660 |
| 1 250–1 600 | – | – | 15 | 21 | 29 | 39 | 55 | 78 | 125 | 195 | 310 | 500 | 780 |
| 1 600–2 000 | – | – | 18 | 25 | 35 | 46 | 65 | 92 | 150 | 230 | 370 | 600 | 920 |
| 2 000–2 500 | – | – | 22 | 30 | 41 | 55 | 78 | 110 | 175 | 280 | 440 | 700 | 1100 |
| 2 500–3 150 | – | – | 26 | 36 | 50 | 68 | 96 | 135 | 210 | 330 | 540 | 860 | 1350 |

**IT12–IT18, verdier i mm**

| Mål over–til [mm] | IT12 | IT13 | IT14 | IT15 | IT16 | IT17 | IT18 |
|---|---|---|---|---|---|---|---|
| til 3 | 0,1 | 0,14 | 0,25 | 0,4 | 0,6 | 1 | 1,4 |
| 3–6 | 0,12 | 0,18 | 0,3 | 0,48 | 0,75 | 1,2 | 1,8 |
| 6–10 | 0,15 | 0,22 | 0,36 | 0,58 | 0,9 | 1,5 | 2,2 |
| 10–18 | 0,18 | 0,27 | 0,43 | 0,7 | 1,1 | 1,8 | 2,7 |
| 18–30 | 0,21 | 0,33 | 0,52 | 0,84 | 1,3 | 2,1 | 3,3 |
| 30–50 | 0,25 | 0,39 | 0,62 | 1 | 1,6 | 2,5 | 3,9 |
| 50–80 | 0,3 | 0,46 | 0,74 | 1,2 | 1,9 | 3 | 4,6 |
| 80–120 | 0,35 | 0,54 | 0,87 | 1,4 | 2,2 | 3,5 | 5,4 |
| 120–180 | 0,4 | 0,63 | 1 | 1,6 | 2,5 | 4 | 6,3 |
| 180–250 | 0,46 | 0,72 | 1,15 | 1,85 | 2,9 | 4,6 | 7,2 |
| 250–315 | 0,52 | 0,81 | 1,3 | 2,1 | 3,2 | 5,2 | 8,1 |
| 315–400 | 0,57 | 0,89 | 1,4 | 2,3 | 3,6 | 5,7 | 8,9 |
| 400–500 | 0,63 | 0,97 | 1,55 | 2,5 | 4 | 6,3 | 9,7 |
| 500–630 | 0,7 | 1,1 | 1,75 | 2,8 | 4,4 | 7 | 11 |
| 630–800 | 0,8 | 1,25 | 2 | 3,2 | 5 | 8 | 12,5 |
| 800–1 000 | 0,9 | 1,4 | 2,3 | 3,6 | 5,6 | 9 | 14 |
| 1 000–1 250 | 1,05 | 1,65 | 2,6 | 4,2 | 6,6 | 10,5 | 16,5 |
| 1 250–1 600 | 1,25 | 1,95 | 3,1 | 5 | 7,8 | 12,5 | 19,5 |
| 1 600–2 000 | 1,5 | 2,3 | 3,7 | 6 | 9,2 | 15 | 23 |
| 2 000–2 500 | 1,75 | 2,8 | 4,4 | 7 | 11 | 17,5 | 28 |
| 2 500–3 150 | 2,1 | 3,3 | 5,4 | 8,6 | 13,5 | 21 | 33 |

</div>

- IT01 og IT0 er ikke definert over 500 mm.
- Fra IT6 og oppover øker toleransen med en faktor 10 for hvert femte trinn, altså ca. 1,6 per trinn. IT11 er ti ganger IT6. Regelen kan brukes til å regne ut grader utenfor tabellen: IT20 = IT15 · 10.

## Toleransegrader og bearbeidingsmetode

Tabellene i dette avsnittet er **veiledende lærebokverdier og vanlig verkstedpraksis**. De er ikke hentet fra ISO 286.

**Bruksområde**

| Toleransegrad | Typisk bruk |
|---|---|
| IT01–IT1 | Måleklosser og referansenormaler |
| IT2–IT4 | Lærer, tolker og måleverktøy. Svært nøyaktige pasninger |
| IT5–IT7 | Fine pasninger: lagerseter, styringer, presspasninger. Slipte, brotsjede og findreide flater |
| IT8–IT9 | Middels pasninger: løpepasninger, kilspor, trukket og blankt stangmateriale |
| IT10–IT11 | Grove pasninger med stor klaring. Deler som bare skal kunne settes sammen |
| IT12–IT14 | Mål uten pasningsfunksjon. Stansede og bøyde deler |
| IT15–IT18 | Støpte, smidde, valsede og brennskårne emner |

**Hva metodene normalt klarer**

| Metode | Toleransegrad |
|---|---|
| Lepping, honing | IT4–IT5 |
| Rundsliping | IT5–IT7 |
| Plansliping | IT5–IT8 |
| Findreiing og finboring (utboringshode) | IT5–IT7 |
| Brotsjing av hull, trekkbrotsjing | IT6–IT8 |
| Dreiing | IT7–IT11 |
| Utboring | IT8–IT11 |
| Fresing | IT8–IT11 |
| Boring med spiralbor | IT10–IT13 |
| Stansing, pressing | IT10–IT13 |
| Støping, smiing | IT13–IT16 |

- Den laveste graden i hvert område krever stiv maskin, godt verktøy, kontrollert temperatur og måling underveis.
- **Kostnaden stiger raskt under IT7.** Velg den groveste toleransen funksjonen tåler.
- **Utvendige mål er lettere å treffe og måle enn innvendige.** Derfor har hullet normalt én grad grovere toleranse enn akselen i fine pasninger: H7 mot g6, H8 mot f7. Fra IT8 og grovere brukes ofte samme grad på begge (H8/f8, H11/c11).

## Grenseavvik for vanlige toleranseklasser

Øvre avvik står over nedre avvik, i µm. Verdiene er regnet ut fra tabellene over standardtoleranser og grunnavvik på denne siden, etter framgangsmåten i ISO 286-1 pkt. 4.3.2.

<div class="nb-compact-tables" markdown="1">

### Hull — klaring

| Mål over–til [mm] | D10 | E9 | F7 | F8 | G7 | H6 | H7 | H8 | H9 | H10 | H11 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| til 3 | +60<br>+20 | +39<br>+14 | +16<br>+6 | +20<br>+6 | +12<br>+2 | +6<br>0 | +10<br>0 | +14<br>0 | +25<br>0 | +40<br>0 | +60<br>0 |
| 3–6 | +78<br>+30 | +50<br>+20 | +22<br>+10 | +28<br>+10 | +16<br>+4 | +8<br>0 | +12<br>0 | +18<br>0 | +30<br>0 | +48<br>0 | +75<br>0 |
| 6–10 | +98<br>+40 | +61<br>+25 | +28<br>+13 | +35<br>+13 | +20<br>+5 | +9<br>0 | +15<br>0 | +22<br>0 | +36<br>0 | +58<br>0 | +90<br>0 |
| 10–18 | +120<br>+50 | +75<br>+32 | +34<br>+16 | +43<br>+16 | +24<br>+6 | +11<br>0 | +18<br>0 | +27<br>0 | +43<br>0 | +70<br>0 | +110<br>0 |
| 18–30 | +149<br>+65 | +92<br>+40 | +41<br>+20 | +53<br>+20 | +28<br>+7 | +13<br>0 | +21<br>0 | +33<br>0 | +52<br>0 | +84<br>0 | +130<br>0 |
| 30–50 | +180<br>+80 | +112<br>+50 | +50<br>+25 | +64<br>+25 | +34<br>+9 | +16<br>0 | +25<br>0 | +39<br>0 | +62<br>0 | +100<br>0 | +160<br>0 |
| 50–80 | +220<br>+100 | +134<br>+60 | +60<br>+30 | +76<br>+30 | +40<br>+10 | +19<br>0 | +30<br>0 | +46<br>0 | +74<br>0 | +120<br>0 | +190<br>0 |
| 80–120 | +260<br>+120 | +159<br>+72 | +71<br>+36 | +90<br>+36 | +47<br>+12 | +22<br>0 | +35<br>0 | +54<br>0 | +87<br>0 | +140<br>0 | +220<br>0 |
| 120–180 | +305<br>+145 | +185<br>+85 | +83<br>+43 | +106<br>+43 | +54<br>+14 | +25<br>0 | +40<br>0 | +63<br>0 | +100<br>0 | +160<br>0 | +250<br>0 |
| 180–250 | +355<br>+170 | +215<br>+100 | +96<br>+50 | +122<br>+50 | +61<br>+15 | +29<br>0 | +46<br>0 | +72<br>0 | +115<br>0 | +185<br>0 | +290<br>0 |
| 250–315 | +400<br>+190 | +240<br>+110 | +108<br>+56 | +137<br>+56 | +69<br>+17 | +32<br>0 | +52<br>0 | +81<br>0 | +130<br>0 | +210<br>0 | +320<br>0 |
| 315–400 | +440<br>+210 | +265<br>+125 | +119<br>+62 | +151<br>+62 | +75<br>+18 | +36<br>0 | +57<br>0 | +89<br>0 | +140<br>0 | +230<br>0 | +360<br>0 |
| 400–500 | +480<br>+230 | +290<br>+135 | +131<br>+68 | +165<br>+68 | +83<br>+20 | +40<br>0 | +63<br>0 | +97<br>0 | +155<br>0 | +250<br>0 | +400<br>0 |

### Hull — overgang og press

| Mål over–til [mm] | JS7 | K7 | M7 | N7 | P7 | R7 | S7 | T7 | U7 |
|---|---|---|---|---|---|---|---|---|---|
| til 3 | +5<br>−5 | 0<br>−10 | −2<br>−12 | −4<br>−14 | −6<br>−16 | −10<br>−20 | −14<br>−24 | – | −18<br>−28 |
| 3–6 | +6<br>−6 | +3<br>−9 | 0<br>−12 | −4<br>−16 | −8<br>−20 | −11<br>−23 | −15<br>−27 | – | −19<br>−31 |
| 6–10 | +7,5<br>−7,5 | +5<br>−10 | 0<br>−15 | −4<br>−19 | −9<br>−24 | −13<br>−28 | −17<br>−32 | – | −22<br>−37 |
| 10–18 | +9<br>−9 | +6<br>−12 | 0<br>−18 | −5<br>−23 | −11<br>−29 | −16<br>−34 | −21<br>−39 | – | −26<br>−44 |
| 18–24 | +10,5<br>−10,5 | +6<br>−15 | 0<br>−21 | −7<br>−28 | −14<br>−35 | −20<br>−41 | −27<br>−48 | – | −33<br>−54 |
| 24–30 | +10,5<br>−10,5 | +6<br>−15 | 0<br>−21 | −7<br>−28 | −14<br>−35 | −20<br>−41 | −27<br>−48 | −33<br>−54 | −40<br>−61 |
| 30–40 | +12,5<br>−12,5 | +7<br>−18 | 0<br>−25 | −8<br>−33 | −17<br>−42 | −25<br>−50 | −34<br>−59 | −39<br>−64 | −51<br>−76 |
| 40–50 | +12,5<br>−12,5 | +7<br>−18 | 0<br>−25 | −8<br>−33 | −17<br>−42 | −25<br>−50 | −34<br>−59 | −45<br>−70 | −61<br>−86 |
| 50–65 | +15<br>−15 | +9<br>−21 | 0<br>−30 | −9<br>−39 | −21<br>−51 | −30<br>−60 | −42<br>−72 | −55<br>−85 | −76<br>−106 |
| 65–80 | +15<br>−15 | +9<br>−21 | 0<br>−30 | −9<br>−39 | −21<br>−51 | −32<br>−62 | −48<br>−78 | −64<br>−94 | −91<br>−121 |
| 80–100 | +17,5<br>−17,5 | +10<br>−25 | 0<br>−35 | −10<br>−45 | −24<br>−59 | −38<br>−73 | −58<br>−93 | −78<br>−113 | −111<br>−146 |
| 100–120 | +17,5<br>−17,5 | +10<br>−25 | 0<br>−35 | −10<br>−45 | −24<br>−59 | −41<br>−76 | −66<br>−101 | −91<br>−126 | −131<br>−166 |
| 120–140 | +20<br>−20 | +12<br>−28 | 0<br>−40 | −12<br>−52 | −28<br>−68 | −48<br>−88 | −77<br>−117 | −107<br>−147 | −155<br>−195 |
| 140–160 | +20<br>−20 | +12<br>−28 | 0<br>−40 | −12<br>−52 | −28<br>−68 | −50<br>−90 | −85<br>−125 | −119<br>−159 | −175<br>−215 |
| 160–180 | +20<br>−20 | +12<br>−28 | 0<br>−40 | −12<br>−52 | −28<br>−68 | −53<br>−93 | −93<br>−133 | −131<br>−171 | −195<br>−235 |
| 180–200 | +23<br>−23 | +13<br>−33 | 0<br>−46 | −14<br>−60 | −33<br>−79 | −60<br>−106 | −105<br>−151 | −149<br>−195 | −219<br>−265 |
| 200–225 | +23<br>−23 | +13<br>−33 | 0<br>−46 | −14<br>−60 | −33<br>−79 | −63<br>−109 | −113<br>−159 | −163<br>−209 | −241<br>−287 |
| 225–250 | +23<br>−23 | +13<br>−33 | 0<br>−46 | −14<br>−60 | −33<br>−79 | −67<br>−113 | −123<br>−169 | −179<br>−225 | −267<br>−313 |
| 250–280 | +26<br>−26 | +16<br>−36 | 0<br>−52 | −14<br>−66 | −36<br>−88 | −74<br>−126 | −138<br>−190 | −198<br>−250 | −295<br>−347 |
| 280–315 | +26<br>−26 | +16<br>−36 | 0<br>−52 | −14<br>−66 | −36<br>−88 | −78<br>−130 | −150<br>−202 | −220<br>−272 | −330<br>−382 |
| 315–355 | +28,5<br>−28,5 | +17<br>−40 | 0<br>−57 | −16<br>−73 | −41<br>−98 | −87<br>−144 | −169<br>−226 | −247<br>−304 | −369<br>−426 |
| 355–400 | +28,5<br>−28,5 | +17<br>−40 | 0<br>−57 | −16<br>−73 | −41<br>−98 | −93<br>−150 | −187<br>−244 | −273<br>−330 | −414<br>−471 |
| 400–450 | +31,5<br>−31,5 | +18<br>−45 | 0<br>−63 | −17<br>−80 | −45<br>−108 | −103<br>−166 | −209<br>−272 | −307<br>−370 | −467<br>−530 |
| 450–500 | +31,5<br>−31,5 | +18<br>−45 | 0<br>−63 | −17<br>−80 | −45<br>−108 | −109<br>−172 | −229<br>−292 | −337<br>−400 | −517<br>−580 |

### Aksler — klaring

| Mål over–til [mm] | d9 | e8 | f7 | g6 | h5 | h6 | h7 | h8 | h9 | h11 |
|---|---|---|---|---|---|---|---|---|---|---|
| til 3 | −20<br>−45 | −14<br>−28 | −6<br>−16 | −2<br>−8 | 0<br>−4 | 0<br>−6 | 0<br>−10 | 0<br>−14 | 0<br>−25 | 0<br>−60 |
| 3–6 | −30<br>−60 | −20<br>−38 | −10<br>−22 | −4<br>−12 | 0<br>−5 | 0<br>−8 | 0<br>−12 | 0<br>−18 | 0<br>−30 | 0<br>−75 |
| 6–10 | −40<br>−76 | −25<br>−47 | −13<br>−28 | −5<br>−14 | 0<br>−6 | 0<br>−9 | 0<br>−15 | 0<br>−22 | 0<br>−36 | 0<br>−90 |
| 10–18 | −50<br>−93 | −32<br>−59 | −16<br>−34 | −6<br>−17 | 0<br>−8 | 0<br>−11 | 0<br>−18 | 0<br>−27 | 0<br>−43 | 0<br>−110 |
| 18–30 | −65<br>−117 | −40<br>−73 | −20<br>−41 | −7<br>−20 | 0<br>−9 | 0<br>−13 | 0<br>−21 | 0<br>−33 | 0<br>−52 | 0<br>−130 |
| 30–50 | −80<br>−142 | −50<br>−89 | −25<br>−50 | −9<br>−25 | 0<br>−11 | 0<br>−16 | 0<br>−25 | 0<br>−39 | 0<br>−62 | 0<br>−160 |
| 50–80 | −100<br>−174 | −60<br>−106 | −30<br>−60 | −10<br>−29 | 0<br>−13 | 0<br>−19 | 0<br>−30 | 0<br>−46 | 0<br>−74 | 0<br>−190 |
| 80–120 | −120<br>−207 | −72<br>−126 | −36<br>−71 | −12<br>−34 | 0<br>−15 | 0<br>−22 | 0<br>−35 | 0<br>−54 | 0<br>−87 | 0<br>−220 |
| 120–180 | −145<br>−245 | −85<br>−148 | −43<br>−83 | −14<br>−39 | 0<br>−18 | 0<br>−25 | 0<br>−40 | 0<br>−63 | 0<br>−100 | 0<br>−250 |
| 180–250 | −170<br>−285 | −100<br>−172 | −50<br>−96 | −15<br>−44 | 0<br>−20 | 0<br>−29 | 0<br>−46 | 0<br>−72 | 0<br>−115 | 0<br>−290 |
| 250–315 | −190<br>−320 | −110<br>−191 | −56<br>−108 | −17<br>−49 | 0<br>−23 | 0<br>−32 | 0<br>−52 | 0<br>−81 | 0<br>−130 | 0<br>−320 |
| 315–400 | −210<br>−350 | −125<br>−214 | −62<br>−119 | −18<br>−54 | 0<br>−25 | 0<br>−36 | 0<br>−57 | 0<br>−89 | 0<br>−140 | 0<br>−360 |
| 400–500 | −230<br>−385 | −135<br>−232 | −68<br>−131 | −20<br>−60 | 0<br>−27 | 0<br>−40 | 0<br>−63 | 0<br>−97 | 0<br>−155 | 0<br>−400 |

### Aksler — overgang og press

| Mål over–til [mm] | js6 | k6 | m6 | n6 | p6 | r6 | s6 | t6 | u6 | x6 |
|---|---|---|---|---|---|---|---|---|---|---|
| til 3 | +3<br>−3 | +6<br>0 | +8<br>+2 | +10<br>+4 | +12<br>+6 | +16<br>+10 | +20<br>+14 | – | +24<br>+18 | +26<br>+20 |
| 3–6 | +4<br>−4 | +9<br>+1 | +12<br>+4 | +16<br>+8 | +20<br>+12 | +23<br>+15 | +27<br>+19 | – | +31<br>+23 | +36<br>+28 |
| 6–10 | +4,5<br>−4,5 | +10<br>+1 | +15<br>+6 | +19<br>+10 | +24<br>+15 | +28<br>+19 | +32<br>+23 | – | +37<br>+28 | +43<br>+34 |
| 10–14 | +5,5<br>−5,5 | +12<br>+1 | +18<br>+7 | +23<br>+12 | +29<br>+18 | +34<br>+23 | +39<br>+28 | – | +44<br>+33 | +51<br>+40 |
| 14–18 | +5,5<br>−5,5 | +12<br>+1 | +18<br>+7 | +23<br>+12 | +29<br>+18 | +34<br>+23 | +39<br>+28 | – | +44<br>+33 | +56<br>+45 |
| 18–24 | +6,5<br>−6,5 | +15<br>+2 | +21<br>+8 | +28<br>+15 | +35<br>+22 | +41<br>+28 | +48<br>+35 | – | +54<br>+41 | +67<br>+54 |
| 24–30 | +6,5<br>−6,5 | +15<br>+2 | +21<br>+8 | +28<br>+15 | +35<br>+22 | +41<br>+28 | +48<br>+35 | +54<br>+41 | +61<br>+48 | +77<br>+64 |
| 30–40 | +8<br>−8 | +18<br>+2 | +25<br>+9 | +33<br>+17 | +42<br>+26 | +50<br>+34 | +59<br>+43 | +64<br>+48 | +76<br>+60 | +96<br>+80 |
| 40–50 | +8<br>−8 | +18<br>+2 | +25<br>+9 | +33<br>+17 | +42<br>+26 | +50<br>+34 | +59<br>+43 | +70<br>+54 | +86<br>+70 | +113<br>+97 |
| 50–65 | +9,5<br>−9,5 | +21<br>+2 | +30<br>+11 | +39<br>+20 | +51<br>+32 | +60<br>+41 | +72<br>+53 | +85<br>+66 | +106<br>+87 | +141<br>+122 |
| 65–80 | +9,5<br>−9,5 | +21<br>+2 | +30<br>+11 | +39<br>+20 | +51<br>+32 | +62<br>+43 | +78<br>+59 | +94<br>+75 | +121<br>+102 | +165<br>+146 |
| 80–100 | +11<br>−11 | +25<br>+3 | +35<br>+13 | +45<br>+23 | +59<br>+37 | +73<br>+51 | +93<br>+71 | +113<br>+91 | +146<br>+124 | +200<br>+178 |
| 100–120 | +11<br>−11 | +25<br>+3 | +35<br>+13 | +45<br>+23 | +59<br>+37 | +76<br>+54 | +101<br>+79 | +126<br>+104 | +166<br>+144 | +232<br>+210 |
| 120–140 | +12,5<br>−12,5 | +28<br>+3 | +40<br>+15 | +52<br>+27 | +68<br>+43 | +88<br>+63 | +117<br>+92 | +147<br>+122 | +195<br>+170 | +273<br>+248 |
| 140–160 | +12,5<br>−12,5 | +28<br>+3 | +40<br>+15 | +52<br>+27 | +68<br>+43 | +90<br>+65 | +125<br>+100 | +159<br>+134 | +215<br>+190 | +305<br>+280 |
| 160–180 | +12,5<br>−12,5 | +28<br>+3 | +40<br>+15 | +52<br>+27 | +68<br>+43 | +93<br>+68 | +133<br>+108 | +171<br>+146 | +235<br>+210 | +335<br>+310 |
| 180–200 | +14,5<br>−14,5 | +33<br>+4 | +46<br>+17 | +60<br>+31 | +79<br>+50 | +106<br>+77 | +151<br>+122 | +195<br>+166 | +265<br>+236 | +379<br>+350 |
| 200–225 | +14,5<br>−14,5 | +33<br>+4 | +46<br>+17 | +60<br>+31 | +79<br>+50 | +109<br>+80 | +159<br>+130 | +209<br>+180 | +287<br>+258 | +414<br>+385 |
| 225–250 | +14,5<br>−14,5 | +33<br>+4 | +46<br>+17 | +60<br>+31 | +79<br>+50 | +113<br>+84 | +169<br>+140 | +225<br>+196 | +313<br>+284 | +454<br>+425 |
| 250–280 | +16<br>−16 | +36<br>+4 | +52<br>+20 | +66<br>+34 | +88<br>+56 | +126<br>+94 | +190<br>+158 | +250<br>+218 | +347<br>+315 | +507<br>+475 |
| 280–315 | +16<br>−16 | +36<br>+4 | +52<br>+20 | +66<br>+34 | +88<br>+56 | +130<br>+98 | +202<br>+170 | +272<br>+240 | +382<br>+350 | +557<br>+525 |
| 315–355 | +18<br>−18 | +40<br>+4 | +57<br>+21 | +73<br>+37 | +98<br>+62 | +144<br>+108 | +226<br>+190 | +304<br>+268 | +426<br>+390 | +626<br>+590 |
| 355–400 | +18<br>−18 | +40<br>+4 | +57<br>+21 | +73<br>+37 | +98<br>+62 | +150<br>+114 | +244<br>+208 | +330<br>+294 | +471<br>+435 | +696<br>+660 |
| 400–450 | +20<br>−20 | +45<br>+5 | +63<br>+23 | +80<br>+40 | +108<br>+68 | +166<br>+126 | +272<br>+232 | +370<br>+330 | +530<br>+490 | +780<br>+740 |
| 450–500 | +20<br>−20 | +45<br>+5 | +63<br>+23 | +80<br>+40 | +108<br>+68 | +172<br>+132 | +292<br>+252 | +400<br>+360 | +580<br>+540 | +860<br>+820 |

</div>

## Valg av pasning

### Klaring, overgang eller press

| Type | Kjennetegn | Betingelse |
|---|---|---|
| Klaringspasning | Alltid klaring | Minste hull er større enn eller lik største aksel |
| Overgangspasning | Klaring eller pressmonn, avhengig av hvor i toleransefeltene delene havner | Toleransefeltene overlapper |
| Presspasning | Alltid pressmonn | Største hull er mindre enn eller lik minste aksel |

### Anbefalte pasninger — hullbasis

ISO 286-1, figur 12. Disse dekker de fleste behov i vanlig maskinbygging.

| Hull | Klaringspasning | Overgangspasning | Presspasning |
|---|---|---|---|
| **H6** | g5 h5 | js5 k5 m5 | n5 p5 |
| **H7** | f6 g6 h6 | js6 k6 m6 n6 | p6 r6 s6 t6 u6 x6 |
| **H8** | e7 f7 h7 d8 e8 f8 h8 | js7 k7 m7 | s7 u7 |
| **H9** | d8 e8 f8 h8 | – | – |
| **H10** | b9 c9 d9 e9 h9 | – | – |
| **H11** | b11 c11 d10 h10 | – | – |

### Anbefalte pasninger — akselbasis

ISO 286-1, figur 13.

| Aksel | Klaringspasning | Overgangspasning | Presspasning |
|---|---|---|---|
| **h5** | G6 H6 | JS6 K6 M6 | N6 P6 |
| **h6** | F7 G7 H7 | JS7 K7 M7 N7 | P7 R7 S7 T7 U7 X7 |
| **h7** | E8 F8 H8 | – | – |
| **h8** | D9 E9 F9 H9 | – | – |
| **h9** | E8 F8 H8 D9 E9 F9 H9 B11 C10 D10 H10 | – | – |

### Typisk bruk

Beskrivelsene er **vanlig praksis, ikke hentet fra standarden**. Hvordan en pasning oppfører seg avhenger av diameter, lengde, overflate og materiale.

| Hullbasis | Akselbasis | Karakter | Typisk bruk |
|---|---|---|---|
| H11/c11 | C11/h11 | Svært stor klaring | Deler som skal gå lett sammen. Hengsler, bolter i grove hull, skitne eller varme omgivelser |
| H10/d9 | D10/h9 | Stor klaring | Løse løpepasninger, lange lagringer, deler med store temperaturforskjeller |
| H8/f7 | F8/h7 | Løpepasning | Smurte glidelagre, aksler som roterer i foring |
| H7/g6 | G7/h6 | Glidepasning | Nøyaktig styring, deler som skal forskyves eller dreies sakte. Lite slark |
| H7/h6 | H7/h6 | Styrepasning | Kan skyves sammen for hånd når delene er smurt. Sentrering, deler som ofte demonteres |
| H7/js6 | JS7/h6 | Lett overgang | Monteres med lett slag. Deler som skal sitte støtt, men kunne tas av |
| H7/k6 | K7/h6 | Overgang | Nøyaktig plassering. Monteres med plasthammer. Nav og tannhjul som låses med kile |
| H7/n6 | N7/h6 | Stram overgang | Monteres med presse eller kraftige slag. Sjelden demontering |
| H7/p6 | P7/h6 | Lett press | Foringer og hylser i tynnveggede eller myke deler |
| H7/r6 | R7/h6 | Middels press | Foringer og nav uten ekstra låsing ved moderat last |
| H7/s6 | S7/h6 | Press | Varige forbindelser. Monteres med presse eller ved oppvarming / nedkjøling |
| H7/u6 | U7/h6 | Kraftig press | Krympeforbindelser. Må regnes på |

Presspasninger som skal overføre kraft må kontrolleres med beregning av flatetrykk og spenninger. Se [Presspassninger og tykkvegga rør](../notes/presspassninger-og-tykkvegga-rør.md) og [Press-passning kalkulator](../calculators/press-fit-calculator.md).

For innkjøpte deler bestemmer delen den ene toleransen. Følg leverandørens anbefaling for den andre, særlig for rullelagre.

## Klaring og pressmonn

Beregningen er den samme for alle pasninger (ISO 286-1, tillegg B.2):

$$
\text{strammest} = EI - es \qquad\qquad \text{løsest} = ES - ei
$$

Positivt svar er klaring, negativt svar er pressmonn.

| Pasning | Hull | Aksel | Strammest | Løsest | Type |
|---|---|---|---|---|---|
| Ø36 H8/f7 | +39 / 0 | −25 / −50 | 0 − (−25) = +25 | 39 − (−50) = +89 | Klaring 0,025–0,089 mm |
| Ø36 H7/n6 | +25 / 0 | +33 / +17 | 0 − 33 = −33 | 25 − 17 = +8 | Overgang: fra 0,033 mm pressmonn til 0,008 mm klaring |
| Ø36 H7/s6 | +25 / 0 | +59 / +43 | 0 − 59 = −59 | 25 − 43 = −18 | Pressmonn 0,018–0,059 mm |

**Spredningen** til en pasning er løsest minus strammest, og er alltid lik summen av de to toleransene: $IT_{hull} + IT_{aksel}$. For de tre eksemplene blir det 64, 41 og 41 µm.

### Fra ønsket klaring til toleranseklasse

Framgangsmåten i ISO 286-1 tillegg B.4. [Pasningsvelgeren](../calculators/pasningsvelger.md) gjør det samme automatisk.

Eksempel: Ø40, ønsket klaring fra 24 til 92 µm.

1. **Spredning:** 92 − 24 = 68 µm. Summen av de to toleransene må være 68 µm eller mindre.
2. **Toleransegrader:** halve spredningen er 34 µm. I raden 30–50 mm ligger det mellom IT7 = 25 og IT8 = 39. Summen er 64 µm, som er innenfor. Hullet får den groveste: IT8.
3. **Hullet:** hullbasis gir H8, altså +39 / 0.
4. **Akselen:** minste klaring skal være 24 µm, så øvre avvik må være omkring −24 µm. Nærmeste grunnavvik er f med −25. Akselen blir f7, altså −25 / −50.
5. **Kontroll:** Ø40 H8/f7 gir klaring 25–89 µm. Ønsket var 24–92 µm.

Den som har ansvaret for funksjonen må avgjøre om avviket fra de beregnede grensene kan godtas. Hvis ikke, skrives de beregnede avvikene direkte på tegningen i stedet for en toleranseklasse.

## Angivelse på tegning

| Skrivemåte | Betydning |
|---|---|
| Ø32 H7 | Nominelt mål og toleranseklasse |
| Ø32 $^{+0{,}025}_{\;\;0}$ | Samme krav skrevet med grenseavvik. De to skrivemåtene er likeverdige |
| Ø32 H7 $\left(^{+0{,}025}_{\;\;0}\right)$ | Toleranseklasse med avvikene i parentes som hjelpeopplysning |
| Ø52 H7/g6 | Pasning, på sammenstillingstegning. Hullet står først |
| Ø32 H7 Ⓔ | Med omhyllingskrav: delen skal i tillegg holde seg innenfor en perfekt sylinder med størst materialmål |

Skriv gjerne avvikene i parentes på verkstedtegninger. Da slipper operatøren å slå opp.

## Grunnavvik

Tabellene gir grunnavviket i µm. Det andre grenseavviket regnes ut med standardtoleransen, se [Fra toleranseklasse til grenseavvik](#fra-toleranseklasse-til-grenseavvik). En strek betyr at bokstaven ikke er definert for det målet.

<div class="nb-compact-tables" markdown="1">

### Aksler a–h

Øvre grenseavvik $es$. Gjelder alle toleransegrader.

| Mål over–til [mm] | a | b | c | cd | d | e | ef | f | fg | g | h |
|---|---|---|---|---|---|---|---|---|---|---|---|
| til 3 | −270 | −140 | −60 | −34 | −20 | −14 | −10 | −6 | −4 | −2 | 0 |
| 3–6 | −270 | −140 | −70 | −46 | −30 | −20 | −14 | −10 | −6 | −4 | 0 |
| 6–10 | −280 | −150 | −80 | −56 | −40 | −25 | −18 | −13 | −8 | −5 | 0 |
| 10–14 | −290 | −150 | −95 | −70 | −50 | −32 | −23 | −16 | −10 | −6 | 0 |
| 14–18 | −290 | −150 | −95 | −70 | −50 | −32 | −23 | −16 | −10 | −6 | 0 |
| 18–24 | −300 | −160 | −110 | −85 | −65 | −40 | −25 | −20 | −12 | −7 | 0 |
| 24–30 | −300 | −160 | −110 | −85 | −65 | −40 | −25 | −20 | −12 | −7 | 0 |
| 30–40 | −310 | −170 | −120 | −100 | −80 | −50 | −35 | −25 | −15 | −9 | 0 |
| 40–50 | −320 | −180 | −130 | −100 | −80 | −50 | −35 | −25 | −15 | −9 | 0 |
| 50–65 | −340 | −190 | −140 | – | −100 | −60 | – | −30 | – | −10 | 0 |
| 65–80 | −360 | −200 | −150 | – | −100 | −60 | – | −30 | – | −10 | 0 |
| 80–100 | −380 | −220 | −170 | – | −120 | −72 | – | −36 | – | −12 | 0 |
| 100–120 | −410 | −240 | −180 | – | −120 | −72 | – | −36 | – | −12 | 0 |
| 120–140 | −460 | −260 | −200 | – | −145 | −85 | – | −43 | – | −14 | 0 |
| 140–160 | −520 | −280 | −210 | – | −145 | −85 | – | −43 | – | −14 | 0 |
| 160–180 | −580 | −310 | −230 | – | −145 | −85 | – | −43 | – | −14 | 0 |
| 180–200 | −660 | −340 | −240 | – | −170 | −100 | – | −50 | – | −15 | 0 |
| 200–225 | −740 | −380 | −260 | – | −170 | −100 | – | −50 | – | −15 | 0 |
| 225–250 | −820 | −420 | −280 | – | −170 | −100 | – | −50 | – | −15 | 0 |
| 250–280 | −920 | −480 | −300 | – | −190 | −110 | – | −56 | – | −17 | 0 |
| 280–315 | −1050 | −540 | −330 | – | −190 | −110 | – | −56 | – | −17 | 0 |
| 315–355 | −1200 | −600 | −360 | – | −210 | −125 | – | −62 | – | −18 | 0 |
| 355–400 | −1350 | −680 | −400 | – | −210 | −125 | – | −62 | – | −18 | 0 |
| 400–450 | −1500 | −760 | −440 | – | −230 | −135 | – | −68 | – | −20 | 0 |
| 450–500 | −1650 | −840 | −480 | – | −230 | −135 | – | −68 | – | −20 | 0 |

### Aksler j–zc

Nedre grenseavvik $ei$. For js gjelder $\pm\,IT/2$.

| Mål over–til [mm] | j5, j6 | j7 | j8 | k4–k7 | m | n | p | r | s | t | u | v | x | y | z | za | zb | zc |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| til 3 | −2 | −4 | −6 | 0 | +2 | +4 | +6 | +10 | +14 | – | +18 | – | +20 | – | +26 | +32 | +40 | +60 |
| 3–6 | −2 | −4 | – | +1 | +4 | +8 | +12 | +15 | +19 | – | +23 | – | +28 | – | +35 | +42 | +50 | +80 |
| 6–10 | −2 | −5 | – | +1 | +6 | +10 | +15 | +19 | +23 | – | +28 | – | +34 | – | +42 | +52 | +67 | +97 |
| 10–14 | −3 | −6 | – | +1 | +7 | +12 | +18 | +23 | +28 | – | +33 | – | +40 | – | +50 | +64 | +90 | +130 |
| 14–18 | −3 | −6 | – | +1 | +7 | +12 | +18 | +23 | +28 | – | +33 | +39 | +45 | – | +60 | +77 | +108 | +150 |
| 18–24 | −4 | −8 | – | +2 | +8 | +15 | +22 | +28 | +35 | – | +41 | +47 | +54 | +63 | +73 | +98 | +136 | +188 |
| 24–30 | −4 | −8 | – | +2 | +8 | +15 | +22 | +28 | +35 | +41 | +48 | +55 | +64 | +75 | +88 | +118 | +160 | +218 |
| 30–40 | −5 | −10 | – | +2 | +9 | +17 | +26 | +34 | +43 | +48 | +60 | +68 | +80 | +94 | +112 | +148 | +200 | +274 |
| 40–50 | −5 | −10 | – | +2 | +9 | +17 | +26 | +34 | +43 | +54 | +70 | +81 | +97 | +114 | +136 | +180 | +242 | +325 |
| 50–65 | −7 | −12 | – | +2 | +11 | +20 | +32 | +41 | +53 | +66 | +87 | +102 | +122 | +144 | +172 | +226 | +300 | +405 |
| 65–80 | −7 | −12 | – | +2 | +11 | +20 | +32 | +43 | +59 | +75 | +102 | +120 | +146 | +174 | +210 | +274 | +360 | +480 |
| 80–100 | −9 | −15 | – | +3 | +13 | +23 | +37 | +51 | +71 | +91 | +124 | +146 | +178 | +214 | +258 | +335 | +445 | +585 |
| 100–120 | −9 | −15 | – | +3 | +13 | +23 | +37 | +54 | +79 | +104 | +144 | +172 | +210 | +254 | +310 | +400 | +525 | +690 |
| 120–140 | −11 | −18 | – | +3 | +15 | +27 | +43 | +63 | +92 | +122 | +170 | +202 | +248 | +300 | +365 | +470 | +620 | +800 |
| 140–160 | −11 | −18 | – | +3 | +15 | +27 | +43 | +65 | +100 | +134 | +190 | +228 | +280 | +340 | +415 | +535 | +700 | +900 |
| 160–180 | −11 | −18 | – | +3 | +15 | +27 | +43 | +68 | +108 | +146 | +210 | +252 | +310 | +380 | +465 | +600 | +780 | +1000 |
| 180–200 | −13 | −21 | – | +4 | +17 | +31 | +50 | +77 | +122 | +166 | +236 | +284 | +350 | +425 | +520 | +670 | +880 | +1150 |
| 200–225 | −13 | −21 | – | +4 | +17 | +31 | +50 | +80 | +130 | +180 | +258 | +310 | +385 | +470 | +575 | +740 | +960 | +1250 |
| 225–250 | −13 | −21 | – | +4 | +17 | +31 | +50 | +84 | +140 | +196 | +284 | +340 | +425 | +520 | +640 | +820 | +1050 | +1350 |
| 250–280 | −16 | −26 | – | +4 | +20 | +34 | +56 | +94 | +158 | +218 | +315 | +385 | +475 | +580 | +710 | +920 | +1200 | +1550 |
| 280–315 | −16 | −26 | – | +4 | +20 | +34 | +56 | +98 | +170 | +240 | +350 | +425 | +525 | +650 | +790 | +1000 | +1300 | +1700 |
| 315–355 | −18 | −28 | – | +4 | +21 | +37 | +62 | +108 | +190 | +268 | +390 | +475 | +590 | +730 | +900 | +1150 | +1500 | +1900 |
| 355–400 | −18 | −28 | – | +4 | +21 | +37 | +62 | +114 | +208 | +294 | +435 | +530 | +660 | +820 | +1000 | +1300 | +1650 | +2100 |
| 400–450 | −20 | −32 | – | +5 | +23 | +40 | +68 | +126 | +232 | +330 | +490 | +595 | +740 | +920 | +1100 | +1450 | +1850 | +2400 |
| 450–500 | −20 | −32 | – | +5 | +23 | +40 | +68 | +132 | +252 | +360 | +540 | +660 | +820 | +1000 | +1250 | +1600 | +2100 | +2600 |

- k: verdien gjelder IT4–IT7. For IT3 og finere og for IT8 og grovere er $ei = 0$.
- m–zc: verdiene gjelder alle toleransegrader.

### Hull A–H

Nedre grenseavvik $EI$. Gjelder alle toleransegrader.

| Mål over–til [mm] | A | B | C | CD | D | E | EF | F | FG | G | H |
|---|---|---|---|---|---|---|---|---|---|---|---|
| til 3 | +270 | +140 | +60 | +34 | +20 | +14 | +10 | +6 | +4 | +2 | 0 |
| 3–6 | +270 | +140 | +70 | +46 | +30 | +20 | +14 | +10 | +6 | +4 | 0 |
| 6–10 | +280 | +150 | +80 | +56 | +40 | +25 | +18 | +13 | +8 | +5 | 0 |
| 10–14 | +290 | +150 | +95 | +70 | +50 | +32 | +23 | +16 | +10 | +6 | 0 |
| 14–18 | +290 | +150 | +95 | +70 | +50 | +32 | +23 | +16 | +10 | +6 | 0 |
| 18–24 | +300 | +160 | +110 | +85 | +65 | +40 | +28 | +20 | +12 | +7 | 0 |
| 24–30 | +300 | +160 | +110 | +85 | +65 | +40 | +28 | +20 | +12 | +7 | 0 |
| 30–40 | +310 | +170 | +120 | +100 | +80 | +50 | +35 | +25 | +15 | +9 | 0 |
| 40–50 | +320 | +180 | +130 | +100 | +80 | +50 | +35 | +25 | +15 | +9 | 0 |
| 50–65 | +340 | +190 | +140 | – | +100 | +60 | – | +30 | – | +10 | 0 |
| 65–80 | +360 | +200 | +150 | – | +100 | +60 | – | +30 | – | +10 | 0 |
| 80–100 | +380 | +220 | +170 | – | +120 | +72 | – | +36 | – | +12 | 0 |
| 100–120 | +410 | +240 | +180 | – | +120 | +72 | – | +36 | – | +12 | 0 |
| 120–140 | +460 | +260 | +200 | – | +145 | +85 | – | +43 | – | +14 | 0 |
| 140–160 | +520 | +280 | +210 | – | +145 | +85 | – | +43 | – | +14 | 0 |
| 160–180 | +580 | +310 | +230 | – | +145 | +85 | – | +43 | – | +14 | 0 |
| 180–200 | +660 | +340 | +240 | – | +170 | +100 | – | +50 | – | +15 | 0 |
| 200–225 | +740 | +380 | +260 | – | +170 | +100 | – | +50 | – | +15 | 0 |
| 225–250 | +820 | +420 | +280 | – | +170 | +100 | – | +50 | – | +15 | 0 |
| 250–280 | +920 | +480 | +300 | – | +190 | +110 | – | +56 | – | +17 | 0 |
| 280–315 | +1050 | +540 | +330 | – | +190 | +110 | – | +56 | – | +17 | 0 |
| 315–355 | +1200 | +600 | +360 | – | +210 | +125 | – | +62 | – | +18 | 0 |
| 355–400 | +1350 | +680 | +400 | – | +210 | +125 | – | +62 | – | +18 | 0 |
| 400–450 | +1500 | +760 | +440 | – | +230 | +135 | – | +68 | – | +20 | 0 |
| 450–500 | +1650 | +840 | +480 | – | +230 | +135 | – | +68 | – | +20 | 0 |

### Hull J, K, M og N

Øvre grenseavvik $ES$. For JS gjelder $\pm\,IT/2$.

| Mål over–til [mm] | J6 | J7 | J8 | K til IT8 | M til IT8 | M over IT8 | N til IT8 | N over IT8 |
|---|---|---|---|---|---|---|---|---|
| til 3 | +2 | +4 | +6 | 0 | −2 | −2 | −4 | −4 |
| 3–6 | +5 | +6 | +10 | −1 + Δ | −4 + Δ | −4 | −8 + Δ | 0 |
| 6–10 | +5 | +8 | +12 | −1 + Δ | −6 + Δ | −6 | −10 + Δ | 0 |
| 10–14 | +6 | +10 | +15 | −1 + Δ | −7 + Δ | −7 | −12 + Δ | 0 |
| 14–18 | +6 | +10 | +15 | −1 + Δ | −7 + Δ | −7 | −12 + Δ | 0 |
| 18–24 | +8 | +12 | +20 | −2 + Δ | −8 + Δ | −8 | −15 + Δ | 0 |
| 24–30 | +8 | +12 | +20 | −2 + Δ | −8 + Δ | −8 | −15 + Δ | 0 |
| 30–40 | +10 | +14 | +24 | −2 + Δ | −9 + Δ | −9 | −17 + Δ | 0 |
| 40–50 | +10 | +14 | +24 | −2 + Δ | −9 + Δ | −9 | −17 + Δ | 0 |
| 50–65 | +13 | +18 | +28 | −2 + Δ | −11 + Δ | −11 | −20 + Δ | 0 |
| 65–80 | +13 | +18 | +28 | −2 + Δ | −11 + Δ | −11 | −20 + Δ | 0 |
| 80–100 | +16 | +22 | +34 | −3 + Δ | −13 + Δ | −13 | −23 + Δ | 0 |
| 100–120 | +16 | +22 | +34 | −3 + Δ | −13 + Δ | −13 | −23 + Δ | 0 |
| 120–140 | +18 | +26 | +41 | −3 + Δ | −15 + Δ | −15 | −27 + Δ | 0 |
| 140–160 | +18 | +26 | +41 | −3 + Δ | −15 + Δ | −15 | −27 + Δ | 0 |
| 160–180 | +18 | +26 | +41 | −3 + Δ | −15 + Δ | −15 | −27 + Δ | 0 |
| 180–200 | +22 | +30 | +47 | −4 + Δ | −17 + Δ | −17 | −31 + Δ | 0 |
| 200–225 | +22 | +30 | +47 | −4 + Δ | −17 + Δ | −17 | −31 + Δ | 0 |
| 225–250 | +22 | +30 | +47 | −4 + Δ | −17 + Δ | −17 | −31 + Δ | 0 |
| 250–280 | +25 | +36 | +55 | −4 + Δ | −20 + Δ | −20 | −34 + Δ | 0 |
| 280–315 | +25 | +36 | +55 | −4 + Δ | −20 + Δ | −20 | −34 + Δ | 0 |
| 315–355 | +29 | +39 | +60 | −4 + Δ | −21 + Δ | −21 | −37 + Δ | 0 |
| 355–400 | +29 | +39 | +60 | −4 + Δ | −21 + Δ | −21 | −37 + Δ | 0 |
| 400–450 | +33 | +43 | +66 | −5 + Δ | −23 + Δ | −23 | −40 + Δ | 0 |
| 450–500 | +33 | +43 | +66 | −5 + Δ | −23 + Δ | −23 | −40 + Δ | 0 |

- «+ Δ» betyr at verdien fra Δ-tabellen under skal legges til.
- K over IT8 er bare definert til og med 3 mm, og er da 0.

### Hull P–ZC

Øvre grenseavvik $ES$ for toleransegrader **over IT7**. Til og med IT7 skal verdien økes med Δ.

| Mål over–til [mm] | P | R | S | T | U | V | X | Y | Z | ZA | ZB | ZC |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| til 3 | −6 | −10 | −14 | – | −18 | – | −20 | – | −26 | −32 | −40 | −60 |
| 3–6 | −12 | −15 | −19 | – | −23 | – | −28 | – | −35 | −42 | −50 | −80 |
| 6–10 | −15 | −19 | −23 | – | −28 | – | −34 | – | −42 | −52 | −67 | −97 |
| 10–14 | −18 | −23 | −28 | – | −33 | – | −40 | – | −50 | −64 | −90 | −130 |
| 14–18 | −18 | −23 | −28 | – | −33 | −39 | −45 | – | −60 | −77 | −108 | −150 |
| 18–24 | −22 | −28 | −35 | – | −41 | −47 | −54 | −63 | −73 | −98 | −136 | −188 |
| 24–30 | −22 | −28 | −35 | −41 | −48 | −55 | −64 | −75 | −88 | −118 | −160 | −218 |
| 30–40 | −26 | −34 | −43 | −48 | −60 | −68 | −80 | −94 | −112 | −148 | −200 | −274 |
| 40–50 | −26 | −34 | −43 | −54 | −70 | −81 | −97 | −114 | −136 | −180 | −242 | −325 |
| 50–65 | −32 | −41 | −53 | −66 | −87 | −102 | −122 | −144 | −172 | −226 | −300 | −405 |
| 65–80 | −32 | −43 | −59 | −75 | −102 | −120 | −146 | −174 | −210 | −274 | −360 | −480 |
| 80–100 | −37 | −51 | −71 | −91 | −124 | −146 | −178 | −214 | −258 | −335 | −445 | −585 |
| 100–120 | −37 | −54 | −79 | −104 | −144 | −172 | −210 | −254 | −310 | −400 | −525 | −690 |
| 120–140 | −43 | −63 | −92 | −122 | −170 | −202 | −248 | −300 | −365 | −470 | −620 | −800 |
| 140–160 | −43 | −65 | −100 | −134 | −190 | −228 | −280 | −340 | −415 | −535 | −700 | −900 |
| 160–180 | −43 | −68 | −108 | −146 | −210 | −252 | −310 | −380 | −465 | −600 | −780 | −1000 |
| 180–200 | −50 | −77 | −122 | −166 | −236 | −284 | −350 | −425 | −520 | −670 | −880 | −1150 |
| 200–225 | −50 | −80 | −130 | −180 | −258 | −310 | −385 | −470 | −575 | −740 | −960 | −1250 |
| 225–250 | −50 | −84 | −140 | −196 | −284 | −340 | −425 | −520 | −640 | −820 | −1050 | −1350 |
| 250–280 | −56 | −94 | −158 | −218 | −315 | −385 | −475 | −580 | −710 | −920 | −1200 | −1550 |
| 280–315 | −56 | −98 | −170 | −240 | −350 | −425 | −525 | −650 | −790 | −1000 | −1300 | −1700 |
| 315–355 | −62 | −108 | −190 | −268 | −390 | −475 | −590 | −730 | −900 | −1150 | −1500 | −1900 |
| 355–400 | −62 | −114 | −208 | −294 | −435 | −530 | −660 | −820 | −1000 | −1300 | −1650 | −2100 |
| 400–450 | −68 | −126 | −232 | −330 | −490 | −595 | −740 | −920 | −1100 | −1450 | −1850 | −2400 |
| 450–500 | −68 | −132 | −252 | −360 | −540 | −660 | −820 | −1000 | −1250 | −1600 | −2100 | −2600 |

### Δ-verdier for hull K–ZC

| Mål over–til [mm] | IT3 | IT4 | IT5 | IT6 | IT7 | IT8 |
|---|---|---|---|---|---|---|
| til 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| 3–6 | 1 | 1,5 | 1 | 3 | 4 | 6 |
| 6–10 | 1 | 1,5 | 2 | 3 | 6 | 7 |
| 10–18 | 1 | 2 | 3 | 3 | 7 | 9 |
| 18–30 | 1,5 | 2 | 3 | 4 | 8 | 12 |
| 30–50 | 1,5 | 3 | 4 | 5 | 9 | 14 |
| 50–80 | 2 | 3 | 5 | 6 | 11 | 16 |
| 80–120 | 2 | 4 | 5 | 7 | 13 | 19 |
| 120–180 | 3 | 4 | 6 | 7 | 15 | 23 |
| 180–250 | 3 | 4 | 6 | 9 | 17 | 26 |
| 250–315 | 4 | 4 | 7 | 9 | 20 | 29 |
| 315–400 | 4 | 5 | 7 | 11 | 21 | 32 |
| 400–500 | 5 | 5 | 7 | 13 | 23 | 34 |

</div>

## Kilder

- ISO 286-1:2010, *Geometrical product specifications (GPS) — ISO code system for tolerances on linear sizes — Part 1: Basis of tolerances, deviations and fits*. Tabell 1–5, figur 10–13, pkt. 4 og 5, tillegg A og B.
- Avsnittene «Toleransegrader og bearbeidingsmetode» og «Typisk bruk» er lærebokverdier og verkstedpraksis, ikke fra standarden.

### Om kildene

Tallene i tabellene for standardtoleranser, grunnavvik og Δ er hentet maskinelt fra standarden, ikke skrevet av for hånd. Regnemåten er kontrollert mot alle regneeksemplene i standarden (pkt. 4.3 og tillegg B). Følgende er likevel ikke verifisert mot kilden:

- **Fotnotene til tabell 2–5** var ikke lesbare i kildefilen. Tre regler som normalt står der er tatt med etter andre kilder: A, B, a og b brukes ikke til og med 1 mm, N over IT8 brukes ikke til og med 1 mm, og M6 for 250–315 mm har $ES = -9$ i stedet for −11.
- **Grenseavvikstabellene** for vanlige toleranseklasser er regnet ut, ikke lest fra ISO 286-2. De er stikkprøvekontrollert mot kjente verdier, men ikke sammenholdt tall for tall med ISO 286-2.
- **ef for 18–30 mm** står som −25 i kildefilen, mens EF står som +28. Alle andre bokstaver A–H er speilbilder av a–h, så en av de to er trolig en trykkfeil. Begge er gjengitt slik de står.
- **Førstevalgene** som standarden rammer inn i figur 10–13 lot seg ikke lese sikkert fra kildefilen, og er ikke markert.
- **Mål over 500 mm**: grunnavvik for 500–3150 mm finnes i standarden, men er ikke tatt med her.
- Rettelser til standarden (ISO 286-1:2010/Cor 1:2013) er ikke kontrollert.
