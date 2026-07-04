/* =========================================================================
   ABU-HURAIRA — Liner Notes
   main.js — waveform generation, onboarding banner, reveal-on-scroll,
   contact form, footer year
   ========================================================================= */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------------------
     1. Onboarding banner — dismissible, remembered via localStorage
     ------------------------------------------------------------------- */
  var banner = document.getElementById("onboard-banner");
  var bannerClose = document.getElementById("onboard-close");

  if (banner && bannerClose) {
    var dismissed = false;
    try {
      dismissed = localStorage.getItem("portfolio-banner-dismissed") === "1";
    } catch (e) {
      dismissed = false;
    }

    if (dismissed) {
      banner.classList.add("is-hidden");
    }

    bannerClose.addEventListener("click", function () {
      banner.classList.add("is-hidden");
      try {
        localStorage.setItem("portfolio-banner-dismissed", "1");
      } catch (e) {
        /* ignore */
      }
    });
  }

  /* ---------------------------------------------------------------------
     2. Waveform hero — generated bars with a gentle idle animation
     ------------------------------------------------------------------- */
  var waveform = document.getElementById("waveform");

  if (waveform) {
    var barCount = window.innerWidth < 640 ? 42 : 72;
    var bars = [];

    for (var i = 0; i < barCount; i++) {
      var bar = document.createElement("span");
      bar.className = "bar";
      // deterministic-ish pseudo-random height pattern (sine + noise)
      var base = Math.sin(i * 0.35) * 0.5 + 0.5; // 0..1
      var noise = Math.sin(i * 1.7) * 0.15;
      var heightPct = Math.max(0.12, Math.min(1, base + noise));
      var heightPx = 10 + heightPct * 54;
      bar.style.height = heightPx.toFixed(1) + "px";
      waveform.appendChild(bar);
      bars.push(bar);
    }

    if (!prefersReducedMotion) {
      var start = null;

      function animateWave(ts) {
        if (start === null) start = ts;
        var elapsed = (ts - start) / 1000;

        bars.forEach(function (bar, i) {
          var base = Math.sin(i * 0.35) * 0.5 + 0.5;
          var noise = Math.sin(i * 1.7) * 0.15;
          var wobble = Math.sin(elapsed * 1.6 + i * 0.4) * 0.12;
          var heightPct = Math.max(0.1, Math.min(1, base + noise + wobble));
          var heightPx = 10 + heightPct * 54;
          bar.style.height = heightPx.toFixed(1) + "px";
        });

        requestAnimationFrame(animateWave);
      }

      requestAnimationFrame(animateWave);
    }
  }

  /* ---------------------------------------------------------------------
     3. Reveal-on-scroll
     ------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------------------------------------------------------------
     4. Contact form — validation + mailto handoff
     ------------------------------------------------------------------- */
  var contactForm = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = contactForm.querySelector("#name").value.trim();
      var email = contactForm.querySelector("#email").value.trim();
      var message = contactForm.querySelector("#message").value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in every field before sending.";
        formStatus.style.color = "#b5502e";
        return;
      }

      if (!emailPattern.test(email)) {
        formStatus.textContent = "That email address doesn't look right — please check it.";
        formStatus.style.color = "#b5502e";
        return;
      }

      var subject = encodeURIComponent("Portfolio contact from " + name);
      var body = encodeURIComponent(
        message + "\n\n— " + name + " (" + email + ")"
      );
      var mailLink =
        contactForm.getAttribute("data-mailto") || "youremail@example.com";

      window.location.href =
        "mailto:" + mailLink + "?subject=" + subject + "&body=" + body;

      formStatus.style.color = "#5c6b2c";
      formStatus.textContent = "Opening your email app now — thanks for writing!";
      contactForm.reset();
    });
  }

  /* ---------------------------------------------------------------------
     5. Footer year
     ------------------------------------------------------------------- */
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
