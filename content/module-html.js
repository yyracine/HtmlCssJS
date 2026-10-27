window.COURSE_MODULES = window.COURSE_MODULES || [];

window.COURSE_MODULES.push({
  id: "html",
  number: 1,
  title: "HTML — la structure du Web",
  subtitle: "Poser des fondations solides, sémantiques et accessibles",
  accent: "#e34f26",
  icon: "markup",
  level: "Débutant → Intermédiaire",
  hours: 10,
  description: "Dix leçons pour écrire du HTML propre et durable : chaque balise est expliquée par le *pourquoi*, chaque notion est suivie d'une démo à manipuler et d'exercices corrigés. Le module se termine par une page profil complète, validée et prête à publier.",
  goals: [
    "Écrire un document HTML valide, du `<!DOCTYPE html>` jusqu'à la fermeture du `body`",
    "Choisir la balise qui exprime le **sens** du contenu plutôt que son apparence",
    "Construire des liens, des images et des formulaires utilisables au clavier et au lecteur d'écran",
    "Structurer une page avec les repères sémantiques (`header`, `nav`, `main`, `article`, `footer`)",
    "Intégrer médias et SVG sans plomber les performances ni l'accessibilité",
    "Poser un socle de référencement technique : titres, métadonnées, données structurées"
  ],
  lessons: [
    {
      id: "html-01",
      title: "Anatomie d'un document HTML",
      minutes: 30,
      summary: "Savoir de quoi est fait un document HTML, où placer ses métadonnées et comment le navigateur le transforme en arbre.",
      objectives: [
        "Reconnaître `<!DOCTYPE html>`, `<html>`, `<head>` et `<body>` et expliquer le rôle de chacun",
        "Placer les métadonnées indispensables : charset, viewport, title, description, favicon",
        "Lire un document sous forme d'arbre (DOM) et localiser n'importe quel élément",
        "Commenter un document sans casser le rendu"
      ],
      content: [
        {
          type: "lead",
          text: "Un document HTML n'est pas une suite de lignes : c'est un **arbre**. Avant de styler quoi que ce soit, il faut savoir où chaque chose se place — et surtout *pourquoi*."
        },
        { type: "h", level: 2, text: "Le squelette minimal" },
        {
          type: "code",
          lang: "html",
          caption: "Le plus petit document HTML complet et valide.",
          code: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ma première page</title>
    <meta name="description" content="Un exemple de document HTML minimal, commenté ligne par ligne.">
  </head>
  <body>
    <h1>Bonjour</h1>
    <p>Ce texte est visible dans le navigateur.</p>
  </body>
</html>`
        },
        {
          type: "table",
          head: ["Ligne", "Rôle exact"],
          rows: [
            ["`<!DOCTYPE html>`", "Annonce un document HTML moderne. Sans lui, le navigateur bascule en **mode quirks**, un mode de compatibilité avec les pages des années 90 : les largeurs et les marges sont alors calculées à l'ancienne."],
            ["`<html lang='fr'>`", "Racine de l'arbre. L'attribut `lang` déclare la langue du texte : les lecteurs d'écran choisissent la bonne prononciation et les traducteurs automatiques la bonne cible."],
            ["`<head>`", "Métadonnées invisibles : encodage, titre d'onglet, description, icône, feuilles de style."],
            ["`<body>`", "Tout ce que l'utilisateur voit et manipule : titres, paragraphes, images, formulaires."]
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "Le doctype n'est pas décoratif",
          text: "C'est la toute première ligne du fichier, avant `<html>`, sans espace ni commentaire devant. Si vous l'oubliez, votre CSS se comporte bizarrement sur les éléments anciens (`table`, `img`) et vous chercherez l'erreur pendant des heures.",
          items: [
            "Un seul `<!DOCTYPE html>` par document",
            "En majuscules ou minuscules, mais toujours en premier",
            "Il n'a ni balise fermante ni attribut"
          ]
        },
        { type: "h", level: 2, text: "`head` : ce qui ne s'affiche pas mais compte" },
        {
          type: "p",
          text: "Le `head` est invisible, donc souvent négligé : c'est pourtant lui qui décide de l'apparence de la page dans les résultats de recherche, dans les partages sur les réseaux sociaux et sur mobile. Quatre métadonnées suffisent à rendre un document propre : `charset` (l'encodage doit être déclaré dans les 1024 premiers octets, sinon les accents deviennent des hiéroglyphes), `viewport` (sans lui, un téléphone affiche le site comme une miniature de bureau), `title` (le nom de l'onglet, unique et descriptif) et `description` (les deux phrases que Google affiche sous le lien)."
        },
        {
          type: "code",
          lang: "html",
          caption: "Un `head` de vraie page, avec favicon et feuille de style.",
          code: `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Camille Diallo — Développeuse front-end à Dakar</title>
  <meta name="description" content="Portfolio de Camille Diallo : sites accessibles et rapides en HTML, CSS et JavaScript.">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
</head>`
        },
        {
          type: "demo",
          title: "Le `head` est invisible, le `body` ne l'est pas",
          height: 230,
          html: `<h1>Une page minuscule</h1>
<p>Ce paragraphe est dans le <strong>body</strong> : il est rendu à l'écran.</p>
<p id="mesure"></p>`,
          css: `body{font-family:system-ui,-apple-system,sans-serif;margin:0;padding:18px;color:#16202b;background:#faf7f4}
h1{margin:0 0 8px;font-size:22px;color:#e34f26}
p{margin:0 0 10px;line-height:1.5}
#mesure{font-weight:600;color:#0f6b4f}`,
          js: `const n = document.body.querySelectorAll('*:not(script)').length;
document.getElementById('mesure').textContent = 'Le body contient ' + n + ' éléments visibles.';`
        },
        { type: "h", level: 2, text: "L'arbre DOM : votre carte de navigation" },
        {
          type: "p",
          text: "Le navigateur lit le fichier et construit un arbre d'objets, le **DOM** (Document Object Model). Chaque balise devient un *nœud* : `html` est le parent de `head` et de `body`, `h1` et `p` sont frères. Les commentaires sont eux aussi des nœuds, simplement ignorés à l'affichage. C'est cette position dans l'arbre que vous ciblerez en CSS et en JavaScript (`document.querySelector`) ; une structure plate et prévisible vaut donc mieux qu'un empilement de `div` au hasard."
        },
        {
          type: "code",
          lang: "text",
          caption: "L'arbre réellement construit par le navigateur pour le document ci-dessus.",
          code: `document
└── html            (lang="fr")
    ├── head
    │   ├── meta     (charset="utf-8")
    │   ├── title    → "Ma première page"
    │   └── commentaire → " feuille de style à venir "
    └── body
        ├── h1       → "Bonjour"
        └── p        → "Ce texte est visible..."  `
        },
        {
          type: "keyterms",
          items: [
            { term: "Balise", def: "Le mot entre chevrons : `<p>`. Elle ouvre ou ferme un élément avec `/`." },
            { term: "Élément", def: "L'ensemble balise ouvrante + contenu + balise fermante." },
            { term: "Attribut", def: "Une information ajoutée dans la balise ouvrante : `lang`, `href`, `class`." },
            { term: "Élément vide", def: "Une balise sans contenu ni fermeture : `<meta>`, `<img>`, `<br>`, `<hr>`, `<link>`." },
            { term: "DOM", def: "L'arbre d'objets construit par le navigateur à partir du fichier HTML." }
          ]
        },
        {
          type: "checklist",
          items: [
            "Mon fichier commence par `<!DOCTYPE html>`",
            "`<html>` porte un attribut `lang` correct",
            "Le `head` contient `charset`, `viewport`, `title` et une `description`",
            "Tout le contenu visible est dans le `body`",
            "Je sais dire combien d'enfants directs possède mon `body`"
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-01",
          title: "Créer une page minimale",
          difficulty: 1,
          goal: "Produire une page visible avec un titre, un paragraphe et un commentaire bien formé.",
          instructions: [
            "Remplacez le titre par le texte « Mon premier document ».",
            "Ajoutez un paragraphe qui contient le mot HTML.",
            "Ajoutez au-dessus du titre un commentaire HTML dont le texte est « en-tête de la page »."
          ],
          hint: "Un commentaire s'ouvre par `<!--` et se ferme par `-->` ; il n'apparaît jamais dans l'aperçu, mais reste présent dans le code.",
          starter: { html: `<h1>À compléter</h1>`, css: "", js: "" },
          solution: {
            html: `<!-- en-tête de la page -->
<h1>Mon premier document</h1>
<p>J'apprends le HTML et je construis ma première page.</p>`,
            css: "",
            js: ""
          },
          checks: [
            `getText('h1').toLowerCase().includes('mon premier document')`,
            `!!document.querySelector('p') && getText('p').toLowerCase().includes('html')`,
            `document.body.innerHTML.toLowerCase().includes('en-tête de la page')`
          ],
          checklist: [
            "Un `h1` visible avec le bon texte",
            "Un paragraphe contenant le mot HTML",
            "Un commentaire HTML présent dans le code source"
          ]
        },
        {
          id: "html-ex-02",
          title: "Imbriquer proprement un arbre",
          difficulty: 2,
          goal: "Construire une structure imbriquée dont chaque élément est à sa place dans l'arbre.",
          instructions: [
            "Créez un `header` qui contient un `h1` dont le texte est « Blog de cuisine ».",
            "Ajoutez un `main` contenant deux paragraphes : le premier parle de recettes, le second d'astuces.",
            "Placez un commentaire « contenu principal » juste avant la balise `main`."
          ],
          hint: "Un élément enfant s'écrit **entre** la balise ouvrante et la balise fermante du parent ; `document.querySelector('main p')` ne trouve qu'un paragraphe réellement placé dans `main`.",
          starter: {
            html: `<header>
  <h1>Blog de cuisine</h1>
</header>
<p>Mes recettes préférées.</p>
<p>Mes astuces de cuisson.</p>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<header>
  <h1>Blog de cuisine</h1>
</header>
<!-- contenu principal -->
<main>
  <p>Mes recettes de saison, faciles et rapides.</p>
  <p>Mes astuces pour ne plus rater une cuisson.</p>
</main>`,
            css: "",
            js: ""
          },
          checks: [
            `!!document.querySelector('header > h1')`,
            `countOf('main') === 1 && countOf('main > p') === 2`,
            `countOf('body > p') === 0`,
            `document.body.innerHTML.toLowerCase().includes('contenu principal')`
          ],
          checklist: [
            "Le `h1` est un enfant direct du `header`",
            "Les deux paragraphes sont dans le `main`",
            "Aucun paragraphe ne traîne directement dans le `body`",
            "Le commentaire est présent"
          ]
        }
      ]
    },
    {
      id: "html-02",
      title: "Texte et sémantique",
      minutes: 35,
      summary: "Choisir la balise qui dit le sens du texte — titres, paragraphes, importance, citations, code — au lieu de la balise qui « a l'air jolie ».",
      objectives: [
        "Construire un plan de titres cohérent avec `h1` à `h6`",
        "Distinguer `strong`/`em` (sens) de `b`/`i` (ton)",
        "Citer, montrer du code et abréger correctement",
        "Écrire les entités HTML indispensables et comprendre l'écrasement des espaces"
      ],
      content: [
        {
          type: "lead",
          text: "En HTML, on ne dit pas « mets-le en gras » : on dit **« ceci est important »**. Le style viendra plus tard, avec le CSS. Une balise mal choisie n'est pas une faute de goût, c'est une information perdue pour les lecteurs d'écran et les moteurs de recherche."
        },
        { type: "h", level: 2, text: "Titres : une hiérarchie, pas une taille" },
        {
          type: "p",
          text: "`h1` à `h6` forment le **plan** du document, comme la table des matières d'un livre : un `h1` (le sujet de la page), des `h2` (les grandes parties), des `h3` (les sous-parties). La taille affichée n'a aucune importance : si un `h2` vous paraît trop gros, c'est le CSS qui doit changer, pas la balise. Un lecteur d'écran peut ainsi annoncer la liste des titres et naviguer de section en section ; un moteur de recherche y voit la structure du contenu."
        },
        {
          type: "code",
          lang: "html",
          caption: "Un plan de titres lisible : chaque niveau dépend du précédent.",
          code: `<h1>Rapport annuel 2024</h1>

<h2>Ventes</h2>
<p>Le chiffre d'affaires progresse de 12 %.</p>

<h3>Ventes en ligne</h3>
<p>Elles représentent 62 % du total.</p>

<h3>Boutiques physiques</h3>
<p>Trois ouvertures, aucune fermeture.</p>

<h2>Perspectives</h2>
<p>Objectif : 15 % de croissance en 2025.</p>`
        },
        {
          type: "callout",
          tone: "danger",
          title: "Ne sautez pas de niveaux",
          text: "Un `h4` juste après un `h2` casse le plan : le lecteur d'écran annonce un niveau manquant et le contenu semble appartenir à une section qui n'existe pas. Un `h1` par page suffit dans 99 % des cas (le nom du site va dans le `header`, pas dans un second `h1`).",
          items: [
            "Interdit : `h1` → `h3`, ou `h2` → `h4`",
            "Le choix du niveau se fait par le sens, jamais parce que le rendu est plus petit",
            "Une section sans titre n'a pas besoin d'un titre « décoratif »"
          ]
        },
        { type: "h", level: 2, text: "Paragraphes, espaces et sauts de ligne" },
        {
          type: "compare",
          left: {
            title: "À éviter — `br` comme espaceur",
            lang: "html",
            code: `<p>
  Emportez de l'eau.<br><br><br>
  Et une carte.
</p>`
          },
          right: {
            title: "À faire — deux paragraphes",
            lang: "html",
            code: `<p>Emportez de l'eau.</p>
<p>Et une carte.</p>`
          },
          text: "Le navigateur **écrase** les espaces multiples et les retours à la ligne du fichier source : trois espaces ou trois retours ne produisent qu'un seul espace à l'écran. La séparation des blocs de texte se fait avec `p`. `<br>` ne sert qu'à un retour à la ligne *à l'intérieur* d'un bloc (une adresse, un poème) et n'a **jamais** de balise fermante. Si vous voulez un espace que le navigateur ne coupera pas en fin de ligne, utilisez l'entité `&nbsp;`."
        },
        { type: "h", level: 2, text: "`strong`, `em`, `b`, `i` : du sens, pas du style" },
        {
          type: "table",
          head: ["Balise", "Signification", "Quand l'utiliser"],
          rows: [
            ["`strong`", "Importance forte", "Une information critique : « le paiement est **obligatoire** »."],
            ["`em`", "Emphase insistée", "Un mot dont l'insistance change le sens : « je ne l'ai *pas* dit »."],
            ["`b`", "Attire l'œil, sans importance particulière", "Un nom de produit dans un comparatif."],
            ["`i`", "Terme technique, étranger, pensée", "Un mot latin, un titre d'œuvre, une pensée intérieure."]
          ]
        },
        {
          type: "demo",
          title: "La sémantique se voit (et les entités s'affichent)",
          height: 280,
          html: `<h2>Le sens avant le style</h2>
<p><strong>Important :</strong> l'<em>emphase</em> change le sens de la phrase.</p>
<p>Du <abbr title="HyperText Markup Language">HTML</abbr> correct, c'est <code>&lt;h1&gt;</code> puis <kbd>Ctrl</kbd> + <kbd>S</kbd>.</p>
<p>&eacute;crit avec l'entité, on obtient&nbsp;: écrit. Et 2024 &copy; pour l'esperluette&nbsp;: &amp;</p>
<hr>
<p class="note">Ici, seul le CSS change l'apparence : aucune balise n'a été choisie pour sa couleur.</p>`,
          css: `body{font-family:system-ui,-apple-system,sans-serif;margin:0;padding:16px;color:#16202b;background:#fffdfa;line-height:1.6}
h2{font-size:18px;margin:0 0 10px;color:#e34f26}
p{margin:0 0 10px}
strong{color:#b3261e}
em{font-style:italic;text-decoration:underline wavy #e34f26;text-underline-offset:3px}
abbr{text-decoration:underline dotted;cursor:help}
code{background:#f1ece7;padding:2px 5px;border-radius:4px;font-family:ui-monospace,Consolas,monospace;font-size:13px}
kbd{border:1px solid #c9c0b7;border-bottom-width:2px;border-radius:4px;padding:1px 6px;background:#f7f2ec;font-family:ui-monospace,monospace;font-size:12px}
hr{border:0;border-top:1px dashed #c9c0b7;margin:14px 0}
.note{color:#5b6672;font-size:13px}`,
          js: ``
        },
        { type: "h", level: 2, text: "Citations, code, abréviations et entités" },
        {
          type: "code",
          lang: "html",
          caption: "Les balises de texte que vous utiliserez tous les jours.",
          code: `<!-- citation longue : blockquote + source -->
<blockquote>
  <p>Le HTML décrit le sens, le CSS décrit l'apparence.</p>
  <cite>Guide du développeur web</cite>
</blockquote>

<!-- citation courte, dans la phrase -->
<p>Comme le dit l'adage, <q>le contenu d'abord</q>.</p>

<!-- code : pre conserve les espaces et les retours à la ligne -->
<pre><code>git status
git add .
git commit -m "structure de la page"</code></pre>

<!-- code dans une phrase, touche au clavier, sortie de programme, abréviation -->
<p>La balise <code>&lt;main&gt;</code> s'ouvre avec <kbd>Ctrl</kbd> + <kbd>E</kbd>.</p>
<p>Le programme affiche <samp>Erreur : fichier introuvable</samp>.</p>
<p>Le <abbr title="World Wide Web Consortium">W3C</abbr> publie les normes.</p>

<!-- séparateur thématique -->
<hr>`
        },
        {
          type: "callout",
          tone: "info",
          title: "Les entités à connaître par cœur",
          text: "Certains caractères ont une valeur spéciale en HTML : il faut les écrire sous forme d'**entité** pour qu'ils s'affichent tels quels.",
          items: [
            "`&amp;` → une esperluette `&` (indispensable dans un lien contenant `&`)",
            "`&lt;` et `&gt;` → les chevrons, pour afficher du code HTML dans une page",
            "`&nbsp;` → un espace insécable (nombre + unité, `10&nbsp;kg`)",
            "`&copy;` → le symbole © et `&eacute;` → le caractère é accentué",
            "`&quot;` → un guillemet droit, utile dans un texte contenant déjà des guillemets"
          ]
        },
        {
          type: "checklist",
          items: [
            "Mon plan de titres ne saute aucun niveau",
            "Aucun `br` ne sert à espacer des blocs",
            "Je sais dire pourquoi `strong` n'est pas un `b` coloré",
            "Une citation longue est dans `blockquote`, une courte dans `q`",
            "Un bloc de code multi-lignes est dans `pre > code`"
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-03",
          title: "Transformer un texte plat en article structuré",
          difficulty: 1,
          goal: "Remplacer un bloc informe par un titre, deux sections et une mise en importance.",
          instructions: [
            "Transformez la première partie du texte en `h1` : « Randonnée au Sénégal ».",
            "Créez deux titres `h2` : « Préparation » puis « Itinéraire », chacun suivi d'un paragraphe.",
            "Dans le paragraphe de préparation, marquez le mot eau avec `strong`.",
            "Le document final doit contenir exactement deux paragraphes."
          ],
          hint: "`<strong>eau</strong>` met le mot en valeur *et* signale son importance ; un `p` par idée, jamais six phrases entassées.",
          starter: {
            html: `<div>Randonnée au Sénégal — Préparation : emportez de l'eau, une casquette et de bonnes chaussures. Itinéraire : départ de Popenguine, arrivée à la plage de Ndayane.</div>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Randonnée au Sénégal</h1>

<h2>Préparation</h2>
<p>Emportez de l'<strong>eau</strong>, une casquette et de bonnes chaussures.</p>

<h2>Itinéraire</h2>
<p>Départ de Popenguine, arrivée à la plage de Ndayane.</p>`,
            css: "",
            js: ""
          },
          checks: [
            `getText('h1').toLowerCase().includes('randonnée')`,
            `countOf('h2') === 2`,
            `[...document.querySelectorAll('h2')].some(h => h.textContent.toLowerCase().includes('itinéraire'))`,
            `countOf('p') === 2`,
            `!!document.querySelector('strong') && getText('strong').toLowerCase() === 'eau'`
          ],
          checklist: [
            "Un `h1` qui nomme le sujet",
            "Deux `h2` dans l'ordre préparation puis itinéraire",
            "Deux paragraphes, un par section",
            "Le mot eau est dans un `strong`"
          ]
        },
        {
          id: "html-ex-04",
          title: "Citations, code et abréviation",
          difficulty: 2,
          goal: "Utiliser les balises de texte spécialisées : citation, code, clavier, abréviation.",
          instructions: [
            "Ajoutez une `blockquote` contenant une phrase qui parle du sens, suivie d'un `cite` avec le texte « Guide du développeur ».",
            "Ajoutez un bloc `pre` contenant un `code` avec la commande `git status`.",
            "Ajoutez une abréviation `abbr` dont l'attribut `title` vaut « HyperText Markup Language » et dont le texte affiché est « HTML ».",
            "Ajoutez un élément `kbd` contenant « Ctrl + S »."
          ],
          hint: "L'attribut `title` de `abbr` donne la version développée, affichée en info-bulle ; `pre` conserve les espaces et les retours à la ligne, `code` signale qu'il s'agit de code.",
          starter: {
            html: `<h1>Notes de lecture</h1>
<p>Résumé de mes lectures techniques de la semaine.</p>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Notes de lecture</h1>
<p>J'utilise <abbr title="HyperText Markup Language">HTML</abbr> tous les jours.</p>

<blockquote>
  <p>Le HTML décrit le sens, pas l'apparence.</p>
  <cite>Guide du développeur</cite>
</blockquote>

<pre><code>git status</code></pre>

<p>Raccourci de sauvegarde : <kbd>Ctrl + S</kbd></p>`,
            css: "",
            js: ""
          },
          checks: [
            `!!document.querySelector('blockquote') && getText('blockquote').toLowerCase().includes('sens')`,
            `!!document.querySelector('blockquote cite')`,
            `!!document.querySelector('pre code') && getText('pre code').toLowerCase().includes('git status')`,
            `(getAttr('abbr','title') || '').toLowerCase().includes('hypertext')`,
            `!!document.querySelector('kbd') && getText('kbd').toLowerCase().includes('ctrl')`
          ],
          checklist: [
            "La citation est dans `blockquote` avec sa source dans `cite`",
            "La commande est dans `pre > code`",
            "`abbr` porte l'attribut `title` complet",
            "Le raccourci clavier est dans `kbd`"
          ]
        }
      ]
    },
    {
      id: "html-03",
      title: "Liens et images",
      minutes: 35,
      summary: "Écrire des liens qui veulent dire quelque chose, maîtriser les chemins de fichiers et publier des images accessibles et légères.",
      objectives: [
        "Utiliser `href` avec un chemin relatif, absolu, une ancre, `mailto:` ou `tel:`",
        "Choisir un `target` et un `rel` sans casser la sécurité ni l'accessibilité",
        "Écrire un `alt` utile et distinguer image informative et image décorative",
        "Comprendre pourquoi `width`/`height` et `loading` changent l'expérience"
      ],
      content: [
        {
          type: "lead",
          text: "Le Web est un réseau de **liens** et d'**images**. Deux balises, `a` et `img`, qui paraissent simples — et qui concentrent la majorité des erreurs d'accessibilité d'un site."
        },
        { type: "h", level: 2, text: "Anatomie d'un lien" },
        {
          type: "p",
          text: "Un lien se compose d'un `href` (la destination) et d'un **texte de lien** qui doit décrire la destination même sorti de son contexte. « Cliquez ici » ne dit rien : un lecteur d'écran peut lister tous les liens d'une page, et l'utilisateur entend alors une suite de « cliquez ici, cliquez ici ». L'attribut `title` est une info-bulle optionnelle — jamais le seul endroit où se trouve l'information. Pour ouvrir un nouvel onglet, `target='_blank'` doit être accompagné de `rel='noopener noreferrer'` : sans cela, la page ouverte peut manipuler la vôtre via `window.opener`."
        },
        {
          type: "code",
          lang: "html",
          caption: "Les six liens que vous écrirez toute votre vie.",
          code: `<nav>
  <a href="index.html">Accueil</a>
  <a href="contact.html" title="Formulaire de contact">Contact</a>
  <a href="https://developer.mozilla.org/fr/" target="_blank" rel="noopener noreferrer">Documentation MDN</a>
  <a href="mailto:bonjour@exemple.com">Écrire un e-mail</a>
  <a href="tel:+221330000000">Appeler le +221 33 000 00 00</a>
  <a href="tarifs.pdf" download>Télécharger la grille tarifaire</a>
</nav>

<h2 id="tarifs">Tarifs 2025</h2>
<p>Les prix sont indiqués hors taxes.</p>`
        },
        {
          type: "callout",
          tone: "danger",
          title: "Les deux pièges du lien",
          text: "Un lien sans `href` (`<a onclick>`) n'est pas un lien : il ne reçoit pas le focus clavier, n'apparaît pas dans le menu contextuel et ne peut pas être ouvert dans un nouvel onglet. Un `href` vide ou un `href='#'` renvoie en haut de page et casse le bouton « retour » du navigateur : si l'action ne navigue pas, c'est un `<button>` qu'il faut écrire.",
          items: [
            "Texte de lien explicite, jamais « cliquez ici » ni « en savoir plus » seul",
            "`target='_blank'` toujours avec `rel='noopener noreferrer'`",
            "`mailto:` et `tel:` se terminent sans espace parasite"
          ]
        },
        { type: "h", level: 2, text: "Relatif, absolu, ancre" },
        {
          type: "table",
          head: ["Écriture", "Ce que le navigateur demande"],
          rows: [
            ["`profil.html`", "Le fichier se trouve dans **le même dossier** que la page courante (chemin relatif)."],
            ["`pages/profil.html`", "Un sous-dossier `pages` de la page courante (relatif)."],
            ["`../profil.html`", "Le dossier **parent** : un `../` par niveau à remonter (relatif)."],
            ["`/profil.html`", "La **racine du site**, pas la racine du disque dur (absolu au site)."],
            ["`https://exemple.com/profil.html`", "Une adresse complète, indispensable pour un autre site (absolu)."],
            ["`#tarifs`", "Un élément de la page courante portant `id='tarifs'` (ancre interne)."]
          ]
        },
        { type: "h", level: 2, text: "`<img>` : un `alt` qui décrit, un `width` qui stabilise" },
        {
          type: "p",
          text: "`alt` n'est pas un ornement : c'est le **texte qui remplace l'image** quand elle ne peut pas être vue — lecteur d'écran, connexion lente, image décorative. Il décrit la fonction de l'image, pas son fichier : « plage.webp » n'apprend rien. Une image purement décorative reçoit un `alt` **vide** (`alt=\"\"`) pour être ignorée : c'est mieux qu'un `alt` inutile qui fait perdre du temps. `width` et `height` réservent la place avant le chargement et évitent que la page « saute » (le fameux CLS des mesures de performance). `loading='lazy'` reporte le téléchargement des images situées plus bas et `decoding='async'` n'immobilise pas le rendu."
        },
        {
          type: "code",
          lang: "html",
          caption: "Image illustrative légendée, puis image décorative ignorée volontairement.",
          code: `<figure>
  <img src="assets/photos/plage-ndayane.webp"
       alt="Deux pirogues colorées échouées sur le sable de la plage de Ndayane au coucher du soleil"
       width="800" height="533" loading="lazy" decoding="async">
  <figcaption>Plage de Ndayane, Sénégal — photo prise à 18 h.</figcaption>
</figure>

<p>Choisissez votre formule</p>
<img src="assets/motif-points.svg" alt="" width="80" height="80">`
        },
        {
          type: "demo",
          title: "Un SVG inline, une légende, une ancre",
          height: 300,
          html: `<figure>
  <svg viewBox="0 0 120 60" width="220" height="110">
    <rect x="0" y="0" width="40" height="60" fill="#00853f"></rect>
    <rect x="40" y="0" width="40" height="60" fill="#fdef42"></rect>
    <rect x="80" y="0" width="40" height="60" fill="#e31b23"></rect>
    <path d="M60 20l4 12h13l-10 8 4 13-11-8-11 8 4-13-10-8h13z" fill="#00853f"></path>
  </svg>
  <figcaption>Un SVG écrit dans le HTML : net à toutes les tailles, coloriable en CSS.</figcaption>
</figure>
<p><a href="#details">Aller au détail</a></p>
<p id="details">Ce lien vise l'identifiant <code>details</code> : c'est une ancre interne.</p>`,
          css: `body{font-family:system-ui,-apple-system,sans-serif;margin:0;padding:16px;color:#16202b;background:#fffdfa}
figure{margin:0 0 14px;text-align:center}
svg{border:1px solid #ded6cd;border-radius:6px;background:#fff}
figcaption{font-size:13px;color:#5b6672;margin-top:6px}
a{color:#0b6bcb}
a:hover{text-decoration:underline}
#details{font-size:13px;color:#3d4853}`,
          js: ``
        },
        { type: "h", level: 2, text: "Les formats modernes" },
        {
          type: "p",
          text: "Une photo JPEG de 4000 pixels de large pèse plusieurs mégaoctets et s'affiche à 400 pixels : c'est la première cause de site lent. **WebP** réduit le poids de 25 à 35 % par rapport au JPEG pour une qualité équivalente, **AVIF** va plus loin encore sur les dégradés, et **SVG** est le bon format pour les logos et les icônes (vectoriel, minuscule, redimensionnable). Un fichier par usage, et une largeur en pixels réellement utile : les techniques `srcset`/`sizes` et l'élément `picture` qui servent plusieurs formats viennent en leçon 08."
        },
        {
          type: "checklist",
          items: [
            "Chaque lien a un texte qui décrit sa destination",
            "Aucun `href` vide, aucun `#` utilisé comme faux bouton",
            "Chaque `img` a un `alt` : descriptif, vide si décoratif, jamais le nom du fichier",
            "Les images ont `width`, `height` et `loading='lazy'` quand elles sont sous la ligne de flottaison",
            "Je sais dire où pointe `../images/logo.svg`"
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-05",
          title: "Réparer une navigation",
          difficulty: 1,
          goal: "Remplacer des liens vides et des textes inutiles par une navigation claire et complète.",
          instructions: [
            "Le `nav` doit contenir exactement trois liens : vers `index.html`, vers `contact.html` et vers `mailto:bonjour@exemple.com`.",
            "Chaque lien doit avoir un texte explicite d'au moins 6 caractères, jamais « cliquez ici ».",
            "Le lien vers `contact.html` doit porter un attribut `title` valant « Formulaire de contact »."
          ],
          hint: "Le texte placé entre `<a>` et `</a>` est ce que l'utilisateur lit et ce que le lecteur d'écran annonce : écrivez-le comme si le lien était seul sur la page.",
          starter: {
            html: `<nav>
  <a href="#">Cliquez ici</a> pour revenir à l'accueil.
  <a href="#">Cliquez ici</a> pour nous écrire.
</nav>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<nav>
  <a href="index.html">Retour à l'accueil</a>
  <a href="contact.html" title="Formulaire de contact">Nous contacter</a>
  <a href="mailto:bonjour@exemple.com">Écrire un e-mail</a>
</nav>`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('nav a') === 3`,
            `[...document.querySelectorAll('nav a')].every(a => !/cliquez ici/i.test(a.textContent))`,
            `[...document.querySelectorAll('a')].every(a => a.textContent.trim().length >= 6)`,
            `[...document.querySelectorAll('a')].some(a => (a.getAttribute('href') || '').startsWith('mailto:'))`,
            `!!document.querySelector('a[href="contact.html"]') && (getAttr('a[href="contact.html"]','title') || '').toLowerCase().includes('contact')`
          ],
          checklist: [
            "Trois liens seulement, dans le `nav`",
            "Des textes de lien explicites",
            "Une destination `mailto:`",
            "Un attribut `title` sur le lien de contact"
          ]
        },
        {
          id: "html-ex-06",
          title: "Une figure d'image accessible",
          difficulty: 2,
          goal: "Publier une photo informative dans une `figure` légendée, avec un `alt` réellement descriptif et les bons attributs de performance.",
          instructions: [
            "Enveloppez l'image dans une `figure` et ajoutez une `figcaption` contenant « Plage de Ndayane au coucher du soleil ».",
            "Renseignez un attribut `alt` d'au moins 20 caractères qui décrit la scène (interdits : « image », « photo », nom du fichier).",
            "Ajoutez sur l'image `width='800'`, `height='533'` et `loading='lazy'`."
          ],
          hint: "L'attribut `alt` décrit ce que voit une personne qui ne voit pas l'image ; la `figcaption` est visible et s'adresse à tout le monde. Les deux ne doivent pas être identiques.",
          starter: {
            html: `<h1>Mes photos de voyage</h1>
<img src="assets/photos/plage.webp">`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Mes photos de voyage</h1>
<figure>
  <img src="assets/photos/plage.webp"
       alt="Deux pirogues colorées échouées sur le sable de la plage de Ndayane au coucher du soleil"
       width="800" height="533" loading="lazy">
  <figcaption>Plage de Ndayane au coucher du soleil</figcaption>
</figure>`,
            css: "",
            js: ""
          },
          checks: [
            `!!document.querySelector('figure > img')`,
            `!!document.querySelector('figure figcaption') && getText('figure figcaption').toLowerCase().includes('ndayane')`,
            `(getAttr('img','alt') || '').length >= 20`,
            `Number(getAttr('img','width')) === 800 && Number(getAttr('img','height')) === 533`,
            `getAttr('img','loading') === 'lazy'`
          ],
          checklist: [
            "L'image est un enfant direct de `figure`",
            "Une `figcaption` visible nomme le lieu",
            "Un `alt` long et descriptif",
            "Les dimensions et `loading='lazy'` sont renseignés"
          ]
        }
      ]
    },
    {
      id: "html-04",
      title: "Listes et tableaux",
      minutes: 30,
      summary: "Marquer correctement les énumérations et les données en grille, et savoir quand un tableau est la mauvaise réponse.",
      objectives: [
        "Choisir entre `ul`, `ol` et `dl` selon la nature de l'énumération",
        "Imbriquer des listes sans casser la structure",
        "Construire un tableau accessible : `caption`, `thead`/`tbody`/`tfoot`, `th` et `scope`",
        "Reconnaître un tableau de mise en page et le remplacer"
      ],
      content: [
        {
          type: "lead",
          text: "Une liste est une **énumération**, un tableau est une **grille de données**. Confondre les deux, c'est priver le lecteur d'écran du nombre d'éléments, de l'ordre des étapes et du lien entre une cellule et son en-tête."
        },
        { type: "h", level: 2, text: "`ul`, `ol`, `dl` : trois énumérations différentes" },
        {
          type: "p",
          text: "`ul` liste des éléments **sans ordre** (l'ordre n'a pas de sens) ; `ol` liste des éléments **ordonnés** (recette, classement, étapes) ; `dl` associe un **terme** et sa **définition** (glossaire, fiche produit). Dans les trois cas, le contenu de chaque entrée va dans un `li` — sauf dans `dl`, qui utilise `dt` (terme) et `dd` (description). Le navigateur dessine des puces ou des numéros par défaut, mais ce marqueur vient du CSS : on ne remplace donc jamais une liste par des tirets tapés à la main."
        },
        {
          type: "code",
          lang: "html",
          caption: "Trois listes, trois intentions.",
          code: `<h2>Ingrédients</h2>
<ul>
  <li>500 g de riz</li>
  <li>2 oignons</li>
  <li>1 poisson entier</li>
</ul>

<h2>Étapes</h2>
<ol>
  <li>Faire revenir les oignons.</li>
  <li>Ajouter le riz et l'eau.</li>
  <li>Cuire vingt minutes à feu doux.</li>
</ol>

<h2>Glossaire</h2>
<dl>
  <dt>Thiéboudienne</dt>
  <dd>Plat national sénégalais, riz au poisson.</dd>
  <dt>Yassa</dt>
  <dd>Poulet ou poisson mariné au citron et aux oignons.</dd>
</dl>`
        },
        {
          type: "callout",
          tone: "warning",
          title: "Une puce tapée au clavier n'est pas une liste",
          text: "Un menu de navigation est un groupe de liens : il se balise en `ul > li > a`, ce qui permet au lecteur d'écran d'annoncer « liste de 4 éléments ». Des paragraphes commençant par un tiret ou une étoile ne sont qu'une imitation visuelle.",
          items: [
            "Jamais de `<div>` ou de `<p>` pour simuler une puce",
            "`ol` accepte des attributs utiles : `start`, `reversed`",
            "Une liste vide n'a aucune raison d'exister"
          ]
        },
        { type: "h", level: 2, text: "Imbriquer des listes" },
        {
          type: "code",
          lang: "html",
          caption: "La sous-liste se place **dans** le `li` parent, jamais entre deux `li`.",
          code: `<ul>
  <li>
    Front-end
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>
    Back-end
    <ul>
      <li>Node.js</li>
    </ul>
  </li>
</ul>`
        },
        {
          type: "demo",
          title: "Listes imbriquées et petite grille de données",
          height: 380,
          html: `<h2>Courses de la semaine</h2>
<ul class="courses">
  <li>Riz</li>
  <li>Oignons
    <ul>
      <li>rouges</li>
      <li>blancs</li>
    </ul>
  </li>
</ul>
<table>
  <caption>Budget prévisionnel</caption>
  <thead>
    <tr><th scope="col">Produit</th><th scope="col">Prix</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Riz</th><td>5 000 F</td></tr>
    <tr><th scope="row">Oignons</th><td>1 200 F</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">Total</th><td>6 200 F</td></tr>
  </tfoot>
</table>`,
          css: `body{font-family:system-ui,-apple-system,sans-serif;margin:0;padding:16px;color:#16202b;background:#fffdfa;font-size:14px}
h2{font-size:16px;margin:0 0 8px;color:#e34f26}
ul{margin:0 0 16px;padding-left:22px}
li{margin:2px 0}
ul ul{padding-left:18px;color:#5b6672}
table{border-collapse:collapse;width:100%;font-size:13px}
caption{text-align:left;font-weight:600;padding-bottom:6px;color:#3d4853}
th,td{border:1px solid #ded6cd;padding:6px 8px;text-align:left}
thead th{background:#fdf1ea;color:#a63a15}
tfoot th,tfoot td{background:#f7f2ec;font-weight:600}`,
          js: ``
        },
        { type: "h", level: 2, text: "Un tableau qui se lit tout seul" },
        {
          type: "p",
          text: "Un tableau de données doit répondre à trois questions : *de quoi parle-t-il* (`caption`), *quelle est la ligne d'en-tête* (`thead` + `th`), et *comment lire une cellule* (`scope`). Avec `scope='col'`, un lecteur d'écran annonce « Mathématiques » avant la note ; avec `scope='row'`, il annonce le nom de l'élève. Sans ces indications, il énumère des nombres sans contexte. `tfoot` regroupe les totaux, `tbody` les données, et `colspan`/`rowspan` fusionnent des cellules — à utiliser avec parcimonie, car chaque fusion complique la lecture orale du tableau."
        },
        {
          type: "code",
          lang: "html",
          caption: "Le tableau type : légende, en-têtes explicites, corps et pied.",
          code: `<table>
  <caption>Notes du trimestre — 3e A</caption>
  <thead>
    <tr>
      <th scope="col">Élève</th>
      <th scope="col">Mathématiques</th>
      <th scope="col">Français</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Awa Ndiaye</th>
      <td>15</td>
      <td>14</td>
    </tr>
    <tr>
      <th scope="row">Moussa Ba</th>
      <td>12</td>
      <td>16</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Moyenne</th>
      <td>13,5</td>
      <td>15</td>
    </tr>
  </tfoot>
</table>`
        },
        {
          type: "callout",
          tone: "danger",
          title: "Un tableau n'est pas une mise en page",
          text: "Avant 2005, on découpait les pages en tableaux invisibles. Aujourd'hui, c'est une double faute : le code devient illisible, et l'ensemble est annoncé comme un tableau de données (« ligne 1, colonne 2 ») alors qu'il n'en est rien. La mise en page appartient au CSS : Flexbox et Grid feront ce travail en module 2.",
          items: [
            "Tableau = données qui entretiennent une relation ligne/colonne",
            "Jamais `<table>` pour aligner une carte ou un formulaire",
            "Pas de tableau sans `th` : sinon ce n'est pas un tableau de données"
          ]
        },
        {
          type: "checklist",
          items: [
            "Chaque élément d'une liste est dans un `li`",
            "Mon tableau a une `caption` et un `thead`",
            "Chaque `th` porte un `scope` cohérent",
            "Aucun `table` ne sert à positionner des éléments",
            "Je sais expliquer la différence entre `ul` et `ol`"
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-07",
          title: "Recette en trois listes",
          difficulty: 1,
          goal: "Transformer un paragraphe fourre-tout en liste à puces, liste ordonnée et liste de définitions.",
          instructions: [
            "Remplacez le paragraphe par une liste `ul` contenant trois ingrédients (trois `li`).",
            "Ajoutez ensuite une liste `ol` de trois étapes dont la première contient le mot « mariner ».",
            "Ajoutez une liste `dl` avec deux termes (`dt`) et deux définitions (`dd`)."
          ],
          hint: "Un `li` par élément ; dans une `dl`, l'ordre compte : le `dt` vient toujours juste avant son `dd`.",
          starter: {
            html: `<h1>Yassa au poulet</h1>
<p>Ingrédients : poulet, oignons, citron, riz. Étapes : mariner, cuire, servir. Vocabulaire : yassa, marinade.</p>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Yassa au poulet</h1>

<h2>Ingrédients</h2>
<ul>
  <li>1 poulet fermier</li>
  <li>4 oignons</li>
  <li>2 citrons</li>
</ul>

<h2>Étapes</h2>
<ol>
  <li>Mariner le poulet au citron et aux oignons.</li>
  <li>Cuire les oignons à feu doux.</li>
  <li>Servir avec du riz blanc.</li>
</ol>

<h2>Vocabulaire</h2>
<dl>
  <dt>Yassa</dt>
  <dd>Plat sénégalais à base d'oignons et de citron.</dd>
  <dt>Marinade</dt>
  <dd>Mélange dans lequel on laisse reposer la viande.</dd>
</dl>`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('ul > li') === 3`,
            `countOf('ol > li') === 3`,
            `getText('ol > li').toLowerCase().includes('mariner')`,
            `countOf('dl dt') === 2 && countOf('dl dd') === 2`
          ],
          checklist: [
            "Trois ingrédients dans un `ul`",
            "Trois étapes dans un `ol`, la première sur la marinade",
            "Deux `dt` et deux `dd` dans une `dl`"
          ]
        },
        {
          id: "html-ex-08",
          title: "Un tableau de notes accessible",
          difficulty: 2,
          goal: "Rendre un tableau brut lisible par un lecteur d'écran en ajoutant légende, sections et en-têtes porteurs de `scope`.",
          instructions: [
            "Ajoutez une `caption` contenant « Relevé de notes ».",
            "Placez la première ligne dans un `thead` et les deux autres dans un `tbody`.",
            "Transformez les trois cellules de la première ligne en `th` avec `scope='col'` (Matière, Note, Coefficient).",
            "Dans chaque ligne du `tbody`, la première cellule devient un `th` avec `scope='row'`."
          ],
          hint: "`scope` dit à quoi se rapporte l'en-tête : `col` pour une colonne entière, `row` pour une ligne entière. Un en-tête de ligne reste donc un `th` même s'il contient du texte et non des nombres.",
          starter: {
            html: `<h1>Trimestre 1</h1>
<table>
  <tr><td>Matière</td><td>Note</td><td>Coefficient</td></tr>
  <tr><td>Mathématiques</td><td>15</td><td>2</td></tr>
  <tr><td>Français</td><td>14</td><td>1</td></tr>
</table>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Trimestre 1</h1>
<table>
  <caption>Relevé de notes</caption>
  <thead>
    <tr>
      <th scope="col">Matière</th>
      <th scope="col">Note</th>
      <th scope="col">Coefficient</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Mathématiques</th>
      <td>15</td>
      <td>2</td>
    </tr>
    <tr>
      <th scope="row">Français</th>
      <td>14</td>
      <td>1</td>
    </tr>
  </tbody>
</table>`,
            css: "",
            js: ""
          },
          checks: [
            `!!document.querySelector('table > caption') && getText('caption').toLowerCase().includes('notes')`,
            `countOf('thead th') === 3`,
            `[...document.querySelectorAll('thead th')].every(th => th.getAttribute('scope') === 'col')`,
            `countOf('tbody tr') === 2`,
            `[...document.querySelectorAll('tbody tr')].every(tr => !!tr.querySelector('th[scope="row"]'))`
          ],
          checklist: [
            "Une `caption` qui décrit le tableau",
            "Une ligne d'en-tête dans `thead` avec trois `th scope='col'`",
            "Deux lignes de données dans `tbody`",
            "Un `th scope='row'` en tête de chaque ligne"
          ]
        }
      ]
    },
    {
      id: "html-05",
      title: "Structure sémantique d'une page",
      minutes: 35,
      summary: "Découper une page en repères (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`) au lieu d'empiler des `div`.",
      objectives: [
        "Placer les sept repères sémantiques au bon endroit",
        "Distinguer `div`, `section` et `article` par des critères objectifs",
        "Construire un plan de titres valide sur une page entière",
        "Traduire un wireframe en squelette sémantique"
      ],
      content: [
        {
          type: "lead",
          text: "Une page bien structurée se comprend sans son CSS. Les repères sémantiques sont les **landmarks** du document : ils permettent de sauter directement au menu, au contenu ou au pied de page — au clavier comme au lecteur d'écran."
        },
        { type: "h", level: 2, text: "Les sept repères" },
        {
          type: "table",
          head: ["Balise", "Rôle", "Règle à respecter"],
          rows: [
            ["`header`", "Bandeau d'introduction : logo, titre, accroche", "Un par zone ; peut aussi être placé dans un `article`"],
            ["`nav`", "Ensemble de liens de navigation", "Réservé aux navigations réelles, pas à tous les groupes de liens"],
            ["`main`", "Le contenu principal, unique pour la page", "**Un seul par page**, jamais dans `header`/`footer`/`article`"],
            ["`section`", "Partie thématique du document", "Elle doit posséder un titre (`h2`–`h6`)"],
            ["`article`", "Contenu autonome (post, carte produit, commentaire)", "Il doit rester compréhensible isolé, hors de la page"],
            ["`aside`", "Contenu complémentaire : encadré, barre latérale", "Rien d'indispensable à la compréhension du corps"],
            ["`footer`", "Pied de page : mentions, contact, plan du site", "Un par zone, dans un `article` aussi si besoin"]
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "Trois erreurs qui ruinent la sémantique",
          text: "Un `main` unique est non négociable : deux `main` (par exemple un par onglet) rendent la page invalide. Une `section` sans titre n'est pas une section, c'est une `div` déguisée. Enfin, envelopper chaque paragraphe dans une `section` par réflexe revient à ne rien structurer du tout.",
          items: [
            "`main` : un seul, jamais imbriqué",
            "`nav` : seulement pour de la navigation, pas pour une liste de partenaires",
            "`header` et `footer` peuvent se répéter dans chaque `article`"
          ]
        },
        { type: "h", level: 2, text: "`div`, `section`, `article` : qui est qui ?" },
        {
          type: "p",
          text: "La question à se poser n'est jamais « est-ce que ça ressemble à un bloc ? » mais « est-ce que ce bloc a un titre ? est-ce qu'il a du sens tout seul ? ». Trois tests suffisent : *`article`* — si je coupe ce bloc et le colle dans un flux RSS, reste-t-il compréhensible ? *`section`* — s'agit-il d'une partie du document qui mérite un titre dans le plan ? *`div`* — est-ce un simple conteneur technique, sans sens propre, uniquement destiné au CSS ou au JavaScript ?"
        },
        {
          type: "code",
          lang: "html",
          caption: "Les trois cas, côte à côte.",
          code: `<!-- div : aucun sens, juste un conteneur pour le CSS -->
<div class="carte">
  <h3>Formation HTML</h3>
  <p>10 heures de cours.</p>
</div>

<!-- section : une partie du document, avec son propre titre -->
<section>
  <h2>Nos formations</h2>
  <p>Trois parcours au choix.</p>
</section>

<!-- article : un contenu autonome, compréhensible hors contexte -->
<article>
  <h2>Le HTML fête ses trente ans</h2>
  <p>Retour sur trois décennies de balises.</p>
</article>`
        },
        {
          type: "compare",
          left: {
            title: "À éviter — la soupe de `div`",
            lang: "html",
            code: `<div class="haut">
  <div class="titre">Mon site</div>
  <div class="liens">...</div>
</div>
<div class="milieu">
  <div class="bloc">...</div>
</div>
<div class="bas">© 2025</div>`
          },
          right: {
            title: "À faire — les repères",
            lang: "html",
            code: `<header>
  <h1>Mon site</h1>
  <nav>...</nav>
</header>
<main>
  <section>
    <h2>...</h2>
  </section>
</main>
<footer>© 2025</footer>`
          },
          text: "Le rendu visuel peut être **identique**. La différence est ailleurs : avec la version de droite, le lecteur d'écran annonce « bannière », « navigation », « contenu principal », et permet de sauter directement d'une zone à l'autre."
        },
        {
          type: "demo",
          title: "Wireframe sémantique en CSS Grid",
          height: 360,
          html: `<header class="z">header — bandeau</header>
<nav class="z">nav — menu</nav>
<main class="z">
  <article class="z">article</article>
  <article class="z">article</article>
</main>
<aside class="z">aside</aside>
<footer class="z">footer — pied de page</footer>`,
          css: `body{margin:0;padding:10px;display:grid;gap:8px;
grid-template-columns:2fr 1fr;
grid-template-areas:"entete entete" "menu menu" "corps cote" "pied pied";
font-family:system-ui,-apple-system,sans-serif;font-size:12px;color:#16202b;background:#fffdfa}
header{grid-area:entete}
nav{grid-area:menu}
main{grid-area:corps}
aside{grid-area:cote}
footer{grid-area:pied}
.z{border:1px dashed #d9b8a4;background:#fdf1ea;border-radius:6px;padding:8px;font-weight:600;color:#a63a15}
main{display:grid;grid-template-columns:1fr 1fr;gap:8px;background:none;border:0;padding:0}
main .z{background:#eaf5ee;border-color:#a8c9b6;color:#0f6b4f;font-weight:500}`,
          js: ``
        },
        { type: "h", level: 2, text: "Le plan de titres d'une page entière" },
        {
          type: "p",
          text: "Un `h1` (le sujet de la page), puis des `h2` pour les grandes zones, puis des `h3` à l'intérieur. Ce plan doit rester cohérent **à travers** les repères : un `h2` dans le `main` et un `h2` dans l'`aside` sont au même niveau. Attention : l'algorithme d'esquisse (`section` qui aurait créé automatiquement un niveau de titre) n'est implémenté par aucun navigateur ; seul le numéro de la balise compte, donc le niveau se choisit à la main."
        },
        {
          type: "code",
          lang: "html",
          caption: "Squelette complet d'une page d'accueil sémantique.",
          code: `<header>
  <a href="index.html">Studio Ndayane</a>
  <nav>
    <ul>
      <li><a href="index.html">Accueil</a></li>
      <li><a href="services.html">Services</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Agence de création de sites</h1>

  <section>
    <h2>Nos services</h2>
    <article>
      <h3>Site vitrine</h3>
      <p>Cinq pages, un formulaire de contact, un référencement soigné.</p>
    </article>
  </section>
</main>

<aside>
  <h2>Actualités</h2>
  <p>Nouvelle formation HTML en mars.</p>
</aside>

<footer>
  <p>Studio Ndayane — Dakar</p>
</footer>`
        },
        {
          type: "steps",
          items: [
            { title: "Croquis papier", text: "Dessinez des rectangles : bandeau, menu, contenu, colonne latérale, pied. Ne pensez pas encore au HTML." },
            { title: "Nommer chaque zone", text: "Écrivez le nom sémantique à côté de chaque rectangle : est-ce un `header`, un `main`, un `aside` ?" },
            { title: "Un titre par zone", text: "Donnez un titre à chaque zone qui en mérite un : c'est ce qui décidera entre `section` et `div`." },
            { title: "Coder le squelette", text: "Écrivez les balises avec du faux texte, sans CSS. La page doit déjà être lisible." },
            { title: "Vérifier le plan", text: "Relisez la liste des titres du document : elle doit faire un sommaire compréhensible." }
          ]
        },
        {
          type: "checklist",
          items: [
            "Un seul `main` par page",
            "Chaque `section` possède un titre",
            "Chaque `article` reste compréhensible isolé",
            "Le plan de titres ne saute aucun niveau",
            "Je peux nommer les sept repères sans regarder la leçon"
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-09",
          title: "Les quatre grandes zones",
          difficulty: 1,
          goal: "Remplacer les `div` d'une page par les repères sémantiques correspondants.",
          instructions: [
            "Transformez le premier `div` en `header` et son menu en `nav` contenant les deux liens.",
            "Transformez le conteneur du contenu en `main` contenant le paragraphe.",
            "Transformez le `div` du pied de page en `footer`.",
            "La page finale ne doit plus contenir aucun `div`."
          ],
          hint: "La structure imbriquée compte : `header > nav > a` est correct, `nav > header > a` ne l'est pas. Attention à ne fermer aucune balise trop tôt.",
          starter: {
            html: `<div class="entete">
  <h1>Mon portfolio</h1>
  <div class="menu">
    <a href="index.html">Accueil</a>
    <a href="projets.html">Projets</a>
  </div>
</div>
<div class="contenu">
  <p>Bienvenue sur mon portfolio.</p>
</div>
<div class="pied">© 2025 — Mon portfolio</div>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<header>
  <h1>Mon portfolio</h1>
  <nav>
    <a href="index.html">Accueil</a>
    <a href="projets.html">Projets</a>
  </nav>
</header>

<main>
  <p>Bienvenue sur mon portfolio.</p>
</main>

<footer>© 2025 — Mon portfolio</footer>`,
            css: "",
            js: ""
          },
          checks: [
            `!!document.querySelector('body > header')`,
            `!!document.querySelector('header > nav') && countOf('header nav a') === 2`,
            `countOf('main') === 1 && countOf('main > p') === 1`,
            `!!document.querySelector('body > footer')`,
            `countOf('div') === 0`
          ],
          checklist: [
            "Un `header` en haut, un `footer` en bas",
            "Le menu est un `nav` dans le `header`",
            "Un seul `main` qui contient le paragraphe",
            "Plus aucun `div`"
          ]
        },
        {
          id: "html-ex-10",
          title: "Blog : articles et barre latérale",
          difficulty: 2,
          goal: "Découper un contenu de blog en articles autonomes et ajouter un contenu complémentaire dans un `aside`.",
          instructions: [
            "Transformez chacun des deux blocs d'actualité en `article` contenant son `h2` et son paragraphe.",
            "Ajoutez dans le `main` un `aside` avec un `h2` « À propos » et un paragraphe.",
            "Il ne doit rester qu'un seul `h1` dans toute la page.",
            "Le `main` doit contenir exactement deux `article` en enfants directs."
          ],
          hint: "Un `article` autonome a besoin de son propre titre : le `h2` reste **dans** l'article. L'`aside` se place à côté des articles, dans le `main`.",
          starter: {
            html: `<main>
  <h1>Le blog du potager</h1>
  <h2>Planter les tomates</h2>
  <p>Le bon moment, c'est après les dernières gelées.</p>
  <h2>Pailler le sol</h2>
  <p>Le paillage garde l'humidité et limite les mauvaises herbes.</p>
  <div class="cote">Contenu de la barre latérale.</div>
</main>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<main>
  <h1>Le blog du potager</h1>

  <article>
    <h2>Planter les tomates</h2>
    <p>Le bon moment, c'est après les dernières gelées.</p>
  </article>

  <article>
    <h2>Pailler le sol</h2>
    <p>Le paillage garde l'humidité et limite les mauvaises herbes.</p>
  </article>

  <aside>
    <h2>À propos</h2>
    <p>Un potager de 40 m², tenu depuis dix ans.</p>
  </aside>
</main>`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('main > article') === 2`,
            `[...document.querySelectorAll('article')].every(a => !!a.querySelector('h2') && !!a.querySelector('p'))`,
            `!!document.querySelector('main > aside')`,
            `countOf('h1') === 1`,
            `countOf('main h2') === 3`
          ],
          checklist: [
            "Deux `article` enfants directs du `main`",
            "Chaque article a son `h2` et son paragraphe",
            "Un `aside` avec un titre",
            "Un seul `h1` dans la page"
          ]
        },
        {
          id: "html-ex-11",
          title: "Réparer un plan de titres",
          difficulty: 3,
          goal: "Corriger une hiérarchie de titres cassée (deux `h1`, saut de `h2` à `h4`) sans changer les textes.",
          instructions: [
            "Il ne doit rester qu'un seul `h1` : « Boutique de thé ».",
            "« Nos thés » devient un `h2`, placé juste après le `h1`.",
            "Les deux titres de catégories deviennent des `h3`.",
            "« Livraison » reste un `h2`. Le plan ne doit plus sauter aucun niveau."
          ],
          hint: "On corrige le **niveau** du titre, jamais la taille affichée : le CSS s'occupe du rendu. Un niveau ne peut pas descendre de plus d'un cran d'un titre au suivant.",
          starter: {
            html: `<h1>Boutique de thé</h1>
<h1>Nos thés</h1>
<h4>Thés verts</h4>
<p>Sélectionnés au printemps.</p>
<h4>Thés noirs</h4>
<p>Plus oxydés, plus corsés.</p>
<h2>Livraison</h2>
<p>Partout à Dakar en 48 heures.</p>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Boutique de thé</h1>
<h2>Nos thés</h2>
<h3>Thés verts</h3>
<p>Sélectionnés au printemps.</p>
<h3>Thés noirs</h3>
<p>Plus oxydés, plus corsés.</p>
<h2>Livraison</h2>
<p>Partout à Dakar en 48 heures.</p>`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('h1') === 1`,
            `countOf('h2') === 2 && countOf('h3') === 2`,
            `(() => { const lv = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => Number(h.tagName[1])); return lv.slice(1).every((l, i) => l - lv[i] <= 1); })()`,
            `[...document.querySelectorAll('h2')].some(h => h.textContent.toLowerCase().includes('livraison'))`,
            `countOf('h4') === 0`
          ],
          checklist: [
            "Un unique `h1`",
            "Deux `h2` : Nos thés et Livraison",
            "Deux `h3` pour les catégories",
            "Aucun saut de niveau, aucun `h4`"
          ]
        }
      ]
    },
    {
      id: "html-06",
      title: "Formulaires (base)",
      minutes: 35,
      summary: "Construire un formulaire utilisable : un `label` par champ, le bon `type` d'`input`, et des contraintes de validation honnêtes.",
      objectives: [
        "Relier chaque champ à son étiquette avec `label for` et `id`",
        "Choisir le `type` d'`input` adapté au contenu attendu",
        "Poser les attributs de validation : `required`, `min`, `max`, `pattern`",
        "Distinguer `get` et `post` et savoir quand utiliser chacun"
      ],
      content: [
        {
          type: "lead",
          text: "Un formulaire est le seul endroit où l'utilisateur **travaille** pour vous. Chaque champ mal étiqueté, chaque mauvais clavier affiché sur mobile, c'est une saisie perdue. Le HTML fournit tout ce qu'il faut : encore faut-il l'utiliser."
        },
        { type: "h", level: 2, text: "Le formulaire et ses deux attributs" },
        {
          type: "p",
          text: "`action` indique où les données sont envoyées ; `method` indique comment. Avec `get`, les données partent dans l'URL (`?nom=Awa`) : pratique pour une recherche, à proscrire pour un mot de passe, car tout finit dans l'historique et les journaux du serveur. Avec `post`, les données voyagent dans le corps de la requête : c'est la méthode des créations et des modifications. Sans `action`, le formulaire se renvoie vers la page courante — utile pour tester, dangereux en production."
        },
        {
          type: "code",
          lang: "html",
          caption: "Un formulaire d'inscription : structure et bouton d'envoi.",
          code: `<form action="/inscription" method="post">
  <label for="nom">Nom complet</label>
  <input type="text" id="nom" name="nom" autocomplete="name">

  <label for="email">Adresse e-mail</label>
  <input type="email" id="email" name="email" autocomplete="email" required>

  <button type="submit">Créer mon compte</button>
</form>`
        },
        { type: "h", level: 2, text: "Chaque champ mérite un `label`" },
        {
          type: "p",
          text: "Le trio `label for` / `id` / `name` paraît redondant, mais chacun sert à une chose : `for` + `id` relient visuellement et vocalement l'étiquette au champ (cliquer sur le texte place le curseur dans le champ) ; `name` est la clé envoyée au serveur. Un champ sans `label` est annoncé « zone de texte » par un lecteur d'écran : l'utilisateur ne sait pas ce qu'on attend de lui. Il existe aussi l'imbrication (`<label>Nom <input></label>`), correcte mais moins souple pour la mise en page."
        },
        {
          type: "callout",
          tone: "warning",
          title: "`placeholder` n'est pas une étiquette",
          text: "Un texte d'aide gris disparaît dès la première frappe, il est souvent illisible (contraste faible) et il n'est pas systématiquement lu par les technologies d'assistance. Il sert d'**exemple** de format, jamais à nommer le champ. Et s'il faut expliquer une contrainte, écrivez-la dans un vrai texte ou via `aria-describedby` (leçon 09).",
          items: [
            "`placeholder` = exemple, `label` = nom du champ",
            "`required` fait refuser l'envoi d'un champ vide par le navigateur",
            "Un champ obligatoire se signale aussi visuellement (astérisque + légende)"
          ]
        },
        { type: "h", level: 2, text: "Les types d'`input`" },
        {
          type: "table",
          head: ["`type`", "Usage typique", "Ce qu'il apporte"],
          rows: [
            ["`text`", "Nom, ville, recherche simple", "Clavier standard, `autocomplete` évite la ressaisie"],
            ["`email`", "Adresse e-mail", "Clavier avec arobase sur mobile et vérification du format"],
            ["`password`", "Mot de passe", "Caractères masqués ; jamais dans une URL `get`"],
            ["`number`", "Quantité, âge", "Flèches d'incrément, combine `min`, `max`, `step`"],
            ["`date`", "Réservation, naissance", "Sélecteur de calendrier natif du système"],
            ["`tel`", "Téléphone", "Clavier numérique ; aucune validation par défaut, utilisez `pattern`"],
            ["`url`", "Site web", "Exige un schéma complet (`https://`)"],
            ["`color`", "Choix d'une teinte", "Renvoie un code hexadécimal `#e34f26`"],
            ["`range`", "Curseur (volume, budget)", "Valeur initiale au milieu de la plage, pas à zéro"],
            ["`file`", "Pièce jointe", "Exige `enctype='multipart/form-data'` sur le `form`"]
          ]
        },
        {
          type: "demo",
          title: "Types natifs : le bon clavier, le bon contrôle",
          height: 420,
          html: `<form class="fiche">
  <label for="d-nom">Nom <span class="aide">obligatoire</span></label>
  <input type="text" id="d-nom" name="nom" placeholder="Awa Ndiaye" required>

  <label for="d-email">E-mail</label>
  <input type="email" id="d-email" name="email" placeholder="awa@exemple.com" required>

  <label for="d-date">Date de naissance</label>
  <input type="date" id="d-date" name="date">

  <label for="d-couleur">Couleur préférée</label>
  <input type="color" id="d-couleur" name="couleur" value="#e34f26">

  <label for="d-niveau">Niveau en HTML</label>
  <input type="range" id="d-niveau" name="niveau" min="0" max="10" value="3">

  <button type="button">Valider</button>
</form>`,
          css: `body{font-family:system-ui,-apple-system,sans-serif;margin:0;padding:16px;color:#16202b;background:#fffdfa;font-size:14px}
.fiche{display:grid;gap:10px;max-width:340px}
label{font-weight:600;font-size:13px;display:block;margin-bottom:2px}
.aide{font-weight:400;color:#8a949e;font-size:11px}
input{width:100%;box-sizing:border-box;padding:7px 9px;border:1px solid #cdc4ba;border-radius:6px;font:inherit;background:#fff}
input:focus{outline:2px solid #e34f26;outline-offset:1px}
input[type="color"]{padding:2px;height:38px}
button{justify-self:start;padding:8px 16px;border:0;border-radius:6px;background:#e34f26;color:#fff;font:inherit;font-weight:600;cursor:pointer}
button:hover{background:#c93f1b}`,
          js: ``
        },
        { type: "h", level: 2, text: "Valider sans JavaScript" },
        {
          type: "p",
          text: "Le navigateur vérifie gratuitement les contraintes déclarées dans le HTML : `required` (champ non vide), `min`/`max` (bornes numériques ou dates), `minlength`/`maxlength`, et `pattern` (expression régulière appliquée à la valeur complète). C'est instantané, traduit dans la langue du système et accessible — inutile de le refaire en JavaScript. Ces contraintes **ne remplacent pas** la validation serveur : on peut désactiver le HTML, et une requête peut être forgée à la main. Enfin, `autocomplete` (`name`, `email`, `tel`, `street-address`, `new-password`…) remplit les champs automatiquement et réduit fortement les abandons."
        },
        {
          type: "code",
          lang: "html",
          caption: "Des contraintes précises valent mieux qu'un long message d'erreur.",
          code: `<label for="pseudo">Pseudonyme</label>
<input type="text" id="pseudo" name="pseudo" required minlength="3" maxlength="20" autocomplete="username">

<label for="age">Âge</label>
<input type="number" id="age" name="age" min="16" max="99" step="1">

<label for="tel">Téléphone</label>
<input type="tel" id="tel" name="tel" pattern="[0-9+ ]{9,15}" autocomplete="tel">

<label for="code">Code postal</label>
<input type="text" id="code" name="code" inputmode="numeric" pattern="[0-9]{5}" placeholder="75001">

<button type="submit">Envoyer</button>
<button type="reset">Tout effacer</button>`
        },
        {
          type: "checklist",
          items: [
            "Chaque `input` possède un `id` et un `label for` correspondant",
            "Chaque champ a un attribut `name` (sinon rien n'est envoyé)",
            "Les types sont choisis pour le contenu, pas par défaut en `text`",
            "Le mot de passe n'est jamais envoyé en `get`",
            "Un champ obligatoire est signalé aussi visuellement"
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-12",
          title: "Inscription minimale bien étiquetée",
          difficulty: 1,
          goal: "Relier chaque champ à une étiquette et rendre le champ e-mail obligatoire.",
          instructions: [
            "Donnez à chaque champ un `id` unique : `nom`, `email`, `mdp`.",
            "Ajoutez pour ces trois champs un `label` dont l'attribut `for` pointe vers l'`id` correspondant.",
            "Rendez le champ e-mail obligatoire avec `required`.",
            "Ajoutez `autocomplete=\"email\"` sur ce même champ e-mail."
          ],
          hint: "C'est la valeur de `for` qui doit être **identique** à l'`id` du champ, à la lettre près : `for=\"email\"` pour `id=\"email\"`.",
          starter: {
            html: `<h1>Créer un compte</h1>
<form action="/inscription" method="post">
  <input type="text" placeholder="Nom">
  <input type="email" placeholder="E-mail">
  <input type="password" placeholder="Mot de passe">
  <button type="submit">Envoyer</button>
</form>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Créer un compte</h1>
<form action="/inscription" method="post">
  <label for="nom">Nom</label>
  <input type="text" id="nom" name="nom" placeholder="Awa Ndiaye">

  <label for="email">E-mail</label>
  <input type="email" id="email" name="email" placeholder="awa@exemple.com" required autocomplete="email">

  <label for="mdp">Mot de passe</label>
  <input type="password" id="mdp" name="mdp" autocomplete="new-password">

  <button type="submit">Envoyer</button>
</form>`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('label') === 3`,
            `[...document.querySelectorAll('input')].every(i => i.id && !!document.querySelector('label[for="' + i.id + '"]'))`,
            `!!document.querySelector('input[type="email"][required]')`,
            `getAttr('#email','autocomplete') === 'email'`
          ],
          checklist: [
            "Trois `label` avec un `for` valide",
            "Chaque champ possède un `id`",
            "L'e-mail est `required`",
            "`autocomplete=\"email\"` sur l'e-mail"
          ]
        },
        {
          id: "html-ex-13",
          title: "Fiche de commande avec bornes",
          difficulty: 2,
          goal: "Ajouter étiquettes, bornes numériques, autocomplétion et bouton de réinitialisation à une commande.",
          instructions: [
            "Ajoutez un `label` pour les trois champs (`client`, `quantite`, `date`).",
            "Sur la quantité, posez `min=\"1\"`, `max=\"20\"` et `step=\"1\"`.",
            "Le champ client devient obligatoire et porte `autocomplete=\"name\"`.",
            "Ajoutez un bouton `type=\"reset\"` intitulé « Réinitialiser »."
          ],
          hint: "Les attributs `min` et `max` ne s'appliquent vraiment qu'à un `type=\"number\"` (ou à une date) ; sur un `text`, ils sont ignorés silencieusement.",
          starter: {
            html: `<h1>Commande</h1>
<form action="/commande" method="post">
  <input type="text" id="client" name="client">
  <input type="number" id="quantite" name="quantite">
  <input type="date" id="date" name="date">
  <button type="submit">Commander</button>
</form>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Commande</h1>
<form action="/commande" method="post">
  <label for="client">Nom du client</label>
  <input type="text" id="client" name="client" required autocomplete="name">

  <label for="quantite">Quantité (1 à 20)</label>
  <input type="number" id="quantite" name="quantite" min="1" max="20" step="1" value="1">

  <label for="date">Date de livraison</label>
  <input type="date" id="date" name="date">

  <button type="submit">Commander</button>
  <button type="reset">Réinitialiser</button>
</form>`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('label') === 3`,
            `[...document.querySelectorAll('input')].every(i => i.id && !!document.querySelector('label[for="' + i.id + '"]'))`,
            `Number(getAttr('#quantite','min')) === 1 && Number(getAttr('#quantite','max')) === 20`,
            `getAttr('#client','autocomplete') === 'name' && !!document.querySelector('#client[required]')`,
            `countOf('button[type="reset"]') === 1`
          ],
          checklist: [
            "Trois champs étiquetés",
            "Quantité bornée entre 1 et 20",
            "Client obligatoire avec autocomplétion",
            "Un bouton de réinitialisation"
          ]
        }
      ]
    },
    {
      id: "html-07",
      title: "Formulaires (avancé)",
      minutes: 40,
      summary: "Menus déroulants, cases à cocher, boutons radio, zone de texte, suggestions et messages de validation : les champs qui font la différence sur un vrai formulaire.",
      objectives: [
        "Grouper des options avec `select` / `optgroup` et comprendre `value`",
        "Construire un groupe de boutons radio avec un `name` partagé dans un `fieldset`",
        "Utiliser `textarea`, `datalist`, `output` et `input type='search'`",
        "Lire et compléter les messages de validation native"
      ],
      content: [
        {
          type: "lead",
          text: "Un formulaire réel contient rarement trois champs. Il y a des choix exclusifs, des choix multiples, des listes longues et des champs libres. Chacun a sa balise — et ses pièges."
        },
        { type: "h", level: 2, text: "`select`, `optgroup`, `option`" },
        {
          type: "p",
          text: "La balise `select` produit une liste déroulante ; chaque `option` porte une `value` (ce qui part au serveur) et un texte visible (ce que lit l'utilisateur) : les deux peuvent différer, et c'est utile pour garder des identifiants courts. `optgroup` regroupe les options sous un intitulé non sélectionnable, ce qui transforme une liste de vingt villes en deux groupes lisibles. Une option vide en première position oblige à choisir réellement, au lieu de laisser la première valeur sélectionnée par défaut."
        },
        {
          type: "code",
          lang: "html",
          caption: "Liste groupée avec une option vide : le choix devient explicite.",
          code: `<label for="ville">Ville de livraison</label>
<select id="ville" name="ville" required>
  <option value="">— Choisir une ville —</option>
  <optgroup label="Sénégal">
    <option value="dakar">Dakar</option>
    <option value="thies">Thiès</option>
  </optgroup>
  <optgroup label="France">
    <option value="paris">Paris</option>
    <option value="lyon">Lyon</option>
  </optgroup>
</select>`
        },
        { type: "h", level: 2, text: "Boutons radio et cases à cocher" },
        {
          type: "p",
          text: "Un bouton radio (`type='radio'`) sert à un choix **exclusif** : un seul peut être coché, à condition que tous les boutons du groupe partagent le même `name`. Une case à cocher (`type='checkbox'`) sert à un choix **multiple** : des `name` identiques envoient plusieurs valeurs, ce qui est le comportement voulu pour une liste d'options. Dans les deux cas, l'étiquette est obligatoire ; l'englobement (`<label><input> Texte</label>`) évite un `id` par champ et agrandit la zone cliquable. `fieldset` + `legend` annonce le groupe (« Formule d'abonnement, groupe de 3 boutons radio »), ce qui est indispensable dès que plusieurs groupes cohabitent."
        },
        {
          type: "code",
          lang: "html",
          caption: "Deux groupes distincts, deux `fieldset`, des `name` cohérents.",
          code: `<fieldset>
  <legend>Formule d'abonnement</legend>

  <label><input type="radio" name="formule" value="essai" checked> Essai gratuit de 14 jours</label>
  <label><input type="radio" name="formule" value="mensuel"> Mensuel — 9 900 F</label>
  <label><input type="radio" name="formule" value="annuel"> Annuel — 99 000 F</label>
</fieldset>

<fieldset>
  <legend>Options</legend>

  <label><input type="checkbox" name="options" value="sauvegarde" checked> Sauvegarde quotidienne</label>
  <label><input type="checkbox" name="options" value="support"> Support prioritaire</label>
</fieldset>`
        },
        {
          type: "callout",
          tone: "danger",
          title: "Le `name` partagé est la règle des radios",
          text: "Si chaque bouton radio a un `name` différent, ils ne forment plus un groupe : l'utilisateur peut tous les cocher, et le serveur reçoit trois valeurs. À l'inverse, deux groupes de radios qui partagent le même `name` s'annulent mutuellement : cocher une taille décoche la couleur. Un `name` par groupe, et un `fieldset` par groupe.",
          items: [
            "Radio : même `name` pour tous les boutons du groupe",
            "Checkbox : même `name` si le serveur attend plusieurs valeurs",
            "Un `id` unique par champ, même quand les `name` sont partagés"
          ]
        },
        {
          type: "demo",
          title: "Radio, case à cocher et sortie en direct",
          height: 400,
          html: `<form class="reglages">
  <fieldset>
    <legend>Formule</legend>
    <label><input type="radio" name="formule" value="essai" checked> Essai</label>
    <label><input type="radio" name="formule" value="mensuel"> Mensuel</label>
    <label><input type="radio" name="formule" value="annuel"> Annuel</label>
  </fieldset>

  <label for="d-niveau">Niveau de lecture</label>
  <input type="range" id="d-niveau" min="0" max="10" value="4">

  <label><input type="checkbox" id="d-news"> Recevoir la lettre d'information</label>

  <p class="sortie">Résultat : <output id="d-sortie"></output></p>
</form>`,
          css: `body{font-family:system-ui,-apple-system,sans-serif;margin:0;padding:16px;color:#16202b;background:#fffdfa;font-size:14px}
.reglages{display:grid;gap:10px;max-width:360px}
fieldset{border:1px solid #ded6cd;border-radius:8px;padding:8px 12px;margin:0;background:#fff}
legend{font-weight:600;font-size:13px;color:#a63a15;padding:0 4px}
label{display:block;margin:4px 0;font-size:13px}
input[type="range"]{width:100%}
.sortie{background:#f7f2ec;border-left:3px solid #e34f26;padding:8px 10px;border-radius:4px;margin:0;font-size:13px}
output{font-weight:700;color:#a63a15}`,
          js: `const grille = document.querySelector('.reglages');
const niveau = document.getElementById('d-niveau');
const news = document.getElementById('d-news');
const sortie = document.getElementById('d-sortie');

function maj() {
  const coche = document.querySelector('input[name="formule"]:checked');
  const formule = coche ? coche.value : 'aucune';
  sortie.textContent = formule + ' / niveau ' + niveau.value + ' / lettre : ' + (news.checked ? 'oui' : 'non');
}

grille.addEventListener('input', maj);
grille.addEventListener('change', maj);
maj();`
        },
        { type: "h", level: 2, text: "Champs longs, suggestions, résultats" },
        {
          type: "code",
          lang: "html",
          caption: "Zone de texte (contenu entre les balises, jamais d'attribut `value`), suggestions, recherche et sortie calculée.",
          code: `<label for="avis">Votre avis</label>
<textarea id="avis" name="avis" rows="4" maxlength="300" placeholder="300 caractères maximum"></textarea>

<label for="langage">Langage préféré</label>
<input type="text" id="langage" name="langage" list="langages" autocomplete="off">
<datalist id="langages">
  <option value="HTML"></option>
  <option value="CSS"></option>
  <option value="JavaScript"></option>
</datalist>

<label for="q">Rechercher un article</label>
<input type="search" id="q" name="q" placeholder="mot-clé">

<p>Total estimé : <output name="total" for="quantite">—</output> F</p>`
        },
        { type: "h", level: 2, text: "Validation native et navigation clavier" },
        {
          type: "p",
          text: "Au moment de l'envoi, le navigateur bloque la soumission si une contrainte n'est pas respectée, affiche une bulle localisée et place le focus sur le premier champ fautif. En JavaScript, `form.checkValidity()` renvoie le bilan, `champ.validity` détaille la cause, et `setCustomValidity('message')` remplace le message par défaut (à remettre à vide dès que la saisie devient valide). Côté CSS, `:invalid` et `:user-invalid` permettent de colorer un champ. Côté clavier, l'ordre de tabulation suit l'ordre du DOM : un formulaire se remplit à la touche `Tab` sans souris, et le focus doit rester visible (`:focus-visible`)."
        },
        {
          type: "checklist",
          items: [
            "Mes radios forment des groupes avec un `name` commun",
            "Chaque groupe délicat est dans un `fieldset` avec une `legend`",
            "`select` : une option vide en tête si un choix réel est exigé",
            "`textarea` : contenu entre les balises, jamais d'attribut `value`",
            "Je sais expliquer la différence entre `datalist` et `select`"
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-14",
          title: "Un choix, et un seul",
          difficulty: 1,
          goal: "Corriger un groupe de boutons radio mal formé et l'annoncer correctement.",
          instructions: [
            "Les trois boutons radio doivent partager le `name=\"formule\"`.",
            "Enveloppez-les dans une paire `fieldset` / `legend` dont la légende est « Formule d'abonnement ».",
            "Chaque bouton doit être relié à une étiquette (`label` avec `for` et `id`, ou `label` englobant).",
            "La formule « Essai » doit être cochée par défaut."
          ],
          hint: "Trois boutons dont les `name` diffèrent ne forment pas un groupe : le navigateur les traite comme trois choix indépendants.",
          starter: {
            html: `<h1>Abonnement</h1>
<form action="/abonnement" method="post">
  <input type="radio" name="f1" value="essai"> Essai
  <input type="radio" name="f2" value="mensuel"> Mensuel
  <input type="radio" name="f3" value="annuel"> Annuel
  <button type="submit">Continuer</button>
</form>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Abonnement</h1>
<form action="/abonnement" method="post">
  <fieldset>
    <legend>Formule d'abonnement</legend>

    <label for="f-essai">Essai</label>
    <input type="radio" id="f-essai" name="formule" value="essai" checked>

    <label for="f-mensuel">Mensuel</label>
    <input type="radio" id="f-mensuel" name="formule" value="mensuel">

    <label for="f-annuel">Annuel</label>
    <input type="radio" id="f-annuel" name="formule" value="annuel">
  </fieldset>

  <button type="submit">Continuer</button>
</form>`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('input[type="radio"]') === 3`,
            `[...document.querySelectorAll('input[type="radio"]')].every(r => r.name === 'formule')`,
            `!!document.querySelector('fieldset > legend') && getText('legend').toLowerCase().includes('formule')`,
            `[...document.querySelectorAll('input[type="radio"]')].every(r => !!r.closest('label') || (r.id && !!document.querySelector('label[for="' + r.id + '"]')))`,
            `[...document.querySelectorAll('input[name="formule"]')].filter(r => r.checked).length === 1`
          ],
          checklist: [
            "Trois radios, un seul `name`",
            "Une légende dans un `fieldset`",
            "Chaque radio étiqueté",
            "Un seul bouton coché par défaut"
          ]
        },
        {
          id: "html-ex-15",
          title: "Préférences : menu groupé, cases et zone de texte",
          difficulty: 2,
          goal: "Organiser un menu déroulant en groupes, ajouter des cases à cocher et étiqueter les champs libres.",
          instructions: [
            "Regroupez les options du `select` en deux `optgroup` : « Bases » (HTML, CSS) et « Avancé » (JavaScript).",
            "Ajoutez trois cases à cocher nommées `notif` (E-mail, SMS, Récapitulatif hebdomadaire), une seule étant cochée par défaut.",
            "Ajoutez un `label` pour le `select` (id `domaine`) et pour la `textarea` (id `note`)."
          ],
          hint: "Les `optgroup` se placent **dans** le `select` et contiennent les `option` ; seul l'intitulé du groupe change, pas sa structure.",
          starter: {
            html: `<h1>Préférences</h1>
<form action="/preferences" method="post">
  <select id="domaine" name="domaine">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
  </select>
  <textarea id="note" name="note" rows="3"></textarea>
</form>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Préférences</h1>
<form action="/preferences" method="post">
  <label for="domaine">Domaine principal</label>
  <select id="domaine" name="domaine">
    <optgroup label="Bases">
      <option value="html">HTML</option>
      <option value="css">CSS</option>
    </optgroup>
    <optgroup label="Avancé">
      <option value="js">JavaScript</option>
    </optgroup>
  </select>

  <label><input type="checkbox" name="notif" value="email" checked> E-mail</label>
  <label><input type="checkbox" name="notif" value="sms"> SMS</label>
  <label><input type="checkbox" name="notif" value="hebdo"> Récapitulatif hebdomadaire</label>

  <label for="note">Vos objectifs</label>
  <textarea id="note" name="note" rows="3" maxlength="300"></textarea>

  <button type="submit">Enregistrer</button>
</form>`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('optgroup') === 2`,
            `countOf('option') >= 3`,
            `countOf('input[type="checkbox"]') === 3`,
            `countOf('input[type="checkbox"]:checked') === 1`,
            `!!document.querySelector('label[for="domaine"]') && !!document.querySelector('label[for="note"]')`
          ],
          checklist: [
            "Deux `optgroup` contenant toutes les options",
            "Trois cases à cocher dont une cochée",
            "Un `label` pour le menu et un pour la zone de texte"
          ]
        },
        {
          id: "html-ex-16",
          title: "Réglages avec sortie en direct",
          difficulty: 3,
          goal: "Combiner `range`, `output` et un peu de JavaScript pour afficher une valeur dès le chargement de la page.",
          instructions: [
            "Regroupez les trois cases à cocher dans un `fieldset` avec la `legend` « Notifications » (nom partagé `notif`).",
            "Ajoutez un élément `output` avec `id=\"valeur\"` et `for=\"volume\"`, initialement **vide** dans le HTML.",
            "Écrivez le JavaScript pour que la valeur du volume soit affichée dès le chargement, puis mise à jour à chaque mouvement du curseur.",
            "Ajoutez un `optgroup` « Afrique de l'Ouest » autour du Sénégal et un `optgroup` « Europe » autour de la France."
          ],
          hint: "Un `output` vide ne se remplit pas tout seul : appelez la fonction de mise à jour une fois à la fin du script, en plus de l'écouteur `input`.",
          starter: {
            html: `<h1>Réglages</h1>
<form action="/reglages" method="post">
  <label for="volume">Volume</label>
  <input type="range" id="volume" name="volume" min="0" max="100" value="30">

  <label for="pays">Pays</label>
  <select id="pays" name="pays">
    <option value="sn">Sénégal</option>
    <option value="fr">France</option>
  </select>

  <label for="note">Note</label>
  <textarea id="note" name="note" rows="3"></textarea>

  <button type="submit">Enregistrer</button>
</form>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Réglages</h1>
<form action="/reglages" method="post">
  <fieldset>
    <legend>Notifications</legend>
    <label><input type="checkbox" name="notif" value="email" checked> E-mail</label>
    <label><input type="checkbox" name="notif" value="sms"> SMS</label>
    <label><input type="checkbox" name="notif" value="navigateur"> Navigateur</label>
  </fieldset>

  <label for="volume">Volume</label>
  <input type="range" id="volume" name="volume" min="0" max="100" value="30">
  <p>Valeur actuelle : <output id="valeur" for="volume"></output></p>

  <label for="pays">Pays</label>
  <select id="pays" name="pays">
    <optgroup label="Afrique de l'Ouest">
      <option value="sn">Sénégal</option>
    </optgroup>
    <optgroup label="Europe">
      <option value="fr">France</option>
    </optgroup>
  </select>

  <label for="note">Note</label>
  <textarea id="note" name="note" rows="3"></textarea>

  <button type="submit">Enregistrer</button>
</form>`,
            css: "",
            js: `const volume = document.getElementById('volume');
const valeur = document.getElementById('valeur');

function maj() {
  valeur.textContent = volume.value;
}

volume.addEventListener('input', maj);
maj();`
          },
          checks: [
            `countOf('fieldset') === 1 && !!document.querySelector('fieldset > legend')`,
            `countOf('input[type="checkbox"][name="notif"]') === 3`,
            `getText('#valeur') === '30'`,
            `countOf('optgroup') === 2`,
            `!!document.querySelector('output[for="volume"]')`
          ],
          checklist: [
            "Un `fieldset` légendé pour les notifications",
            "Trois cases nommées `notif`",
            "La sortie affiche 30 dès le chargement, sans clic",
            "Deux `optgroup` dans le menu des pays"
          ]
        }
      ]
    },
    {
      id: "html-08",
      title: "Médias et intégrations",
      minutes: 40,
      summary: "Intégrer vidéo, audio, iframe, SVG et images responsives sans sacrifier l'accessibilité ni la vitesse.",
      objectives: [
        "Publier une vidéo et un audio avec `controls`, sources multiples et sous-titres",
        "Intégrer un contenu externe dans une `iframe` avec `title`, `sandbox` et `loading`",
        "Choisir entre SVG inline et SVG dans une `img`",
        "Servir la bonne taille d'image avec `picture`, `srcset` et `sizes`"
      ],
      content: [
        {
          type: "lead",
          text: "Les médias sont ce qui pèse le plus lourd dans une page. Bien intégrés, ils enrichissent ; mal intégrés, ils font fuiter la batterie, explosent le forfait de données et excluent les utilisateurs sans haut-parleur."
        },
        { type: "h", level: 2, text: "`video` et `audio`" },
        {
          type: "p",
          text: "Les deux balises fonctionnent de la même manière : `controls` affiche les commandes natives (lecture, volume, plein écran, sous-titres), plusieurs `source` offrent des formats de repli et le navigateur prend le premier qu'il comprend, et le contenu placé entre les balises n'apparaît que si aucun média n'est lisible. `poster` affiche une image avant la lecture — sans elle, la vidéo apparaît noire, ce qui donne l'impression d'un site cassé. `preload='metadata'` charge juste la durée et l'en-tête ; `preload='none'` est le choix le plus économe pour plusieurs médias sur une page."
        },
        {
          type: "code",
          lang: "html",
          caption: "Vidéo à deux formats avec sous-titres, puis audio économe.",
          code: `<video controls width="640" poster="assets/poster-plage.webp" preload="metadata">
  <source src="assets/video/plage.webm" type="video/webm">
  <source src="assets/video/plage.mp4" type="video/mp4">
  <track kind="captions" src="assets/video/plage.vtt" srclang="fr" label="Français" default>
  Votre navigateur ne lit pas cette vidéo.
  <a href="assets/video/plage.mp4">Télécharger le fichier</a>.
</video>

<audio controls preload="none">
  <source src="assets/audio/interview.ogg" type="audio/ogg">
  <source src="assets/audio/interview.mp3" type="audio/mpeg">
  Transcription disponible plus bas.
</audio>`
        },
        {
          type: "callout",
          tone: "danger",
          title: "`autoplay` et l'absence de sous-titres",
          text: "La lecture automatique avec son est bloquée par tous les navigateurs modernes : elle ne fonctionne qu'en mode muet (`autoplay muted`), ce qui n'a presque aucun intérêt pédagogique. Et une vidéo sans `track` de sous-titres est inaccessible aux personnes sourdes, aux utilisateurs dans un train bruyant et aux moteurs de recherche. Le fichier `.vtt` s'écrit à la main : quelques lignes suffisent.",
          items: [
            "Jamais d'`autoplay` sonore : l'utilisateur garde la main",
            "Un fichier `track` par langue, avec `srclang` et `label`",
            "Un texte de repli lisible pour les vieux navigateurs"
          ]
        },
        { type: "h", level: 2, text: "`iframe` : intégrer un tiers" },
        {
          type: "p",
          text: "Une `iframe` charge un **document entier** dans un cadre : lecteur vidéo, carte, formulaire de paiement. Trois attributs font la différence. `title` décrit le contenu du cadre (sans lui, un lecteur d'écran annonce « cadre »), `loading='lazy'` évite de charger la vidéo tant qu'elle est hors écran — c'est souvent plusieurs centaines de kilo-octets économisés — et `sandbox` retire au contenu intégré des droits (accès au cookie, redirection de la page parente), à réactiver un par un si nécessaire. Pour un PDF ou un contenu obsolète, `object` et `embed` existent encore, mais un simple lien reste plus fiable, plus accessible et fonctionne partout."
        },
        {
          type: "code",
          lang: "html",
          caption: "Intégration vidéo externe prudente, et alternative au PDF embarqué.",
          code: `<!-- lecteur externe : title obligatoire, sandbox et lazy par défaut -->
<iframe
  src="https://www.youtube-nocookie.com/embed/ID_VIDEO"
  title="Tutoriel : structurer une page en HTML"
  width="560" height="315"
  loading="lazy"
  allow="encrypted-media; picture-in-picture"
  allowfullscreen></iframe>

<!-- un document : le lien direct est souvent la meilleure intégration -->
<p><a href="assets/docs/guide.pdf">Lire le guide HTML (PDF, 1,2 Mo)</a></p>`
        },
        { type: "h", level: 2, text: "SVG : inline ou fichier ?" },
        {
          type: "p",
          text: "Un SVG inline est inséré directement dans le HTML : ses formes sont des éléments du DOM, donc stylables en CSS (couleur au survol), animables et lisibles par le JavaScript. En contrepartie, il alourdit le HTML et n'est pas mis en cache séparément. Un SVG placé dans une `img` est mis en cache, ne pollue pas le DOM, mais ne peut plus être recoloré en CSS. Règle pratique : icône de bouton qui doit changer de couleur au survol → inline ; logo ou illustration statique → `img`. Dans tous les cas, un SVG porteur de sens a besoin d'un texte alternatif."
        },
        {
          type: "demo",
          title: "Un SVG animé uniquement en CSS",
          height: 320,
          html: `<figure class="scene">
  <svg viewBox="0 0 200 120" width="100%" height="130">
    <rect class="ciel" x="0" y="0" width="200" height="120" rx="10"></rect>
    <circle class="soleil" cx="64" cy="46" r="17"></circle>
    <path class="vague" d="M0 92 Q25 76 50 92 T100 92 T150 92 T200 92"></path>
    <path class="vague deux" d="M0 106 Q25 92 50 106 T100 106 T150 106 T200 106"></path>
  </svg>
  <figcaption>Chaque forme est un élément du HTML, stylé et animé en CSS.</figcaption>
</figure>`,
          css: `body{font-family:system-ui,-apple-system,sans-serif;margin:0;padding:16px;background:#fffdfa;color:#16202b}
figure{margin:0}
.ciel{fill:#16202b}
.soleil{fill:#f0b429;transform-box:fill-box;transform-origin:center;animation:pulse 3s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
.vague{fill:none;stroke:#e34f26;stroke-width:3;stroke-linecap:round}
.vague.deux{stroke:#f0b429;stroke-width:2;opacity:.7;animation:glisse 4s ease-in-out infinite}
@keyframes glisse{0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}}
figcaption{font-size:13px;color:#5b6672;margin-top:8px}`,
          js: ``
        },
        { type: "h", level: 2, text: "`picture`, `srcset`, `sizes`" },
        {
          type: "code",
          lang: "html",
          caption: "Plusieurs formats, puis plusieurs largeurs : le navigateur choisit.",
          code: `<!-- formats modernes avec repli JPEG -->
<picture>
  <source srcset="assets/photos/plage.avif" type="image/avif">
  <source srcset="assets/photos/plage.webp" type="image/webp">
  <img src="assets/photos/plage.jpg" alt="Pirogues échouées sur la plage de Ndayane"
       width="800" height="533" loading="lazy">
</picture>

<!-- même image en trois largeurs : 400w, 800w, 1600w -->
<img
  src="assets/photos/plage-800.jpg"
  srcset="assets/photos/plage-400.jpg 400w,
          assets/photos/plage-800.jpg 800w,
          assets/photos/plage-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Pirogues échouées sur la plage de Ndayane" width="800" height="533" loading="lazy">`
        },
        {
          type: "checklist",
          items: [
            "Mes vidéos ont `controls`, un `poster` et au moins deux `source`",
            "Chaque `iframe` a un `title` et, si possible, `loading='lazy'`",
            "Je sais justifier le choix entre SVG inline et SVG en `img`",
            "Mes images servent `avif` ou `webp` quand c'est possible",
            "Aucun média ne démarre tout seul avec du son"
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-17",
          title: "Une vidéo utilisable par tout le monde",
          difficulty: 1,
          goal: "Configurer une vidéo avec commandes, image d'attente, deux formats et sous-titres.",
          instructions: [
            "Ajoutez l'attribut `controls` et un `poster` valant `assets/poster-demo.webp`.",
            "Retirez l'attribut `src` de la balise `video` et déclarez deux `source` : `assets/demo.webm` en `video/webm` puis `assets/demo.mp4` en `video/mp4`.",
            "Ajoutez une piste `track` avec `kind=\"captions\"`, `srclang=\"fr\"`, `label=\"Français\"` et `default`.",
            "Ajoutez un texte de repli lisible entre les balises `video`."
          ],
          hint: "Une balise `video` avec `src` direct n'a pas de repli de format : ce sont les `source` qui permettent au navigateur de choisir ce qu'il sait lire.",
          starter: {
            html: `<h1>Démonstration</h1>
<video src="assets/demo.mp4"></video>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Démonstration</h1>
<video controls poster="assets/poster-demo.webp" width="640">
  <source src="assets/demo.webm" type="video/webm">
  <source src="assets/demo.mp4" type="video/mp4">
  <track kind="captions" src="assets/demo.vtt" srclang="fr" label="Français" default>
  Votre navigateur ne lit pas cette vidéo.
</video>`,
            css: "",
            js: ""
          },
          checks: [
            `!!document.querySelector('video[controls]')`,
            `(getAttr('video','poster') || '').includes('poster-demo')`,
            `countOf('video source') === 2 && !document.querySelector('video[src]')`,
            `!!document.querySelector('video track[kind="captions"][srclang="fr"]')`,
            `getAttr('video source','type') === 'video/webm'`
          ],
          checklist: [
            "`controls` et un `poster` sur la vidéo",
            "Deux `source` et plus de `src` sur `video`",
            "Une piste de sous-titres en français",
            "Un texte de repli entre les balises"
          ]
        },
        {
          id: "html-ex-18",
          title: "Image responsive avec `picture`",
          difficulty: 2,
          goal: "Servir un format moderne quand c'est possible, un JPEG sinon, et laisser le navigateur choisir la largeur.",
          instructions: [
            "Enveloppez l'image dans un élément `picture`.",
            "Ajoutez deux `source` : d'abord un AVIF (`type=\"image/avif\"`, `srcset=\"assets/photos/atelier.avif\"`), puis un WebP (`type=\"image/webp\"`, `srcset=\"assets/photos/atelier.webp\"`).",
            "L'`img` de secours doit garder un `alt` descriptif, `width=\"800\"`, `height=\"533\"` et `loading=\"lazy\"`.",
            "Ajoutez sur cet `img` un `srcset` contenant trois variantes en `400w`, `800w` et `1600w`, et un attribut `sizes`."
          ],
          hint: "L'`img` reste obligatoire même avec `picture` : c'est lui qui affiche l'image et qui porte l'`alt`. `picture` ne fait que proposer des sources au navigateur.",
          starter: {
            html: `<h1>L'atelier</h1>
<img src="assets/photos/atelier.jpg" alt="Atelier">`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>L'atelier</h1>
<picture>
  <source srcset="assets/photos/atelier.avif" type="image/avif">
  <source srcset="assets/photos/atelier.webp" type="image/webp">
  <img src="assets/photos/atelier-800.jpg"
       srcset="assets/photos/atelier-400.jpg 400w,
               assets/photos/atelier-800.jpg 800w,
               assets/photos/atelier-1600.jpg 1600w"
       sizes="(max-width: 600px) 100vw, 800px"
       alt="Deux personnes assemblant un meuble dans un atelier lumineux"
       width="800" height="533" loading="lazy">
</picture>`,
            css: "",
            js: ""
          },
          checks: [
            `!!document.querySelector('picture > img')`,
            `countOf('picture source') === 2`,
            `getAttr('picture source','type') === 'image/avif'`,
            `(getAttr('picture img','srcset') || '').includes('800w')`,
            `!!getAttr('picture img','sizes') && getAttr('picture img','loading') === 'lazy'`
          ],
          checklist: [
            "`picture` contient deux `source` et une `img`",
            "Les formats sont AVIF puis WebP",
            "Un `srcset` avec trois largeurs et un `sizes`",
            "L'`img` garde dimensions, `alt` et `loading='lazy'`"
          ]
        }
      ]
    },
    {
      id: "html-09",
      title: "Accessibilité et SEO de base",
      minutes: 40,
      summary: "Rendre une page utilisable par tous et compréhensible par les robots : titres, alternatives, contraste, ARIA utile et métadonnées de partage.",
      objectives: [
        "Vérifier un plan de titres et des textes alternatifs pertinents",
        "Assurer un contraste lisible et un focus toujours visible",
        "Utiliser les quatre attributs ARIA qui servent vraiment au quotidien",
        "Écrire les métadonnées de référencement et de partage social"
      ],
      content: [
        {
          type: "lead",
          text: "L'accessibilité n'est pas une option pour 2 % des utilisateurs : c'est la qualité par défaut d'une page. Un site accessible est aussi un site mieux référencé, parce que les moteurs de recherche lisent exactement ce que lisent les technologies d'assistance."
        },
        { type: "h", level: 2, text: "Le socle : titres et alternatives" },
        {
          type: "p",
          text: "Deux gestes gratuits font 80 % du travail. D'abord un plan de titres propre : c'est la seule table des matières que peuvent lire un lecteur d'écran et un robot d'indexation. Ensuite des alternatives textuelles : un `alt` descriptif pour chaque image porteuse d'information, un `alt` vide pour les images décoratives, et un texte significatif pour chaque lien et chaque bouton — « Envoyer » et non « OK », « Rechercher » et non une loupe sans libellé."
        },
        {
          type: "callout",
          tone: "danger",
          title: "ARIA ne répare pas une mauvaise structure",
          text: "La première règle d'ARIA est de ne pas utiliser ARIA : une balise HTML native apporte gratuitement le rôle, l'état et le comportement clavier. Un `<div role='button' tabindex='0'>` n'écoute pas `Entrée`, ne se soumet pas avec un formulaire et n'apparaît pas dans la navigation des formulaires ; un `<button>` fait tout cela sans une ligne de JavaScript. N'ajoutez de l'ARIA que quand le HTML ne sait pas exprimer la chose.",
          items: [
            "Jamais d'`aria-label` pour compenser un `alt` oublié",
            "Jamais de `role` pour imiter une balise native existante",
            "Une image décorative est `alt=\"\"`, pas `alt=\"image décorative\"`"
          ]
        },
        { type: "h", level: 2, text: "Contraste et focus" },
        {
          type: "p",
          text: "Le texte courant doit atteindre un rapport de contraste d'au moins **4,5:1** avec son fond (3:1 pour les grands textes de 24 pixels et plus). Un gris clair sur blanc est un classique du genre « joli mais illisible ». Le **focus** est l'autre moitié de l'accessibilité : supprimer `outline` sans le remplacer condamne les utilisateurs du clavier à naviguer à l'aveugle. On garde donc un contour net, et on utilise `:focus-visible` pour ne l'afficher que lorsque la navigation se fait au clavier — plus de contour disgracieux à la souris, mais un contour franc au clavier."
        },
        {
          type: "demo",
          title: "Lien d'évitement et focus visible",
          height: 300,
          html: `<a class="saut" href="#contenu">Aller au contenu principal</a>
<nav>
  <a href="index.html">Accueil</a>
  <a href="contact.html">Contact</a>
</nav>
<main id="contenu">
  <h1>Contraste et focus</h1>
  <p>Cliquez dans l'aperçu puis appuyez plusieurs fois sur <kbd>Tab</kbd> : le lien d'évitement apparaît dès le premier appui.</p>
  <button type="button">Un bouton</button>
</main>`,
          css: `body{font-family:system-ui,-apple-system,sans-serif;margin:0;padding:16px;color:#16202b;background:#fffdfa;line-height:1.5}
.saut{position:absolute;left:-9999px;top:0;background:#a63a15;color:#fff;padding:9px 16px;border-radius:0 0 8px 0;font-weight:600;text-decoration:none;z-index:3}
.saut:focus{left:0}
nav{display:flex;gap:14px;margin:0 0 14px}
a{color:#0b57a4}
a:focus-visible,button:focus-visible{outline:3px solid #0b57a4;outline-offset:3px}
button{font:inherit;padding:7px 14px;border:1px solid #16202b;background:#fff;border-radius:6px;cursor:pointer}
h1{font-size:20px;margin:0 0 8px;color:#a63a15}
p{font-size:14px;margin:0 0 12px}
kbd{border:1px solid #c9c0b7;border-bottom-width:2px;border-radius:4px;padding:1px 6px;font-family:ui-monospace,monospace;font-size:12px;background:#f7f2ec}`,
          js: ``
        },
        { type: "h", level: 2, text: "Les quatre attributs ARIA utiles" },
        {
          type: "table",
          head: ["Attribut ou rôle", "À quoi il sert", "Exemple concret"],
          rows: [
            ["`aria-label`", "Nommer un élément qui n'a pas de texte visible", "`nav aria-label='Navigation principale'` quand deux `nav` cohabitent"],
            ["`aria-labelledby`", "Nommer un élément en pointant vers un titre existant", "`section aria-labelledby='t-services'` avec un `h2 id='t-services'`"],
            ["`aria-expanded`", "Indiquer si une zone repliable est ouverte", "`button aria-expanded='false' aria-controls='menu'`"],
            ["`role`", "Préciser un rôle que le HTML ne peut pas exprimer", "`div role='alert'` pour un message d'erreur annoncé immédiatement"]
          ]
        },
        {
          type: "code",
          lang: "html",
          caption: "Le trio d'une bonne page : lien d'évitement, navigation nommée, bouton dépliant annoncé.",
          code: `<!-- premier élément focusable : il permet de sauter la navigation -->
<a class="saut" href="#contenu">Aller au contenu principal</a>

<header>
  <nav aria-label="Navigation principale">
    <ul>
      <li><a href="index.html">Accueil</a></li>
      <li><a href="services.html">Services</a></li>
    </ul>
  </nav>

  <button type="button" id="menu-bouton" aria-expanded="false" aria-controls="menu-mobile">
    Menu
  </button>
  <ul id="menu-mobile" hidden>
    <li><a href="index.html">Accueil</a></li>
  </ul>
</header>

<main id="contenu">
  <h1>Bienvenue</h1>
</main>`
        },
        { type: "h", level: 2, text: "SEO de base : métadonnées et partage" },
        {
          type: "p",
          text: "Le référencement technique tient en quelques balises. Un `title` unique de 50 à 60 caractères, une `meta description` de 150 à 160 caractères qui donne envie de cliquer (elle n'influence pas le classement, mais le taux de clic), une `link rel='canonical'` pour éviter les doublons, et les balises **Open Graph** (`og:title`, `og:description`, `og:image`) qui décident de l'aperçu affiché sur les réseaux sociaux. On ajoute `meta name='robots' content='noindex'` sur un site en préproduction pour ne pas polluer l'index, et des **données structurées JSON-LD** pour décrire une personne, une recette ou un produit — c'est ce qui alimente les résultats enrichis de Google."
        },
        {
          type: "code",
          lang: "html",
          caption: "Un `head` prêt pour la recherche et pour les réseaux sociaux.",
          code: `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Camille Diallo — Développeuse front-end à Dakar</title>
  <meta name="description" content="Portfolio de Camille Diallo : sites accessibles, rapides et bien référencés. HTML, CSS et JavaScript.">
  <link rel="canonical" href="https://exemple.com/">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Camille Diallo — Développeuse front-end">
  <meta property="og:description" content="Sites accessibles et rapides, en HTML, CSS et JavaScript.">
  <meta property="og:image" content="https://exemple.com/assets/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Camille Diallo",
    "jobTitle": "Développeuse front-end",
    "url": "https://exemple.com/"
  }
  </script>
</head>`
        },
        {
          type: "checklist",
          items: [
            "Un plan de titres qui se lit comme un sommaire",
            "Un `alt` pertinent par image, vide si décorative",
            "Un contraste d'au moins 4,5:1 pour le texte courant",
            "Un focus visible partout, jamais supprimé sans remplacement",
            "`title`, `description` et une image Open Graph uniques"
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-19",
          title: "Alternatives textuelles d'une galerie",
          difficulty: 1,
          goal: "Traiter deux images différemment selon leur rôle et garder un plan de titres valide.",
          instructions: [
            "La première image est informative : donnez-lui un `alt` descriptif d'au moins 20 caractères (jamais le nom du fichier).",
            "La seconde image est purement décorative : donnez-lui un `alt` **vide**.",
            "La page ne doit contenir qu'un seul `h1`.",
            "Chaque image doit posséder un attribut `alt` (même vide)."
          ],
          hint: "Un `alt` vide s'écrit `alt=\"\"` : l'image est alors ignorée par le lecteur d'écran, ce qui est exactement le comportement voulu pour un motif de décoration.",
          starter: {
            html: `<h1>Galerie</h1>
<img src="assets/photo-1.jpg" alt="photo-1.jpg">
<img src="assets/motif.svg" alt="motif">
<img src="assets/photo-2.jpg">`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Galerie</h1>
<img src="assets/photo-1.jpg" alt="Une pirogue bleue et jaune échouée sur le sable au coucher du soleil">
<img src="assets/motif.svg" alt="">
<img src="assets/photo-2.jpg" alt="Marché coloré de Dakar vu depuis une terrasse">`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('h1') === 1`,
            `countOf('img') === 3 && [...document.querySelectorAll('img')].every(i => i.hasAttribute('alt'))`,
            `[...document.querySelectorAll('img')].filter(i => (i.getAttribute('alt') || '').length >= 20).length >= 2`,
            `[...document.querySelectorAll('img')].some(i => i.getAttribute('alt') === '')`
          ],
          checklist: [
            "Un seul `h1`",
            "Trois images, toutes avec `alt`",
            "Deux descriptions utiles, une image décorative en `alt=\"\"`"
          ]
        },
        {
          id: "html-ex-20",
          title: "Lien d'évitement et bouton dépliant",
          difficulty: 2,
          goal: "Ajouter un lien d'évitement, annoncer l'état d'un menu replié et le faire changer au clic.",
          instructions: [
            "Donnez à `main` l'identifiant `contenu` et ajoutez, avant le `header`, un lien dont le `href` est `#contenu` et le texte « Aller au contenu ».",
            "Donnez au `ul` l'identifiant `menu` et ajoutez-lui l'attribut `hidden`.",
            "Sur le bouton, ajoutez `aria-expanded=\"false\"` et `aria-controls=\"menu\"`.",
            "En JavaScript, un clic sur le bouton doit inverser `aria-expanded` (`false` → `true`) et retirer l'attribut `hidden` du menu."
          ],
          hint: "L'état affiché à l'utilisateur et l'attribut `aria-expanded` doivent raconter la même histoire : si le menu est masqué, `aria-expanded` vaut `false`.",
          starter: {
            html: `<header>
  <button type="button" id="menu-bouton">Menu</button>
  <ul id="menu">
    <li><a href="index.html">Accueil</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</header>
<main>
  <h1>Page d'accueil</h1>
</main>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<a href="#contenu">Aller au contenu</a>

<header>
  <button type="button" id="menu-bouton" aria-expanded="false" aria-controls="menu">Menu</button>
  <ul id="menu" hidden>
    <li><a href="index.html">Accueil</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</header>

<main id="contenu">
  <h1>Page d'accueil</h1>
</main>`,
            css: "",
            js: `const bouton = document.getElementById('menu-bouton');
const menu = document.getElementById('menu');

bouton.addEventListener('click', () => {
  const ouvert = bouton.getAttribute('aria-expanded') === 'true';
  bouton.setAttribute('aria-expanded', ouvert ? 'false' : 'true');
  if (ouvert) {
    menu.setAttribute('hidden', '');
  } else {
    menu.removeAttribute('hidden');
  }
});`
          },
          checks: [
            `!!document.querySelector('a[href="#contenu"]') && !!document.querySelector('main#contenu')`,
            `getAttr('#menu-bouton','aria-expanded') === 'false' && getAttr('#menu-bouton','aria-controls') === 'menu'`,
            `(() => { const b = document.querySelector('#menu-bouton'); if (!b) return false; const avant = b.getAttribute('aria-expanded'); b.click(); const apres = b.getAttribute('aria-expanded'); return avant === 'false' && apres === 'true' && !document.getElementById('menu').hasAttribute('hidden'); })()`
          ],
          checklist: [
            "Un lien d'évitement en tête de page vers `#contenu`",
            "`aria-expanded=\"false\"` et `aria-controls` sur le bouton",
            "Un clic ouvre le menu et passe l'état à `true`"
          ]
        },
        {
          id: "html-ex-21",
          title: "Un `head` prêt pour la recherche et le partage",
          difficulty: 3,
          goal: "Compléter les métadonnées d'une page : titre, description, Open Graph, Twitter et données structurées.",
          instructions: [
            "Écrivez un `title` d'au moins 20 caractères qui contient « Camille Diallo ».",
            "Ajoutez une `meta name=\"description\"` dont le contenu fait au moins 60 caractères.",
            "Ajoutez les trois balises Open Graph : `og:title`, `og:description` et `og:image` (attribut `property`).",
            "Ajoutez `meta name=\"twitter:card\"` avec la valeur `summary_large_image`.",
            "Ajoutez un bloc `script type=\"application/ld+json\"` qui contient `https://schema.org` et le nom de la personne."
          ],
          hint: "Les métadonnées vivent dans le `head`, mais leur contenu se lit avec l'attribut `content` : c'est lui qui porte le texte utile.",
          starter: {
            html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Mon site</title>
</head>
<body>
  <h1>Camille Diallo</h1>
  <p>Développeuse front-end à Dakar.</p>
</body>
</html>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Camille Diallo — Développeuse front-end à Dakar</title>
  <meta name="description" content="Portfolio de Camille Diallo : sites accessibles, rapides et bien référencés, réalisés en HTML, CSS et JavaScript.">

  <meta property="og:title" content="Camille Diallo — Développeuse front-end">
  <meta property="og:description" content="Sites accessibles et rapides, en HTML, CSS et JavaScript.">
  <meta property="og:image" content="https://exemple.com/assets/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Camille Diallo",
    "jobTitle": "Développeuse front-end"
  }
  </script>
</head>
<body>
  <h1>Camille Diallo</h1>
  <p>Développeuse front-end à Dakar.</p>
</body>
</html>`,
            css: "",
            js: ""
          },
          checks: [
            `(getText('title') || '').toLowerCase().includes('camille diallo')`,
            `(getAttr('meta[name="description"]','content') || '').length >= 60`,
            `!!getAttr('meta[property="og:title"]','content') && !!getAttr('meta[property="og:description"]','content') && !!getAttr('meta[property="og:image"]','content')`,
            `getAttr('meta[name="twitter:card"]','content') === 'summary_large_image'`,
            `(() => { const s = document.querySelector('script[type="application/ld+json"]'); return !!s && s.textContent.includes('schema.org') && s.textContent.toLowerCase().includes('camille'); })()`
          ],
          checklist: [
            "Un `title` long et nominatif",
            "Une description de plus de 60 caractères",
            "Trois balises Open Graph complètes",
            "La carte Twitter et un JSON-LD valide"
          ]
        }
      ]
    },
    {
      id: "html-10",
      title: "Bonnes pratiques et mini-projet",
      minutes: 50,
      summary: "Valider, nommer, commenter, publier — puis assembler tout le module dans une page profil complète.",
      objectives: [
        "Valider un document avec le validateur du W3C et corriger les erreurs les plus fréquentes",
        "Nommer et ranger ses fichiers pour que les chemins restent prévisibles",
        "Écrire des commentaires qui aident vraiment",
        "Livrer une page profil sémantique, accessible et prête à publier"
      ],
      content: [
        {
          type: "lead",
          text: "Le HTML ne se compile pas : une erreur ne bloque rien, elle se cache. Le navigateur devine, corrige, referme les balises à votre place — et le résultat n'est pas toujours celui que vous croyez. La validation est la seule façon de savoir ce que vous avez réellement écrit."
        },
        { type: "h", level: 2, text: "Un code valide, d'abord" },
        {
          type: "p",
          text: "Le validateur du W3C signale chaque erreur **avec son numéro de ligne** : balise non fermée, attribut dupliqué, `id` déjà utilisé, élément interdit à cet endroit, guillemet manquant. Une page invalide n'est pas seulement « sale » : le navigateur reconstruit l'arbre à sa manière, ce qui explique la plupart des bugs CSS incompréhensibles (« pourquoi cette marge s'applique-t-elle à toute la page ? » — parce qu'un `</div>` manquant a changé la structure). Validez tôt, corrigez par le haut de la liste : les erreurs suivantes sont souvent des conséquences de la première."
        },
        {
          type: "compare",
          left: {
            title: "Invalide — trois erreurs pour le prix d'une",
            lang: "html",
            code: `<p>Bonjour <b>le monde
<img src=photo.jpg>
<div>fin`
          },
          right: {
            title: "Valide — chaque balise ouverte est refermée",
            lang: "html",
            code: `<p>Bonjour <strong>le monde</strong></p>
<img src="photo.jpg" alt="Portrait de Camille Diallo">
<p>fin</p>`
          },
          text: "À gauche : un `p` jamais fermé, un attribut sans guillemets, un `alt` absent et une `div` ouverte pour rien. Les guillemets ne sont pas décoratifs : `src=photo.jpg` fonctionne, mais se casse dès que la valeur contient un espace."
        },
        {
          type: "callout",
          tone: "warning",
          title: "Les quatre erreurs les plus fréquentes",
          text: "Elles reviennent dans quasiment tous les premiers projets. Un passage de validateur avant chaque fin de séance suffit à les éliminer.",
          items: [
            "Un `id` en double dans la page (souvent un copier-coller de champ de formulaire)",
            "Une balise non fermée qui avale tout le contenu suivant",
            "Un `alt` manquant sur une image informative",
            "Deux `main` ou deux `h1` dans la même page"
          ]
        },
        { type: "h", level: 2, text: "Nommer, ranger, commenter" },
        {
          type: "code",
          lang: "text",
          caption: "Minuscules, tirets, pas d'accents ni d'espaces : un nom qui survivra à tous les serveurs.",
          code: `projet/
├── index.html
├── contact.html
├── assets/
│   ├── styles.css
│   ├── images/
│   │   ├── photo-portrait.webp
│   │   └── favicon.svg
│   └── docs/
│       └── cv.pdf
└── README.md`
        },
        {
          type: "compare",
          left: {
            title: "Commentaire inutile — il répète le code",
            lang: "html",
            code: `<!-- div avec la classe hero -->
<div class="hero">
  <!-- titre -->
  <h1>Bienvenue</h1>
</div>`
          },
          right: {
            title: "Commentaire utile — il explique le pourquoi",
            lang: "html",
            code: `<!-- Cible du lien « Accueil » du menu : ne pas renommer sans mettre à jour header -->
<div class="hero" id="hero">
  <h1>Bienvenue</h1>
</div>`
          },
          text: "Un bon commentaire répond à « pourquoi », jamais à « quoi ». Le code mort (un bloc commenté « au cas où ») doit être supprimé : Git garde l'historique, votre fichier n'a pas à le faire."
        },
        { type: "h", level: 2, text: "SEO technique et publication" },
        {
          type: "list",
          ordered: true,
          items: [
            "Un `title` et une `meta description` uniques pour chaque page",
            "Un seul `h1` par page, un plan de titres continu",
            "Images en AVIF ou WebP, `width`/`height` renseignés, `loading='lazy'` sous la ligne de flottaison",
            "Un `robots.txt` et un `sitemap.xml` à la racine du site",
            "`meta name='robots' content='noindex'` sur la préproduction, jamais en production"
          ]
        },
        { type: "h", level: 2, text: "Le mini-projet : page profil" },
        {
          type: "steps",
          items: [
            { title: "Croquis et contenu réel", text: "Notez les zones sur papier : bandeau, présentation, compétences, contact. Écrivez les textes avant le code." },
            { title: "Squelette sémantique", text: "Un `header`, un `main` unique, un `footer`. Un `h1`, puis des `h2` par section." },
            { title: "Contenus", text: "Photo avec `alt` et dimensions, liste de compétences, liens de contact avec un texte explicite." },
            { title: "Accessibilité", text: "Lien d'évitement, `main` doté d'un `id`, `nav` nommé avec `aria-label`, focus visible en CSS." },
            { title: "Référencement", text: "`title`, `description` et image Open Graph. Les chemins de fichiers restent relatifs et en minuscules." },
            { title: "Validation et livraison", text: "Passage au validateur W3C, aucun `id` en double, puis mise en ligne du dossier tel quel." }
          ]
        },
        {
          type: "code",
          lang: "html",
          caption: "La page profil finale : la structure réutilisée par le projet de fin de formation.",
          code: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Camille Diallo — Développeuse front-end</title>
  <meta name="description" content="Portfolio de Camille Diallo, développeuse front-end à Dakar : HTML, CSS et JavaScript.">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
  <!-- Lien d'évitement : première cible du clavier -->
  <a href="#contenu">Aller au contenu</a>

  <header>
    <img src="assets/images/photo-portrait.webp"
         alt="Portrait de Camille Diallo devant un mur peint en ocre"
         width="160" height="160">
    <h1>Camille Diallo</h1>
    <p>Développeuse front-end — Dakar</p>

    <nav aria-label="Navigation principale">
      <ul>
        <li><a href="#apropos">À propos</a></li>
        <li><a href="#competences">Compétences</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="contenu">
    <section id="apropos">
      <h2>À propos</h2>
      <p>Je construis des pages accessibles et rapides depuis quatre ans, en HTML sémantique et CSS moderne.</p>
    </section>

    <section id="competences">
      <h2>Compétences</h2>
      <ul>
        <li>HTML sémantique et accessibilité</li>
        <li>CSS moderne (Flexbox, Grid)</li>
        <li>JavaScript côté navigateur</li>
      </ul>
    </section>
  </main>

  <footer id="contact">
    <h2>Contact</h2>
    <p><a href="mailto:bonjour@exemple.com">Écrire un e-mail</a></p>
    <p><a href="index.html">Retour à l'accueil</a></p>
  </footer>
</body>
</html>`
        },
        {
          type: "checklist",
          items: [
            "La page passe le validateur du W3C sans erreur",
            "Aucun `id` en double, un seul `main`, un seul `h1`",
            "Chaque image a un `alt`, chaque lien un texte explicite",
            "Les noms de fichiers sont en minuscules, sans espace ni accent",
            "`title`, `description` et Open Graph sont renseignés",
            "Le clavier permet d'atteindre et de voir tous les éléments interactifs"
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-22",
          title: "Passer une page au crible",
          difficulty: 1,
          goal: "Corriger les défauts qu'un validateur signalerait : `id` en double, champ mal typé, image sans alternative.",
          instructions: [
            "Les deux champs portent le même `id` : donnez l'identifiant `email2` au second et corrigez le `label` correspondant.",
            "Le premier champ doit être de `type=\"email\"`.",
            "Le logo décoratif doit avoir un `alt` vide.",
            "Aucun `id` ne doit être dupliqué dans la page."
          ],
          hint: "Un `id` doit être unique dans toute la page : c'est ce qui permet à `for` de désigner le bon champ et à `#ancre` de viser le bon élément.",
          starter: {
            html: `<h1>Inscription</h1>
<form action="/inscription" method="post">
  <label for="email">E-mail</label>
  <input type="text" id="email" name="email">

  <label for="email">Confirmer l'e-mail</label>
  <input type="text" id="email" name="email2">

  <img src="assets/logo.svg">
</form>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<h1>Inscription</h1>
<form action="/inscription" method="post">
  <label for="email">E-mail</label>
  <input type="email" id="email" name="email">

  <label for="email2">Confirmer l'e-mail</label>
  <input type="email" id="email2" name="email2">

  <img src="assets/logo.svg" alt="">
</form>`,
            css: "",
            js: ""
          },
          checks: [
            `(() => { const ids = [...document.querySelectorAll('[id]')].map(e => e.id); return ids.length > 0 && ids.length === new Set(ids).size; })()`,
            `!!document.querySelector('input[type="email"]')`,
            `!!document.querySelector('#email2') && !!document.querySelector('label[for="email2"]')`,
            `getAttr('img','alt') === ''`
          ],
          checklist: [
            "Deux `id` différents",
            "Le `label` du second champ pointe sur `email2`",
            "Au moins un champ de type `email`",
            "Un `alt` vide sur le logo décoratif"
          ]
        },
        {
          id: "html-ex-23",
          title: "Page profil — étape 1 : le squelette",
          difficulty: 2,
          goal: "Construire le squelette sémantique de la page profil du mini-projet.",
          instructions: [
            "Placez la photo et le `h1` ensemble dans un `header` placé en haut de la page.",
            "Placez la présentation et la liste des compétences dans un `main` unique.",
            "Mettez la liste dans une `section` dont le `h2` est « Compétences ».",
            "Ajoutez un `footer` qui contient le lien de contact.",
            "La photo doit avoir un `alt` descriptif d'au moins 20 caractères."
          ],
          hint: "Le `footer` se place après le `main` : il sort du contenu principal. Un `main` ne contient jamais le `header` de la page ni son pied de page.",
          starter: {
            html: `<h1>Camille Diallo</h1>
<img src="assets/images/photo-portrait.webp">
<p>Développeuse front-end à Dakar.</p>
<ul>
  <li>HTML sémantique</li>
  <li>CSS moderne</li>
</ul>
<a href="mailto:bonjour@exemple.com">Écrire un e-mail</a>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<header>
  <img src="assets/images/photo-portrait.webp"
       alt="Portrait de Camille Diallo devant un mur peint en ocre"
       width="160" height="160">
  <h1>Camille Diallo</h1>
</header>

<main>
  <p>Développeuse front-end à Dakar.</p>

  <section>
    <h2>Compétences</h2>
    <ul>
      <li>HTML sémantique</li>
      <li>CSS moderne</li>
    </ul>
  </section>
</main>

<footer>
  <a href="mailto:bonjour@exemple.com">Écrire un e-mail</a>
</footer>`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('header') === 1 && !!document.querySelector('header > h1')`,
            `countOf('main') === 1 && !!document.querySelector('main > section > h2')`,
            `!!document.querySelector('main section ul > li')`,
            `!!document.querySelector('footer a[href^="mailto:"]')`,
            `(getAttr('header img','alt') || '').length >= 20`
          ],
          checklist: [
            "Un `header` avec la photo et le `h1`",
            "Un `main` unique contenant la `section` intitulée Compétences",
            "Un `footer` avec le lien de contact",
            "Un `alt` long sur la photo"
          ]
        },
        {
          id: "html-ex-24",
          title: "Page profil — le livrable complet",
          difficulty: 3,
          goal: "Assembler tout le module : structure sémantique, sections, liste, liens explicites, lien d'évitement et cible de contenu.",
          instructions: [
            "La page doit contenir un `header`, un `main` et un `footer`, avec un seul `h1`.",
            "Dans le `main` : deux `section`, chacune avec un `h2` — « À propos » (un paragraphe) et « Compétences » (une liste `ul` de trois éléments).",
            "Donnez à `main` l'identifiant `contenu` et ajoutez en tête de document un lien dont le `href` est `#contenu`.",
            "Le `footer` doit contenir un lien `mailto:` et un lien vers `index.html`.",
            "Tous les liens doivent avoir un texte d'au moins 6 caractères."
          ],
          hint: "C'est la structure exacte de la page profil présentée dans la leçon : recopiez-la de mémoire, puis vérifiez chaque balise fermée avant de lancer les vérifications.",
          starter: {
            html: `<header>
  <h1>Camille Diallo</h1>
</header>
<main>
  <p>Développeuse front-end à Dakar.</p>
  <ul>
    <li>HTML sémantique</li>
  </ul>
</main>
<footer>
  <a href="mailto:bonjour@exemple.com">Écrire</a>
</footer>`,
            css: "",
            js: ""
          },
          solution: {
            html: `<a href="#contenu">Aller au contenu</a>

<header>
  <img src="assets/images/photo-portrait.webp"
       alt="Portrait de Camille Diallo devant un mur peint en ocre"
       width="160" height="160">
  <h1>Camille Diallo</h1>
  <p>Développeuse front-end — Dakar</p>
</header>

<main id="contenu">
  <section>
    <h2>À propos</h2>
    <p>Je construis des pages accessibles et rapides depuis quatre ans.</p>
  </section>

  <section>
    <h2>Compétences</h2>
    <ul>
      <li>HTML sémantique et accessibilité</li>
      <li>CSS moderne</li>
      <li>JavaScript côté navigateur</li>
    </ul>
  </section>
</main>

<footer>
  <h2>Contact</h2>
  <p><a href="mailto:bonjour@exemple.com">Écrire un e-mail</a></p>
  <p><a href="index.html">Retour à l'accueil</a></p>
</footer>`,
            css: "",
            js: ""
          },
          checks: [
            `countOf('h1') === 1 && countOf('header') === 1 && countOf('main') === 1 && countOf('footer') === 1`,
            `countOf('main section') === 2 && countOf('main section h2') === 2`,
            `countOf('main ul > li') >= 3`,
            `!!document.querySelector('footer a[href^="mailto:"]') && !!document.querySelector('a[href="index.html"]')`,
            `!!document.querySelector('a[href="#contenu"]') && !!document.querySelector('main#contenu') && [...document.querySelectorAll('a')].every(a => a.textContent.trim().length >= 6)`
          ],
          checklist: [
            "Un `header`, un `main`, un `footer`, un `h1`",
            "Deux `section` titrées dans le `main`",
            "Une liste de trois compétences",
            "Un lien d'évitement vers `main#contenu` et des liens explicites"
          ]
        }
      ]
    }
  ],
  quiz: {
    title: "Quiz — HTML",
    pass: 0.75,
    questions: [
      {
        q: "Quelle balise délimite l'unique contenu principal de la page ?",
        options: ["`<section>`", "`<main>`", "`<article>`", "`<div>`"],
        answer: 1,
        explain: "`<main>` est le contenu principal, unique par page. `<section>` et `<article>` découpent ce contenu ; `<div>` n'a aucun sens sémantique."
      },
      {
        q: "À quoi sert la toute première ligne `<!DOCTYPE html>` ?",
        options: [
          "À déclarer l'encodage des caractères du fichier",
          "À éviter le mode quirks et activer le rendu standard du navigateur",
          "À indiquer la langue principale du document",
          "À charger la feuille de style par défaut du navigateur"
        ],
        answer: 1,
        explain: "Sans doctype, le navigateur retombe en mode quirks, un mode de compatibilité avec les pages des années 90 qui change le calcul des boîtes. L'encodage se déclare avec `meta charset` et la langue avec `lang`."
      },
      {
        q: "Un mot dont l'insistance change le sens de la phrase doit être balisé avec :",
        options: ["`<b>`", "`<strong>`", "`<em>`", "`<i>`"],
        answer: 2,
        explain: "`<em>` marque une emphase : il change le sens de la phrase et les lecteurs d'écran peuvent l'accentuer. `<strong>` signale une importance, `<b>` et `<i>` n'ont aucun poids sémantique."
      },
      {
        q: "Plusieurs boutons radio doivent former un seul choix possible. Quel attribut doit être identique sur chacun ?",
        options: ["`id`", "`name`", "`value`", "`for`"],
        answer: 1,
        explain: "C'est le `name` partagé qui crée le groupe : cocher un bouton décoche les autres. Les `id`, eux, doivent rester uniques pour que chaque `label for` désigne le bon champ."
      },
      {
        q: "Que signifie un attribut `alt` vide (`alt=\"\"`) sur une image ?",
        options: [
          "L'image est en cours de chargement",
          "L'image est décorative et doit être ignorée par les lecteurs d'écran",
          "L'alternative textuelle est manquante, c'est une erreur",
          "L'image sera remplacée par son attribut `title`"
        ],
        answer: 1,
        explain: "Un `alt` vide est un choix explicite : l'image n'apporte pas d'information. Un `alt` absent, lui, laisse le lecteur d'écran annoncer le nom du fichier, ce qui est pire que tout."
      },
      {
        q: "Quelle solution permet vraiment de sauter la navigation au clavier ?",
        options: [
          "Un lien d'évitement vers l'identifiant du `main`, placé en premier dans le document",
          "Un `tabindex=\"-1\"` posé sur le `nav`",
          "Un `aria-hidden=\"true\"` posé sur le `nav`",
          "Un bouton qui fait défiler la page avec du JavaScript"
        ],
        answer: 0,
        explain: "Le lien d'évitement est un lien normal : il apparaît au premier appui sur `Tab` et déplace réellement le focus. `aria-hidden` retire le menu aux lecteurs d'écran sans rien régler au clavier, et `tabindex` négatif ne retire pas les liens de la tabulation."
      },
      {
        q: "Dans une `figure` illustrée, où s'écrit la légende visible ?",
        options: ["`<caption>`", "`<figcaption>`", "`<legend>`", "`<label>`"],
        answer: 1,
        explain: "`<figcaption>` est la légende d'une `figure`. `<caption>` appartient aux tableaux, `<legend>` aux `fieldset` et `<label>` aux champs de formulaire."
      },
      {
        q: "Quel tableau de notes est réellement accessible ?",
        options: [
          "`table` avec `caption`, `thead` et des `th` portant un `scope` explicite",
          "`table` avec des `td` partout, le style distinguant les en-têtes",
          "Une grille de `div` en CSS, plus simple à mettre en page",
          "`table` avec `role=\"presentation\"` pour alléger l'annonce"
        ],
        answer: 0,
        explain: "Les `th` et `scope` permettent au lecteur d'écran d'annoncer l'en-tête de ligne et de colonne ; `caption` nomme le tableau. Des `div` ou des `td` stylés ne transmettent aucune relation entre les cellules."
      },
      {
        q: "Une vidéo publiée sans piste `track` de sous-titres :",
        options: [
          "Reste utilisable dès qu'elle a `controls`",
          "Est inaccessible aux personnes sourdes et moins bien comprise par les moteurs de recherche",
          "Est sous-titrée automatiquement par le navigateur",
          "Ne pose problème qu'en mode plein écran"
        ],
        answer: 1,
        explain: "`controls` donne la lecture et le volume, rien de plus. Sans fichier `.vtt`, les personnes sourdes n'ont aucun accès au contenu parlé et le contenu indexable de la vidéo reste vide."
      },
      {
        q: "À quoi sert `loading=\"lazy\"` sur une image ou une `iframe` ?",
        options: [
          "À compresser le fichier à la volée",
          "À reporter le chargement tant que l'élément n'approche pas de l'écran",
          "À charger d'abord une version basse qualité",
          "À désactiver la mise en cache de la ressource"
        ],
        answer: 1,
        explain: "Le chargement est différé jusqu'à ce que l'élément entre dans la fenêtre. C'est le gain de performance le plus simple sur une page longue, à ne pas appliquer aux médias visibles dès l'arrivée."
      },
      {
        q: "Quelle suite de titres respecte la hiérarchie du document ?",
        options: [
          "`h1` puis `h3` puis `h2`",
          "`h1` puis `h2` puis `h3`",
          "`h2` puis `h1` puis `h4`",
          "Trois `h1` puis des `h4`"
        ],
        answer: 1,
        explain: "On descend d'un niveau à la fois, et on ne remonte qu'après avoir traité une sous-partie. Sauter de `h1` à `h3` casse le plan annoncé par les lecteurs d'écran."
      },
      {
        q: "Une page en préproduction ne doit pas apparaître dans les moteurs de recherche. Quelle balise employez-vous ?",
        options: [
          "`meta name=\"robots\" content=\"noindex\"`",
          "Une `meta name=\"description\"` vide",
          "`link rel=\"canonical\"` vers la page elle-même",
          "`meta name=\"viewport\" content=\"none\"`"
        ],
        answer: 0,
        explain: "`noindex` demande explicitement aux robots de ne pas indexer la page. Une description vide ne bloque rien du tout et une balise `canonical` incorrecte peut au contraire faire disparaître la vraie page."
      }
    ]
  }
});
