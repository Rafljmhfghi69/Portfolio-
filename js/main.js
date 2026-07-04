/* =========================================================================
   ABU-HURAIRA — Now Exhibiting
   main.js — onboarding banner, reveal-on-scroll, contact form, footer year
   ========================================================================= */

(function () {
  "use strict";

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
     2. Reveal-on-scroll
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
     3. Active nav link highlighting on scroll
     ------------------------------------------------------------------- */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll(".masthead-nav a");

  function highlightNav() {
    var currentId = "";
    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top;
      if (top <= window.innerHeight * 0.4) {
        currentId = section.getAttribute("id");
      }
    });
    navAnchors.forEach(function (anchor) {
      anchor.style.color = "";
      if (anchor.getAttribute("href") === "#" + currentId) {
        anchor.style.color = "var(--accent)";
      }
    });
  }
  window.addEventListener("scroll", highlightNav, { passive: true });
  window.addEventListener("load", highlightNav);

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
        formStatus.style.color = "#8a1f11";
        return;
      }

      if (!emailPattern.test(email)) {
        formStatus.textContent = "That email address doesn't look right — please check it.";
        formStatus.style.color = "#8a1f11";
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

      formStatus.style.color = "#4a6b3a";
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
