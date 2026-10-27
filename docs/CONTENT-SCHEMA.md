# Schéma de contenu — Formation Web (HTML / CSS / JavaScript)

Document **normative** : toute personne (humaine ou IA) qui rédige un fichier `content/*.js`
DOIT respecter exactement ce schéma. L'application (`assets/js/*`) est le moteur de rendu ;
elle ne tolère aucun champ inconnu dans les blocs et ignore les champs inconnus au niveau
lesson/exercice — mais un bloc invalide **casse le rendu de la leçon**, donc la conformité est
obligatoire.

---

## 0. Règles générales

1. **Langue** : tout le contenu est rédigé en **français** (français de France / Afrique
   francophone), ton pédagogique, direct, pas de blabla.
2. **Fichiers** : un fichier par module.
   - `content/module-html.js` → `window.COURSE_MODULES.push({ id: "html", ... })`
   - `content/module-css.js` → `window.COURSE_MODULES.push({ id: "css", ... })`
   - `content/module-js.js` → `window.COURSE_MODULES.push({ id: "js", ... })`
   - `content/project.js` → `window.COURSE_PROJECT = { ... }`
   Chaque fichier commence par `window.COURSE_MODULES = window.COURSE_MODULES || [];`
   (sauf `project.js`).
3. **Pas de HTML brut** dans les champs `text`, `title`, `summary`, `goal`, `instructions`,
   `items`, `q`, `options`, `explain`, `hint`, `def`, `caption`. Le texte accepte uniquement
   le **markdown en ligne** suivant :
   `**gras**`, `*italique*`, `` `code` ``, `[libellé](https://url)`, et `==surligné==`.
   Tout le reste est affiché littéralement (les `<` `>` sont échappés par le moteur).
4. **JS valide obligatoire** : `node --check content/module-XX.js` doit passer sans erreur.
   Aucune dépendance, aucun `import`, aucun `require`, aucun `fetch`. On écrit uniquement des
   objets littéraux + `window.…push(...)`.
