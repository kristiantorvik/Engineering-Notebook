---
title: Ohms lov
summary: Relasjonen mellom spenning, straum og resistans i en likestrømskrets.
tags:
  - Elektrisk
  - Engineering
type: formel
search_words: ohm, ohms law, spenning, voltage, straum, current, resistans, resistance
updated: 2026-05-10
---

# Ohms lov
Den mest grunnleggende sammenhengen i elektroteknikk: Spenningen over en resistans er proporsjonal med straumen gjennom den. Brukes overalt — fra å rekne ut sikringsstørrelse til å estimere varmetap i en leder.

---

## Formel

$$
\huge U = R \cdot I
$$

Omskreven:

$$
\large R = \dfrac{U}{I} \qquad I = \dfrac{U}{R}
$$

---

## Variabler
$U =$ Spenning over komponenten ($V$, Volt)
$I =$ Straum gjennom komponenten ($A$, Ampere)
$R =$ Resistans ($\Omega$, Ohm)

---

## Enheter og antagelser
SI-enheter: Volt, Ampere, Ohm.

Gjeld for **ohmske** komponentar — det vil seie der $R$ er konstant uavhengig av spenning og straum (typiske motstandar, varmekablar, lyspærer ved konstant temperatur).

For halvleiarar (diodar, transistorar) og ikkje-lineære komponentar gjeld **ikkje** ohms lov direkte — der må ein bruke karakteristikk-kurva.

For vekselstraum erstatt $R$ med impedans $Z$ — sjå [Impedans](impedans.md).

Resistans varierer med temperatur — for presisjons-rekning må ein korrigere for $\alpha \cdot \Delta T$, men for "serviettmatematikk" på 20 °C er formelen god nok.

---

## Eksempel

**1) Varmekabel i golvvarme:** Ein varmekabel trekk 6,5 A på 230 V. Kva er resistansen?

$R = \dfrac{U}{I} = \dfrac{230 \, V}{6{,}5 \, A} \approx 35{,}4 \, \Omega$

**2) Spenningsfall over shunt:** Du har ein 0,01 Ω shuntmotstand og måler 50 mV over han. Kor mykje straum går?

$I = \dfrac{U}{R} = \dfrac{0{,}05 \, V}{0{,}01 \, \Omega} = 5 \, A$

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
U = R \cdot I
$$
```

**Python:**
```python
def ohm(U=None, I=None, R=None):
    """Ohms lov. Gje to verdiar, få den tredje."""
    if U is None:  return I * R
    if I is None:  return U / R
    if R is None:  return U / I
    raise ValueError("Gje nøyaktig to av U, I, R")
```

---

## Relatert
- [Elektrisk effekt](elektrisk-effekt.md)
- [Resistans i leder](resistans-leder.md)
- [Impedans](impedans.md)
