/* =========================================================================
   ABU-HURAIRA — ISSUE N°01
   main.js — cursor label, section rail, reveal-on-scroll, contact form
   ========================================================================= */

(function () {
  "use strict";

  var isTouch = window.matchMedia("(pointer: coarse)").matches;
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------------------
     1. Custom cursor with contextual label
     ------------------------------------------------------------------- */
  if (!isTouch) {
    var cursor = document.getElementById("cursor");
    var cursorLabel = document.getElementById("cursor-label");

    if (cursor && cursorLabel) {
      window.addEventListener("mousemove", function (e) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      });

      var labelTargets = document.querySelectorAll("[data-cursor]");
      labelTargets.forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursorLabel.textContent = el.getAttribute("data-cursor") || "";
          cursor.classList.add("is-active");
        });
        el.addEventListener("mouseleave", function () {
          cursor.classList.remove("is-active");
        });
      });

      document.addEventListener("mouseleave", function () {
        cursor.style.opacity = "0";
      });
      document.addEventListener("mouseenter", function () {
        cursor.style.opacity = "1";
      });
    }
  }

  /* ---------------------------------------------------------------------
     2. Section rail — ticks reflecting scroll position, clickable
     ------------------------------------------------------------------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[data-section], section[data-section]")
  );
  var rail = document.getElementById("rail");
  var railCount = document.getElementById("rail-count");

  if (rail && sections.length) {
    sections.forEach(function (section, i) {
      var tick = document.createElement("button");
      tick.className = "rail-tick";
      tick.setAttribute(
        "aria-label",
        "Go to " + (section.getAttribute("data-section") || "section " + (i + 1))
      );
      tick.addEventListener("click", function () {
        section.scrollIntoView({ behavior: "smooth" });
      });
      rail.appendChild(tick);
    });

    var ticks = rail.querySelectorAll(".rail-tick");

    function updateRail() {
      var current = 0;
      sections.forEach(function (section, i) {
        var top = section.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.5) {
          current = i;
        }
      });

      ticks.forEach(function (tick, i) {
        tick.classList.toggle("is-current", i === current);
      });

      if (railCount) {
        var num = String(current + 1).padStart(2, "0");
        var total = String(sections.length).padStart(2, "0");
        railCount.textContent = num + " / " + total;
      }
    }

    window.addEventListener("scroll", updateRail, { passive: true });
    window.addEventListener("resize", updateRail);
    window.addEventListener("load", updateRail);
    updateRail();
  }

  /* ---------------------------------------------------------------------
     3. Reveal-on-scroll via IntersectionObserver
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
        formStatus.textContent = "— please fill in every field.";
        formStatus.style.color = "#c0311a";
        return;
      }

      if (!emailPattern.test(email)) {
        formStatus.textContent = "— that email doesn't look right.";
        formStatus.style.color = "#c0311a";
        return;
      }

      var subject = encodeURIComponent("Notebook contact from " + name);
      var body = encodeURIComponent(
        message + "\n\n— " + name + " (" + email + ")"
      );
      var mailLink =
        contactForm.getAttribute("data-mailto") || "youremail@example.com";

      window.location.href =
        "mailto:" + mailLink + "?subject=" + subject + "&body=" + body;

      formStatus.style.color = "";
      formStatus.textContent = "— opening your mail client. Thanks for writing.";
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
