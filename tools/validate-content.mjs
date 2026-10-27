/* =========================================================================
   validate-content.mjs — contrôle structurel du contenu (à lancer avec Node)
   usage : node tools/validate-content.mjs
   ========================================================================= */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(root, "content");

const ALLOWED_BLOCKS = new Set([
  "p", "lead", "h", "code", "list", "callout", "table", "demo",
  "steps", "keyterms", "quote", "compare", "checklist"
]);
const ALLOWED_TONES = new Set(["info", "tip", "warning", "danger", "success"]);

const sandbox = { window: { COURSE_MODULES: [] }, console };
sandbox.window.COURSE_MODULES = [];
vm.createContext(sandbox);

function load(file) {
  const code = fs.readFileSync(path.join(CONTENT, file), "utf8");
  vm.runInContext(code, sandbox, { filename: file });
}

let problems = 0;
let warnings = 0;
function fail(msg) { problems++; console.log("  ✗ " + msg); }
function warn(msg) { warnings++; console.log("  ! " + msg); }

const files = fs.readdirSync(CONTENT).filter((f) => f.endsWith(".js")).sort();
for (const file of files) {
  try { load(file); } catch (e) { console.log(`✗ ${file} — erreur d'exécution : ${e.message}`); problems++; }
}

const modules = sandbox.window.COURSE_MODULES || [];
const project = sandbox.window.COURSE_PROJECT;

if (modules.length !== 3) fail(`3 modules attendus, ${modules.length} trouvés (html, css, js).`);

const seenIds = new Set();
let totalLessons = 0;
let totalExercises = 0;
let totalQuestions = 0;

function checkId(id, where) {
  if (!id || typeof id !== "string") { fail(`${where} : identifiant manquant`); return; }
  if (seenIds.has(id)) fail(`${where} : identifiant dupliqué « ${id} »`);
  seenIds.add(id);
}

