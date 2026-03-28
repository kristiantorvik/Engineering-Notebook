---
title: Termodynamiske egenskaper
summary: Kort forklaring av de viktigste termodynamiske egenskapene som vises i tabellene, Forklarer Temperatur, Trykk, Tetthet, Spesifikt volum, Indre energi, Entalpi, Entropi, Varmekapasitet Cp og Cv og dampfraksjon / kvalitet.
tags:
  - Termodynamikk
  - Varmepumpe
  - Egenskaper
type: note
search_words:
updated: 2026-03-27
---

# Termodynamiske egenskaper

Disse beskriver tilstanden til stoffet og hvordan det oppfører seg i et system.

Du finner tabeller for disse verdiene i [Termodynamiske tabeller](../calculators/thermodynamics.md)

---

# Temperatur ($T$)

Temperatur forteller hvor varmt eller kaldt mediet er.

Vanlige enheter:

- $°C$
- $K$

Temperaturen påvirker blant annet:

- trykk
- tetthet
- fase (væske eller gass)

---

# Trykk ($P$)

Trykk er kraft per areal.

Vanlige enheter:

- $Pa$
- $kPa$
- $bar$

Trykket bestemmer ofte **hvilken temperatur et medium koker eller kondenserer ved**.

Eksempel:

Hvis trykket øker i en kondensator vil kondensasjonstemperaturen også øke.

---

# Tetthet ($ρ$)

Tetthet sier hvor mye masse som finnes i et volum.

Enhet: $kg/m³$

Tetthet er viktig for:

- masseflow
- pumpestørrelse
- volumstrøm

Gasser har mye lavere tetthet enn væsker.

---

# Spesifikt volum ($v$)

Spesifikt volum er volum per masse, atså den inverse av tetthet.

Enhet: $m³/kg$

Formel: $v = \dfrac{1}{ρ}$

Dette brukes ofte i termodynamiske beregninger.

---

# Indre energi ($u$)

Indre energi er energien lagret i molekylene i stoffet.
Energien lagret i trykk er då ikkje med her.

Enhet: $kJ/kg$

Den brukes mer i teoretisk analyse enn i praktisk kjøleteknikk.

---

# Entalpi ($h$)

Entalpi er en av de viktigste størrelsene i kjøleteknikk.

Enhet:
- $J/kg$
- $kJ/kg$

Entalpi kan tolkes som **energiinnholdet i mediet**.
Entalpi er da den indre energien pluss energien lagret av trykket. og kan då faktisk beregnast ut ifrå den indre energien $u$ med : $h = u + pv$

Derfor blir entalpi veldig mykje brukt da den er direkte energien som må tilførast for å få et medium frå ein tilstand til ein annar.

Når et medium går gjennom en komponent kan man bruke forskjellen i entalpi til å finne varme, effekt i pumper, turbiner, kjeler osv.

Eksempel:

Varmeeffekt i kondensator, pumpe, prosess etc:

$Q = ṁ \cdot (h_{inn} − h_{ut})$

$Q$ : Effekt $kW$
$ṁ$ : massestrøm $kg/s$
$h$ : Entalpi $kJ/kg$

---

# Entropi ($s$)

Entropi beskriver hvor "spredt" energien i systemet er.

Enhet: $\dfrac{kJ}{kg·K}$

I praksis brukes entropi mest til å:

- beskrive ideelle prosesser
- beregne virkningsgrad
- analysere kompressorer og turbiner

En **isentrop prosess** betyr at entropien er konstant.

---

# Varmekapasitet ($c_p$ og $c_v$)

Disse forteller hvor mye energi som må til for å øke temperaturen.

$c_p$ = varmekapasitet ved konstant trykk  
$c_v$ = varmekapasitet ved konstant volum

Enhet: $\dfrac{J}{kg·K}$

Disse brukes blant annet i:

- energiberegninger
- gassanalyser
- forbrenning

---

# Kvalitet / dampfraksjon ($x$)

Kvalitet brukes når et medium er en **blanding av væske og damp**.

Verdien går fra:

0 → bare væske  
1 → bare damp

Eksempel:

$x$ = 0.25 betyr at massen består av:

- 25 % damp
- 75 % væske

Dette er vanlig i:

- fordamper
- kondensator
- faseendring i kjølemedier

---

# Fase

Fase forteller hvilken tilstand mediet er i.

Vanlige faser:

- væske
- damp
- to-fase (væske + damp)
- superopphetet damp
- komprimert væske

---

# Hvordan bruke egenskapene i praksis

Når du bruker tabellene kan du:

1. finne en tilstand som ligner på måleverdiene dine
2. lese av egenskapene
3. sammenligne før og etter en komponent

Typisk bruk i et kjøleanlegg:

- entalpi → beregne varmeeffekt
- temperatur → kontrollere driftspunkt
- trykk → kontrollere metningstemperatur
- kvalitet → se om væske/damp er tilstede

Ofte holder det å bruke **trykk, temperatur og entalpi** for å forstå hva som skjer i systemet.

---

# Kort huskeregel

| Egenskap | Hva den forteller |
|--------|------------------|
| Temperatur | hvor varmt mediet er |
| Trykk | hvor hardt mediet presses |
| Tetthet | hvor kompakt stoffet er |
| Entalpi | energiinnhold |
| Entropi | energiens tilstand / orden |
| Kvalitet | hvor mye som er damp |

---

Disse verdiene brukes sammen med prosess-tabellene for å forstå hvordan et medie oppfører seg gjennom en komponent eller prosess.