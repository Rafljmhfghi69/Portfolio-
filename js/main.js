/* =========================================================================
   ABU-HURAIRA — ~/portfolio
   main.js — terminal typing sequence, tab/file switching, reveal-on-scroll,
   contact form, status bar sync
   ========================================================================= */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------------------
     0. Onboarding banner — plain-language helper for non-technical visitors
     ------------------------------------------------------------------- */
  var banner = document.getElementById("onboard-banner");
  var bannerClose = document.getElementById("onboard-close");
  var root = document.documentElement;

  function syncBannerHeight() {
    if (banner && !banner.classList.contains("is-hidden")) {
      root.style.setProperty("--banner-h", banner.offsetHeight + "px");
    } else {
      root.style.setProperty("--banner-h", "0px");
    }
  }

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
      setTimeout(syncBannerHeight, 350);
    });

    window.addEventListener("resize", syncBannerHeight);
    window.addEventListener("load", syncBannerHeight);
    syncBannerHeight();
  }

  /* ---------------------------------------------------------------------
     1. Terminal typing sequence (about.md hero)
     ------------------------------------------------------------------- */
  var termBody = document.getElementById("term-body");

  var termScript = [
    { type: "cmd", prompt: "abu@dev ~", text: "whoami" },
    { type: "out", text: "Abu-Huraira — 19 — undergraduate — self-taught" },
    { type: "cmd", prompt: "abu@dev ~", text: "cat status.txt" },
    {
      type: "out",
      text: "Learning to build with AI-assisted development tools.",
      accent: true,
    },
    { type: "cmd", prompt: "abu@dev ~", text: "./run.sh --intro" },
    { type: "out", text: "Welcome. Scroll down, or open a file on the left." },
  ];

  function renderStaticTerminal() {
    var html = "";
    termScript.forEach(function (line) {
      if (line.type === "cmd") {
        html +=
          '<div class="term-line"><span class="term-prompt">' +
          line.prompt +
          '$</span><span class="term-cmd">' +
          line.text +
          "</span></div>";
      } else {
        html +=
          '<div class="term-output' +
          (line.accent ? " accent-out" : "") +
          '">' +
          line.text +
          "</div>";
      }
    });
    termBody.innerHTML = html;
  }

  function typeTerminal() {
    var lineIndex = 0;
    var charIndex = 0;
    var container = document.createElement("div");
    termBody.innerHTML = "";
    termBody.appendChild(container);

    function nextLine() {
      if (lineIndex >= termScript.length) {
        var cursor = document.createElement("span");
        cursor.className = "cursor-block";
        container.appendChild(cursor);
        return;
      }

      var line = termScript[lineIndex];
      var lineEl = document.createElement("div");

      if (line.type === "cmd") {
        lineEl.className = "term-line";
        var promptSpan = document.createElement("span");
        promptSpan.className = "term-prompt";
        promptSpan.textContent = line.prompt + "$";
        var cmdSpan = document.createElement("span");
        cmdSpan.className = "term-cmd";
        lineEl.appendChild(promptSpan);
        lineEl.appendChild(cmdSpan);
        container.appendChild(lineEl);
        charIndex = 0;

        function typeChar() {
          if (charIndex <= line.text.length) {
            cmdSpan.textContent = line.text.slice(0, charIndex);
            charIndex++;
            setTimeout(typeChar, 32);
          } else {
            lineIndex++;
            setTimeout(nextLine, 260);
          }
        }
        typeChar();
      } else {
        lineEl.className = "term-output" + (line.accent ? " accent-out" : "");
        lineEl.textContent = line.text;
        lineEl.style.opacity = "0";
        container.appendChild(lineEl);
        requestAnimationFrame(function () {
          lineEl.style.transition = "opacity 0.3s";
          lineEl.style.opacity = "1";
        });
        lineIndex++;
        setTimeout(nextLine, 420);
      }
    }

    nextLine();
  }

  if (termBody) {
    if (prefersReducedMotion) {
      renderStaticTerminal();
    } else {
      typeTerminal();
    }
  }

  /* ---------------------------------------------------------------------
     2. File tab / sidebar switching + active state sync
     ------------------------------------------------------------------- */
  var panes = Array.prototype.slice.call(document.querySelectorAll(".pane"));
  var fileLinks = Array.prototype.slice.call(
    document.querySelectorAll(".file-item, .tab")
  );
  var statusFile = document.getElementById("status-file");
  var titlebarTitle = document.querySelector(".titlebar-title");

  function setActiveFile(fileKey) {
    fileLinks.forEach(function (link) {
      link.classList.toggle(
        "is-active",
        link.getAttribute("data-file") === fileKey
      );
    });

    var pane = panes.filter(function (p) {
      return p.getAttribute("data-file") === fileKey;
    })[0];

    if (pane && statusFile) {
      statusFile.textContent = pane.getAttribute("data-title") || fileKey;
    }
    if (pane && titlebarTitle) {
      titlebarTitle.textContent =
        "abu-huraira — ~/portfolio — " + (pane.getAttribute("data-title") || fileKey);
    }
  }

  fileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var fileKey = link.getAttribute("data-file");
      setActiveFile(fileKey);
      // close mobile sidebar after choosing a file
      var sidebar = document.getElementById("sidebar");
      if (sidebar && window.innerWidth < 900) {
        sidebar.classList.add("is-closed");
      }
    });
  });

  if ("IntersectionObserver" in window && panes.length) {
    var paneObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveFile(entry.target.getAttribute("data-file"));
          }
        });
      },
      { threshold: 0.5 }
    );
    panes.forEach(function (pane) {
      paneObserver.observe(pane);
    });
  }

  /* ---------------------------------------------------------------------
     3. Mobile sidebar toggle
     ------------------------------------------------------------------- */
  var menuBtn = document.getElementById("menu-btn");
  var sidebarEl = document.getElementById("sidebar");

  if (menuBtn && sidebarEl) {
    sidebarEl.classList.add("is-closed");

    menuBtn.addEventListener("click", function () {
      sidebarEl.classList.toggle("is-closed");
    });

    function syncSidebarForWidth() {
      if (window.innerWidth >= 900) {
        sidebarEl.classList.remove("is-closed");
      } else {
        sidebarEl.classList.add("is-closed");
      }
    }
    window.addEventListener("resize", syncSidebarForWidth);
    syncSidebarForWidth();
  }

  /* ---------------------------------------------------------------------
     4. Reveal-on-scroll
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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
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
     5. Contact form — validation + mailto handoff
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
        formStatus.style.color = "#f14c4c";
        return;
      }

      if (!emailPattern.test(email)) {
        formStatus.textContent = "That email address doesn't look right — please check it.";
        formStatus.style.color = "#f14c4c";
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

      formStatus.style.color = "#7ee787";
      formStatus.textContent = "Opening your email app now — thanks for writing!";
      contactForm.reset();
    });
  }

  /* ---------------------------------------------------------------------
     6. Footer / status bar year
     ------------------------------------------------------------------- */
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
