/* =========================================================================
   render.js — rendu des blocs de cours, démos, listes de leçons/exercices
   ========================================================================= */
(function () {
  "use strict";

  var FW = (window.FW = window.FW || {});
  var ui = FW.ui;

  var copies = {};
  var demos = {};
  var counter = 0;

  function resetRegistries() {
    copies = {};
    demos = {};
    counter = 0;
  }

  function copyButton(text) {
    var id = "cp" + ++counter;
    copies[id] = text;
    return '<button class="btn btn--ghost btn--sm code-card__copy" type="button" data-copy="' +
      id + '" aria-label="Copier le code">' + ui.icon("copy") + "<span>Copier</span></button>";
  }

  function codeFigure(block) {
    var lang = block.lang || "text";
    var label = { html: "HTML", css: "CSS", js: "JavaScript", bash: "Terminal", text: "Texte" }[lang] || lang;
    return (
      '<figure class="blk blk--code" style="margin:0">' +
      '<div class="code-card">' +
      '<div class="code-card__bar">' +
      '<span class="code-card__lang">' + ui.esc(label) + "</span>" +
      (block.caption ? '<span class="code-card__caption">' + ui.md(block.caption) + "</span>" : "") +
      copyButton(block.code || "") +
      "</div>" +
      '<pre><code class="lang-' + ui.esc(lang) + '">' + ui.highlight(block.code || "", lang) + "</code></pre>" +
      "</div></figure>"
    );
  }

  function demoMarkup(block) {
    var id = "dm" + ++counter;
    var parts = [];
    if (block.html && block.html.trim()) parts.push({ lang: "html", label: "HTML", code: block.html });
    if (block.css && block.css.trim()) parts.push({ lang: "css", label: "CSS", code: block.css });
    if (block.js && block.js.trim()) parts.push({ lang: "js", label: "JS", code: block.js });
    demos[id] = { html: block.html || "", css: block.css || "", js: block.js || "", height: block.height || 220 };

    var tabs = "";
    if (parts.length > 1) {
      tabs = '<div class="demo-card__tabs" role="tablist">' +
        parts.map(function (p, i) {
          return '<button class="demo-card__tab' + (i === 0 ? " is-active" : "") +
            '" type="button" role="tab" data-demo-tab="' + i + '" aria-selected="' + (i === 0) + '">' +
            p.label + "</button>";
        }).join("") + "</div>";
    }

    var panes = parts.map(function (p, i) {
      return '<pre class="demo-card__code" data-demo-pane="' + i + '"' + (i === 0 ? "" : " hidden") +
        '><code>' + ui.highlight(p.code, p.lang) + "</code></pre>";
    }).join("");

    return (
      '<div class="blk blk--demo">' +
      '<div class="demo-card" data-demo="' + id + '">' +
      '<div class="demo-card__bar">' + ui.icon("play") +
      "<span>" + ui.esc(block.title || "Démo live") + "</span>" + tabs + "</div>" +
      '<div class="demo-card__body">' +
      '<div class="demo-card__codewrap">' + panes + "</div>" +
      '<div class="demo-card__preview"><iframe title="Aperçu de la démo ' + ui.esc(block.title || "") +
      '" loading="lazy" style="height:' + demos[id].height + 'px"></iframe></div>' +
      "</div></div></div>"
    );
  }

  var RENDERERS = {
    p: function (b) { return '<div class="blk blk--p"><p>' + ui.md(b.text) + "</p></div>"; },
    lead: function (b) { return '<div class="blk blk--lead"><p>' + ui.md(b.text) + "</p></div>"; },
    h: function (b) {
      var lvl = b.level === 3 ? 3 : 2;
      return '<div class="blk blk--h"><h' + lvl + ">" + ui.md(b.text) + "</h" + lvl + "></div>";
    },
    code: codeFigure,
    list: function (b) {
      var tag = b.ordered ? "ol" : "ul";
      var items = (b.items || []).map(function (it) { return "<li>" + ui.md(it) + "</li>"; }).join("");
      return '<div class="blk blk--list"><' + tag + ">" + items + "</" + tag + "></div>";
    },
    callout: function (b) {
      var tone = b.tone || "info";
      var iconName = { info: "info", tip: "lightbulb", warning: "alert", danger: "alert", success: "check-circle" }[tone] || "info";
      var items = (b.items || []).map(function (it) { return "<li>" + ui.md(it) + "</li>"; }).join("");
      return (
        '<div class="blk blk--callout"><div class="callout callout--' + ui.esc(tone) + '">' +
        '<div class="callout__icon">' + ui.icon(iconName) + "</div>" +
        '<div class="callout__body">' +
        (b.title ? '<div class="callout__title">' + ui.md(b.title) + "</div>" : "") +
        (b.text ? "<p>" + ui.md(b.text) + "</p>" : "") +
        (items ? "<ul>" + items + "</ul>" : "") +
        "</div></div></div>"
      );
    },
    table: function (b) {
      var head = (b.head || []).map(function (h) { return "<th>" + ui.md(h) + "</th>"; }).join("");
      var rows = (b.rows || []).map(function (r) {
        return "<tr>" + (r || []).map(function (c) { return "<td>" + ui.md(c) + "</td>"; }).join("") + "</tr>";
      }).join("");
      return '<div class="blk blk--table"><div class="table-wrap"><table class="tbl"><thead><tr>' +
        head + "</tr></thead><tbody>" + rows + "</tbody></table></div></div>";
    },
    demo: demoMarkup,
    steps: function (b) {
      var items = (b.items || []).map(function (it) {
        return '<div class="step-item"><div><div class="step-item__title">' + ui.md(it.title) + "</div>" +
          '<div class="step-item__text">' + ui.md(it.text) + "</div></div></div>";
      }).join("");
      return '<div class="blk blk--steps"><div class="steps-list">' + items + "</div></div>";
    },
    keyterms: function (b) {
      var items = (b.items || []).map(function (it) {
        return '<div class="keyterm"><span>' + ui.esc(it.term) + "</span><span>" + ui.md(it.def) + "</span></div>";
      }).join("");
      return '<div class="blk blk--keyterms"><div class="keyterms">' + items + "</div></div>";
    },
    quote: function (b) {
      return '<div class="blk blk--quote"><blockquote class="quote">' + ui.md(b.text) +
        (b.cite ? "<cite>" + ui.esc(b.cite) + "</cite>" : "") + "</blockquote></div>";
    },
    compare: function (b) {
      function col(side, cls, iconName) {
        var s = side || {};
        return '<div class="compare__col ' + cls + '">' +
          '<div class="compare__title">' + ui.icon(iconName) + ui.esc(s.title || "") + "</div>" +
          '<div class="code-card"><pre><code>' + ui.highlight(s.code || "", s.lang || "html") + "</code></pre></div></div>";
      }
      return '<div class="blk blk--compare">' +
        '<div class="compare">' + col(b.left, "compare--bad", "x") + col(b.right, "compare--good", "check") + "</div>" +
        (b.text ? '<p class="compare__note">' + ui.md(b.text) + "</p>" : "") + "</div>";
    },
    checklist: function (b) {
      var items = (b.items || []).map(function (it) {
        return "<li>" + ui.icon("check") + "<span>" + ui.md(it) + "</span></li>";
      }).join("");
      return '<div class="blk blk--checklist"><div class="checklist">' +
        '<div class="checklist__title">À vérifier</div><ul>' + items + "</ul></div></div>";
    }
  };

  function blocks(list) {
    if (!list || !list.length) return "";
    return '<div class="blocks">' + list.map(function (b) {
      var fn = RENDERERS[b && b.type];
      if (!fn) return "";
      try { return fn(b); } catch (e) { return ""; }
    }).join("") + "</div>";
  }

  /* --------------------------------------------------------- cartes ------ */

  function lessonRow(entry, index) {
    var m = entry.module;
    var l = entry.lesson;
    var done = FW.store.lessonDone(l.id);
    var exTotal = (l.exercises || []).length;
    var exDone = (l.exercises || []).filter(function (e) { return FW.store.exerciseDone(e.id); }).length;
    return (
      '<a class="lesson-row' + (done ? " is-done" : "") + '" href="#/lesson/' + l.id + '" ' +
      'style="--module-accent:' + (m.accent || "var(--accent)") + '">' +
      '<span class="lesson-row__num">' + (done ? ui.icon("check") : String(index + 1).padStart(2, "0")) + "</span>" +
      '<span class="lesson-row__body">' +
      '<span class="lesson-row__title">' + ui.md(l.title) + "</span>" +
      '<span class="lesson-row__meta">' +
      '<span>' + ui.icon("clock") + " " + (l.minutes || 20) + " min</span>" +
      "<span>" + exTotal + " exercice" + (exTotal > 1 ? "s" : "") + " · " + exDone + " validé" + (exDone > 1 ? "s" : "") + "</span>" +
      (done ? '<span style="color:var(--ok)">Terminée</span>' : "") +
      "</span></span>" +
      '<span class="lesson-row__go">' + ui.icon("arrow-right") + "</span></a>"
    );
  }

  function exerciseRow(entry, opts) {
    var ex = entry.exercise;
    var done = FW.store.exerciseDone(ex.id);
    return (
      '<a class="lesson-row' + (done ? " is-done" : "") + '" href="#/exercise/' + ex.id + '">' +
      '<span class="lesson-row__num" style="border-radius:50%">' + (done ? ui.icon("check") : ui.icon("code")) + "</span>" +
      '<span class="lesson-row__body">' +
      '<span class="lesson-row__title">' + ui.esc(ex.title) + "</span>" +
      '<span class="lesson-row__meta">' +
      ui.difficultyDots(ex.difficulty || 1) +
      "<span>" + (entry.lesson ? ui.esc(entry.lesson.title) : "") + "</span>" +
      (done ? '<span style="color:var(--ok)">Validé</span>' : "") +
      "</span></span>" +
      '<span class="lesson-row__go">' + ui.icon("arrow-right") + "</span></a>"
    );
  }

  FW.render = {
    blocks: blocks,
    lessonRow: lessonRow,
    exerciseRow: exerciseRow,
    reset: resetRegistries,
    copies: function () { return copies; },
    demos: function () { return demos; }
  };
})();
