---
title: Bjelkekalkulator — nedbøying, moment og spenning
summary: Reknar nedbøying, bøyemoment, bøyespenning og opplagerkrefter for bjelkar med ulike opplagringar og laster. Vel standard stålprofil (IPE, HE-A, HE-B, hulprofil, rør, U, L) eller legg inn eigne tverrsnittsmål.
tags:
  - Styrkeberegning
  - Engineering
type: kalkulator
search_words: bjelke, bjelkekalkulator, nedbøying, nedbøyning, utbøying, bøyespenning, bøyemoment, opplagerkrefter, fritt opplagt, utkragar, utkrager, fast innspent, overheng, punktlast, fordelt last, eigenvekt, egenvekt, IPE, HEA, HEB, hulprofil, firkantrør, rør, flattstål, aksel, treghetsmoment, motstandsmoment, beam calculator, deflection, bending stress, bending moment, simply supported, cantilever
updated: 2026-11-13
---

# Bjelkekalkulator — nedbøying, moment og spenning

Reknar største nedbøying, bøyemoment og bøyespenning for ein bjelke, og opplagerkreftene. Vel opplagring og last, vel eit tverrsnitt, og les av resultatet. Svaret oppdaterer seg medan du skriv.

- **Formlane** kalkulatoren byggjer på: [Bjelkeformlar — nedbøying og bøyespenning](../notes/bjelkeformlar.md)
- **Profildata** ($I$, $W$, areal, masse): [Ståltabeller — tverrsnittsdata for stålprofil](../reference/staalprofiler-tabeller.md)
- **Kva $I$ og $W$ er**, og korleis dei blir rekna ut: [Arealmoment, treghetsmoment og motstandsmoment](../notes/treghetsmoment-motstandsmoment.md)

---

## Kalkulator