5. **Chaînes** : utiliser de préférence les guillemets doubles `"..."` à l'extérieur et les
   simples `'...'` à l'intérieur ; les sauts de ligne dans un champ `code` sont des `\n`
   réels (template literal ou `["a","b"].join("\n")` interdit : écrire du vrai JS multi-lignes
   avec `\n` échappés dans une chaîne simple, ou des template literals `` ` `` — les deux sont
   autorisés, mais **jamais de backtick non fermé** et **jamais de `${` accidentel** :
   dans un template literal, `\${` est nécessaire si le contenu affiche `${`).
6. **Identifiants** : `lesson.id` et `exercise.id` sont **uniques dans toute l'application**.
   Convention imposée :
   - leçons : `html-01` … `html-10`, `css-01` … `css-12`, `js-01` … `js-14` (zéro de tête si < 10) ;
   - exercices : `html-ex-01` … (numérotation continue sur tout le module).
7. **Progression pédagogique** : à l'intérieur d'un module, les leçons sont ordonnées du plus
   simple au plus complexe ; chaque leçon contient **au moins 2 exercices** dont la difficulté
   croît (1 → 2 → 3). Aucun exercice ne doit pouvoir être réussi sans avoir lu la leçon
   correspondante.
8. **Cohérence solution ↔ checks** : voir §6. **C'est la partie la plus fragile : les checks
   doivent être vrais pour la `solution` fournie**, et faux pour le `starter`.

---

## 1. Objet Module

```js
{
  id: "html",                 // "html" | "css" | "js"  (imposé)
  number: 1,                  // 1 | 2 | 3 (imposé)
  title: "HTML — la structure du Web",
  subtitle: "Poser des fondations solides et accessibles",
  accent: "#e34f26",          // couleur d'accent (HTML #e34f26, CSS #264de4, JS #f0db4f)
  icon: "markup",             // "markup" | "palette" | "code"  (icône SVG du moteur)
  level: "Débutant → Intermédiaire",
  hours: 10,                  // nombre (heures estimées)
  description: "Texte de présentation (markdown en ligne).",
  goals: [                    // 4 à 6 objectifs de module, une phrase chacun
    "Lire et écrire un document HTML valide du premier coup",
    "…"
  ],
  lessons: [ /* voir §2 — 8 à 12 leçons */ ],
  quiz: { /* voir §5 */ }
}
```

## 2. Objet Lesson

```js
{
  id: "html-01",
  title: "Anatomie d'un document HTML",
  minutes: 25,                          // durée estimée de lecture + exercices
  summary: "Une phrase qui résume ce que l'apprenant saura faire.",
  objectives: [                         // 2 à 4 puces « à la fin, vous saurez »
    "Identifier les balises `<!DOCTYPE>`, `<html>`, `<head>` et `<body>`",
    "…"
  ],
  content: [ /* §3 — 6 à 14 blocs, au moins 1 bloc code et 1 bloc callout */ ],
  exercises: [ /* §6 — 2 à 4 exercices, difficulté croissante */ ]
}
```

## 3. Blocs de contenu (`lesson.content`)

Tableau de blocs. Types autorisés **uniquement** :

| `type` | Champs | Rendu |
|---|---|---|
| `"p"` | `text` | paragraphe |
| `"lead"` | `text` | paragraphe d'introduction, plus gros |
| `"h"` | `level` (2 ou 3), `text` | sous-titre de section |
| `"code"` | `lang` (`"html"`, `"css"`, `"js"`, `"bash"`, `"text"`), `code`, `caption?` | bloc de code coloré + bouton « copier » ; `caption` en markdown en ligne |
| `"list"` | `ordered` (bool), `items` (tableau de strings, 2 à 10) | liste à puces / numérotée |
| `"callout"` | `tone` (`"info"`, `"tip"`, `"warning"`, `"danger"`, `"success"`), `title`, `text`, `items?` (tableau de strings) | encadré pédagogique |
| `"table"` | `head` (tableau de strings), `rows` (tableau de tableaux de strings) | tableau comparatif |
| `"demo"` | `title?`, `height?` (px, défaut 220), `html`, `css`, `js` | **démo vivante** : mini-éditeur + aperçu dans la leçon |
| `"steps"` | `items` (tableau `{ title, text }`) | étapes numérotées verticales |
| `"keyterms"` | `items` (tableau `{ term, def }`) | glossaire de la leçon |
| `"quote"` | `text`, `cite?` | citation |
| `"compare"` | `left` (`{ title, code, lang }`), `right` (`{ title, code, lang }`), `text?` | mauvaise vs bonne pratique, côte à côte |
| `"checklist"` | `items` (tableau de strings) | « avant de continuer, vérifiez que… » |

Exemple minimal correct :

```js
content: [
  { type: "lead", text: "Un document HTML est un **arbre** de balises." },
  { type: "h", level: 2, text: "Le squelette minimal" },
  { type: "p", text: "Tout part de `<!DOCTYPE html>`." },
  { type: "code", lang: "html", code: "<h1>Bonjour</h1>", caption: "Un titre de niveau 1" },
  { type: "callout", tone: "tip", title: "À retenir", text: "Le `body` contient tout ce qui se voit." },
  { type: "demo", title: "Essayez", height: 180, html: "<h1>Salut</h1>", css: "h1{color:tomato}", js: "" }
]
```

## 4. Règles de rédaction des leçons

- Chaque leçon : **≥ 2 blocs `code`**, **≥ 1 `callout`**, **≥ 1 `demo` sur les leçons
  « pratiques »** (une démo tous les 2–3 blocs est un bon rythme).
- Les leçons avancées (formulaires, Flexbox/Grid, responsive, animations, DOM, async/fetch,
  localStorage) **doivent** contenir au moins un `demo`.
- Le contenu doit être **détaillé** : expliquer le *pourquoi*, pas seulement la syntaxe.
  Viser 300 à 700 mots par leçon, du concret, des cas réels.
- Pas de titres « Chapitre 1 » redondants : le titre de section se place via `type:"h"`.
- Terminer chaque leçon par un `callout` de type `tip`/`warning` (piège fréquent) et/ou une
  `checklist` (« vous devez savoir faire… »).

## 5. Quiz de module

```js
quiz: {
  title: "Quiz — HTML",
  pass: 0.75,                     // score minimal (0.75 = 75 %)
  questions: [                    // 10 à 12 questions
    {
      q: "Quelle balise décrit le contenu principal unique de la page ?",
      options: ["<div>", "<main>", "<section>", "<article>"],   // 3 ou 4 options
      answer: 1,                    // index (base 0) de la bonne réponse — OBLIGATOIREMENT valide
      explain: "`<main>` est l'unique zone de contenu principal ; un seul par page."
    }
  ]
}
```

- `answer` est un **nombre** (pas un tableau) et doit être un index existant.
- Les distracteurs doivent être plausibles (pièges classiques).
- L'`explain` est affiché après correction : 1 à 3 phrases, utile.

## 6. Exercice (dans `lesson.exercises`)

```js
{
  id: "html-ex-01",
  title: "Créer votre première page",
  difficulty: 1,                  // 1 = découverte, 2 = application, 3 = défi
  goal: "Une expression courte de l'objectif (markdown en ligne).",
  instructions: [                 // 2 à 6 étapes numérotées, concrètes
    "Créez un titre `h1` contenant le texte Bonjour le monde.",
    "Ajoutez un paragraphe contenant le mot `HTML`."
  ],
  hint: "Une phrase d'indice sans donner la solution.",
  starter: { html: "<h1>À compléter</h1>", css: "", js: "" },   // par défaut dans l'éditeur
  solution: { html: "<h1>Bonjour le monde</h1>\n<p>J'apprends HTML.</p>", css: "", js: "" },
  checks: [                       // 1 à 5 expressions JS → cf. §7
    "!!document.querySelector('h1')",
    "getText('h1').toLowerCase().includes('bonjour')"
  ],
  checklist: [                    // « pour réussir » : 2 à 4 critères lisibles par l'apprenant
    "Un `h1` visible",
    "Un paragraphe avec le mot HTML"
  ]
}
```

Champs **obligatoires** : `id`, `title`, `difficulty`, `goal`, `instructions`, `hint`,
`starter`, `solution`, `checks`, `checklist`. `starter.html` et `solution.html` peuvent être
vides (`""`) pour un exercice purement CSS ou JS, mais jamais **les deux** vides.

## 7. Moteur de vérification des exercices (crucial)

L'apprenant écrit du HTML/CSS/JS dans 3 onglets. L'application reconstruit un document :

```html
<!DOCTYPE html><html><head><style>{{css}}</style></head>
<body>{{html}}<script>{{js}}<\/script></body></html>
```

puis charge ce document dans une `iframe` de prévisualisation et évalue chaque expression de
`checks` dans le contexte de **cette iframe**, avec les variables disponibles :

| Variable | Nature |
|---|---|
| `document` | `document` de la prévisualisation |
| `win` | `window` de la prévisualisation |
| `getText(sel)` | `(document.querySelector(sel)?.textContent || "").trim()` |
| `getAttr(sel, name)` | `document.querySelector(sel)?.getAttribute(name)` |
| `style(sel, prop)` | `win.getComputedStyle(document.querySelector(sel))?.[prop]` (ex. `"flexDirection"`) |
| `countOf(sel)` | `document.querySelectorAll(sel).length` |

Contraintes des checks :
- Renvoyer **une valeur truthy** (`true`, un nombre non nul, une chaîne non vide) quand c'est
  réussi, falsy sinon. Terminer par `!!` pour un booléen propre.
- Expression **synchrone**, sans réseau, sans `console`, sans dépendance au temps
  (sauf `setTimeout` interdit : préférer des vérifications d'attributs/labels).
- Le HTML/code de l'apprenant est rédigé **exactement** par la solution : les checks doivent
  tolérer les variations légitimes (espaces, casse, guillemets, ordre d'attributs, nom de
  classe différent). **Ne jamais** vérifier une classe CSS précise ni une indentation.
  Utiliser de préférence : présence de balise sémantique, texte normalisé
  (`.toLowerCase().includes(...)`), attributs, `style()` pour des valeurs calculées,
  `countOf()` pour des quantités.
- Pour un exercice JS interactif, simuler l'interaction dans l'expression :
  `"(() => { const b = document.querySelector('button'); b && b.click(); return getText('.resultat') === 'Bonjour'; })()"`
  — mais **préférer** un JS écrit pour s'exécuter au chargement, ce qui est plus simple et
  plus fiable : `"getText('#sortie') === '5'"`. **Consigne ferme : les exercices JS doivent
  fonctionner au chargement** (script exécuté une fois), pas nécessiter de clic, sauf si le
  clic est explicitement rendu par la consigne **et** qu'un seul clic suffit.
- La `solution` doit valider **tous** les checks (le code de la solution est l'étalon de
  vérité). Vérifiez mentalement ou via la page de self-test `tools/selftest.html`.

## 8. Projet final (`content/project.js`)

```js
window.COURSE_PROJECT = {
  id: "projet-final",
  title: "Projet final — Portfolio responsive",
  tagline: "Assembler HTML, CSS et JS dans un vrai site moderne.",
  description: "Markdown en ligne.",
  hours: 4,
  skills: ["HTML sémantique", "CSS Grid", "JS DOM", "…"],
  rubric: [ "…" ],                     // 5 à 8 critères de qualité évalués en fin de projet
  steps: [                             // 6 à 10 étapes
    {
      id: "p-1",
      title: "La structure sémantique",
      focus: "html",                   // "html" | "css" | "js" | "final"
      instructions: ["…", "…"],
      starter: { html: "", css: "", js: "" },
      checks: [ "…" ],                 // même moteur que §7 (optionnel mais recommandé)
      solution: { html: "", css: "", js: "" }   // état du projet à la fin de l'étape
    }
  ],
  final: { html: "", css: "", js: "" },          // livrable complet
  downloadName: "portfolio-final"
}
```
