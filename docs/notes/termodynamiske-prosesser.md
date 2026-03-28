---
title: Termodynamiske prosesser – enkel forklaring
summary: Kort forklaring av vanlige termodynamiske prosesser og hvordan de kan brukes sammen med tabellene på siden.
tags:
  - Termodynamikk
  - Prosesser
  - Varmepumpe
type: note
updated: 2026-03-27
---

# Termodynamiske prosesser – enkel forklaring

I praksis beskriver en **termodynamisk prosess** hvordan et medium (vann, kjølemedium, luft osv.) endrer tilstand når ett eller flere forhold endrer seg.

De vanligste prosessene beskrives ved hva som **holdes konstant**.

Disse brukes mye i analyse av varmepumper, kjøleanlegg, kompressorer, varmevekslere osv.

Finn tabellverdier for de ulike prosessene her:
[Termodynamiske tabeller](../calculators/thermodynamics.md)

---

# Isobar prosess (konstant trykk)

**Trykket er konstant.**

Typiske eksempler:

- varmevekslere
- kondensatorer
- fordampere
- oppvarming eller nedkjøling av væske i rør

Eksempel:

Hvis et kjølemedium går gjennom en **kondensator**, vil trykket normalt være omtrent konstant mens temperaturen og entalpien endrer seg.

---

# Isokor prosess (konstant volum)

**Volumet er konstant.**

Dette skjer i systemer hvor mediet er fanget i et lukket volum.

Typiske eksempler:

- trykktanker
- beholdere
- gass i en lukket tank som varmes opp

Hvis temperaturen øker i en lukket tank vil trykket øke fordi volumet ikke kan endre seg.

---

# Isoterm prosess (konstant temperatur)

**Temperaturen er konstant.**

Dette skjer når varme tilføres eller fjernes akkurat så raskt at temperaturen ikke endrer seg, eksempelvis om du lar en gass tilføres varme, men lar volumet utvide seg akkurat så raskt at temperaturen holdes konstant.

Typiske eksempler:

- faseendring (koking eller kondensasjon)
- væske og damp i likevekt
- enkelte kompresjonsprosesser i teori

Under **koking** av vann er temperaturen konstant mens energi tilføres.

---

# Isentrop prosess (konstant entropi)

**Entropien er konstant.**

Dette beskriver en **ideell, reversibel prosess uten varmetap**.

I praksis brukes den ofte som **teoretisk referanse**.

Typiske eksempler:

- ideell kompresjon i kompressor
- ideell ekspansjon i turbin

Virkelige maskiner har alltid tap, men man sammenligner ofte mot den isentropiske prosessen for å beregne virkningsgrad, eller motsatt dersom man veit virkningsgraden.

---

# Isentalpisk prosess (konstant entalpi)

**Entalpien er konstant.**

Dette skjer når trykket reduseres uten at arbeid utføres eller varme tilføres.

Typiske eksempler:

- ekspansjonsventiler
- strupeventiler
- kapillarrør i kjøleanlegg

Dette er veldig vanlig i kjøleteknikk.

Når kjølemediet går gjennom en **ekspansjonsventil**, faller trykket kraftig mens entalpien er omtrent konstant.

---

# Hvordan bruke termodynamiske tabeller

[Tabellen](../calculators/thermodynamics.md) viser hvordan et medium oppfører seg under en bestemt prosess.

Du velger:

1. medium (for eksempel vann eller R134a)
2. prosess (for eksempel isobar)
3. hvilken tabell som passer til tilstanden din

Deretter kan du finne tilstanden som ligger nærmest måleverdiene dine.

---

# Eksempel – feilsøking på varmepumpe

Anta at du jobber på en varmepumpe og måler:

- kondensatortrykk: **10 bar**
- temperatur på kjølemediet: **45 °C**

Du kan da:

1. velge riktig medium (f.eks. R134a)
2. velge **isobar prosess**
3. finne tabellen for **P = 10 bar**
4. se etter raden nær **45 °C**

I tabellen kan du da lese av:

- entalpi
- tetthet
- entropi
- fase (væske/damp)

Hvis du sammenligner **entalpien før og etter en komponent** kan du estimere:

- varmeeffekt i kondensator
- effekt i fordamper
- mulig feil i ekspansjonsventil
- om kjølemediet er overhetet eller underkjølt

Dette gir ofte nok informasjon til å forstå hva som skjer i systemet uten avanserte beregninger.

---

# Kort huskeregel

| Prosess | Hva er konstant |
|-------|----------------|
| Isobar | Trykk |
| Isokor | Volum |
| Isoterm | Temperatur |
| Isentrop | Entropi |
| Isentalpisk | Entalpi |

---