<link rel="stylesheet" href="../../assets/css/bjelkekalkulator.css">
<div class="calc-card" id="bk-calc">
<div class="bk-section">1 — Opplagring og last</div>
<div class="bk-row">
<div>
<div class="bk-grid">
<div class="bk-group bk-wide"><label for="bk-case">Lasttilfelle</label><select id="bk-case"></select></div>
<div class="bk-group"><label for="bk-L">Lengde / spennvidde, L <span class="bk-unit">[mm]</span></label><input type="number" id="bk-L" value="2000" min="0" step="10"></div>
<div class="bk-group" id="bk-a-group"><label for="bk-a"><span id="bk-a-label">a</span> <span class="bk-unit">[mm]</span></label><input type="number" id="bk-a" value="500" min="0" step="10"></div>
<div class="bk-group"><label for="bk-load" id="bk-load-label">Last</label><div class="bk-inline"><input type="number" id="bk-load" value="5" min="0" step="0.1"><select id="bk-load-unit" aria-label="Eining for last"></select></div></div>
</div>
<label class="bk-check"><input type="checkbox" id="bk-selfweight"> Ta med eigenvekta til bjelken (som jamt fordelt last)</label>
</div>
<img class="bk-figure" id="bk-case-img" alt="">
</div>
<div class="bk-section">2 — Tverrsnitt</div>
<div class="bk-grid">
<div class="bk-group bk-wide"><label for="bk-mode">Korleis vil du gi tverrsnittet?</label><select id="bk-mode"><option value="standard">Standard stålprofil frå tabell</option><option value="custom">Eigne mål på tverrsnittet</option><option value="direct">Legg inn I og W direkte</option></select></div>
</div>
<div id="bk-mode-standard">
<div class="bk-row" style="margin-top:0.6rem">
<div>
<div class="bk-grid">
<div class="bk-group"><label for="bk-family">Profiltype</label><select id="bk-family"></select></div>
<div class="bk-group"><label for="bk-size">Dimensjon</label><select id="bk-size"></select></div>
<div class="bk-group" id="bk-axis-group"><label for="bk-axis">Bøying om akse</label><select id="bk-axis"><option value="y">y–y</option><option value="z">z–z</option></select></div>
</div>
<p class="bk-hint">Aksane er viste i figuren. Lasta verkar vinkelrett på bøyeaksen. For I-, H- og rektangulære hulprofil er y–y den sterke aksen.</p>
</div>
<img class="bk-figure bk-figure-profile" id="bk-profile-img" alt="">
</div>
</div>
<div id="bk-mode-custom">
<div class="bk-grid" style="margin-top:0.6rem">
<div class="bk-group bk-wide"><label for="bk-shape">Form</label><select id="bk-shape"></select></div>
<div class="bk-group" id="bk-dim0-group"><label for="bk-dim0"><span id="bk-dim0-label"></span> <span class="bk-unit">[mm]</span></label><input type="number" id="bk-dim0" min="0" step="0.1"></div>
<div class="bk-group" id="bk-dim1-group"><label for="bk-dim1"><span id="bk-dim1-label"></span> <span class="bk-unit">[mm]</span></label><input type="number" id="bk-dim1" min="0" step="0.1"></div>
<div class="bk-group" id="bk-dim2-group"><label for="bk-dim2"><span id="bk-dim2-label"></span> <span class="bk-unit">[mm]</span></label><input type="number" id="bk-dim2" min="0" step="0.1"></div>
<div class="bk-group" id="bk-dim3-group"><label for="bk-dim3"><span id="bk-dim3-label"></span> <span class="bk-unit">[mm]</span></label><input type="number" id="bk-dim3" min="0" step="0.1"></div>
</div>
<p class="bk-hint">Lasta verkar langs høgda h. Bøyinga er om den vassrette aksen gjennom tyngdepunktet.</p>
</div>
<div id="bk-mode-direct">
<div class="bk-grid" style="margin-top:0.6rem">
<div class="bk-group"><label for="bk-I">Arealmoment, I <span class="bk-unit">[mm⁴]</span></label><input type="number" id="bk-I" value="1710000" min="0" step="any"></div>
<div class="bk-group"><label for="bk-W">Motstandsmoment, W <span class="bk-unit">[mm³]</span></label><input type="number" id="bk-W" value="34200" min="0" step="any"></div>
<div class="bk-group"><label for="bk-mass">Masse <span class="bk-unit">[kg/m] — berre for eigenvekt</span></label><input type="number" id="bk-mass" value="8.1" min="0" step="0.1"></div>
</div>
<p class="bk-hint">1 cm⁴ = 10 000 mm⁴ og 1 cm³ = 1000 mm³. Store tal kan skrivast som 1.71e6.</p>
</div>
<div class="bk-section">3 — Material</div>
<div class="bk-grid">
<div class="bk-group"><label for="bk-material">Material</label><select id="bk-material"></select></div>
<div class="bk-group"><label for="bk-E">E-modul, E <span class="bk-unit">[MPa]</span></label><input type="number" id="bk-E" min="0" step="1000"></div>
<div class="bk-group"><label for="bk-fy">Flytegrense, f<sub>y</sub> <span class="bk-unit">[MPa]</span></label><input type="number" id="bk-fy" min="0" step="5"></div>
<div class="bk-group"><label for="bk-rho">Tettleik, ρ <span class="bk-unit">[kg/m³]</span></label><input type="number" id="bk-rho" min="0" step="50"></div>
</div>
<p class="bk-hint">Materialvalet fyller inn E, f<sub>y</sub> og ρ. Du kan overstyre tala. Flytegrensa blir berre brukt til å vise utnytting, og tettleiken berre til eigenvekt.</p>
<div id="bk-error" class="bk-error" style="display:none"></div>
<div id="bk-results" style="display:none"></div>
</div>
<script src="../../assets/js/bjelkekalkulator.js"></script>

---

## Slik les du resultatet

| Resultat | Tyding |
| --- | --- |
| $\delta_{max}$ | Største nedbøying, og kvar på bjelken ho er. «L/860» tyder at nedbøyinga er 1/860 av spennvidda $L$. |
| $M_{max}$ | Største bøyemoment (talverdi). Ved fast innspenning er det ofte ved veggen. |
| $\sigma_{max}$ | Største bøyespenning, $\sigma = M_{max}/W$. Utnytting er $\sigma_{max}/f_y$, og tryggleiksfaktoren er $f_y/\sigma_{max}$. |
| $R_A$, $R_B$ | Opplagerkrefter. «Nedover» tyder at opplageret må halde bjelken nede. |
| $M_A$, $M_B$ | Moment som innfestinga må ta opp ved fast innspenning. |
| $V_{max}$ | Største skjærkraft. |

