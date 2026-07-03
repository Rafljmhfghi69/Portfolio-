/* =========================================================================
   ABU-HURAIRA — PORTFOLIO
   animations.js — canvas background, cursor, scroll reveal, typing effect
   ========================================================================= */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  var isTouch = window.matchMedia("(pointer: coarse)").matches;

  /* ---------------------------------------------------------------------
     1. Preloader
     ------------------------------------------------------------------- */
  window.addEventListener("load", function () {
    var preloader = document.querySelector(".preloader");
    if (!preloader) return;
    setTimeout(function () {
      preloader.classList.add("is-hidden");
      document.body.classList.remove("no-scroll");
    }, 700);
  });

  /* ---------------------------------------------------------------------
     2. Custom cursor (desktop only)
     ------------------------------------------------------------------- */
  if (!isTouch && !prefersReducedMotion) {
    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");

    if (dot && ring) {
      var mouseX = 0,
        mouseY = 0,
        ringX = 0,
        ringY = 0;

      window.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
      });

      function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
        requestAnimationFrame(animateRing);
      }
      animateRing();

      var interactive = document.querySelectorAll(
        "a, button, .skill-card, .project-card, input, textarea"
      );
      interactive.forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          ring.classList.add("is-active");
        });
        el.addEventListener("mouseleave", function () {
          ring.classList.remove("is-active");
        });
      });
    }
  }

  /* ---------------------------------------------------------------------
     3. Scroll progress bar
     ------------------------------------------------------------------- */
  var progressBar = document.querySelector(".scroll-progress");
  function updateScrollProgress() {
    if (!progressBar) return;
    var scrollTop = window.scrollY;
    var docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---------------------------------------------------------------------
     4. Scroll-triggered reveal via IntersectionObserver
     ------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-scale");
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
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
     5. Skill bar fill on visibility
     ------------------------------------------------------------------- */
  var skillBars = document.querySelectorAll(".skill-bar span");
  if ("IntersectionObserver" in window && skillBars.length) {
    var skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var target = entry.target.getAttribute("data-fill") || "0";
            entry.target.style.width = target + "%";
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    skillBars.forEach(function (el) {
      skillObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     6. Typing role rotator in hero
     ------------------------------------------------------------------- */
  var typedEl = document.getElementById("typed-role");
  var roles = [
    "Aspiring Developer",
    "AI-Assisted Builder",
    "Self-Taught Learner",
    "Curious Problem Solver",
  ];

  if (typedEl) {
    var roleIndex = 0,
      charIndex = 0,
      deleting = false;

    function typeLoop() {
      var current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 65);
    }
    typeLoop();
  }

  /* ---------------------------------------------------------------------
     7. Magnetic buttons
     ------------------------------------------------------------------- */
  if (!isTouch && !prefersReducedMotion) {
    var magnets = document.querySelectorAll(".magnetic");
    magnets.forEach(function (magnet) {
      magnet.addEventListener("mousemove", function (e) {
        var rect = magnet.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        magnet.style.transform =
          "translate(" + x * 0.25 + "px, " + y * 0.35 + "px)";
      });
      magnet.addEventListener("mouseleave", function () {
        magnet.style.transform = "translate(0, 0)";
      });
    });
  }

  /* ---------------------------------------------------------------------
     8. Hero canvas — connected particle network
     ------------------------------------------------------------------- */
  var canvas = document.getElementById("hero-canvas");
  if (canvas && !prefersReducedMotion) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var particleCount = isTouch ? 35 : 70;
    var w, h;
    var mouse = { x: null, y: null, radius: 120 };

    function resize() {
      var hero = canvas.closest(".hero");
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }

    function Particle() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.6 + 0.6;
    }

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;

      if (mouse.x !== null) {
        var dx = this.x - mouse.x;
        var dy = this.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          var force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.2;
          this.y += (dy / dist) * force * 1.2;
        }
      }
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(124, 92, 255, 0.7)";
      ctx.fill();
    };

    function init() {
      resize();
      particles = [];
      for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connect() {
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle =
              "rgba(52, 224, 216, " + (1 - dist / 130) * 0.25 + ")";
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(function (p) {
        p.update();
        p.draw();
      });
      connect();
      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener("mouseleave", function () {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener("resize", init);

    init();
    animate();
  }
})();
