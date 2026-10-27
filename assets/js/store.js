/* =========================================================================
   store.js — catalogue de contenu + progression persistée (localStorage)
   ========================================================================= */
(function () {
  "use strict";

  var FW = (window.FW = window.FW || {});
  var KEY = "formation-web.progress.v1";

  var memory = null;

  function storage() {
    try {
      var probe = "__fw_probe__";
      window.localStorage.setItem(probe, "1");
      window.localStorage.removeItem(probe);
      return window.localStorage;
    } catch (e) {
      return null;
    }
  }
  var LS = storage();

  function fresh() {
    return {
      version: 1,
      lessons: {},
      exercises: {},
      quizzes: {},
      project: {},
      drafts: {},
      last: null,
      theme: null,
      sidebarCollapsed: false
    };
  }

  var state = fresh();

  function load() {
    var raw = null;
    try {
      raw = LS ? LS.getItem(KEY) : null;
    } catch (e) {
      raw = null;
    }
    if (!raw) {
      if (memory) state = memory;
      return state;
    }
    try {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        state = Object.assign(fresh(), parsed);
        state.lessons = parsed.lessons || {};
        state.exercises = parsed.exercises || {};
        state.quizzes = parsed.quizzes || {};
        state.project = parsed.project || {};
        state.drafts = parsed.drafts || {};
      }
    } catch (e) {
      state = fresh();
    }
    memory = state;
    return state;
  }

  var saveError = false;
  function save() {
    memory = state;
    if (!LS) return;
    try {
      LS.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      if (!saveError) {
        saveError = true;
        if (FW.ui) FW.ui.toast("Stockage local indisponible : progression en mémoire seulement.", "error");
      }
    }
  }

  /* --------------------------------------------------------- catalogue ---- */

  function modules() {
    var list = (window.COURSE_MODULES || []).slice();
    list.sort(function (a, b) { return (a.number || 0) - (b.number || 0); });
    return list;
  }

  function moduleById(id) {
    var list = modules();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function allLessons() {
    var out = [];
    modules().forEach(function (m) {
      (m.lessons || []).forEach(function (l) { out.push({ module: m, lesson: l }); });
    });
    return out;
  }

  function allExercises() {
    var out = [];
    modules().forEach(function (m) {
      (m.lessons || []).forEach(function (l) {
        (l.exercises || []).forEach(function (ex) { out.push({ module: m, lesson: l, exercise: ex }); });
      });
    });
    return out;
  }

  function lessonById(id) {
    var items = allLessons();
    for (var i = 0; i < items.length; i++) if (items[i].lesson.id === id) return items[i];
    return null;
  }

  function exerciseById(id) {
    var items = allExercises();
    for (var i = 0; i < items.length; i++) if (items[i].exercise.id === id) return items[i];
    return null;
  }

  function project() {
    return window.COURSE_PROJECT || null;
  }

  /* ---------------------------------------------------- progression ----- */

  function lessonDone(id) { return !!state.lessons[id]; }
  function setLessonDone(id, done) {
    if (done) state.lessons[id] = true;
    else delete state.lessons[id];
    save();
  }
  function exerciseDone(id) { return !!state.exercises[id]; }
  function setExerciseDone(id, done) {
    if (done) state.exercises[id] = true;
    else delete state.exercises[id];
    save();
  }
  function quizRecord(moduleId) { return state.quizzes[moduleId] || null; }
  function setQuizRecord(moduleId, record) {
    var prev = state.quizzes[moduleId];
    if (!prev || record.score > prev.score) {
      state.quizzes[moduleId] = record;
    } else {
      state.quizzes[moduleId] = Object.assign({}, prev, { lastScore: record.score, lastTotal: record.total });
    }
    save();
  }
  function projectStepDone(id) { return !!state.project[id]; }
  function setProjectStepDone(id, done) {
    if (done) state.project[id] = true;
    else delete state.project[id];
    save();
  }
  function draft(key) { return state.drafts[key] || null; }
  function setDraft(key, code) {
    state.drafts[key] = code;
    save();
  }
  function clearDraft(key) {
    delete state.drafts[key];
    save();
  }
  function setLast(type, id) {
    state.last = { type: type, id: id, at: Date.now() };
    save();
  }
  function last() { return state.last; }
  function theme() { return state.theme; }
  function setTheme(value) { state.theme = value; save(); }
  function sidebarCollapsed() { return !!state.sidebarCollapsed; }
  function setSidebarCollapsed(value) { state.sidebarCollapsed = !!value; save(); }

  /* -------------------------------------------------------- synthèse ---- */

  function moduleProgress(module) {
    var lessons = (module.lessons || []);
    var lessonTotal = lessons.length;
    var lessonDoneCount = lessons.filter(function (l) { return lessonDone(l.id); }).length;

    var exercises = [];
    lessons.forEach(function (l) { (l.exercises || []).forEach(function (e) { exercises.push(e); }); });
    var exerciseTotal = exercises.length;
    var exerciseDoneCount = exercises.filter(function (e) { return exerciseDone(e.id); }).length;

    var quiz = quizRecord(module.id);
    var quizTotal = (module.quiz && module.quiz.questions ? module.quiz.questions.length : 0);
    var quizPassed = !!(quiz && quizTotal && quiz.score / quizTotal >= (module.quiz.pass || 0.75));

    var units = lessonTotal + exerciseTotal + (quizTotal ? 1 : 0);
    var done = lessonDoneCount + exerciseDoneCount + (quizPassed ? 1 : 0);
    var pct = units ? Math.round((done / units) * 100) : 0;

    return {
      lessons: { total: lessonTotal, done: lessonDoneCount, pct: lessonTotal ? Math.round((lessonDoneCount / lessonTotal) * 100) : 0 },
      exercises: { total: exerciseTotal, done: exerciseDoneCount, pct: exerciseTotal ? Math.round((exerciseDoneCount / exerciseTotal) * 100) : 0 },
      quiz: { total: quizTotal, best: quiz ? quiz.score : 0, passed: quizPassed },
      pct: pct,
      done: done,
      units: units
    };
  }

  function overall() {
    var mods = modules();
    var lessons = 0, lessonsDone = 0, ex = 0, exDone = 0, quizUnits = 0, quizDone = 0;
    mods.forEach(function (m) {
      var p = moduleProgress(m);
      lessons += p.lessons.total;
      lessonsDone += p.lessons.done;
      ex += p.exercises.total;
      exDone += p.exercises.done;
      if (p.quiz.total) { quizUnits += 1; if (p.quiz.passed) quizDone += 1; }
    });

    var proj = project();
    var projSteps = proj && proj.steps ? proj.steps.length : 0;
    var projDone = proj && proj.steps ? proj.steps.filter(function (s) { return projectStepDone(s.id); }).length : 0;

    var units = lessons + ex + quizUnits + projSteps;
    var done = lessonsDone + exDone + quizDone + projDone;

    return {
      lessons: { total: lessons, done: lessonsDone },
      exercises: { total: ex, done: exDone },
      quiz: { total: quizUnits, done: quizDone },
      project: { total: projSteps, done: projDone },
      pct: units ? Math.round((done / units) * 100) : 0,
      modules: mods.map(function (m) { return { module: m, progress: moduleProgress(m) }; })
    };
  }

  function badges() {
    var o = overall();
    var list = [];
    function add(id, title, desc, on, iconName) {
      list.push({ id: id, title: title, desc: desc, on: on, icon: iconName });
    }
    var firstLesson = allLessons()[0];
    add("start", "Premiers pas", "Terminer la première leçon", firstLesson ? lessonDone(firstLesson.lesson.id) : false, "play");
    add("html-module", "Fondations HTML", "Terminer toutes les leçons HTML", (function () {
      var m = moduleById("html"); return m ? moduleProgress(m).lessons.pct === 100 : false;
    })(), "markup");
    add("css-module", "Styliste confirmé", "Terminer toutes les leçons CSS", (function () {
      var m = moduleById("css"); return m ? moduleProgress(m).lessons.pct === 100 : false;
    })(), "palette");
    add("js-module", "Logique maîtrisée", "Terminer toutes les leçons JavaScript", (function () {
      var m = moduleById("js"); return m ? moduleProgress(m).lessons.pct === 100 : false;
    })(), "code");
    add("ex-10", "Sérieux", "Valider 10 exercices", o.exercises.done >= 10, "target");
    add("ex-half", "La moitié du chemin", "Valider la moitié des exercices", o.exercises.total > 0 && o.exercises.done >= Math.ceil(o.exercises.total / 2), "flame");
    add("quiz-html", "Quiz HTML réussi", "Obtenir 75 % au quiz HTML", (function () {
      var m = moduleById("html"); return m ? moduleProgress(m).quiz.passed : false;
    })(), "check-circle");
    add("quiz-css", "Quiz CSS réussi", "Obtenir 75 % au quiz CSS", (function () {
      var m = moduleById("css"); return m ? moduleProgress(m).quiz.passed : false;
    })(), "check-circle");
    add("quiz-js", "Quiz JS réussi", "Obtenir 75 % au quiz JavaScript", (function () {
      var m = moduleById("js"); return m ? moduleProgress(m).quiz.passed : false;
    })(), "check-circle");
    add("project", "Projet livré", "Terminer toutes les étapes du projet final", projAllDone(), "trophy");
    add("complete", "Parcours terminé", "Atteindre 100 % de la formation", o.pct === 100, "star");
    return list;

    function projAllDone() {
      var p = project();
      if (!p || !p.steps || !p.steps.length) return false;
      return p.steps.every(function (s) { return projectStepDone(s.id); });
    }
  }

  /* ------------------------------------------------- export / import ---- */

  function exportJSON() {
    return JSON.stringify({ app: "formation-web", exportedAt: new Date().toISOString(), progress: state }, null, 2);
  }

  function importJSON(text) {
    var parsed = JSON.parse(text);
    var payload = parsed && parsed.progress ? parsed.progress : parsed;
    if (!payload || typeof payload !== "object") throw new Error("Format de sauvegarde inconnu.");
    state = Object.assign(fresh(), payload);
    state.lessons = payload.lessons || {};
    state.exercises = payload.exercises || {};
    state.quizzes = payload.quizzes || {};
    state.project = payload.project || {};
    state.drafts = payload.drafts || {};
    save();
  }

  function reset() {
    state = fresh();
    save();
  }

  FW.store = {
    load: load,
    save: save,
    get: function () { return state; },
    modules: modules,
    moduleById: moduleById,
    allLessons: allLessons,
    allExercises: allExercises,
    lessonById: lessonById,
    exerciseById: exerciseById,
    project: project,
    lessonDone: lessonDone,
    setLessonDone: setLessonDone,
    exerciseDone: exerciseDone,
    setExerciseDone: setExerciseDone,
    quizRecord: quizRecord,
    setQuizRecord: setQuizRecord,
    projectStepDone: projectStepDone,
    setProjectStepDone: setProjectStepDone,
    draft: draft,
    setDraft: setDraft,
    clearDraft: clearDraft,
    setLast: setLast,
    last: last,
    theme: theme,
    setTheme: setTheme,
    sidebarCollapsed: sidebarCollapsed,
    setSidebarCollapsed: setSidebarCollapsed,
    moduleProgress: moduleProgress,
    overall: overall,
    badges: badges,
    exportJSON: exportJSON,
    importJSON: importJSON,
    reset: reset,
    storageAvailable: !!LS
  };
})();
