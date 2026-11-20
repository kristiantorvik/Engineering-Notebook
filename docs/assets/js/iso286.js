/* ============================================================
   ISO 286-1:2010 — iso286.js
   ISO code system for tolerances on linear sizes.

   Data: Tables 1 to 5 and Figures 10 to 13 of ISO 286-1:2010,
   for nominal sizes up to and including 500 mm. The numbers are
   extracted mechanically from the standard, not typed by hand.

   iso286.limits(d, "H7") returns the limit deviations in µm.
   Upper-case letters are holes, lower-case letters are shafts.

   Units: nominal size in mm, tolerances and deviations in µm.
   Used by pasningsvelger.js. Shown as tables in
   docs/reference/iso-286-toleranser.md.
   ============================================================ */

(function () {
  "use strict";

  // Upper bound [mm] of each nominal-size range in Table 1 ("over ... up to and including")
  var IT_UP = [3, 6, 10, 18, 30, 50, 80, 120, 180, 250, 315, 400, 500];

  // Table 1: standard tolerance values [µm], one value per IT_UP range
  var IT = {
    "01": [0.3, 0.4, 0.4, 0.5, 0.6, 0.6, 0.8, 1, 1.2, 2, 2.5, 3, 4],
    "0":  [0.5, 0.6, 0.6, 0.8, 1, 1, 1.2, 1.5, 2, 3, 4, 5, 6],
    "1":  [0.8, 1, 1, 1.2, 1.5, 1.5, 2, 2.5, 3.5, 4.5, 6, 7, 8],
    "2":  [1.2, 1.5, 1.5, 2, 2.5, 2.5, 3, 4, 5, 7, 8, 9, 10],
    "3":  [2, 2.5, 2.5, 3, 4, 4, 5, 6, 8, 10, 12, 13, 15],
    "4":  [3, 4, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20],
    "5":  [4, 5, 6, 8, 9, 11, 13, 15, 18, 20, 23, 25, 27],
    "6":  [6, 8, 9, 11, 13, 16, 19, 22, 25, 29, 32, 36, 40],
    "7":  [10, 12, 15, 18, 21, 25, 30, 35, 40, 46, 52, 57, 63],
    "8":  [14, 18, 22, 27, 33, 39, 46, 54, 63, 72, 81, 89, 97],
    "9":  [25, 30, 36, 43, 52, 62, 74, 87, 100, 115, 130, 140, 155],
    "10": [40, 48, 58, 70, 84, 100, 120, 140, 160, 185, 210, 230, 250],
    "11": [60, 75, 90, 110, 130, 160, 190, 220, 250, 290, 320, 360, 400],
    "12": [100, 120, 150, 180, 210, 250, 300, 350, 400, 460, 520, 570, 630],
    "13": [140, 180, 220, 270, 330, 390, 460, 540, 630, 720, 810, 890, 970],
    "14": [250, 300, 360, 430, 520, 620, 740, 870, 1000, 1150, 1300, 1400, 1550],
    "15": [400, 480, 580, 700, 840, 1000, 1200, 1400, 1600, 1850, 2100, 2300, 2500],
    "16": [600, 750, 900, 1100, 1300, 1600, 1900, 2200, 2500, 2900, 3200, 3600, 4000],
    "17": [1000, 1200, 1500, 1800, 2100, 2500, 3000, 3500, 4000, 4600, 5200, 5700, 6300],
    "18": [1400, 1800, 2200, 2700, 3300, 3900, 4600, 5400, 6300, 7200, 8100, 8900, 9700]
  };

  // Upper bound [mm] of each nominal-size range in Tables 2 to 5 (finer than Table 1)
  var DEV_UP = [3, 6, 10, 14, 18, 24, 30, 40, 50, 65, 80, 100, 120, 140, 160, 180, 200, 225, 250, 280, 315, 355, 400, 450, 500];

  // Tables 2 and 3: fundamental deviations for holes [µm], one value per DEV_UP range.
  // A..H: lower limit deviation EI.  P..ZC: upper limit deviation ES for grades above IT7.
  var HOLE = {
    "A":  [270, 270, 280, 290, 290, 300, 300, 310, 320, 340, 360, 380, 410, 460, 520, 580, 660, 740, 820, 920, 1050, 1200, 1350, 1500, 1650],
    "B":  [140, 140, 150, 150, 150, 160, 160, 170, 180, 190, 200, 220, 240, 260, 280, 310, 340, 380, 420, 480, 540, 600, 680, 760, 840],
    "C":  [60, 70, 80, 95, 95, 110, 110, 120, 130, 140, 150, 170, 180, 200, 210, 230, 240, 260, 280, 300, 330, 360, 400, 440, 480],
    "CD": [34, 46, 56, 70, 70, 85, 85, 100, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    "D":  [20, 30, 40, 50, 50, 65, 65, 80, 80, 100, 100, 120, 120, 145, 145, 145, 170, 170, 170, 190, 190, 210, 210, 230, 230],
    "E":  [14, 20, 25, 32, 32, 40, 40, 50, 50, 60, 60, 72, 72, 85, 85, 85, 100, 100, 100, 110, 110, 125, 125, 135, 135],
    "EF": [10, 14, 18, 23, 23, 28, 28, 35, 35, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    "F":  [6, 10, 13, 16, 16, 20, 20, 25, 25, 30, 30, 36, 36, 43, 43, 43, 50, 50, 50, 56, 56, 62, 62, 68, 68],
    "FG": [4, 6, 8, 10, 10, 12, 12, 15, 15, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    "G":  [2, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 12, 12, 14, 14, 14, 15, 15, 15, 17, 17, 18, 18, 20, 20],
    "H":  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "P":  [-6, -12, -15, -18, -18, -22, -22, -26, -26, -32, -32, -37, -37, -43, -43, -43, -50, -50, -50, -56, -56, -62, -62, -68, -68],
    "R":  [-10, -15, -19, -23, -23, -28, -28, -34, -34, -41, -43, -51, -54, -63, -65, -68, -77, -80, -84, -94, -98, -108, -114, -126, -132],
    "S":  [-14, -19, -23, -28, -28, -35, -35, -43, -43, -53, -59, -71, -79, -92, -100, -108, -122, -130, -140, -158, -170, -190, -208, -232, -252],
    "T":  [null, null, null, null, null, null, -41, -48, -54, -66, -75, -91, -104, -122, -134, -146, -166, -180, -196, -218, -240, -268, -294, -330, -360],
    "U":  [-18, -23, -28, -33, -33, -41, -48, -60, -70, -87, -102, -124, -144, -170, -190, -210, -236, -258, -284, -315, -350, -390, -435, -490, -540],
    "V":  [null, null, null, null, -39, -47, -55, -68, -81, -102, -120, -146, -172, -202, -228, -252, -284, -310, -340, -385, -425, -475, -530, -595, -660],
    "X":  [-20, -28, -34, -40, -45, -54, -64, -80, -97, -122, -146, -178, -210, -248, -280, -310, -350, -385, -425, -475, -525, -590, -660, -740, -820],
    "Y":  [null, null, null, null, null, -63, -75, -94, -114, -144, -174, -214, -254, -300, -340, -380, -425, -470, -520, -580, -650, -730, -820, -920, -1000],
    "Z":  [-26, -35, -42, -50, -60, -73, -88, -112, -136, -172, -210, -258, -310, -365, -415, -465, -520, -575, -640, -710, -790, -900, -1000, -1100, -1250],
    "ZA": [-32, -42, -52, -64, -77, -98, -118, -148, -180, -226, -274, -335, -400, -470, -535, -600, -670, -740, -820, -920, -1000, -1150, -1300, -1450, -1600],
    "ZB": [-40, -50, -67, -90, -108, -136, -160, -200, -242, -300, -360, -445, -525, -620, -700, -780, -880, -960, -1050, -1200, -1300, -1500, -1650, -1850, -2100],
    "ZC": [-60, -80, -97, -130, -150, -188, -218, -274, -325, -405, -480, -585, -690, -800, -900, -1000, -1150, -1250, -1350, -1550, -1700, -1900, -2100, -2400, -2600]
  };
  // J: upper limit deviation ES, only defined for IT6, IT7 and IT8
  var HOLE_J = {
    "6": [2, 5, 5, 6, 6, 8, 8, 10, 10, 13, 13, 16, 16, 18, 18, 18, 22, 22, 22, 25, 25, 29, 29, 33, 33],
    "7": [4, 6, 8, 10, 10, 12, 12, 14, 14, 18, 18, 22, 22, 26, 26, 26, 30, 30, 30, 36, 36, 39, 39, 43, 43],
    "8": [6, 10, 12, 15, 15, 20, 20, 24, 24, 28, 28, 34, 34, 41, 41, 41, 47, 47, 47, 55, 55, 60, 60, 66, 66]
  };
  // K, M, N: upper limit deviation ES. Up to IT8 the delta value is added (above 3 mm).
  var HOLE_K        = [0, -1, -1, -1, -1, -2, -2, -2, -2, -2, -2, -3, -3, -3, -3, -3, -4, -4, -4, -4, -4, -4, -4, -5, -5];
  var HOLE_M        = [-2, -4, -6, -7, -7, -8, -8, -9, -9, -11, -11, -13, -13, -15, -15, -15, -17, -17, -17, -20, -20, -21, -21, -23, -23];
  var HOLE_M_COARSE = [-2, -4, -6, -7, -7, -8, -8, -9, -9, -11, -11, -13, -13, -15, -15, -15, -17, -17, -17, -20, -20, -21, -21, -23, -23];   // above IT8
  var HOLE_N        = [-4, -8, -10, -12, -12, -15, -15, -17, -17, -20, -20, -23, -23, -27, -27, -27, -31, -31, -31, -34, -34, -37, -37, -40, -40];
  var HOLE_N_COARSE = [-4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];   // above IT8
  // Delta values [µm] for IT3..IT8 (right-hand columns of Table 3)
  var DELTA = {
    "3": [0, 1, 1, 1, 1, 1.5, 1.5, 1.5, 1.5, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5],
    "4": [0, 1.5, 1.5, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5],
    "5": [0, 1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7],
    "6": [0, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 9, 9, 9, 9, 9, 11, 11, 13, 13],
    "7": [0, 4, 6, 7, 7, 8, 8, 9, 9, 11, 11, 13, 13, 15, 15, 15, 17, 17, 17, 20, 20, 21, 21, 23, 23],
    "8": [0, 6, 7, 9, 9, 12, 12, 14, 14, 16, 16, 19, 19, 23, 23, 23, 26, 26, 26, 29, 29, 32, 32, 34, 34]
  };

  // Tables 4 and 5: fundamental deviations for shafts [µm], one value per DEV_UP range.
  // a..h: upper limit deviation es.  m..zc: lower limit deviation ei.
  var SHAFT = {
    "a":  [-270, -270, -280, -290, -290, -300, -300, -310, -320, -340, -360, -380, -410, -460, -520, -580, -660, -740, -820, -920, -1050, -1200, -1350, -1500, -1650],
    "b":  [-140, -140, -150, -150, -150, -160, -160, -170, -180, -190, -200, -220, -240, -260, -280, -310, -340, -380, -420, -480, -540, -600, -680, -760, -840],
    "c":  [-60, -70, -80, -95, -95, -110, -110, -120, -130, -140, -150, -170, -180, -200, -210, -230, -240, -260, -280, -300, -330, -360, -400, -440, -480],
    "cd": [-34, -46, -56, -70, -70, -85, -85, -100, -100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    "d":  [-20, -30, -40, -50, -50, -65, -65, -80, -80, -100, -100, -120, -120, -145, -145, -145, -170, -170, -170, -190, -190, -210, -210, -230, -230],
    "e":  [-14, -20, -25, -32, -32, -40, -40, -50, -50, -60, -60, -72, -72, -85, -85, -85, -100, -100, -100, -110, -110, -125, -125, -135, -135],
    "ef": [-10, -14, -18, -23, -23, -25, -25, -35, -35, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    "f":  [-6, -10, -13, -16, -16, -20, -20, -25, -25, -30, -30, -36, -36, -43, -43, -43, -50, -50, -50, -56, -56, -62, -62, -68, -68],
    "fg": [-4, -6, -8, -10, -10, -12, -12, -15, -15, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    "g":  [-2, -4, -5, -6, -6, -7, -7, -9, -9, -10, -10, -12, -12, -14, -14, -14, -15, -15, -15, -17, -17, -18, -18, -20, -20],
    "h":  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "m":  [2, 4, 6, 7, 7, 8, 8, 9, 9, 11, 11, 13, 13, 15, 15, 15, 17, 17, 17, 20, 20, 21, 21, 23, 23],
    "n":  [4, 8, 10, 12, 12, 15, 15, 17, 17, 20, 20, 23, 23, 27, 27, 27, 31, 31, 31, 34, 34, 37, 37, 40, 40],
    "p":  [6, 12, 15, 18, 18, 22, 22, 26, 26, 32, 32, 37, 37, 43, 43, 43, 50, 50, 50, 56, 56, 62, 62, 68, 68],
    "r":  [10, 15, 19, 23, 23, 28, 28, 34, 34, 41, 43, 51, 54, 63, 65, 68, 77, 80, 84, 94, 98, 108, 114, 126, 132],
    "s":  [14, 19, 23, 28, 28, 35, 35, 43, 43, 53, 59, 71, 79, 92, 100, 108, 122, 130, 140, 158, 170, 190, 208, 232, 252],
    "t":  [null, null, null, null, null, null, 41, 48, 54, 66, 75, 91, 104, 122, 134, 146, 166, 180, 196, 218, 240, 268, 294, 330, 360],
    "u":  [18, 23, 28, 33, 33, 41, 48, 60, 70, 87, 102, 124, 144, 170, 190, 210, 236, 258, 284, 315, 350, 390, 435, 490, 540],
    "v":  [null, null, null, null, 39, 47, 55, 68, 81, 102, 120, 146, 172, 202, 228, 252, 284, 310, 340, 385, 425, 475, 530, 595, 660],
    "x":  [20, 28, 34, 40, 45, 54, 64, 80, 97, 122, 146, 178, 210, 248, 280, 310, 350, 385, 425, 475, 525, 590, 660, 740, 820],
    "y":  [null, null, null, null, null, 63, 75, 94, 114, 144, 174, 214, 254, 300, 340, 380, 425, 470, 520, 580, 650, 730, 820, 920, 1000],
    "z":  [26, 35, 42, 50, 60, 73, 88, 112, 136, 172, 210, 258, 310, 365, 415, 465, 520, 575, 640, 710, 790, 900, 1000, 1100, 1250],
    "za": [32, 42, 52, 64, 77, 98, 118, 148, 180, 226, 274, 335, 400, 470, 535, 600, 670, 740, 820, 920, 1000, 1150, 1300, 1450, 1600],
    "zb": [40, 50, 67, 90, 108, 136, 160, 200, 242, 300, 360, 445, 525, 620, 700, 780, 880, 960, 1050, 1200, 1300, 1500, 1650, 1850, 2100],
    "zc": [60, 80, 97, 130, 150, 188, 218, 274, 325, 405, 480, 585, 690, 800, 900, 1000, 1150, 1250, 1350, 1550, 1700, 1900, 2100, 2400, 2600]
  };
  // j: lower limit deviation ei, only defined for IT5..IT8
  var SHAFT_J = {
    "5": [-2, -2, -2, -3, -3, -4, -4, -5, -5, -7, -7, -9, -9, -11, -11, -11, -13, -13, -13, -16, -16, -18, -18, -20, -20],
    "6": [-2, -2, -2, -3, -3, -4, -4, -5, -5, -7, -7, -9, -9, -11, -11, -11, -13, -13, -13, -16, -16, -18, -18, -20, -20],
    "7": [-4, -4, -5, -6, -6, -8, -8, -10, -10, -12, -12, -15, -15, -18, -18, -18, -21, -21, -21, -26, -26, -28, -28, -32, -32],
    "8": [-6, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  };
  // k: lower limit deviation ei for IT4..IT7. Zero for all other grades.
  var SHAFT_K = [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5];

  // Figures 10 and 11: tolerance classes recommended for general purposes
  var PREF_HOLES = [
    "G6", "H6", "JS6", "K6", "M6", "N6", "P6", "R6", "S6", "T6", "F7", "G7",
    "H7", "JS7", "K7", "M7", "N7", "P7", "R7", "S7", "T7", "U7", "X7", "E8",
    "F8", "H8", "JS8", "K8", "M8", "N8", "P8", "R8", "D9", "E9", "F9", "H9",
    "C10", "D10", "E10", "H10", "A11", "B11", "C11", "D11", "H11"
  ];
  var PREF_SHAFTS = [
    "g5", "h5", "js5", "k5", "m5", "n5", "p5", "r5", "s5", "t5", "f6", "g6",
    "h6", "js6", "k6", "m6", "n6", "p6", "r6", "s6", "t6", "u6", "x6", "e7",
    "f7", "h7", "js7", "k7", "m7", "n7", "p7", "r7", "s7", "t7", "u7", "d8",
    "e8", "f8", "h8", "b9", "c9", "d9", "e9", "h9", "d10", "h10", "a11", "b11",
    "c11", "h11"
  ];

  // Figures 12 and 13: preferable fits, written hole/shaft
  var FITS_HOLE_BASIS = [
    "H6/g5", "H6/h5", "H6/js5", "H6/k5", "H6/m5", "H6/n5", "H6/p5", "H7/f6", "H7/g6",
    "H7/h6", "H7/js6", "H7/k6", "H7/m6", "H7/n6", "H7/p6", "H7/r6", "H7/s6", "H7/t6",
    "H7/u6", "H7/x6", "H8/e7", "H8/f7", "H8/h7", "H8/js7", "H8/k7", "H8/m7", "H8/s7",
    "H8/u7", "H8/d8", "H8/e8", "H8/f8", "H8/h8", "H9/d8", "H9/e8", "H9/f8", "H9/h8",
    "H10/b9", "H10/c9", "H10/d9", "H10/e9", "H10/h9", "H11/b11", "H11/c11", "H11/d10", "H11/h10"
  ];
  var FITS_SHAFT_BASIS = [
    "G6/h5", "H6/h5", "JS6/h5", "K6/h5", "M6/h5", "N6/h5", "P6/h5", "F7/h6", "G7/h6",
    "H7/h6", "JS7/h6", "K7/h6", "M7/h6", "N7/h6", "P7/h6", "R7/h6", "S7/h6", "T7/h6",
    "U7/h6", "X7/h6", "E8/h7", "F8/h7", "H8/h7", "D9/h8", "E9/h8", "F9/h8", "H9/h8",
    "E8/h9", "F8/h9", "H8/h9", "D9/h9", "E9/h9", "F9/h9", "H9/h9", "B11/h9", "C10/h9",
    "D10/h9", "H10/h9"
  ];

  /* ----------------------------------------------------------
     Lookup helpers
  ---------------------------------------------------------- */

  // Index of the size range that contains d ("over ... up to and including").
  function rangeIndex(bounds, d) {
    if (!(d > 0)) return -1;
    for (var i = 0; i < bounds.length; i++) if (d <= bounds[i]) return i;
    return -1;
  }

  // Standard tolerance [µm] for nominal size d [mm] and grade (1..18, or "01", "0").
  function itValue(d, grade) {
    var i = rangeIndex(IT_UP, d), row = IT[String(grade)];
    return (i < 0 || !row) ? null : row[i];
  }

  function parseClass(cls) {
    var m = /^([A-Za-z]{1,2})(\d{1,2})$/.exec(String(cls).trim());
    if (!m) return null;
    var letter = m[1], lower = letter.toLowerCase();
    if (letter !== lower && letter !== letter.toUpperCase()) return null;   // mixed case
    return { letter: letter, grade: parseInt(m[2], 10), isHole: letter !== lower };
  }

  /* ----------------------------------------------------------
     Limit deviations, ISO 286-1 clause 4.3.2

     One limit comes from the fundamental deviation (Tables 2 to 5),
     the other is found by adding or subtracting the standard
     tolerance IT (Table 1), see Figures 8 and 9 of the standard.

     Returns { upper, lower, it, grade, letter, isHole } in µm,
     or null when the class is not defined for that size.
  ---------------------------------------------------------- */
  function limits(d, cls) {
    var c = parseClass(cls);
    if (!c) return null;
    var g = c.grade, L = c.letter, i = rangeIndex(DEV_UP, d), it = itValue(d, g);
    if (i < 0 || it == null || g < 1 || g > 18) return null;
    var upper = null, lower = null, v;

    if (L === "JS" || L === "js") {                    // symmetric: ± IT/2
      upper = it / 2; lower = -it / 2;
    } else if (c.isHole) {
      // The delta value only exists for IT3..IT8 and is zero up to 3 mm.
      var delta = DELTA[String(g)] ? DELTA[String(g)][i] : null;
      if (L === "J") {
        v = HOLE_J[String(g)] ? HOLE_J[String(g)][i] : null;
        if (v != null) upper = v;
      } else if (L === "K") {
        // Above IT8 the standard only gives K for sizes up to 3 mm.
        if (g <= 8 && delta != null) upper = HOLE_K[i] + delta;
        else if (g > 8 && d <= 3) upper = 0;
      } else if (L === "M") {
        if (g <= 8 && delta != null) upper = HOLE_M[i] + delta;
        else if (g > 8) upper = HOLE_M_COARSE[i];
        // Special case: M6 over 250 up to 315 mm is -9, not -11.
        // The footnote was not readable in the source file. The value is the one tabulated in ISO 286-2.
        if (g === 6 && d > 250 && d <= 315) upper = -9;
      } else if (L === "N") {
        if (g <= 8 && delta != null) upper = HOLE_N[i] + delta;
        else if (g > 8) upper = HOLE_N_COARSE[i];
      } else if (HOLE[L]) {
        v = HOLE[L][i];
        if (v != null) {
          if (L.charCodeAt(0) <= 72) lower = v;                      // A..H: EI given
          else if (g > 7) upper = v;                                  // P..ZC above IT7: ES given
          else if (delta != null) upper = v + delta;                  // P..ZC up to IT7: ES + delta
        }
      }
      if (upper != null) lower = upper - it;
      else if (lower != null) upper = lower + it;
    } else {
      if (L === "j") {
        v = SHAFT_J[String(g)] ? SHAFT_J[String(g)][i] : null;
        if (v != null) lower = v;
      } else if (L === "k") {
        lower = (g >= 4 && g <= 7) ? SHAFT_K[i] : 0;
      } else if (SHAFT[L]) {
        v = SHAFT[L][i];
        if (v != null) {
          if (L.charCodeAt(0) <= 104) upper = v;                     // a..h: es given
          else lower = v;                                             // m..zc: ei given
        }
      }
      if (lower != null) upper = lower + it;
      else if (upper != null) lower = upper - it;
    }
    if (upper == null || lower == null) return null;
    // A, B, a, b are not used up to 1 mm (footnote to Tables 2 and 4)
    if (d <= 1 && (L === "A" || L === "B" || L === "a" || L === "b")) return null;
    return { upper: upper, lower: lower, it: it, grade: g, letter: L, isHole: c.isHole };
  }

  /* ----------------------------------------------------------
     Fit between a hole and a shaft, ISO 286-1 annex B.2
     Clearance is positive, interference is negative [µm].
       tightest = lower limit of hole - upper limit of shaft
       loosest  = upper limit of hole - lower limit of shaft
  ---------------------------------------------------------- */
  function fit(d, holeClass, shaftClass) {
    var h = limits(d, holeClass), s = limits(d, shaftClass);
    if (!h || !s || !h.isHole || s.isHole) return null;
    var tightest = h.lower - s.upper, loosest = h.upper - s.lower;
    return {
      hole: h, shaft: s, tightest: tightest, loosest: loosest,
      type: tightest >= 0 ? "clearance" : (loosest <= 0 ? "interference" : "transition")
    };
  }

  window.iso286 = {
    limits: limits, fit: fit, itValue: itValue, parseClass: parseClass,
    MAX_SIZE: 500,
    HOLE_LETTERS: ["A", "B", "C", "CD", "D", "E", "EF", "F", "FG", "G", "H", "JS", "J", "K", "M", "N",
                   "P", "R", "S", "T", "U", "V", "X", "Y", "Z", "ZA", "ZB", "ZC"],
    SHAFT_LETTERS: ["a", "b", "c", "cd", "d", "e", "ef", "f", "fg", "g", "h", "js", "j", "k", "m", "n",
                    "p", "r", "s", "t", "u", "v", "x", "y", "z", "za", "zb", "zc"],
    PREF_HOLES: PREF_HOLES, PREF_SHAFTS: PREF_SHAFTS,
    FITS_HOLE_BASIS: FITS_HOLE_BASIS, FITS_SHAFT_BASIS: FITS_SHAFT_BASIS
  };
})();
