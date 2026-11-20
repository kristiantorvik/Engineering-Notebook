---
title: Pasningsvelger — finn ISO-pasning ut fra ønsket klaring eller pressmonn
summary: Still inn ønsket minste og største klaring eller pressmonn og hvordan toleransen skal fordeles mellom hull og aksel. Kalkulatoren foreslår de tre ISO 286-pasningene som treffer best, med grenseavvik, grensemål og faktisk klaring eller pressmonn.
tags:
  - Toleranser
  - Maskinelementer
  - Engineering
  - maskinering
type: kalkulator
search_words: pasning, passning, pasningsvelger, passningsvelger, pasningspar, passningspar, pasningskalkulator, passningskalkulator, ISO 286, ISO-toleranse, toleranseklasse, toleransegrad, IT-grad, H7, g6, h6, k6, n6, p6, s6, H7/g6, hullbasis, akselbasis, klaring, pressmonn, overmål, presspasning, presspassning, klaringspasning, overgangspasning, grenseavvik, grensemål, fit calculator, limits and fits, clearance, interference, transition fit
updated: 2026-11-15
---

# Pasningsvelger

Finner ISO-pasningene (hull / aksel) som gir den klaringen eller det pressmonnet du ønsker. Still inn det strammeste og det løseste tilfellet du kan godta, og hvor mye av toleransen som skal ligge på hullet. Svaret oppdaterer seg mens du drar i sliderne.

- **Tabellene** bak kalkulatoren: [ISO 286 — toleranser og pasninger](../reference/iso-286-toleranser.md)
- **Hvor mye pressmonn trengs?** Regn det ut i [Press-passning kalkulator](press-fit-calculator.md), og finn pasningen her.

**Fortegn:** klaring er positiv, pressmonn er negativt. Sliderne går fra pressmonn (venstre) til klaring (høyre).

---

## Kalkulator

<link rel="stylesheet" href="../../assets/css/pasningsvelger.css">
<div class="calc-card" id="pv-calc">
<div class="pv-section">1 — Mål og ønsket pasning</div>
<div class="pv-grid">
<div class="pv-group"><label for="pv-d">Nominelt mål (diameter) <span class="pv-unit">[mm]</span></label><input type="number" id="pv-d" value="40" min="0" max="500" step="1"></div>
</div>
<div class="pv-slider">
<label for="pv-tight-range">Strammeste tilfelle — minste klaring / største pressmonn <span class="pv-unit">[µm]</span></label>
<div class="pv-slider-row"><input type="range" id="pv-tight-range" min="-190" max="190" step="1" value="5" aria-label="Strammeste tilfelle"><input type="number" id="pv-tight" value="5" step="1" aria-label="Strammeste tilfelle i mikrometer"></div>
<div class="pv-scale"><span>← pressmonn</span><span>0</span><span>klaring →</span></div>
<div class="pv-readout" id="pv-tight-text"></div>
</div>
<div class="pv-slider">
<label for="pv-loose-range">Løseste tilfelle — største klaring / minste pressmonn <span class="pv-unit">[µm]</span></label>
<div class="pv-slider-row"><input type="range" id="pv-loose-range" min="-190" max="190" step="1" value="50" aria-label="Løseste tilfelle"><input type="number" id="pv-loose" value="50" step="1" aria-label="Løseste tilfelle i mikrometer"></div>
<div class="pv-scale"><span>← pressmonn</span><span>0</span><span>klaring →</span></div>
<div class="pv-readout" id="pv-loose-text"></div>
</div>
<p class="pv-hint" id="pv-window-text"></p>
<p class="pv-hint">Negativt tall = pressmonn. Tallfeltet kan gå utenfor området til slideren. 1 µm = 0,001 mm.</p>
<div class="pv-section">2 — Fordeling av toleranse mellom hull og aksel</div>
<div class="pv-slider" style="margin-top:0">
<label for="pv-share">Andel av toleransen som legges på hullet</label>
<input type="range" id="pv-share" min="30" max="80" step="1" value="60">
<div class="pv-scale pv-scale-wide"><span>← strengest hull</span><span>strengest aksel →</span></div>
<div class="pv-readout" id="pv-share-text"></div>
</div>
<p class="pv-hint">Utvendige diametre er lettere å treffe og måle enn boringer. Derfor får hullet vanligvis én toleransegrad grovere enn akselen (ca. 60 % på hullet).</p>
<div class="pv-section">3 — Utvalg</div>
<div class="pv-grid">
<div class="pv-group pv-wide"><label for="pv-system">Pasningssystem</label><select id="pv-system"><option value="hole">Hullbasis — hull H (normalvalget)</option><option value="shaft">Akselbasis — aksel h</option><option value="free">Fritt — alle kombinasjoner</option></select></div>
</div>
<label class="pv-check"><input type="checkbox" id="pv-preferred" checked> Bare toleranseklasser fra standardens anbefalte utvalg (ISO 286-1, figur 10 og 11)</label>
<div id="pv-error" class="pv-error" style="display:none"></div>
<div id="pv-results" style="display:none"></div>
</div>
<script src="../../assets/js/iso286.js"></script>
<script src="../../assets/js/pasningsvelger.js"></script>

---

## Slik leser du resultatet

