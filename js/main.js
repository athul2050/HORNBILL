(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Mega-menu open/close (click + keyboard, works for touch and desktop)
  document.querySelectorAll(".nav-item").forEach(function (item) {
    var btn = item.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".nav-item.is-open").forEach(function (o) {
        if (o !== item) {
          o.classList.remove("is-open");
          var ob = o.querySelector("button");
          if (ob) ob.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-item")) {
      document.querySelectorAll(".nav-item.is-open").forEach(function (o) {
        o.classList.remove("is-open");
        var ob = o.querySelector("button");
        if (ob) ob.setAttribute("aria-expanded", "false");
      });
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".nav-item.is-open").forEach(function (o) {
        o.classList.remove("is-open");
      });
      if (nav) nav.classList.remove("is-open");
    }
  });

  // Scroll-reveal, once per element, skipped entirely under reduced motion.
  // Elements are visible by default in CSS; only opt into the hidden
  // "pending" state here, right before observing them, so a JS failure
  // never leaves content stuck invisible.
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (!prefersReduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("is-pending");
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealEls.forEach(function (el) {
      el.classList.add("is-pending");
      io.observe(el);
    });
  }

  // Enquiry form — prototype has no backend, so submission is intercepted
  // and replaced with a confirmation message rather than posting anywhere.
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      form.hidden = true;
      if (status) {
        status.hidden = false;
        status.focus();
      }
    });
  }
})();
