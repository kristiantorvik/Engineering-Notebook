---
title: Skruemoment
summary: Formler og berekning for dreiemoment, friksjon, forspenn etc i skruer og bolter.
tags:
  - Styrkeberegning
  - Friksjon
  - Engineering
  - Gjenger
type: formula
aliases:
  - Dreiemoment
  - Tiltrekningsmoment
updated: 2026-03-22
---


# Skruemoment
Formel for berekning av tiltrekningsmoment og løsningsmoment, flatetrykk etc

---

## Formler
### Moment
Bidrag gjengeparti stramming
$\large M_v = F \cdot r_m \cdot tan(\epsilon_1 + \phi)$

Bidrag gjengeparti ved løsning
$\large M_{v,l} = F \cdot r_m \cdot tan(\epsilon_1 - \phi)$

Bidrag friksjon under skruehode
$\large M_s = F \cdot \mu_h \cdot r_h$

Tiltrekningsmoment
$\large M = M_v + M_s$

Løsningsmoment
$\large M_l = M_{v,l} + M_s$


### Areal og flatetrykk
Spenningsareal
$\large A_s =  \frac{\pi}{4} \cdot \left( r_m+r_{root} \right)^2$

Flatetrykk i gjengene
$\huge p = \frac{F}{\frac{i \cdot \pi}{4} \left(D_r^2 - D^2 \right)}$

## DIV
Stingingsvinkel (helix angle)
$\Large \phi = \frac{P}{\pi \cdot D_m}$

---

## Variabler

$M_v =$ Momentbidrag skruefriksjon
$M_s =$ Momentbidrag friksjon under skruehode
$M =$ Moment
$A_s =$ Spenningsarealet (Tilnærming for arealet som tar spenning i gjenget parti)
$p =$ Flatetrykk på gjengene
$\mu =$ Friksjonskoeffisient gjengene
$\mu_h =$ Friksjonskoeffisient under bolthode
$F =$ Aksialspenning skrue

$D =$ Utvendig diameter gjenge
$D_m =$ Middeldiameter gjenge
$D_r =$ rot-diameter gjenge
$r_m =$ Middelradius for gjengen
$r_h =$ Middelradius for kontakflate under skruehode

$\alpha =$ halve gjengevinkelen (30° for ISO gjenger)
$\phi =$ Helix vinkelen til gjengen (stigningsvinkel)
$\epsilon_1 =$ Friksjonsvinkel (bidrag fra den kilende effekt av konusen på gjengene)
$i =$ Antall gjenger i inngrep
$P =$ Stigning (pitch)


## Enheter og antagelser
Si enheter.


Friksjonskoefissienter fra kontruksjonselement bok

|       | Gjenger $\mu$ | Under skruehode $\mu'$ |
| ----- | ------------- | ---------------------- |
| Tørt  | 0.18 - 0.35   | 0.19 - 0.35            |
| Smurt | 0.14 - 0.26   | 0.08 - 0.18            |

- [Typiske friksjonskoefissienter skruer](../reference/friksjon-bolter-skruer.md)

## Eksempel

## For copy/paste

**Markdown / Latex:**
```Markdown

```


## Program kalkulator HP-Prime
```Python
#PYTHON EXPORT BOLTFORSPENN_FRA_MOMENT()
# Finner forspenning (aksialkraft) fra gitt tiltrekningsmoment, og skriver ut losningsmoment

import math
print("")

print("Vanlige friksjonstall:")
print("Tørt")
print("Gjenger mu = 0.18 - 0.35")
print("Under skruehode mu' = 0.19 - 0.35")
print("Smurt")
print("Gjenger mu = 0.14 - 0.26")
print("Under skruehode mu' = 0.08 - 0.18")
print("")


M = inputvalue = float(input("Tiltrekningsmoment M, Nm: "))
print(M)
mu = inputvalue = float(input("Friksjon gjenger mu: "))
print(mu)
mu_h = inputvalue = float(input("Friksjon under skruehode mu_h: "))
print(mu_h)

D = inputvalue = float(input("Utvendig diameter gjenge D, mm: "))
print(D)
D_r = inputvalue = float(input("Rot-diameter gjenge D_r, mm: "))
print(D_r)
D_m = (D+D_r)/2

P = inputvalue = float(input("Stigning (pitch) P, mm: "))
print(P)
alpha = inputvalue = float(input("Halv gjengevinkel alpha, grader (30 for ISO): "))
print(alpha)

r_h = inputvalue = float(input("Middelradius under skruehode r_h, mm: "))
print(r_h)

i = inputvalue = float(input("Antall gjenger i inngrep i: "))
print(i)

# Geometri / vinkler
r_m = (D_m/2)  # mm
phi = math.atan(P/(math.pi*D_m))  # rad
epsilon_1 = math.atan(mu/(math.cos(alpha*math.pi/180)))  # rad (kilende effekt)

# Momentbidrag
# Mv = F * r_m * tan(eps1 + phi)
# Ms = F * mu_h * r_h
# M = Mv + Ms = F*( r_m*tan(eps1+phi) + mu_h*r_h )
# Merk: r i mm -> del pa 1000 for m slik at Nm blir riktig.

K = (r_m*math.tan(epsilon_1 + phi) + mu_h*r_h) / 1000.0  # m
F = M / K  # N

# Losningsmoment:
# Mv,l = F * r_m * tan(eps1 - phi)
# Ml = Mv,l + Ms
Ml = F * ((r_m*math.tan(epsilon_1 - phi) + mu_h*r_h) / 1000.0)  # Nm

# Areal og flatetrykk fra notatene
r_root = D_r/2
A_s = (math.pi/4.0) * (r_m + r_root)**2  # mm^2
denom = (i*math.pi/4.0) * abs(D_r**2 - D**2)  # mm^2 (abs for positivt areal)
p = F / denom  # N/mm^2 = MPa

print("")
print("Forspenning F: " + str(round(F, 1)) + "N")
print("Forspenning F: " + str(round(F/1000.0, 3)) + "kN")
print("Losningsmoment M_l: " + str(round(Ml, 3)) + "Nm")
print("")
print("Spenningsareal A_s: " + str(round(A_s, 3)) + "mm^2")
print("Flatetrykk i gjenger p: " + str(round(p, 3)) + "MPa\n")
```
