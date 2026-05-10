---
title: Turtal i elektromotor
summary: Synkront turtal og virkelig turtal (med slipp) for ein vekselstrømsmotor utfra polar og frekvens.
tags:
  - Elektrisk
  - Engineering
  - Motor
type: formel
search_words: turtal, rpm, motor, synkron, asynkron, slipp, slip, poler, polpar, frekvens, induksjon
updated: 2026-05-10
---

# Turtal i elektromotor
Det synkrone turtalet til ein vekselstrømsmotor er låst til nettfrekvensen og polantalet — det er det roterande magnetfeltet i statoren som dikterer farten. For ein **synkronmotor** roterer rotoren akkurat like fort. For ein **asynkronmotor** (induksjonsmotor — den klart vanlegaste i industrien) ligg rotoren litt etter med ein **slipp** $s$, typisk 2–5 %.

Brukast til å velje motor med rett turtal for ei gitt mekanisk last (pumpe, vifte, gir), og til å rekne fram og tilbake mellom motorturtal og frekvensomformer-utgangsfrekvens.

---

## Formel

**Synkront turtal** (frå polantal):

$$
\huge n_s = \dfrac{120 \cdot f}{p}
$$

**Eller frå polpar** ($p_p = p/2$):

$$
\large n_s = \dfrac{60 \cdot f}{p_p}
$$

**Verkeleg turtal med slipp** (asynkronmotor):

$$
\huge n = n_s \cdot (1 - s)
$$

**Slipp** kan reknast tilbake frå målt turtal:

$$
\large s = \dfrac{n_s - n}{n_s}
$$

---

## Variabler
$n_s =$ Synkront turtal ($o/min$, RPM)
$n =$ Verkeleg (mekanisk) turtal ($o/min$, RPM)
$f =$ Nettfrekvens / matefrekvens ($Hz$) — i Noreg 50 Hz, eller frekvensomformar-utgang
$p =$ Antal polar (alltid eit partal: 2, 4, 6, 8, …)
$p_p =$ Antal polpar, $p/2$
$s =$ Slipp (–, ofte oppgitt i %)

---

## Enheter og antagelser
Faktoren **120** kjem av at polantalet $p$ er heile polar (ikkje polpar) og $f$ er i Hz, mens turtalet kjem ut i o/min: $120 = 60 \, s/min \cdot 2$ polar/polpar.

For SI (radianer per sekund): $\omega_s = 2\pi f / p_p$.

Synkronmotor: $s = 0$ alltid (med mindre han fell ut av synkron).
Asynkronmotor: $s$ er typisk
- 2–3 % ved fullast for store motorar (>10 kW),
- 4–6 % for mindre motorar,
- 100 % i blokkert tilstand (rotoren står).

Slipp er **ikkje** konstant — han veks med lasta. Tomgangs-slipp er nær 0, fullast-slipp står på namneskiltet (eller rekn det frå namneturtalet).

Med **frekvensomformer (FU)** er det $f$ ein styrer — derfor kan ein få vilkårleg turtal mellom 0 og typisk 1,5–2× nominell.

### Standard turtal ved 50 Hz nett

| Polar $p$ | Polpar $p_p$ | $n_s$ (synkron) | Typisk $n$ (asynkron, fullast) |
| --------: | -----------: | --------------: | -----------------------------: |
| 2         | 1            | 3000            | 2850–2950                      |
| 4         | 2            | 1500            | 1420–1470                      |
| 6         | 3            | 1000            | 940–970                        |
| 8         | 4            | 750             | 700–730                        |
| 10        | 5            | 600             | 560–580                        |
| 12        | 6            | 500             | 470–485                        |

Ved 60 Hz (USA-nett) blir alle tala 20 % høgare.

---

## Eksempel

**1) Standard 4-polig motor på 50 Hz:**

$n_s = \dfrac{120 \cdot 50}{4} = 1500 \, o/min$

Namneskiltet seier 1450 o/min ved fullast → slipp:

$s = \dfrac{1500 - 1450}{1500} \approx 0{,}033 = 3{,}3\,\%$

**2) Frekvensomformer-styrt vifte:** Same motor (4-polig, $n_s$ ved 50 Hz = 1500 o/min) blir matet med 35 Hz frå ein FU. Slipp held seg ca. lik (~3 %) ved same dreiemoment.

$n_s = \dfrac{120 \cdot 35}{4} = 1050 \, o/min$

$n = 1050 \cdot (1 - 0{,}033) \approx 1015 \, o/min$

→ ca. 68 % av nominelt turtal, som svarar til ca. $0{,}68^3 \approx 31\,\%$ av nominelt vifte-effektbehov (vifte-affinitetslova, kubisk).

**3) Bestem polantal frå namneskilt:** Namneskiltet seier 970 o/min ved 50 Hz. Synkront turtal må vera litt over → 1000 o/min → 6-polig motor. Slipp: $(1000-970)/1000 = 3\,\%$.

---

## Utledning

I ein 3-fase stator med $p_p$ polpar lager dei tre fasestraumane (forskuva 120° i tid og rom) eit roterande magnetfelt. Eit fullt omløp av feltet krev $p_p$ heile periodar av straumen — så feltet roterer:

$\large n_s \, [o/sek] = \dfrac{f}{p_p}$

Gang med 60 for å få o/min, og bruk $p_p = p/2$:

$\large n_s = \dfrac{60 \cdot f}{p_p} = \dfrac{120 \cdot f}{p}$

I asynkronmotor må rotoren ligge **etter** det roterande feltet for at fluksen gjennom rotorvindingane skal endre seg og indusere straum (Lenz/Faraday). Utan denne relative bevegelsen — ingen rotor-straum og ingen dreiemoment. Slippen $s$ måler nett denne relative farten.

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
n_s = \dfrac{120 \cdot f}{p}
$$

$$
n = n_s \cdot (1 - s)
$$
```

**Python:**
```python
def synkront_turtal(f=50, polar=4):
    """Synkront turtal [o/min] frå frekvens [Hz] og antal polar."""
    return 120 * f / polar

def turtal(f=50, polar=4, slipp=0.03):
    """Verkeleg turtal [o/min] for asynkronmotor."""
    return synkront_turtal(f, polar) * (1 - slipp)

def slipp_fra_namneskilt(n_namne, f=50, polar=4):
    """Slipp (–) utrekna frå namneturtal og synkront turtal."""
    n_s = synkront_turtal(f, polar)
    return (n_s - n_namne) / n_s
```

---

## Relatert
- [Trefase effekt](trefase-effekt.md)
- [Reaktans](reaktans.md)
