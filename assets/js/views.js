/* =========================================================================
   views.js — vues de l'application (accueil, module, leçon, exercice,
   quiz, projet final, progression)
   ========================================================================= */
(function () {
  "use strict";

  var FW = (window.FW = window.FW || {});
  var ui = FW.ui;
  var store = FW.store;
  var render = FW.render;
  var editor = FW.editor;

  function esc(s) { return ui.esc(s); }
  function md(s) { return ui.md(s); }

  function chipForModule(m) {
    var cls = { html: "chip--html", css: "chip--css", js: "chip--js" }[m.id] || "";
    return '<span class="chip ' + cls + '">' + esc(m.title.split("—")[0].trim()) + "</span>";
  }

  function moduleLessonIndex(m, lessonId) {
    return (m.lessons || []).findIndex(function (l) { return l.id === lessonId; });
  }

  /* ------------------------------------------------------------ accueil -- */

  function home() {
    var o = store.overall();
    var mods = store.modules();
    var last = store.last();
    var hours = mods.reduce(function (n, m) { return n + (m.hours || 0); }, 0);
    var lessonCount = store.allLessons().length;
    var exCount = store.allExercises().length;

    var resume = "";
    if (last && last.id) {
      var label = "Continuer";
      var href = "#/";
      if (last.type === "lesson") {
        var entry = store.lessonById(last.id);
        if (entry) { label = "Reprendre : " + entry.lesson.title; href = "#/lesson/" + last.id; }
      } else if (last.type === "exercise") {
        var ex = store.exerciseById(last.id);
        if (ex) { label = "Reprendre : " + ex.exercise.title; href = "#/exercise/" + last.id; }
      } else if (last.type === "project") {
        label = "Reprendre le projet final"; href = "#/projet";
      }
      if (href !== "#/") {
        resume = '<a class="card card--flat" href="' + href +
          '" style="display:flex;align-items:center;gap:12px;text-decoration:none">' +
          '<span class="badge-card__icon" style="background:var(--accent-soft);color:var(--accent)">' + ui.icon("play") + "</span>" +
          '<span style="flex:1"><strong style="display:block;font-size:14px">' + esc(label) + "</strong>" +
          '<small class="muted" style="font-size:12px">Reprenez là où vous vous êtes arrêté.</small></span>' +
          ui.icon("arrow-right") + "</a>";
      }
    }

    var moduleCards = mods.map(function (m) {
      var p = store.moduleProgress(m);
      return (
        '<a class="module-card" href="#/module/' + m.id + '" style="--module-accent:' + (m.accent || "var(--accent)") + '">' +
        '<div class="module-card__top">' +
        '<span class="module-card__icon">' + ui.icon(m.icon || "code") + "</span>" +
        '<span class="module-card__num">MODULE 0' + (m.number || 1) + "</span>" +
        '<span class="grow"></span>' +
        '<span class="chip ' + ({ html: "chip--html", css: "chip--css", js: "chip--js" }[m.id] || "") + '">' + p.pct + "%</span>" +
        "</div>" +
        '<div><div class="module-card__title">' + md(m.title) + "</div>" +
        '<div class="module-card__desc">' + md(m.subtitle || m.description || "") + "</div></div>" +
        ui.pbar(p.pct) +
        '<div class="module-card__meta">' +
        "<span>" + ui.icon("book") + " " + (m.lessons || []).length + " leçons</span>" +
        "<span>" + ui.icon("code") + " " + p.exercises.total + " exercices</span>" +
        "<span>" + ui.icon("clock") + " " + (m.hours || 0) + " h</span>" +
        "</div></a>"
      );
    }).join("");

    var badges = store.badges();
    var badgesOn = badges.filter(function (b) { return b.on; }).length;

    return {
      crumbs: [{ label: "Accueil" }],
      html:
        '<div class="stack" style="gap:22px">' +
        '<section class="hero">' +
        '<div class="hero__badges">' +
        '<span class="chip chip--ok">' + ui.icon("sparkle") + "Parcours 100 % pratique</span>" +
        '<span class="chip">HTML · CSS · JavaScript</span>' +
        '<span class="chip chip--ghost">' + ui.icon("clock") + hours + " heures</span>" +
        "</div>" +
        '<h1 class="hero__title">Apprenez à créer<br><span class="gradient-text">des sites web modernes</span></h1>' +
        '<p class="hero__text">Trois modules détaillés, des exercices progressifs corrigés, un éditeur de code intégré ' +
        "avec aperçu en direct, des quiz et un projet final guidé. Aucune installation, tout fonctionne dans votre navigateur.</p>" +
        '<div class="hero__actions">' +
        '<a class="btn btn--primary btn--lg" href="#/module/html">' + ui.icon("play") + "Commencer le module HTML</a>" +
        '<a class="btn btn--soft btn--lg" href="#/progression">' + ui.icon("target") + "Ma progression</a>" +
        '<a class="btn btn--ghost btn--lg" href="#/guide">' + ui.icon("book") + "Guide d'utilisation</a>" +
        "</div>" +
        '<div class="hero__aside">' +
        '<div class="hero__stat"><strong>' + mods.length + "</strong><span>modules</span></div>" +
        '<div class="hero__stat"><strong>' + lessonCount + "</strong><span>leçons détaillées</span></div>" +
        '<div class="hero__stat"><strong>' + exCount + "</strong><span>exercices corrigés</span></div>" +
        '<div class="hero__stat"><strong>3</strong><span>quiz + projet final</span></div>' +
        "</div>" +
        "</section>" +
        (resume ? '<div class="grid grid--2">' + resume +
          '<div class="card card--flat" style="display:flex;align-items:center;gap:14px">' +
          ui.ring(o.pct, 66, 6) +
          '<div style="flex:1"><strong style="display:block;font-size:14px">Progression globale</strong>' +
          '<small class="muted" style="font-size:12px">' + o.lessons.done + "/" + o.lessons.total + " leçons · " +
          o.exercises.done + "/" + o.exercises.total + " exercices · " + badgesOn + " badge(s)</small></div>" +
          '<a class="btn btn--soft btn--sm" href="#/progression">Détails</a></div></div>'
          : '<div class="card card--flat" style="display:flex;align-items:center;gap:14px">' +
          ui.ring(o.pct, 66, 6) +
          '<div style="flex:1"><strong style="display:block;font-size:14px">Progression globale</strong>' +
          '<small class="muted" style="font-size:12px">Votre avancement est enregistré dans ce navigateur.</small></div>' +
          '<a class="btn btn--soft btn--sm" href="#/progression">Détails</a></div>') +
        "<div><div class=\"section-title\"><h2>Les trois modules</h2><span class=\"section-title__count\">progressif</span></div>" +
        '<div class="grid grid--3">' + moduleCards + "</div></div>" +
        '<div class="grid grid--3">' +
        stepCard("1", "Lisez la leçon", "Chaque leçon explique le pourquoi, avec des schémas de code et des démos vivantes.", "book") +
        stepCard("2", "Pratiquez", "Des exercices progressifs avec vérification automatique, indices et corrigé.", "code") +
        stepCard("3", "Validez", "Quiz de fin de module puis projet final : un site responsive complet.", "trophy") +
        "</div>" +
        '<section class="card" style="--module-accent:var(--brand-2)">' +
        '<div class="card__head">' + ui.icon("trophy") + '<span class="card__title">Projet final : votre portfolio</span></div>' +
        '<p class="muted" style="font-size:13.5px;margin-bottom:12px">Assemblez HTML sémantique, CSS moderne (Flexbox, Grid, responsive, animations) ' +
        "et JavaScript (DOM, événements, thème sombre persistant) dans un vrai site prêt à publier.</p>" +
        '<a class="btn btn--soft" href="#/projet">Ouvrir le projet guidé' + ui.icon("arrow-right") + "</a></section>" +
        "</div>"
    };

    function stepCard(num, title, text, iconName) {
      return '<div class="card card--flat">' +
        '<div class="row" style="margin-bottom:8px"><span class="badge-card__icon" style="background:var(--accent-soft);color:var(--accent)">' +
        ui.icon(iconName) + "</span><span class=\"module-card__num\">ÉTAPE " + num + "</span></div>" +
        '<strong style="display:block;margin-bottom:4px">' + esc(title) + "</strong>" +
        '<span class="muted" style="font-size:13px">' + esc(text) + "</span></div>";
    }
  }

  /* ------------------------------------------------------------- module -- */

  function moduleView(moduleId) {
    var m = store.moduleById(moduleId);
    if (!m) return notFound("Module introuvable");
    var p = store.moduleProgress(m);
    var rows = (m.lessons || []).map(function (l, i) {
      return render.lessonRow({ module: m, lesson: l }, i);
    }).join("");
    var quiz = m.quiz || {};
    var quizRecord = store.quizRecord(m.id);
    var modules = store.modules();
    var at = modules.findIndex(function (x) { return x.id === m.id; });
    var next = modules[at + 1];
    var prev = modules[at - 1];

    var goals = (m.goals || []).map(function (g) {
      return "<li>" + ui.icon("check") + "<span>" + md(g) + "</span></li>";
    }).join("");

    var quizState = quizRecord
      ? '<span class="chip ' + (p.quiz.passed ? "chip--ok" : "chip--warn") + '">' +
        (p.quiz.passed ? "Réussi" : "À retravailler") + " · " + quizRecord.score + "/" + p.quiz.total + "</span>"
      : '<span class="chip">Non commencé</span>';

    return {
      crumbs: [{ label: "Accueil", href: "#/" }, { label: m.title }],
      html:
        '<div class="stack" style="gap:22px">' +
        '<section class="hero" style="--module-accent:' + (m.accent || "var(--accent)") + '">' +
        '<div class="hero__badges">' + chipForModule(m) +
        '<span class="chip">Module ' + (m.number || 1) + "</span>" +
        '<span class="chip chip--ghost">' + ui.icon("clock") + (m.hours || 0) + " h</span>" +
        '<span class="chip chip--ghost">' + esc(m.level || "Tous niveaux") + "</span>" +
        "</div>" +
        '<h1 class="hero__title" style="font-size:clamp(26px,4vw,40px)">' + md(m.title) + "</h1>" +
        '<p class="hero__text">' + md(m.description || m.subtitle || "") + "</p>" +
        '<div class="hero__aside" style="border-top:0;padding-top:0;margin-top:18px;align-items:center;gap:28px">' +
        ui.ring(p.pct, 72, 7, m.accent) +
        '<div style="flex:1;min-width:220px">' + ui.pbar(p.lessons.pct, "Leçons terminées") +
        '<div style="margin-top:10px">' + ui.pbar(p.exercises.pct, "Exercices validés") + "</div></div>" +
        '<div class="row">' + quizState +
        '<a class="btn btn--soft btn--sm" href="#/quiz/' + m.id + '">' + ui.icon("target") + "Quiz du module</a></div>" +
        "</div></section>" +
        '<div class="grid grid--2">' +
        '<section class="card card--flat"><div class="card__head">' + ui.icon("target") +
        '<span class="card__title">Objectifs du module</span></div><ul class="goals">' + goals + "</ul></section>" +
        '<section class="card card--flat"><div class="card__head">' + ui.icon("list") +
        '<span class="card__title">Sommaire</span></div>' +
        '<p class="muted small" style="margin-bottom:10px">' + (m.lessons || []).length + " leçons · " +
        p.exercises.total + " exercices · " + (quiz.questions || []).length + " questions de quiz</p>" +
        '<div class="stack" style="gap:8px">' + (m.lessons || []).slice(0, 4).map(function (l, i) {
          return '<a class="lesson-row" href="#/lesson/' + l.id + '" style="padding:9px 11px">' +
            '<span class="lesson-row__num" style="width:26px;height:26px;font-size:11px">' + (i + 1) + "</span>" +
            '<span class="lesson-row__body"><span class="lesson-row__title" style="font-size:13px">' + md(l.title) + "</span></span></a>";
        }).join("") + ((m.lessons || []).length > 4 ? '<span class="muted small">… et ' + ((m.lessons || []).length - 4) + " autres leçons</span>" : "") +
        "</div></section></div>" +
        '<div><div class="section-title"><h2>Leçons</h2><span class="section-title__count">dans l\'ordre</span></div>' +
        '<div class="stack" style="gap:8px">' + rows + "</div></div>" +
        '<div class="lesson-nav">' +
        (prev ? '<a class="btn btn--soft" href="#/module/' + prev.id + '">' + ui.icon("arrow-left") + esc(prev.title.split("—")[0].trim()) + "</a>" : '<span class="grow"></span>') +
        '<a class="btn btn--primary" href="#/lesson/' + (m.lessons || [])[0].id + '">Commencer la première leçon' + ui.icon("arrow-right") + "</a>" +
        (next ? '<a class="btn btn--soft" href="#/module/' + next.id + '">' + esc(next.title.split("—")[0].trim()) + ui.icon("arrow-right") + "</a>" : '<span class="grow"></span>') +
        "</div></div>"
    };
  }

  /* ------------------------------------------------------------- leçon --- */

  function lessonView(lessonId) {
    var entry = store.lessonById(lessonId);
    if (!entry) return notFound("Leçon introuvable");
    var m = entry.module;
    var l = entry.lesson;
    var idx = moduleLessonIndex(m, lessonId);
    var all = store.allLessons();
    var pos = all.findIndex(function (x) { return x.lesson.id === lessonId; });
    var prev = all[pos - 1];
    var next = all[pos + 1];
    var done = store.lessonDone(l.id);
    var exercises = l.exercises || [];

    var objectives = (l.objectives || []).map(function (o) {
      return "<li>" + ui.icon("target") + "<span>" + md(o) + "</span></li>";
    }).join("");

    var exerciseCards = exercises.map(function (ex) {
      var isDone = store.exerciseDone(ex.id);
      return '<a class="lesson-row' + (isDone ? " is-done" : "") + '" href="#/exercise/' + ex.id + '">' +
        '<span class="lesson-row__num" style="border-radius:50%">' + (isDone ? ui.icon("check") : ui.icon("code")) + "</span>" +
        '<span class="lesson-row__body"><span class="lesson-row__title">' + esc(ex.title) + "</span>" +
        '<span class="lesson-row__meta">' + ui.difficultyDots(ex.difficulty || 1) +
        "<span>" + esc(ex.goal || "") + "</span>" + (isDone ? '<span style="color:var(--ok)">Validé</span>' : "") +
        "</span></span>" + '<span class="lesson-row__go">' + ui.icon("arrow-right") + "</span></a>";
    }).join("");

    var html =
      '<div class="lesson-layout">' +
      '<article class="stack" style="gap:0">' +
      '<header class="lesson-head">' +
      '<div class="lesson-head__meta">' + chipForModule(m) +
      '<span class="chip chip--ghost">Leçon ' + (idx + 1) + "/" + (m.lessons || []).length + "</span>" +
      '<span class="chip chip--ghost">' + ui.icon("clock") + " " + (l.minutes || 20) + " min</span>" +
      (done ? '<span class="chip chip--ok">' + ui.icon("check") + "Terminée</span>" : "") +
      "</div>" +
      '<h1 class="h1" style="font-size:clamp(24px,3.4vw,34px)">' + md(l.title) + "</h1>" +
      '<p class="lead">' + md(l.summary || "") + "</p>" +
      (objectives ? '<div class="objectives"><h3>À la fin de cette leçon, vous saurez</h3><ul class="goals">' + objectives + "</ul></div>" : "") +
      "</header>" +
      (l.content ? render.blocks(l.content) : '<p class="muted">Contenu à venir.</p>') +
      (exercises.length ? '<div class="section-title"><h2>Exercices</h2>' +
        '<span class="section-title__count">' + exercises.length + " · progressifs</span></div>" +
        '<div class="stack" style="gap:8px">' + exerciseCards + "</div>" : "") +
      '<div class="lesson-nav">' +
      (prev ? '<a class="btn btn--soft" href="#/lesson/' + prev.lesson.id + '">' + ui.icon("arrow-left") + "Précédent</a>" : '<span class="grow"></span>') +
      '<div class="lesson-nav__center">' +
      '<button class="btn ' + (done ? "btn--ok" : "btn--primary") + '" id="mark-lesson" data-id="' + l.id + '">' +
      ui.icon(done ? "check" : "circle") + (done ? "Leçon terminée" : "Marquer comme terminée") + "</button>" +
      "</div>" +
      (next ? '<a class="btn btn--primary" href="#/lesson/' + next.lesson.id + '">Suivant' + ui.icon("arrow-right") + "</a>" : '<span class="grow"></span>') +
      "</div></article>" +
      '<aside class="toc" id="toc" aria-label="Sommaire de la leçon"><div class="toc__title">Dans cette leçon</div><div id="toc-links"></div></aside>' +
      "</div>";

    return {
      crumbs: [
        { label: "Accueil", href: "#/" },
        { label: m.title.split("—")[0].trim(), href: "#/module/" + m.id },
        { label: l.title }
      ],
      html: html,
      mount: function (root) {
        editor.mountDemos(root);
        var links = [];
        root.querySelectorAll(".blk--h h2, .blk--h h3").forEach(function (h, i) {
          var id = "sec-" + i;
          h.id = id;
          links.push('<a href="#' + id + '" data-anchor>' + esc(h.textContent) + "</a>");
        });
        var holder = root.querySelector("#toc-links");
        if (holder) holder.innerHTML = links.join("") || '<span class="muted small">—</span>';
        var mark = root.querySelector("#mark-lesson");
        if (mark) {
          mark.addEventListener("click", function () {
            var isDone = store.lessonDone(l.id);
            store.setLessonDone(l.id, !isDone);
            ui.toast(isDone ? "Leçon décochée" : "Leçon terminée. Bravo !");
            FW.app.rerender();
          });
        }
        store.setLast("lesson", l.id);
      }
    };
  }

  /* ---------------------------------------------------------- exercice --- */

  function exerciseView(exerciseId) {
    var entry = store.exerciseById(exerciseId);
    if (!entry) return notFound("Exercice introuvable");
    var m = entry.module;
    var lesson = entry.lesson;
    var ex = entry.exercise;
    var done = store.exerciseDone(ex.id);
    var draftKey = "ex:" + ex.id;
    var draft = store.draft(draftKey);
    var initial = draft || ex.starter || { html: "", css: "", js: "" };

    var siblings = lesson.exercises || [];
    var at = siblings.findIndex(function (e) { return e.id === ex.id; });
    var nextEx = siblings[at + 1];
    var prevEx = siblings[at - 1];

    var instructions = (ex.instructions || []).map(function (step) {
      return "<li>" + md(step) + "</li>";
    }).join("");
    var checklist = (ex.checklist || []).map(function (c) {
      return "<li>" + ui.icon("check") + "<span>" + md(c) + "</span></li>";
    }).join("");

    var aside =
      '<aside class="exercise-aside">' +
      '<section class="card card--flat instructions">' +
      '<div class="row">' + ui.difficultyDots(ex.difficulty || 1) +
      '<span class="chip chip--ghost">Exercice ' + (at + 1) + "/" + siblings.length + "</span>" +
      (done ? '<span class="chip chip--ok">' + ui.icon("check") + "Validé</span>" : "") + "</div>" +
      '<p class="lead" style="font-size:14.5px">' + md(ex.goal || "") + "</p>" +
      '<ol>' + instructions + "</ol>" +
      (checklist ? '<div class="checklist"><div class="checklist__title">Critères de réussite</div><ul>' + checklist + "</ul></div>" : "") +
      "</section>" +
      '<section class="card card--flat check-panel" id="check-panel" hidden>' +
      '<div class="card__head">' + ui.icon("target") + '<span class="card__title">Vérification</span></div>' +
      '<div class="checks" id="checks"></div></section>' +
      '<section class="card card--flat">' +
      '<div class="row" style="gap:8px">' +
      '<button class="btn btn--primary grow" id="verify">' + ui.icon("check") + "Vérifier</button>" +
      '<button class="btn btn--soft" id="reset" title="Revenir au code de départ">' + ui.icon("rotate-ccw") + "</button>" +
      "</div>" +
      '<div class="row" style="gap:8px;margin-top:8px">' +
      '<button class="btn btn--ghost btn--sm" id="hint-btn">' + ui.icon("lightbulb") + "Indice</button>" +
      '<button class="btn btn--ghost btn--sm" id="solution-btn">' + ui.icon("eye") + "Corrigé</button>" +
      (nextEx ? '<a class="btn btn--ghost btn--sm" id="next-ex" href="#/exercise/' + nextEx.id + '">Suivant' + ui.icon("arrow-right") + "</a>" : "") +
      "</div>" +
      '<div id="hint-box" class="hint-box" style="margin-top:10px" hidden>' + md(ex.hint || "Aucun indice pour cet exercice.") + "</div>" +
      '<div id="solution-box" class="solution-box" style="margin-top:10px" hidden>' +
      '<strong>Corrigé</strong><p class="small">Le corrigé est chargé dans l\'éditeur. Comparez-le avec votre code, puis réessayez de mémoire.</p>' +
      '<div class="row" style="gap:8px"><button class="btn btn--soft btn--sm" id="load-solution">Charger le corrigé</button>' +
      '<button class="btn btn--ghost btn--sm" id="restore-mine">Revenir à mon code</button></div></div>' +
      "</section>" +
      (prevEx ? '<a class="btn btn--ghost btn--sm" href="#/exercise/' + prevEx.id + '">' + ui.icon("arrow-left") + "Exercice précédent</a>" : "") +
      "</aside>";

    var html =
      '<div class="stack" style="gap:16px">' +
      '<header class="exercise-head">' +
      '<div class="stack" style="gap:6px;min-width:240px">' +
      '<div class="row">' + chipForModule(m) +
      '<a class="chip chip--ghost" href="#/lesson/' + lesson.id + '">' + ui.icon("book") + esc(lesson.title) + "</a></div>" +
      '<h1 class="h1" style="font-size:clamp(22px,3vw,30px)">' + esc(ex.title) + "</h1>" +
      "</div></header>" +
      '<div class="exercise-layout">' + aside + '<div id="playground-host"></div></div>' +
      "</div>";

    return {
      crumbs: [
        { label: "Accueil", href: "#/" },
        { label: m.title.split("—")[0].trim(), href: "#/module/" + m.id },
        { label: lesson.title, href: "#/lesson/" + lesson.id },
        { label: ex.title }
      ],
      html: html,
      mount: function (root) {
        var host = root.querySelector("#playground-host");
        var checkPanel = root.querySelector("#check-panel");
        var checksEl = root.querySelector("#checks");
        var hintBox = root.querySelector("#hint-box");
        var solutionBox = root.querySelector("#solution-box");
        var myCode = { html: initial.html || "", css: initial.css || "", js: initial.js || "" };

        var play = editor.create(host, {
          initial: myCode,
          previewHeight: 340,
          onChange: ui.debounce(function (code) {
            myCode = code;
            store.setDraft(draftKey, code);
          }, 500)
        });

        root.querySelector("#verify").addEventListener("click", function () {
          var btn = root.querySelector("#verify");
          btn.disabled = true;
          btn.innerHTML = ui.icon("refresh") + "Vérification…";
          play.runChecks(ex.checks || []).then(function (results) {
            btn.disabled = false;
            btn.innerHTML = ui.icon("check") + "Vérifier";
            showResults(results);
          }, function () {
            btn.disabled = false;
            btn.innerHTML = ui.icon("check") + "Vérifier";
            ui.toast("L'aperçu n'a pas pu se charger", "error");
          });
        });

        function showResults(results) {
          var allPass = results.length > 0 && results.every(function (r) { return r.pass; });
          checkPanel.hidden = false;
          checksEl.innerHTML = results.map(function (r, i) {
            var label = (ex.checklist && ex.checklist[i]) ? md(ex.checklist[i]) : 'Critère ' + (i + 1);
            return '<div class="check ' + (r.pass ? "is-pass" : "is-fail") + '">' +
              '<span class="check__mark">' + (r.pass ? "✓" : "×") + "</span>" +
              '<span class="check__label">' + label +
              '<span class="check__expr">' + esc(r.expr) + "</span>" +
              (r.error ? '<span class="check__err">Erreur : ' + esc(r.error) + "</span>" : "") +
              "</span></div>";
          }).join("") +
            '<div class="row" style="margin-top:6px">' +
            '<span class="chip ' + (allPass ? "chip--ok" : "chip--warn") + '">' +
            (allPass ? "Tous les critères sont remplis" : "Encore " + results.filter(function (r) { return !r.pass; }).length + " critère(s) à corriger") +
            "</span></div>";

          if (allPass) {
            if (!store.exerciseDone(ex.id)) {
              store.setExerciseDone(ex.id, true);
              ui.toast("Exercice validé !");
            }
            FW.app.refreshChrome();
            checkPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }

        root.querySelector("#reset").addEventListener("click", function () {
          play.setCode(ex.starter || { html: "", css: "", js: "" });
          myCode = ex.starter || { html: "", css: "", js: "" };
          store.setDraft(draftKey, myCode);
          checkPanel.hidden = true;
          ui.toast("Code de départ restauré");
        });

        root.querySelector("#hint-btn").addEventListener("click", function () {
          hintBox.hidden = !hintBox.hidden;
        });

        root.querySelector("#solution-btn").addEventListener("click", function () {
          solutionBox.hidden = !solutionBox.hidden;
        });

        root.querySelector("#load-solution").addEventListener("click", function () {
          var sol = ex.solution || ex.starter || { html: "", css: "", js: "" };
          play.setCode(sol);
          ui.toast("Corrigé chargé dans l'éditeur");
        });

        root.querySelector("#restore-mine").addEventListener("click", function () {
          var mine = store.draft(draftKey) || myCode;
          play.setCode(mine);
        });

        store.setLast("exercise", ex.id);
      }
    };
  }

  /* --------------------------------------------------------------- quiz -- */

  function quizView(moduleId) {
    var m = store.moduleById(moduleId);
    if (!m || !m.quiz) return notFound("Quiz introuvable");
    var q = m.quiz;
    var questions = q.questions || [];
    var record = store.quizRecord(m.id);
    var passRate = q.pass || 0.75;

    var html =
      '<div class="stack" style="gap:18px">' +
      '<header class="stack" style="gap:8px">' +
      '<div class="row">' + chipForModule(m) + '<span class="chip chip--ghost">' + ui.icon("target") + "Quiz</span></div>" +
      '<h1 class="h1" style="font-size:clamp(24px,3.4vw,32px)">' + esc(q.title || "Quiz — " + m.title) + "</h1>" +
      '<p class="lead">' + questions.length + " questions · réussite à partir de " + Math.round(passRate * 100) + " %" +
      (record ? " · meilleur score : " + record.score + "/" + questions.length : "") + "</p>" +
      "</header>" +
      '<div id="quiz-result" hidden></div>' +
      '<form id="quiz-form" class="stack" style="gap:14px">' +
      questions.map(function (item, qi) {
        return '<fieldset class="question" style="border:1px solid var(--line);margin:0" data-q="' + qi + '">' +
          '<div class="question__head"><span class="question__num">' + String(qi + 1).padStart(2, "0") + "</span>" +
          '<legend class="question__text" style="float:none;display:block">' + md(item.q) + "</legend></div>" +
          '<div class="options">' +
          (item.options || []).map(function (opt, oi) {
            return '<label class="option" data-opt="' + oi + '">' +
              '<input type="radio" name="q' + qi + '" value="' + oi + '">' +
              "<span>" + md(opt) + "</span></label>";
          }).join("") +
          "</div>" +
          '<div class="explain" data-explain="' + qi + '" hidden></div>' +
          "</fieldset>";
      }).join("") +
      '<div class="row" style="gap:10px">' +
      '<button class="btn btn--primary btn--lg" type="submit" id="quiz-submit">' + ui.icon("check") + "Valider mes réponses</button>" +
      '<button class="btn btn--ghost" type="button" id="quiz-reset">' + ui.icon("rotate-ccw") + "Recommencer</button>" +
      '<a class="btn btn--ghost" href="#/module/' + m.id + '">' + ui.icon("arrow-left") + "Retour au module</a>" +
      "</div></form></div>";

    return {
      crumbs: [
        { label: "Accueil", href: "#/" },
        { label: m.title.split("—")[0].trim(), href: "#/module/" + m.id },
        { label: "Quiz" }
      ],
      html: html,
      mount: function (root) {
        var form = root.querySelector("#quiz-form");
        var resultBox = root.querySelector("#quiz-result");
        var submitted = false;

        form.addEventListener("change", function (e) {
          if (submitted || e.target.type !== "radio") return;
          var fieldset = e.target.closest("fieldset");
          fieldset.querySelectorAll(".option").forEach(function (opt) {
            opt.classList.toggle("is-selected", opt.contains(e.target));
          });
        });

        form.addEventListener("submit", function (event) {
          event.preventDefault();
          if (submitted) return;

          var answers = [];
          var unanswered = 0;
          questions.forEach(function (item, qi) {
            var picked = form.querySelector('input[name="q' + qi + '"]:checked');
            if (!picked) { unanswered++; answers.push(-1); }
            else answers.push(Number(picked.value));
          });

          if (unanswered > 0) {
            ui.toast("Répondez aux " + unanswered + " question(s) restante(s).", "error");
            return;
          }

          submitted = true;
          var score = 0;
          questions.forEach(function (item, qi) {
            var correctIndex = typeof item.answer === "number" ? item.answer : -1;
            var ok = answers[qi] === correctIndex;
            if (ok) score++;
            var fieldset = form.querySelector('[data-q="' + qi + '"]');
            fieldset.querySelectorAll(".option").forEach(function (opt, oi) {
              opt.classList.add("is-disabled");
              var input = opt.querySelector("input");
              input.disabled = true;
              if (oi === correctIndex) opt.classList.add("is-correct");
              else if (oi === answers[qi]) opt.classList.add("is-wrong");
            });
            var explain = fieldset.querySelector("[data-explain]");
            explain.hidden = false;
            explain.className = "explain" + (ok ? "" : " explain--fail");
            explain.innerHTML = (ok ? ui.icon("check") + " " : ui.icon("x") + " ") +
              "Bonne réponse : **" + md(item.options[correctIndex] || "") + "** — " + md(item.explain || "");
          });

          var rate = score / questions.length;
          var passed = rate >= passRate;
          store.setQuizRecord(m.id, { score: score, total: questions.length, passed: passed, at: Date.now() });

          resultBox.hidden = false;
          resultBox.innerHTML =
            '<div class="quiz-result ' + (passed ? "is-pass" : "is-fail") + '">' +
            ui.ring(Math.round(rate * 100), 84, 8) +
            '<div style="flex:1;min-width:200px">' +
            '<h2 class="h2" style="font-size:20px;margin-bottom:4px">' +
            (passed ? "Module validé !" : "Encore un effort") + "</h2>" +
            '<p class="muted" style="font-size:13.5px">Score : <strong>' + score + "/" + questions.length + "</strong> · " +
            Math.round(rate * 100) + " % · seuil de réussite " + Math.round(passRate * 100) + " %.</p>" +
            '<div class="row" style="margin-top:12px;gap:8px">' +
            (passed ? "" : '<a class="btn btn--soft btn--sm" href="#/module/' + m.id + '">Revoir les leçons</a>') +
            '<button class="btn btn--soft btn--sm" id="retry">' + ui.icon("rotate-ccw") + "Recommencer</button>" +
            (m.id === "js" ? '<a class="btn btn--primary btn--sm" href="#/projet">Projet final' + ui.icon("arrow-right") + "</a>"
              : nextModuleHref()) +
            "</div></div></div>";
          resultBox.scrollIntoView({ behavior: "smooth", block: "start" });

          var retry = resultBox.querySelector("#retry");
          if (retry) retry.addEventListener("click", function () { FW.app.rerender(); });

          FW.app.refreshChrome();

          function nextModuleHref() {
            var mods = store.modules();
            var at = mods.findIndex(function (x) { return x.id === m.id; });
            var next = mods[at + 1];
            return next ? '<a class="btn btn--primary btn--sm" href="#/module/' + next.id + '">Module suivant' + ui.icon("arrow-right") + "</a>" : "";
          }
        });

        root.querySelector("#quiz-reset").addEventListener("click", function () {
          FW.app.rerender();
        });
        store.setLast("quiz", m.id);
      }
    };
  }

  /* ------------------------------------------------------------ projet --- */

  function projectView(stepIndex) {
    var project = store.project();
    if (!project) return notFound("Projet final indisponible");
    var steps = project.steps || [];
    var index = Math.max(0, Math.min(steps.length - 1, Number(stepIndex || 0)));
    if (isNaN(index)) index = 0;
    var step = steps[index];
    var doneCount = steps.filter(function (s) { return store.projectStepDone(s.id); }).length;
    var draftKey = "projet:" + step.id;
    var draft = store.draft(draftKey);
    var initial = draft || step.starter || { html: "", css: "", js: "" };

    var stepper = steps.map(function (s, i) {
      var done = store.projectStepDone(s.id);
      return '<button type="button" class="stepper__item' + (i === index ? " is-active" : "") + (done ? " is-done" : "") +
        '" data-step="' + i + '"><span class="stepper__num">' + (done ? "✓" : i + 1) + "</span>" +
        "<span>" + esc(s.title) + "</span></button>";
    }).join("");

    var instructions = (step.instructions || []).map(function (t) { return "<li>" + md(t) + "</li>"; }).join("");
    var rubric = (project.rubric || []).map(function (r) {
      return "<li>" + ui.icon("check") + "<span>" + md(r) + "</span></li>";
    }).join("");
    var skills = (project.skills || []).map(function (s) { return '<span class="chip chip--ghost">' + esc(s) + "</span>"; }).join("");

    var html =
      '<div class="stack" style="gap:18px">' +
      '<section class="hero" style="--module-accent:var(--brand-2)">' +
      '<div class="hero__badges"><span class="chip chip--ok">' + ui.icon("trophy") + "Projet final</span>" +
      '<span class="chip chip--ghost">' + ui.icon("clock") + (project.hours || 4) + " h</span>" +
      '<span class="chip chip--ghost">' + doneCount + "/" + steps.length + " étapes</span></div>" +
      '<h1 class="hero__title" style="font-size:clamp(26px,4vw,40px)">' + md(project.title) + "</h1>" +
      '<p class="hero__text">' + md(project.tagline || "") + "</p>" +
      '<p class="muted" style="margin-top:10px;font-size:13.5px">' + md(project.description || "") + "</p>" +
      '<div class="row" style="margin-top:14px">' + skills + "</div>" +
      "</section>" +
      '<div class="project-layout">' +
      '<nav class="stepper" id="stepper" aria-label="Étapes du projet">' + stepper +
      '<button class="btn btn--ghost btn--sm" id="download-final" style="margin-top:8px">' + ui.icon("download") + "Télécharger le site</button></nav>" +
      '<div class="stack" style="gap:16px">' +
      '<section class="card">' +
      '<div class="row" style="margin-bottom:8px"><span class="chip chip--ghost">Étape ' + (index + 1) + "/" + steps.length + "</span>" +
      (store.projectStepDone(step.id) ? '<span class="chip chip--ok">' + ui.icon("check") + "Terminée</span>" : "") + "</div>" +
      '<h2 class="h2" style="font-size:20px;margin-bottom:10px">' + esc(step.title) + "</h2>" +
      '<ol class="instructions" style="padding-left:1.25em">' + instructions + "</ol>" +
      '<div class="row" style="margin-top:14px;gap:8px">' +
      '<button class="btn btn--primary" id="verify-step">' + ui.icon("check") + "Vérifier l'étape</button>" +
      '<button class="btn btn--soft" id="solution-step">' + ui.icon("eye") + "Voir le code de référence</button>" +
      '<button class="btn btn--ghost" id="reset-step">' + ui.icon("rotate-ccw") + "Réinitialiser l'étape</button>" +
      "</div></section>" +
      '<div id="project-checks" class="card card--flat check-panel" hidden>' +
      '<div class="card__head">' + ui.icon("target") + '<span class="card__title">Vérification de l\'étape</span></div>' +
      '<div class="checks" id="step-checks"></div></div>' +
      '<div id="project-playground"></div>' +
      '<div class="lesson-nav">' +
      '<button class="btn btn--soft" id="prev-step"' + (index === 0 ? " disabled" : "") + ">" + ui.icon("arrow-left") + "Étape précédente</button>" +
      '<button class="btn btn--primary" id="next-step"' + (index === steps.length - 1 ? " disabled" : "") + ">Étape suivante" + ui.icon("arrow-right") + "</button>" +
      "</div></div></div>" +
      '<section class="card card--flat"><div class="card__head">' + ui.icon("star") +
      '<span class="card__title">Grille de qualité finale</span></div><ul class="rubric">' + rubric + "</ul></section>" +
      "</div>";

    return {
      crumbs: [{ label: "Accueil", href: "#/" }, { label: "Projet final" }],
      html: html,
      mount: function (root) {
        var play = editor.create(root.querySelector("#project-playground"), {
          initial: initial,
          previewHeight: 380,
          onChange: ui.debounce(function (code) {
            store.setDraft(draftKey, code);
          }, 500)
        });

        root.querySelector("#stepper").addEventListener("click", function (e) {
          var btn = e.target.closest("[data-step]");
          if (!btn) return;
          window.location.hash = "#/projet/" + btn.getAttribute("data-step");
        });

        root.querySelectorAll("#prev-step, #next-step").forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (btn.disabled) return;
            var target = btn.id === "prev-step" ? index - 1 : index + 1;
            window.location.hash = "#/projet/" + target;
          });
        });

        root.querySelector("#verify-step").addEventListener("click", function () {
          var checks = step.checks || [];
          if (!checks.length) {
            toggleStepDone();
            return;
          }
          play.runChecks(checks).then(function (results) {
            var box = root.querySelector("#project-checks");
            box.hidden = false;
            var allPass = results.every(function (r) { return r.pass; });
            root.querySelector("#step-checks").innerHTML = results.map(function (r, i) {
              return '<div class="check ' + (r.pass ? "is-pass" : "is-fail") + '">' +
                '<span class="check__mark">' + (r.pass ? "✓" : "×") + "</span>" +
                '<span class="check__label">Critère ' + (i + 1) +
                '<span class="check__expr">' + esc(r.expr) + "</span>" +
                (r.error ? '<span class="check__err">' + esc(r.error) + "</span>" : "") + "</span></div>";
            }).join("");
            if (allPass) {
              store.setProjectStepDone(step.id, true);
              ui.toast("Étape " + (index + 1) + " validée !");
              FW.app.refreshChrome();
              setTimeout(function () { FW.app.rerender(); }, 600);
            }
          });
        });

        root.querySelector("#solution-step").addEventListener("click", function () {
          if (step.solution) {
            play.setCode(step.solution);
            ui.toast("Code de référence chargé");
          } else ui.toast("Pas de code de référence pour cette étape", "error");
        });

        root.querySelector("#reset-step").addEventListener("click", function () {
          play.setCode(step.starter || { html: "", css: "", js: "" });
        });

        root.querySelector("#download-final").addEventListener("click", function () {
          var finalCode = project.final || {};
          var doc = editor.buildDoc(finalCode.html || "", finalCode.css || "", finalCode.js || "");
          var blob = new Blob([doc], { type: "text/html" });
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = (project.downloadName || "projet-final") + ".html";
          document.body.appendChild(a);
          a.click();
          a.remove();
          ui.toast("Projet téléchargé");
        });

        store.setLast("project", "projet");

        function toggleStepDone() {
          var isDone = store.projectStepDone(step.id);
          store.setProjectStepDone(step.id, !isDone);
          ui.toast(isDone ? "Étape décochée" : "Étape validée");
          FW.app.rerender();
        }
      }
    };
  }

  /* --------------------------------------------------------- progression -- */

  function progressView() {
    var o = store.overall();
    var mods = o.modules;
    var badges = store.badges();
    var badgesOn = badges.filter(function (b) { return b.on; }).length;

    var moduleCards = mods.map(function (item) {
      var m = item.module;
      var p = item.progress;
      var quiz = store.quizRecord(m.id);
      return '<section class="card card--flat" style="--module-accent:' + (m.accent || "var(--accent)") + '">' +
        '<div class="row" style="margin-bottom:12px">' +
        '<span class="module-card__icon">' + ui.icon(m.icon || "code") + "</span>" +
        "<div><strong style=\"display:block\">" + esc(m.title.split("—")[0].trim()) + "</strong>" +
        '<small class="muted">' + p.lessons.done + "/" + p.lessons.total + " leçons · " +
        p.exercises.done + "/" + p.exercises.total + " exercices</small></div>" +
        '<span class="grow"></span><span class="chip">' + p.pct + "%</span></div>" +
        ui.pbar(p.pct, "Progression du module") +
        '<div class="row" style="margin-top:10px">' +
        '<span class="chip ' + (p.quiz.passed ? "chip--ok" : "chip--ghost") + '">' +
        ui.icon("target") + " Quiz : " + (quiz ? quiz.score + "/" + p.quiz.total : "—") + "</span>" +
        '<a class="btn btn--ghost btn--sm" href="#/quiz/' + m.id + '">Passer le quiz</a></div></section>';
    }).join("");

    var badgeCards = badges.map(function (b) {
      return '<div class="badge-card' + (b.on ? " is-on" : "") + '">' +
        '<span class="badge-card__icon">' + ui.icon(b.on ? "trophy" : "lock") + "</span>" +
        "<div><strong>" + esc(b.title) + "</strong><small>" + esc(b.desc) + "</small></div></div>";
    }).join("");

    var html =
      '<div class="stack" style="gap:20px">' +
      '<header class="row" style="justify-content:space-between;align-items:flex-end">' +
      "<div><h1 class=\"h1\" style=\"font-size:clamp(24px,3.4vw,32px)\">Ma progression</h1>" +
      '<p class="lead">' + o.pct + " % du parcours terminé · " + badgesOn + "/" + badges.length + " badges obtenus.</p></div>" +
      '<div class="row" style="gap:8px">' +
      '<button class="btn btn--soft btn--sm" id="export">' + ui.icon("download") + "Exporter</button>" +
      '<button class="btn btn--soft btn--sm" id="import">' + ui.icon("save") + "Importer</button>" +
      '<button class="btn btn--danger btn--sm" id="reset">' + ui.icon("rotate-ccw") + "Réinitialiser</button>" +
      "</div></header>" +
      '<div class="grid grid--4">' +
      '<div class="stat"><strong>' + o.lessons.done + "/" + o.lessons.total + "</strong><span>leçons terminées</span></div>" +
      '<div class="stat"><strong>' + o.exercises.done + "/" + o.exercises.total + "</strong><span>exercices validés</span></div>" +
      '<div class="stat"><strong>' + o.quiz.done + "/" + o.quiz.total + "</strong><span>quiz réussis</span></div>" +
      '<div class="stat"><strong>' + o.project.done + "/" + o.project.total + "</strong><span>étapes du projet</span></div>" +
      "</div>" +
      '<div class="grid grid--2">' +
      '<section class="card" style="display:flex;gap:20px;align-items:center">' + ui.ring(o.pct, 104, 9) +
      "<div><h2 class=\"h3\">Vue d'ensemble</h2><p class=\"muted small\">" +
      (o.pct >= 100 ? "Félicitations, vous avez terminé le parcours !" : "Continuez : chaque leçon terminée et chaque exercice validé fait progresser la jauge.") +
      "</p></div></section>" +
      '<section class="card card--flat"><div class="card__head">' + ui.icon("trophy") +
      '<span class="card__title">Badges</span><span class="grow"></span><span class="chip">' + badgesOn + "/" + badges.length + "</span></div>" +
      '<div class="grid grid--2" style="gap:8px">' + badgeCards + "</div></section></div>" +
      '<div><div class="section-title"><h2>Détail par module</h2></div><div class="grid grid--3">' + moduleCards + "</div></div>" +
      "</div>";

    return {
      crumbs: [{ label: "Accueil", href: "#/" }, { label: "Ma progression" }],
      html: html,
      mount: function (root) {
        root.querySelector("#export").addEventListener("click", function () {
          var blob = new Blob([store.exportJSON()], { type: "application/json" });
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "progression-formation-web.json";
          document.body.appendChild(a);
          a.click();
          a.remove();
          ui.toast("Progression exportée");
        });

        root.querySelector("#import").addEventListener("click", function () {
          var input = document.createElement("input");
          input.type = "file";
          input.accept = "application/json,.json";
          input.addEventListener("change", function () {
            var file = input.files && input.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function () {
              try {
                store.importJSON(String(reader.result));
                ui.toast("Progression importée");
                FW.app.rerender();
              } catch (e) {
                ui.toast("Fichier invalide", "error");
              }
            };
            reader.readAsText(file);
          });
          input.click();
        });

        root.querySelector("#reset").addEventListener("click", function () {
          if (window.confirm("Effacer toute la progression (leçons, exercices, quiz, brouillons) ?")) {
            store.reset();
            ui.toast("Progression réinitialisée");
            FW.app.rerender();
          }
        });
      }
    };
  }

  /* -------------------------------------------------------------- guide -- */

  function guideView() {
    var guide = window.COURSE_GUIDE;
    if (!guide || !guide.sections || !guide.sections.length) return notFound("Guide indisponible");

    var sections = guide.sections;
    var o = store.overall();
    var questions = store.modules().reduce(function (n, m) {
      return n + ((m.quiz && m.quiz.questions) ? m.quiz.questions.length : 0);
    }, 0);
    var project = store.project();

    var tocLinks = sections.map(function (section, i) {
      return '<a href="#' + section.id + '" data-anchor>' +
        '<span class="toc__num">' + String(i + 1).padStart(2, "0") + "</span> " + esc(section.title) + "</a>";
    }).join("");

    var body = sections.map(function (section, i) {
      var blocks = (section.blocks || []).map(function (block) {
        if (block && block.type === "h" && (block.level || 2) === 2) {
          return Object.assign({}, block, { level: 3 });
        }
        return block;
      });
      return '<section id="' + section.id + '" class="guide-section" style="scroll-margin-top:calc(var(--topbar-h) + 12px)">' +
        '<div class="section-title"><h2>' + esc(section.title) + "</h2>" +
        '<span class="section-title__count">' + String(i + 1).padStart(2, "0") + "</span></div>" +
        render.blocks(blocks) + "</section>";
    }).join("");

    var html =
      '<div class="lesson-layout">' +
      '<article>' +
      '<header class="lesson-head">' +
      '<div class="lesson-head__meta">' +
      '<span class="chip chip--ok">' + ui.icon("book") + "Documentation</span>" +
      '<span class="chip chip--ghost">' + ui.icon("clock") + " " + (guide.minutes || 15) + " min de lecture</span>" +
      '<span class="chip chip--ghost">' + esc(guide.updated || "") + "</span>" +
      "</div>" +
      '<h1 class="h1" style="font-size:clamp(26px,3.6vw,36px)">' + esc(guide.title) + "</h1>" +
      '<p class="lead">' + md(guide.subtitle || "") + "</p>" +
      '<div class="row" style="gap:8px">' +
      '<button class="btn btn--soft btn--sm" id="guide-print">' + ui.icon("download") + "Imprimer / PDF</button>" +
      '<a class="btn btn--ghost btn--sm" href="#/progression">' + ui.icon("target") + "Ma progression</a>" +
      '<a class="btn btn--ghost btn--sm" href="#/module/html">' + ui.icon("play") + "Commencer le parcours</a>" +
      "</div></header>" +
      '<div class="card card--flat" style="margin-top:20px">' +
      '<div class="grid grid--4" style="gap:10px">' +
      '<div class="stat"><strong>' + store.modules().length + "</strong><span>modules</span></div>" +
      '<div class="stat"><strong>' + o.lessons.total + "</strong><span>leçons</span></div>" +
      '<div class="stat"><strong>' + o.exercises.total + "</strong><span>exercices corrigés</span></div>" +
      '<div class="stat"><strong>' + questions + "</strong><span>questions de quiz</span></div>" +
      "</div>" +
      ((project && project.steps) ? '<p class="muted small" style="margin-top:12px">' +
        project.steps.length + " étapes de projet final vérifiées · progression enregistrée dans ce navigateur." : "") +
      "</div>" +
      body +
      '<div class="lesson-nav">' +
      '<a class="btn btn--soft" href="#/">' + ui.icon("home") + "Accueil</a>" +
      '<a class="btn btn--primary" href="#/module/html">Commencer la formation' + ui.icon("arrow-right") + "</a>" +
      "</div></article>" +
      '<aside class="toc" aria-label="Sommaire du guide"><div class="toc__title">Dans ce guide</div>' +
      tocLinks + "</aside></div>";

    return {
      crumbs: [{ label: "Accueil", href: "#/" }, { label: guide.title || "Guide d'utilisation" }],
      html: html,
      mount: function (root) {
        var print = root.querySelector("#guide-print");
        if (print) {
          print.addEventListener("click", function () {
            ui.toast("Utilisez « Enregistrer au format PDF » dans la boîte d'impression");
            setTimeout(function () { window.print(); }, 300);
          });
        }
        store.setLast("guide", "guide");
      }
    };
  }

  /* ------------------------------------------------------------ erreur -- */

  function notFound(message) {
    return {
      crumbs: [{ label: "Accueil", href: "#/" }, { label: "Introuvable" }],
      html: '<div class="empty-state"><div style="font-size:34px">🧭</div><h2 class="h2" style="font-size:19px">' +
        esc(message) + '</h2><p class="muted small">Le contenu demandé n\'existe pas ou plus.</p>' +
        '<a class="btn btn--soft" href="#/">Retour à l\'accueil</a></div>'
    };
  }

  FW.views = {
    home: home,
    module: moduleView,
    lesson: lessonView,
    exercise: exerciseView,
    quiz: quizView,
    project: projectView,
    progress: progressView,
    guide: guideView,
    notFound: notFound
  };
})();
