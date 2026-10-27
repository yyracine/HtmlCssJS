/* =========================================================================
   ui.js — utilitaires d'interface : échappement, markdown en ligne,
   coloration syntaxique, icônes SVG, toasts, jauges.
   ========================================================================= */
(function () {
  "use strict";

  var FW = (window.FW = window.FW || {});

  /* ------------------------------------------------------------ texte ---- */

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** Markdown « en ligne » : **gras**, *italique*, `code`, ==surligné==, [lien](https://…). */
  function md(value) {
    var text = esc(value);
    var slots = [];
    function hold(html) {
      slots.push(html);
      return "\u0000" + (slots.length - 1) + "\u0000";
    }
    text = text.replace(/`([^`]+)`/g, function (_, code) {
      return hold('<code class="inline">' + code + "</code>");
    });
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
    text = text.replace(/==([^=]+)==/g, "<mark>$1</mark>");
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, function (_, label, href) {
      return hold('<a href="' + href + '" target="_blank" rel="noopener noreferrer">' + label + "</a>");
    });
    return restore(text, slots);
  }

  function restore(text, slots) {
    var guard = 0;
    while (/\u0000\d+\u0000/.test(text) && guard++ < 6) {
      text = text.replace(/\u0000(\d+)\u0000/g, function (_, i) {
        return slots[Number(i)] != null ? slots[Number(i)] : "";
      });
    }
    return text;
  }

  /* ------------------------------------------------ coloration syntaxique -- */

  var JS_KEYWORDS = [
    "const","let","var","function","return","if","else","for","while","do","switch","case",
    "break","continue","new","class","extends","super","this","try","catch","finally","throw",
    "typeof","instanceof","in","of","delete","void","async","await","yield","import","export",
    "from","default","static","get","set","true","false","null","undefined","NaN"
  ];

  /**
   * Colore du code pour l'affichage (HTML) — entrée brute, sortie échappée + <span>.
   * lang : "html" | "css" | "js" | "text" | "bash"
   */
  function highlight(code, lang) {
    var source = esc(code == null ? "" : code);
    var slots = [];
    function hold(html) {
      slots.push(html);
      return "\u0000" + (slots.length - 1) + "\u0000";
    }
    var out = source;

    if (lang === "html") {
      out = out.replace(/&lt;!--[\s\S]*?--&gt;/g, function (m) {
        return hold('<span class="tok-com">' + m + "</span>");
      });
      out = out.replace(/&lt;!DOCTYPE[^&]*?&gt;/gi, function (m) {
        return hold('<span class="tok-kw">' + m + "</span>");
      });
      out = out.replace(/(&lt;\/?)([A-Za-z][\w:-]*)([\s\S]*?)(\/?&gt;)/g, function (m, open, name, attrs, close) {
        var a = attrs || "";
        a = a.replace(
          /([\w:.-]+)(\s*=\s*)(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|[^\s]+)/g,
          function (mm, an, eq, val) {
            return '<span class="tok-attr">' + an + "</span>" + eq + '<span class="tok-str">' + val + "</span>";
          }
        );
        return hold(
          '<span class="tok-punct">' + open + "</span>" +
          '<span class="tok-tag">' + name + "</span>" + a +
          '<span class="tok-punct">' + close + "</span>"
        );
      });
      out = out.replace(/(&amp;[a-zA-Z][a-zA-Z0-9]*;|&#\d+;)/g, function (m) {
        return hold('<span class="tok-num">' + m + "</span>");
      });
    } else if (lang === "css") {
      out = out.replace(/\/\*[\s\S]*?\*\//g, function (m) {
        return hold('<span class="tok-com">' + m + "</span>");
      });
      out = out.replace(/@[\w-]+/g, function (m) {
        return hold('<span class="tok-kw">' + m + "</span>");
      });
      out = out.replace(/([\w:.\-#\[\]="'\s,>*+~()]+?)(\s*\{)/g, function (m, sel, brace) {
        var painted = sel.replace(/(\.[\w-]+|#[\w-]+|:[\w-]+|::[\w-]+)/g, function (mm) {
          return '<span class="tok-tag">' + mm + "</span>";
        });
        return hold(painted + '<span class="tok-punct">' + brace + "</span>");
      });
      out = out.replace(/([\w-]+)(\s*:\s*)([^;{}]+)(;?)/g, function (m, prop, colon, value, semi) {
        var v = value.replace(/(-?\d*\.?\d+)(px|rem|em|%|vh|vw|vmin|vmax|s|ms|fr|deg|ch|ex)?/g, function (mm) {
          return '<span class="tok-num">' + mm + "</span>";
        });
        v = v.replace(/(#[0-9a-fA-F]{3,8}\b|&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|`)/g, function (mm) {
          return '<span class="tok-str">' + mm + "</span>";
        });
        return hold(
          '<span class="tok-prop">' + prop + "</span>" + colon + v +
          '<span class="tok-punct">' + semi + "</span>"
        );
      });
    } else if (lang === "js") {
      out = out.replace(/\/\*[\s\S]*?\*\//g, function (m) {
        return hold('<span class="tok-com">' + m + "</span>");
      });
      out = out.replace(/(^|[^:])\/\/[^\n]*/g, function (m, lead) {
        return lead + hold('<span class="tok-com">' + m.slice(lead.length) + "</span>");
      });
      out = out.replace(/(&quot;|&#39;|`)(?:\\[\s\S]|(?!\1)[\s\S])*?\1/g, function (m) {
        return hold('<span class="tok-str">' + m + "</span>");
      });
      out = out.replace(new RegExp("\\b(" + JS_KEYWORDS.join("|") + ")\\b", "g"), function (m) {
        return hold('<span class="tok-kw">' + m + "</span>");
      });
      out = out.replace(/\b(\d+(?:\.\d+)?)\b/g, function (m) {
        return hold('<span class="tok-num">' + m + "</span>");
      });
      out = out.replace(/([\w$]+)(\s*\()/g, function (m, name, paren) {
        return '<span class="tok-fn">' + name + "</span>" + paren;
      });
    } else if (lang === "bash") {
      out = out.replace(/(^|\n)(\s*)(#[^\n]*)/g, function (m, nl, space, comment) {
        return nl + space + hold('<span class="tok-com">' + comment + "</span>");
      });
    }

    return restore(out, slots);
  }

  /* ------------------------------------------------------------ icônes ---- */

  var PATHS = {
    markup: '<path d="M8 9 4 12l4 3"/><path d="m16 9 4 3-4 3"/><path d="M13.5 6 10.5 18"/>',
    palette:
      '<path d="M12 3a9 9 0 1 0 0 18h1.6a2 2 0 0 0 1.4-3.4 2 2 0 0 1 1.4-3.4H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="11" cy="7.5" r="1"/><circle cx="15.5" cy="8.5" r="1"/>',
    code: '<path d="M9 4 3 12l6 8"/><path d="m15 4 6 8-6 8"/>',
    check: '<path d="m4 12.5 5 5L20 6.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    "arrow-right": '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
    "arrow-left": '<path d="M20 12H5"/><path d="m11 18-6-6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    "panel-left": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="M15.5 9.5 13 12l2.5 2.5"/>',
    "panel-left-open": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="M12.5 9.5 15 12l-2.5 2.5"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 6"/><path d="M20 4v7h-7"/>',
    lightbulb: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.4.3.5.7.5 1.1v.5h6v-.5c0-.4.1-.8.5-1.1A6 6 0 0 0 12 3Z"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    download: '<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2Z"/><path d="M4 17h15"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3"/><path d="M12 13v4M9 21h6M10 21v-2.5h4V21"/>',
    play: '<path d="m8 5 11 7-11 7Z"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="M18 16l.9 2.1L21 19l-2.1.9L18 22l-.9-2.1L15 19l2.1-.9Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.6v.1"/>',
    alert: '<path d="M12 4 2.5 20h19Z"/><path d="M12 10v4M12 17.2v.1"/>',
    flame: '<path d="M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-1.6.7-3 1.5-4 .2 1.4 1 2.3 2 2.8C10 9 10.6 6 12 3Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    home: '<path d="m3 10.5 9-7 9 7V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
    zap: '<path d="M13 2 4 14h6l-1 8 9-12h-6Z"/>',
    "external-link": '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    "corner-down-right": '<path d="M4 5v6a2 2 0 0 0 2 2h13"/><path d="m14 8 5 5-5 5"/>',
    circle: '<circle cx="12" cy="12" r="8"/>',
    "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.7 2.7L16 9.5"/>',
    "rotate-ccw": '<path d="M3 5v6h6"/><path d="M3.5 11a8.5 8.5 0 1 0 2.2-5.6L3 8"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
    save: '<path d="M5 3h11l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9Z"/>'
  };

  function icon(name, extraClass) {
    var body = PATHS[name] || PATHS.circle;
    return (
      '<span class="icon ' + (extraClass || "") + '" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round">' + body + "</svg></span>"
    );
  }

  /* ------------------------------------------------------------ toasts ---- */

  function toast(message, kind) {
    var host = document.getElementById("toasts");
    if (!host) return;
    var node = document.createElement("div");
    node.className = "toast" + (kind === "error" ? " toast--error" : "");
    node.innerHTML =
      icon(kind === "error" ? "alert" : "check-circle") +
      "<span>" + esc(message) + "</span>";
    host.appendChild(node);
    setTimeout(function () {
      node.style.transition = "opacity .25s ease, transform .25s ease";
      node.style.opacity = "0";
      node.style.transform = "translateY(8px)";
      setTimeout(function () { node.remove(); }, 260);
    }, 2600);
  }

  /* ------------------------------------------------------ jauges & barres -- */

  function ring(percent, size, stroke, color) {
    var s = size || 76;
    var sw = stroke || 7;
    var r = (s - sw) / 2;
    var c = 2 * Math.PI * r;
    var pct = Math.max(0, Math.min(100, Math.round(percent || 0)));
    var dash = (c * pct) / 100;
    return (
      '<div class="ring" style="width:' + s + "px;height:" + s + 'px">' +
      '<svg width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + " " + s + '">' +
      '<circle cx="' + s / 2 + '" cy="' + s / 2 + '" r="' + r + '" fill="none" ' +
      'stroke="var(--surface-3)" stroke-width="' + sw + '"/>' +
      '<circle cx="' + s / 2 + '" cy="' + s / 2 + '" r="' + r + '" fill="none" ' +
      'stroke="' + (color || "url(#ringGrad)") + '" stroke-width="' + sw + '" stroke-linecap="round" ' +
      'stroke-dasharray="' + dash + " " + (c - dash) + '"/>' +
      '<defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="var(--brand-1)"/><stop offset="100%" stop-color="var(--brand-2)"/>' +
      "</linearGradient></defs>" +
      "</svg>" +
      '<div class="ring__value"><strong>' + pct + "%</strong></div>" +
      "</div>"
    );
  }

  function pbar(percent, label) {
    var pct = Math.max(0, Math.min(100, Math.round(percent || 0)));
    return (
      '<div class="pbar">' +
      (label ? '<div class="pbar__label"><span>' + esc(label) + "</span><span>" + pct + "%</span></div>" : "") +
      '<div class="pbar__track"><div class="pbar__fill" style="width:' + pct + '%"></div></div>' +
      "</div>"
    );
  }

  /* ------------------------------------------------------------- divers --- */

  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var args = arguments;
      var ctx = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
    };
  }

  function copyText(text) {
    var done = function () { toast("Copié dans le presse-papiers"); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    } else {
      fallback();
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast("Copie impossible", "error"); }
      ta.remove();
    }
  }

  function difficultyDots(level) {
    var out = '<span class="difficulty" aria-label="Difficulté ' + level + ' sur 3">';
    for (var i = 1; i <= 3; i++) out += "<i" + (i <= level ? ' class="on"' : "") + "></i>";
    return out + "</span>";
  }

  FW.ui = {
    esc: esc,
    md: md,
    highlight: highlight,
    icon: icon,
    toast: toast,
    ring: ring,
    pbar: pbar,
    debounce: debounce,
    copyText: copyText,
    difficultyDots: difficultyDots
  };
})();