Diagramma viser forma på nedbøyinga og momentet langs bjelken. Momentet er teikna på strekksida.

Tillaten spenning og krav til nedbøying må du vurdere sjølv. Sjå [Føresetnader](../notes/bjelkeformlar.md#fresetnader) i notatet for tommelfingerverdiar.

---

## Slik reknar kalkulatoren

Kalkulatoren brukar den same bjelketeorien som formlane i [bjelkeformlar-notatet](../notes/bjelkeformlar.md), og gir same svar for alle 17 lasttilfella der. I staden for éin ferdig formel per tilfelle reknar han ut momentet langs bjelken og integrerer:

$$\Large E I \cdot y''(x) = M(x) \qquad \sigma_{max} = \dfrac{M_{max}}{W}$$

Då kan **eigenvekta** leggjast til som jamt fordelt last og summerast rett i kvart punkt (superposisjon), også når maksverdiane ikkje ligg på same stad.

**Eigenvekt:** $q = m' \cdot g$, der $m' = A \cdot \rho$ er masse per meter. For standardprofil er arealet $A$ henta frå tabellen.

**Standardprofil:** $I$, $W$ og $A$ blir lesne rett frå tabellane i [Ståltabeller](../reference/staalprofiler-tabeller.md).

**Eigne mål** — formlane som blir brukte (sjå [Arealmoment, treghetsmoment og motstandsmoment](../notes/treghetsmoment-motstandsmoment.md)):

| Form | $I$ | $W$ |
| --- | --- | --- |
| Rektangel $b \times h$ | $\dfrac{b h^3}{12}$ | $\dfrac{b h^2}{6}$ |
| Massiv rund, diameter $d$ | $\dfrac{\pi d^4}{64}$ | $\dfrac{\pi d^3}{32}$ |
| Rør, ytre $D$, indre $d = D - 2t$ | $\dfrac{\pi (D^4 - d^4)}{64}$ | $\dfrac{I}{D/2}$ |
| Rektangulært hulprofil $h \times b \times t$ | $\dfrac{b h^3 - (b - 2t)(h - 2t)^3}{12}$ | $\dfrac{I}{h/2}$ |
| I-profil $h \times b$, steg $s$, flens $t$ | $\dfrac{b h^3 - (b - s)(h - 2t)^3}{12}$ | $\dfrac{I}{h/2}$ |

Hulprofil og I-profil under «eigne mål» er rekna med skarpe hjørne. Valsa profil har avrunda hjørne, så tabellverdiane for standardprofil avvik litt.

---

## Føresetnader

- Lineært elastisk materiale, rett bjelke med konstant tverrsnitt, små nedbøyingar.
- Slank bjelke ($L/h$ over ca. 10). Skjærdeformasjon er ikkje med.
- Lasta verkar gjennom skjærsenteret og gir ikkje vriding. Det er viktig for U- og L-profil.
- Vipping, knekking og lokal buling av tynne veggar er **ikkje** kontrollert.
- Statisk last. Ingen lastfaktorar eller materialfaktorar er lagde inn.
- Tabellverdiane gjeld varmvalsa stålprofil. Vel du eit anna material på eit standardprofil, blir E-modul og tettleik bytte, men måla er dei same.

Kalkulatoren er eit hjelpemiddel for overslag. Berande konstruksjonar skal dimensjonerast etter gjeldande standard.

---

## Eksempel

IPE 100 fritt opplagt over 2000 mm med 5 kN i midten (standardverdiane i kalkulatoren) gir $\delta_{max} = 2{,}32$ mm, $M_{max} = 2{,}5$ kNm og $\sigma_{max} = 73{,}1$ MPa. Det er same svar som i [eksempel 1 i bjelkeformlar-notatet](../notes/bjelkeformlar.md#eksempel).

---

## Relatert
- [Bjelkeformlar — nedbøying og bøyespenning](../notes/bjelkeformlar.md)
- [Ståltabeller — tverrsnittsdata for stålprofil](../reference/staalprofiler-tabeller.md)
- [Arealmoment, treghetsmoment og motstandsmoment](../notes/treghetsmoment-motstandsmoment.md)
- [Material-egenskaper](../reference/material-egenskaper.md)
- [Knekking / Buckling](../notes/knekking.md)