| Resultat | Betydning |
| --- | --- |
| Ø40 H7/g6 | Pasningen slik den skrives: nominelt mål, toleranseklasse for hullet, toleranseklasse for akselen. |
| Strammeste tilfelle | Minste hull mot største aksel. Minste klaring for en klaringspasning, største pressmonn for en presspasning. |
| Løseste tilfelle | Største hull mot minste aksel. Største klaring, eller minste pressmonn. |
| Grenseavvik | Øvre / nedre avvik fra nominelt mål i µm. |
| Grensemål | Minste og største tillatte mål i mm. Dette er tallene du måler mot. |
| Toleranse | Toleransegraden (IT) og bredden på toleransefeltet i µm. |
| Fordeling hull / aksel | Hvor stor del av pasningens spredning som ligger på hullet og på akselen. |
| Figuren | Toleransefeltene til hull og aksel i forhold til nullinjen (nominelt mål). De tre figurene har samme målestokk. |

**Merkelappene**

- **Klaringspasning** har alltid klaring. **Presspasning** har alltid pressmonn. **Overgangspasning** kan gi begge deler, avhengig av hvor i toleransefeltet delene havner.
- **Anbefalt i ISO 286-1** betyr at pasningen står i standardens utvalg av pasninger for vanlig maskinbygging (figur 12 og 13).
- **Delvis utenfor ønsket område** betyr at det strammeste eller løseste tilfellet går forbi grensen du satte. Feltet som bryter grensen er merket gult.

---

## Slik regner kalkulatoren

**Grenseavvik.** For hver toleranseklasse hentes grunnavviket (bokstaven) og standardtoleransen (tallet) fra tabellene i ISO 286-1, og det andre grenseavviket regnes ut slik standarden beskriver. Se [ISO 286 — toleranser og pasninger](../reference/iso-286-toleranser.md).

**Klaring og pressmonn** (ISO 286-1, tillegg B.2). Med $ES$, $EI$ for hullet og $es$, $ei$ for akselen:

$$\Large \text{strammest} = EI - es \qquad \text{løsest} = ES - ei$$

Positivt svar er klaring, negativt er pressmonn. Pasningens spredning er summen av de to toleransene: $\text{løsest} - \text{strammest} = IT_{hull} + IT_{aksel}$.

**Rangering.** Kalkulatoren prøver alle par av hull- og akselklasser i utvalget og gir hvert par poeng etter:

1. Hvor godt paret fyller det ønskede området. Å gå utenfor grensene teller seks ganger så tungt som å la noe av området stå ubrukt. Ubrukt område betyr strengere toleranser enn nødvendig.
2. Hvor nær fordelingen mellom hull og aksel ligger det du stilte inn.
3. Små tillegg i favør av pasninger og toleranseklasser som står i standardens anbefalte utvalg, og av pasninger med H-hull eller h-aksel.

Vektingen er et skjønn og er ikke hentet fra standarden. Vurder alltid alle tre forslagene.

**Utvalg**

| Valg | Hva som søkes gjennom |
| --- | --- |
| Hullbasis | Hull H kombinert med alle akselklasser. Normalvalget, fordi brotsjer og lærer finnes for H-hull. |
| Akselbasis | Aksel h kombinert med alle hullklasser. Aktuelt når akselen er blanktrukket eller slipt stang som ikke skal bearbeides. |
| Fritt | Alle kombinasjoner. Gir flere treff, men ofte uvanlige par. |
| Bare anbefalte klasser | Av: alle bokstaver med toleransegrad IT5–IT11 tas med. Mellombokstavene CD, EF og FG er utelatt. |

---

## Forutsetninger

- Nominelt mål fra over 0 til og med 500 mm.
- Klaring og pressmonn gjelder mål ved 20 °C og deler med perfekt form. Formavvik, ruhet og temperatur kommer i tillegg. For at pasningen skal holde det tabellen lover, må målene ha omhyllingskrav Ⓔ på tegningen. Se [Toleransesetting — ISO GPS](../notes/toleransesetting.md).
- Ved presspasninger jevnes ruhetstoppene ut ved montering, slik at virksomt pressmonn blir litt mindre enn målt. Se [Presspassninger og tykkvegga rør](../notes/presspassninger-og-tykkvegga-rør.md).
- Ytterpunktene (strammest og løsest) forutsetter at begge delene ligger helt i ytterkant av toleransefeltet samtidig. I serieproduksjon er det sjeldent.
- Kalkulatoren sier ikke om toleransene lar seg produsere med din maskin og metode. Se [oversikten over toleransegrader og bearbeidingsmetoder](../reference/iso-286-toleranser.md#toleransegrader-og-bearbeidingsmetode).

---

## Eksempel

Standardens eget regneeksempel (ISO 286-1, tillegg B.4): Ø40, ønsket klaring fra 24 til 92 µm. Sett nominelt mål til 40, strammeste tilfelle til 24 og løseste til 92. Første forslag blir **Ø40 H8/f7** med klaring 0,025–0,089 mm, som er svaret standarden kommer fram til.

---

## Relatert
- [ISO 286 — toleranser og pasninger](../reference/iso-286-toleranser.md)
- [Press-passning kalkulator](press-fit-calculator.md)
- [Presspassninger og tykkvegga rør](../notes/presspassninger-og-tykkvegga-rør.md)
- [Toleransesetting — ISO GPS](../notes/toleransesetting.md)
- [Kiler og kilspor — DIN 6885](../reference/kiler-og-kilspor.md)