function checkText(value, where, required = true) {
  if (value == null) { if (required) fail(`${where} : texte manquant`); return; }
  if (typeof value !== "string") { fail(`${where} : texte non chaîne`); return; }
  const withoutCode = value.replace(/`[^`]*`/g, "");
  if (/<[a-zA-Z/][^>]*>/.test(withoutCode)) fail(`${where} : HTML brut interdit dans un champ texte`);
}

function checkBlocks(blocks, where) {
  if (!Array.isArray(blocks) || !blocks.length) { fail(`${where} : content vide`); return { code: 0, callout: 0, demo: 0 }; }
  const stats = { code: 0, callout: 0, demo: 0 };
  blocks.forEach((b, i) => {
    if (!b || typeof b !== "object") { fail(`${where} bloc ${i} invalide`); return; }
    if (!ALLOWED_BLOCKS.has(b.type)) { fail(`${where} bloc ${i} : type inconnu « ${b.type} »`); return; }
    if (b.type === "code") {
      stats.code++;
      if (typeof b.code !== "string" || !b.code.trim()) fail(`${where} bloc ${i} (code) : code vide`);
      if (b.lang && !["html", "css", "js", "bash", "text"].includes(b.lang)) fail(`${where} bloc ${i} : lang « ${b.lang} » inconnu`);
    }
    if (b.type === "demo") {
      stats.demo++;
      if (![b.html, b.css, b.js].some((v) => typeof v === "string" && v.trim())) fail(`${where} bloc ${i} (demo) : démo vide`);
    }
    if (b.type === "callout") {
      stats.callout++;
      if (b.tone && !ALLOWED_TONES.has(b.tone)) fail(`${where} bloc ${i} : tone « ${b.tone} » inconnu`);
      if (!b.text && !(b.items && b.items.length)) fail(`${where} bloc ${i} (callout) : ni text ni items`);
      checkText(b.text, `${where} bloc ${i} callout.text`, false);
      checkText(b.title, `${where} bloc ${i} callout.title`, false);
    }
    if (b.type === "list" && !Array.isArray(b.items)) fail(`${where} bloc ${i} (list) : items manquant`);
    if (b.type === "table" && (!Array.isArray(b.head) || !Array.isArray(b.rows))) fail(`${where} bloc ${i} (table) : head/rows manquant`);
    if (b.type === "steps" || b.type === "keyterms") {
      if (!Array.isArray(b.items) || !b.items.length) fail(`${where} bloc ${i} (${b.type}) : items manquant`);
      else b.items.forEach((it, k) => {
        if (!it || (!it.text && !it.def)) fail(`${where} bloc ${i} ${b.type} ${k} : item incomplet`);
      });
    }
    if (b.type === "compare") {
      if (!b.left || !b.right) fail(`${where} bloc ${i} (compare) : left/right manquant`);
    }
    if (["p", "lead", "h"].includes(b.type)) checkText(b.text, `${where} bloc ${i} (${b.type}).text`);
    if (b.type === "checklist" && (!Array.isArray(b.items) || !b.items.length)) fail(`${where} bloc ${i} : checklist vide`);
  });
  return stats;
}

function checkExercises(list, where, requireMin) {
  if (!Array.isArray(list) || list.length < requireMin) {
    fail(`${where} : ${requireMin} exercices minimum attendus, ${Array.isArray(list) ? list.length : 0} trouvés`);
    return 0;
  }
  list.forEach((ex, i) => {
    const w = `${where} exercice ${i} (${ex && ex.id})`;
    if (!ex || typeof ex !== "object") { fail(`${w} invalide`); return; }
    checkId(ex.id, w);
    checkText(ex.title, w + ".title");
    checkText(ex.goal, w + ".goal");
    checkText(ex.hint, w + ".hint");
    if (![1, 2, 3].includes(ex.difficulty)) fail(`${w} : difficulty doit valoir 1, 2 ou 3`);
    if (!Array.isArray(ex.instructions) || !ex.instructions.length) fail(`${w} : instructions manquantes`);
    if (!Array.isArray(ex.checklist) || !ex.checklist.length) fail(`${w} : checklist manquante`);
    if (!Array.isArray(ex.checks) || !ex.checks.length) fail(`${w} : checks manquants`);
    else ex.checks.forEach((c, k) => {
      if (typeof c !== "string" || !c.trim()) fail(`${w} : check ${k} n'est pas une expression`);
      else {
        try { new Function("document", "win", "getText", "getAttr", "style", "countOf", '"use strict"; return (' + c + ");"); }
        catch (e) { fail(`${w} : check ${k} ne compile pas (${e.message})`); }
      }
    });
    for (const key of ["starter", "solution"]) {
      const c = ex[key];
      if (!c || typeof c !== "object") { fail(`${w}.${key} manquant`); continue; }
      if (!["html", "css", "js"].every((k) => typeof (c[k] ?? "") === "string")) fail(`${w}.${key} : champs html/css/js attendus`);
      if (![c.html, c.css, c.js].some((v) => v && String(v).trim())) fail(`${w}.${key} : contenu vide`);
    }
    if (ex.solution && ex.starter && JSON.stringify(ex.starter) === JSON.stringify(ex.solution)) {
      warn(`${w} : starter identique à la solution`);
    }
  });
  return list.length;
}

