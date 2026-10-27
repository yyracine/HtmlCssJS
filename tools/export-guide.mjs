/* =========================================================================
   export-guide.mjs — convertit content/guide.js en Markdown lisible
   usage : node tools/export-guide.mjs   →  docs/GUIDE-UTILISATION.md
   ========================================================================= */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root, "content", "guide.js"), "utf8"), sandbox, {
  filename: "content/guide.js"
});

const guide = sandbox.window.COURSE_GUIDE;
if (!guide) {
  console.error("COURSE_GUIDE introuvable dans content/guide.js");
  process.exit(1);
}

const inline = (text) =>
  String(text == null ? "" : text)
    .replace(/==([^=]+)==/g, "**$1**")
    .replace(/\n+/g, " ")
    .trim();

const cell = (text) => inline(text).replace(/\|/g, "\\|");

function fence(lang, code) {
  const body = String(code == null ? "" : code).replace(/\s+$/, "");
  const safe = lang === "text" ? "" : lang || "";
  const ticks = body.includes("```") ? "````" : "```";
  return `${ticks}${safe}\n${body}\n${ticks}\n`;
}

function blockToMd(block) {
  if (!block || !block.type) return "";
  switch (block.type) {
    case "lead":
    case "p":
      return inline(block.text) + "\n";
    case "h":
      return (block.level === 3 ? "#### " : "### ") + inline(block.text) + "\n";
    case "code": {
      const caption = block.caption ? `*${inline(block.caption)}*\n` : "";
      return caption + fence(block.lang || "text", block.code);
    }
    case "list": {
      const items = (block.items || []).map((item, i) =>
        block.ordered ? `${i + 1}. ${inline(item)}` : `- ${inline(item)}`
      );
      return items.join("\n") + "\n";
    }
    case "callout": {
      const label = { info: "À noter", tip: "Conseil", warning: "Attention", danger: "Piège", success: "Objectif" }[block.tone] || "Note";
      const lines = [`> **${label}${block.title ? " — " + inline(block.title) : ""}**`];
      if (block.text) lines.push(`> ${inline(block.text)}`);
      (block.items || []).forEach((item) => lines.push(`> - ${inline(item)}`));
      return lines.join("\n") + "\n";
    }
    case "table": {
      const head = (block.head || []).map(cell);
      const rows = (block.rows || []).map((row) => row.map(cell));
      const lines = [
        `| ${head.join(" | ")} |`,
        `| ${head.map(() => "---").join(" | ")} |`,
        ...rows.map((row) => `| ${row.join(" | ")} |`)
      ];
      return lines.join("\n") + "\n";
    }
    case "steps":
      return (block.items || [])
        .map((item, i) => `${i + 1}. **${inline(item.title)}** — ${inline(item.text)}`)
        .join("\n") + "\n";
    case "keyterms":
      return (block.items || [])
        .map((item) => `- **${inline(item.term)}** : ${inline(item.def)}`)
        .join("\n") + "\n";
    case "quote":
      return `> ${inline(block.text)}` + (block.cite ? `\n>\n> — ${inline(block.cite)}` : "") + "\n";
    case "checklist":
      return (block.items || []).map((item) => `- [ ] ${inline(item)}`).join("\n") + "\n";
    case "compare":
      return [
        block.text ? inline(block.text) + "\n" : "",
        `**${inline((block.left || {}).title || "")}**\n`,
        fence((block.left || {}).lang || "html", (block.left || {}).code),
        `**${inline((block.right || {}).title || "")}**\n`,
        fence((block.right || {}).lang || "html", (block.right || {}).code)
      ].join("\n");
    case "demo":
      return [
        `**Démo — ${inline(block.title || "exemple")}**\n`,
        block.html ? fence("html", block.html) : "",
        block.css ? fence("css", block.css) : "",
        block.js ? fence("js", block.js) : ""
      ].join("\n");
    default:
      return "";
  }
}

const lines = [];
lines.push(`# ${guide.title}`);
lines.push("");
lines.push(`> ${inline(guide.subtitle)}`);
lines.push("");
lines.push(`*${guide.updated || ""} · formation HTML, CSS & JavaScript — ce guide est aussi consultable dans l'application, page « Guide d'utilisation ».*`);
lines.push("");
lines.push("## Sommaire");
lines.push("");
guide.sections.forEach((section, i) => {
  lines.push(`${i + 1}. ${inline(section.title)}`);
});
lines.push("");

guide.sections.forEach((section, i) => {
  lines.push("---");
  lines.push("");
  lines.push(`## ${i + 1}. ${inline(section.title)}`);
  lines.push("");
  (section.blocks || []).forEach((block) => {
    const md = blockToMd(block);
    if (md.trim()) {
      lines.push(md.trimEnd());
      lines.push("");
    }
  });
});

lines.push("---");
lines.push("");
lines.push("*Document généré depuis `content/guide.js` — ne pas éditer directement.*");

const target = path.join(root, "docs", "GUIDE-UTILISATION.md");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, lines.join("\n"), "utf8");
console.log(`Guide exporté : ${path.relative(root, target)} (${guide.sections.length} sections, ${lines.length} lignes)`);
