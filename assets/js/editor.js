/* =========================================================================
   editor.js — bac à sable de code (HTML/CSS/JS), aperçu live,
   moteur de vérification des exercices, montage des démos de cours.
   ========================================================================= */
(function () {
  "use strict";

  var FW = (window.FW = window.FW || {});
  var ui = FW.ui;

  var BASE_CSS = [
    "*,*::before,*::after{box-sizing:border-box}",
    "html{color-scheme:light}",
    "body{margin:0;padding:14px;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;",
    "font-size:15px;line-height:1.55;color:#1b2432;background:#fff}",
    "h1,h2,h3,h4{line-height:1.2;margin:0 0 .5em}",
    "p{margin:0 0 .8em}",
    "img{max-width:100%;height:auto}",
    "button,input,select,textarea{font:inherit}"
  ].join("");

  function buildDoc(html, css, js) {
    var safeJs = String(js || "").replace(/<\/script/gi, "<\\/script");
    return (
      "<!DOCTYPE html><html lang=\"fr\"><head><meta charset=\"utf-8\">" +
      "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
      "<style>" + BASE_CSS + "</style><style>" + String(css || "") + "</style></head><body>" +
      String(html || "") +
      (String(js || "").trim() ? "<script>" + safeJs + "<\/script>" : "") +
      "</body></html>"
    );
  }

  function evalCheck(expr, doc, win) {
    try {
      if (typeof expr !== "string" || !expr.trim()) {
        return { pass: false, error: "Vérification indisponible" };
      }
      var getText = function (sel) {
        var el = doc.querySelector(sel);
        return el ? (el.textContent || "").replace(/\s+/g, " ").trim() : "";
      };
      var getAttr = function (sel, name) {
        var el = doc.querySelector(sel);
        return el ? el.getAttribute(name) : null;
      };
      var style = function (sel, prop) {
        var el = doc.querySelector(sel);
        if (!el) return null;
        var cs = win.getComputedStyle(el);
        if (!cs) return null;
        var value = cs[prop];
        if (value == null || value === "") value = cs.getPropertyValue(prop);
        return value == null ? null : String(value);
      };
      var countOf = function (sel) { return doc.querySelectorAll(sel).length; };
      var fn = new Function(
        "document", "win", "getText", "getAttr", "style", "countOf",
        '"use strict"; return (' + expr + ");"
      );
      var result = fn(doc, win, getText, getAttr, style, countOf);
      return { pass: !!result, error: null };
    } catch (e) {
      return { pass: false, error: e && e.message ? e.message : String(e) };
    }
  }

  /* ------------------------------------------------------- bac à sable ---- */

  function create(container, options) {
    options = options || {};
    var code = {
      html: (options.initial && options.initial.html) || "",
      css: (options.initial && options.initial.css) || "",
      js: (options.initial && options.initial.js) || ""
    };
    var langs = ["html", "css", "js"];
    var labels = { html: "HTML", css: "CSS", js: "JS" };
    var active = "html";
    var live = true;
    var previewHeight = options.previewHeight || 300;
    var highlightOn = true;
    var numbersOn = true;
    var loaded = false;
    var drafts = {};

    container.innerHTML =
      '<div class="playground">' +
      '<div class="playground__bar">' +
      '<div class="tabs" role="tablist">' +
      langs.map(function (l) {
        return '<button type="button" role="tab" class="tab tab--' + l + (l === "html" ? " is-active" : "") +
          '" data-tab="' + l + '" aria-selected="' + (l === "html") + '">' +
          '<span class="tab__dot"></span>' + labels[l] + "</button>";
      }).join("") +
      "</div>" +
      '<div class="grow"></div>' +
      '<label class="btn btn--ghost btn--sm" title="Aperçu automatique">' +
      '<input type="checkbox" checked data-act="live" style="accent-color:var(--accent)"> Live</label>' +
      '<button type="button" class="btn btn--ghost btn--sm" data-act="numbers" title="Afficher ou masquer les numéros de ligne" aria-pressed="true">' +
      ui.icon("list") + '<span>N°</span></button>' +
      '<button type="button" class="btn btn--ghost btn--sm" data-act="highlight" title="Coloration syntaxique">' +
      ui.icon("sparkle") + '<span class="sr-hl">Couleurs</span></button>' +
      '<button type="button" class="btn btn--ghost btn--sm" data-act="refresh" title="Relancer l\'aperçu (Ctrl+Entrée)">' +
      ui.icon("refresh") + "<span>Relancer</span></button>" +
      "</div>" +
      '<div class="playground__panes">' +
      langs.map(function (l) {
        return '<div class="playground__pane' + (l === "html" ? " is-active" : "") + '" data-pane="' + l + '">' +
          '<div class="editor">' +
          '<div class="editor__gutter" aria-hidden="true"></div>' +
          '<div class="editor__stage">' +
          '<pre class="editor__highlight" aria-hidden="true"><code></code></pre>' +
          '<textarea class="editor__input" data-input="' + l + '" spellcheck="false" ' +
          'autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" ' +
          'aria-label="Éditeur ' + labels[l] + '"></textarea>' +
          "</div></div></div>";
      }).join("") +
      "</div>" +
      '<div class="playground__foot">' +
      '<span class="playground__status" data-status><span class="dot"></span><span data-status-text>Aperçu à jour</span></span>' +
      '<span class="grow"></span>' +
      '<span class="small muted">Ctrl + Entrée pour relancer</span>' +
      "</div>" +
      '<div class="preview"><div class="preview__bar"><span class="dots"><i></i><i></i><i></i></span>' +
      "<span>Aperçu</span><span class=\"grow\"></span>" +
      '<button type="button" class="btn btn--ghost btn--sm" data-act="open">' + ui.icon("external-link") + "Ouvrir</button>" +
      "</div>" +
      '<iframe title="Aperçu du code" style="height:' + previewHeight + 'px"></iframe></div>' +
      "</div>";

    var root = container.querySelector(".playground");
    var iframe = root.querySelector("iframe");
    var statusEl = root.querySelector("[data-status]");
    var statusText = root.querySelector("[data-status-text]");

    var edState = {};
    langs.forEach(function (l) {
      var pane = root.querySelector('[data-pane="' + l + '"]');
      var editor = pane.querySelector(".editor");
      var textarea = pane.querySelector("textarea");
      var hl = pane.querySelector(".editor__highlight");
      var codeEl = hl.querySelector("code");
      var gutter = pane.querySelector(".editor__gutter");
      edState[l] = { pane: pane, editor: editor, textarea: textarea, hl: hl, codeEl: codeEl, gutter: gutter };
      textarea.value = code[l];
      paint(l);
      wireEditor(l);
    });

    function paint(l) {
      var st = edState[l];
      var value = code[l];
      if (highlightOn) {
        st.codeEl.innerHTML = ui.highlight(value, l);
      } else {
        st.codeEl.textContent = value;
      }
      var lines = value.split("\n").length;
      var digits = String(lines).length;
      var out = "";
      for (var i = 1; i <= lines; i++) out += i + "\n";
      st.gutter.textContent = out;
      st.gutter.style.paddingRight = (digits > 2 ? 2 : 8) + "px";
    }

    var schedulePreview = ui.debounce(function () {
      if (live) refresh();
      else markStale();
    }, 420);

    function markStale() {
      statusEl.classList.add("is-stale");
      statusText.textContent = "Modifié — relancez l'aperçu";
    }

    function wireEditor(l) {
      var st = edState[l];
      var ta = st.textarea;

      ta.addEventListener("input", function () {
        code[l] = ta.value;
        if (highlightOn) st.codeEl.innerHTML = ui.highlight(ta.value, l);
        else st.codeEl.textContent = ta.value;
        var lines = ta.value.split("\n").length;
        var out = "";
        for (var i = 1; i <= lines; i++) out += i + "\n";
        st.gutter.textContent = out;
        markStale();
        schedulePreview();
        if (options.onChange) options.onChange(getCode(), l);
      });

      ta.addEventListener("scroll", function () {
        st.hl.scrollTop = ta.scrollTop;
        st.hl.scrollLeft = ta.scrollLeft;
        st.gutter.scrollTop = ta.scrollTop;
      });

      ta.addEventListener("keydown", function (event) {
        var k = event.key;
        if (k === "Enter" && (event.ctrlKey || event.metaKey)) {
          event.preventDefault();
          refresh();
          return;
        }
        if (k === "Tab") {
          event.preventDefault();
          if (event.shiftKey) {
            dedent(ta);
          } else {
            insert(ta, "  ");
          }
          return;
        }
        if (k === "Enter" && !event.shiftKey) {
          var start = ta.selectionStart;
          var before = ta.value.slice(0, start);
          var line = before.slice(before.lastIndexOf("\n") + 1);
          var indentMatch = line.match(/^[ \t]*/);
          var indent = indentMatch ? indentMatch[0] : "";
          var trimmed = line.trim();
          var extra = /[{:>]$/.test(trimmed) ? "  " : "";
          event.preventDefault();
          insert(ta, "\n" + indent + extra);
          return;
        }
      });
    }

    function insert(ta, text) {
      var start = ta.selectionStart;
      var end = ta.selectionEnd;
      ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
      ta.selectionStart = ta.selectionEnd = start + text.length;
      ta.dispatchEvent(new Event("input"));
    }

    function dedent(ta) {
      var start = ta.selectionStart;
      var before = ta.value.slice(0, start);
      var lineStart = before.lastIndexOf("\n") + 1;
      var prefix = ta.value.slice(lineStart, lineStart + 2);
      if (prefix === "  ") {
        ta.value = ta.value.slice(0, lineStart) + ta.value.slice(lineStart + 2);
        ta.selectionStart = ta.selectionEnd = Math.max(lineStart, start - 2);
      } else if (prefix[0] === " ") {
        ta.value = ta.value.slice(0, lineStart) + ta.value.slice(lineStart + 1);
        ta.selectionStart = ta.selectionEnd = Math.max(lineStart, start - 1);
      }
      ta.dispatchEvent(new Event("input"));
    }

    // onglets
    root.querySelectorAll("[data-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var l = btn.getAttribute("data-tab");
        active = l;
        root.querySelectorAll("[data-tab]").forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", String(on));
        });
        root.querySelectorAll("[data-pane]").forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-pane") === l);
        });
        edState[l].textarea.focus();
      });
    });

    root.querySelector('[data-act="live"]').addEventListener("change", function (e) {
      live = e.target.checked;
      if (live) refresh();
    });

    root.querySelector('[data-act="highlight"]').addEventListener("click", function () {
      highlightOn = !highlightOn;
      langs.forEach(function (l) {
        edState[l].editor.classList.toggle("is-plain", !highlightOn);
        paint(l);
      });
      ui.toast(highlightOn ? "Coloration activée" : "Coloration désactivée");
    });

    var numbersBtn = root.querySelector('[data-act="numbers"]');
    numbersBtn.addEventListener("click", function () {
      numbersOn = !numbersOn;
      langs.forEach(function (l) {
        edState[l].gutter.style.display = numbersOn ? "" : "none";
        edState[l].editor.classList.toggle("is-nonumbered", !numbersOn);
      });
      numbersBtn.setAttribute("aria-pressed", String(numbersOn));
      ui.toast(numbersOn ? "Numéros de ligne affichés" : "Numéros de ligne masqués");
    });

    root.querySelector('[data-act="refresh"]').addEventListener("click", function () { refresh(); });

    root.querySelector('[data-act="open"]').addEventListener("click", function () {
      try {
        var blob = new Blob([buildDoc(code.html, code.css, code.js)], { type: "text/html" });
        var url = URL.createObjectURL(blob);
        window.open(url, "_blank", "noopener");
        setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      } catch (e) {
        ui.toast("Ouverture impossible dans ce navigateur", "error");
      }
    });

    var resolveLoad = null;
    iframe.addEventListener("load", function () {
      loaded = true;
      if (resolveLoad) { var r = resolveLoad; resolveLoad = null; r(); }
    });

    function refresh() {
      return new Promise(function (resolve) {
        statusEl.classList.remove("is-stale");
        statusText.textContent = "Chargement…";
        resolveLoad = function () {
          statusText.textContent = "Aperçu à jour";
          resolve(true);
        };
        iframe.srcdoc = buildDoc(code.html, code.css, code.js);
        setTimeout(function () {
          if (resolveLoad) { var r = resolveLoad; resolveLoad = null; r(); }
        }, 2500);
      });
    }

    function getCode() {
      return { html: code.html, css: code.css, js: code.js };
    }

    function setCode(next) {
      next = next || {};
      langs.forEach(function (l) {
        code[l] = next[l] != null ? String(next[l]) : "";
        var st = edState[l];
        st.textarea.value = code[l];
        paint(l);
      });
      markStale();
      if (live) refresh();
      if (options.onChange) options.onChange(getCode());
    }

    function runChecks(checks) {
      var list = Array.isArray(checks) ? checks : [];
      if (!list.length) return Promise.resolve([]);
      return refresh().then(function () {
        var doc = iframe.contentDocument;
        var win = iframe.contentWindow;
        return list.map(function (expr) {
          if (!doc) return { expr: expr, pass: false, error: "Aperçu indisponible" };
          var res = evalCheck(expr, doc, win);
          return { expr: expr, pass: res.pass, error: res.error };
        });
      });
    }

    refresh();

    return {
      getCode: getCode,
      setCode: setCode,
      refresh: refresh,
      runChecks: runChecks,
      buildDoc: function () { return buildDoc(code.html, code.css, code.js); },
      focus: function (l) { if (edState[l]) edState[l].textarea.focus(); }
    };
  }

  /* ------------------------------------------------ démos de leçon ------- */

  function mountDemos(root) {
    var registry = FW.render.demos();
    root.querySelectorAll("[data-demo]").forEach(function (card) {
      var id = card.getAttribute("data-demo");
      var demo = registry[id];
      if (!demo) return;
      var frame = card.querySelector("iframe");
      if (frame) frame.srcdoc = buildDoc(demo.html, demo.css, demo.js);

      var tabs = card.querySelectorAll("[data-demo-tab]");
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          var index = tab.getAttribute("data-demo-tab");
          tabs.forEach(function (t) {
            var on = t === tab;
            t.classList.toggle("is-active", on);
            t.setAttribute("aria-selected", String(on));
          });
          card.querySelectorAll("[data-demo-pane]").forEach(function (pane) {
            pane.hidden = pane.getAttribute("data-demo-pane") !== index;
          });
        });
      });

      var openBtn = card.querySelector("[data-demo-open]");
      if (openBtn) {
        openBtn.addEventListener("click", function () {
          try {
            var blob = new Blob([buildDoc(demo.html, demo.css, demo.js)], { type: "text/html" });
            window.open(URL.createObjectURL(blob), "_blank", "noopener");
          } catch (e) { /* ignore */ }
        });
      }
    });
  }

  FW.editor = {
    create: create,
    mountDemos: mountDemos,
    buildDoc: buildDoc,
    evalCheck: evalCheck
  };
})();