for (const m of modules) {
  console.log(`\n— Module ${m.number} : ${m.title} (${m.id})`);
  if (!["html", "css", "js"].includes(m.id)) fail(`module id doit être html/css/js, reçu « ${m.id} »`);
  checkText(m.title, `${m.id}.title`);
  checkText(m.subtitle, `${m.id}.subtitle`, false);
  if (!Array.isArray(m.goals) || m.goals.length < 3) fail(`${m.id} : 3 objectifs minimum`);
  if (!Array.isArray(m.lessons) || m.lessons.length < 8) fail(`${m.id} : 8 leçons minimum`);

  (m.lessons || []).forEach((l, i) => {
    const w = `${m.id} leçon ${i} (${l && l.id})`;
    checkId(l.id, w);
    checkText(l.title, w + ".title");
    checkText(l.summary, w + ".summary");
    if (!Array.isArray(l.objectives) || !l.objectives.length) fail(`${w} : objectives manquants`);
    if (typeof l.minutes !== "number") warn(`${w} : minutes absent`);
    const stats = checkBlocks(l.content, w);
    // Le module JavaScript explique ses exemples en texte rédigé : aucun bloc code exigé.
    if (m.id !== "js" && stats.code < 2) fail(`${w} : 2 blocs code minimum (${stats.code})`);
    if (m.id === "js" && stats.code > 0) warn(`${w} : bloc code dans le module JS (texte attendu)`);
    if (stats.callout < 1) warn(`${w} : aucun callout`);
    const exCount = checkExercises(l.exercises || [], w, 2);
    totalExercises += exCount;
    totalLessons++;
  });

  const quiz = m.quiz || {};
  const questions = quiz.questions || [];
  if (questions.length < 10) fail(`${m.id} : 10 questions de quiz minimum (${questions.length})`);
  if (typeof quiz.pass !== "number" || quiz.pass <= 0 || quiz.pass > 1) fail(`${m.id} : quiz.pass doit être entre 0 et 1`);
  questions.forEach((q, i) => {
    const w = `${m.id} question ${i + 1}`;
    checkText(q.q, w + ".q");
    if (!Array.isArray(q.options) || q.options.length < 3) fail(`${w} : 3 options minimum`);
    if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= (q.options || []).length) fail(`${w} : answer invalide`);
    checkText(q.explain, w + ".explain", false);
    const dup = new Set(q.options || []);
    if (dup.size !== (q.options || []).length) fail(`${w} : options dupliquées`);
  });
  totalQuestions += questions.length;
  console.log(`  leçons ${(m.lessons || []).length} · exercices ${(m.lessons || []).reduce((n, l) => n + (l.exercises || []).length, 0)} · quiz ${questions.length}`);
}

console.log("\n— Projet final");
if (!project) {
  fail("COURSE_PROJECT absent");
} else {
  checkText(project.title, "project.title");
  if (!Array.isArray(project.steps) || project.steps.length < 5) fail("project : 5 étapes minimum");
  (project.steps || []).forEach((s, i) => {
    const w = `étape ${i + 1} (${s.id})`;
    checkId(s.id, w);
    checkText(s.title, w + ".title");
    if (!Array.isArray(s.instructions) || !s.instructions.length) fail(`${w} : instructions manquantes`);
    if (!["html", "css", "js", "final"].includes(s.focus)) fail(`${w} : focus inconnu « ${s.focus} »`);
    if (!s.starter || !s.solution) fail(`${w} : starter/solution manquant`);
    (s.checks || []).forEach((c, k) => {
      try { new Function("document", "win", "getText", "getAttr", "style", "countOf", '"use strict"; return (' + c + ");"); }
      catch (e) { fail(`${w} : check ${k} ne compile pas (${e.message})`); }
    });
  });
  if (!project.final) fail("project.final manquant");
  console.log(`  étapes ${(project.steps || []).length}`);
}

console.log("\n— Guide d'utilisation");
const guide = sandbox.window.COURSE_GUIDE;
if (!guide) {
  fail("COURSE_GUIDE absent (content/guide.js)");
} else {
  checkText(guide.title, "guide.title");
  if (!Array.isArray(guide.sections) || guide.sections.length < 5) fail("guide : 5 sections minimum");
  (guide.sections || []).forEach((section, i) => {
    const w = `guide section ${i + 1} (${section.id})`;
    checkId(section.id, w);
    checkText(section.title, w + ".title");
    checkBlocks(section.blocks, w);
  });
  console.log(`  sections ${(guide.sections || []).length}`);
}

console.log("\n=== Résumé ===");
console.log(`modules        : ${modules.length}`);
console.log(`leçons         : ${totalLessons}`);
console.log(`exercices      : ${totalExercises}`);
console.log(`questions quiz : ${totalQuestions}`);
console.log(`problèmes      : ${problems}`);
console.log(`avertissements : ${warnings}`);
process.exit(problems ? 1 : 0);
