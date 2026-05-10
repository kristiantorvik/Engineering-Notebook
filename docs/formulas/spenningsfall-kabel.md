---
title: Spenningsfall i kabel
summary: Berekner spenningsfall over en kabel for 1-fase og 3-fase kursar.
tags:
  - Elektrisk
  - Engineering
type: formel
search_words: spenningsfall, voltage drop, kabel, NEK 400, dimensjonering, cable, ΔU
updated: 2026-05-10
---

# Spenningsfall i kabel
Spenninga ein tapar på veien frå tavla ut til lasta — viktig å sjekke ved lange kursar, store straumar eller små tverrsnitt. NEK 400 har grenser på typisk **3 % for belysning** og **5 % for andre laster** (måla frå tilknytningspunkt til siste utstyr).

For dei fleste kursar i bygg er **resistiv del dominerande**, og du kan bruke den forenkla forma. Reaktiv del ($X'$) blir signifikant først ved store tverrsnitt (>50 mm²) eller motorlast med låg cos φ.

---

## Formel

**1-fase (fase + nøytral, tur og retur):**

$$
\huge \Delta U = 2 \cdot L \cdot I \cdot (R' \cos \varphi + X' \sin \varphi)
$$

**3-fase symmetrisk (linjespenning):**

$$
\huge \Delta U = \sqrt{3} \cdot L \cdot I \cdot (R' \cos \varphi + X' \sin \varphi)
$$

**Forenkla (rein resistiv last, $\cos \varphi = 1$, $X'$ neglisjert):**

$$
\large \Delta U_{1f} = \dfrac{2 \cdot \rho \cdot L \cdot I}{A} \qquad \Delta U_{3f} = \dfrac{\sqrt{3} \cdot \rho \cdot L \cdot I}{A}
$$

**Som prosent av nominell spenning:**

$$
\large \Delta U \, [\%] = \dfrac{\Delta U}{U_n} \cdot 100\,\%
$$

---

## Variabler
$\Delta U =$ Spenningsfall ($V$)
$L =$ Lengda på kabelen, ein veg ($m$)
$I =$ Lasta sin straum ($A$)
$R' =$ Resistans per meter per leiar ($\Omega/m$) — frå datablad eller $R' = \rho/A$
$X' =$ Reaktans per meter per leiar ($\Omega/m$) — frå datablad
$\cos \varphi =$ Effektfaktor (–)
$\rho =$ Spesifikk resistans ($\Omega \cdot mm^2/m$) — Cu: 0,0175 ; Al: 0,028 ved 20 °C
$A =$ Tverrsnitt på leiaren ($mm^2$)
$U_n =$ Nominell spenning ($V$) — 230 V (1-fase) eller 400 V (3-fase linje)

---

## Enheter og antagelser
Ved å bruke $\rho$ i $\Omega \cdot mm^2/m$ kan ein putte $L$ i meter og $A$ i $mm^2$ direkte — ingen omrekning trengst.

Faktoren **2** i 1-fase-formelen kjem av at straumen går både ut (fase) og tilbake (nøytral) — total leiarlengd er $2L$.

Faktoren **√3** i 3-fase kjem av at vi reknar **linjespenningsfall** ut frå **fasespenningsfall** i ein symmetrisk Y-kopling.

Resistansen aukar med temperatur — typisk reknar ein med 70 °C eller 90 °C i dimensjoneringa (gir 20–30 % høgare $\rho$ enn 20 °C-tabellverdien). For "serviettmatematikk" bruk 20 °C.

For tverrsnitt opp til ca. 50 mm² er $X'$ i størrelsesorden 0,08 Ω/km og kan neglisjerast samanlikna med $R'$.

NEK 400-422 grenser (typisk):
- Belysning: **3 %**
- Andre laster: **5 %**
- Motorstart: tillete kortvarig høgare

Sjå òg [AWG/mm² kabelstørrelse](../reference/AWG-mm2-kabelstørrelse.md) for tverrsnitt-omrekning.

---

## Eksempel

**1) 1-fase belysningskurs:** 50 m kabel, 4 mm² Cu, 16 A last (cos φ = 1), 230 V.

$R' = \dfrac{\rho}{A} = \dfrac{0{,}0175}{4} = 0{,}00438 \, \Omega/m$

$\Delta U = 2 \cdot L \cdot I \cdot R' = 2 \cdot 50 \cdot 16 \cdot 0{,}00438 \approx 7{,}0 \, V$

$\Delta U \, [\%] = \dfrac{7{,}0}{230} \cdot 100\,\% \approx 3{,}0 \, \%$

→ Akkurat på grensa for belysning. Anten gå opp til 6 mm², eller godkjent viss kursen er for *anna* enn belysning.

**2) 3-fase motorkurs:** 80 m, 6 mm² Cu, 11 kW motor på 400 V, $\cos \varphi = 0{,}85$, $I = 20{,}7 \, A$ (frå [Trefase effekt](trefase-effekt.md)). $X'$ neglisjert.

$R' = \dfrac{0{,}0175}{6} = 0{,}00292 \, \Omega/m$

$\Delta U = \sqrt{3} \cdot 80 \cdot 20{,}7 \cdot 0{,}00292 \cdot 0{,}85 \approx 7{,}1 \, V$

$\Delta U \, [\%] = \dfrac{7{,}1}{400} \cdot 100\,\% \approx 1{,}8 \, \%$

→ God margin under 5 %.

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
\Delta U_{1f} = 2 \cdot L \cdot I \cdot (R' \cos \varphi + X' \sin \varphi)
$$

$$
\Delta U_{3f} = \sqrt{3} \cdot L \cdot I \cdot (R' \cos \varphi + X' \sin \varphi)
$$
```

**Python:**
```python
import math

RHO_CU = 0.0175   # Ω·mm²/m ved 20 °C
RHO_AL = 0.028    # Ω·mm²/m ved 20 °C

def spenningsfall(L, I, A, U_n, fase=1, cos_phi=1.0, rho=RHO_CU):
    """
    Forenkla spenningsfall (X' neglisjert).
    L: lengd [m], I: straum [A], A: tverrsnitt [mm²],
    U_n: nominell spenning [V], fase: 1 eller 3.
    Returnerer (ΔU [V], ΔU [%]).
    """
    R_per_m = rho / A
    k = 2 if fase == 1 else math.sqrt(3)
    dU = k * L * I * R_per_m * cos_phi
    return dU, dU / U_n * 100
```

---

## Relatert
- [Resistans i leder](resistans-leder.md)
- [Trefase effekt](trefase-effekt.md)
- [AWG/mm² kabelstørrelse](../reference/AWG-mm2-kabelstørrelse.md)
