/* =========================================================================
   app.js — amorçage, routeur (hash), chrome de l'application (nav, thème)
   ========================================================================= */
(function () {
  "use strict";

  var FW = (window.FW = window.FW || {});
  var ui = FW.ui;
  var store = FW.store;
  var views = FW.views;

  var mainEl = document.getElementById("view");
  var navEl = document.getElementById("nav");
  var crumbsEl = document.getElementById("crumbs");
  var sideProgressEl = document.getElementById("sidebar-progress");
  var resumeEl = document.getElementById("resume-link");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("scrim");
  var menuToggle = document.getElementById("menu-toggle");
  var openGroups = {};
  var current = { route: "home", id: null };

  /* --------------------------------------------------------------- thème -- */

  function preferredTheme() {
    var saved = store.theme();
    if (saved === "light" || saved === "dark") return saved;
    try {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
    } catch (e) { /* ignore */ }
    return "dark";
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    var isLight = theme === "light";
    document.querySelectorAll("#theme-toggle .theme-label").forEach(function (el) {
      el.textContent = isLight ? "Thème clair" : "Thème sombre";
    });
    ["theme-toggle", "theme-toggle-top"].forEach(function (id) {
      var btn = document.getElementById(id);
      if (!btn) return;
      var holder = btn.querySelector(".icon");
      if (holder) holder.outerHTML = ui.icon(isLight ? "sun" : "moon");
      btn.setAttribute("aria-pressed", String(isLight));
      if (id === "theme-toggle") btn.setAttribute("aria-pressed", String(isLight));
    });
    if (persist) store.setTheme(theme);
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function toggleTheme() {
    applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
  }

  /* ---------------------------------------------------------- chrome ------- */

  function buildNav() {
    var mods = store.modules();
    var html = '<a class="nav__link' + (current.route === "home" ? " is-active" : "") + '" href="#/">' +
      ui.icon("home") + '<span class="nav__label">Accueil</span></a>';

    mods.forEach(function (m) {
      var p = store.moduleProgress(m);
      var isActiveModule = current.id === m.id || (current.moduleId === m.id);
      if (openGroups[m.id] === undefined) openGroups[m.id] = isActiveModule;
      var open = !!openGroups[m.id];
      var links = '<a class="nav__link' + (current.route === "module" && current.id === m.id ? " is-active" : "") +
        '" href="#/module/' + m.id + '">' + ui.icon("layers") + '<span class="nav__label">Vue d\'ensemble</span></a>';
      links += (m.lessons || []).map(function (l, i) {
        var done = store.lessonDone(l.id);
        var isCurrent = current.route === "lesson" && current.id === l.id;
        return '<a class="nav__link' + (isCurrent ? " is-active" : "") + '" href="#/lesson/' + l.id + '">' +
          '<span class="nav__dot' + (done ? " is-done" : "") + '"></span>' +
          '<span class="nav__index">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<span class="nav__label">' + ui.esc(stripTags(l.title)) + "</span></a>";
      }).join("");

      html += '<div class="nav__group">' +
        '<button class="nav__group-head" type="button" data-group="' + m.id + '" aria-expanded="' + open + '">' +
        ui.icon("chevron-down") + "<span>" + ui.esc(m.title.split("—")[0].trim()) + "</span>" +
        '<span class="nav__group-count">' + p.lessons.done + "/" + p.lessons.total + "</span></button>" +
        '<div class="nav__items"' + (open ? "" : " hidden") + ">" + links + "</div></div>";
    });

    html += '<div class="nav__group">' +
      '<a class="nav__link' + (current.route === "project" ? " is-active" : "") + '" href="#/projet">' +
      ui.icon("trophy") + '<span class="nav__label">Projet final</span></a>' +
      '<a class="nav__link' + (current.route === "progress" ? " is-active" : "") + '" href="#/progression">' +
      ui.icon("target") + '<span class="nav__label">Ma progression</span></a>' +
      '<a class="nav__link' + (current.route === "guide" ? " is-active" : "") + '" href="#/guide">' +
      ui.icon("book") + '<span class="nav__label">Guide d\'utilisation</span></a></div>';

    navEl.innerHTML = html;

    navEl.querySelectorAll("[data-group]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-group");
        var expanded = btn.getAttribute("aria-expanded") === "true";
        openGroups[id] = !expanded;
        btn.setAttribute("aria-expanded", String(!expanded));
        var items = btn.parentElement.querySelector(".nav__items");
        if (items) items.hidden = expanded;
      });
    });

    var o = store.overall();
    sideProgressEl.innerHTML = '<div class="pbar"><div class="pbar__label"><span>Parcours</span><span>' +
      o.pct + "%</span></div>" +
      '<div class="pbar__track"><div class="pbar__fill" style="width:' + o.pct + '%"></div></div></div>';

    var last = store.last();
    if (last && last.id && last.type && last.type !== "quiz") {
      resumeEl.hidden = false;
      resumeEl.href = last.type === "project" ? "#/projet" : "#/" + (last.type === "lesson" ? "lesson" : "exercise") + "/" + last.id;
    } else {
      resumeEl.hidden = true;
    }
  }

  function stripTags(text) {
    return String(text || "").replace(/<[^>]*>/g, "");
  }

  function setCrumbs(crumbs) {
    if (!crumbs || !crumbs.length) { crumbsEl.innerHTML = ""; return; }
    crumbsEl.innerHTML = crumbs.map(function (c, i) {
      var sep = i > 0 ? '<span class="sep">/</span>' : "";
      if (c.href) return sep + '<a href="' + c.href + '">' + ui.esc(c.label) + "</a>";
      return sep + '<span class="current">' + ui.esc(c.label) + "</span>";
    }).join("");
  }

  function refreshChrome() {
    buildNav();
  }

  /* ------------------------------------------------------------- routeur -- */

  function parseHash() {
    var raw = (window.location.hash || "").replace(/^#/, "");
    if (!raw) raw = "/";
    if (raw.charAt(0) !== "/") return { path: "/" };
    var parts = raw.split("/").filter(Boolean);
    return { path: raw, parts: parts };
  }

  function resolveRoute() {
    var parsed = parseHash();
    var parts = parsed.parts || [];

    if (!parts.length) return { route: "home", view: views.home() };
    if (parts[0] === "module" && parts[1]) return { route: "module", id: parts[1], moduleId: parts[1], view: views.module(parts[1]) };
    if (parts[0] === "lesson" && parts[1]) {
      var entry = store.lessonById(parts[1]);
      return { route: "lesson", id: parts[1], moduleId: entry ? entry.module.id : null, view: views.lesson(parts[1]) };
    }
    if (parts[0] === "exercise" && parts[1]) {
      var exEntry = store.exerciseById(parts[1]);
      return { route: "exercise", id: parts[1], moduleId: exEntry ? exEntry.module.id : null, view: views.exercise(parts[1]) };
    }
    if (parts[0] === "quiz" && parts[1]) return { route: "quiz", id: null, moduleId: parts[1], view: views.quiz(parts[1]) };
    if (parts[0] === "projet") return { route: "project", id: null, view: views.project(parts[1]) };
    if (parts[0] === "progression") return { route: "progress", id: null, view: views.progress() };
    if (parts[0] === "guide") return { route: "guide", id: null, view: views.guide() };
    return { route: "home", view: views.notFound("Page introuvable") };
  }

  function render() {
    FW.render.reset();
    var resolved;
    try {
      resolved = resolveRoute();
    } catch (e) {
      mainEl.innerHTML = '<div class="empty-state"><h2 class="h2">Erreur de rendu</h2>' +
        '<p class="muted small">' + ui.esc(e && e.message ? e.message : String(e)) + "</p></div>";
      return;
    }

    current = { route: resolved.route, id: resolved.id, moduleId: resolved.moduleId };

    mainEl.innerHTML = resolved.view.html || "";
    setCrumbs(resolved.view.crumbs);
    buildNav();

    if (typeof resolved.view.mount === "function") {
      try {
        resolved.view.mount(mainEl);
      } catch (e) {
        ui.toast("Erreur lors de l'initialisation de la vue", "error");
        if (window.console) console.error(e);
      }
    }
    document.title = documentTitle(resolved) + " · Formation Web";
    closeNav();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function documentTitle(resolved) {
    var crumbs = resolved.view && resolved.view.crumbs;
    if (crumbs && crumbs.length) return stripTags(crumbs[crumbs.length - 1].label);
    return "Formation Web";
  }

  /* --------------------------------------------------------- navigation ---- */

  var isNarrow = function () {
    return window.matchMedia("(max-width: 860px)").matches;
  };
  var collapsed = false;
  var appEl = document.querySelector(".app");

  function openNav() {
    document.body.classList.add("nav-open");
    scrim.hidden = false;
    updateMenuButton();
  }
  function closeNav() {
    document.body.classList.remove("nav-open");
    scrim.hidden = true;
    updateMenuButton();
  }

  /** Applique l'état replié / déplié de la colonne de gauche (écrans larges). */
  function applySidebar() {
    var narrow = isNarrow();
    if (appEl) appEl.classList.toggle("is-collapsed", !narrow && collapsed);
    if (narrow) {
      document.body.classList.remove("nav-open");
      scrim.hidden = true;
    }
    updateMenuButton();
  }

  function updateMenuButton() {
    if (!menuToggle) return;
    var narrow = isNarrow();
    var drawerOpen = document.body.classList.contains("nav-open");
    var visible = narrow ? drawerOpen : !collapsed;
    var holder = menuToggle.querySelector(".icon");
    if (holder) holder.outerHTML = ui.icon(narrow ? "menu" : (collapsed ? "panel-left-open" : "panel-left"));
    menuToggle.setAttribute("aria-expanded", String(visible));
    menuToggle.setAttribute("aria-label",
      narrow ? (visible ? "Fermer le menu" : "Ouvrir le menu")
             : (visible ? "Masquer le menu" : "Afficher le menu"));
    menuToggle.title = narrow ? (visible ? "Fermer le menu" : "Ouvrir le menu")
                              : (visible ? "Masquer le menu" : "Afficher le menu");
  }

  function toggleSidebar() {
    if (isNarrow()) {
      if (document.body.classList.contains("nav-open")) closeNav();
      else openNav();
      return;
    }
    collapsed = !collapsed;
    store.setSidebarCollapsed(collapsed);
    applySidebar();
  }

  /* ------------------------------------------------------------- montage -- */

  function bindGlobal() {
    document.addEventListener("click", function (event) {
      var copyTarget = event.target.closest("[data-copy]");
      if (copyTarget) {
        var id = copyTarget.getAttribute("data-copy");
        var copies = FW.render.copies();
        if (copies && copies[id] != null) ui.copyText(copies[id]);
        return;
      }
      var anchor = event.target.closest("[data-anchor]");
      if (anchor) {
        event.preventDefault();
        var name = anchor.getAttribute("href");
        var target = name ? document.querySelector(name) : null;
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (event.target.closest("#menu-toggle")) {
        toggleSidebar();
        return;
      }
      if (event.target.closest("#theme-toggle, #theme-toggle-top")) {
        toggleTheme();
        return;
      }
      if (event.target.closest("#scrim")) {
        closeNav();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("hashchange", function () {
      // Les ancres internes (TOC) ne doivent pas re-rendre la page.
      if (window.location.hash && window.location.hash.charAt(1) !== "/") return;
      render();
    });

    var onResize = ui.debounce(function () {
      applySidebar();
    }, 120);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
  }

  function boot() {
    store.load();
    applyTheme(preferredTheme(), false);
    collapsed = store.sidebarCollapsed();
    applySidebar();
    bindGlobal();
    render();
    registerServiceWorker();
  }

  function registerServiceWorker() {
    // Service worker = installation PWA + mode hors ligne.
    // Indisponible sur file:// ou sur les navigateurs qui ne le supportent pas.
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {
        /* échec silencieux : l'app fonctionne juste sans installation PWA */
      });
    });
  }

  FW.app = {
    render: render,
    rerender: render,
    refreshChrome: refreshChrome,
    toggleTheme: toggleTheme,
    toggleSidebar: toggleSidebar
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
