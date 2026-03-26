---
title: Presspassninger og tykkvegga rør
summary: Formler og berekning presspassninger og tykkvegga rør ved lame's ligninger, søkeord, Pressmonn, Deformasjon, Foring, Hylse
tags:
  - Styrkeberegning
  - Trykk
  - Engineering
type: notat
updated: 2026-03-22
---

# Press passninger og tykkvegga rør

Deformasjon og spenninger ved presspasninger og spenninger i tykkvegga rør
For eksempel og beregninger bruker eg følgande notasjon og variabler.

## Bruk
For å berekna nødvendig presspassning bruk nødvendig holdekraft og friksjonskoeffisient til å finne nødvendig flatetrykk $P$
Derreter berekn nav og forings deformasjon av trykket, differansen blir nødvendig pressmonn. NB: husk at ved montering ved pressing kan overflatene bli påvikret og friksjonskoeffisienten annerledes. Når en berekner deformasjonen sett $R=r_2$ slik at det er i flaten mellom foring og nav som undersøkes

### Verdier
Friksjonkoefissienter for presspassninger oppgitt i Konstruksjonselement boka:
__Statisk friksjon: __
$\mu = 0.1$ for presspassning
$\mu = 0.15-0.2$ for krympeforbindelser
$\mu = 0.08 - 0.1$ for dynamisk friksjon


### Variabler
$r_1 : (mm)$ Inner radius foring
$r_2 : (mm)$ Ytterradius foring / Innerradius nav
$r_3 : (mm)$ Ytterradius foring
$r_i : (mm)$ Indre radius
$r_y : (mm)$ Ytre radius
$R : (mm)$ Radiusen vi ønsker å finne verdiene for
$P : (MPa)$ Kontakttrykk mellom nav og foring

$\nu_A : ()$ [[Tverrkontraksjonstall]] / Poissonratio Foring
$\nu_B : ()$ [[Tverrkontraksjonstall]] / Poissonratio Nav
$E_A : (MPa)$ E-modul Foring
$E_B : (MPa)$ E-modul Nav

$u_A : (mm)$ Radiell deformasjon foring
$u_B : (mm)$ Radiell deformasjon Nav
$\Delta : (mm)$ Nødvending pressmonn, diametral
$\sigma_{RA} : (N/mm^2)$ Radielle spenninger Foring, Positiv verdi gir strekk
$\sigma_{RB} : (N/mm^2)$ Radielle spenninger Nav, Positiv verdi gir strekk
$\sigma_{TA} : (N/mm^2)$ Tangentielle spenninger Foring, Positiv verdi gir strekk
$\sigma_{TB} : (N/mm^2)$ Tangentielle spenninger Nav, Positiv verdi gir strekk
$\sigma_{JF} : (N/mm^2)$ Jamnføringsspenninger Von Mises

![[press-fit-radii.png]]

## Formler 
Lame's ligninger 

### Deformasjon Foring (Radielt)

$\LARGE u_A = - \; \frac{P \cdot r_2^2}{E_A(r_2^2-r_1^2)} \cdot \left[ (1-\nu_A)R + (1+\nu_A) \frac{r_1^2}{R} \right]$

### Deformasjon Nav (Radielt)

$\LARGE u_B = \frac{P \cdot r_2^2}{E_B(r_3^2-r_2^2)} \cdot \left[ (1-\nu_B)R + (1+\nu_B) \frac{r_3^2}{R} \right]$

### Pressmonn (Diametral)

$\LARGE \Delta = 2 u_B - 2 u_A$


### Kontaktrykk ved kjent pressmonn
$\large P = \frac{\Delta}{2} \cdot \left ( \frac{r_2^2}{E_B(r_3^2-r_2^2)} \cdot \left[ (1-\nu_B)R + (1+\nu_B) \frac{r_3^2}{R} \right] + \; \frac{r_2^2}{E_A(r_2^2-r_1^2)} \cdot \left[ (1-\nu_A)R + (1+\nu_A) \frac{r_1^2}{R} \right]   \right)^{-1}$
``` python
# Kjent pressmonn
r1 = 0
r2 = 6
r3 = 20
R = 6
Va = 0.3
Vb = 0.3
Ea = 210 * 10**3
Eb = 210 * 10**3
Lengde = 25
my = 0.1
Delta = 0.04


def P(r1, r2, r3, R, Va, Vb, Ea, Eb, Delta):
    P = Delta/2 * (r2**2 / (Ea * (r2**2 - r1**2)) * ((1 - Va)*R + (1 + Va)*(r1**2 / R)) + r2**2 / (Eb * (r3**2 - r2**2)) * ((1 - Vb)*R + (1 + Vb)*(r3**2 / R)))**(-1)
    return P

P = P(r1, r2, r3, R, Va, Vb, Ea, Eb, Delta)


print(f"Kontaktrykk {round(P, 3)}Mpa")
print(f"Nødvendig kraft {round(P*3.14*r2*2*Lengde/1000*my, 3)}kN")
print(f"Nødvindig dreiemoment {round(P*3.14*r2*2*Lengde*my*r2/1000, 3)}Nm\n")
```

### Radielle Spenninger
##### Innvendig trykk - Nav / trykksatt tank osv
$\LARGE \sigma_{_{R-INV}} = \frac{P \cdot r_i^2}{r_y^2 - r_i^2} \left(1 - \frac{r_y^2}{R^2} \right)$

##### Utvendig trykk - Foring
$\LARGE \sigma_{_{R-UTV}} = - \, \frac{P \cdot r_y^2}{r_y^2 - r_i^2} \left(1 - \frac{r_i^2}{R^2} \right)$

##### Radielle spenninger ved både innvendig og utvendig trykk
$\LARGE \sigma_R = \sigma_{_{R-INV}} + \sigma_{_{R-UTV}}$

### Tangentielle Spenninger

##### Innvendig trykk - Nav / trykksatt tank osv
$\LARGE \sigma_{_{T-INV}} = \frac{P \cdot r_i^2}{r_y^2 - r_i^2} \left(1 + \frac{r_y^2}{R^2} \right)$

##### Utvendig trykk - Foring
$\LARGE \sigma_{_{T-UTV}} = - \, \frac{P \cdot r_y^2}{r_y^2 - r_i^2} \left(1 + \frac{r_i^2}{R^2} \right)$

##### Radielle spenninger ved både innvendig og utvendig trykk
$\LARGE \sigma_R = \sigma_{_{T-INV}} + \sigma_{_{T-UTV}}$


### Jamnføringsspenning Von Mises

$\Large \sigma_JF = \sqrt{\sigma_r^2 + \sigma_t^2 - \sigma_r \cdot \sigma_t}$
