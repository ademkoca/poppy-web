/*
  POPPY: ponašanje stranice (meni, filter, animacije, maskota).
  Učitava se poslednji, posle config-a, i18n-a i render.js.
*/
(function () {
  "use strict";

  var I = window.PoppyI18n;
  var R = window.PoppyRender;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------- Mobilni meni ---------------- */
  function setupMenu() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    function setOpen(open, returnFocus) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", I.t(open ? "a11y.menuClose" : "a11y.menuOpen"));
      document.body.classList.toggle("menu-open", open);
      if (!open && returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false, true);
    });

    // Na širem ekranu meni je uvek vidljiv, pa se stanje resetuje.
    window.matchMedia("(min-width: 900px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });

    document.addEventListener("poppy:langchange", function () {
      setOpen(toggle.getAttribute("aria-expanded") === "true");
    });
  }

  /* ---------------- Senka headera pri skrolu ---------------- */
  function setupHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------------- Filter proizvoda i prekidač jezika ---------------- */
  function setupDelegatedClicks() {
    document.addEventListener("click", function (event) {
      var filterBtn = event.target.closest(".filter-btn");
      if (filterBtn) {
        R.setCategory(filterBtn.getAttribute("data-filter"));
        return;
      }
      var langBtn = event.target.closest(".lang-btn");
      if (langBtn) I.setLang(langBtn.getAttribute("data-lang"));
    });

    document.addEventListener("poppy:langchange", function () {
      R.renderAll();
    });
  }

  /* ---------------- Pojavljivanje pri skrolu i klimanje maskote ---------------- */
  var observer = null;

  function observe(root) {
    var scope = root || document;
    var targets = scope.querySelectorAll(".reveal:not(.is-visible), .mascot:not(.has-nodded)");
    if (!observer || reduceMotion.matches) {
      targets.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }
    targets.forEach(function (node) {
      observer.observe(node);
    });
  }

  function setupObserver() {
    document.documentElement.classList.add("js");
    if (!("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var node = entry.target;
        if (node.classList.contains("mascot")) {
          node.classList.add("has-nodded", "is-nodding");
          node.addEventListener("animationend", function () {
            node.classList.remove("is-nodding");
          }, { once: true });
        } else {
          node.classList.add("is-visible");
        }
        observer.unobserve(node);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  }

  /* ---------------- Start ---------------- */
  function init() {
    setupObserver();
    document.addEventListener("poppy:rendered", function (event) {
      observe(event.detail && event.detail.root);
    });
    R.renderAll();
    setupMenu();
    setupHeader();
    setupDelegatedClicks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
