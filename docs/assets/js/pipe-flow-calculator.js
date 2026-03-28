/* ============================================================
   Pipe Flow & Pump Calculator — pipe-flow-calculator.js

   Physical model:
     Reservoir 1 → suction pipe → pump → discharge pipe → Reservoir 2

   Energy balance (Bernoulli between free surfaces):
     p1/(ρg) + y1 + Hp = p2/(ρg) + y2 + h_fs + h_es + h_ft + h_et

   Friction factor: Swamee-Jain (explicit, Darcy)
   Solver: bisection on F(Q) = Hp(Q) - H_required(Q)
   ============================================================ */

(function () {
  "use strict";

  var g = 9.81; // gravitational acceleration [m/s^2]

  /* ----------------------------------------------------------
     Friction factor — Darcy
  ---------------------------------------------------------- */
  function frictionFactor(Re, eps, d) {
    // eps and d both in metres
    if (Re < 1) return 64; // guard
    if (Re < 2300) {
      return 64 / Re; // laminar
    }
    // Swamee-Jain (turbulent, explicit approximation of Colebrook)
    var rr = eps / d; // relative roughness
    var inner = rr / 3.7 + 5.74 / Math.pow(Re, 0.9);
    var log10 = Math.log10(inner);
    return 0.25 / (log10 * log10);
  }

  /* ----------------------------------------------------------
     Head-loss calculation for one pipe side
     Returns { h_major, h_minor, h_total, v, Re, f }
  ---------------------------------------------------------- */
  function pipeSide(Q, d, L, eps, zeta, nu) {
    // Q [m^3/s], d [m], L [m], eps [m], zeta [-], nu [m^2/s]
    var A = Math.PI * d * d / 4;
    var v = Q / A;
    var Re = v * d / nu;
    var f = frictionFactor(Re, eps, d);
    var v2_2g = v * v / (2 * g);
    var h_major = f * (L / d) * v2_2g;
    var h_minor = zeta * v2_2g;
    return {
      h_major: h_major,
      h_minor: h_minor,
      h_total: h_major + h_minor,
      v: v,
      Re: Re,
      f: f
    };
  }

  /* ----------------------------------------------------------
     Residual function F(Q) = Hp(Q) - H_required(Q)
     Positive → pump head exceeds system demand (too little flow)
     Zero    → operating point
  ---------------------------------------------------------- */
  function residual(Q, params) {
    var rho = params.rho;
    var nu  = params.nu;
    var P_hyd = params.P_hyd; // hydraulic power [W]
    var p1  = params.p1;
    var p2  = params.p2;
    var y1  = params.y1;
    var y2  = params.y2;
    var d_s = params.d_s;
    var L_s = params.L_s;
    var eps_s = params.eps_s;
    var zeta_s = params.zeta_s;
    var d_t = params.d_t;
    var L_t = params.L_t;
    var eps_t = params.eps_t;
    var zeta_t = params.zeta_t;

    var rg = rho * g;

    // Head losses
    var s = pipeSide(Q, d_s, L_s, eps_s, zeta_s, nu);
    var t = pipeSide(Q, d_t, L_t, eps_t, zeta_t, nu);

    // System required head
    var H_req = (p2 - p1) / rg + (y2 - y1) + s.h_total + t.h_total;

    // Pump head (P_hyd = 0 when no pump)
    var Hp = P_hyd > 0 ? P_hyd / (rg * Q) : 0;

    return Hp - H_req;
  }

  /* ----------------------------------------------------------
     Bisection solver
     Returns operating Q [m^3/s] or null if no solution found.
  ---------------------------------------------------------- */
  function solve(params) {
    var Q_min = 1e-6;   // starting low bound [m^3/s]
    var Q_max = Q_min;

    // Find bracket: scan upward until sign changes
    var F_low = residual(Q_min, params);
    var F_high;
    var found = false;

    for (var i = 0; i < 1200; i++) {
      Q_max = Q_max * 1.5;
      if (Q_max > 50) break; // safety cap at 50 m^3/s (180 000 L/min)
      F_high = residual(Q_max, params);
      if (F_low * F_high < 0) {
        found = true;
        break;
      }
      // If F never crosses zero and is always negative → no pump solution
    }

    if (!found) {
      // Special case: if H_required is negative at very low Q and pump head
      // exceeds it everywhere → any flow works in principle. But practically
      // the model requires a real crossing, so report no solution.
      return null;
    }

    // Bisect
    var a = Q_min, b = Q_max;
    for (var j = 0; j < 120; j++) {
      var mid = (a + b) / 2;
      if ((b - a) < 1e-12) break;
      var F_mid = residual(mid, params);
      if (F_low * F_mid < 0) {
        b = mid;
      } else {
        a = mid;
        F_low = F_mid;
      }
    }

    return (a + b) / 2;
  }

  /* ----------------------------------------------------------
     Input helpers
  ---------------------------------------------------------- */
  function val(id) {
    return parseFloat(document.getElementById(id).value);
  }

  function fmt(v, dec) {
    return isFinite(v) ? v.toFixed(dec) : "—";
  }

  function set(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function showError(msg) {
    var err = document.getElementById("pf-error");
    var res = document.getElementById("pf-results");
    if (err) { err.textContent = msg; err.style.display = "block"; }
    if (res) res.style.display = "none";
  }

  function hideError() {
    var err = document.getElementById("pf-error");
    if (err) { err.textContent = ""; err.style.display = "none"; }
  }

  /* ----------------------------------------------------------
     Main calculate function — called by button
  ---------------------------------------------------------- */
  function pfCalc() {
    hideError();

    // Read inputs
    var rho    = val("pf-rho");
    var nu     = val("pf-nu");
    var P_in   = val("pf-P_in");   // kW
    var eta    = val("pf-eta");    // fraction 0–1
    var p1     = val("pf-p1");
    var y1     = val("pf-y1");
    var L_s    = val("pf-L_s");
    var d_s    = val("pf-d_s");    // mm
    var eps_s  = val("pf-eps_s");  // mm
    var zeta_s = val("pf-zeta_s");
    var L_t    = val("pf-L_t");
    var d_t    = val("pf-d_t");    // mm
    var eps_t  = val("pf-eps_t");  // mm
    var zeta_t = val("pf-zeta_t");
    var p2     = val("pf-p2");
    var y2     = val("pf-y2");

    // Basic validation
    if (!(rho > 0))       { showError("Tetthet må være større enn 0."); return; }
    if (!(nu > 0))        { showError("Kinematisk viskositet må være større enn 0."); return; }
    if (!(P_in >= 0))     { showError("Pumpeeffekt kan ikke være negativ."); return; }
    if (eta < 0 || eta > 1) { showError("Virkningsgrad må være mellom 0 og 1."); return; }
    if (!(d_s > 0))       { showError("Diameter sugeside må være større enn 0."); return; }
    if (!(d_t > 0))       { showError("Diameter trykkside må være større enn 0."); return; }
    if (!(L_s >= 0))      { showError("Rørlengde sugeside kan ikke være negativ."); return; }
    if (!(L_t >= 0))      { showError("Rørlengde trykkside kan ikke være negativ."); return; }
    if (!(eps_s >= 0))    { showError("Ruhet sugeside kan ikke være negativ."); return; }
    if (!(eps_t >= 0))    { showError("Ruhet trykkside kan ikke være negativ."); return; }
    if (!(zeta_s >= 0))   { showError("Tapskoeffisient sugeside kan ikke være negativ."); return; }
    if (!(zeta_t >= 0))   { showError("Tapskoeffisient trykkside kan ikke være negativ."); return; }

    // Unit conversions to SI
    var P_W   = P_in * 1000;           // kW → W
    var P_hyd = eta * P_W;             // hydraulic power [W]
    var d_s_m = d_s / 1000;            // mm → m
    var d_t_m = d_t / 1000;
    var eps_s_m = eps_s / 1000;        // mm → m
    var eps_t_m = eps_t / 1000;

    var params = {
      rho: rho, nu: nu, P_hyd: P_hyd,
      p1: p1, p2: p2, y1: y1, y2: y2,
      d_s: d_s_m, L_s: L_s, eps_s: eps_s_m, zeta_s: zeta_s,
      d_t: d_t_m, L_t: L_t, eps_t: eps_t_m, zeta_t: zeta_t
    };

    var Q = solve(params);

    if (Q === null || Q <= 0) {
      // Diagnose why: compute the static head balance at near-zero flow.
      // H_static = (p2-p1)/(rho*g) + (y2-y1)
      // If H_static > 0: reservoir 2 has more energy than reservoir 1 at rest.
      //   - With no pump: flow is not possible.
      //   - With a pump that still can't overcome it: pump is too weak.
      var rg_d = rho * g;
      var H_static = (p2 - p1) / rg_d + (y2 - y1);
      if (P_hyd === 0) {
        if (H_static >= 0) {
          showError(
            "Ingen strøm uten pumpe: reservoar 2 har " + H_static.toFixed(1) +
            " m høyere energinivå enn reservoar 1 " +
            "((p₂−p₁)/ρg + (y₂−y₁) = " + H_static.toFixed(1) + " m). " +
            "For gravitasjons-/trykkdrevet strøm trengs y₁ > y₂ og/eller p₁ > p₂."
          );
        } else {
          // Driving head exists but solver found no crossing — shouldn't happen
          // in normal use, but report gracefully.
          showError(
            "Fant ingen gyldig løsning. Statisk drivhøyde er " +
            (-H_static).toFixed(1) + " m, men friksjonsmotstand ser ut til å " +
            "overstige denne for alle rimelige strømmer. Sjekk rørdata og tapskoeffisienter."
          );
        }
      } else {
        showError(
          "Pumpen klarer ikke å drive strøm gjennom systemet. " +
          "Systemets statiske energibehov er " + H_static.toFixed(1) + " m. " +
          "Øk pumpeeffekt, diameter, eller reduser tapskoeffisienter."
        );
      }
      return;
    }

    // --- Post-solve calculations ---
    var rg = rho * g;
    var s  = pipeSide(Q, d_s_m, L_s, eps_s_m, zeta_s, nu);
    var t  = pipeSide(Q, d_t_m, L_t, eps_t_m, zeta_t, nu);

    var Hp = P_hyd > 0 ? P_hyd / (rg * Q) : 0;

    // Pressure at pump inlet (Bernoulli from reservoir 1 to pump inlet)
    var p_suction   = p1 + rg * y1
                      - 0.5 * rho * s.v * s.v
                      - rg * (s.h_major + s.h_minor);

    // Pressure at pump outlet
    var p_discharge = p_suction + rg * Hp;

    // Secondary outputs
    var delta_y     = y2 - y1;                      // static height difference
    var delta_p_head = (p2 - p1) / rg;              // pressure contribution [m]
    var Q_Ls   = Q * 1000;                           // m^3/s → L/s
    var Q_Lmin = Q_Ls * 60;                          // L/s → L/min

    // --- Render primary outputs ---
    set("pf-r-Q_Ls",    fmt(Q_Ls, 2)   + " L/s");
    set("pf-r-Q_Lmin",  fmt(Q_Lmin, 1) + " L/min");
    set("pf-r-Hp",      fmt(Hp, 2)     + " m");
    set("pf-r-p_suc_Pa",  fmt(p_suction, 0)   + " Pa");
    set("pf-r-p_suc_bar", fmt(p_suction / 1e5, 4) + " bar abs");
    set("pf-r-p_dis_Pa",  fmt(p_discharge, 0)  + " Pa");
    set("pf-r-p_dis_bar", fmt(p_discharge / 1e5, 4) + " bar abs");

    // --- Render secondary outputs ---
    set("pf-r-v_s",   fmt(s.v, 3)   + " m/s");
    set("pf-r-v_t",   fmt(t.v, 3)   + " m/s");
    set("pf-r-Re_s",  fmt(s.Re, 0));
    set("pf-r-Re_t",  fmt(t.Re, 0));
    set("pf-r-f_s",   fmt(s.f, 5));
    set("pf-r-f_t",   fmt(t.f, 5));
    set("pf-r-hl_s",  fmt(s.h_total, 3) + " m");
    set("pf-r-hl_t",  fmt(t.h_total, 3) + " m");
    set("pf-r-dy",    fmt(delta_y, 2)        + " m");
    set("pf-r-dp_head", fmt(delta_p_head, 2) + " m");

    document.getElementById("pf-results").style.display = "block";
  }

  /* ----------------------------------------------------------
     Init
  ---------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("pf-btn");
    if (btn) btn.addEventListener("click", pfCalc);
  });

  // Also expose globally for inline onclick fallback
  window.pfCalc = pfCalc;

})();
