---
title: Resistans serie og parallell
summary: Erstatningsresistans for motstandar kopla i serie eller parallell.
tags:
  - Elektrisk
  - Engineering
type: formel
search_words: serie, parallell, parallel, series, erstatningsresistans, equivalent resistance, kombinasjon
updated: 2026-05-10
---

# Resistans i serie og parallell
Reduksjon av eit nett med motstandar til ein enkelt erstatningsresistans. Same prinsipp gjeld for impedansar i AC-krets, og (med snudd formel) for kondensatorar.

---

## Formel

**Serie** — straumen er den same gjennom alle, spenningane summerer:

$$
\huge R_{tot} = R_1 + R_2 + \dots + R_n = \sum_{i=1}^{n} R_i
$$

**Parallell** — spenninga er den same over alle, straumane summerer:

$$
\huge \dfrac{1}{R_{tot}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots + \dfrac{1}{R_n}
$$

**Spesialtilfelle for berre to motstandar i parallell** (svært nyttig hugsregel):

$$
\large R_{tot} = \dfrac{R_1 \cdot R_2}{R_1 + R_2}
$$

**N like motstandar i parallell** (annan hugsregel):

$$
\large R_{tot} = \dfrac{R}{N}
$$

---

## Variabler
$R_i =$ Den i-te motstanden ($\Omega$)
$R_{tot} =$ Erstatningsresistans ($\Omega$)
$N =$ Tal på like motstandar (–)

---

## Enheter og antagelser
SI-enheter: Ohm.

Same formlar gjeld for:
- **Impedans** i AC-krets — men då med kompleks aritmetikk ($Z_i = R_i + j X_i$).
- **Kondensatorar** — men *snudd*: kapasitansar i parallell summerer, og resiproke summerer i serie.
- **Induktansar** — same form som motstandar.

Hugsregel for serie/parallell:
- **Serie**: $R_{tot}$ er **alltid større** enn den største motstanden.
- **Parallell**: $R_{tot}$ er **alltid mindre** enn den minste motstanden.

(Bruk dette som sanity-sjekk.)

---

## Eksempel

**1) Blanda kopling:** $R_1 = 10 \, \Omega$ i serie med ($R_2 = 30 \, \Omega$ parallell $R_3 = 60 \, \Omega$). Krets matast med 12 V.

Først parallellen:

$R_{23} = \dfrac{R_2 \cdot R_3}{R_2 + R_3} = \dfrac{30 \cdot 60}{30 + 60} = \dfrac{1800}{90} = 20 \, \Omega$

Sanity: 20 Ω < 30 Ω (mindre enn minste). ✓

Så serien:

$R_{tot} = R_1 + R_{23} = 10 + 20 = 30 \, \Omega$

Total straum:

$I = \dfrac{U}{R_{tot}} = \dfrac{12}{30} = 0{,}4 \, A$

Spenninga over parallellen er $U_{23} = I \cdot R_{23} = 0{,}4 \cdot 20 = 8 \, V$, og straumane fordeler seg som $I_2 = 8/30 \approx 0{,}27 \, A$ og $I_3 = 8/60 \approx 0{,}13 \, A$ (sum 0,40 A — sjekk).

**2) Tre 6 Ω varmeelement parallell:**

$R_{tot} = \dfrac{R}{N} = \dfrac{6}{3} = 2 \, \Omega$

På 230 V: $I = 230/2 = 115 \, A$, $P = 230^2/2 = 26{,}5 \, kW$.

---

## Utledning

**Serie** følgjer av Kirchhoffs spenningslov: spenningane må summere til total spenning, og straumen $I$ er den same gjennom alle:

$U = U_1 + U_2 + \dots = I R_1 + I R_2 + \dots = I (R_1 + R_2 + \dots)$

Definer $R_{tot} = U/I$, og du har formelen.

**Parallell** følgjer av Kirchhoffs straumlov: straumane må summere, og spenninga $U$ er den same over alle:

$I = I_1 + I_2 + \dots = \dfrac{U}{R_1} + \dfrac{U}{R_2} + \dots = U \left(\dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots\right)$

Definer $R_{tot} = U/I$, og du får $1/R_{tot} = \sum 1/R_i$.

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
R_{tot} = R_1 + R_2 + \dots + R_n
$$

$$
\dfrac{1}{R_{tot}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots + \dfrac{1}{R_n}
$$
```

**Python:**
```python
def serie(*R):
    """Erstatningsresistans i serie."""
    return sum(R)

def parallell(*R):
    """Erstatningsresistans i parallell."""
    return 1 / sum(1 / r for r in R)
```

---

## Relatert
- [Ohms lov](ohms-lov.md)
- [Impedans](impedans.md)
