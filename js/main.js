/* =========================================================================
   ABU-HURAIRA — PORTFOLIO
   main.js — nav, theme toggle, smooth scroll, contact form, misc UI
   ========================================================================= */

(function () {
  "use strict";

  document.body.classList.add("no-scroll");

  /* ---------------------------------------------------------------------
     1. Mobile nav toggle
     ------------------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var navLinksWrap = document.getElementById("nav-links");

  if (navToggle && navLinksWrap) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("is-active");
      navLinksWrap.classList.toggle("is-active");
    });

    navLinksWrap.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.classList.remove("is-active");
        navLinksWrap.classList.remove("is-active");
      });
    });
  }

  /* ---------------------------------------------------------------------
     2. Theme toggle (persisted via localStorage)
     ------------------------------------------------------------------- */
  var themeToggle = document.getElementById("theme-toggle");
  var storedTheme = null;
  try {
    storedTheme = localStorage.getItem("portfolio-theme");
  } catch (e) {
    storedTheme = null;
  }

  if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "light" ? "dark" : "light";

      if (next === "dark") {
        document.documentElement.removeAttribute("data-theme");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }

      try {
        localStorage.setItem("portfolio-theme", next);
      } catch (e) {
        /* localStorage unavailable — ignore */
      }
    });
  }

  /* ---------------------------------------------------------------------
     3. Active nav link highlighting on scroll
     ------------------------------------------------------------------- */
  var sections = document.querySelectorAll("section[id]");
  var navAnchors = document.querySelectorAll(".nav-link");

  function highlightNav() {
    var currentId = "";
    sections.forEach(function (section) {
      var top = section.offsetTop - 140;
      if (window.scrollY >= top) {
        currentId = section.getAttribute("id");
      }
    });

    navAnchors.forEach(function (anchor) {
      anchor.classList.remove("is-active");
      if (anchor.getAttribute("href") === "#" + currentId) {
        anchor.classList.add("is-active");
      }
    });
  }
  window.addEventListener("scroll", highlightNav, { passive: true });
  window.addEventListener("load", highlightNav);

  /* ---------------------------------------------------------------------
     4. Back-to-top button
     ------------------------------------------------------------------- */
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 600) {
          backToTop.classList.add("is-visible");
        } else {
          backToTop.classList.remove("is-visible");
        }
      },
      { passive: true }
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------------------
     5. Contact form — client-side validation + mailto handoff
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
        formStatus.textContent = "Please fill in all fields.";
        formStatus.style.color = "#ff5f7a";
        return;
      }

      if (!emailPattern.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.style.color = "#ff5f7a";
        return;
      }

      var subject = encodeURIComponent("Portfolio contact from " + name);
      var body = encodeURIComponent(
        message + "\n\n— " + name + " (" + email + ")"
      );
      var mailLink = contactForm.getAttribute("data-mailto") || "youremail@example.com";

      window.location.href =
        "mailto:" + mailLink + "?subject=" + subject + "&body=" + body;

      formStatus.style.color = "";
      formStatus.textContent =
        "Opening your email client... thanks for reaching out!";
      contactForm.reset();
    });
  }

  /* ---------------------------------------------------------------------
     6. Footer year
     ------------------------------------------------------------------- */
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
