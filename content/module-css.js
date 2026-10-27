window.COURSE_MODULES = window.COURSE_MODULES || [];
window.COURSE_MODULES.push({
  id: "css",
  number: 2,
  title: "CSS — le design et la mise en page",
  subtitle: "Donner une forme lisible, cohérente et moderne à vos pages",
  accent: "#264de4",
  icon: "palette",
  level: "Débutant → Avancé",
  hours: 14,
  description: "Le CSS transforme une structure HTML brute en interface claire et agréable. Ce module commence par la question que tout le monde se pose devant une règle ignorée — **qui gagne, et pourquoi ?** — puis construit pas à pas le box model, Flexbox, Grid, le responsive, les animations et une organisation de code tenable sur un vrai projet.",
  goals: [
    "Comprendre la cascade, la spécificité et l'héritage pour écrire du CSS qui gagne du premier coup",
    "Maîtriser le box model et le flux normal sans largeur ni marge surprise",
    "Choisir le bon outil de mise en page : flux normal, Flexbox ou Grid",
    "Rendre une interface responsive en mobile-first avec des images et des textes fluides",
    "Animer des micro-interactions sobres, performantes et respectueuses de l'utilisateur",
    "Organiser son CSS (variables, BEM, couches) pour qu'il reste maintenable dans le temps"
  ],
  lessons: [
    {
      id: "css-01",
      title: "Comment fonctionne CSS : cascade, spécificité et héritage",
      minutes: 35,
      summary: "Comprendre pourquoi une règle s'applique et une autre non — la compétence qui économise des heures de débogage.",
      objectives: [
        "Expliquer la cascade et calculer la spécificité d'un sélecteur",
        "Choisir entre feuille externe, bloc `style` et attribut `style`",
        "Utiliser l'héritage volontairement plutôt que par accident",
        "Inspecter et corriger une règle dans les DevTools du navigateur"
      ],
      content: [
        { type: "lead", text: "CSS (Cascading Style Sheets) décrit l'apparence d'un document HTML. Une feuille de style n'est qu'une longue liste de règles `sélecteur { propriété: valeur; }`. Le navigateur lit **toutes** ces règles, puis, pour chaque propriété de chaque élément, il choisit **la valeur gagnante**. Ce mécanisme s'appelle la cascade — et le comprendre change tout." },
        { type: "p", text: "Un document HTML est un arbre : `html` contient `body`, qui contient des `div`, qui contiennent des `p`. Le CSS ne s'applique donc pas « à la page », il s'applique à des **éléments** de cet arbre. Sans feuille de style, le navigateur applique son propre style par défaut (le *UA stylesheet*) : titres en gras, listes à puces, marges autour du `body`. Votre CSS vient remplacer ces valeurs, règle par règle." },
        { type: "h", level: 2, text: "Trois façons d'intégrer du CSS" },
        { type: "code", lang: "html", caption: "Les trois méthodes d'intégration, de la meilleure à la plus risquée.", code: `<!-- 1. Feuille externe : la méthode à privilégier -->
<link rel="stylesheet" href="style.css">

<!-- 2. Bloc interne : utile pour une page isolée ou un test -->
<style>
  p { color: hsl(215 20% 30%); }
</style>

<!-- 3. Attribut style : à réserver au dynamique (JS) -->
<p style="color: tomato;">Texte</p>` },
        { type: "p", text: "Privilégiez la feuille **externe** : elle est mise en cache par le navigateur, partagée par toutes les pages et modifiable en un seul endroit. Le bloc `style` sert aux cas isolés (email, page autonome, bricolage rapide) et l'attribut `style` devrait rester l'exception : il est invisible dans votre fichier CSS, il bat presque tout le reste et il est très difficile à surcharger proprement." },
        { type: "p", text: "**La cascade : quelle règle gagne ?** Quand deux règles touchent la même propriété du même élément, le navigateur compare dans cet ordre : l'**origine et l'importance** de la déclaration (`!important` passe avant tout), puis la **spécificité** du sélecteur, puis l'**ordre d'apparition** — à poids égal, la dernière règle écrite gagne. La spécificité se calcule comme un nombre à trois colonnes : identifiants, classes/attributs/pseudo-classes, éléments/pseudo-éléments." },
        { type: "table", head: ["Sélecteur", "Poids", "Exemple", "Bat"], rows: [
          ["Attribut `style`", "hors concours", "`style='color: red'`", "toutes les règles CSS"],
          ["Identifiant", "1-0-0", "`#entete`", "classes, éléments"],
          ["Classe, attribut, pseudo-classe", "0-1-0", "`.carte`, `[type=email]`, `:hover`", "éléments"],
          ["Élément, pseudo-élément", "0-0-1", "`p`, `::before`", "rien du tout"],
          ["`!important`", "au-dessus de tout", "`color: red !important`", "même l'attribut `style`"]
        ] },
        { type: "code", lang: "css", caption: "Même déclarée en premier, la règle la plus spécifique gagne.", code: `/* 0-0-1 : un élément */
p {
  color: hsl(0 70% 45%);
}

/* 0-1-0 : une classe — plus forte */
.important {
  color: hsl(215 85% 45%);
}

/* 0-2-0 : deux classes — encore plus forte */
.carte .important {
  color: hsl(150 60% 30%);
}` },
        { type: "callout", tone: "tip", title: "La règle d'or", text: "Écrivez du CSS **du plus général au plus spécifique** et gardez une spécificité basse (souvent une seule classe). Si vous devez ajouter `!important`, c'est presque toujours le signe qu'un sélecteur est trop lourd quelque part.", items: [
          "Une classe = 0-1-0, un élément = 0-0-1 : ne mélangez pas les deux logiques dans un même projet",
          "Plus la spécificité est basse, plus votre CSS est facile à surcharger et à faire évoluer",
          "En cas de doute, ouvrez les DevTools : la règle perdante est barrée, la gagnante est en haut"
        ] },
        { type: "demo", title: "La cascade en direct", height: 200, html: `<div class="boite">
  <p class="note">Pourquoi ce paragraphe est-il bleu et non rouge ?</p>
</div>`, css: `/* 0-0-2 : deux éléments → rouge */
div p {
  color: hsl(0 72% 48%);
  font-weight: 700;
}

/* 0-1-0 : une classe → gagne sur les éléments */
.note {
  color: hsl(215 90% 45%);
}`, js: "" },
        { type: "p", text: "**L'héritage et le piège de `!important`.** Certaines propriétés sont **héritées** : `color`, `font-family`, `font-size`, `line-height`, `text-align` descendent automatiquement du parent vers l'enfant. C'est pratique — déclarer `font-family` sur `body` suffit pour toute la page — mais c'est aussi une source de surprises quand un enfant refuse d'obéir. Les propriétés de boîte (`margin`, `padding`, `border`, `width`) ne sont **pas** héritées : c'est pour cela qu'on les redéclare sans cesse." },
        { type: "code", lang: "css", caption: "Héritage volontaire à gauche, `!important` à éviter à droite.", code: `body {
  color: hsl(220 15% 20%);
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

/* hérité par tous les enfants, aucun besoin de le répéter */
.encadre {
  border-left: 4px solid hsl(215 85% 55%);
  padding-left: 12px;
}

/* À ÉVITER : écrase tout le reste, même l'attribut style.
   Impossible à surcharger sans un autre !important. */
.titre {
  color: hsl(215 85% 45%) !important;
}` },
        { type: "callout", tone: "warning", title: "Piège fréquent : « ça ne s'applique pas »", text: "Dans 90 % des cas, ce n'est ni un bug du navigateur ni une propriété inventée : soit le sélecteur ne vise pas l'élément (vérifiez-le dans le panneau Éléments), soit une règle plus spécifique gagne, soit la valeur est invalide (`hsl(215 85% 45%)` sans virgules ni `%` corrects) et le navigateur l'ignore silencieusement. Ouvrez les DevTools **avant** de modifier votre code au hasard.", items: [
          "`F12` → onglet Éléments → panneau Styles : la cascade complète est affichée",
          "Une déclaration barrée = perdante ; une déclaration grisée = invalide",
          "Décochez une case pour tester une valeur sans rien enregistrer"
        ] },
        { type: "checklist", items: [
          "Vous savez calculer la spécificité de `.carte p` (0-1-1) et de `#main` (1-0-0)",
          "Vous savez pourquoi une feuille externe est préférable à l'attribut `style`",
          "Vous savez quelles propriétés s'héritent et lesquelles ne s'héritent pas",
          "Vous ouvrez les DevTools pour diagnostiquer une règle qui ne s'applique pas"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-01",
          title: "Faire parler la cascade et l'héritage",
          difficulty: 1,
          goal: "Styler un bloc entier par héritage, puis casser l'héritage sur un seul enfant.",
          instructions: [
            "Dans la règle `.bloc`, passez `font-size` à `18px` : tous les enfants doivent en hériter.",
            "Toujours dans `.bloc`, centrez le texte de tout le bloc avec `text-align: center`.",
            "Ajoutez une règle `.texte` qui aligne seulement ce paragraphe à gauche (`text-align: left`).",
            "N'utilisez ni `!important` ni l'attribut `style` dans le HTML."
          ],
          hint: "`font-size` et `text-align` sont héritées : déclarez-les sur le parent, puis redéclarez la plus petite règle sur l'enfant.",
          starter: { html: `<div class="bloc">
  <h2>Rapport mensuel</h2>
  <p class="texte">Le contenu hérite du bloc.</p>
</div>`, css: `.bloc {
  font-size: 16px;
  text-align: start;
}`, js: "" },
          solution: { html: `<div class="bloc">
  <h2>Rapport mensuel</h2>
  <p class="texte">Le contenu hérite du bloc.</p>
</div>`, css: `.bloc {
  font-size: 18px;
  text-align: center;
}

.texte {
  text-align: left;
}`, js: "" },
          checks: [
            "!!document.querySelector('.bloc') && style('.bloc','fontSize') === '18px'",
            "style('.bloc','textAlign') === 'center'",
            "style('.texte','fontSize') === '18px'",
            "style('.texte','textAlign') === 'left'"
          ],
          checklist: [
            "Le bloc est passé à `18px`",
            "Le paragraphe hérite bien de `18px`",
            "Le bloc centre son texte, `.texte` reste à gauche"
          ]
        },
        {
          id: "css-ex-02",
          title: "À spécificité égale, l'ordre décide",
          difficulty: 2,
          goal: "Résoudre un conflit entre deux classes de même poids sans recourir à `!important`.",
          instructions: [
            "Observez l'aperçu : le texte n'est pas en italique alors qu'une règle le demande.",
            "Les deux règles ont la même spécificité : réordonnez-les pour que `.encadre` reste en italique.",
            "Ne supprimez aucune des deux règles et n'ajoutez pas `!important`.",
            "Vérifiez que le paragraphe et le `small` héritent bien de l'italique."
          ],
          hint: "À poids égal, la règle écrite en **dernier** gagne : placez `.encadre` avant `.texte`.",
          starter: { html: `<div class="encadre texte">
  <p>Lu et approuvé.</p>
  <small>Mention légale</small>
</div>`, css: `.texte {
  font-style: italic;
}

.encadre {
  font-style: normal;
}`, js: "" },
          solution: { html: `<div class="encadre texte">
  <p>Lu et approuvé.</p>
  <small>Mention légale</small>
</div>`, css: `.encadre {
  font-style: normal;
}

.texte {
  font-style: italic;
}`, js: "" },
          checks: [
            "!!document.querySelector('.encadre') && style('.encadre','fontStyle') === 'italic'",
            "style('.encadre p','fontStyle') === 'italic'",
            "style('small','fontStyle') === 'italic'"
          ],
          checklist: [
            "`.encadre` est en italique",
            "Le paragraphe et le `small` héritent de l'italique",
            "Aucun `!important` n'a été ajouté"
          ]
        }
      ]
    },
    {
      id: "css-02",
      title: "Sélecteurs et combinateurs : viser le bon élément",
      minutes: 40,
      summary: "Écrire des sélecteurs précis, courts et lisibles, y compris pour les états et les parties d'éléments.",
      objectives: [
        "Choisir entre sélecteur de type, de classe, d'identifiant et d'attribut",
        "Utiliser les pseudo-classes d'état et de structure (`:hover`, `:focus-visible`, `:nth-child`)",
        "Maîtriser `:is()`, `:where()`, `:not()` et `:has()`",
        "Créer des décorations avec `::before` et `::after`"
      ],
      content: [
        { type: "lead", text: "Un sélecteur est une requête : il désigne un ensemble d'éléments. Tout le reste du CSS — la propreté, la maintenabilité, la spécificité — dépend de la qualité de vos sélecteurs. Un bon sélecteur se lit comme une phrase et tient en une ligne." },
        { type: "h", level: 2, text: "Les quatre familles de base et les combinateurs" },
        { type: "code", lang: "css", caption: "Du plus souple au plus rigide, et les combinateurs de relation.", code: `/* Type : tous les paragraphes. Spécificité 0-0-1 */
p { margin-block: 0; }

/* Classe : le sélecteur de travail, réutilisable. 0-1-0 */
.carte { border-radius: 12px; }

/* Identifiant : un seul par page, spécificité énorme. À éviter. */
#entete { background: hsl(220 30% 96%); }

/* Attribut : cible un comportement, pas une apparence */
a[href^="https"] { text-decoration: underline; }
input[type="email"] { border-color: hsl(215 80% 55%); }

/* Combinateurs de relation */
nav a { color: inherit; }          /* descendant : n'importe quel niveau */
nav > a { font-weight: 600; }      /* enfant direct seulement */
h2 + p { margin-top: 4px; }        /* frère immédiatement suivant */
h2 ~ p { color: hsl(220 10% 45%); } /* tous les frères suivants */` },
        { type: "p", text: "La classe est **le** sélecteur de travail : elle exprime une intention (« cette carte », « ce bouton principal ») et reste à spécificité basse, donc facile à surcharger. L'identifiant est à éviter dans les feuilles de style : unique par page, il crée une spécificité 1-0-0 impossible à battre sans `!important`, et il empêche toute réutilisation." },
        { type: "h", level: 2, text: "Pseudo-classes : décrire un état ou une position" },
        { type: "code", lang: "css", caption: "Les pseudo-classes les plus utiles au quotidien.", code: `/* Interaction */
.bouton:hover { background: hsl(215 85% 45%); }
.bouton:focus-visible { outline: 3px solid hsl(215 90% 60%); outline-offset: 2px; }

/* Structure */
li:nth-child(even) { background: hsl(220 30% 97%); }
li:first-child { border-top: 0; }

/* Négation et regroupement */
.bouton:not(.bouton--fantome) { box-shadow: 0 2px 8px hsl(220 40% 20% / 0.15); }
:is(h1, h2, h3) { line-height: 1.2; }
:where(.carte, .panneau) p { margin-block: 0; }

/* Relation avec un enfant (très récent, mais standard) */
.carte:has(img) { padding-top: 0; }` },
        { type: "p", text: "`focus-visible` mérite une explication : `:focus` s'active aussi au clic, ce qui affiche un contour disgracieux pour les utilisateurs à la souris. `:focus-visible` ne s'active que lorsque le navigateur estime qu'un contour est nécessaire — typiquement au clavier. On garde donc un indicateur net pour l'accessibilité **sans** l'imposer au clic." },
        { type: "list", ordered: false, items: [
          "`:is()` et `:where()` regroupent des sélecteurs ; `:where()` annule complètement la spécificité de ses arguments (idéal pour un reset)",
          "`:not()` exclut une variante sans dupliquer toute la règle",
          "`:has()` remonte la relation : « ce parent qui contient une image »",
          "`:nth-child(2n+1)` = position impaire, `:nth-child(-n+3)` = les trois premiers"
        ] },
        { type: "callout", tone: "tip", title: "Une classe par intention", text: "Préférez `class=\"carte carte--vedette\"` à `div.carte.rouge.grande > .titre`. Les sélecteurs courts (`0-1-0`) sont plus faciles à lire, à surcharger et à déplacer — c'est la base du nommage BEM vu en fin de module." },
        { type: "h", level: 2, text: "Pseudo-éléments : `::before` et `::after`" },
        { type: "code", lang: "css", caption: "Un pseudo-élément crée une boîte fictive, invisible dans le HTML.", code: `.prix::before {
  content: "€ ";          /* obligatoire : sans content, rien ne s'affiche */
  font-weight: 400;
  opacity: 0.7;
}

.titre-section::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 8px;
  background: hsl(215 85% 55%);
  border-radius: 2px;
}` },
        { type: "callout", tone: "warning", title: "Piège : le contenu généré est décoratif", text: "Le texte produit par `content` est lu par les lecteurs d'écran de façon incohérente et ne peut pas être sélectionné : ne l'utilisez jamais pour une information essentielle. Autre piège classique : oublier `content: \"\"` (avec des guillemets vides) pour une décoration — sans `content`, le pseudo-élément n'existe pas.", items: [
          "`content` est obligatoire, même vide : `content: \"\";`",
          "`::before`/`::after` sur un élément `img` ou `input` ne fonctionne pas",
          "Comptez `::before` comme un élément enfant pour les mises en page flex/grid"
        ] },
        { type: "demo", title: "États, structure et pseudo-élément", height: 240, html: `<ul class="liste">
  <li>Farine</li>
  <li>Beurre</li>
  <li>Sucre roux</li>
  <li>Œufs</li>
</ul>
<button class="bouton">Survolez-moi, puis tabulez</button>`, css: `body { font-family: system-ui, sans-serif; }
.liste { list-style: none; padding: 0; }
.liste li {
  padding: 8px 10px;
  border-bottom: 1px solid hsl(220 20% 90%);
}
.liste li:nth-child(even) { background: hsl(220 40% 97%); }
.liste li::before {
  content: "•";
  color: hsl(215 85% 55%);
  margin-right: 8px;
}
.liste li:not(:last-child):hover {
  background: hsl(210 90% 94%);
}
.bouton {
  margin-top: 12px;
  padding: 8px 14px;
  border: 0;
  border-radius: 8px;
  background: hsl(215 20% 92%);
  font: inherit;
  cursor: pointer;
}
.bouton:hover { background: hsl(215 85% 55%); color: white; }
.bouton:focus-visible { outline: 3px solid hsl(215 90% 60%); outline-offset: 2px; }`, js: "" },
        { type: "checklist", items: [
          "Vous savez écrire un sélecteur de classe réutilisable et un sélecteur d'attribut ciblé",
          "Vous distinguez `nav a` (descendant) de `nav > a` (enfant direct)",
          "Vous connaissez `:hover`, `:focus-visible`, `:nth-child`, `:not`, `:is`, `:where`, `:has`",
          "Vous n'oubliez jamais `content` sur un pseudo-élément"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-03",
          title: "Un menu avec les bons sélecteurs",
          difficulty: 1,
          goal: "Combiner sélecteur de classe, sélecteur d'attribut et descendant.",
          instructions: [
            "Rendez le lien actif gras (`font-weight: 700`) en utilisant sa classe `.actif`.",
            "Mettez le lien vers `#contact` en majuscules grâce au sélecteur d'attribut `a[href=\"#contact\"]`.",
            "Supprimez le soulignement de tous les liens du menu avec `text-decoration: none`."
          ],
          hint: "Un sélecteur d'attribut s'écrit entre crochets et vise la valeur exacte : `a[href=\"#contact\"]`. Le soulignement se règle sur les liens eux-mêmes.",
          starter: { html: `<nav class="menu">
  <a class="actif" href="#accueil">Accueil</a>
  <a href="#projets">Projets</a>
  <a href="#contact">Contact</a>
</nav>`, css: `.menu a {
  display: inline-block;
  padding: 6px 12px;
}`, js: "" },
          solution: { html: `<nav class="menu">
  <a class="actif" href="#accueil">Accueil</a>
  <a href="#projets">Projets</a>
  <a href="#contact">Contact</a>
</nav>`, css: `.menu a {
  display: inline-block;
  padding: 6px 12px;
  text-decoration: none;
}

.actif {
  font-weight: 700;
}

a[href="#contact"] {
  text-transform: uppercase;
}`, js: "" },
          checks: [
            "!!document.querySelector('.actif') && style('.actif','fontWeight') === '700'",
            `style('a[href="#contact"]','textTransform') === 'uppercase'`,
            "style('a','textDecorationLine') === 'none'"
          ],
          checklist: [
            "Le lien actif est en gras",
            "Le lien de contact est en majuscules",
            "Aucun lien du menu n'est souligné"
          ]
        },
        {
          id: "css-ex-04",
          title: "Pseudo-classes de structure",
          difficulty: 2,
          goal: "Cibler des lignes par leur position sans toucher au HTML.",
          instructions: [
            "Supprimez les puces de la liste avec `list-style: none`.",
            "Mettez les lignes **paires** en gras (`font-weight: 700`) via `:nth-child(even)`.",
            "Mettez la **première** ligne en italique via `:first-child`.",
            "N'ajoutez aucune classe : les sélecteurs doivent suffire."
          ],
          hint: "`:nth-child(even)` vise les positions 2 et 4 ; `:first-child` vise la position 1. Aucune modification du HTML n'est nécessaire.",
          starter: { html: `<ul class="liste">
  <li>Farine</li>
  <li>Beurre</li>
  <li>Sucre</li>
  <li>Œufs</li>
</ul>`, css: `.liste {
  padding-left: 20px;
}`, js: "" },
          solution: { html: `<ul class="liste">
  <li>Farine</li>
  <li>Beurre</li>
  <li>Sucre</li>
  <li>Œufs</li>
</ul>`, css: `.liste {
  padding-left: 20px;
  list-style: none;
}

.liste li:nth-child(even) {
  font-weight: 700;
}

.liste li:first-child {
  font-style: italic;
}`, js: "" },
          checks: [
            "!!document.querySelector('.liste') && style('.liste','listStyleType') === 'none'",
            "style('li:nth-child(2)','fontWeight') === '700'",
            "style('li:nth-child(1)','fontWeight') === '400'",
            "style('li:nth-child(1)','fontStyle') === 'italic'"
          ],
          checklist: [
            "Les puces ont disparu",
            "Les lignes 2 et 4 sont en gras, la ligne 1 ne l'est pas",
            "La première ligne est en italique"
          ]
        }
      ]
    },
    {
      id: "css-03",
      title: "Le box model et le flux normal",
      minutes: 40,
      summary: "Comprendre exactement de quoi une boîte est faite, et pourquoi le flux n'est pas un ennemi.",
      objectives: [
        "Décrire les quatre zones d'une boîte et l'effet de `box-sizing`",
        "Distinguer `block`, `inline` et `inline-block`",
        "Contrôler les dimensions avec `width`, `min-*`, `max-*` et `overflow`",
        "Reconnaître et prévenir l'effondrement des marges"
      ],
      content: [
        { type: "lead", text: "Chaque élément affiché est une boîte rectangulaire composée de quatre zones emboîtées : le contenu, le `padding`, la `border` et la `margin`. Presque tous les mystères de mise en page (« pourquoi ça dépasse ? pourquoi cet espace ? ») viennent d'une confusion sur ces quatre zones." },
        { type: "h", level: 2, text: "`content-box` contre `border-box`" },
        { type: "code", lang: "css", caption: "Le même `width: 200px` ne produit pas la même boîte.", code: `.a {
  box-sizing: content-box; /* défaut */
  width: 200px;
  padding: 16px;
  border: 4px solid hsl(220 20% 80%);
}
/* largeur occupée = 200 + 16*2 + 4*2 = 240px */

.b {
  box-sizing: border-box;
  width: 200px;
  padding: 16px;
  border: 4px solid hsl(220 20% 80%);
}
/* largeur occupée = 200px : le padding mange l'intérieur */` },
        { type: "p", text: "Par défaut (`content-box`), `width` ne décrit que le **contenu** : ajouter du padding élargit la boîte. C'est contre-intuitif et c'est la cause du célèbre « mon élément dépasse de 40px ». Avec `border-box`, la largeur déclarée englobe tout sauf la marge : c'est ce que tout le monde attend intuitivement, et c'est la raison pour laquelle la quasi-totalité des projets l'appliquent globalement. La solution universelle tient en trois sélecteurs." },
        { type: "code", lang: "css", caption: "Le reset à mettre en haut de n'importe quelle feuille de style.", code: `/* À placer en tout premier */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Bonus utile : les marges par défaut des navigateurs sont disparates */
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}` },
        { type: "h", level: 2, text: "Le flux normal et les valeurs de `display`" },
        { type: "table", head: ["`display`", "Comportement", "Dimensions", "Usage"], rows: [
          ["`block`", "commence sur une nouvelle ligne, prend toute la largeur disponible", "`width`/`height` respectées", "sections, `div`, paragraphes"],
          ["`inline`", "s'écoule dans le texte, sur la même ligne", "`width`/`height` **ignorées**", "liens, `span`, mots du texte"],
          ["`inline-block`", "s'écoule comme du texte, mais accepte une taille", "`width`/`height` respectées", "badges, boutons-cartes"],
          ["`none`", "l'élément disparaît complètement", "aucune boîte, aucune place", "masquage réel"]
        ] },
        { type: "p", text: "Le **flux normal** est la disposition par défaut : les blocs s'empilent verticalement, les éléments en ligne s'écoulent horizontalement dans le texte. Ce n'est pas un mode dégradé — c'est une base solide et accessible, qui fonctionne même sans JavaScript et se lit correctement sur un lecteur d'écran. On n'appelle Flexbox ou Grid que lorsque le flux ne peut pas exprimer la composition voulue." },
        { type: "callout", tone: "info", title: "L'effondrement des marges", text: "Deux marges verticales adjacentes de blocs voisins **fusionnent** : `margin-bottom: 24px` suivi de `margin-top: 16px` donne 24px au total, pas 40px. L'effondrement n'a lieu que dans le flux vertical (pas pour les marges horizontales, pas dans un conteneur flex/grid, pas avec un `padding` ou une `border` qui les sépare).", items: [
          "Un parent et son premier enfant peuvent fusionner leurs marges : ajoutez `padding-top` ou `overflow: hidden` pour couper l'effet",
          "Dans un conteneur `display: flex` ou `display: grid`, aucune marge ne s'effondre",
          "Utilisez `padding` pour l'espace **intérieur**, `margin` pour l'espace **extérieur** et `gap` pour espacer des enfants"
        ] },
        { type: "code", lang: "css", caption: "Limites souples : la bonne façon de dimensionner un bloc de contenu.", code: `.contenu {
  width: min(100%, 640px);   /* jamais plus large que son parent */
  margin-inline: auto;       /* centrage horizontal fiable */
  padding-inline: 16px;
}

.carte {
  min-height: 120px;   /* le minimum, jamais franchi */
  max-height: 320px;
  overflow: auto;      /* le contenu trop long défile au lieu de déborder */
  overflow-wrap: break-word;
}` },
        { type: "demo", title: "Visualiser le box model", height: 240, html: `<div class="parent">
  <div class="boite">border-box</div>
  <div class="boite boite--content">content-box</div>
</div>`, css: `body { font-family: system-ui, sans-serif; }
.parent { padding: 8px; background: hsl(220 30% 96%); }
.boite {
  box-sizing: border-box;
  width: 200px;
  padding: 16px;
  border: 4px solid hsl(215 85% 55%);
  background: hsl(210 90% 92%);
  margin-bottom: 12px;
  font-weight: 600;
}
.boite--content {
  box-sizing: content-box;
  border-color: hsl(340 70% 55%);
  background: hsl(340 90% 95%);
}`, js: "" },
        { type: "checklist", items: [
          "Vous appliquez `box-sizing: border-box` globalement dans tous vos projets",
          "Vous savez qu'une `inline` n'accepte ni `width` ni `height`",
          "Vous utilisez `min-width`/`max-width` plutôt qu'une largeur figée",
          "Vous savez pourquoi deux marges verticales peuvent ne pas s'additionner"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-05",
          title: "Une boîte prévisible",
          difficulty: 1,
          goal: "Mettre en place le box model moderne sur une carte.",
          instructions: [
            "Appliquez `box-sizing: border-box` à tous les éléments avec `*, *::before, *::after`.",
            "Donnez à `.carte` un `padding` de `16px` en haut/bas et `20px` à gauche/droite.",
            "Ajoutez une bordure de `2px solid` (couleur au choix) et un `border-radius: 12px`."
          ],
          hint: "Le reset `*, *::before, *::after { box-sizing: border-box; }` se place en haut de la feuille. Le raccourci `padding: 16px 20px` signifie haut/bas puis gauche/droite.",
          starter: { html: `<article class="carte">
  <h2>Offre de printemps</h2>
  <p>Une carte propre et lisible.</p>
</article>`, css: `.carte {
  background: hsl(220 60% 97%);
}`, js: "" },
          solution: { html: `<article class="carte">
  <h2>Offre de printemps</h2>
  <p>Une carte propre et lisible.</p>
</article>`, css: `*,
*::before,
*::after {
  box-sizing: border-box;
}

.carte {
  background: hsl(220 60% 97%);
  padding: 16px 20px;
  border: 2px solid hsl(220 20% 85%);
  border-radius: 12px;
}`, js: "" },
          checks: [
            "!!document.querySelector('.carte') && style('.carte','paddingTop') === '16px'",
            "style('.carte','paddingBottom') === '16px'",
            "style('.carte','paddingLeft') === '20px'",
            "style('.carte','borderRadius') === '12px'"
          ],
          checklist: [
            "La carte calcule ses dimensions en `border-box`",
            "Le padding est de 16px en vertical et 20px en horizontal",
            "Les coins sont arrondis à 12px"
          ]
        },
        {
          id: "css-ex-06",
          title: "Passer de l'inline à l'inline-block",
          difficulty: 2,
          goal: "Comprendre pourquoi un `span` n'accepte pas de dimensions, et comment y remédier.",
          instructions: [
            "Passez `.puce` en `display: inline-block`.",
            "Donnez-lui `width: 28px`, `height: 28px` et centrez le chiffre avec `text-align: center`.",
            "Sur `.boite`, activez le défilement avec `overflow: auto` et limitez la hauteur à `40px` via `max-height`."
          ],
          hint: "Un `span` est `inline` par défaut : sans `inline-block` (ou `block`), ses `width`/`height` sont ignorées. Le défilement n'apparaît que si le contenu dépasse réellement la hauteur maximale.",
          starter: { html: `<div class="boite">
  <span class="puce">1</span>
  <span class="puce">2</span>
  <span class="puce">3</span>
</div>`, css: `.boite {
  background: hsl(220 30% 96%);
}`, js: "" },
          solution: { html: `<div class="boite">
  <span class="puce">1</span>
  <span class="puce">2</span>
  <span class="puce">3</span>
</div>`, css: `.boite {
  background: hsl(220 30% 96%);
  overflow: auto;
  max-height: 40px;
}

.puce {
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 8px;
  background: hsl(215 85% 55%);
  color: white;
}`, js: "" },
          checks: [
            "!!document.querySelector('.puce') && style('.puce','display') === 'inline-block'",
            "style('.puce','width') === '28px'",
            "style('.puce','textAlign') === 'center'",
            "style('.boite','overflow') === 'auto'",
            "style('.boite','maxHeight') === '40px'"
          ],
          checklist: [
            "Les puces sont des `inline-block` de 28 × 28 px",
            "Le contenu de la puce est centré",
            "La boîte défile et ne dépasse pas 40px de haut"
          ]
        }
      ]
    },
    {
      id: "css-04",
      title: "Unités, couleurs et variables CSS",
      minutes: 40,
      summary: "Choisir la bonne unité pour chaque besoin et piloter tout un thème depuis quelques variables.",
      objectives: [
        "Choisir entre `px`, `rem`, `em`, `%`, `vw`, `vh` et `ch` selon le contexte",
        "Écrire des couleurs en hexadécimal, en `rgb()` et en `hsl()` avec transparence",
        "Déclarer des custom properties sur `:root` et les réutiliser",
        "Calculer des valeurs avec `calc()` et construire un thème sombre"
      ],
      content: [
        { type: "lead", text: "Une unité, c'est une promesse de robustesse. `font-size: 18px` fige la taille pour toujours ; `font-size: 1.125rem` suit les préférences de l'utilisateur. Les variables CSS, elles, transforment une feuille de style en système cohérent : une seule valeur modifiée et tout le thème suit." },
        { type: "h", level: 2, text: "Les unités qui comptent vraiment" },
        { type: "table", head: ["Unité", "Relative à", "À utiliser pour"], rows: [
          ["`px`", "absolue (pixel CSS)", "bordures, ombres, traits fins, jamais le texte"],
          ["`rem`", "la taille de police de la racine (`html`), 16px par défaut", "polices, espacements, tout ce qui doit suivre les préférences"],
          ["`em`", "la taille de police de l'élément (ou du parent)", "padding d'un composant qui doit grandir avec son texte"],
          ["`%`", "la dimension correspondante du parent", "largeurs fluides, `max-width: 100%`"],
          ["`vw` / `vh`", "1 % de la largeur / hauteur du viewport", "sections pleine hauteur, `min-height: 100vh`"],
          ["`ch`", "la largeur du caractère `0`", "largeur de lecture confortable d'un paragraphe"],
          ["`fr`", "fraction de l'espace libre (grilles uniquement)", "colonnes de `grid`"]
        ] },
        { type: "p", text: "Le duo `rem` + `clamp()` remplace aujourd'hui la plupart des media queries typographiques : la taille suit l'écran en restant bornée. Utilisez `px` uniquement là où le rendu doit être exact (un trait de 1px, un radius de 8px) et `rem` partout où l'utilisateur doit garder la main — il peut changer la taille de police de son navigateur, et votre page doit rester lisible." },
        { type: "code", lang: "css", caption: "Un système d'espacement et une taille fluide, sans une seule media query.", code: `:root {
  --espace-1: 0.5rem;   /* 8px */
  --espace-2: 1rem;     /* 16px */
  --espace-3: 1.5rem;   /* 24px */
}

/* 1.2rem minimum, 4vw au milieu, 2.4rem maximum */
.titre {
  font-size: clamp(1.2rem, 4vw, 2.4rem);
  margin-block-end: var(--espace-2);
}

.texte {
  max-width: 68ch;      /* environ 68 caractères : la zone de confort */
  line-height: 1.6;
  padding: var(--espace-2) var(--espace-3);
}` },
        { type: "h", level: 2, text: "Trois écritures de couleur" },
        { type: "code", lang: "css", caption: "Les trois notations et l'alpha moderne (barre oblique).", code: `.hex      { color: #264de4; }          /* compact, opaque */
.hex-court{ color: #264de4cc; }        /* 8 chiffres = avec alpha */
.rgb      { color: rgb(38 77 228); }
.rgba     { color: rgb(38 77 228 / 0.6); }   /* alpha via / */

/* hsl : la notation la plus lisible pour construire une palette */
.hsl      { color: hsl(228 76% 52%); }        /* teinte, saturation, luminosité */
.hsl-clair{ color: hsl(228 76% 92%); }        /* même teinte, plus clair */
.ombre    { box-shadow: 0 8px 24px hsl(228 40% 20% / 0.18); }` },
        { type: "callout", tone: "tip", title: "Pourquoi préférer `hsl()`", text: "En hexadécimal, trouver « la même couleur en plus clair » est une affaire de tâtonnements. En `hsl()`, il suffit de faire varier la luminosité en gardant la teinte : c'est ainsi qu'on construit une palette cohérente de boutons, de bordures et d'états. L'alpha s'écrit `hsl(228 76% 52% / 0.15)` — notez la barre oblique, qui remplace l'ancien `hsla()`.", items: [
          "Ajoutez `color-scheme: light dark;` sur `:root` pour que les contrôles natifs suivent le thème",
          "Le contraste se mesure : 4.5:1 minimum pour le texte courant, 3:1 pour le grand texte",
          "Une couleur de texte ne doit jamais être la seule information (ajoutez une icône ou un libellé)"
        ] },
        { type: "h", level: 2, text: "Custom properties : le thème en variables" },
        { type: "code", lang: "css", caption: "Un thème complet piloté par six variables.", code: `:root {
  --teinte: 228;
  --fond: hsl(var(--teinte) 40% 98%);
  --surface: #ffffff;
  --texte: hsl(var(--teinte) 25% 15%);
  --accent: hsl(var(--teinte) 76% 52%);
  --rayon: 12px;
}

body {
  background: var(--fond);
  color: var(--texte);
}

.bouton {
  background: var(--accent);
  color: white;
  border-radius: var(--rayon);
}

/* Thème sombre : mêmes noms, autres valeurs */
html.sombre {
  --fond: hsl(var(--teinte) 25% 10%);
  --surface: hsl(var(--teinte) 20% 15%);
  --texte: hsl(var(--teinte) 15% 92%);
}` },
        { type: "code", lang: "css", caption: "`calc()` combine unités et variables ; la valeur de repli évite le pire.", code: `.carte {
  /* fonctionne : var() + calc() avec unités différentes */
  padding: calc(var(--espace-2) + 4px);
  width: calc(100% - 2rem);
}

/* Valeur de repli si --accent n'est pas définie */
.lien {
  color: var(--accent, hsl(228 76% 52%));
}` },
        { type: "callout", tone: "warning", title: "Piège : la portée des variables", text: "Une custom property déclarée sur `.carte` n'existe **que** dans `.carte` et ses descendants. Si `var(--rayon)` ne produit rien, c'est soit une faute de frappe dans le nom (les variables sont sensibles à la casse), soit une déclaration trop locale. Et contrairement à une propriété invalide, une variable non définie peut casser plusieurs déclarations d'un coup.", items: [
          "`--Rayon` et `--rayon` sont deux variables différentes",
          "Une variable non définie sans repli rend la déclaration invalide au calcul",
          "Déclarez vos variables de thème sur `:root`, les variables locales sur le composant"
        ] },
        { type: "demo", title: "Un thème en deux variables", height: 240, html: `<div class="panneau">
  <h3>Studio Lumen</h3>
  <p>Cliquez pour basculer le thème.</p>
  <button class="bouton" type="button">Changer de thème</button>
</div>`, css: `:root {
  --fond: hsl(228 40% 98%);
  --surface: #ffffff;
  --texte: hsl(228 25% 15%);
  --accent: hsl(228 76% 52%);
  --rayon: 14px;
}
html.sombre {
  --fond: hsl(228 25% 10%);
  --surface: hsl(228 22% 16%);
  --texte: hsl(228 15% 93%);
}
body { margin: 0; font-family: system-ui, sans-serif; background: var(--fond); color: var(--texte); padding: 16px; }
.panneau {
  background: var(--surface);
  border-radius: var(--rayon);
  padding: 20px;
  box-shadow: 0 10px 30px hsl(228 40% 20% / 0.12);
}
.panneau h3 { margin: 0 0 6px; }
.bouton {
  margin-top: 10px;
  padding: 10px 16px;
  border: 0;
  border-radius: calc(var(--rayon) - 6px);
  background: var(--accent);
  color: white;
  font: inherit;
  cursor: pointer;
}`, js: `var bouton = document.querySelector('.bouton');
bouton.addEventListener('click', function () {
  document.documentElement.classList.toggle('sombre');
});` },
        { type: "checklist", items: [
          "Vous choisissez `rem` pour le texte et `px` pour les traits",
          "Vous savez écrire une couleur en `hsl()` avec transparence",
          "Vos variables de thème sont déclarées sur `:root`",
          "Vous connaissez `calc()` et la valeur de repli de `var()`"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-07",
          title: "Un composant piloté par variables",
          difficulty: 1,
          goal: "Déclarer des custom properties et les consommer avec `calc()`.",
          instructions: [
            "Déclarez `--espace: 12px` et `--rayon: 10px` dans une règle `:root`.",
            "Sur `.carte`, utilisez `var(--espace)` pour le padding (les quatre côtés) et `var(--rayon)` pour le `border-radius`.",
            "Sur `.carte p`, mettez `margin-top: calc(var(--espace) * 2)`."
          ],
          hint: "Une variable se déclare `--nom: valeur;` et s'utilise `var(--nom)`. Dans `calc()`, gardez des espaces autour de `*`.",
          starter: { html: `<section class="carte">
  <h2>Forfait Essentiel</h2>
  <p>12 € par mois, sans engagement.</p>
</section>`, css: `.carte {
  background: hsl(220 60% 97%);
}`, js: "" },
          solution: { html: `<section class="carte">
  <h2>Forfait Essentiel</h2>
  <p>12 € par mois, sans engagement.</p>
</section>`, css: `:root {
  --espace: 12px;
  --rayon: 10px;
}

.carte {
  background: hsl(220 60% 97%);
  padding: var(--espace);
  border-radius: var(--rayon);
}

.carte p {
  margin-top: calc(var(--espace) * 2);
}`, js: "" },
          checks: [
            "!!document.querySelector('.carte') && style('.carte','paddingTop') === '12px'",
            "style('.carte','borderRadius') === '10px'",
            "style('.carte p','marginTop') === '24px'"
          ],
          checklist: [
            "Le padding de la carte vaut 12px",
            "Le radius vaut 10px",
            "Le paragraphe a une marge haute de 24px"
          ]
        },
        {
          id: "css-ex-08",
          title: "Tailles en `rem`, variables en tête",
          difficulty: 2,
          goal: "Exprimer des tailles de texte en `rem` et les centraliser dans des variables.",
          instructions: [
            "Dans `:root`, déclarez `--taille-titre: 1.5rem`, `--taille-texte: 0.875rem` et `--interlettre: 2px`.",
            "Appliquez `var(--taille-titre)` à `.titre` et `var(--taille-texte)` à `.texte`.",
            "Ajoutez `letter-spacing: var(--interlettre)` sur `.titre` uniquement.",
            "Aucune valeur en `px` ne doit apparaître pour les tailles de police."
          ],
          hint: "Avec une racine à 16px, `1.5rem` = 24px et `0.875rem` = 14px. `letter-spacing` n'est pas hérité par défaut sur les autres blocs si vous le ciblez sur `.titre`.",
          starter: { html: `<h1 class="titre">Studio Lumen</h1>
<p class="texte">Design d'interfaces claires et accessibles.</p>`, css: `body {
  font-family: system-ui, sans-serif;
}`, js: "" },
          solution: { html: `<h1 class="titre">Studio Lumen</h1>
<p class="texte">Design d'interfaces claires et accessibles.</p>`, css: `:root {
  --taille-titre: 1.5rem;
  --taille-texte: 0.875rem;
  --interlettre: 2px;
}

body {
  font-family: system-ui, sans-serif;
}

.titre {
  font-size: var(--taille-titre);
  letter-spacing: var(--interlettre);
}

.texte {
  font-size: var(--taille-texte);
}`, js: "" },
          checks: [
            "!!document.querySelector('.titre') && style('.titre','fontSize') === '24px'",
            "style('.titre','letterSpacing') === '2px'",
            "style('.texte','fontSize') === '14px'"
          ],
          checklist: [
            "Le titre mesure 24px, soit 1.5rem",
            "L'interlettre du titre est de 2px",
            "Le paragraphe mesure 14px, soit 0.875rem"
          ]
        }
      ]
    },
    {
      id: "css-05",
      title: "Typographie : hiérarchie, rythme et lisibilité",
      minutes: 40,
      summary: "Poser une hiérarchie typographique claire avec des polices qui se chargent proprement.",
      objectives: [
        "Construire une pile de polices de repli fiable",
        "Régler `line-height`, `letter-spacing`, `font-weight` et `text-align` avec discernement",
        "Utiliser une échelle typographique fluide",
        "Améliorer la lisibilité d'un long texte"
      ],
      content: [
        { type: "lead", text: "Sur le Web, 90 % du contenu est du texte. Une page dont la typographie est soignée paraît professionnelle même avec peu de couleurs et pas d'images. Inversement, un beau dégradé ne sauve pas 14px de texte gris clair sur blanc, ni un interlignage de 1.1." },
        { type: "h", level: 2, text: "Familles de polices et repli" },
        { type: "code", lang: "css", caption: "Chaque pile finit par une famille générique : c'est le filet de sécurité.", code: `body {
  /* UI : la police système, chargée instantanément, cohérente avec l'OS */
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

.lecture {
  /* confort de lecture longue : une serif classique */
  font-family: Georgia, "Times New Roman", serif;
}

code, pre {
  font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
}` },
        { type: "p", text: "Les polices à plusieurs mots se mettent entre guillemets (`\"Segoe UI\"`). La famille générique finale (`sans-serif`, `serif`, `monospace`) garantit un rendu lisible même si aucune police nommée n'existe. `system-ui` est un excellent choix par défaut : zéro octet téléchargé, rendu immédiat, aspect natif sur chaque système." },
        { type: "code", lang: "html", caption: "Une police distante se charge avec la balise `link` placée dans le `head`.", code: `<!-- Dans le <head>, avant votre feuille de style -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">

<!-- puis dans le CSS -->
<!-- body { font-family: "Inter", system-ui, sans-serif; } -->` },
        { type: "callout", tone: "warning", title: "Police distante = dépendance réseau", text: "Une police chargée depuis un CDN peut ne jamais arriver : réseau lent, coupure, blocage. `display=swap` affiche immédiatement la police de repli puis substitue la police définitive — c'est un compromis visuel (le *flash of unstyled text*) mais le contenu reste lisible. Pour un site sérieux, on auto-héberge le fichier `.woff2` avec `@font-face` : plus rapide, plus fiable, sans requête vers un tiers.", items: [
          "Toujours terminer la pile par une famille générique",
          "Limitez-vous à deux familles : titres + texte",
          "Prévoyez `font-display: swap` si vous utilisez `@font-face`"
        ] },
        { type: "h", level: 2, text: "Taille, interlignage et rythme" },
        { type: "code", lang: "css", caption: "Une échelle typographique fluide et un rythme vertical régulier.", code: `:root {
  --echelle-1: clamp(1.5rem, 3vw, 2rem);
  --echelle-2: clamp(2rem, 5vw, 3rem);
}

h1 {
  font-size: var(--echelle-2);   /* 32px → 48px selon l'écran */
  line-height: 1.1;              /* grands titres : interligne serré */
  letter-spacing: -0.02em;       /* les grosses tailles respirent mal sans cela */
  text-wrap: balance;            /* répartit les lignes du titre */
}

h2 {
  font-size: var(--echelle-1);
  line-height: 1.2;
}

p {
  font-size: 1rem;
  line-height: 1.6;              /* corps de texte : 1.5 à 1.7 */
  max-width: 68ch;
  margin-block: 0 1em;
  text-wrap: pretty;             /* évite les mots orphelins en fin de paragraphe */
}

.surtitre {
  text-transform: uppercase;
  letter-spacing: 0.12em;        /* les capitales ont besoin d'air */
  font-size: 0.75rem;
  font-weight: 600;
}` },
        { type: "p", text: "Le `line-height` sans unité (`1.6`) se transmet comme un **ratio** : chaque élément calcule son interligne à partir de sa propre taille. Un `line-height: 26px` hérité se propage en valeur fixe et écrase les grands titres. Utilisez donc toujours une valeur sans unité — c'est le réglage le plus souvent oublié. `letter-spacing` suit la règle inverse : plus la police est grande, plus l'interlettre doit être resserrée ; pour les capitales, elle doit être ouverte." },
        { type: "callout", tone: "tip", title: "Trois règles de lisibilité", text: "Un texte se lit bien quand sa **largeur** reste entre 45 et 75 caractères (d'où `max-width: 68ch`), quand son **interligne** est 1.5 à 1.7 fois sa taille, et quand son **contraste** atteint 4.5:1 avec le fond. Ces trois réglages font plus pour l'accessibilité que n'importe quelle animation.", items: [
          "`font-weight: 400` pour le corps, `600`/`700` pour les titres : pas de graisse « moyenne » improvisée",
          "Évitez le texte justifié en français : les espaces se déchirent entre les mots",
          "`text-shadow` avec parcimonie — un texte flouté perd en netteté et en contraste"
        ] },
        { type: "demo", title: "Une hiérarchie typographique", height: 280, html: `<article class="article">
  <p class="surtitre">Design d'interface</p>
  <h2>Pourquoi l'interligne change tout</h2>
  <p class="chapeau">Un paragraphe trop serré fatigue l'œil et fait abandonner la lecture.</p>
  <p>Un interlignage de 1.6, une largeur de 68 caractères et une taille de texte d'au moins 16px suffisent à rendre un contenu agréable, sans dépenser un seul octet de police distante.</p>
</article>`, css: `body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; color: hsl(222 20% 18%); }
.article { max-width: 60ch; }
.surtitre {
  margin: 0 0 6px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: hsl(228 76% 52%);
}
.article h2 {
  margin: 0 0 10px;
  font-size: clamp(1.4rem, 4vw, 1.9rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.chapeau {
  margin: 0 0 12px;
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.5;
  color: hsl(222 15% 32%);
}
.article p {
  margin: 0 0 1em;
  font-size: 1rem;
  line-height: 1.65;
  text-wrap: pretty;
}`, js: "" },
        { type: "checklist", items: [
          "Votre pile de polices finit toujours par `sans-serif` ou `serif`",
          "Vos `line-height` sont sans unité",
          "Vos lignes de texte ne dépassent pas ~75 caractères",
          "Vous savez qu'une police distante dépend du réseau"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-09",
          title: "Un titre qui affirme son style",
          difficulty: 1,
          goal: "Régler les trois propriétés de texte les plus visibles d'un titre.",
          instructions: [
            "Passez le titre en majuscules avec `text-transform: uppercase`.",
            "Ajoutez une interlettre de `1px` avec `letter-spacing`.",
            "Centrez le titre avec `text-align: center`."
          ],
          hint: "Les capitales ont besoin d'air : c'est exactement le rôle de `letter-spacing`. Ces trois propriétés se déclarent sur le sélecteur de classe du titre.",
          starter: { html: `<h1 class="titre">Notre manifeste</h1>
<p>Nous concevons des interfaces sobres et accessibles.</p>`, css: `body {
  font-family: system-ui, sans-serif;
}`, js: "" },
          solution: { html: `<h1 class="titre">Notre manifeste</h1>
<p>Nous concevons des interfaces sobres et accessibles.</p>`, css: `body {
  font-family: system-ui, sans-serif;
}

.titre {
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
}`, js: "" },
          checks: [
            "!!document.querySelector('.titre') && style('.titre','textTransform') === 'uppercase'",
            "style('.titre','letterSpacing') === '1px'",
            "style('.titre','textAlign') === 'center'"
          ],
          checklist: [
            "Le titre est en majuscules",
            "L'interlettre vaut 1px",
            "Le titre est centré"
          ]
        },
        {
          id: "css-ex-10",
          title: "Trois niveaux de texte",
          difficulty: 2,
          goal: "Construire une hiérarchie typographique avec un chapeau, un corps et une citation.",
          instructions: [
            "`.chapeau` : taille `1.125rem` et `font-weight: 600`.",
            "`.citation` : `font-style: italic` et `font-weight: 600`.",
            "`.pied` : taille `0.875rem` et `font-weight: 400`.",
            "Conservez `line-height: 1.6` sur le paragraphe du corps."
          ],
          hint: "Avec une racine à 16px, `1.125rem` fait 18px et `0.875rem` fait 14px. Chaque niveau se cible par sa classe.",
          starter: { html: `<article class="article">
  <p class="chapeau">Le design est un service, pas une décoration.</p>
  <p>Un texte se juge à sa lisibilité, avant son originalité.</p>
  <p class="citation">La forme suit la fonction.</p>
  <p class="pied">Publié le 12 mars</p>
</article>`, css: `body {
  font-family: system-ui, sans-serif;
}

.article p {
  line-height: 1.6;
}`, js: "" },
          solution: { html: `<article class="article">
  <p class="chapeau">Le design est un service, pas une décoration.</p>
  <p>Un texte se juge à sa lisibilité, avant son originalité.</p>
  <p class="citation">La forme suit la fonction.</p>
  <p class="pied">Publié le 12 mars</p>
</article>`, css: `body {
  font-family: system-ui, sans-serif;
}

.article p {
  line-height: 1.6;
}

.chapeau {
  font-size: 1.125rem;
  font-weight: 600;
}

.citation {
  font-style: italic;
  font-weight: 600;
}

.pied {
  font-size: 0.875rem;
  font-weight: 400;
}`, js: "" },
          checks: [
            "!!document.querySelector('.chapeau') && style('.chapeau','fontSize') === '18px'",
            "style('.chapeau','fontWeight') === '600'",
            "style('.citation','fontStyle') === 'italic'",
            "style('.pied','fontSize') === '14px'"
          ],
          checklist: [
            "Le chapeau mesure 18px en graisse 600",
            "La citation est en italique",
            "Le pied de page mesure 14px"
          ]
        }
      ]
    },
    {
      id: "css-06",
      title: "Flexbox en profondeur",
      minutes: 45,
      summary: "Aligner, répartir et centrer des éléments sur un axe, avec un code court et prévisible.",
      objectives: [
        "Identifier l'axe principal et l'axe secondaire",
        "Maîtriser `justify-content`, `align-items` et `gap`",
        "Comprendre `flex-grow`, `flex-shrink` et `flex-basis`",
        "Reproduire les patterns classiques : barre de navigation, centrage, carte horizontale"
      ],
      content: [
        { type: "lead", text: "Flexbox répond à une question simple : comment répartir plusieurs éléments sur une ligne (ou une colonne) en gérant l'alignement, l'espacement et le débordement ? C'est l'outil des composants — barre de navigation, boutons de formulaire, carte, liste d'étiquettes." },
        { type: "h", level: 2, text: "Deux axes, une seule logique" },
        { type: "code", lang: "css", caption: "Le squelette minimal : un conteneur flex et ses enfants directs.", code: `.barre {
  display: flex;              /* active Flexbox pour les enfants directs */
  flex-direction: row;        /* axe principal = horizontal (défaut) */
  justify-content: space-between; /* répartit sur l'axe PRINCIPAL */
  align-items: center;        /* aligne sur l'axe SECONDAIRE */
  gap: 16px;                  /* espace entre les enfants, sans marge */
  padding: 12px 20px;
}` },
        { type: "p", text: "La règle mentale à retenir : `justify-content` travaille sur l'axe **principal**, `align-items` sur l'axe **secondaire**. Avec `flex-direction: row` (valeur par défaut), le principal est horizontal ; dès que vous passez en `column`, les deux axes s'inversent et vos deux propriétés échangent leur effet. C'est la source de confusion numéro un en Flexbox." },
        { type: "table", head: ["Propriété", "Valeurs utiles", "Effet"], rows: [
          ["`justify-content`", "`flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`", "répartition sur l'axe principal"],
          ["`align-items`", "`stretch`, `flex-start`, `center`, `flex-end`, `baseline`", "alignement sur l'axe secondaire, pour tous les enfants"],
          ["`align-self`", "les mêmes valeurs", "exception pour un seul enfant"],
          ["`flex-wrap`", "`nowrap`, `wrap`, `wrap-reverse`", "autorise le passage à la ligne"],
          ["`gap`", "une longueur, ex. `12px`", "espace entre les enfants, remplace les marges"]
        ] },
        { type: "code", lang: "css", caption: "Les trois patterns que vous réutiliserez toute votre carrière.", code: `/* 1. Centrage parfait — plus besoin de position absolute */
.centre {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
}

/* 2. Liste d'étiquettes qui passe à la ligne automatiquement */
.etiquettes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 3. Carte horizontale : média fixe + contenu élastique */
.carte {
  display: flex;
  gap: 16px;
  align-items: center;
}
.carte .media { flex: 0 0 96px; height: 96px; }
.carte .contenu { flex: 1 1 auto; min-width: 0; } /* min-width:0 évite le débordement du texte */` },
        { type: "callout", tone: "tip", title: "Le centrage en trois lignes", text: "`display: flex; align-items: center; justify-content: center;` centre **dans les deux directions**. Ce trio remplace l'ancienne astuce `position: absolute` + `transform` dans la grande majorité des cas, et fonctionne aussi bien pour une icône dans un bouton que pour un écran de chargement.", items: [
          "`gap` est géré par le conteneur : plus besoin de `.enfant:not(:last-child) { margin-right: … }`",
          "`margin: 0 auto` sur un seul enfant flex le pousse à droite dans une barre de navigation",
          "`min-height` plutôt que `height` sur le conteneur : laissez-le grandir si le contenu augmente"
        ] },
        { type: "h", level: 2, text: "`flex-grow`, `flex-shrink`, `flex-basis`" },
        { type: "p", text: "Ces trois propriétés décident de la part de chaque enfant. `flex-basis` donne la taille de départ (avant répartition) ; `flex-grow` indique la part de l'espace **libre** que l'enfant peut prendre (0 = ne grandit pas, 1 = grandit) ; `flex-shrink` indique s'il peut rétrécir quand la place manque. Le raccourci `flex: 1` équivaut à `1 1 0%` : tous les enfants se partagent la place à parts égales, quelle que soit leur taille initiale." },
        { type: "code", lang: "css", caption: "Élastique, fixe, ou à moitié : trois usages du raccourci `flex`.", code: `.contenu   { flex: 1; }             /* prend tout l'espace restant */
.avatar    { flex: 0 0 48px; }      /* fixe : ne grandit ni ne rétrécit */
.colonne   { flex: 1 1 220px; }     /* grandit, mais passe à la ligne si besoin */
.titre-long { min-width: 0; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }` },
        { type: "callout", tone: "warning", title: "Deux pièges de Flexbox", text: "Premier piège : un enfant flex refuse de devenir plus petit que son contenu. Un titre long fait donc déborder toute la ligne. La solution est `min-width: 0` sur l'enfant (ou `overflow-wrap: anywhere`). Deuxième piège : `align-items: stretch` est la valeur par défaut, donc deux cartes dans une ligne prennent la même hauteur — souvent voulu, parfois surprenant ; `align-items: flex-start` rétablit des hauteurs naturelles.", items: [
          "Les marges ne s'effondrent pas dans un conteneur flex : utilisez `gap`",
          "`flex-wrap: wrap` est indispensable dès qu'il y a plusieurs enfants de largeur variable",
          "Attention à `flex: 1` sur une image : ajoutez `min-height: 0` ou `align-self: start` si elle s'écrase"
        ] },
        { type: "demo", title: "Barre de navigation et centrage", height: 260, html: `<nav class="barre">
  <span class="logo">Lumen</span>
  <ul class="liens">
    <li>Accueil</li>
    <li>Projets</li>
    <li>Équipe</li>
  </ul>
  <button class="cta" type="button">Devis</button>
</nav>
<div class="zone"><p class="centre">Centré dans les deux axes</p></div>`, css: `body { margin: 0; font-family: system-ui, sans-serif; }
.barre {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 18px;
  background: hsl(228 35% 98%);
  border-bottom: 1px solid hsl(228 20% 88%);
}
.logo { font-weight: 700; letter-spacing: -0.02em; }
.liens { display: flex; gap: 18px; list-style: none; margin: 0; padding: 0; font-size: 0.9rem; }
.cta {
  border: 0;
  border-radius: 8px;
  padding: 8px 14px;
  background: hsl(228 76% 52%);
  color: white;
  font: inherit;
  cursor: pointer;
}
.zone {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  margin: 14px;
  border-radius: 14px;
  background: linear-gradient(135deg, hsl(228 76% 96%), hsl(190 70% 94%));
}
.centre { margin: 0; font-weight: 600; color: hsl(228 40% 30%); }`, js: "" },
        { type: "checklist", items: [
          "Vous savez quel axe contrôle `justify-content` et lequel contrôle `align-items`",
          "Vous centrez un contenu avec trois déclarations, sans `position: absolute`",
          "Vous utilisez `gap` plutôt que des marges entre enfants",
          "Vous savez à quoi sert `min-width: 0` sur un enfant flex"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-11",
          title: "La barre de navigation",
          difficulty: 1,
          goal: "Aligner trois zones sur une seule ligne avec Flexbox.",
          instructions: [
            "Passez `.barre` en `display: flex`.",
            "Répartissez les trois zones aux extrémités avec `justify-content: space-between`.",
            "Alignez verticalement les éléments au centre avec `align-items: center`.",
            "Ajoutez un `gap: 16px` entre les fils de la barre."
          ],
          hint: "Le conteneur flex se déclare sur le parent (`.barre`), pas sur les enfants. `justify-content` gère l'axe horizontal, `align-items` l'axe vertical.",
          starter: { html: `<header class="barre">
  <span class="logo">Lumen</span>
  <span class="slogan">Studio de design</span>
  <button class="cta" type="button">Devis</button>
</header>`, css: `.barre {
  padding: 12px 16px;
  background: hsl(228 35% 98%);
}`, js: "" },
          solution: { html: `<header class="barre">
  <span class="logo">Lumen</span>
  <span class="slogan">Studio de design</span>
  <button class="cta" type="button">Devis</button>
</header>`, css: `.barre {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: hsl(228 35% 98%);
}`, js: "" },
          checks: [
            "!!document.querySelector('.barre') && style('.barre','display') === 'flex'",
            "style('.barre','justifyContent') === 'space-between'",
            "style('.barre','alignItems') === 'center'",
            "style('.barre','gap') === '16px'"
          ],
          checklist: [
            "La barre est un conteneur flex",
            "Les trois zones sont réparties aux extrémités",
            "Les éléments sont centrés verticalement",
            "L'espacement entre les enfants est de 16px"
          ]
        },
        {
          id: "css-ex-12",
          title: "Centrage vertical et horizontal",
          difficulty: 2,
          goal: "Centrer un contenu dans une zone de hauteur fixée, en colonne.",
          instructions: [
            "Sur `.zone`, activez Flexbox avec `flex-direction: column`.",
            "Centre horizontalement avec `justify-content: center` et verticalement avec `align-items: center`.",
            "Donnez à `.zone` une `min-height: 200px` et un `gap: 8px`.",
            "Le texte doit rester centré (`text-align: center`)."
          ],
          hint: "En `column`, l'axe principal devient vertical : `justify-content` gère donc le haut/bas et `align-items` la gauche/droite.",
          starter: { html: `<section class="zone">
  <h2 class="titre">Aucun résultat</h2>
  <p class="aide">Essayez un autre mot-clé.</p>
</section>`, css: `.zone {
  background: hsl(228 35% 97%);
  border-radius: 14px;
}`, js: "" },
          solution: { html: `<section class="zone">
  <h2 class="titre">Aucun résultat</h2>
  <p class="aide">Essayez un autre mot-clé.</p>
</section>`, css: `.zone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  min-height: 200px;
  text-align: center;
  background: hsl(228 35% 97%);
  border-radius: 14px;
}`, js: "" },
          checks: [
            "!!document.querySelector('.zone') && style('.zone','display') === 'flex'",
            "style('.zone','flexDirection') === 'column'",
            "style('.zone','justifyContent') === 'center'",
            "style('.zone','alignItems') === 'center'",
            "style('.zone','minHeight') === '200px'"
          ],
          checklist: [
            "La zone est une colonne flex",
            "Le contenu est centré sur les deux axes",
            "La zone mesure au moins 200px de haut"
          ]
        },
        {
          id: "css-ex-13",
          title: "Carte horizontale élastique",
          difficulty: 3,
          goal: "Combiner une vignette fixe et un contenu qui absorbe l'espace restant.",
          instructions: [
            "`.carte` : `display: flex`, `gap: 16px` et `flex-wrap: wrap`.",
            "`.media` : `flex: 0 0 120px` pour une vignette de largeur fixe.",
            "`.contenu` : `flex: 1` et `min-width: 0` pour absorber l'espace sans déborder.",
            "Donnez à `.media` une hauteur de `90px`."
          ],
          hint: "`flex: 0 0 120px` signifie « ne grandis pas, ne rétrécis pas, pars de 120px ». `min-width: 0` autorise le contenu à se réduire sous la largeur de son texte.",
          starter: { html: `<article class="carte">
  <div class="media"></div>
  <div class="contenu">
    <h3>Atelier CSS</h3>
    <p>Trois heures pour repartir avec une mise en page solide.</p>
  </div>
</article>`, css: `.carte {
  background: hsl(228 40% 98%);
  border-radius: 14px;
  padding: 14px;
}

.media {
  background: linear-gradient(135deg, hsl(228 76% 60%), hsl(190 70% 55%));
  border-radius: 10px;
}`, js: "" },
          solution: { html: `<article class="carte">
  <div class="media"></div>
  <div class="contenu">
    <h3>Atelier CSS</h3>
    <p>Trois heures pour repartir avec une mise en page solide.</p>
  </div>
</article>`, css: `.carte {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  background: hsl(228 40% 98%);
  border-radius: 14px;
  padding: 14px;
}

.media {
  flex: 0 0 120px;
  height: 90px;
  background: linear-gradient(135deg, hsl(228 76% 60%), hsl(190 70% 55%));
  border-radius: 10px;
}

.contenu {
  flex: 1;
  min-width: 0;
}`, js: "" },
          checks: [
            "!!document.querySelector('.carte') && style('.carte','display') === 'flex'",
            "style('.carte','flexWrap') === 'wrap'",
            "style('.carte','gap') === '16px'",
            "style('.media','flexBasis') === '120px'",
            "style('.contenu','flexGrow') === '1'"
          ],
          checklist: [
            "La carte est un conteneur flex qui peut passer à la ligne",
            "La vignette démarre à 120px et reste fixe",
            "Le contenu grandit pour occuper le reste",
            "L'espacement interne est de 16px"
          ]
        }
      ]
    },
    {
      id: "css-07",
      title: "CSS Grid : composer des pages entières",
      minutes: 45,
      summary: "Poser une grille en deux dimensions, nommer ses zones et placer les éléments sans calcul.",
      objectives: [
        "Définir des colonnes avec `repeat()`, `minmax()` et `auto-fit`",
        "Placer un élément avec `grid-column` et `grid-row`",
        "Structurer une page avec `grid-template-areas`",
        "Choisir entre Grid et Flexbox selon le problème"
      ],
      content: [
        { type: "lead", text: "Flexbox aligne sur **un** axe. Grid découpe l'espace sur **deux** axes à la fois : c'est l'outil des mises en page — colonnes de page, galeries, tableaux de bord. Vous décrivez la grille, puis vous placez les éléments dedans ; le navigateur calcule les tailles." },
        { type: "h", level: 2, text: "Définir les colonnes" },
        { type: "code", lang: "css", caption: "Trois façons de déclarer des colonnes, du plus explicite au plus souple.", code: `/* 1. Trois colonnes égales, écrites à la main */
.grille { display: grid; grid-template-columns: 1fr 1fr 1fr; }

/* 2. La même chose avec repeat() */
.grille { grid-template-columns: repeat(3, 1fr); }

/* 3. Colonnes de 180px minimum, qui se multiplient selon la place */
.galerie {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}` },
        { type: "p", text: "L'unité `fr` (fraction) partage l'espace **libre** après déduction des `gap` et des tailles fixes. `minmax(180px, 1fr)` signifie : jamais moins de 180px, et si la place le permet, prends une part de l'espace restant. Combiné à `auto-fit`, ce couple crée une galerie réellement responsive **sans une seule media query** — probablement l'astuce CSS la plus rentable du métier." },
        { type: "table", head: ["Besoin", "Outil", "Pourquoi"], rows: [
          ["Aligner des éléments sur une ligne", "Flexbox", "un seul axe, `gap` et alignement"],
          ["Construire une page en zones", "Grid", "deux dimensions, zones nommées"],
          ["Galerie de cartes de largeur minimale", "Grid + `auto-fit`", "colonnes calculées automatiquement"],
          ["Centrer une icône dans son bouton", "Flexbox", "trois déclarations suffisent"],
          ["Superposer des éléments", "`position`", "ni Flexbox ni Grid ne superposent"]
        ] },
        { type: "h", level: 2, text: "Placer un élément" },
        { type: "code", lang: "css", caption: "Les numéros de lignes commencent à 1 ; `span` compte les pistes traversées.", code: `.grille {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.vedette {
  grid-column: 1 / 3;   /* de la ligne 1 à la ligne 3 : deux colonnes */
  grid-row: 1 / 2;
}

.bandeau {
  grid-column: span 4;  /* traverse les quatre colonnes */
}

/* Négatif = depuis la fin : -1 est la dernière ligne */
.pied { grid-column: 1 / -1; }` },
        { type: "h", level: 2, text: "`grid-template-areas` : la grille qui se lit" },
        { type: "code", lang: "css", caption: "On dessine la page en ASCII, puis on affecte les zones.", code: `.page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    "entete entete"
    "principal cote"
    "pied   pied";
  gap: 16px;
}

.page > header { grid-area: entete; }
.page > main   { grid-area: principal; }
.page > aside  { grid-area: cote; }
.page > footer { grid-area: pied; }` },
        { type: "callout", tone: "tip", title: "`auto-fit` contre `auto-fill`", text: "Les deux calculent le nombre de colonnes possibles. `auto-fill` conserve les colonnes vides (les cartes gardent leur largeur minimale) ; `auto-fit` **effondre** les colonnes vides et laisse les cartes s'étirer pour remplir la ligne. Pour une galerie de 3 cartes sur un écran large, c'est `auto-fit` que vous voulez : les cartes occupent toute la largeur au lieu de rester collées à gauche.", items: [
          "`gap` remplace `grid-gap` (ancien nom, encore accepté mais inutile)",
          "`auto-rows: 120px` force la hauteur de toutes les lignes implicites",
          "`place-items: center` centre le contenu de chaque cellule en une ligne"
        ] },
        { type: "callout", tone: "warning", title: "Piège : les zones doivent être rectangulaires", text: "Chaque nom de `grid-template-areas` doit former un **rectangle** de cellules adjacentes. Une zone en forme de L est invalide et le navigateur ignore silencieusement toute la déclaration — vous vous retrouvez avec une grille sans nom. Autre piège : `grid-area` sur un enfant qui n'existe pas dans la grille ne produit aucune erreur, l'élément est simplement placé automatiquement.", items: [
          "Comptez les colonnes de chaque ligne du dessin : elles doivent être identiques",
          "Un point `.` désigne une cellule vide",
          "Les noms de zones sont sensibles à la casse"
        ] },
        { type: "demo", title: "Un layout magazine en zones nommées", height: 300, html: `<div class="page">
  <header>Entête</header>
  <main>Contenu principal</main>
  <aside>Encadré</aside>
  <footer>Pied de page</footer>
</div>`, css: `body { margin: 0; padding: 12px; font-family: system-ui, sans-serif; }
.page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    "entete entete"
    "principal cote"
    "pied pied";
  gap: 12px;
  color: hsl(228 30% 18%);
}
.page > * {
  padding: 14px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}
header { grid-area: entete; background: hsl(228 76% 52%); color: white; }
main   { grid-area: principal; background: hsl(228 60% 96%); min-height: 110px; }
aside  { grid-area: cote; background: hsl(190 70% 93%); }
footer { grid-area: pied; background: hsl(228 25% 92%); }`, js: "" },
        { type: "checklist", items: [
          "Vous savez écrire `repeat(auto-fit, minmax(180px, 1fr))` de mémoire",
          "Vous savez placer un élément avec `grid-column: span 2`",
          "Vous savez dessiner une page avec `grid-template-areas`",
          "Vous savez dire quand Grid est meilleur que Flexbox"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-14",
          title: "Une galerie en grille",
          difficulty: 1,
          goal: "Poser une grille explicite avec des gouttières régulières.",
          instructions: [
            "Passez `.galerie` en `display: grid`.",
            "Déclarez trois colonnes égales avec `grid-template-columns: repeat(3, 1fr)`.",
            "Ajoutez `gap: 12px` et imposez des lignes de `80px` avec `grid-auto-rows`."
          ],
          hint: "`repeat(3, 1fr)` est un raccourci ; `grid-auto-rows` fixe la hauteur des lignes créées automatiquement.",
          starter: { html: `<div class="galerie">
  <div class="vignette">1</div>
  <div class="vignette">2</div>
  <div class="vignette">3</div>
  <div class="vignette">4</div>
  <div class="vignette">5</div>
  <div class="vignette">6</div>
</div>`, css: `.vignette {
  background: hsl(228 76% 60%);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}`, js: "" },
          solution: { html: `<div class="galerie">
  <div class="vignette">1</div>
  <div class="vignette">2</div>
  <div class="vignette">3</div>
  <div class="vignette">4</div>
  <div class="vignette">5</div>
  <div class="vignette">6</div>
</div>`, css: `.galerie {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 80px;
  gap: 12px;
}

.vignette {
  background: hsl(228 76% 60%);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}`, js: "" },
          checks: [
            "!!document.querySelector('.galerie') && style('.galerie','display') === 'grid'",
            "style('.galerie','gap') === '12px'",
            "style('.galerie','gridAutoRows') === '80px'",
            "style('.galerie','gridTemplateColumns') !== 'none'"
          ],
          checklist: [
            "La galerie est une grille",
            "Les gouttières valent 12px",
            "Les lignes automatiques mesurent 80px",
            "Des colonnes sont bien définies"
          ]
        },
        {
          id: "css-ex-15",
          title: "Une page en zones nommées",
          difficulty: 2,
          goal: "Décrire une mise en page complète avec `grid-template-areas`.",
          instructions: [
            "Sur `.page`, activez `display: grid` avec deux colonnes `2fr 1fr`.",
            "Déclarez les zones : `\"entete entete\"`, `\"principal cote\"`, `\"pied pied\"`.",
            "Affectez `grid-area` aux quatre enfants (`entete`, `principal`, `cote`, `pied`).",
            "Ajoutez `gap: 12px`."
          ],
          hint: "Le dessin doit former un rectangle par zone, avec le même nombre de cellules sur chaque ligne. `grid-area: entete` sur l'enfant fait le lien avec le nom du dessin.",
          starter: { html: `<div class="page">
  <header>Entête</header>
  <main>Principal</main>
  <aside>Côté</aside>
  <footer>Pied</footer>
</div>`, css: `.page > * {
  padding: 12px;
  border-radius: 10px;
  background: hsl(228 60% 96%);
}`, js: "" },
          solution: { html: `<div class="page">
  <header>Entête</header>
  <main>Principal</main>
  <aside>Côté</aside>
  <footer>Pied</footer>
</div>`, css: `.page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    "entete entete"
    "principal cote"
    "pied pied";
  gap: 12px;
}

.page > * {
  padding: 12px;
  border-radius: 10px;
  background: hsl(228 60% 96%);
}

header { grid-area: entete; }
main   { grid-area: principal; }
aside  { grid-area: cote; }
footer { grid-area: pied; }`, js: "" },
          checks: [
            "!!document.querySelector('.page') && style('.page','display') === 'grid'",
            "style('.page','gridTemplateAreas').includes('entete')",
            "style('.page','gridTemplateAreas').includes('principal')",
            "style('.page','gap') === '12px'"
          ],
          checklist: [
            "La page est une grille à deux colonnes",
            "Les zones `entete`, `principal`, `cote` et `pied` existent",
            "L'entête et le pied occupent toute la largeur",
            "Les gouttières valent 12px"
          ]
        },
        {
          id: "css-ex-16",
          title: "Une galerie qui s'adapte toute seule",
          difficulty: 3,
          goal: "Composer `auto-fit` et `minmax` pour obtenir une grille responsive sans media query.",
          instructions: [
            "Sur `.galerie`, activez `display: grid`.",
            "Utilisez `grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))`.",
            "Ajoutez `gap: 16px` et une `min-height: 240px` sur `.galerie`.",
            "Donnez à `.carte` un `border-radius: 12px`."
          ],
          hint: "`auto-fit` effondre les colonnes vides, `minmax(140px, 1fr)` garantit une largeur minimale : la galerie s'adapte d'elle-même à la largeur disponible.",
          starter: { html: `<div class="galerie">
  <div class="carte">Un</div>
  <div class="carte">Deux</div>
  <div class="carte">Trois</div>
</div>`, css: `.carte {
  background: linear-gradient(135deg, hsl(228 76% 60%), hsl(190 70% 55%));
  color: white;
  padding: 16px;
  font-weight: 700;
  font-family: system-ui, sans-serif;
}`, js: "" },
          solution: { html: `<div class="galerie">
  <div class="carte">Un</div>
  <div class="carte">Deux</div>
  <div class="carte">Trois</div>
</div>`, css: `.galerie {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  min-height: 240px;
}

.carte {
  background: linear-gradient(135deg, hsl(228 76% 60%), hsl(190 70% 55%));
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-weight: 700;
  font-family: system-ui, sans-serif;
}`, js: "" },
          checks: [
            "!!document.querySelector('.galerie') && style('.galerie','display') === 'grid'",
            "style('.galerie','gridTemplateColumns') !== 'none'",
            "style('.galerie','gap') === '16px'",
            "style('.carte','borderRadius') === '12px'"
          ],
          checklist: [
            "La galerie est une grille dont les colonnes sont calculées",
            "Les gouttières valent 16px",
            "Les cartes ont des coins arrondis",
            "Aucune media query n'a été nécessaire"
          ]
        }
      ]
    },
    {
      id: "css-08",
      title: "Positionnement, `z-index` et empilement",
      minutes: 40,
      summary: "Sortir un élément du flux sans casser la page, et comprendre qui passe devant qui.",
      objectives: [
        "Distinguer `static`, `relative`, `absolute`, `fixed` et `sticky`",
        "Placer un élément avec `top`, `right`, `bottom`, `left` ou `inset`",
        "Comprendre les contextes d'empilement et `z-index`",
        "Réaliser un en-tête collant, un badge et un fond de modale"
      ],
      content: [
        { type: "lead", text: "Les quatre propriétés de positionnement sont anciennes mais indispensables : un badge posé sur une vignette, un en-tête qui reste visible au défilement, une infobulle, une modale. À condition de savoir **par rapport à quoi** chaque valeur positionne l'élément — et c'est précisément là que tout le monde se trompe la première fois." },
        { type: "h", level: 2, text: "Les cinq valeurs de `position`" },
        { type: "table", head: ["Valeur", "Repère de placement", "Reste dans le flux ?", "Usage typique"], rows: [
          ["`static`", "aucun (défaut)", "oui", "comportement normal"],
          ["`relative`", "sa propre position d'origine", "oui, sa place est conservée", "servir de repère à un enfant absolu, décalage léger"],
          ["`absolute`", "l'ancêtre positionné le plus proche", "non, il ne prend plus de place", "badge, infobulle, menu déroulant"],
          ["`fixed`", "la fenêtre (viewport)", "non", "barre flottante, bouton retour en haut"],
          ["`sticky`", "le défilement : il reste dans son conteneur", "oui, jusqu'au point d'accroche", "en-tête de tableau, titre de section"]
        ] },
        { type: "code", lang: "css", caption: "Le duo `relative` + `absolute` : le pattern à connaître par cœur.", code: `.vignette {
  position: relative;   /* devient le repère du badge */
  border-radius: 12px;
  overflow: hidden;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;           /* ou inset-block-start / inset-inline-end */
  padding: 2px 8px;
  border-radius: 999px;
  background: hsl(0 72% 52%);
  color: white;
  font-size: 0.75rem;
}` },
        { type: "p", text: "Un élément `absolute` se positionne par rapport à son **ancêtre positionné** — c'est-à-dire un parent dont `position` n'est pas `static`. S'il n'en trouve aucun, il se place par rapport à la page initiale : c'est l'erreur classique du badge qui s'envole dans le coin de l'écran. La solution est presque toujours d'ajouter `position: relative` sur le conteneur direct. Et comme il ne prend plus de place dans le flux, les frères se replacent comme s'il n'existait pas : vérifiez toujours que le conteneur a la hauteur nécessaire." },
        { type: "h", level: 2, text: "`z-index` et contextes d'empilement" },
        { type: "code", lang: "css", caption: "Un empilement explicite et limité au composant concerné.", code: `.entete {
  position: sticky;
  top: 0;
  z-index: 10;
  background: hsl(228 35% 98%);
}

.fond-modale {
  position: fixed;
  inset: 0;             /* top:0; right:0; bottom:0; left:0 */
  z-index: 100;
  background: hsl(228 40% 10% / 0.5);
  backdrop-filter: blur(2px);
}

/* isolation crée un contexte d'empilement propre au composant */
.carte { position: relative; isolation: isolate; }` },
        { type: "callout", tone: "warning", title: "Piège : `z-index` n'est pas magique", text: "`z-index` n'a aucun effet sur un élément `static`. Et surtout : un nouveau **contexte d'empilement** est créé par `position` + `z-index`, mais aussi par `transform`, `filter`, `opacity` inférieure à 1, `backdrop-filter` ou `isolation`. Un enfant ne peut jamais dépasser le contexte de son parent : si un élément passe devant malgré un `z-index` énorme, cherchez un parent transformé qui l'enferme dans un plan inférieur.", items: [
          "Comparez les éléments au sein d'un même contexte, pas entre contextes",
          "Gardez une échelle courte : 10 pour l'entête, 100 pour les modales",
          "`isolation: isolate` est la façon propre de créer un contexte local sans effet visuel",
          "Un `transform` ou une `opacity` inférieure à 1 sur un parent crée un contexte et peut enfermer ses enfants derrière d'autres blocs"
        ] },
        { type: "h", level: 2, text: "Trois patterns courants" },
        { type: "code", lang: "css", caption: "En-tête collant, bouton flottant, menu déroulant.", code: `/* 1. En-tête collant : reste visible au défilement */
.entete { position: sticky; top: 0; z-index: 10; }

/* 2. Bouton flottant en bas à droite */
.retour-haut {
  position: fixed;
  inset-block-end: 20px;
  inset-inline-end: 20px;
  z-index: 20;
}

/* 3. Menu déroulant : caché, il apparaît au survol du parent */
.menu { position: relative; }
.menu-liste {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  display: none;
}
.menu:hover .menu-liste,
.menu:focus-within .menu-liste { display: block; }` },
        { type: "demo", title: "En-tête collant et badge", height: 260, html: `<div class="cadre">
  <header class="entete">En-tête collant</header>
  <p>Faites défiler cette zone : l'en-tête reste accroché en haut.</p>
  <p>Texte de remplissage pour provoquer le défilement.</p>
  <div class="vignette">
    <span class="badge">Nouveau</span>
  </div>
  <p>Encore du contenu pour allonger la zone.</p>
  <p>Fin du contenu.</p>
</div>`, css: `body { margin: 0; font-family: system-ui, sans-serif; }
.cadre { height: 220px; overflow-y: auto; padding: 0 14px 14px; background: hsl(228 40% 99%); }
.entete {
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 0 -14px;
  padding: 12px 14px;
  background: hsl(228 76% 52%);
  color: white;
  font-weight: 600;
}
.vignette {
  position: relative;
  height: 90px;
  border-radius: 12px;
  background: linear-gradient(135deg, hsl(228 70% 92%), hsl(190 70% 90%));
}
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 3px 9px;
  border-radius: 999px;
  background: hsl(0 72% 52%);
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
}
.cadre p { font-size: 0.85rem; color: hsl(228 20% 35%); }`, js: "" },
        { type: "checklist", items: [
          "Vous savez qu'`absolute` se place par rapport à l'ancêtre positionné",
          "Vous ajoutez `position: relative` sur le conteneur d'un badge",
          "Vous savez que `z-index` exige un positionnement non `static`",
          "Vous connaissez les contextes d'empilement créés par `transform` et `filter`"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-17",
          title: "Poser un badge sur une vignette",
          difficulty: 1,
          goal: "Utiliser `relative` sur le parent et `absolute` sur l'enfant.",
          instructions: [
            "Donnez à `.vignette` la propriété `position: relative`.",
            "Passez `.badge` en `position: absolute`.",
            "Placez le badge à `8px` du haut et `8px` de la droite avec `top` et `right`."
          ],
          hint: "Un enfant `absolute` ne se cale bien que si son parent est positionné : c'est tout l'intérêt de `relative` sur la vignette.",
          starter: { html: `<div class="vignette">
  <span class="badge">Nouveau</span>
</div>`, css: `.vignette {
  height: 120px;
  border-radius: 12px;
  background: linear-gradient(135deg, hsl(228 70% 92%), hsl(190 70% 90%));
}

.badge {
  padding: 3px 9px;
  border-radius: 999px;
  background: hsl(0 72% 52%);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
}`, js: "" },
          solution: { html: `<div class="vignette">
  <span class="badge">Nouveau</span>
</div>`, css: `.vignette {
  position: relative;
  height: 120px;
  border-radius: 12px;
  background: linear-gradient(135deg, hsl(228 70% 92%), hsl(190 70% 90%));
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 3px 9px;
  border-radius: 999px;
  background: hsl(0 72% 52%);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
}`, js: "" },
          checks: [
            "!!document.querySelector('.vignette') && style('.vignette','position') === 'relative'",
            "style('.badge','position') === 'absolute'",
            "style('.badge','top') === '8px'",
            "style('.badge','right') === '8px'"
          ],
          checklist: [
            "La vignette sert de repère",
            "Le badge est hors du flux",
            "Le badge est à 8px du haut et de la droite"
          ]
        },
        {
          id: "css-ex-18",
          title: "En-tête collant et bouton flottant",
          difficulty: 2,
          goal: "Distinguer `sticky` (collé au défilement) de `fixed` (collé à la fenêtre).",
          instructions: [
            "Sur `.entete`, utilisez `position: sticky`, `top: 0` et `z-index: 10`.",
            "Sur `.retour-haut`, utilisez `position: fixed` et placez-le en bas à droite avec `inset-block-end: 20px` et `inset-inline-end: 20px`.",
            "Gardez l'en-tête au-dessus du contenu grâce à son `z-index`.",
            "N'utilisez pas `absolute` pour ces deux éléments."
          ],
          hint: "`sticky` a besoin d'un seuil (`top: 0`) et d'un conteneur qui défile. `fixed` sort complètement du flux et se cale sur la fenêtre.",
          starter: { html: `<div class="cadre">
  <header class="entete">Mon compte</header>
  <main class="contenu">
    <p>Section 1</p>
    <p>Section 2</p>
    <p>Section 3</p>
  </main>
  <button class="retour-haut" type="button">Haut</button>
</div>`, css: `.cadre {
  height: 220px;
  overflow-y: auto;
  background: hsl(228 40% 99%);
}

.entete {
  padding: 10px 14px;
  background: hsl(228 76% 52%);
  color: white;
  font-family: system-ui, sans-serif;
}

.retour-haut {
  padding: 8px 12px;
  border: 0;
  border-radius: 999px;
  background: hsl(228 30% 22%);
  color: white;
}`, js: "" },
          solution: { html: `<div class="cadre">
  <header class="entete">Mon compte</header>
  <main class="contenu">
    <p>Section 1</p>
    <p>Section 2</p>
    <p>Section 3</p>
  </main>
  <button class="retour-haut" type="button">Haut</button>
</div>`, css: `.cadre {
  height: 220px;
  overflow-y: auto;
  background: hsl(228 40% 99%);
}

.entete {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 10px 14px;
  background: hsl(228 76% 52%);
  color: white;
  font-family: system-ui, sans-serif;
}

.retour-haut {
  position: fixed;
  inset-block-end: 20px;
  inset-inline-end: 20px;
  padding: 8px 12px;
  border: 0;
  border-radius: 999px;
  background: hsl(228 30% 22%);
  color: white;
}`, js: "" },
          checks: [
            "!!document.querySelector('.entete') && style('.entete','position') === 'sticky'",
            "style('.entete','top') === '0px'",
            "style('.entete','zIndex') === '10'",
            "style('.retour-haut','position') === 'fixed'"
          ],
          checklist: [
            "L'en-tête est `sticky` avec un seuil à 0",
            "Son `z-index` vaut 10",
            "Le bouton est `fixed`, donc hors du flux",
            "Aucun `absolute` n'a été utilisé"
          ]
        }
      ]
    },
    {
      id: "css-09",
      title: "Responsive design : du mobile vers le grand écran",
      minutes: 45,
      summary: "Construire des interfaces qui fonctionnent de 320px à 1920px sans casser.",
      objectives: [
        "Écrire des media queries `min-width` en mobile-first",
        "Utiliser `clamp()`, `min()` et `max()` pour des valeurs fluides",
        "Rendre les images fluides et adaptées (`srcset`, `picture`)",
        "Tester et déboguer une interface responsive avec les DevTools"
      ],
      content: [
        { type: "lead", text: "Le responsive n'est pas « ajouter des media queries » : c'est écrire un CSS qui accepte l'inconnu. On part de l'écran le plus contraint (mobile), on ajoute de la complexité quand la place le permet, et on laisse les valeurs fluides faire le reste." },
        { type: "h", level: 2, text: "Mobile-first et media queries" },
        { type: "code", lang: "css", caption: "Le style de base sert le mobile ; les media queries ajoutent de la place.", code: `/* Base : mobile. Une seule colonne, tout tient dans 320px */
.grille {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.titre { font-size: 1.5rem; }

/* À partir de 600px : deux colonnes */
@media (min-width: 600px) {
  .grille { grid-template-columns: 1fr 1fr; }
  .titre  { font-size: 1.8rem; }
}

/* À partir de 960px : trois colonnes et une barre latérale */
@media (min-width: 960px) {
  .grille {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .titre { font-size: 2.2rem; }
}` },
        { type: "p", text: "`min-width` en mobile-first est plus robuste que `max-width` en desktop-first : le style de base est simple et fonctionne partout, chaque palier ajoute une couche. Avec `max-width`, vous êtes obligé de tout déclarer pour le grand écran puis de défaire — et la cascade devient une suite de corrections. Les breakpoints usuels sont 480px (grand mobile), 600–768px (tablette), 960–1024px (petit portable), 1280px (grand écran) — mais **choisissez les vôtres en fonction du contenu**, quand la mise en page commence réellement à casser." },
        { type: "table", head: ["Nom courant", "Largeur", "Ce qui change souvent"], rows: [
          ["Grand mobile", "480px", "espacements, taille du titre"],
          ["Tablette", "600 à 768px", "passage de 1 à 2 colonnes"],
          ["Portable", "960 à 1024px", "3 colonnes, barre latérale visible"],
          ["Grand écran", "1280px", "largeur maximale du contenu, marges"]
        ] },
        { type: "h", level: 2, text: "Valeurs fluides : `clamp()`, `min()`, `max()`" },
        { type: "code", lang: "css", caption: "Souvent, une seule de ces trois fonctions remplace deux media queries.", code: `.titre {
  /* jamais moins de 1.25rem, jamais plus de 2.5rem */
  font-size: clamp(1.25rem, 4vw + 0.5rem, 2.5rem);
}

.conteneur {
  width: min(100% - 2rem, 1100px);  /* marge garantie sur petits écrans */
  margin-inline: auto;
}

.section {
  padding-block: max(24px, 5vw);    /* au minimum 24px */
}

/* Grille auto-adaptative : zéro media query */
.cartes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}` },
        { type: "code", lang: "html", caption: "Images fluides et images adaptées à la densité et à la largeur.", code: `<!-- La base : jamais plus large que son conteneur -->
<style>
  img { max-width: 100%; height: auto; display: block; }
</style>
<img src="photo-800.jpg" alt="Atelier de design">

<!-- Variantes de largeur : le navigateur choisit -->
<img src="photo-800.jpg"
     srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
     sizes="(min-width: 900px) 600px, 100vw"
     alt="Atelier de design">

<!-- Direction artistique : un cadrage différent sur mobile -->
<picture>
  <source media="(min-width: 900px)" srcset="large.jpg">
  <img src="petit.jpg" alt="Atelier de design">
</picture>` },
        { type: "callout", tone: "info", title: "Le futur immédiat : les container queries", text: "Les media queries interrogent la **fenêtre** ; les container queries interrogent la **largeur du parent**. Un composant peut donc s'adapter selon la place qu'on lui donne, que ce soit dans une barre latérale ou dans un contenu pleine largeur : `container-type: inline-size` sur le parent, puis `@container (min-width: 400px) { … }`. Le support est désormais large dans les navigateurs modernes — à utiliser dès que vous concevez des composants réutilisables." },
        { type: "list", ordered: true, items: [
          "Partez du plus petit écran et ajoutez `min-width` au fur et à mesure",
          "Remplacez les tailles figées par `clamp()`, les largeurs par `min()`",
          "Utilisez `repeat(auto-fit, minmax(…))` avant d'écrire une media query",
          "Vérifiez les zones tactiles : 44px minimum de hauteur pour un bouton",
          "Testez le menu : masqué derrière un bouton burger sur mobile, visible en barre sur desktop"
        ] },
        { type: "callout", tone: "tip", title: "Tester comme un pro", text: "Dans les DevTools, `Ctrl+Shift+M` ouvre le mode responsive : vous pouvez saisir une largeur exacte, tester 320px et 1920px, et simuler un appareil tactile. Vérifiez systématiquement trois choses : aucun défilement horizontal (`document.body.scrollWidth === document.body.clientWidth`), aucun texte coupé, aucune cible tactile trop petite.", items: [
          "Le pire bug responsive est un débordement horizontal : cherchez l'élément plus large que son parent",
          "Ajoutez temporairement `* { outline: 1px solid red; }` pour repérer ce qui dépasse",
          "N'oubliez pas le zoom : une page doit rester utilisable à 200 %"
        ] },
        { type: "demo", title: "Typographie et cartes fluides", height: 280, html: `<section class="section">
  <h2 class="titre">Studio Lumen</h2>
  <p class="intro">Redimensionnez l'aperçu : rien ne casse, aucun media query.</p>
  <div class="cartes">
    <article class="carte">Identité visuelle</article>
    <article class="carte">Site vitrine</article>
    <article class="carte">Design system</article>
  </div>
</section>`, css: `body { margin: 0; padding: 14px; font-family: system-ui, sans-serif; color: hsl(228 25% 18%); }
.section { width: min(100% - 1rem, 720px); margin-inline: auto; }
.titre {
  margin: 0 0 8px;
  font-size: clamp(1.3rem, 5vw, 2.1rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
}
.intro { margin: 0 0 16px; color: hsl(228 15% 40%); font-size: clamp(0.9rem, 2.4vw, 1rem); }
.cartes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: clamp(8px, 2vw, 18px);
}
.carte {
  padding: clamp(12px, 3vw, 20px);
  border-radius: 14px;
  background: linear-gradient(135deg, hsl(228 76% 62%), hsl(190 70% 55%));
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}`, js: "" },
        { type: "checklist", items: [
          "Votre CSS de base fonctionne à 320px de large",
          "Vos media queries utilisent `min-width`, jamais `max-width`",
          "Vous utilisez `clamp()` pour les tailles de texte",
          "Vos images ont `max-width: 100%` et `height: auto`",
          "Aucun défilement horizontal n'apparaît à aucune largeur"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-19",
          title: "Un conteneur et des images fluides",
          difficulty: 1,
          goal: "Poser les fondations d'une page qui ne déborde jamais.",
          instructions: [
            "Sur `.conteneur`, utilisez `width: 100%`, `max-width: 560px` et `padding-inline: 16px`.",
            "Centrez le conteneur avec `margin-inline: auto`.",
            "Rendez l'image fluide : `max-width: 100%` et `height: auto`.",
            "Supprimez l'espace fantôme sous l'image avec `display: block` sur `img`."
          ],
          hint: "`max-width` plutôt que `width` : le bloc s'adapte vers le bas. `height: auto` évite une image écrasée ou étirée.",
          starter: { html: `<div class="conteneur">
  <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='260'%3E%3Crect width='400' height='260' fill='%23a5b4fc'/%3E%3C/svg%3E" alt="Atelier">
  <p>Un conteneur qui ne déborde jamais.</p>
</div>`, css: `.conteneur {
  background: hsl(228 40% 97%);
}`, js: "" },
          solution: { html: `<div class="conteneur">
  <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='260'%3E%3Crect width='400' height='260' fill='%23a5b4fc'/%3E%3C/svg%3E" alt="Atelier">
  <p>Un conteneur qui ne déborde jamais.</p>
</div>`, css: `.conteneur {
  width: 100%;
  max-width: 560px;
  padding-inline: 16px;
  margin-inline: auto;
  background: hsl(228 40% 97%);
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}`, js: "" },
          checks: [
            "!!document.querySelector('.conteneur') && style('.conteneur','maxWidth') === '560px'",
            "style('.conteneur','paddingLeft') === '16px'",
            "style('img','display') === 'block'"
          ],
          checklist: [
            "Le conteneur est limité à 560px et centré",
            "Le padding latéral vaut 16px",
            "L'image ne dépasse jamais la largeur de son parent"
          ]
        },
        {
          id: "css-ex-20",
          title: "Un hero qui se réorganise seul",
          difficulty: 2,
          goal: "Obtenir un passage automatique sur deux lignes avec `flex-wrap` et `flex-basis`.",
          instructions: [
            "Sur `.hero`, activez `display: flex`, `flex-wrap: wrap`, `gap: 24px` et `align-items: center`.",
            "Sur `.hero .texte`, mettez `flex: 1 1 260px`.",
            "Sur `.hero img`, mettez `flex: 1 1 200px` et `max-width: 100%`.",
            "Aucune media query n'est nécessaire."
          ],
          hint: "Avec `flex-wrap: wrap`, dès que les bases (260px + 200px + gap) ne tiennent plus, la ligne se casse automatiquement : c'est du responsive par conception.",
          starter: { html: `<section class="hero">
  <div class="texte">
    <h2>Design d'interface</h2>
    <p>Des composants clairs, accessibles et rapides.</p>
  </div>
  <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='240'%3E%3Crect width='360' height='240' fill='%23818cf8'/%3E%3C/svg%3E" alt="Maquette">
</section>`, css: `.hero {
  padding: 20px;
  background: hsl(228 40% 97%);
  border-radius: 16px;
  font-family: system-ui, sans-serif;
}`, js: "" },
          solution: { html: `<section class="hero">
  <div class="texte">
    <h2>Design d'interface</h2>
    <p>Des composants clairs, accessibles et rapides.</p>
  </div>
  <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='240'%3E%3Crect width='360' height='240' fill='%23818cf8'/%3E%3C/svg%3E" alt="Maquette">
</section>`, css: `.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  padding: 20px;
  background: hsl(228 40% 97%);
  border-radius: 16px;
  font-family: system-ui, sans-serif;
}

.hero .texte {
  flex: 1 1 260px;
}

.hero img {
  flex: 1 1 200px;
  max-width: 100%;
  border-radius: 12px;
}`, js: "" },
          checks: [
            "!!document.querySelector('.hero') && style('.hero','display') === 'flex'",
            "style('.hero','flexWrap') === 'wrap'",
            "style('.hero','gap') === '24px'",
            "style('.hero .texte','flexBasis') === '260px'",
            "style('.hero img','borderRadius') === '12px'"
          ],
          checklist: [
            "Le hero est un conteneur flex qui peut casser la ligne",
            "L'espacement vaut 24px",
            "Le texte démarre à 260px et l'image est arrondie",
            "Aucune media query n'a été écrite"
          ]
        },
        {
          id: "css-ex-21",
          title: "Section responsive sans media query",
          difficulty: 3,
          goal: "Combiner grille auto-adaptative, images fluides et espacements relatifs.",
          instructions: [
            "Sur `.section`, activez `display: grid` avec `grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))`.",
            "Ajoutez `gap: 16px` et `padding-block: 24px`.",
            "Donnez à chaque `.carte` un `border-radius: 12px` et un `padding: 16px`.",
            "Sur `img`, appliquez `max-width: 100%` et `height: auto`."
          ],
          hint: "`auto-fit` + `minmax()` produisent une grille qui change de nombre de colonnes toute seule. Les images ne doivent jamais dépasser leur cellule : `max-width: 100%`.",
          starter: { html: `<section class="section">
  <article class="carte">Un</article>
  <article class="carte">Deux</article>
  <article class="carte">Trois</article>
  <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='160'%3E%3Crect width='320' height='160' fill='%2367e8f9'/%3E%3C/svg%3E" alt="Bandeau">
</section>`, css: `.carte {
  background: hsl(228 60% 96%);
  font-family: system-ui, sans-serif;
}`, js: "" },
          solution: { html: `<section class="section">
  <article class="carte">Un</article>
  <article class="carte">Deux</article>
  <article class="carte">Trois</article>
  <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='160'%3E%3Crect width='320' height='160' fill='%2367e8f9'/%3E%3C/svg%3E" alt="Bandeau">
</section>`, css: `.section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  padding-block: 24px;
}

.carte {
  background: hsl(228 60% 96%);
  border-radius: 12px;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

img {
  max-width: 100%;
  height: auto;
}`, js: "" },
          checks: [
            "!!document.querySelector('.section') && style('.section','display') === 'grid'",
            "style('.section','gridTemplateColumns') !== 'none'",
            "style('.section','gap') === '16px'",
            "style('.section','paddingTop') === '24px'",
            "style('.section','paddingBottom') === '24px'"
          ],
          checklist: [
            "La section est une grille aux colonnes calculées",
            "Les gouttières valent 16px",
            "Le padding vertical vaut 24px",
            "L'image est fluide"
          ]
        }
      ]
    },
    {
      id: "css-10",
      title: "Transitions, transformations et animations",
      minutes: 45,
      summary: "Animer juste ce qu'il faut : des micro-interactions fluides qui ne coûtent rien au navigateur.",
      objectives: [
        "Écrire une `transition` sur les propriétés utiles",
        "Utiliser `transform` : `translate`, `rotate`, `scale`",
        "Déclarer une animation avec `@keyframes` et les propriétés `animation-*`",
        "Respecter `prefers-reduced-motion` et animer sans casser les performances"
      ],
      content: [
        { type: "lead", text: "Une animation réussie ne se remarque pas : elle accompagne une action. Le navigateur sait animer deux choses presque gratuitement — `transform` et `opacity` — parce qu'il les confie au processeur graphique, sans recalculer la mise en page. Tout le reste coûte cher." },
        { type: "h", level: 2, text: "Transitions : animer un changement d'état" },
        { type: "code", lang: "css", caption: "L'ordre du raccourci : propriété, durée, courbe, délai.", code: `.bouton {
  background: hsl(228 76% 52%);
  transition: background-color 0.25s ease, transform 0.25s ease;
}

.bouton:hover {
  background: hsl(228 76% 44%);
  transform: translateY(-2px);
}

/* À ÉVITER : anime toutes les propriétés, y compris celles qui recalculent la page */
.mauvais {
  transition: all 0.25s;
}` },
        { type: "p", text: "Une transition n'existe que s'il y a un **changement** entre deux états : elle anime le passage. On la déclare sur l'état de base, pas sur `:hover` — sinon le retour est instantané. Notez `transition: all` : c'est la fausse bonne idée la plus répandue, car `all` anime aussi `width`, `height` ou `top`, ce qui déclenche des recalculs de mise en page à chaque image." },
        { type: "callout", tone: "tip", title: "Les seules propriétés à animer sans remords", text: "`transform` et `opacity` sont composées par le GPU : le navigateur ne recalcule ni la mise en page (*layout*) ni le dessin (*paint*). Pour un déplacement, préférez `transform: translateX(8px)` à `left: 8px` ; pour un agrandissement, `transform: scale(1.05)` à `width` ; pour une apparition, `opacity` à `visibility`. C'est souvent la différence entre 60 images par seconde et une animation qui saccade.", items: [
          "Durée réaliste : 150 à 300 ms pour une micro-interaction, jamais plus de 500 ms",
          "`ease-out` à l'entrée, `ease-in` à la sortie : l'objet apparaît vite puis ralentit",
          "Évitez `will-change` permanent : il consomme de la mémoire en continu"
        ] },
        { type: "h", level: 2, text: "Transformations : déplacer, tourner, mettre à l'échelle" },
        { type: "code", lang: "css", caption: "`transform` combine plusieurs fonctions en une seule déclaration.", code: `.carte {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.carte:hover {
  transform: translateY(-4px) scale(1.01);   /* ordre = de gauche à droite */
  box-shadow: 0 14px 30px hsl(228 40% 20% / 0.18);
}

.icone-plus {
  transform: rotate(45deg);           /* croix depuis un plus */
  transform-origin: center;           /* point de pivot */
}

.miniature img {
  transition: transform 0.4s ease;
}
.miniature:hover img {
  transform: scale(1.06);             /* zoom contenu par overflow: hidden */
}` },
        { type: "h", level: 2, text: "`@keyframes` : les animations en boucle ou autonomes" },
        { type: "code", lang: "css", caption: "Une animation complète : définition, application, réglages.", code: `@keyframes apparition {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%   { opacity: 0.35; transform: scale(0.9); }
  50%  { opacity: 1;    transform: scale(1); }
  100% { opacity: 0.35; transform: scale(0.9); }
}

.panneau {
  animation: apparition 0.4s ease-out both;
  /* équivaut à animation-name, -duration, -timing-function, -fill-mode */
}

.point-actif {
  animation: pulse 1.6s ease-in-out infinite;
}` },
        { type: "list", ordered: false, items: [
          "`animation-duration` : la durée d'un cycle",
          "`animation-iteration-count` : un nombre, ou `infinite`",
          "`animation-delay` : le temps d'attente avant le départ",
          "`animation-fill-mode: both` : conserve l'état initial avant et l'état final après",
          "`animation-direction: alternate` : alterne aller et retour à chaque cycle"
        ] },
        { type: "callout", tone: "warning", title: "Piège : l'accessibilité et le mouvement", text: "Certaines personnes souffrent de vertiges ou de nausées face aux animations. Le réglage système existe et doit être respecté : `@media (prefers-reduced-motion: reduce)` permet de supprimer ou d'énormément raccourcir les mouvements. Ce n'est pas un détail militant — c'est une exigence des référentiels d'accessibilité (WCAG).", items: [
          "@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms; transition-duration: 0.01ms; } }",
          "Ne faites jamais clignoter un élément plus de trois fois par seconde",
          "Une animation ne doit jamais porter une information seule"
        ] },
        { type: "demo", title: "Bouton réactif et point pulsant", height: 240, html: `<div class="scene">
  <button class="bouton" type="button">Survolez-moi</button>
  <p class="statut"><span class="point"></span> En ligne</p>
</div>`, css: `body { margin: 0; font-family: system-ui, sans-serif; }
.scene {
  padding: 28px 18px;
  background: hsl(228 40% 98%);
  min-height: 180px;
}
.bouton {
  border: 0;
  border-radius: 12px;
  padding: 12px 20px;
  background: hsl(228 76% 52%);
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 16px hsl(228 60% 45% / 0.28);
  transition: background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}
.bouton:hover {
  background: hsl(228 76% 44%);
  transform: translateY(-3px);
  box-shadow: 0 12px 24px hsl(228 60% 40% / 0.32);
}
.bouton:active { transform: translateY(0) scale(0.99); }
.statut {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  font-size: 0.9rem;
  color: hsl(228 20% 32%);
}
.point {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: hsl(150 62% 42%);
  animation: pulse 1.6s ease-in-out infinite;
}
@keyframes pulse {
  0%   { opacity: 0.35; transform: scale(0.85); }
  50%  { opacity: 1;    transform: scale(1.1); }
  100% { opacity: 0.35; transform: scale(0.85); }
}
@media (prefers-reduced-motion: reduce) {
  .bouton, .point { transition: none; animation: none; }
}`, js: "" },
        { type: "checklist", items: [
          "Vous animez `transform` et `opacity`, pas `width` ni `top`",
          "Vous déclarez la `transition` sur l'état de base",
          "Vous savez écrire `@keyframes` avec `from`/`to` ou des pourcentages",
          "Vous couvrez `prefers-reduced-motion: reduce`"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-22",
          title: "Un bouton qui réagit",
          difficulty: 1,
          goal: "Ajouter une transition courte et un déplacement au survol.",
          instructions: [
            "Ajoutez sur `.bouton` la transition `background-color 0.3s, transform 0.3s`.",
            "Dans `.bouton:hover`, écrivez `transform: translateY(-2px)`.",
            "Arrondissez les coins avec `border-radius: 10px`.",
            "N'utilisez pas `transition: all`."
          ],
          hint: "La transition se déclare sur l'état par défaut, sinon le retour est brutal. `translateY` négatif déplace vers le haut.",
          starter: { html: `<button class="bouton" type="button">Réserver</button>`, css: `.bouton {
  padding: 10px 18px;
  border: 0;
  background: hsl(228 76% 52%);
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}`, js: "" },
          solution: { html: `<button class="bouton" type="button">Réserver</button>`, css: `.bouton {
  padding: 10px 18px;
  border: 0;
  border-radius: 10px;
  background: hsl(228 76% 52%);
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.bouton:hover {
  transform: translateY(-2px);
}`, js: "" },
          checks: [
            "!!document.querySelector('.bouton') && style('.bouton','transitionDuration').includes('0.3s') && !style('.bouton','transitionProperty').includes('all')",
            "style('.bouton','transitionProperty').includes('transform')",
            "style('.bouton','borderRadius') === '10px'"
          ],
          checklist: [
            "La transition dure 0.3s",
            "`transform` fait partie des propriétés animées",
            "Les coins sont arrondis à 10px"
          ]
        },
        {
          id: "css-ex-23",
          title: "Un point qui pulse",
          difficulty: 2,
          goal: "Écrire un `@keyframes` et l'appliquer en boucle.",
          instructions: [
            "Déclarez `@keyframes pulse` qui fait varier `opacity` de `0.35` à `1` (0 %, 50 %, 100 %).",
            "Appliquez sur `.point` : `animation: pulse 1.4s ease-in-out infinite`.",
            "Ajoutez `border-radius: 50%` pour un point bien rond.",
            "N'animez que `opacity` et `transform` : ce sont les propriétés les moins coûteuses."
          ],
          hint: "L'animation s'applique sur l'élément lui-même ; son nom doit correspondre exactement à celui des `@keyframes`. `infinite` remplace un nombre d'itérations.",          starter: { html: `<p class="statut"><span class="point"></span> En ligne</p>`, css: `.statut {
  font-family: system-ui, sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
}

.point {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: hsl(150 62% 42%);
}`, js: "" },
          solution: { html: `<p class="statut"><span class="point"></span> En ligne</p>`, css: `.statut {
  font-family: system-ui, sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
}

.point {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: hsl(150 62% 42%);
  animation: pulse 1.4s ease-in-out infinite;
}

@keyframes pulse {
  0%   { opacity: 0.35; transform: scale(0.9); }
  50%  { opacity: 1;    transform: scale(1); }
  100% { opacity: 0.35; transform: scale(0.9); }
}`, js: "" },
          checks: [
            "!!document.querySelector('.point') && style('.point','animationName') !== 'none'",
            "style('.point','animationDuration') === '1.4s'",
            "style('.point','animationIterationCount') === 'infinite'",
            "style('.point','borderRadius') === '50%'"
          ],
          checklist: [
            "Une animation est bien appliquée au point",
            "Elle dure 1.4s",
            "Elle tourne indéfiniment",
            "Le point est parfaitement rond"
          ]
        }
      ]
    },
    {
      id: "css-11",
      title: "Composants modernes et accessibilité des couleurs",
      minutes: 45,
      summary: "Boutons, cartes, effets de verre et formulaires soignés — sans sacrifier le contraste.",
      objectives: [
        "Composer des boutons et des cartes hiérarchisés",
        "Empiler plusieurs ombres et dégradés pour un rendu premium",
        "Styler un formulaire avec des états `focus` visibles",
        "Garantir un contraste suffisant, en clair comme en sombre"
      ],
      content: [
        { type: "lead", text: "Un composant réussi, c'est trois choses : une hiérarchie visuelle claire (on sait où cliquer), des états explicites (survol, focus, désactivé) et un contraste suffisant. Les effets — dégradés, ombres, verre dépoli — viennent **après**, pour la finition." },
        { type: "h", level: 2, text: "Boutons : un composant, trois variantes" },
        { type: "code", lang: "css", caption: "Une base commune, puis des variantes par classe modificatrice.", code: `.bouton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;             /* cible tactile confortable */
  padding: 0 20px;
  border: 1px solid transparent;
  border-radius: 10px;
  background-image: linear-gradient(135deg, hsl(228 76% 56%), hsl(215 78% 48%));
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.bouton:hover { transform: translateY(-1px); filter: brightness(1.06); }
.bouton:focus-visible { outline: 3px solid hsl(228 80% 65%); outline-offset: 2px; }
.bouton:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.bouton--fantome {
  background-image: none;
  border-color: hsl(228 40% 85%);
  color: hsl(228 76% 45%);
}` },
        { type: "h", level: 2, text: "Cartes, ombres et verre dépoli" },
        { type: "code", lang: "css", caption: "Plusieurs ombres superposées imitent une lumière réaliste.", code: `.carte {
  padding: 20px;
  border-radius: 16px;
  background: white;
  border: 1px solid hsl(228 30% 92%);
  /* trois ombres : contact, diffusion, ambiance */
  box-shadow:
    0 1px 2px hsl(228 40% 20% / 0.06),
    0 6px 16px hsl(228 40% 20% / 0.08),
    0 20px 40px hsl(228 40% 20% / 0.06);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.carte:hover {
  transform: translateY(-3px);
  box-shadow:
    0 2px 4px hsl(228 40% 20% / 0.08),
    0 12px 28px hsl(228 40% 20% / 0.12),
    0 28px 56px hsl(228 40% 20% / 0.10);
}

.verre {
  background: hsl(0 0% 100% / 0.55);
  backdrop-filter: blur(12px) saturate(1.4);
  border: 1px solid hsl(0 0% 100% / 0.6);
  border-radius: 18px;
}` },
        { type: "callout", tone: "tip", title: "Le contraste n'est pas une option", text: "Le texte courant doit atteindre un rapport de contraste de **4.5:1** avec son fond, et le grand texte (24px et plus, ou 19px gras) de **3:1**. Un gris clair sur blanc est le défaut le plus courant des interfaces « modernes ». Testez avec l'outil de contraste des DevTools : il affiche le ratio en direct sous chaque couleur.", items: [
          "Un dégradé rend le contraste variable : testez la zone la plus claire sous le texte",
          "Le verre dépoli dépend de l'arrière-plan : prévoyez un fond opaque de repli",
          "Un état ne doit jamais être signalé par la couleur seule (ajoutez une bordure, une icône, un texte)"
        ] },
        { type: "h", level: 2, text: "Formulaires : les champs qu'on aime remplir" },
        { type: "code", lang: "css", caption: "Champs lisibles, focus visible, contrôles natifs accordés au thème.", code: `:root { accent-color: hsl(228 76% 52%); }

.champ {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

label {
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(228 20% 25%);
}

input,
textarea,
select {
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid hsl(228 25% 82%);
  border-radius: 10px;
  background: white;
  font: inherit;
  color: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: hsl(228 76% 52%);
  box-shadow: 0 0 0 3px hsl(228 76% 52% / 0.25);
}

input::placeholder { color: hsl(228 15% 55%); }` },
        { type: "callout", tone: "warning", title: "Piège : les couleurs codées en dur", text: "Si vous écrivez `background: white` et `color: #222` un peu partout, le mode sombre devient impossible à ajouter. Passez **toutes** vos couleurs par des variables déclarées sur `:root`, puis redéfinissez ces mêmes variables dans `@media (prefers-color-scheme: dark)` ou dans une classe `.sombre`. Bonus : ajoutez `color-scheme` pour que les barres de défilement et les contrôles natifs suivent le thème.", items: [
          ":root { color-scheme: light dark; }",
          "@media (prefers-color-scheme: dark) { :root { --fond: hsl(228 25% 10%); --texte: hsl(228 15% 92%); } }",
          "Ajustez les ombres en sombre : une ombre noire sur fond noir est invisible, préférez une bordure claire"
        ] },
        { type: "demo", title: "Carte vitrée, bouton dégradé et champ de formulaire", height: 300, html: `<div class="fond">
  <div class="verre">
    <h3>Accès anticipé</h3>
    <p>Recevez les nouveautés du studio.</p>
    <div class="champ">
      <label for="mail">E-mail</label>
      <input id="mail" type="email" placeholder="vous@exemple.fr">
    </div>
    <button class="bouton" type="button">Je m'inscris</button>
  </div>
</div>`, css: `:root { accent-color: hsl(228 76% 52%); }
body { margin: 0; font-family: system-ui, sans-serif; }
.fond {
  padding: 20px;
  background:
    radial-gradient(circle at 20% 20%, hsl(228 80% 78%), transparent 60%),
    radial-gradient(circle at 80% 70%, hsl(190 75% 72%), transparent 55%),
    hsl(228 45% 96%);
}
.verre {
  max-width: 320px;
  padding: 18px;
  border-radius: 18px;
  background: hsl(0 0% 100% / 0.6);
  backdrop-filter: blur(12px) saturate(1.4);
  border: 1px solid hsl(0 0% 100% / 0.7);
  box-shadow: 0 16px 40px hsl(228 40% 25% / 0.14);
  color: hsl(228 30% 18%);
}
.verre h3 { margin: 0 0 4px; font-size: 1.05rem; }
.verre p { margin: 0 0 14px; font-size: 0.85rem; color: hsl(228 15% 38%); }
.champ { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
label { font-size: 0.78rem; font-weight: 600; }
input {
  min-height: 42px;
  padding: 9px 12px;
  border: 1px solid hsl(228 25% 82%);
  border-radius: 10px;
  font: inherit;
  background: hsl(0 0% 100% / 0.85);
}
input:focus-visible {
  outline: none;
  border-color: hsl(228 76% 52%);
  box-shadow: 0 0 0 3px hsl(228 76% 52% / 0.25);
}
.bouton {
  width: 100%;
  min-height: 44px;
  border: 0;
  border-radius: 10px;
  background-image: linear-gradient(135deg, hsl(228 76% 56%), hsl(215 78% 48%));
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;
}
.bouton:hover { transform: translateY(-1px); filter: brightness(1.07); }
.bouton:focus-visible { outline: 3px solid hsl(228 80% 65%); outline-offset: 2px; }`, js: "" },
        { type: "checklist", items: [
          "Vos boutons ont un état `:hover`, `:focus-visible` et `:disabled`",
          "Vos ombres sont composées de plusieurs couches",
          "Vos champs mesurent au moins 44px de haut avec un focus visible",
          "Aucune couleur n'est codée en dur : tout passe par `:root`",
          "Le contraste du texte atteint 4.5:1"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-24",
          title: "Un bouton dégradé et son ombre",
          difficulty: 1,
          goal: "Appliquer un dégradé, une forme pilule et une ombre colorée.",
          instructions: [
            "Sur `.bouton`, utilisez `background-image: linear-gradient(135deg, hsl(228 76% 56%), hsl(190 70% 50%))`.",
            "Mettez `border-radius: 999px` et `padding: 12px 22px`.",
            "Ajoutez `box-shadow: 0 8px 18px hsl(228 60% 40% / 0.35)`."
          ],
          hint: "Un dégradé s'applique avec `background-image` (ou `background`), pas avec `background-color`. `border-radius: 999px` produit une forme pilule quelle que soit la hauteur.",
          starter: { html: `<button class="bouton" type="button">Découvrir</button>`, css: `.bouton {
  border: 0;
  background-color: hsl(228 76% 52%);
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}`, js: "" },
          solution: { html: `<button class="bouton" type="button">Découvrir</button>`, css: `.bouton {
  border: 0;
  padding: 12px 22px;
  border-radius: 999px;
  background-image: linear-gradient(135deg, hsl(228 76% 56%), hsl(190 70% 50%));
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 18px hsl(228 60% 40% / 0.35);
}`, js: "" },
          checks: [
            "!!document.querySelector('.bouton') && style('.bouton','backgroundImage').includes('gradient')",
            "style('.bouton','borderRadius') === '999px'",
            "style('.bouton','boxShadow') !== 'none'"
          ],
          checklist: [
            "Le bouton affiche un dégradé",
            "Sa forme est une pilule",
            "Une ombre portée est visible"
          ]
        },
        {
          id: "css-ex-25",
          title: "Un champ de formulaire confortable",
          difficulty: 2,
          goal: "Structurer un champ label + input et le rendre lisible et cliquable.",
          instructions: [
            "Sur `.champ`, utilisez `display: flex`, `flex-direction: column` et `gap: 8px`.",
            "Passez le `label` en `font-weight: 600`.",
            "Sur l'`input` : `padding: 12px 14px`, `border-radius: 8px`, `min-height: 44px` et une bordure `1px solid`.",
            "Ajoutez un style `:focus-visible` avec `outline` **et** `border-color`."
          ],
          hint: "Une cible tactile confortable mesure au moins 44px. Empiler label et champ en colonne flex évite les marges bricolées.",
          starter: { html: `<form class="form">
  <div class="champ">
    <label for="mail">E-mail</label>
    <input id="mail" type="email" placeholder="vous@exemple.fr">
  </div>
  <button class="envoyer" type="submit">Recevoir</button>
</form>`, css: `.form {
  font-family: system-ui, sans-serif;
}

input {
  font: inherit;
}`, js: "" },
          solution: { html: `<form class="form">
  <div class="champ">
    <label for="mail">E-mail</label>
    <input id="mail" type="email" placeholder="vous@exemple.fr">
  </div>
  <button class="envoyer" type="submit">Recevoir</button>
</form>`, css: `.form {
  font-family: system-ui, sans-serif;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.875rem;
  font-weight: 600;
}

input {
  font: inherit;
  min-height: 44px;
  padding: 12px 14px;
  border: 1px solid hsl(228 25% 82%);
  border-radius: 8px;
}

input:focus-visible {
  outline: 2px solid hsl(228 76% 52%);
  outline-offset: 1px;
  border-color: hsl(228 76% 52%);
}`, js: "" },
          checks: [
            "!!document.querySelector('.champ') && style('.champ','display') === 'flex'",
            "style('.champ','flexDirection') === 'column'",
            "style('label','fontWeight') === '600'",
            "style('input','borderRadius') === '8px'",
            "style('input','minHeight') === '44px'"
          ],
          checklist: [
            "Le champ est une colonne flex",
            "Le libellé est en graisse 600",
            "Le champ a des coins arrondis et une hauteur minimale de 44px",
            "Le focus est signalé par un contour visible"
          ]
        },
        {
          id: "css-ex-26",
          title: "Carte vitrée, avatar et badge",
          difficulty: 3,
          goal: "Assembler un composant complet avec effet de flou, rond et pastille superposée.",
          instructions: [
            "Sur `.verre` : `backdrop-filter: blur(8px)`, `border-radius: 16px` et `position: relative`.",
            "Sur `.avatar` : `width: 48px`, `height: 48px` et `border-radius: 50%`.",
            "Sur `.badge` : `position: absolute`, `top: 8px` et `right: 8px`.",
            "Gardez un fond semi-transparent (`hsl(0 0% 100% / 0.6)`) pour que le flou soit visible."
          ],
          hint: "`backdrop-filter` floute ce qui est **derrière** l'élément : sans fond semi-transparent, l'effet est invisible. Le badge a besoin que son parent soit positionné.",
          starter: { html: `<div class="decor">
  <div class="verre">
    <div class="avatar"></div>
    <span class="badge">Pro</span>
    <p class="nom">Camille Roy</p>
  </div>
</div>`, css: `.decor {
  padding: 24px;
  background: radial-gradient(circle at 30% 20%, hsl(228 80% 78%), hsl(190 70% 74%));
  font-family: system-ui, sans-serif;
}

.verre {
  max-width: 220px;
  padding: 16px;
  background: hsl(0 0% 100% / 0.6);
}

.avatar {
  background: linear-gradient(135deg, hsl(228 76% 60%), hsl(190 70% 55%));
}

.badge {
  padding: 2px 8px;
  border-radius: 999px;
  background: hsl(228 30% 22%);
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
}`, js: "" },
          solution: { html: `<div class="decor">
  <div class="verre">
    <div class="avatar"></div>
    <span class="badge">Pro</span>
    <p class="nom">Camille Roy</p>
  </div>
</div>`, css: `.decor {
  padding: 24px;
  background: radial-gradient(circle at 30% 20%, hsl(228 80% 78%), hsl(190 70% 74%));
  font-family: system-ui, sans-serif;
}

.verre {
  position: relative;
  max-width: 220px;
  padding: 16px;
  border-radius: 16px;
  background: hsl(0 0% 100% / 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid hsl(0 0% 100% / 0.7);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, hsl(228 76% 60%), hsl(190 70% 55%));
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 8px;
  border-radius: 999px;
  background: hsl(228 30% 22%);
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
}`, js: "" },
          checks: [
            "!!document.querySelector('.verre') && style('.verre','backdropFilter').includes('blur')",
            "style('.verre','borderRadius') === '16px'",
            "style('.verre','position') === 'relative'",
            "style('.avatar','borderRadius') === '50%'",
            "style('.badge','position') === 'absolute'"
          ],
          checklist: [
            "La carte floute l'arrière-plan",
            "Ses coins sont arrondis à 16px",
            "L'avatar est parfaitement rond",
            "Le badge est superposé en haut à droite"
          ]
        }
      ]
    },
    {
      id: "css-12",
      title: "Organiser son CSS : BEM, variables et mini-projet",
      minutes: 50,
      summary: "Passer de « ça marche » à « on peut reprendre ce projet dans six mois ».",
      objectives: [
        "Nommer ses classes avec la convention BEM",
        "Centraliser un design system en custom properties",
        "Ordonner ses règles et découper ses fichiers",
        "Refactoriser un composant complet sans rien casser"
      ],
      content: [
        { type: "lead", text: "Le CSS devient difficile non pas quand il est long, mais quand il est **imprévisible** : une règle qui en écrase une autre, une couleur dupliquée dans trente fichiers, un sélecteur de six niveaux que personne n'ose toucher. Trois habitudes suffisent à éviter cela : nommer, centraliser, ordonner." },
        { type: "h", level: 2, text: "BEM : bloc, élément, modificateur" },
        { type: "code", lang: "css", caption: "Une classe = un composant, une partie, une variante.", code: `/* Bloc : le composant entier */
.carte { }

/* Élément : une partie du bloc, jamais réutilisée seule */
.carte__titre { }
.carte__prix { }
.carte__action { }

/* Modificateur : une variante du bloc ou d'un élément */
.carte--vedette { }
.carte__action--secondaire { }` },
        { type: "p", text: "L'intérêt de BEM n'est pas l'esthétique des noms : c'est la **spécificité constante**. Tous les sélecteurs restent à 0-1-0, donc aucune guerre de spécificité, aucune nécessité d'écrire `.carte .contenu .bloc p` pour passer devant une autre règle. On lit le nom et on sait à quoi il appartient — et le risque de casser un autre composant en modifiant une règle disparaît presque." },
        { type: "h", level: 2, text: "Un design system en variables" },
        { type: "code", lang: "css", caption: "Les fondations : échelle d'espacement, rayons, ombres, couleurs.", code: `:root {
  /* Espacement : une échelle régulière, un seul multiplicateur */
  --espace-1: 0.25rem;   /* 4px */
  --espace-2: 0.5rem;    /* 8px */
  --espace-3: 1rem;      /* 16px */
  --espace-4: 1.5rem;    /* 24px */
  --espace-5: 2rem;      /* 32px */

  /* Rayons */
  --rayon-s: 6px;
  --rayon-m: 12px;
  --rayon-pilule: 999px;

  /* Ombres */
  --ombre-1: 0 1px 2px hsl(228 40% 20% / 0.08);
  --ombre-2: 0 8px 24px hsl(228 40% 20% / 0.12);

  /* Couleurs sémantiques : le nom décrit l'usage, pas la teinte */
  --accent: hsl(228 76% 52%);
  --texte: hsl(228 25% 16%);
  --texte-doux: hsl(228 12% 42%);
  --surface: hsl(0 0% 100%);
  --bordure: hsl(228 25% 89%);
}` },
        { type: "p", text: "Nommez vos variables par **usage** (`--texte-doux`, `--bordure`) et non par apparence (`--gris-400`) : le jour où vous changez de thème, le nom reste juste. Une échelle d'espacement à cinq marches suffit à 99 % des cas — et empêche l'apparition des `padding: 13px` et `margin: 7px` qui rendent un projet incohérent." },
        { type: "h", level: 2, text: "`@layer` et ordre des règles" },
        { type: "code", lang: "css", caption: "Les couches déclarent l'ordre de priorité une fois pour toutes, sans jouer sur la spécificité.", code: `/* L'ordre de déclaration fixe la priorité : reset < base < composants < utilitaires */
@layer reset, base, composants, utilitaires;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}

@layer base {
  body { font-family: system-ui, sans-serif; color: var(--texte); }
}

@layer composants {
  .carte { padding: var(--espace-3); border-radius: var(--rayon-m); }
}

@layer utilitaires {
  .texte-centre { text-align: center; }
}` },
        { type: "list", ordered: true, items: [
          "`@layer` : un reset plus tard déclaré gagne sans `!important` — la priorité est déclarative",
          "Ordre interne d'un fichier : reset, variables, base (typo, liens), composants, utilitaires, media queries",
          "Un fichier par domaine : `base.css`, `layout.css`, `composants/bouton.css`, `pages/accueil.css`",
          "Des commentaires de section pour retrouver le sommaire sans lire 2 000 lignes",
          "Jamais de style scopé par un identifiant ni par une chaîne de trois descendants"
        ] },
        { type: "callout", tone: "tip", title: "Checklist de refactoring", text: "Avant de toucher à un CSS existant, repérez ce qui coûte le plus cher : cherchez `!important`, les couleurs en dur, les sélecteurs à plus de deux niveaux, les marges en pixels qui ne suivent aucune échelle, les classes génériques (`.box`, `.title`) partagées par plusieurs composants. Corrigez un point à la fois, avec une vérification visuelle après chaque étape — jamais un refactoring global en une passe.", items: [
          "Zéro `!important` justifié, ou documenté par un commentaire",
          "Toutes les couleurs et espacements passent par des variables",
          "Un composant peut être supprimé sans casser les autres",
          "Chaque classe est utilisée au moins une fois (supprimez le code mort)"
        ] },
        { type: "callout", tone: "warning", title: "Piège : la spécificité cumulative", text: "Un sélecteur comme `.page .carte .titre` (0-3-0) oblige le suivant à écrire `.page .carte .titre.actif` (0-4-0), puis `!important`. C'est une dette qui ne se rembourse jamais. Restez à une classe par règle et traitez l'ordre des fichiers et les couches comme le seul mécanisme de priorité.", items: [
          "Un sélecteur long cache souvent un manque de classe dédiée",
          "Les sélecteurs de type (`div`, `p`) dans un composant le rendent difficile à déplacer",
          "Supprimer du CSS est plus rentable que d'en ajouter"
        ] },
        { type: "demo", title: "Mini-projet : carte produit complète", height: 320, html: `<article class="carte carte--vedette">
  <div class="carte__media">
    <span class="carte__etiquette">Nouveau</span>
  </div>
  <div class="carte__corps">
    <h3 class="carte__nom">Lampe Orbe</h3>
    <p class="carte__desc">Acier brossé, lumière chaude réglable.</p>
    <div class="carte__ligne">
      <span class="carte__prix">49 €</span>
      <button class="carte__action" type="button">Ajouter</button>
    </div>
  </div>
</article>`, css: `:root {
  --espace-1: 0.5rem;
  --espace-2: 1rem;
  --rayon-m: 16px;
  --accent: hsl(228 76% 52%);
  --texte: hsl(228 25% 16%);
  --texte-doux: hsl(228 12% 44%);
  --surface: hsl(0 0% 100%);
  --bordure: hsl(228 25% 90%);
}
body { margin: 0; padding: 20px; background: hsl(228 40% 97%); font-family: system-ui, sans-serif; }
.carte {
  max-width: 260px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--bordure);
  border-radius: var(--rayon-m);
  box-shadow: 0 1px 2px hsl(228 40% 20% / 0.06), 0 12px 28px hsl(228 40% 20% / 0.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.carte:hover { transform: translateY(-3px); box-shadow: 0 2px 4px hsl(228 40% 20% / 0.08), 0 18px 40px hsl(228 40% 20% / 0.14); }
.carte__media {
  height: 120px;
  background: linear-gradient(135deg, hsl(228 76% 62%), hsl(190 70% 56%));
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: var(--espace-1);
}
.carte__etiquette {
  background: hsl(0 0% 100% / 0.9);
  color: var(--accent);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
}
.carte__corps { padding: var(--espace-2); }
.carte__nom { margin: 0 0 4px; font-size: 1.05rem; color: var(--texte); }
.carte__desc { margin: 0 0 14px; font-size: 0.82rem; line-height: 1.5; color: var(--texte-doux); }
.carte__ligne { display: flex; align-items: center; justify-content: space-between; gap: var(--espace-1); }
.carte__prix { font-weight: 700; color: var(--texte); }
.carte__action {
  border: 0;
  border-radius: 999px;
  padding: 9px 16px;
  background: var(--accent);
  color: white;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s ease, transform 0.2s ease;
}
.carte__action:hover { filter: brightness(1.08); transform: translateY(-1px); }
.carte__action:focus-visible { outline: 3px solid hsl(228 80% 65%); outline-offset: 2px; }
@media (prefers-color-scheme: dark) {
  body { background: hsl(228 25% 11%); }
  .carte { --surface: hsl(228 22% 16%); --texte: hsl(228 15% 94%); --texte-doux: hsl(228 12% 66%); --bordure: hsl(228 20% 24%); }
}`, js: "" },
        { type: "checklist", items: [
          "Vos classes suivent `bloc__element--modificateur`",
          "Toutes vos couleurs et espacements viennent de `:root`",
          "Vous savez expliquer l'intérêt de `@layer`",
          "Vous savez dans quel ordre ranger un fichier CSS",
          "Vous n'avez aucun sélecteur à plus de deux niveaux"
        ] }
      ],
      exercises: [
        {
          id: "css-ex-27",
          title: "Poser les fondations d'un design system",
          difficulty: 1,
          goal: "Créer trois variables et les consommer dans une carte.",
          instructions: [
            "Dans `:root`, déclarez `--espace: 16px`, `--espace-s: 8px` et `--rayon: 8px`.",
            "Sur `.carte`, utilisez `display: flex`, `flex-direction: column`, `gap: var(--espace-s)` et `padding: var(--espace)`.",
            "Ajoutez `border-radius: var(--rayon)`.",
            "Aucune valeur d'espacement en dur ne doit rester dans `.carte`."
          ],
          hint: "Un design system commence par une échelle : une petite valeur (`8px`) et une grande (`16px`). Les composants ne consomment que des variables.",
          starter: { html: `<section class="carte">
  <h2>Carte de base</h2>
  <p>Un composant réutilisable.</p>
</section>`, css: `.carte {
  background: hsl(228 40% 97%);
  font-family: system-ui, sans-serif;
}

.carte h2,
.carte p {
  margin: 0;
}`, js: "" },
          solution: { html: `<section class="carte">
  <h2>Carte de base</h2>
  <p>Un composant réutilisable.</p>
</section>`, css: `:root {
  --espace: 16px;
  --espace-s: 8px;
  --rayon: 8px;
}

.carte {
  display: flex;
  flex-direction: column;
  gap: var(--espace-s);
  padding: var(--espace);
  border-radius: var(--rayon);
  background: hsl(228 40% 97%);
  font-family: system-ui, sans-serif;
}

.carte h2,
.carte p {
  margin: 0;
}`, js: "" },
          checks: [
            "!!document.querySelector('.carte') && style('.carte','paddingTop') === '16px'",
            "style('.carte','gap') === '8px'",
            "style('.carte','borderRadius') === '8px'",
            "style('.carte','flexDirection') === 'column'"
          ],
          checklist: [
            "Le padding vient de `--espace` (16px)",
            "L'espacement interne vient de `--espace-s` (8px)",
            "Les coins sont arrondis à 8px",
            "La carte empile ses enfants en colonne"
          ]
        },
        {
          id: "css-ex-28",
          title: "Carte produit, étape 1 : la structure",
          difficulty: 2,
          goal: "Construire la charpente BEM d'une carte produit.",
          instructions: [
            "Sur `.carte` : `display: flex`, `flex-direction: column`, `gap: 12px`, `overflow: hidden` et `border-radius: 16px`.",
            "Sur `.carte__media` : `height: 140px` et `width: 100%`.",
            "Sur `.carte__prix` : `font-weight: 700`.",
            "Sur `.carte__action` : `width: 100%` et `padding-block: 10px`."
          ],
          hint: "`overflow: hidden` coupe net l'image dans les coins arrondis. En colonne flex, `gap` remplace toutes les marges verticales entre les parties.",
          starter: { html: `<article class="carte">
  <div class="carte__media"></div>
  <div class="carte__corps">
    <h3 class="carte__nom">Lampe Orbe</h3>
    <p class="carte__prix">49 €</p>
  </div>
  <button class="carte__action" type="button">Ajouter au panier</button>
</article>`, css: `.carte {
  max-width: 240px;
  padding: 12px;
  background: hsl(0 0% 100%);
  border: 1px solid hsl(228 25% 90%);
  font-family: system-ui, sans-serif;
}

.carte__media {
  background: linear-gradient(135deg, hsl(228 76% 62%), hsl(190 70% 56%));
  border-radius: 10px;
}

.carte__action {
  border: 0;
  border-radius: 10px;
  background: hsl(228 76% 52%);
  color: white;
  font: inherit;
}`, js: "" },
          solution: { html: `<article class="carte">
  <div class="carte__media"></div>
  <div class="carte__corps">
    <h3 class="carte__nom">Lampe Orbe</h3>
    <p class="carte__prix">49 €</p>
  </div>
  <button class="carte__action" type="button">Ajouter au panier</button>
</article>`, css: `.carte {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 240px;
  overflow: hidden;
  padding: 12px;
  border-radius: 16px;
  background: hsl(0 0% 100%);
  border: 1px solid hsl(228 25% 90%);
  font-family: system-ui, sans-serif;
}

.carte__media {
  width: 100%;
  height: 140px;
  background: linear-gradient(135deg, hsl(228 76% 62%), hsl(190 70% 56%));
  border-radius: 10px;
}

.carte__prix {
  margin: 0;
  font-weight: 700;
}

.carte__action {
  width: 100%;
  padding-block: 10px;
  border: 0;
  border-radius: 10px;
  background: hsl(228 76% 52%);
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}`, js: "" },
          checks: [
            "!!document.querySelector('.carte') && style('.carte','display') === 'flex'",
            "style('.carte','flexDirection') === 'column'",
            "style('.carte','gap') === '12px'",
            "style('.carte','overflow') === 'hidden'",
            "style('.carte__prix','fontWeight') === '700'"
          ],
          checklist: [
            "La carte empile ses parties en colonne avec 12px d'écart",
            "Le contenu qui dépasse est coupé (`overflow: hidden`)",
            "Le prix est en gras"
          ]
        },
        {
          id: "css-ex-29",
          title: "Carte produit, étape 2 : la finition",
          difficulty: 3,
          goal: "Finaliser le composant avec une grille, un dégradé et une typographie hiérarchisée.",
          instructions: [
            "Passez `.carte` en `display: grid`, `gap: 10px` et `padding: 14px`.",
            "Sur `.carte__action` : `background-image: linear-gradient(135deg, hsl(228 76% 56%), hsl(190 70% 50%))`, `border-radius: 999px` et `padding-block: 10px`.",
            "Sur `.carte__nom` : `font-size: 1.125rem` et `font-weight: 700`.",
            "Ajoutez une transition de `0.25s` sur `.carte__action`."
          ],
          hint: "Une grille d'une seule colonne se comporte comme un empilement, avec `gap` et un alignement plus prévisible. `1.125rem` vaut 18px avec une racine à 16px.",
          starter: { html: `<article class="carte">
  <div class="carte__media"></div>
  <div class="carte__corps">
    <h3 class="carte__nom">Lampe Orbe</h3>
    <p class="carte__desc">Acier brossé, lumière réglable.</p>
    <span class="carte__prix">49 €</span>
  </div>
  <button class="carte__action" type="button">Ajouter</button>
</article>`, css: `.carte {
  max-width: 240px;
  background: hsl(0 0% 100%);
  border: 1px solid hsl(228 25% 90%);
  font-family: system-ui, sans-serif;
}

.carte__media {
  height: 120px;
  background: linear-gradient(135deg, hsl(228 76% 62%), hsl(190 70% 56%));
}

.carte__action {
  border: 0;
  background: hsl(228 76% 52%);
  color: white;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}`, js: "" },
          solution: { html: `<article class="carte">
  <div class="carte__media"></div>
  <div class="carte__corps">
    <h3 class="carte__nom">Lampe Orbe</h3>
    <p class="carte__desc">Acier brossé, lumière réglable.</p>
    <span class="carte__prix">49 €</span>
  </div>
  <button class="carte__action" type="button">Ajouter</button>
</article>`, css: `.carte {
  display: grid;
  gap: 10px;
  max-width: 240px;
  padding: 14px;
  background: hsl(0 0% 100%);
  border: 1px solid hsl(228 25% 90%);
  border-radius: 16px;
  font-family: system-ui, sans-serif;
}

.carte__media {
  height: 120px;
  border-radius: 10px;
  background: linear-gradient(135deg, hsl(228 76% 62%), hsl(190 70% 56%));
}

.carte__nom {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
}

.carte__desc {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: hsl(228 12% 44%);
}

.carte__prix {
  font-weight: 600;
  color: hsl(228 76% 45%);
}

.carte__action {
  border: 0;
  border-radius: 999px;
  padding-block: 10px;
  background-image: linear-gradient(135deg, hsl(228 76% 56%), hsl(190 70% 50%));
  color: white;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.25s ease, transform 0.25s ease;
}

.carte__action:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}`, js: "" },
          checks: [
            "!!document.querySelector('.carte') && style('.carte','display') === 'grid'",
            "style('.carte','gap') === '10px'",
            "style('.carte__action','backgroundImage').includes('gradient')",
            "style('.carte__action','borderRadius') === '999px'",
            "style('.carte__nom','fontSize') === '18px'"
          ],
          checklist: [
            "La carte est une grille avec 10px de gouttière",
            "Le bouton affiche un dégradé et une forme pilule",
            "Le nom du produit mesure 18px et s'affiche en gras",
            "Le bouton dispose d'une transition"
          ]
        }
      ]
    }
  ],
  quiz: {
    title: "Quiz — CSS",
    pass: 0.75,
    questions: [
      {
        q: "Deux règles visent la même propriété du même élément : `p { color: red }` puis `.note { color: blue }`. Quelle couleur s'affiche sur un paragraphe qui porte la classe `note` ?",
        options: ["Rouge, car elle est écrite en premier", "Bleu, car la classe a une spécificité plus forte", "Rouge, car l'ordre d'écriture passe avant la spécificité", "Aucune : le conflit est ignoré"],
        answer: 1,
        explain: "La spécificité (0-1-0 pour une classe) bat un sélecteur d'élément (0-0-1). L'ordre ne tranche qu'à spécificité **égale**."
      },
      {
        q: "Avec `box-sizing: border-box`, à quoi correspond `width: 200px` ?",
        options: ["Au contenu seul, hors padding et bordure", "Au contenu plus le padding et la bordure", "Au contenu plus la marge", "À la largeur du parent"],
        answer: 1,
        explain: "`border-box` inclut padding et bordure dans la largeur déclarée : la boîte occupe exactement 200px, le contenu rétrécit d'autant."
      },
      {
        q: "Dans un conteneur `display: flex` avec `flex-direction: row`, quelle propriété aligne les éléments verticalement ?",
        options: ["`justify-content`", "`align-items`", "`text-align`", "`vertical-align`"],
        answer: 1,
        explain: "En `row`, l'axe principal est horizontal : `justify-content` répartit sur cet axe, `align-items` agit sur l'axe secondaire, donc vertical."
      },
      {
        q: "Quelle est la façon la plus courte de centrer parfaitement un enfant dans un conteneur ?",
        options: ["`display: flex; align-items: center; justify-content: center;`", "`position: absolute; top: 50%; left: 50%;`", "`margin: auto;` sur l'enfant uniquement", "`display: block; margin: 0 auto;`"],
        answer: 0,
        explain: "Flexbox centre sur les deux axes avec trois déclarations, sans positionnement absolu ni calcul de décalage."
      },
      {
        q: "Un enfant `position: absolute` se place par rapport à quoi ?",
        options: ["Toujours la fenêtre du navigateur", "L'ancêtre positionné le plus proche", "Son parent direct, même s'il est `static`", "L'élément précédent dans le flux"],
        answer: 1,
        explain: "Il cherche l'ancêtre le plus proche dont `position` n'est pas `static`. Sans ancêtre positionné, il se cale sur la page initiale — d'où le badge qui s'envole."
      },
      {
        q: "Pourquoi `z-index: 9999` peut-il n'avoir aucun effet ?",
        options: ["`z-index` ne fonctionne que sur les images", "L'élément est en `position: static`", "La valeur maximale est 999", "Il faut toujours l'écrire avec `!important`"],
        answer: 1,
        explain: "`z-index` n'agit que sur un élément positionné (`relative`, `absolute`, `fixed`, `sticky`). Un parent créant un contexte d'empilement peut aussi l'enfermer dans un plan inférieur."
      },
      {
        q: "En mobile-first, quelles media queries écrit-on ?",
        options: ["`@media (max-width: 600px)`", "`@media (min-width: 600px)`", "`@media (orientation: landscape)` uniquement", "Aucune : les media queries sont déconseillées"],
        answer: 1,
        explain: "On part du style mobile (simple) et on ajoute des règles quand la place augmente, donc à partir d'une largeur minimale."
      },
      {
        q: "Quelle déclaration crée une galerie responsive sans aucune media query ?",
        options: ["`grid-template-columns: 1fr 1fr 1fr;`", "`grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));`", "`display: flex; flex-direction: column;`", "`width: 33.33%; float: left;`"],
        answer: 1,
        explain: "`auto-fit` calcule le nombre de colonnes selon la place, `minmax(180px, 1fr)` garantit une largeur lisible : la grille s'adapte seule."
      },
      {
        q: "Quelles propriétés sont les moins coûteuses à animer ?",
        options: ["`width` et `height`", "`transform` et `opacity`", "`top` et `left`", "`margin` et `padding`"],
        answer: 1,
        explain: "Le navigateur les traite sur le GPU sans recalculer la mise en page ni redessiner : l'animation reste fluide. Les autres provoquent un *layout* ou un *paint* à chaque image."
      },
      {
        q: "Avec une racine à 16px, à quoi correspond `0.875rem` ?",
        options: ["8.75px", "14px", "16px", "87.5px"],
        answer: 1,
        explain: "`rem` se réfère à la taille de police de `html` : 16 × 0.875 = 14px. Contrairement à `em`, il ne dépend pas du parent immédiat."
      },
      {
        q: "Pourquoi éviter `!important` ?",
        options: ["C'est une propriété non standard", "Il casse la cascade et oblige à en ajouter d'autres pour le surcharger", "Il ne fonctionne pas dans Chrome", "Il ralentit le chargement de la page"],
        answer: 1,
        explain: "Un `!important` ne peut être battu que par un autre `!important` : la cascade devient ingérable. Une spécificité basse et un ordre de fichiers clair suffisent."
      },
      {
        q: "Dans la convention BEM, que désigne `.carte__prix` ?",
        options: ["Un modificateur du bloc `carte`", "Un élément `prix` appartenant au bloc `carte`", "Un identifiant unique", "Un sélecteur descendant équivalent à `.carte .prix`"],
        answer: 1,
        explain: "`bloc__element` désigne une partie interne du composant ; `bloc--modificateur` désigne une variante. Cette convention garde une spécificité constante à 0-1-0."
      }
    ]
  }
});
