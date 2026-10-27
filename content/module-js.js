window.COURSE_MODULES = window.COURSE_MODULES || [];
window.COURSE_MODULES.push({
  id: "js",
  number: 3,
  title: "JavaScript — l'interactivité",
  subtitle: "Donner vie aux pages : logique, DOM, événements et données",
  accent: "#f0db4f",
  icon: "code",
  level: "Débutant → Avancé",
  hours: 16,
  description: "Le module qui transforme un document en application. Vous apprendrez à raisonner en **valeurs, conditions et boucles**, à manipuler le DOM sans le casser, à écouter les événements, à structurer votre code en fonctions et en classes, puis à gérer l'asynchrone et la persistance locale. Chaque leçon se termine par des exercices vérifiés automatiquement : un code partiel est fourni, vous le complétez, l'application contrôle le résultat observable.",
  goals: [
    "Écrire du JavaScript lisible : variables, types, conditions, boucles et fonctions",
    "Manipuler le DOM et les événements pour rendre une interface réactive",
    "Traiter des collections de données avec les méthodes de tableaux et d'objets",
    "Gérer l'asynchrone : promesses, `async`/`await`, états de chargement et erreurs",
    "Persister un état local avec `localStorage` et déboguer méthodiquement",
    "Assembler une mini-application : état, rendu, filtres, sauvegarde, accessibilité"
  ],
  lessons: [
    {
      id: "js-01",
      title: "Premiers pas : variables, types et affichage",
      minutes: 45,
      summary: "Charger un script proprement, déclarer des valeurs, connaître leurs types et construire du texte.",
      objectives: [
        "Charger un fichier JavaScript avec `defer` et savoir quand le code s'exécute",
        "Choisir entre `const`, `let` et comprendre pourquoi `var` est à éviter",
        "Reconnaître les types primitifs et les interroger avec `typeof`",
        "Assembler du texte avec les template literals"
      ],
      content: [
        {
          type: "lead",
          text: "Le HTML décrit la structure, le CSS l'apparence : aucun des deux ne **décide**. Le JavaScript calcule, compare, réagit et modifie la page en direct. C'est le langage qui transforme un document en application."
        },
        { type: "h", level: 2, text: "Où et comment charger du JavaScript" },
        {
          type: "p",
          text: "Trois emplacements existent : l'attribut d'un élément (à éviter absolument), une balise `script` au fil du document, ou — le choix standard — un fichier `.js` séparé chargé avec `defer`. Sans `defer`, le navigateur **interrompt la lecture du HTML** pour exécuter le script : si votre code cherche un élément qui n'existe pas encore, il reçoit `null` et plante. Avec `defer`, le fichier est téléchargé en parallèle puis exécuté après l'analyse complète du HTML, dans l'ordre des balises. Notez que `defer` est ignoré sur un script inline : pour être certain que le DOM existe, écoutez `DOMContentLoaded` ou laissez le script juste avant la fermeture du `body`."
        },
        {
          type: "list",
          items: [
            "`<script src=\"assets/js/app.js\" defer></script>` appelle un fichier externe et attend la fin de l'analyse du HTML : c'est le chargement moderne, à retenir.",
            "La variante de test rapide s'écrit directement dans la page : une balise `script` portant `defer` et sans `src`.",
            "Son contenu exécute `console.log(\"Le HTML est prêt.\")`, et la console affiche `Le HTML est prêt.` une fois le document analysé.",
            "Dans les deux cas, l'attribut `defer` garantit que le script ne s'exécute pas avant que les éléments de la page existent."
          ]
        },
        { type: "h", level: 2, text: "Déclarer une valeur : `const`, `let`, `var`" },
        {
          type: "p",
          text: "Une variable est une **étiquette posée sur une valeur**. `const` interdit de réaffecter l'étiquette (mais pas de modifier l'objet pointé, c'est la nuance qui surprend tout le monde). `let` autorise la réaffectation. `var` est le mot-clé historique : sa portée est la fonction et non le bloc, et sa déclaration est remontée (*hoisting*) — la variable existe dès le début de la fonction avec la valeur `undefined`. C'est la source d'innombrables bugs, en particulier dans les boucles où toutes les itérations partagent la même variable. Règle simple : `const` par défaut, `let` seulement quand la valeur doit changer, `var` jamais dans du code neuf."
        },
        {
          type: "list",
          items: [
            "`const` fige la **référence**, pas le contenu : `const TVA = 0.18;` déclare une constante qui ne changera pas, et `TVA` vaut `0.18`.",
            "`let total = 0;` déclare une variable destinée à évoluer : `total` vaut `0`.",
            "`total = total + 100;` réaffecte `total`, ce que `let` autorise : `total` vaut maintenant `100`.",
            "Réaffecter une constante, par exemple `TVA = 0.2;`, lève `TypeError: Assignment to constant variable` : cette ligne reste commentée, jamais exécutée.",
            "`const panier = [\"pain\"];` pose une étiquette fixe sur un tableau, puis `panier.push(\"lait\");` ajoute `\"lait\"` sans violer `const`, car la référence n'a pas changé.",
            "`console.log(panier.length);` affiche `2` : le tableau contient désormais `[\"pain\", \"lait\"]`."
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "Le piège du hoisting",
          text: "`var nom;` déclaré plus bas dans une fonction est déjà accessible en haut, avec la valeur `undefined` : aucune erreur, juste un résultat faux. Dans une boucle, toutes les itérations partagent cette même variable — la classe de bug la plus fréquente chez le débutant. `let` et `const` protègent de cela : y accéder avant la déclaration lève une `ReferenceError` (zone morte temporaire). Quand une valeur affichée est `undefined`, cherchez une déclaration trop tardive, une faute de frappe ou un élément du DOM inexistant."
        },
        { type: "h", level: 2, text: "Types primitifs et `typeof`" },
        {
          type: "list",
          items: [
            "`typeof \"Ada\"` renvoie `\"string\"` : la valeur est du texte.",
            "`typeof 42` renvoie `\"number\"` ; `typeof true` renvoie `\"boolean\"`.",
            "`typeof undefined` renvoie `\"undefined\"`.",
            "`typeof null` renvoie `\"object\"` : un bug de 1995, conservé pour ne pas casser le Web. Testez donc `valeur === null`.",
            "`typeof [1, 2]` renvoie `\"object\"` : un tableau est un objet. C'est `Array.isArray(valeur)` qui le distingue.",
            "`typeof function () {}` renvoie `\"function\"`.",
            "Attention à la conversion : `\"12\" + 1` donne `\"121\"`, car `+` colle du texte ; `Number(\"12\") + 1` donne `13`."
          ]
        },
        {
          type: "callout",
          tone: "danger",
          title: "Deux surprises éternelles",
          text: "JavaScript possède sept primitifs : `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`, plus les objets et les fonctions. Une variable n'a pas de type, c'est la **valeur** qui en a un. `typeof null` renvoie 'object' : un bug de 1995 conservé pour ne pas casser le Web, testez donc `valeur === null`. Et `NaN` (« Not a Number ») est lui-même de type 'number' : un calcul raté ne lève rien, il propage `NaN` dans tout le programme. Vérifiez avec `Number.isNaN()`, jamais avec `=== NaN` qui est toujours faux."
        },
        { type: "h", level: 2, text: "Template literals : construire du texte" },
        {
          type: "p",
          text: "Un accent grave ouvre et ferme le texte, et `${…}` interpole une valeur sans `+`. Ces *template literals* gardent les retours à la ligne et remplacent la concaténation, illisible dès trois valeurs."
        },
        {
          type: "list",
          items: [
            "`const prenom = \"Ada\";` prépare une chaîne : `prenom` vaut `\"Ada\"`.",
            "`const commande = { total: 245, articles: 3 };` prépare un objet à deux clés : `commande.total` vaut `245` et `commande.articles` vaut `3`.",
            "Le message s'écrit entre accents graves et occupe deux lignes : `Bonjour ${prenom},` puis `votre commande de ${commande.articles} articles coûte ${commande.total} EUR.`",
            "Les trois expressions sont remplacées au moment de la construction, et le retour à la ligne du modèle est conservé tel quel dans la chaîne.",
            "`console.log(message);` affiche `Bonjour Ada,` à la ligne, puis `votre commande de 3 articles coûte 245 EUR.`"
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Ces quatre gestes doivent être automatiques avant la leçon suivante.",
          items: [
            "Écrire un `<script defer>` qui ne bloque pas la page",
            "Choisir `const` ou `let` sans hésiter",
            "Prédire le type renvoyé par `typeof` pour les cas piégeux",
            "Écrire un message avec interpolation plutôt qu'avec des `+`"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-01",
          title: "Votre premier message dynamique",
          difficulty: 1,
          goal: "Déclarer deux valeurs et les afficher dans un paragraphe avec un template literal.",
          instructions: [
            "Déclarez une constante `prenom` valant `Ada` et une constante `langage` valant `JavaScript`.",
            "Sélectionnez le paragraphe d'identifiant `sortie` avec `document.querySelector`.",
            "Affectez à son `textContent` le message exact `Bonjour Ada, bienvenue en JavaScript !` en utilisant un template literal.",
            "Rechargez l'exercice : le paragraphe doit contenir votre message à la place du texte d'attente."
          ],
          hint: "Le texte à produire contient le symbole `!` : l'important est que les deux valeurs apparaissent dans la phrase, dans un accent grave.",
          starter: {
            html: `<h2>Sortie</h2>
<p id="sortie">A compléter</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1.1rem; }`,
            js: `// décrivez vos deux constantes
// écrivez le message
const sortie = document.querySelector("#sortie");
sortie.textContent = "A compléter";`
          },
          solution: {
            html: `<h2>Sortie</h2>
<p id="sortie">A compléter</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1.1rem; }`,
            js: `const prenom = "Ada";
const langage = "JavaScript";

const sortie = document.querySelector("#sortie");
sortie.textContent = \`Bonjour \${prenom}, bienvenue en \${langage} !\`;`
          },
          checks: [
            "getText('#sortie').includes('Bonjour')",
            "getText('#sortie').includes('Ada')",
            "getText('#sortie').includes('JavaScript')"
          ],
          checklist: [
            "Deux constantes déclarées",
            "Le paragraphe affiche la phrase complète",
            "Aucun `+` de concaténation nécessaire"
          ]
        },
        {
          id: "js-ex-02",
          title: "Enquête de types",
          difficulty: 2,
          goal: "Afficher le type réel de trois valeurs avec `typeof`.",
          instructions: [
            "Les trois constantes `quantite`, `nom` et `actif` sont déjà déclarées : ne les modifiez pas.",
            "Affichez dans le paragraphe `#sortie` les trois types obtenus avec `typeof`, séparés par ` / `.",
            "Le résultat attendu ressemble à `number / string / boolean`.",
            "L'affichage doit se produire au chargement du script, sans clic."
          ],
          hint: "`typeof` renvoie une chaîne : vous pouvez donc la concaténer ou l'interpoler comme n'importe quel texte.",
          starter: {
            html: `<h2>Types</h2>
<p id="sortie">en attente</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 600; }`,
            js: `const quantite = 42;
const nom = "Ada";
const actif = true;

const sortie = document.querySelector("#sortie");
sortie.textContent = ""; // affichez ici les trois typeof`
          },
          solution: {
            html: `<h2>Types</h2>
<p id="sortie">en attente</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 600; }`,
            js: `const quantite = 42;
const nom = "Ada";
const actif = true;

const sortie = document.querySelector("#sortie");
sortie.textContent = \`\${typeof quantite} / \${typeof nom} / \${typeof actif}\`;`
          },
          checks: [
            "getText('#sortie').includes('number')",
            "getText('#sortie').includes('string')",
            "getText('#sortie').includes('boolean')"
          ],
          checklist: [
            "Les trois valeurs sont interrogées avec `typeof`",
            "Les trois types apparaissent dans le paragraphe",
            "Le code s'exécute tout seul, sans écouteur d'événement"
          ]
        }
      ]
    },
    {
      id: "js-02",
      title: "Opérateurs et conditions",
      minutes: 50,
      summary: "Comparer sans piège de conversion, combiner des conditions et brancher proprement.",
      objectives: [
        "Utiliser `===` et `!==` et expliquer pourquoi `==` est dangereux",
        "Combiner des conditions avec `&&`, `||`, `!` et fournir une valeur par défaut avec `??`",
        "Écrire `if` / `else if` / `else`, `switch` et l'opérateur ternaire",
        "Identifier les valeurs falsy et convertir explicitement"
      ],
      content: [
        {
          type: "lead",
          text: "Un programme n'est qu'une suite de décisions. Encore faut-il que ces décisions portent sur les **bonnes valeurs** : la moitié des bugs du débutant vient d'une comparaison qui n'a pas comparé ce qu'il croyait."
        },
        { type: "h", level: 2, text: "Arithmétique et comparaisons : `===` par défaut" },
        {
          type: "p",
          text: "Les opérateurs `+`, `-`, `*`, `/`, `%` et la puissance sont classiques, mais `+` a deux rôles : addition et concaténation. Dès qu'un opérande est une chaîne, JavaScript convertit l'autre et **colle** les textes. Les champs de formulaire renvoient toujours des chaînes : `\"5\" + 1` donne `\"51\"`, pas `6`. Le reste de l'arithmétique convertit au contraire en nombre — d'où des incohérences dangereuses. Convertissez explicitement avec `Number()`, et surveillez `NaN` qui empoisonne tout calcul suivant."
        },
        {
          type: "list",
          items: [
            "Convertir avant de calculer : `const prix = Number(\"19.99\");` convertit explicitement la chaîne en nombre, et `prix` vaut `19.99`.",
            "`const quantite = 3;` fixe la quantité à `3`.",
            "`prix * quantite;` vaut `59.97` : la multiplication travaille bien sur deux nombres.",
            "`prix + quantite;` vaut `22.99` ; avec une chaîne à la place de `prix`, le `+` aurait recollé le texte au lieu d'additionner.",
            "`10 % 3;` vaut `1`, le reste de la division.",
            "`2 ** 8;` vaut `256`, la puissance.",
            "`Number(\"abc\");` renvoie `NaN`, car la chaîne n'est pas numérique.",
            "`Number(\"\");` renvoie `0`, ce qui surprend : une chaîne vide devient un zéro valide.",
            "`Number(\"  42  \");` renvoie `42` : les espaces autour du nombre sont ignorés."
          ]
        },
        {
          type: "p",
          text: "`==` compare après **conversion de type**, `===` compare type et valeur. La conversion de `==` suit des règles mémorisables par personne : `0 == \"\"` est vrai, `0 == \"0\"` est vrai, `null == undefined` est vrai, `[] == \"\"` est vrai. Aucun de ces résultats n'est intuitif. Utilisez `===` et `!==` sans exception ; si deux types diffèrent, convertissez explicitement — vous saurez alors pourquoi. Attention aussi aux comparaisons de chaînes : `\"2\" > \"10\"` est vrai, car elles se comparent caractère par caractère."
        },
        {
          type: "list",
          items: [
            "Toujours `===` : le comportement de `==` n'est pas prévisible, car `==` compare après conversion de type alors que `===` compare le type **et** la valeur.",
            "`0 == \"\";` renvoie `true` : la chaîne vide est convertie en `0`.",
            "`0 === \"\";` renvoie `false` : c'est le résultat que vous voulez.",
            "`\"1\" == 1;` renvoie `true` : le texte est converti en nombre.",
            "`\"1\" === 1;` renvoie `false` : une chaîne n'est pas un nombre.",
            "`null == undefined;` renvoie `true`, car `==` les considère équivalents.",
            "`null === undefined;` renvoie `false` : deux types distincts.",
            "`NaN == NaN;` renvoie `false`, car `NaN` n'est égal à rien, pas même à lui-même ; utilisez `Number.isNaN()`."
          ]
        },
        {
          type: "callout",
          tone: "danger",
          title: "Le piège des nombres saisis",
          text: "Un `<input type=\"number\">` renvoie une **chaîne**. `if (age > 18)` fonctionne par chance, mais `if (age === 18)` échoue silencieusement quand `age` vaut `\"18\"`. Prenez l'habitude de convertir à la frontière : `const age = Number(champ.value)`. Vos comparaisons strictes deviennent alors fiables."
        },
        { type: "h", level: 2, text: "Logique, valeurs par défaut, accès sûr" },
        {
          type: "p",
          text: "`&&` renvoie le premier opérande falsy, sinon le dernier ; `||` renvoie le premier truthy, sinon le dernier. Ils ne renvoient pas un booléen mais **une des valeurs**. `??` (*nullish coalescing*) ne réagit qu'à `null` et `undefined` : c'est le bon opérateur pour une valeur par défaut, car `0`, `\"\"` et `false` sont des valeurs légitimes. Enfin `?.` interrompt l'évaluation dès que la cible est `null`/`undefined` au lieu de lever une erreur."
        },
        {
          type: "list",
          items: [
            "`seuil || 10` perd le `0`, alors que `??` et `?.` gardent les valeurs légitimes et évitent le plantage.",
            "`const seuil = 0;` définit un seuil à zéro, une valeur parfaitement légitime.",
            "`seuil || 10;` renvoie `10` : `0` est falsy, donc le défaut s'applique et la valeur réelle disparaît — probablement un bug.",
            "`seuil ?? 10;` renvoie `0` : `??` ne bascule que sur `null` ou `undefined`, donc `0` est conservé.",
            "`const utilisateur = { nom: \"Ada\", adresse: null };` décrit un objet dont l'adresse est explicitement absente.",
            "`utilisateur?.adresse?.ville;` renvoie `undefined` sans lever d'erreur : le chaînage optionnel s'arrête au lieu de planter.",
            "`utilisateur?.nom ?? \"anonyme\";` renvoie `\"Ada\"` : la première valeur définie gagne, le repli ne sert que si elle manque.",
            "`const estConnecte = true;` puis `estConnecte && \"admin\";` renvoie `\"admin\"` : `&&` renvoie le dernier opérande quand tout est truthy, ce qui conditionne une valeur."
          ]
        },
        {
          type: "demo",
          title: "Comparer `||` et `??` sur des valeurs falsy",
          height: 260,
          html: `<p>Même valeur, deux opérateurs, deux résultats :</p>
<ul id="resultats"></ul>`,
          css: `body { font-family: system-ui, sans-serif; padding: 12px; margin: 0; }
ul { padding-left: 18px; }
li { margin: 6px 0; font-family: ui-monospace, monospace; font-size: 13px; }`,
          js: `const valeurs = [0, "", null, undefined, false];
const ul = document.getElementById("resultats");

for (const v of valeurs) {
  const li = document.createElement("li");
  const etiquette = v === "" ? '""' : String(v);
  li.textContent = \`\${etiquette} -> || donne \${v || "defaut"} | ?? donne \${v ?? "defaut"}\`;
  ul.append(li);
}`
        },
        { type: "h", level: 2, text: "Brancher : `if`, `switch`, ternaire" },
        {
          type: "p",
          text: "`if` s'écrit toujours avec accolades ; `switch` compare en `===` et tombe dans le cas suivant sans `break` ; le ternaire choisit une valeur, il n'exécute pas deux blocs."
        },
        {
          type: "list",
          items: [
            "`const note = 13;` fixe la note à `13`.",
            "Le premier test `note >= 16` est faux : la branche qui affecte `\"excellent\"` est sautée, elle ne serait atteinte qu'à partir de `16`.",
            "Le deuxième test `note >= 12` est vrai, donc `categorie` vaut `\"bien\"` ; les tests s'évaluent dans l'ordre, du plus exigeant au plus permissif.",
            "Le `else` final n'affecte `\"a revoir\"` que si aucun test précédent n'a répondu.",
            "Le `switch (categorie)` compare avec `===` : le cas `\"excellent\"` est ignoré, le cas `\"bien\"` s'applique et `couleur` vaut `\"vert\"`.",
            "Le `break` sort ensuite du `switch` ; sans lui, l'exécution chuterait dans le cas suivant et écraserait la valeur, seule la branche `default` affectant `\"gris\"`.",
            "`const libelle = note >= 10 ? \"admis\" : \"recalé\";` choisit une valeur en une expression : avec `13`, `libelle` vaut `\"admis\"`."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Ces réflexes évitent la majorité des conditions fausses.",
          items: [
            "Écrire `===` et `!==` sans y penser",
            "Choisir `??` plutôt que `||` pour une valeur par défaut",
            "Convertir un `input.value` avec `Number()` avant comparaison",
            "Nommer les 6 valeurs falsy : `false`, `0`, `\"\"`, `null`, `undefined`, `NaN`"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-03",
          title: "Pair ou impair",
          difficulty: 1,
          goal: "Choisir un texte selon le résultat d'un calcul, avec un opérateur ternaire.",
          instructions: [
            "La constante `nombre` vaut `7`. Calculez son reste avec l'opérateur modulo `%`.",
            "Affectez à `parite` la chaîne `pair` ou `impair` selon le résultat, via un ternaire.",
            "Affichez dans `#sortie` le message `7 -> impair` (le nombre, une flèche, puis le mot).",
            "Aucun clic : tout doit être affiché dès le chargement."
          ],
          hint: "Un nombre est pair quand `nombre % 2 === 0`. Le ternaire s'écrit `condition ? valeurSiVrai : valeurSiFaux`.",
          starter: {
            html: `<h2>Parité</h2>
<p id="sortie">à vous de jouer</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; }`,
            js: `const nombre = 7;
const sortie = document.querySelector("#sortie");

// calculez la parité puis affichez le message
sortie.textContent = "à vous de jouer";`
          },
          solution: {
            html: `<h2>Parité</h2>
<p id="sortie">à vous de jouer</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; }`,
            js: `const nombre = 7;
const sortie = document.querySelector("#sortie");

const parite = nombre % 2 === 0 ? "pair" : "impair";
sortie.textContent = \`\${nombre} -> \${parite}\`;`
          },
          checks: [
            "getText('#sortie').startsWith('7')",
            "getText('#sortie').endsWith('impair')"
          ],
          checklist: [
            "Le modulo `%` est utilisé",
            "Le mot affiché correspond au nombre 7",
            "Le message commence par le nombre"
          ]
        },
        {
          id: "js-ex-04",
          title: "Tarifs par tranche d'âge",
          difficulty: 2,
          goal: "Enchaîner `if` / `else if` / `else` en respectant l'ordre des cas.",
          instructions: [
            "La constante `age` vaut `16` : ne la modifiez pas.",
            "Déterminez la catégorie : `enfant` si l'âge est inférieur à 12, `ado` s'il est inférieur à 18, `adulte` s'il est inférieur à 65, sinon `senior`.",
            "Affichez dans `#sortie` : `Âge 16 : tarif ado` (le nombre, puis la catégorie calculée).",
            "L'ordre des conditions doit rester du plus petit au plus grand."
          ],
          hint: "Commencez par le test le plus restrictif (`age < 12`) : si vous testiez `age < 65` en premier, les enfants tomberaient dans la mauvaise catégorie.",
          starter: {
            html: `<h2>Tarif</h2>
<p id="sortie">à compléter</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 600; }`,
            js: `const age = 16;
const sortie = document.querySelector("#sortie");

let categorie = "";

// complétez la cascade de conditions

sortie.textContent = "à compléter";`
          },
          solution: {
            html: `<h2>Tarif</h2>
<p id="sortie">à compléter</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 600; }`,
            js: `const age = 16;
const sortie = document.querySelector("#sortie");

let categorie;

if (age < 12) {
  categorie = "enfant";
} else if (age < 18) {
  categorie = "ado";
} else if (age < 65) {
  categorie = "adulte";
} else {
  categorie = "senior";
}

sortie.textContent = \`Âge \${age} : tarif \${categorie}\`;`
          },
          checks: [
            "getText('#sortie').toLowerCase().includes('ado')",
            "getText('#sortie').includes('16')",
            "!/adulte/i.test(getText('#sortie'))"
          ],
          checklist: [
            "La cascade `if` / `else if` / `else` est utilisée",
            "`age` vaut toujours 16",
            "La catégorie affichée est `ado`"
          ]
        },
        {
          id: "js-ex-05",
          title: "Contrôle d'accès",
          difficulty: 3,
          goal: "Utiliser `??` pour une valeur par défaut et la *truthiness* pour un test d'accès.",
          instructions: [
            "`nom` vaut `null` et `permission` vaut la chaîne vide.",
            "Affichez un nom d'affichage : si `nom` est `null` ou `undefined`, utilisez `visiteur anonyme` (opérateur `??`, pas `||`).",
            "Déterminez l'accès : une chaîne vide est falsy, donc l'accès est `accès refusé` ; sinon `accès accordé`.",
            "Affichez les deux informations séparées par ` : ` dans `#sortie`, par exemple `visiteur anonyme : accès refusé`."
          ],
          hint: "`nom || \"visiteur anonyme\"` donnerait le même résultat ici, mais `??` est le bon réflexe : il ne remplace que `null` et `undefined`.",
          starter: {
            html: `<h2>Accès</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; font-size: 15px; }`,
            js: `const nom = null;
const permission = "";
const sortie = document.querySelector("#sortie");

// nom d'affichage avec ??
// verdict d'accès selon la truthiness

sortie.textContent = "";`
          },
          solution: {
            html: `<h2>Accès</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; font-size: 15px; }`,
            js: `const nom = null;
const permission = "";
const sortie = document.querySelector("#sortie");

const affichage = nom ?? "visiteur anonyme";
const acces = permission ? "accès accordé" : "accès refusé";

sortie.textContent = \`\${affichage} : \${acces}\`;`
          },
          checks: [
            "getText('#sortie').includes('anonyme')",
            "getText('#sortie').toLowerCase().includes('refus')",
            "getText('#sortie').length > 15"
          ],
          checklist: [
            "`??` est utilisé pour le nom",
            "Le verdict refuse l'accès avec une permission vide",
            "Les deux informations sont sur une seule ligne"
          ]
        }
      ]
    },
    {
      id: "js-03",
      title: "Boucles : répéter sans se tromper",
      minutes: 50,
      summary: "Répéter une action un nombre connu ou inconnu de fois, et parcourir une collection sans piège.",
      objectives: [
        "Écrire une boucle `for` juste du premier coup (initialisation, condition, incrément)",
        "Choisir entre `while` et `do...while` selon le besoin",
        "Parcourir un tableau avec `for...of` et un objet avec `for...in`",
        "Appliquer les patrons somme, compteur et recherche"
      ],
      content: [
        {
          type: "lead",
          text: "Répéter à la main est une erreur en puissance : on oublie une ligne, on décale un indice. Une boucle décrit la répétition **une seule fois**, et le nombre d'itérations devient une donnée du problème."
        },
        { type: "h", level: 2, text: "La boucle `for` : trois parties, zéro ambiguïté" },
        {
          type: "p",
          text: "`for (initialisation ; condition ; pas)` réunit tout ce qui contrôle la répétition sur une ligne, donc tout est visible. La condition est testée **avant** chaque tour : si elle est fausse au départ, le corps ne s'exécute jamais. L'erreur classique est le décalage d'une unité (*off-by-one*) : `i < 10` fait 10 tours (0 à 9), `i <= 10` en fait 11. Décidez une fois pour toutes si votre borne est incluse, et nommez vos variables en conséquence."
        },
        {
          type: "list",
          items: [
            "`for (let i = 0; i < 10; i++)` réunit départ, condition d'arrêt et pas sur une seule ligne : dix tours, `i` valant `0`, `1`, `2` jusqu'à `9`, et la console affiche ces dix valeurs.",
            "`for (let numero = 1; numero <= 5; numero++)` affiche `Étape 1` puis `Étape 5` : la borne est explicite et `<=` inclut `5`, d'où cinq tours.",
            "`for (let i = 3; i > 0; i--)` décrémente : l'affichage descend de `3` à `1`.",
            "Dans les trois cas, la condition est testée avant chaque tour et le pas s'exécute après le corps de la boucle."
          ]
        },
        { type: "h", level: 2, text: "`while` et `do...while`" },
        {
          type: "p",
          text: "`while (condition)` répète **tant que** la condition est vraie : on l'utilise quand le nombre de tours est inconnu à l'avance (attendre une saisie valide, vider une file). `do...while` exécute le corps **au moins une fois** avant de tester : c'est la seule différence, et elle compte pour les menus « au moins un essai ». Dans les deux cas, la condition doit finir par devenir fausse : chaque tour doit modifier quelque chose, sinon la page se fige."
        },
        {
          type: "list",
          items: [
            "`let essais = 0;` et `let trouve = false;` initialisent les deux variables qui contrôlent la boucle.",
            "`while (!trouve && essais < 3)` ne tourne que tant que rien n'est trouvé et que le compteur reste sous `3`.",
            "Le corps commence par `essais += 1;`, ce qui garantit une progression à chaque tour et écarte la boucle infinie.",
            "`if (essais === 2) trouve = true;` arrête la répétition au deuxième essai, et `console.log(essais);` affiche `2`.",
            "Le bloc `do { essais -= 1; } while (essais > 0);` teste après le corps : la décrémentation s'exécute au moins une fois, même si la condition est fausse dès le départ."
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "La boucle infinie : comment la repérer",
          text: "Si la page se bloque, c'est presque toujours une boucle dont la condition ne change jamais : oubli de `i++`, incrément placé dans un `if` jamais pris, ou comparaison stricte contre une valeur qui saute (`i === 10` alors que `i` passe de 9 à 11). Réflexe : vérifiez que **chaque variable de la condition est modifiée** dans le corps, et que le pas va dans la bonne direction."
        },
        { type: "h", level: 2, text: "Parcourir une collection : `for...of` et `for...in`" },
        {
          type: "list",
          items: [
            "`for...of` rend les valeurs, `for...in` rend les clés, et `continue` ou `break` coupent le parcours en cours.",
            "`const langages = [\"HTML\", \"CSS\", \"JS\"];` prépare un tableau de trois chaînes.",
            "`for (const langage of langages)` parcourt les valeurs : la console affiche `HTML`, puis `CSS`, puis `JS`.",
            "`langages.forEach((langage, index) => ...)` appelle une fonction pour chaque élément en fournissant l'indice : le texte `index + \" : \" + langage` produit `0 : HTML`, `1 : CSS`, `2 : JS`.",
            "`const fiche = { nom: \"Ada\", role: \"formatrice\" };` avec `for (const cle in fiche)` parcourt les clés `nom` et `role`, sous forme de chaînes.",
            "Dans cette boucle, `fiche[cle]` donne la valeur correspondante : la console affiche `nom = Ada` puis `role = formatrice`.",
            "Dans la dernière boucle, `if (valeur === \"CSS\") continue;` passe à l'itération suivante : `CSS` n'est jamais affiché.",
            "`if (valeur === \"JS\") break;` sort de la boucle avant l'affichage : seul `HTML` s'affiche."
          ]
        },
        {
          type: "callout",
          tone: "danger",
          title: "`for...in` ne parcourt pas un tableau",
          text: "`for...in` énumère les **clés**, sous forme de chaînes : sur un tableau, vous obtenez `\"0\"`, `\"1\"`, `\"2\"` — et aussi d'éventuelles propriétés ajoutées. Pour un tableau, utilisez `for...of`, `forEach`, ou une boucle `for` si vous avez besoin de l'indice. `for...in` se réserve aux objets. Réservez aussi `break`/`continue` aux boucles classiques : dans un `forEach`, ils sont interdits."
        },
        { type: "h", level: 2, text: "Trois patrons à connaître par cœur" },
        {
          type: "p",
          text: "Accumuler, compter, chercher : trois squelettes de boucle couvrent presque tous les cas, et `break` évite de continuer pour rien."
        },
        {
          type: "list",
          items: [
            "`const notes = [12, 8, 17, 5];` fournit les quatre notes de départ.",
            "Accumulation : `let somme = 0;` puis `for (const note of notes) somme += note;` additionne chaque note, et `somme` vaut `42`.",
            "`const moyenne = somme / notes.length;` divise par le nombre de notes : avec `4` notes, `moyenne` vaut `10.5`.",
            "Compteur : `let reussites = 0;` puis, pour chaque note, `if (note >= 10) reussites += 1;` n'incrémente que sur les notes suffisantes, et `reussites` vaut `2`.",
            "Recherche : `let premiereFaible = null;` puis, pour chaque note, `if (note < 10) { premiereFaible = note; break; }` retient la première note insuffisante et quitte la boucle.",
            "La recherche s'arrête donc dès le premier cas trouvé, et `premiereFaible` vaut `8`.",
            "`console.log(somme, moyenne, reussites, premiereFaible);` affiche `42 10.5 2 8`."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Ces patrons reviennent dans presque tous les exercices du module.",
          items: [
            "Écrire une boucle `for` comptant de 1 à 10 inclus sans hésiter",
            "Expliquer la différence entre `for...of` et `for...in`",
            "Sortir d'une boucle avec `break` et sauter un tour avec `continue`",
            "Construire une somme, un compteur et une recherche du premier élément"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-06",
          title: "La somme de 1 à 10",
          difficulty: 1,
          goal: "Accumuler le résultat d'une boucle dans une variable.",
          instructions: [
            "Déclarez `let somme = 0;` avant la boucle.",
            "Écrivez une boucle `for` qui parcourt les nombres de 1 à 10 **inclus**.",
            "Ajoutez chaque nombre à `somme` à chaque tour (`somme += i`).",
            "Affichez dans `#sortie` : `La somme de 1 à 10 vaut 55`."
          ],
          hint: "Si vous obtenez 45, votre boucle s'arrête à 9 : la borne est exclue ; si vous obtenez 66, elle va jusqu'à 11.",
          starter: {
            html: `<h2>Somme</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1.1rem; font-weight: 600; }`,
            js: `let somme = 0;

// écrivez la boucle et l'accumulation
// puis affichez le résultat dans #sortie`
          },
          solution: {
            html: `<h2>Somme</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1.1rem; font-weight: 600; }`,
            js: `let somme = 0;

for (let i = 1; i <= 10; i++) {
  somme += i;
}

const sortie = document.querySelector("#sortie");
sortie.textContent = \`La somme de 1 à 10 vaut \${somme}\`;`
          },
          checks: [
            "getText('#sortie').includes('55')",
            "getText('#sortie').toLowerCase().includes('somme')"
          ],
          checklist: [
            "La boucle va bien de 1 à 10 inclus",
            "L'accumulation se fait avec `+=`",
            "Le résultat affiché est 55"
          ]
        },
        {
          id: "js-ex-07",
          title: "Compter les nombres pairs",
          difficulty: 2,
          goal: "Utiliser `continue` pour ignorer une partie des itérations et compter le reste.",
          instructions: [
            "Parcourez les nombres de 1 à 20 inclus avec une boucle `for`.",
            "Si le nombre est impair, passez immédiatement au suivant avec `continue`.",
            "Sinon, incrémentez un compteur `pairs`.",
            "Affichez dans `#sortie` : `Entre 1 et 20, il y a 10 nombres pairs.`"
          ],
          hint: "L'opérateur modulo `%` donne le reste : un nombre est impair quand `i % 2 !== 0`.",
          starter: {
            html: `<h2>Pairs</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1.05rem; }`,
            js: `let pairs = 0;

// bouclez de 1 à 20
// ignorez les impairs avec continue
// comptez les pairs

const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>Pairs</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1.05rem; }`,
            js: `let pairs = 0;

for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) {
    continue;
  }
  pairs += 1;
}

const sortie = document.querySelector("#sortie");
sortie.textContent = \`Entre 1 et 20, il y a \${pairs} nombres pairs.\`;`
          },
          checks: [
            "getText('#sortie').includes('10')",
            "getText('#sortie').toLowerCase().includes('pairs')"
          ],
          checklist: [
            "`continue` est utilisé pour sauter les impairs",
            "Le compteur vaut 10",
            "La phrase est affichée au chargement"
          ]
        }
      ]
    },
    {
      id: "js-04",
      title: "Fonctions : découper, réutiliser, composer",
      minutes: 55,
      summary: "Écrire des fonctions courtes, les paramétrer, comprendre la portée et les passer en argument.",
      objectives: [
        "Choisir entre déclaration, expression et fonction fléchée en connaissance de cause",
        "Utiliser les paramètres par défaut et le paramètre du reste",
        "Expliquer la portée, le hoisting et le rôle de `return`",
        "Écrire une fonction pure et une fonction d'ordre supérieur"
      ],
      content: [
        {
          type: "lead",
          text: "Une fonction est une **unité de sens** : elle porte un nom, reçoit des données, renvoie un résultat. Découper un programme en fonctions nommées transforme un script illisible en texte qu'on peut relire six mois plus tard."
        },
        { type: "h", level: 2, text: "Trois syntaxes, trois usages" },
        {
          type: "p",
          text: "La **déclaration** (`function nom() {}`) est hissée : elle est utilisable avant sa ligne d'écriture, ce qui permet d'organiser un fichier avec les fonctions en bas. L'**expression** (`const nom = function () {}`) n'est pas hissée : elle existe à partir de son affectation. La **flèche** (`const nom = () => {}`) est plus courte et capture le `this` de son contexte au lieu d'en créer un nouveau — d'où son usage massif dans les callbacks. Deux nuances à retenir : une flèche sans accolades renvoie implicitement son expression, et une flèche ne peut pas servir de constructeur avec `new`."
        },
        {
          type: "p",
          text: "Trois écritures du même geste se côtoient : la déclaration, l'expression et la flèche."
        },
        {
          type: "list",
          items: [
            "`console.log(ajouter(2, 3));` affiche `5` alors que `function ajouter(a, b) { return a + b; }` est défini plus bas : la déclaration est hissée, donc utilisable avant sa ligne.",
            "`const soustraire = function (a, b) { return a - b; };` est une expression : elle n'existe qu'à partir de cette ligne, un appel plus haut lèverait une erreur.",
            "`const doubler = (n) => { return n * 2; };` est une flèche avec accolades : le `return` doit être écrit explicitement.",
            "`const tripler = (n) => n * 3;` est une flèche sans accolades : la valeur de l'expression est renvoyée implicitement.",
            "`[1, 2, 3].map((n) => n * 10);` renvoie `[10, 20, 30]` : la flèche courte se lit bien comme callback."
          ]
        },
        {
          type: "table",
          head: ["Forme", "Hissée ?", "`this`", "Usage typique"],
          rows: [
            ["déclaration", "oui", "dynamique", "fonction principale du fichier"],
            ["expression", "non", "dynamique", "affectation conditionnelle, export"],
            ["flèche", "non", "hérité du contexte", "callbacks, méthodes de tableau"]
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "`return` : la sortie, pas l'affichage",
          text: "Une fonction sans `return` renvoie `undefined`. `console.log` n'est **pas** un retour : afficher une valeur ne la transmet pas à l'appelant. Autre piège : un `return` placé sur la ligne suivante d'un `return` vide (`return` puis saut de ligne puis valeur) renvoie `undefined`, car le point-virgule est inséré automatiquement. Écrivez toujours `return expression;` sur la même ligne."
        },
        { type: "h", level: 2, text: "Paramètres : valeurs par défaut et reste" },
        {
          type: "p",
          text: "Un paramètre peut avoir une valeur par défaut, utilisée seulement si l'argument est `undefined` (pas si c'est `0` ou `\"\"`). Le paramètre du reste `...autres` regroupe les arguments supplémentaires dans un vrai tableau. Attention : les objets et tableaux passés en argument sont transmis **par référence** — modifier le paramètre modifie l'original. Les primitifs, eux, sont copiés."
        },
        {
          type: "p",
          text: "Valeurs par défaut, paramètre du reste et objet partagé : trois façons dont l'appelant subit ce qu'il ne voit pas."
        },
        {
          type: "list",
          items: [
            "`function formater(prix, devise = \"EUR\", decimales = 2)` applique la devise et le nombre de décimales seulement quand l'argument vaut `undefined`.",
            "Son corps `prix.toFixed(decimales) + \" \" + devise` arrondit puis colle l'unité : `formater(12.5)` renvoie `\"12.50 EUR\"`.",
            "`formater(12.5, \"USD\")` renvoie `\"12.50 USD\"` : le deuxième argument remplace le défaut, le troisième reprend `2`.",
            "`function total(...montants)` regroupe tous les arguments dans un vrai tableau, et `montants.reduce((acc, m) => acc + m, 0)` l'additionne : `total(10, 20, 30)` renvoie `60`.",
            "`function vider(panier) { panier.length = 0; }` modifie l'objet de l'appelant, car un tableau est passé par référence : la liste reçue est réellement vidée chez l'appelant."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Une fonction = un verbe",
          text: "Nommez avec un verbe à l'infinitif (`calculerTotal`, `afficherLigne`) et limitez-vous à une responsabilité. Si le nom contient « et », découpez. Une fonction de plus de 20 lignes cache presque toujours deux fonctions : les variables intermédiaires sont le signe qu'il faut extraire."
        },
        { type: "h", level: 2, text: "Portée, closures et fonctions pures" },
        {
          type: "p",
          text: "Une variable déclarée dans une fonction n'existe que là : c'est la **portée lexicale**. Une fonction interne garde l'accès aux variables de sa fonction parente même après le retour de celle-ci — c'est une **closure**. C'est la base des compteurs privés et des fabriques de fonctions. Une fonction **pure** ne dépend que de ses arguments et ne modifie rien à l'extérieur : elle est prévisible, testable et sans effet de bord. Les fonctions qui touchent au DOM ne sont pas pures, gardez-les séparées du calcul."
        },
        {
          type: "p",
          text: "La closure garde son état en privé, la fonction d'ordre supérieur compose, et la fonction pure n'a aucun effet de bord."
        },
        {
          type: "list",
          items: [
            "`function creerCompteur(depart = 0)` déclare `let valeur = depart;` à l'intérieur et renvoie `() => ++valeur;` : la variable est capturée et reste invisible de l'extérieur.",
            "`const suivant = creerCompteur(10);` puis un premier `suivant();` renvoie `11`, un second renvoie `12` : la closure se souvient de son état entre deux appels.",
            "`function appliquerDeuxFois(valeur, operation)` renvoie `operation(operation(valeur))` : recevoir une fonction en argument en fait une fonction d'ordre supérieur.",
            "`appliquerDeuxFois(3, (n) => n + 5);` renvoie `13` : l'ajout de `5` est appliqué deux fois à `3`.",
            "`const calculerTva = (montant, taux = 0.18) => Math.round(montant * taux);` est pure : elle ne lit que ses arguments, ne modifie rien au-dehors et renvoie toujours le même résultat pour les mêmes entrées."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Ces réflexes font la différence entre un script et un programme.",
          items: [
            "Écrire une flèche avec et sans `return` implicite",
            "Donner une valeur par défaut à un paramètre",
            "Expliquer pourquoi une fonction sans `return` renvoie `undefined`",
            "Reconnaître une fonction pure et une fonction à effet de bord"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-08",
          title: "Une fonction avec valeur par défaut",
          difficulty: 1,
          goal: "Déclarer une fonction, utiliser un paramètre par défaut et récupérer son retour.",
          instructions: [
            "Déclarez une fonction `saluer` qui reçoit un paramètre `nom` dont la valeur par défaut est `invité`.",
            "La fonction doit **retourner** (et non afficher) la chaîne `Bonjour <nom> !`.",
            "Appelez-la deux fois : une fois avec `Ada`, une fois sans argument.",
            "Affichez les deux résultats dans `#sortie`, séparés par une espace."
          ],
          hint: "La valeur par défaut s'écrit dans la liste des paramètres : `function saluer(nom = \"invité\")`. Une fonction qui n'utilise pas `return` renvoie `undefined`.",
          starter: {
            html: `<h2>Saluer</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1.05rem; }`,
            js: `// déclarez la fonction ici

const sortie = document.querySelector("#sortie");
// affichez saluer("Ada") puis saluer()`
          },
          solution: {
            html: `<h2>Saluer</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1.05rem; }`,
            js: `function saluer(nom = "invité") {
  return \`Bonjour \${nom} !\`;
}

const sortie = document.querySelector("#sortie");
sortie.textContent = saluer("Ada") + " " + saluer();`
          },
          checks: [
            "getText('#sortie').includes('Ada')",
            "getText('#sortie').toLowerCase().includes('invité')",
            "getText('#sortie').split('Bonjour').length - 1 === 2"
          ],
          checklist: [
            "La fonction utilise `return`",
            "Le paramètre a une valeur par défaut",
            "Les deux appels sont affichés"
          ]
        },
        {
          id: "js-ex-09",
          title: "Fabrique de multiplicateurs",
          difficulty: 2,
          goal: "Écrire une fonction d'ordre supérieur qui renvoie une fonction (closure).",
          instructions: [
            "Écrivez une fonction `creerMultiplicateur` qui reçoit un `facteur`.",
            "Elle doit **renvoyer une fonction** qui prend une valeur et la multiplie par le facteur.",
            "Créez `doubler` avec le facteur 2 et `tripler` avec le facteur 3.",
            "Affichez dans `#sortie` : `21 x2 = 42 | 7 x3 = 21`."
          ],
          hint: "La fonction renvoyée garde l'accès à `facteur` : c'est une closure. Une flèche suffit : `return (valeur) => valeur * facteur;`.",
          starter: {
            html: `<h2>Multiplicateurs</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; }`,
            js: `function creerMultiplicateur(facteur) {
  // renvoyez ici une fonction qui multiplie par facteur
}

const doubler = creerMultiplicateur(2);
const tripler = creerMultiplicateur(3);

const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>Multiplicateurs</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; }`,
            js: `function creerMultiplicateur(facteur) {
  return (valeur) => valeur * facteur;
}

const doubler = creerMultiplicateur(2);
const tripler = creerMultiplicateur(3);

const sortie = document.querySelector("#sortie");
sortie.textContent = \`21 x2 = \${doubler(21)} | 7 x3 = \${tripler(7)}\`;`
          },
          checks: [
            "getText('#sortie').includes('42')",
            "getText('#sortie').includes('21')"
          ],
          checklist: [
            "`creerMultiplicateur` renvoie une fonction",
            "Chaque multiplicateur garde son propre facteur",
            "Les deux résultats sont affichés"
          ]
        }
      ]
    },
    {
      id: "js-05",
      title: "Tableaux et méthodes : transformer des listes",
      minutes: 60,
      summary: "Manipuler des listes de données avec les bonnes méthodes, sans muter ce qu'il ne faut pas.",
      objectives: [
        "Ajouter et retirer des éléments avec `push`, `pop`, `shift`, `splice`, `slice`",
        "Transformer et filtrer avec `map`, `filter`, `reduce`",
        "Rechercher et tester avec `find`, `some`, `every`, `includes`",
        "Distinguer copie et référence, et chaîner les opérations lisiblement"
      ],
      content: [
        {
          type: "lead",
          text: "Un tableau est la structure de données la plus fréquente du Web : produits, messages, résultats de recherche. Savoir quelle méthode **modifie** la liste et laquelle renvoie une nouvelle liste est la compétence qui évite la majorité des bugs de données."
        },
        { type: "h", level: 2, text: "Ajouter et retirer : les méthodes mutantes" },
        {
          type: "p",
          text: "`push` ajoute en fin, `pop` retire en fin, `shift` retire au début, `unshift` ajoute au début : ces quatre-là **modifient** le tableau d'origine. `splice(début, nombre)` retire (et éventuellement insère) au milieu ; `slice(début, fin)` **copie** une portion sans rien casser. Retenez la règle : `splice` mutile, `slice` découpe proprement. Et n'oubliez pas que `length` est une propriété vivante : `tableau.length = 0` vide le tableau sur place."
        },
        {
          type: "list",
          items: [
            "Quatre méthodes mutent le tableau sur place alors que `slice` copie : `const file = [\"a\", \"b\", \"c\"];` démarre avec trois éléments.",
            "`file.push(\"d\");` ajoute en fin et renvoie la nouvelle longueur : le tableau vaut `[\"a\",\"b\",\"c\",\"d\"]`.",
            "`file.pop();` retire le dernier élément et le renvoie : la valeur de retour est `\"d\"` et le tableau revient à `[\"a\",\"b\",\"c\"]`.",
            "`file.unshift(\"z\");` ajoute en début : `[\"z\",\"a\",\"b\",\"c\"]`.",
            "`file.shift();` retire le premier et le renvoie : la valeur de retour est `\"z\"` et le tableau redevient `[\"a\",\"b\",\"c\"]`.",
            "`file.splice(1, 1);` retire un élément à l'indice `1` : le tableau devient `[\"a\",\"c\"]`.",
            "`file.splice(1, 0, \"b\");` insère `\"b\"` à l'indice `1` sans rien supprimer : retour à `[\"a\",\"b\",\"c\"]`.",
            "`const copie = file.slice(0, 2);` renvoie `[\"a\",\"b\"]` alors que l'original reste intact : `slice` ne mute rien.",
            "`file.indexOf(\"c\");` renvoie `2`, et `file.includes(\"b\");` renvoie `true` : deux tests en lecture seule."
          ]
        },
        {
          type: "callout",
          tone: "danger",
          title: "Copie ou référence ?",
          text: "`const b = a` ne copie rien : les deux noms pointent vers **le même** tableau. `b.push(1)` modifie donc aussi `a`, ce qui rend le débogage très déroutant. Pour une copie superficielle, utilisez `[...a]` ou `a.slice()`. Attention : cette copie ne clone pas les objets contenus — un objet modifié dans la copie reste modifié dans l'original (*copie superficielle*)."
        },
        { type: "h", level: 2, text: "Transformer et filtrer : `map`, `filter`, `reduce`" },
        {
          type: "p",
          text: "Ces trois méthodes ne mutent rien et renvoient une **nouvelle** valeur : ce sont les piliers du code fonctionnel en JavaScript. `map` transforme chaque élément (même longueur), `filter` garde ceux dont le callback renvoie `true` (longueur variable), `reduce` parcourt tout en accumulant une seule valeur — somme, objet, tableau : tout est possible. La fonction que vous leur passez reçoit `(element, index, tableau)`."
        },
        {
          type: "list",
          items: [
            "`map` transforme, `filter` retire, `reduce` condense : `const paniers = [...]` décrit trois lignes, un clavier à `40`, une souris à `25` et un écran à `180`.",
            "`paniers.map((p) => p.prix);` renvoie `[40, 25, 180]` : un tableau de même longueur, avec la valeur transformée.",
            "`paniers.filter((p) => p.prix >= 40);` renvoie `2` éléments, le clavier et l'écran : le prédicat décide de garder ou non.",
            "`paniers.reduce((acc, p) => acc + p.prix, 0);` renvoie `245`, le total, en partant de l'accumulateur `0`.",
            "`paniers.map((p) => p.article).join(\", \");` produit `\"Clavier, Souris, Écran\"` : `map` extrait les noms, `join` recolle le texte.",
            "`paniers.map((p, i) => i + 1 + \". \" + p.article);` utilise l'indice fourni en deuxième argument et produit `1. Clavier`, `2. Souris`, `3. Écran`."
          ]
        },
        { type: "h", level: 2, text: "Chercher, tester, trier" },
        {
          type: "p",
          text: "`find` renvoie l'élément, `some` et `every` un booléen, et trier une copie garde l'ordre d'origine."
        },
        {
          type: "list",
          items: [
            "`const noms = [\"Clavier\", \"Souris\", \"Écran\"];` sert de base à tous les tests.",
            "`noms.find((n) => n.startsWith(\"S\"));` renvoie `\"Souris\"`, le premier élément qui répond au prédicat.",
            "`noms.findIndex((n) => n.startsWith(\"S\"));` renvoie `1`, son indice, ou `-1` si aucun élément ne correspond.",
            "`noms.some((n) => n.length > 6);` renvoie `true` : au moins un nom dépasse six caractères.",
            "`noms.every((n) => n.length > 3);` renvoie `true` : tous les noms dépassent trois caractères.",
            "`noms.includes(\"Écran\");` renvoie `true` : une comparaison d'égalité stricte, sans prédicat.",
            "`const copie = [...noms].sort();` trie une copie dans l'ordre alphabétique et laisse `noms` intact.",
            "`noms.sort((a, b) => a.localeCompare(b));` trie le tableau d'origine sur place, selon les règles de la langue.",
            "`[...noms].sort((a, b) => a.length - b.length);` classe une copie par longueur croissante, en soustrayant les deux longueurs."
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "`sort` mord et compare des chaînes",
          text: "`sort()` trie **en place** et renvoie le même tableau : copiez avant (`[...liste].sort()`) si l'ordre d'origine compte. Sans fonction de comparaison, il convertit tout en chaînes — `[10, 9, 100].sort()` donne `[10, 100, 9]`, car '100' précède '9' alphabétiquement. Fournissez toujours `(a, b) => a - b` pour des nombres. Même prudence avec `reverse`, qui mute aussi."
        },
        { type: "h", level: 2, text: "Chaîner : des pipelines lisibles" },
        {
          type: "p",
          text: "Un pipeline s'écrit une étape par ligne : chaque ligne reçoit le résultat de la précédente et se lit dans l'ordre."
        },
        {
          type: "list",
          items: [
            "`const resultat = produits` ouvre le chaînage sur le tableau de départ.",
            "`.filter((p) => p.stock > 0)` ne garde que les produits disponibles.",
            "`.map((p) => ({ ...p, prixTTC: p.prix * 1.18 }))` enrichit chaque produit d'une clé `prixTTC` calculée, sans modifier l'original.",
            "`.sort((a, b) => a.prixTTC - b.prixTTC)` classe du moins cher au plus cher.",
            "`.slice(0, 3)` ne conserve que les trois premiers : `resultat` contient au plus trois produits.",
            "`\"HTML, CSS, JS\".split(\", \");` découpe la chaîne et renvoie `[\"HTML\",\"CSS\",\"JS\"]`.",
            "`[\"HTML\", \"CSS\", \"JS\"].join(\" - \");` fait l'inverse et renvoie `\"HTML - CSS - JS\"`."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Ces distinctions sont demandées dans presque tous les entretiens.",
          items: [
            "Dire lesquelles de `push`, `slice`, `splice`, `sort`, `map` mutent le tableau",
            "Copier un tableau avant un tri destructeur",
            "Choisir entre `find` (la valeur) et `filter` (toutes les valeurs)",
            "Écrire `reduce` pour une somme et pour compter des occurrences"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-10",
          title: "Ajouter et compter",
          difficulty: 1,
          goal: "Ajouter un élément à un tableau et présenter la liste avec sa longueur.",
          instructions: [
            "Le tableau `outils` contient `HTML` et `CSS`.",
            "Ajoutez `JavaScript` en fin de tableau avec `push`.",
            "Affichez dans `#sortie` : `3 outils : HTML, CSS, JavaScript` (longueur, puis éléments séparés par `, `).",
            "Utilisez la propriété `length` et la méthode `join`."
          ],
          hint: "`outils.join(\", \")` produit le texte séparé par des virgules, et `outils.length` donne le nombre d'éléments.",
          starter: {
            html: `<h2>Outils</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; }`,
            js: `const outils = ["HTML", "CSS"];

// ajoutez "JavaScript"
// affichez la longueur puis la liste séparée par des virgules

const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>Outils</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; }`,
            js: `const outils = ["HTML", "CSS"];

outils.push("JavaScript");

const sortie = document.querySelector("#sortie");
sortie.textContent = \`\${outils.length} outils : \${outils.join(", ")}\`;`
          },
          checks: [
            "getText('#sortie').startsWith('3')",
            "getText('#sortie').includes('JavaScript')",
            "getText('#sortie').includes('CSS')"
          ],
          checklist: [
            "`push` est utilisé",
            "La longueur affichée est celle du tableau, pas un nombre écrit à la main",
            "Les trois outils apparaissent"
          ]
        },
        {
          id: "js-ex-11",
          title: "Filtrer puis appliquer une remise",
          difficulty: 2,
          goal: "Enchaîner `filter` et `map` sans écrire de boucle.",
          instructions: [
            "Le tableau `prix` contient 12, 45, 7, 30, 19.",
            "Gardez uniquement les prix supérieurs ou égaux à 10 avec `filter`.",
            "Sur le résultat, appliquez une remise de 10 % et arrondissez à l'entier avec `Math.round`, via `map`.",
            "Affichez dans `#sortie` : `À payer : 11 €, 41 €, 27 €, 17 €` (valeurs séparées par ` €, ` et l'unité finale)."
          ],
          hint: "Une remise de 10 % revient à multiplier par `0.9`. Le chaînage s'écrit `prix.filter(...).map(...)` : le résultat du premier devient le tableau du second.",
          starter: {
            html: `<h2>Remise</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; }`,
            js: `const prix = [12, 45, 7, 30, 19];

// filtrez les prix >= 10
// appliquez 10 % de remise, arrondie

const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>Remise</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; }`,
            js: `const prix = [12, 45, 7, 30, 19];

const eligibles = prix.filter((p) => p >= 10);
const remises = eligibles.map((p) => Math.round(p * 0.9));

const sortie = document.querySelector("#sortie");
sortie.textContent = "À payer : " + remises.join(" €, ") + " €";`
          },
          checks: [
            "getText('#sortie').includes('11')",
            "getText('#sortie').includes('41')",
            "!/45/.test(getText('#sortie'))"
          ],
          checklist: [
            "`filter` et `map` sont chaînés",
            "Le prix 7 est exclu",
            "Les valeurs sont arrondies, pas décimales"
          ]
        },
        {
          id: "js-ex-12",
          title: "Total et tri sans muter",
          difficulty: 3,
          goal: "Calculer un total avec `reduce` et trier une copie du tableau par prix croissant.",
          instructions: [
            "Le tableau `paniers` contient trois objets avec `article` et `prix`.",
            "Calculez le total avec `reduce` en partant de 0.",
            "Créez la liste des articles triés par prix croissant, **sans modifier** l'ordre de `paniers`.",
            "Affichez dans `#sortie` : `Total : 245 € | Ordre : Souris > Clavier > Écran`."
          ],
          hint: "`[...paniers].sort((a, b) => a.prix - b.prix)` trie une copie. Enchaînez ensuite `map` pour ne garder que les titres, puis `join(\" > \")`.",
          starter: {
            html: `<h2>Panier</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 600; }`,
            js: `const paniers = [
  { article: "Clavier", prix: 40 },
  { article: "Souris", prix: 25 },
  { article: "Écran", prix: 180 }
];

// total avec reduce
// liste triée par prix, sans muter paniers

const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>Panier</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 600; }`,
            js: `const paniers = [
  { article: "Clavier", prix: 40 },
  { article: "Souris", prix: 25 },
  { article: "Écran", prix: 180 }
];

const total = paniers.reduce((acc, p) => acc + p.prix, 0);
const ordre = [...paniers]
  .sort((a, b) => a.prix - b.prix)
  .map((p) => p.article)
  .join(" > ");

const sortie = document.querySelector("#sortie");
sortie.textContent = \`Total : \${total} € | Ordre : \${ordre}\`;`
          },
          checks: [
            "getText('#sortie').includes('245')",
            "getText('#sortie').includes('Souris > Clavier')",
            "getText('#sortie').includes('Écran')"
          ],
          checklist: [
            "Le total est calculé avec `reduce`",
            "Les articles sont triés par prix croissant",
            "Le tableau d'origine n'est pas réordonné"
          ]
        }
      ]
    },
    {
      id: "js-06",
      title: "Objets et données modernes",
      minutes: 55,
      summary: "Structurer des données en objets, les décomposer avec le destructuring et les sérialiser en JSON.",
      objectives: [
        "Créer un objet littéral avec des méthodes et comprendre `this`",
        "Extraire des valeurs avec le destructuring d'objet et de tableau",
        "Copier et fusionner avec le spread, regrouper avec le reste",
        "Parcourir et sérialiser avec `Object.entries` et `JSON`"
      ],
      content: [
        {
          type: "lead",
          text: "Un tableau ordonne des valeurs ; un objet les **nomme**. Décrire une donnée par des clés lisibles (`prix`, `stock`, `client`) rend le code auto-documenté — et c'est exactement la forme que renvoient les API."
        },
        { type: "h", level: 2, text: "Objet littéral : clés, méthodes et `this`" },
        {
          type: "p",
          text: "Un objet associe des clés (chaînes ou symboles) à des valeurs, qui peuvent être des fonctions : on parle alors de **méthode**. On accède par point quand la clé est un identifiant valide, par crochets quand elle est dynamique (`objet[cle]`). Dans une méthode appelée normalement, `this` désigne l'objet sur lequel on appelle. Détachée de son objet (`const f = objet.methode`), la même fonction perd son `this` — d'où l'usage fréquent des flèches, qui capturent le `this` du contexte extérieur et ignorent l'appelant."
        },
        {
          type: "p",
          text: "Un objet littéral se construit d'abord en données, ensuite en méthodes ; dans une méthode, `this` désigne l'objet qui reçoit l'appel."
        },
        {
          type: "list",
          items: [
            "`const produit = { ... }` associe trois clés à leurs valeurs : `nom` vaut `\"Casque audio\"`, `prix` vaut `79` et `stock` vaut `12`.",
            "La méthode `resume()` renvoie `this.nom + \" - \" + this.prix + \" EUR\"`, où `this` est l'objet courant.",
            "`produit.nom;` vaut `\"Casque audio\"`, et `produit[\"prix\"];` vaut `79` — la forme entre crochets sert quand la clé est dynamique.",
            "`produit.resume();` renvoie `\"Casque audio - 79 EUR\"`.",
            "`produit.promo = true;` ajoute une clé à tout moment : l'objet gagne une propriété `promo` de valeur `true`.",
            "`delete produit.stock;` retire la clé `stock`, qui n'existe plus ensuite.",
            "`\"prix\" in produit;` renvoie `true` : l'opérateur `in` teste l'existence de la clé, pas la valeur."
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "Le `this` perdu",
          text: "`const r = produit.resume; r();` lève une erreur (`this` vaut `undefined` en mode strict) car l'appel n'a plus de destinataire. Utilisez `produit.resume()`, `produit.resume.bind(produit)` ou transformez la méthode en flèche si elle n'a pas besoin de `this`. Autre piège : une méthode fléchée **ne voit pas** l'objet, car `this` est fixé à la déclaration."
        },
        { type: "h", level: 2, text: "Destructuring : extraire sans répéter" },
        {
          type: "p",
          text: "Le destructuring est du sucre syntaxique qui nomme directement les morceaux d'une structure. Il évite la cascade de `const prix = p.prix; const stock = p.stock;`. On peut renommer (`prix: tarif`), donner une valeur par défaut (`stock = 0`), imbriquer, ou récupérer le premier élément d'un tableau. Très utile dans les paramètres de fonction : `function afficher({ nom, prix })` documente et simplifie l'appel."
        },
        {
          type: "list",
          items: [
            "Extraire sans répéter : `const { nom, prix } = produit;` crée deux variables qui reprennent les clés du même nom.",
            "`const { prix: tarif, stock = 0 } = produit;` renomme `prix` en `tarif` et fournit `0` comme valeur par défaut si `stock` manque.",
            "`const { adresse: { ville } = {} } = client;` descend d'un niveau, et le `= {}` évite l'erreur quand `adresse` est absente.",
            "`const [premier, second] = [\"a\", \"b\", \"c\"];` extrait par position : `premier` vaut `\"a\"` et `second` vaut `\"b\"`.",
            "`const [, deuxieme] = [\"a\", \"b\"];` saute le premier emplacement grâce à la virgule initiale : `deuxieme` vaut `\"b\"`.",
            "`function afficher({ nom, prix }, devise = \"EUR\")` déstructure directement dans les paramètres et ajoute un défaut : `afficher(produit)` renvoie `\"Casque audio : 79 EUR\"`."
          ]
        },
        { type: "h", level: 2, text: "Spread et rest : deux fois trois points" },
        {
          type: "p",
          text: "Les trois points ont deux rôles : étaler pour copier, regrouper pour le reste."
        },
        {
          type: "list",
          items: [
            "`const base = { nom: \"Casque\", prix: 79 };` sert d'objet de référence.",
            "`const avecStock = { ...base, stock: 12 };` crée une nouvelle copie complétée d'une clé : `stock` vaut `12` et `base` reste inchangé.",
            "`const maj = { ...base, prix: 69 };` montre que la clé la plus à droite gagne : le `prix` de la copie vaut `69`.",
            "`const fusion = { ...base, ...options };` suit le même ordre de priorité : les clés de `options` écrasent celles de `base`.",
            "`const nombres = [3, 1, 2];` puis `Math.max(...nombres);` renvoie `3` : le spread étale le tableau en arguments séparés.",
            "`function total(...montants)` fait l'inverse et regroupe les arguments dans un tableau, que `reduce` additionne : `total(10, 20, 30)` renvoie `60`.",
            "`const { prix, ...reste } = base;` applique le rest à un objet : `prix` est extrait et `reste` contient toutes les autres clés."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Copie superficielle, encore",
          text: "`{ ...objet }` copie un niveau. Si une valeur est elle-même un objet ou un tableau, la copie garde la même **référence** : modifier `copie.adresse.ville` modifie `objet.adresse.ville`. Pour un vrai clone de données JSON, `JSON.parse(JSON.stringify(objet))` fonctionne (il perd fonctions, `undefined` et dates précises) ; `structuredClone(objet)` est la solution moderne."
        },
        { type: "h", level: 2, text: "Parcourir et sérialiser" },
        {
          type: "p",
          text: "Lister, parcourir, sérialiser : `Object.entries` alimente directement une boucle, et `JSON` fait l'aller-retour complet."
        },
        {
          type: "list",
          items: [
            "`const fiche = { nom: \"Ada\", role: \"formatrice\", actif: true };` sert d'exemple.",
            "`Object.keys(fiche);` renvoie `[\"nom\", \"role\", \"actif\"]`, les clés dans leur ordre d'insertion.",
            "`Object.values(fiche);` renvoie `[\"Ada\", \"formatrice\", true]`, les valeurs correspondantes.",
            "`Object.entries(fiche);` renvoie les paires, sous la forme `[[\"nom\",\"Ada\"], [\"role\",\"formatrice\"], [\"actif\",true]]`.",
            "`for (const [cle, valeur] of Object.entries(fiche))` déstructure chaque paire et affiche `nom = Ada`, puis `role = formatrice`, puis `actif = true`.",
            "`const texte = JSON.stringify(fiche);` produit une chaîne JSON, que `JSON.parse(texte);` relit en un objet identique.",
            "`JSON.stringify(fiche, null, 2);` renvoie la même chaîne avec une indentation de deux espaces, utile pendant le débogage."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Ces gestes sont le pain quotidien des applications à données.",
          items: [
            "Écrire une méthode qui utilise `this` et l'appeler correctement",
            "Destructurer un objet avec renommage et valeur par défaut",
            "Copier puis compléter un objet avec le spread",
            "Passer de l'objet au texte et inversement avec `JSON`"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-13",
          title: "La fiche produit",
          difficulty: 1,
          goal: "Créer un objet avec une méthode et afficher son résumé.",
          instructions: [
            "L'objet `produit` contient déjà `nom`, `prix` et `stock`.",
            "Ajoutez-lui une méthode `resume()` qui retourne `Casque audio — 79 € (12 en stock)` en utilisant `this`.",
            "Affichez le résultat de `produit.resume()` dans `#sortie`.",
            "L'appel doit se faire au chargement, sans clic."
          ],
          hint: "Dans une méthode, `this.nom` désigne la propriété `nom` de l'objet appelant. N'oubliez pas le `return` : sans lui, la méthode renvoie `undefined`.",
          starter: {
            html: `<h2>Produit</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1.05rem; }`,
            js: `const produit = {
  nom: "Casque audio",
  prix: 79,
  stock: 12
  // ajoutez ici la méthode resume()
};

const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>Produit</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1.05rem; }`,
            js: `const produit = {
  nom: "Casque audio",
  prix: 79,
  stock: 12,
  resume() {
    return \`\${this.nom} — \${this.prix} € (\${this.stock} en stock)\`;
  }
};

const sortie = document.querySelector("#sortie");
sortie.textContent = produit.resume();`
          },
          checks: [
            "getText('#sortie').includes('Casque audio')",
            "getText('#sortie').includes('79')",
            "getText('#sortie').includes('12')"
          ],
          checklist: [
            "`resume` est une méthode de l'objet",
            "`this` est utilisé pour lire les propriétés",
            "Le résumé complet est affiché"
          ]
        },
        {
          id: "js-ex-14",
          title: "Décomposer une commande",
          difficulty: 2,
          goal: "Combiner destructuring d'objet, destructuring de tableau et spread.",
          instructions: [
            "L'objet `commande` contient `client`, `ville` et `total` ; le tableau `options` contient `express` et `assurance`.",
            "Extrayez `client` et `ville` par destructuring d'objet.",
            "Extrayez le premier élément de `options` dans une constante `optionPrincipale`.",
            "Créez un objet `complete` qui copie `commande` et ajoute la clé `options` avec le spread.",
            "Affichez dans `#sortie` : `Ada (Lyon) - express - 245 €`."
          ],
          hint: "Le destructuring de tableau s'écrit `const [premier] = tableau;`. Pour le spread : `{ ...commande, options }`.",
          starter: {
            html: `<h2>Commande</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; }`,
            js: `const commande = { client: "Ada", ville: "Lyon", total: 245 };
const options = ["express", "assurance"];

// destructuring objet
// destructuring tableau
// objet complete avec spread

const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>Commande</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; }`,
            js: `const commande = { client: "Ada", ville: "Lyon", total: 245 };
const options = ["express", "assurance"];

const { client, ville } = commande;
const [optionPrincipale] = options;
const complete = { ...commande, options };

const sortie = document.querySelector("#sortie");
sortie.textContent = \`\${client} (\${ville}) - \${optionPrincipale} - \${complete.total} €\`;`
          },
          checks: [
            "getText('#sortie').includes('Ada (Lyon)')",
            "getText('#sortie').includes('express')",
            "getText('#sortie').includes('245')"
          ],
          checklist: [
            "Les deux destructuring sont utilisés",
            "`complete` est un nouvel objet (spread)",
            "La ligne affichée suit le format demandé"
          ]
        }
      ]
    },
    {
      id: "js-07",
      title: "Le DOM : lire et modifier la page",
      minutes: 60,
      summary: "Trouver un élément, changer son texte, ses classes, ses attributs, et construire des listes dynamiques.",
      objectives: [
        "Sélectionner un ou plusieurs éléments avec `querySelector` et `querySelectorAll`",
        "Choisir entre `textContent` et `innerHTML` en connaissant le risque de sécurité",
        "Modifier classes, styles, attributs et `dataset` sans écrire de CSS en ligne inutile",
        "Créer, insérer et supprimer des éléments pour construire une liste"
      ],
      content: [
        {
          type: "lead",
          text: "Le navigateur transforme votre HTML en un **arbre d'objets** : le DOM (*Document Object Model*). JavaScript ne modifie jamais le fichier HTML, il modifie cet arbre — et le navigateur redessine ce qui a changé. Comprendre cela évite la question « pourquoi mon code ne voit-il pas mon changement ? »."
        },
        { type: "h", level: 2, text: "Sélectionner : la base de tout" },
        {
          type: "p",
          text: "`document.querySelector(css)` renvoie le **premier** élément qui correspond à un sélecteur CSS, ou `null`. `querySelectorAll(css)` renvoie une `NodeList` de tous les correspondants, parcourable avec `forEach`. Comme ce sont les mêmes sélecteurs que le CSS (`.carte`, `#liste li`, `[data-ref]`), vous n'apprenez rien de nouveau. Règle d'or : testez toujours le résultat avant de l'utiliser — un `null` transformé en `.textContent` casse tout le script."
        },
        {
          type: "p",
          text: "Le garde-fou vient d'abord : un sélecteur peut renvoyer `null`, et `Array.from` rend la liste de résultats utilisable."
        },
        {
          type: "list",
          items: [
            "`const titre = document.querySelector(\"#titre\");` renvoie le premier élément qui correspond au sélecteur CSS, ou `null` s'il n'en existe aucun.",
            "`if (!titre) return;` arrête le traitement si l'élément manque : sans ce garde-fou, la ligne suivante lèverait une `TypeError`.",
            "`titre.textContent = \"Nouveau titre\";` remplace le texte de l'élément.",
            "`const items = document.querySelectorAll(\"#liste li\");` renvoie une `NodeList` de tous les `li` de la liste.",
            "`items.forEach((li, index) => { li.dataset.position = index + 1; });` renseigne un attribut `data-position` sur chaque ligne, numéroté à partir de `1`.",
            "`Array.from(items);` convertit la `NodeList` en vrai tableau, qui donne accès aux méthodes comme `map` et `filter`.",
            "`document.querySelectorAll(\"#liste li\").length;` donne directement le nombre d'éléments trouvés, sans conversion."
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "`null` est la première cause de plantage",
          text: "« Cannot read properties of null (reading 'textContent') » signifie exactement une chose : le sélecteur n'a rien trouvé. Trois causes habituelles — le script s'exécute avant que l'élément existe (utilisez `defer`), l'identifiant est mal orthographié, ou la liste est construite plus tard. Attention aussi : `querySelectorAll` fige la liste au moment de l'appel ; un élément ajouté ensuite n'y figure pas."
        },
        { type: "h", level: 2, text: "Lire et écrire du contenu" },
        {
          type: "p",
          text: "`textContent` lit ou écrit le texte brut : les balises sont affichées littéralement, rien n'est interprété. `innerHTML` lit ou écrit du HTML : le navigateur l'analyse et crée des éléments. C'est puissant pour insérer une structure, et **dangereux** dès que la valeur vient d'un utilisateur, car un script peut y être injecté (faille XSS). La règle est simple : du texte humain va dans `textContent`, une structure que **vous** contrôlez peut passer par `innerHTML`."
        },
        {
          type: "compare",
          left: {
            title: "Dangereux : HTML construit avec une saisie",
            code: `const nom = champ.value;   // "<img src=x onerror=alert(1)>"
liste.innerHTML = "<li>" + nom + "</li>";`,
            lang: "js"
          },
          right: {
            title: "Sûr : le texte reste du texte",
            code: `const nom = champ.value;
const li = document.createElement("li");
li.textContent = nom;      // les balises s'affichent telles quelles
liste.append(li);`,
            lang: "js"
          },
          text: "Même intention, deux niveaux de risque : `innerHTML` interprète la chaîne, `textContent` l'affiche."
        },
        {
          type: "callout",
          tone: "danger",
          title: "XSS en une leçon",
          text: "Toute donnée qui vient de l'extérieur (saisie, URL, réponse d'API) est non fiable. Si vous l'injectez dans `innerHTML`, un attaquant peut exécuter du code dans la page de vos utilisateurs. Les navigateurs modernes bloquent les balises `script` insérées ainsi, mais pas les attributs d'événement comme `onerror` ni les liens `javascript:`. Utilisez `textContent`, ou nettoyez la chaîne — ne cousez jamais du HTML avec des valeurs non fiables."
        },
        { type: "h", level: 2, text: "Classes, styles, attributs, `dataset`" },
        {
          type: "p",
          text: "Classes, styles et attributs : trois façons d'écrire, et `dataset` à préférer pour vos propres données."
        },
        {
          type: "list",
          items: [
            "`const carte = document.querySelector(\".carte\");` sélectionne l'élément par sa classe.",
            "`carte.classList.add(\"actif\");` ajoute la classe, `carte.classList.remove(\"inactif\");` la retire.",
            "`carte.classList.toggle(\"selectionne\");` ajoute la classe si elle manque et la retire si elle est déjà là.",
            "`carte.classList.contains(\"actif\");` renvoie `true` ou `false` sans rien modifier.",
            "`carte.className = \"carte carte--large\";` remplace tout l'attribut `class` d'un coup : les classes précédentes sont perdues.",
            "`carte.style.borderColor = \"tomato\";` écrit un style en camelCase, jamais avec un tiret.",
            "`carte.style.setProperty(\"--teinte\", \"12\");` est la seule façon d'écrire une variable CSS personnalisée.",
            "`carte.setAttribute(\"aria-expanded\", \"true\");` pose un attribut complet, et `carte.getAttribute(\"data-ref\");` renvoie sa valeur ou `null`.",
            "`carte.dataset.ref = \"A3\";` écrit `data-ref=\"A3\"` : `dataset` est la forme à privilégier pour les données de votre application."
          ]
        },
        { type: "h", level: 2, text: "Créer, insérer, supprimer" },
        {
          type: "p",
          text: "Construire avant d'insérer : l'élément n'apparaît dans la page qu'au moment de l'insertion."
        },
        {
          type: "list",
          items: [
            "`const liste = document.querySelector(\"#liste\");` récupère le conteneur.",
            "`const li = document.createElement(\"li\");` crée un élément détaché, encore invisible dans la page.",
            "`li.textContent = \"Nouvel article\";` pose son texte, puis `li.classList.add(\"item\");` lui donne une classe.",
            "`liste.append(li);` l'ajoute à la fin, et `liste.prepend(li);` au début : le même élément est déplacé, pas dupliqué.",
            "`li.remove();` retire l'élément du document.",
            "`liste.innerHTML = \"\";` vide la liste avant de la reconstruire.",
            "`liste.insertAdjacentHTML(\"beforeend\", '<li class=\"item\">Depuis une chaîne</li>');` insère du HTML contrôlé en une seule fois, à la fin du conteneur."
          ]
        },
        {
          type: "demo",
          title: "Construire une liste en JavaScript",
          height: 260,
          html: `<h3>Mes modules</h3>
<ul id="demo-liste"></ul>
<p id="demo-compte">0 module</p>`,
          css: `body { font-family: system-ui, sans-serif; padding: 12px; margin: 0; }
ul { padding-left: 18px; }
li { margin: 4px 0; }
li.mise-en-avance { font-weight: 700; }
#demo-compte { color: #6b7280; font-size: 13px; }`,
          js: `const modules = ["HTML", "CSS", "JavaScript"];
const liste = document.getElementById("demo-liste");
const compte = document.getElementById("demo-compte");

for (const nom of modules) {
  const li = document.createElement("li");
  li.textContent = nom;
  if (nom === "JavaScript") li.classList.add("mise-en-avance");
  liste.append(li);
}

compte.textContent = \`\${liste.children.length} modules affichés\`;`
        }
      ],
      exercises: [
        {
          id: "js-ex-15",
          title: "Titre et état actif",
          difficulty: 1,
          goal: "Modifier le texte d'un titre et ajouter une classe à un élément.",
          instructions: [
            "Sélectionnez le titre `#titre`, puis remplacez son texte par `Bienvenue`.",
            "Sélectionnez le paragraphe `#sortie`, écrivez-y `Titre mis à jour.` et ajoutez-lui la classe `actif` avec `classList`.",
            "Ne modifiez pas le HTML : tout se fait en JavaScript.",
            "Le résultat doit être visible au chargement."
          ],
          hint: "`element.classList.add(\"actif\")` ajoute une classe sans écraser les autres. Vérifiez que vos sélecteurs commencent bien par `#` pour un identifiant.",
          starter: {
            html: `<h2 id="titre">Titre par défaut</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
.actif { color: #16a34a; font-weight: 700; }`,
            js: `// changez le texte du titre
// écrivez dans #sortie et ajoutez-lui la classe actif

const titre = document.querySelector("#titre");
const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2 id="titre">Titre par défaut</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
.actif { color: #16a34a; font-weight: 700; }`,
            js: `const titre = document.querySelector("#titre");
const sortie = document.querySelector("#sortie");

titre.textContent = "Bienvenue";
sortie.textContent = "Titre mis à jour.";
sortie.classList.add("actif");`
          },
          checks: [
            "getText('#titre').toLowerCase().includes('bienvenue')",
            "document.querySelector('#sortie').classList.contains('actif')",
            "getText('#sortie').toLowerCase().includes('mis à jour')"
          ],
          checklist: [
            "Le titre affiche `Bienvenue`",
            "La classe `actif` est ajoutée au paragraphe",
            "Aucune modification du HTML"
          ]
        },
        {
          id: "js-ex-16",
          title: "Générer une liste",
          difficulty: 2,
          goal: "Créer des éléments avec `createElement` et les insérer dans une liste vide.",
          instructions: [
            "Le tableau `produits` contient `Clavier`, `Souris` et `Écran`.",
            "Parcourez-le et créez un `li` par produit, contenant le nom en texte.",
            "Insérez chaque `li` dans la liste `#liste` avec `append`.",
            "Affichez dans `#compteur` le nombre de lignes réellement présentes, suivi de ` produits`."
          ],
          hint: "`document.createElement(\"li\")` crée un élément détaché : il n'apparaît qu'après `append`. `liste.children.length` donne le nombre d'enfants insérés.",
          starter: {
            html: `<h2>Catalogue</h2>
<ul id="liste"></ul>
<p id="compteur">0</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#compteur { color: #6b7280; }`,
            js: `const produits = ["Clavier", "Souris", "Écran"];

const liste = document.querySelector("#liste");
const compteur = document.querySelector("#compteur");

// créez et insérez un li par produit, puis mettez à jour le compteur`
          },
          solution: {
            html: `<h2>Catalogue</h2>
<ul id="liste"></ul>
<p id="compteur">0</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#compteur { color: #6b7280; }`,
            js: `const produits = ["Clavier", "Souris", "Écran"];

const liste = document.querySelector("#liste");
const compteur = document.querySelector("#compteur");

for (const nom of produits) {
  const li = document.createElement("li");
  li.textContent = nom;
  liste.append(li);
}

compteur.textContent = \`\${liste.children.length} produits\`;`
          },
          checks: [
            "countOf('#liste li') === 3",
            "getText('#compteur').includes('3')",
            "document.querySelector('#liste').textContent.includes('Écran')"
          ],
          checklist: [
            "Un `li` est créé par produit avec `createElement`",
            "Les trois lignes sont visibles dans la liste",
            "Le compteur affiche 3"
          ]
        },
        {
          id: "js-ex-17",
          title: "Ligne retirée, badge ajouté",
          difficulty: 3,
          goal: "Manipuler `dataset`, supprimer un élément et insérer du HTML contrôlé.",
          instructions: [
            "Chaque ligne de `#stock` possède un attribut `data-ref` (`A1`, `A2`, `A3`).",
            "Supprimez la ligne dont l'attribut `data-ref` vaut `A2`, en la sélectionnant avec un sélecteur d'attribut.",
            "Ajoutez à la dernière ligne restante l'HTML ` <span class=\"badge\">Rupture</span>` avec `insertAdjacentHTML`.",
            "Affichez dans `#sortie` : `2 références - dernière : A3`, le code de la dernière ligne étant lu via `dataset`."
          ],
          hint: "Sélecteur d'attribut : `[data-ref=\"A2\"]`. `lastElementChild` donne la dernière ligne, et `element.dataset.ref` lit `data-ref`.",
          starter: {
            html: `<h2>Stock</h2>
<ul id="stock">
  <li data-ref="A1">Clavier</li>
  <li data-ref="A2">Souris</li>
  <li data-ref="A3">Écran</li>
</ul>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
.badge { background: #fee2e2; color: #b91c1c; font-size: 12px; padding: 1px 6px; border-radius: 999px; }`,
            js: `const liste = document.querySelector("#stock");
const sortie = document.querySelector("#sortie");

// retirez la ligne data-ref="A2"
// ajoutez un badge à la dernière ligne
// affichez le nombre de références et le code de la dernière`
          },
          solution: {
            html: `<h2>Stock</h2>
<ul id="stock">
  <li data-ref="A1">Clavier</li>
  <li data-ref="A2">Souris</li>
  <li data-ref="A3">Écran</li>
</ul>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
.badge { background: #fee2e2; color: #b91c1c; font-size: 12px; padding: 1px 6px; border-radius: 999px; }`,
            js: `const liste = document.querySelector("#stock");
const sortie = document.querySelector("#sortie");

const ligne = liste.querySelector('[data-ref="A2"]');
if (ligne) ligne.remove();

const derniere = liste.lastElementChild;
derniere.insertAdjacentHTML("beforeend", ' <span class="badge">Rupture</span>');

sortie.textContent = \`\${liste.children.length} références - dernière : \${derniere.dataset.ref}\`;`
          },
          checks: [
            "countOf('#stock li') === 2",
            "!!document.querySelector('#stock .badge')",
            "getText('#sortie').includes('A3')"
          ],
          checklist: [
            "La ligne `A2` a disparu",
            "Un badge `Rupture` est présent dans la dernière ligne",
            "Le message affiche `A3` lu depuis `dataset`"
          ]
        }
      ]
    },
    {
      id: "js-08",
      title: "Événements : réagir aux actions",
      minutes: 60,
      summary: "Écouter clics, saisies et soumissions, maîtriser la propagation et valider un formulaire proprement.",
      objectives: [
        "Attacher un écouteur avec `addEventListener` et exploiter l'objet `event`",
        "Comprendre la propagation et déléguer les événements à un parent",
        "Empêcher le comportement par défaut d'un formulaire et valider ses champs",
        "Annoncer un changement aux lecteurs d'écran avec `aria-live`"
      ],
      content: [
        {
          type: "lead",
          text: "Un événement est un fait signalé par le navigateur : clic, touche pressée, formulaire soumis, page chargée. JavaScript n'agit pas « en continu » : il **attend** puis réagit. C'est le cœur de l'interactivité."
        },
        { type: "h", level: 2, text: "Écouter : `addEventListener`" },
        {
          type: "p",
          text: "`element.addEventListener(\"click\", fonction)` enregistre une réaction. L'écouteur reçoit un objet `event` qui contient tout le contexte : `event.target` (l'élément réellement touché), `event.type`, la touche pressée, la position du clic. Contrairement à l'attribut `onclick` du HTML, `addEventListener` accepte plusieurs écouteurs pour le même événement et se retire avec `removeEventListener`. Passez une **référence** de fonction, jamais un appel : `addEventListener(\"click\", gerer)` et non `addEventListener(\"click\", gerer())`."
        },
        {
          type: "p",
          text: "Une **référence** de fonction, jamais un appel : c'est aussi ce qui permet de retirer l'écouteur plus tard."
        },
        {
          type: "list",
          items: [
            "`const bouton = document.querySelector(\"#bouton\");` et `const sortie = document.querySelector(\"#sortie\");` récupèrent les deux éléments de la démonstration.",
            "`function gererClic(event)` commence par `event.preventDefault();`, qui annule l'action par défaut du navigateur.",
            "Le gestionnaire écrit `\"Cliqué sur \" + event.target.tagName` dans `sortie.textContent` : `event.target` est l'élément réellement cliqué et `tagName` son nom de balise.",
            "`bouton.addEventListener(\"click\", gererClic);` passe la fonction sans parenthèses : l'appel aura lieu au clic, et non tout de suite.",
            "`document.addEventListener(\"keydown\", (event) => { ... });` écoute toutes les touches et teste `event.key === \"Escape\"` pour écrire `\"Annulé\"` dans la sortie.",
            "`bouton.removeEventListener(\"click\", gererClic);` retire l'écouteur : mêmes arguments et même référence, sinon la suppression reste sans effet."
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "Trois erreurs classiques",
          text: "1) Appeler la fonction au lieu de la passer (`gererClic()` s'exécute immédiatement). 2) Écouter avant que l'élément existe : le `addEventListener` ne casse pas, mais votre sélecteur vaut `null`. 3) Croire que `event.target` est le bouton alors que c'est l'icône à l'intérieur : utilisez `event.currentTarget` pour l'élément qui porte l'écouteur."
        },
        { type: "h", level: 2, text: "Propagation et délégation" },
        {
          type: "p",
          text: "Un clic sur un élément **remonte** l'arbre jusqu'à `document` : c'est le *bubbling*. On peut interrompre cette remontée avec `stopPropagation`, mais mieux vaut en profiter. La **délégation** consiste à écouter sur un parent stable plutôt que sur chaque enfant : un seul écouteur, des éléments ajoutés plus tard automatiquement couverts, et moins de mémoire. C'est la technique standard des listes et des tableaux."
        },
        {
          type: "p",
          text: "Un seul écouteur posé sur le parent suffit : `closest` retrouve la ligne concernée, même ajoutée après coup."
        },
        {
          type: "list",
          items: [
            "`const liste = document.querySelector(\"#liste\");` et `const sortie = document.querySelector(\"#sortie\");` préparent les deux éléments.",
            "`liste.addEventListener(\"click\", (event) => { ... });` écoute les clics sur le parent à la place des enfants : le clic remonte l'arbre jusqu'ici.",
            "`event.target.closest(\"li\");` remonte du point cliqué jusqu'au `li` le plus proche.",
            "`if (!ligne) return;` ignore le clic hors d'une ligne, par exemple sur le fond de la liste.",
            "`sortie.textContent = \"Sélection : \" + ligne.textContent.trim();` affiche le texte de la ligne, débarrassé des espaces autour.",
            "Une ligne ajoutée après coup fonctionne sans réattacher le moindre écouteur, puisque le parent reçoit toujours le clic."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Délégation : pourquoi c'est presque toujours mieux",
          text: "Un écouteur sur le parent au lieu d'un par enfant : la liste peut contenir 5 ou 5 000 lignes sans coût supplémentaire, et les éléments créés dynamiquement fonctionnent sans code additionnel. `closest(\"li\")` est le compagnon indispensable : il gère les clics sur des éléments internes (icône, badge, texte)."
        },
        { type: "h", level: 2, text: "Formulaires et accessibilité" },
        {
          type: "p",
          text: "À la soumission d'un formulaire, le navigateur recharge la page par défaut : pour une application, on appelle `event.preventDefault()` puis on valide soi-même. Réservez `event.preventDefault()` à ce cas précis ; sur un lien, il empêche la navigation. Enfin, une erreur affichée seulement par la couleur est invisible pour un lecteur d'écran : la convention est une zone avec `role=\"status\"` ou `aria-live=\"polite\"`, dont le texte change, et un attribut `aria-invalid=\"true\"` sur le champ fautif."
        },
        {
          type: "p",
          text: "L'erreur s'annonce par `aria-invalid`, pas seulement par une couleur."
        },
        {
          type: "list",
          items: [
            "`const formulaire`, `const champ` et `const message` sélectionnent le formulaire, le champ de saisie et la zone de message.",
            "`formulaire.addEventListener(\"submit\", (event) => { ... });` écoute la soumission, quel que soit le bouton utilisé.",
            "`event.preventDefault();` empêche le rechargement : le traitement reste dans la page.",
            "`const valeur = champ.value.trim();` lit la saisie et retire les espaces autour.",
            "Si `valeur.length < 2`, le code pose `champ.setAttribute(\"aria-invalid\", \"true\");`, écrit `\"Le nom doit contenir au moins 2 caractères.\"` dans le message, puis s'arrête par `return`.",
            "Sinon `champ.removeAttribute(\"aria-invalid\");` efface l'état d'erreur et le message affiche `\"Merci \" + valeur + \" !\"`."
          ]
        },
        {
          type: "demo",
          title: "Compteur de clics et sélection déléguée",
          height: 300,
          html: `<p><button id="demo-bouton" type="button">Ajouter une ligne</button>
<button id="demo-raz" type="button">Remettre à zéro</button></p>
<ul id="demo-liste">
  <li>Première ligne</li>
</ul>
<p id="demo-message" aria-live="polite">Aucune sélection</p>`,
          css: `body { font-family: system-ui, sans-serif; padding: 12px; margin: 0; }
button { padding: 4px 10px; margin-right: 6px; }
li { cursor: pointer; margin: 4px 0; }
li.choisi { background: #fde68a; }
#demo-message { font-size: 13px; color: #374151; }`,
          js: `let compteur = 0;
const liste = document.getElementById("demo-liste");
const message = document.getElementById("demo-message");

document.getElementById("demo-bouton").addEventListener("click", () => {
  compteur += 1;
  const li = document.createElement("li");
  li.textContent = "Ligne " + (compteur + 1);
  liste.append(li);
  message.textContent = \`\${liste.children.length} lignes\`;
});

document.getElementById("demo-raz").addEventListener("click", () => {
  liste.innerHTML = "";
  compteur = 0;
  message.textContent = "Liste vidée";
});

liste.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;
  for (const autre of liste.children) autre.classList.remove("choisi");
  li.classList.add("choisi");
  message.textContent = "Sélection : " + li.textContent;
});`
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Sans ces réflexes, l'interactivité devient fragile.",
          items: [
            "Attacher un écouteur sans l'appeler",
            "Récupérer l'élément cliqué avec `event.target` et `closest`",
            "Empêcher le rechargement d'un formulaire avec `preventDefault`",
            "Annoncer un message dans une zone `aria-live`"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-18",
          title: "Un clic, un message",
          difficulty: 1,
          goal: "Attacher un écouteur de clic et modifier la page en réaction.",
          instructions: [
            "Sélectionnez le bouton `#btn` et le paragraphe `#sortie`.",
            "Écoutez l'événement `click` sur le bouton avec `addEventListener`.",
            "Dans le gestionnaire, remplacez le texte de `#sortie` par `Cliqué 1 fois`.",
            "Le paragraphe doit rester sur `0 clic` tant que l'on n'a pas cliqué.",
            "La vérification simulera un clic sur le bouton : votre écouteur doit réagir à ce clic."
          ],
          hint: "Le second argument de `addEventListener` est une fonction : `() => { ... }`. Si vous écrivez `() => sortie.textContent = ...`, la flèche renvoie l'affectation, ce qui fonctionne aussi.",
          starter: {
            html: `<h2>Compteur</h2>
<button id="btn" type="button">Cliquer</button>
<p id="sortie" aria-live="polite">0 clic</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
button { padding: 6px 14px; }`,
            js: `const btn = document.querySelector("#btn");
const sortie = document.querySelector("#sortie");

// ajoutez l'écouteur de clic`
          },
          solution: {
            html: `<h2>Compteur</h2>
<button id="btn" type="button">Cliquer</button>
<p id="sortie" aria-live="polite">0 clic</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
button { padding: 6px 14px; }`,
            js: `const btn = document.querySelector("#btn");
const sortie = document.querySelector("#sortie");

btn.addEventListener("click", () => {
  sortie.textContent = "Cliqué 1 fois";
});`
          },
          checks: [
            "(() => { const b = document.querySelector('#btn'); if (!b) return false; b.click(); return getText('#sortie').toLowerCase().includes('cliqué'); })()"
          ],
          checklist: [
            "`addEventListener` est utilisé, pas l'attribut `onclick`",
            "La fonction est passée, pas appelée",
            "Le texte d'origine reste visible avant le clic"
          ]
        },
        {
          id: "js-ex-19",
          title: "Sélection par délégation",
          difficulty: 2,
          goal: "Écouter un clic sur une liste entière et récupérer la ligne concernée.",
          instructions: [
            "Écoutez le clic sur la liste `#liste`, pas sur chaque `li`.",
            "Dans le gestionnaire, retrouvez la ligne cliquée avec `event.target.closest(\"li\")`.",
            "Affichez dans `#sortie` le texte `Sélection : <texte de la ligne>`.",
            "Si le clic ne vient pas d'une ligne, ne faites rien.",
            "La vérification simulera un clic sur la troisième ligne (`Cerise`)."
          ],
          hint: "`closest(\"li\")` renvoie `null` quand le clic sort de la liste : testez le résultat avec un `if (!ligne) return;` avant d'écrire.",
          starter: {
            html: `<h2>Mes courses</h2>
<ul id="liste">
  <li>Pomme</li>
  <li>Banane</li>
  <li>Cerise</li>
</ul>
<p id="sortie" aria-live="polite">Aucune sélection</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
li { cursor: pointer; margin: 4px 0; }`,
            js: `const liste = document.querySelector("#liste");
const sortie = document.querySelector("#sortie");

// un seul écouteur sur la liste, et closest("li")`
          },
          solution: {
            html: `<h2>Mes courses</h2>
<ul id="liste">
  <li>Pomme</li>
  <li>Banane</li>
  <li>Cerise</li>
</ul>
<p id="sortie" aria-live="polite">Aucune sélection</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
li { cursor: pointer; margin: 4px 0; }`,
            js: `const liste = document.querySelector("#liste");
const sortie = document.querySelector("#sortie");

liste.addEventListener("click", (event) => {
  const ligne = event.target.closest("li");
  if (!ligne) return;
  sortie.textContent = "Sélection : " + ligne.textContent.trim();
});`
          },
          checks: [
            "(() => { const items = document.querySelectorAll('#liste li'); if (items.length < 3) return false; items[2].click(); return getText('#sortie').includes('Cerise'); })()"
          ],
          checklist: [
            "Un seul écouteur, placé sur `#liste`",
            "`closest` identifie la ligne cliquée",
            "Le texte de la ligne apparaît dans `#sortie`"
          ]
        },
        {
          id: "js-ex-20",
          title: "Formulaire validé sans rechargement",
          difficulty: 3,
          goal: "Empêcher la soumission, valider un champ vide et annoncer le résultat.",
          instructions: [
            "Écoutez l'événement `submit` du formulaire `#formulaire`.",
            "Appelez `event.preventDefault()` pour empêcher le rechargement de la page.",
            "Si le champ `#nom` est vide ou contient moins de 2 caractères (espaces exclus avec `trim`), affichez dans `#message` : `Le nom est obligatoire (2 caractères minimum).`.",
            "Sinon, affichez `Merci <nom> !`. Dans le cas d'erreur, ajoutez aussi `aria-invalid=\"true\"` au champ.",
            "La vérification simulera une soumission du formulaire avec un champ vide."
          ],
          hint: "`champ.value.trim()` supprime les espaces autour de la saisie. La zone `#message` est déjà en `aria-live`, l'annonce est donc automatique pour les lecteurs d'écran.",
          starter: {
            html: `<h2>Inscription</h2>
<form id="formulaire">
  <label for="nom">Nom</label>
  <input id="nom" name="nom" type="text" />
  <button type="submit">Valider</button>
</form>
<p id="message" aria-live="polite"></p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
label { display: block; margin-bottom: 4px; }
input { padding: 6px; margin-bottom: 8px; }
#message { color: #b91c1c; }`,
            js: `const formulaire = document.querySelector("#formulaire");
const champ = document.querySelector("#nom");
const message = document.querySelector("#message");

// écoutez submit, empêchez le rechargement, validez le champ`
          },
          solution: {
            html: `<h2>Inscription</h2>
<form id="formulaire">
  <label for="nom">Nom</label>
  <input id="nom" name="nom" type="text" />
  <button type="submit">Valider</button>
</form>
<p id="message" aria-live="polite"></p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
label { display: block; margin-bottom: 4px; }
input { padding: 6px; margin-bottom: 8px; }
#message { color: #b91c1c; }`,
            js: `const formulaire = document.querySelector("#formulaire");
const champ = document.querySelector("#nom");
const message = document.querySelector("#message");

formulaire.addEventListener("submit", (event) => {
  event.preventDefault();
  const valeur = champ.value.trim();

  if (valeur.length < 2) {
    champ.setAttribute("aria-invalid", "true");
    message.textContent = "Le nom est obligatoire (2 caractères minimum).";
    return;
  }

  champ.removeAttribute("aria-invalid");
  message.textContent = \`Merci \${valeur} !\`;
});`
          },
          checks: [
            "(() => { const f = document.querySelector('#formulaire'); if (!f) return false; f.dispatchEvent(new win.Event('submit', { bubbles: true, cancelable: true })); return getText('#message').toLowerCase().includes('obligatoire'); })()",
            "(() => { const f = document.querySelector('#formulaire'); if (!f) return false; const e = new win.Event('submit', { bubbles: true, cancelable: true }); f.dispatchEvent(e); return e.defaultPrevented === true; })()"
          ],
          checklist: [
            "`submit` est écouté sur le formulaire",
            "`preventDefault` empêche le rechargement",
            "Un champ vide déclenche le message d'erreur",
            "L'erreur est annoncée dans la zone `aria-live`"
          ]
        }
      ]
    },
    {
      id: "js-09",
      title: "Classes, héritage et organisation en modules",
      minutes: 55,
      summary: "Modéliser des objets réutilisables avec des classes et découper le code en fichiers.",
      objectives: [
        "Écrire une classe avec constructeur, méthodes, getters et membres statiques",
        "Étendre une classe avec `extends` et appeler `super`",
        "Comprendre à quoi servent `export` et `import` dans un projet",
        "Choisir entre objet littéral, classe, `Map` et `Set` selon le besoin"
      ],
      content: [
        {
          type: "lead",
          text: "Quand vous créez dix objets qui partagent les mêmes données et les mêmes fonctions, vous avez besoin d'un **modèle**. Une classe est ce modèle : elle décrit une forme, pas une donnée. On en instancie autant d'objets que nécessaire avec `new`."
        },
        { type: "h", level: 2, text: "Classe : constructeur et méthodes" },
        {
          type: "p",
          text: "`constructor` s'exécute à chaque `new` et sert à initialiser les propriétés de l'instance. Les méthodes déclarées dans le corps de la classe vivent sur le prototype : elles sont **partagées** par toutes les instances, ce qui économise la mémoire (contrairement à des fonctions recréées dans chaque objet). La classe elle-même n'est pas hissée : elle doit être définie avant utilisation."
        },
        {
          type: "p",
          text: "Constructeur pour l'état, méthodes partagées, `return this` pour enchaîner les appels."
        },
        {
          type: "list",
          items: [
            "`class Compteur` déclare un plan, et son `constructor(depart = 0)` s'exécute à chaque `new` en posant `this.valeur = depart;`.",
            "`incrementer(pas = 1)` ajoute le pas à `this.valeur` puis renvoie `this` : c'est ce retour qui autorise le chaînage.",
            "`remiseAZero()` remet `this.valeur` à `0` et renvoie également `this`.",
            "`const c = new Compteur(5);` crée une instance dont `valeur` vaut `5`.",
            "`c.incrementer().incrementer(2);` ajoute d'abord `1` par défaut, puis `2` : deux appels enchaînés sur le même objet.",
            "`c.valeur;` vaut `8` : les méthodes sont définies une seule fois et partagées par toutes les instances."
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "Une méthode détachée perd son `this`",
          text: "`const inc = c.incrementer; inc();` échoue : la méthode ne sait plus sur quel objet agir. Les méthodes déclarées `methode = () => {}` capturent le `this` de l'instance et survivent au détachement — c'est le choix courant pour les gestionnaires d'événements dans une classe. Rappel : `new` sur une fonction fléchée est impossible, et une méthode ne doit jamais être appelée sans destinataire."
        },
        { type: "h", level: 2, text: "Héritage : `extends` et `super`" },
        {
          type: "p",
          text: "L'héritage exprime un « est un » : un `Chien` est un `Animal`. La classe fille hérite de toutes les méthodes du parent, et peut **redéfinir** celles dont le comportement change. `super(...)` appelle le constructeur parent — obligatoire avant tout usage de `this` — et `super.methode()` appelle la version parente sans la réécrire. Utilisez l'héritage avec parcimonie : souvent, la **composition** (un objet qui contient un autre objet) est plus souple que trois niveaux de classes."
        },
        {
          type: "list",
          items: [
            "`class Animal` pose une propriété `nom` dans son constructeur et une méthode `parler()` qui renvoie `this.nom + \" fait un bruit.\"`.",
            "`class Chien extends Animal` hérite de cette propriété et de cette méthode : un chien est un animal, et la fille redéfinit `parler()` au lieu de la recopier.",
            "Son constructeur appelle `super(nom);` pour construire la partie parente, puis ajoute `this.race = race;`.",
            "La méthode `parler()` de `Chien` renvoie `super.parler() + \" Il aboie.\"` : elle réutilise le parent et complète le texte.",
            "`const rex = new Chien(\"Rex\", \"berger\");` puis `rex.parler();` renvoie `\"Rex fait un bruit. Il aboie.\"`.",
            "`rex instanceof Animal;` renvoie `true` : l'instance appartient bien à la lignée."
          ]
        },
        { type: "h", level: 2, text: "Getters, setters, membres statiques" },
        {
          type: "p",
          text: "`get` et `set` valident l'affectation, et `static` place un membre sur la classe : l'instance n'en voit rien."
        },
        {
          type: "list",
          items: [
            "`static devise = \"EUR\";` attache la valeur à la classe, pas aux instances.",
            "`constructor(nom, prix)` retient `this.nom` et range le prix dans `this._prix`, une propriété interne par convention.",
            "`get prix()` rend `_prix` lisible comme une propriété ordinaire, sans parenthèses.",
            "`set prix(valeur)` valide l'affectation : une valeur négative lève `throw new RangeError(\"prix négatif\");`, une valeur correcte est rangée dans `_prix`.",
            "`get prixTTC()` calcule `Math.round(this._prix * 1.18 * 100) / 100`, soit un arrondi au centime.",
            "`static creerDemo()` renvoie `new Produit(\"Demo\", 10);` : une fabrique qui évite d'écrire `new` chez l'appelant.",
            "`Produit.devise;` vaut `\"EUR\"`, tandis que `new Produit(\"Casque\", 79).prixTTC;` vaut `93.22`."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Objet simple ou classe ?",
          text: "Un objet littéral suffit pour **une** donnée structurée (une commande, un réglage). Une classe se justifie quand vous avez plusieurs instances, un état interne à protéger et des méthodes qui vont avec. Et pour de simples paires clé/valeur dynamiques sans prototype à hériter, un `Map` est souvent plus adapté (clés non-chaînes, ordre d'insertion, `size`)."
        },
        { type: "h", level: 2, text: "Organiser : modules ES, `Map` et `Set`" },
        {
          type: "p",
          text: "Deux fichiers, un `Map` en dictionnaire, un `Set` qui absorbe les doublons : chacun a son rôle."
        },
        {
          type: "list",
          items: [
            "Dans `panier.js`, `export class Panier` rend la classe disponible pour un autre fichier.",
            "Le constructeur crée `this.lignes = new Map();`, un dictionnaire qui associe une référence à une quantité.",
            "`ajouter(ref, quantite = 1)` lit l'état courant avec `this.lignes.get(ref) ?? 0`, enregistre la somme par `this.lignes.set(ref, actuel + quantite);` puis renvoie `this` pour le chaînage.",
            "Dans `app.js`, `import { Panier } from \"./panier.js\";` charge la classe : le fichier doit être un module pour que l'import et l'export fonctionnent.",
            "`const panier = new Panier().ajouter(\"A1\", 2);` crée le panier et y ajoute directement deux unités de `A1`.",
            "`const categories = new Set([\"audio\", \"audio\", \"bureau\"]);` ignore le doublon, et `categories.size;` vaut `2`."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Ces choix d'architecture font la différence sur un vrai projet.",
          items: [
            "Écrire une classe avec constructeur et une méthode qui renvoie `this`",
            "Étendre une classe en appelant `super` au bon moment",
            "Ajouter un getter et une validation dans un setter",
            "Expliquer `export`/`import`, et citer un usage de `Map`"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-21",
          title: "La classe Compteur",
          difficulty: 1,
          goal: "Créer une classe avec constructeur et méthode, puis l'instancier.",
          instructions: [
            "Écrivez une classe `Compteur` dont le constructeur reçoit `depart` (0 par défaut) et l'affecte à `this.valeur`.",
            "Ajoutez une méthode `incrementer()` qui augmente `this.valeur` de 1 et renvoie la nouvelle valeur.",
            "Créez une instance avec la valeur de départ 5, puis appelez `incrementer()` deux fois.",
            "Affichez dans `#sortie` : `Valeur : 7`."
          ],
          hint: "`new Compteur(5)` appelle le constructeur. `this.valeur += 1` fonctionne dans une méthode comme dans une fonction classique.",
          starter: {
            html: `<h2>Compteur</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 700; }`,
            js: `class Compteur {
  constructor(depart = 0) {
    // initialisez this.valeur
  }
  // ajoutez incrementer()
}

const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>Compteur</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 700; }`,
            js: `class Compteur {
  constructor(depart = 0) {
    this.valeur = depart;
  }

  incrementer() {
    this.valeur += 1;
    return this.valeur;
  }
}

const compteur = new Compteur(5);
compteur.incrementer();
compteur.incrementer();

const sortie = document.querySelector("#sortie");
sortie.textContent = \`Valeur : \${compteur.valeur}\`;`
          },
          checks: [
            "getText('#sortie').includes('7')",
            "getText('#sortie').toLowerCase().includes('valeur')"
          ],
          checklist: [
            "La classe utilise `this.valeur`",
            "L'instance est créée avec `new Compteur(5)`",
            "Après deux incréments la valeur est 7"
          ]
        },
        {
          id: "js-ex-22",
          title: "Héritage et getter",
          difficulty: 2,
          goal: "Étendre une classe, appeler `super` et redéfinir une méthode.",
          instructions: [
            "La classe `Animal` est fournie : ne la modifiez pas.",
            "Créez `Chien extends Animal` dont le constructeur reçoit `nom` et `race`, et appelle `super(nom)`.",
            "Redéfinissez `parler()` pour renvoyer le texte du parent suivi de ` Il aboie.` (utilisez `super.parler()`).",
            "Ajoutez un getter `description` qui renvoie `Rex (berger)`.",
            "Affichez dans `#sortie` : `Rex (berger) - Rex fait un bruit. Il aboie.`"
          ],
          hint: "`super(nom)` doit être la première instruction du constructeur. Un getter se déclare avec `get description() { return ...; }` et s'utilise sans parenthèses.",
          starter: {
            html: `<h2>Animaux</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1rem; }`,
            js: `class Animal {
  constructor(nom) {
    this.nom = nom;
  }
  parler() {
    return this.nom + " fait un bruit.";
  }
}

// écrivez Chien ici

const rex = new Chien("Rex", "berger");
const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>Animaux</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-size: 1rem; }`,
            js: `class Animal {
  constructor(nom) {
    this.nom = nom;
  }
  parler() {
    return this.nom + " fait un bruit.";
  }
}

class Chien extends Animal {
  constructor(nom, race) {
    super(nom);
    this.race = race;
  }
  parler() {
    return super.parler() + " Il aboie.";
  }
  get description() {
    return \`\${this.nom} (\${this.race})\`;
  }
}

const rex = new Chien("Rex", "berger");
const sortie = document.querySelector("#sortie");
sortie.textContent = rex.description + " - " + rex.parler();`
          },
          checks: [
            "getText('#sortie').includes('Rex (berger)')",
            "getText('#sortie').toLowerCase().includes('aboie')"
          ],
          checklist: [
            "`Chien` hérite de `Animal` avec `extends`",
            "`super(nom)` est appelé dans le constructeur",
            "`super.parler()` est réutilisé dans la méthode redéfinie",
            "Le getter `description` fonctionne sans parenthèses"
          ]
        }
      ]
    },
    {
      id: "js-10",
      title: "Asynchrone : promesses, `async`/`await` et `fetch`",
      minutes: 65,
      summary: "Comprendre la boucle d'événements, gérer des promesses et charger des données sans bloquer la page.",
      objectives: [
        "Expliquer pourquoi JavaScript est mono-thread et ce qu'est la boucle d'événements",
        "Consommer une promesse avec `then`/`catch` puis avec `async`/`await`",
        "Utiliser `fetch` en vérifiant le statut puis en convertissant en JSON",
        "Gérer les états de chargement, les erreurs et les appels parallèles"
      ],
      content: [
        {
          type: "lead",
          text: "Télécharger une image, attendre une réponse réseau, lire un fichier : ces opérations prennent du temps. Si JavaScript les attendait, la page serait figée. Tout l'asynchrone du langage existe pour une seule raison : **ne jamais bloquer le fil d'exécution**."
        },
        { type: "h", level: 2, text: "Un seul fil, une file d'attente" },
        {
          type: "p",
          text: "JavaScript s'exécute sur un seul fil : une instruction à la fois. Le navigateur, lui, fait le travail lent à côté (réseau, minuteurs) et dépose une **tâche** dans la file quand c'est prêt. La *boucle d'événements* prend les tâches une par une, quand la pile d'appels est vide. Conséquence pratique : le code synchrone passe toujours avant les callbacks, même avec un délai de 0 milliseconde. C'est aussi pourquoi une boucle qui calcule pendant deux secondes gèle l'interface : elle occupe le seul fil disponible."
        },
        {
          type: "p",
          text: "Tout le code synchrone passe d'abord, même un `setTimeout` réglé à zéro milliseconde."
        },
        {
          type: "list",
          items: [
            "`console.log(\"1 : synchrone\");` s'exécute immédiatement : la console affiche `1 : synchrone`.",
            "`setTimeout(() => { console.log(\"3 : tâche suivante\"); }, 0);` programme un callback à délai nul, mais il est mis en file et attend son tour.",
            "`console.log(\"2 : synchrone\");` passe avant le callback : la console affiche `2 : synchrone`.",
            "L'ordre d'affichage est donc `1`, `2`, `3`, jamais `1`, `3`, `2` : le callback ne s'exécute qu'une fois la pile d'appels vide."
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "Asynchrone ne veut pas dire parallèle",
          text: "Un `setTimeout(..., 0)` n'exécute pas le code « tout de suite » : il l'exécute **après** la fin du script en cours. Une variable modifiée dans un callback n'est donc pas modifiée à la ligne suivante. Quand une valeur semble `undefined` alors que le code la remplit, c'est presque toujours un problème d'ordre : vous lisez avant que la tâche asynchrone ait eu lieu."
        },
        { type: "h", level: 2, text: "Promesses : une valeur future" },
        {
          type: "p",
          text: "Une promesse est *pendante*, puis *résolue* avec une valeur ou *rejetée* avec une erreur. `then` traite le succès, `catch` l'échec, `finally` s'exécute toujours — le bon endroit pour retirer un indicateur de chargement. Et `then` renvoie une nouvelle promesse : le chaînage exige de bien renvoyer la valeur."
        },
        {
          type: "list",
          items: [
            "`function attendre(ms, valeur)` renvoie `new Promise((resoudre) => { setTimeout(() => resoudre(valeur), ms); });` : la promesse se résout après le délai avec la valeur fournie.",
            "`attendre(100, \"données\")` crée la promesse, et son `.then((donnees) => { ... })` reçoit `\"données\"` une fois résolue : la console affiche `données`.",
            "Ce `then` renvoie `attendre(50, \"suite\")`, une nouvelle promesse ; c'est ce retour qui rend le chaînage correct.",
            "Le second `.then((suite) => console.log(suite))` affiche `suite` cinquante millisecondes plus tard, en attendant automatiquement la promesse renvoyée.",
            "`.catch((erreur) => console.error(erreur))` capte tout rejet survenu dans la chaîne, y compris dans les `then` précédents.",
            "`.finally(() => console.log(\"chargement terminé\"))` s'exécute dans les deux cas et affiche `chargement terminé`."
          ]
        },
        { type: "h", level: 2, text: "`async` / `await` : l'asynchrone qui se lit" },
        {
          type: "p",
          text: "`await` met en pause **la fonction**, pas la page ; `try`/`catch` redevient un contrôle ordinaire."
        },
        {
          type: "list",
          items: [
            "`async function charger()` déclare une fonction asynchrone : elle renvoie toujours une promesse.",
            "`const donnees = await attendre(100, [\"A\", \"B\"]);` attend la résolution et reçoit `[\"A\", \"B\"]`, sans bloquer le reste de la page.",
            "`return donnees.length;` renvoie `2`, valeur automatiquement emballée dans la promesse de retour.",
            "Le `catch (erreur)` affiche `\"Échec :\"` suivi de `erreur.message` et renvoie `0` comme valeur de repli.",
            "`charger().then((n) => console.log(n));` affiche `2` une fois la promesse résolue.",
            "`async function simple() { return 42; }` équivaut à `Promise.resolve(42)` : une fonction asynchrone renvoie toujours une promesse."
          ]
        },
        { type: "h", level: 2, text: "`fetch` : charger sans recharger" },
        {
          type: "p",
          text: "`fetch(url)` renvoie une promesse de réponse. Deux étapes sont nécessaires : attendre la réponse, puis convertir le corps en JSON avec `await reponse.json()`. `fetch` ne **rejette pas** pour un code 404 ou 500 : il faut tester `reponse.ok`. Trois états doivent toujours être couverts dans l'interface : chargement, erreur, vide — sinon l'utilisateur voit une page blanche sans explication. Pour lancer plusieurs appels indépendants, `Promise.all` les exécute en parallèle et échoue dès le premier rejet."
        },
        {
          type: "p",
          text: "Un chargement passe par trois états : attente, données ou erreur — et `!reponse.ok` se vérifie avant de lire le corps."
        },
        {
          type: "list",
          items: [
            "`const liste = document.querySelector(\"#produits\");` puis `liste.textContent = \"Chargement...\";` affichent l'attente dès le départ.",
            "`const reponse = await fetch(\"/api/produits\");` lance la requête ; le corps n'est pas encore lu à ce stade.",
            "`if (!reponse.ok) throw new Error(\"HTTP \" + reponse.status);` transforme une erreur HTTP en exception, car `fetch` ne rejette pas sur un `404`.",
            "`const produits = await reponse.json();` lit et analyse le corps : une seconde attente, à ne pas oublier.",
            "Si `produits.length === 0`, la liste affiche `\"Aucun produit.\"` et la fonction s'arrête par `return`.",
            "Sinon, `produits.map((p) => p.nom).join(\", \");` écrit les noms séparés par des virgules dans la liste.",
            "Le `catch (erreur)` affiche `\"Impossible de charger : \" + erreur.message` : panne réseau comme code HTTP sont couverts.",
            "`const [a, b] = await Promise.all([fetch(\"/api/a\"), fetch(\"/api/b\")]);` lance deux requêtes indépendantes en parallèle et déstructure les deux réponses."
          ]
        },
        {
          type: "callout",
          tone: "danger",
          title: "Les trois pièges de `fetch`",
          text: "1) Un 404 n'est pas une erreur pour `fetch` : sans `if (!reponse.ok)`, vous traiterez une page d'erreur comme des données. 2) `reponse.json()` ne peut être appelé qu'une fois — le corps est consommé. 3) Chaque appel réseau peut échouer hors ligne : prévoyez toujours un `catch` et un message compréhensible, jamais une page muette. Pensez aussi au `.finally()` pour retirer le spinner."
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Ces notions reviennent dans toute application connectée.",
          items: [
            "Prédire l'ordre d'affichage d'un `setTimeout` à 0",
            "Convertir une chaîne de promesses en `async`/`await` avec `try`/`catch`",
            "Vérifier `reponse.ok` avant de lire le JSON",
            "Afficher un état de chargement puis un état d'erreur"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-23",
          title: "Chargement simulé",
          difficulty: 1,
          goal: "Consommer une promesse avec `then` et remplacer un état de chargement.",
          instructions: [
            "Le script affiche déjà `Chargement…` dans `#sortie`.",
            "Utilisez `Promise.resolve(articles)` pour simuler un chargement réussi.",
            "Dans le `.then`, remplacez le texte par `<nombre d'articles> articles chargés`.",
            "Ajoutez un `.catch` qui affiche `Erreur : ` suivi du message d'erreur.",
            "Aucun réseau n'est utilisé : la donnée est déjà dans le tableau `articles`."
          ],
          hint: "`Promise.resolve(valeur).then((valeur) => { ... })` : le callback reçoit la valeur résolue, ici le tableau `articles`.",
          starter: {
            html: `<h2>Chargement</h2>
<p id="sortie" aria-live="polite">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 600; }`,
            js: `const articles = ["HTML", "CSS", "JS"];
const sortie = document.querySelector("#sortie");

sortie.textContent = "Chargement…";

// utilisez Promise.resolve(articles).then(...).catch(...)`
          },
          solution: {
            html: `<h2>Chargement</h2>
<p id="sortie" aria-live="polite">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 600; }`,
            js: `const articles = ["HTML", "CSS", "JS"];
const sortie = document.querySelector("#sortie");

sortie.textContent = "Chargement…";

Promise.resolve(articles)
  .then((donnees) => {
    sortie.textContent = \`\${donnees.length} articles chargés\`;
  })
  .catch((erreur) => {
    sortie.textContent = "Erreur : " + erreur.message;
  });`
          },
          checks: [
            "getText('#sortie').includes('3 articles')",
            "!/Chargement/.test(getText('#sortie'))"
          ],
          checklist: [
            "Une promesse est créée avec `Promise.resolve`",
            "Le résultat est écrit dans `.then`",
            "Un `.catch` est présent"
          ]
        },
        {
          id: "js-ex-24",
          title: "Deux recherches en parallèle",
          difficulty: 2,
          goal: "Utiliser `async`/`await`, `try`/`catch` et `Promise.all` avec des données simulées.",
          instructions: [
            "La fonction `rechercherUtilisateur(id)` renvoie une promesse : résolue pour `1`, rejetée sinon.",
            "Écrivez une fonction `async` nommée `afficher(id)` qui attend le résultat et renvoie `Trouvé : <nom>`.",
            "Encadrez l'appel avec `try`/`catch` pour renvoyer `Erreur : <message>` en cas d'échec.",
            "Lancez les deux recherches en parallèle avec `Promise.all([afficher(1), afficher(99)])` et affichez les deux résultats joints par ` | `."
          ],
          hint: "Une fonction `async` renvoie une promesse : `Promise.all` accepte donc directement les résultats de `afficher(...)`. N'oubliez pas `await` devant la recherche, sinon vous manipulez une promesse et non un utilisateur.",
          starter: {
            html: `<h2>Recherche</h2>
<p id="sortie" aria-live="polite">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; font-size: 14px; }`,
            js: `const sortie = document.querySelector("#sortie");

function rechercherUtilisateur(id) {
  return id === 1
    ? Promise.resolve({ nom: "Ada" })
    : Promise.reject(new Error("Utilisateur introuvable"));
}

// écrivez async function afficher(id) avec try/catch
// lancez les deux appels avec Promise.all`
          },
          solution: {
            html: `<h2>Recherche</h2>
<p id="sortie" aria-live="polite">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; font-size: 14px; }`,
            js: `const sortie = document.querySelector("#sortie");

function rechercherUtilisateur(id) {
  return id === 1
    ? Promise.resolve({ nom: "Ada" })
    : Promise.reject(new Error("Utilisateur introuvable"));
}

async function afficher(id) {
  try {
    const utilisateur = await rechercherUtilisateur(id);
    return "Trouvé : " + utilisateur.nom;
  } catch (erreur) {
    return "Erreur : " + erreur.message;
  }
}

Promise.all([afficher(1), afficher(99)]).then((resultats) => {
  sortie.textContent = resultats.join(" | ");
});`
          },
          checks: [
            "getText('#sortie').includes('Ada')",
            "getText('#sortie').toLowerCase().includes('introuvable')"
          ],
          checklist: [
            "`async`/`await` est utilisé",
            "Le `try`/`catch` transforme l'échec en message",
            "Les deux appels partent ensemble avec `Promise.all`"
          ]
        }
      ]
    },
    {
      id: "js-11",
      title: "Persistance : garder un état local",
      minutes: 55,
      summary: "Enregistrer un thème ou une liste dans le navigateur et les restaurer au chargement suivant.",
      objectives: [
        "Choisir entre `localStorage` et `sessionStorage`",
        "Sérialiser et relire des structures avec `JSON`",
        "Envelopper tout accès au stockage dans un `try`/`catch`",
        "Connaître les limites : taille, synchronisme, données sensibles"
      ],
      content: [
        {
          type: "lead",
          text: "Une application qui oublie tout au rechargement agace immédiatement. Le navigateur offre deux stockages persistants, synchrones et sans dépendance : `localStorage` (conservé jusqu'à suppression) et `sessionStorage` (vidé à la fermeture de l'onglet). C'est la solution la plus simple pour un thème, un panier ou une liste de tâches."
        },
        { type: "h", level: 2, text: "Une API minuscule qui ne stocke que du texte" },
        {
          type: "p",
          text: "Quatre méthodes suffisent : `setItem(clé, valeur)`, `getItem(clé)`, `removeItem(clé)` et `clear()`. Point crucial : **les valeurs sont toujours des chaînes**. Un objet enregistré directement devient `\"[object Object]\"` — inutilisable. La convention est de passer par `JSON.stringify` à l'écriture et `JSON.parse` à la lecture. `getItem` renvoie `null` quand la clé n'existe pas : c'est votre point de départ pour une valeur par défaut."
        },
        {
          type: "p",
          text: "Tout est texte : `JSON.stringify` à l'écriture, `JSON.parse` à la lecture, et `null` quand la clé est absente."
        },
        {
          type: "list",
          items: [
            "`const CLE = \"formation:reglages\";` définit la clé une seule fois ; le préfixe évite les collisions avec d'autres scripts du domaine.",
            "`const reglages = { theme: \"sombre\", langue: \"fr\" };` prépare l'objet à enregistrer.",
            "`localStorage.setItem(CLE, JSON.stringify(reglages));` convertit l'objet en chaîne JSON avant de l'écrire.",
            "`const texte = localStorage.getItem(CLE);` relit la valeur, qui vaut `null` si la clé est absente.",
            "`const relu = texte ? JSON.parse(texte) : {};` analyse la chaîne et retombe sur un objet vide quand rien n'est stocké ; `relu` contient à nouveau `theme` et `langue`.",
            "`localStorage.removeItem(CLE);` supprime cette seule clé, sans jamais appeler `clear()` sur tout le domaine.",
            "`sessionStorage.setItem(\"etape\", \"3\");` utilise la même API, mais la valeur disparaît à la fermeture de l'onglet."
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "Les limites à connaître avant d'en dépendre",
          text: "Le stockage est **synchrone** : écrire un gros volume bloque le rendu. La limite tourne autour de 5 Mo par origine, et un dépassement lève `QuotaExceededError`. Surtout : `localStorage` est lisible par n'importe quel script de la page — n'y mettez **jamais** de mot de passe, de jeton d'authentification ou de donnée personnelle sensible. Enfin, le mode navigation privée ou une iframe isolée peuvent le rendre totalement indisponible : d'où le `try`/`catch` obligatoire."
        },
        { type: "h", level: 2, text: "Un thème sombre qui survit au rechargement" },
        {
          type: "p",
          text: "Le motif est toujours le même : au chargement, on lit la préférence (avec une valeur par défaut), on l'applique au document, puis on enregistre chaque changement. La lecture est enveloppée dans un `try`/`catch` : si le stockage est bloqué, l'application doit continuer à fonctionner avec le thème par défaut, pas planter. C'est ce qu'on appelle une dégradation gracieuse."
        },
        {
          type: "list",
          items: [
            "Lire avec un repli, appliquer, enregistrer : `const CLE = \"formation:theme\";` et `const racine = document.documentElement;` visent la racine du document, là où le CSS lira le thème ; un conteneur `#app` ferait aussi l'affaire.",
            "`let theme = \"clair\";` fixe la valeur par défaut avant toute lecture.",
            "Le `try` lit `localStorage.getItem(CLE);` et n'accepte que `\"sombre\"` ou `\"clair\"` : on valide avant d'appliquer, une valeur inconnue est ignorée.",
            "Le `catch (erreur)` remet `theme = \"clair\";` : si le stockage est indisponible, le thème par défaut s'applique.",
            "`racine.dataset.theme = theme;` pose l'attribut `data-theme`, que la feuille de styles utilise pour changer les couleurs.",
            "`definirTheme(nouveau)` applique d'abord le thème, puis tente `localStorage.setItem(CLE, nouveau);` dans un `try`.",
            "Si l'écriture échoue, le stockage est bloqué : l'erreur est ignorée et le thème reste appliqué pour cette visite."
          ]
        },
        {
          type: "demo",
          title: "Thème persistant (essayez, puis rechargez)",
          height: 280,
          html: `<div class="carte" id="demo-app" data-theme="clair">
  <p>Réglage actif : <strong id="demo-etat">clair</strong></p>
  <p>
    <button type="button" data-theme="clair">Thème clair</button>
    <button type="button" data-theme="sombre">Thème sombre</button>
  </p>
  <p class="note">Le choix est écrit dans le stockage local du navigateur.</p>
</div>`,
          css: `body { font-family: system-ui, sans-serif; padding: 12px; margin: 0; }
.carte { padding: 14px; border-radius: 10px; border: 1px solid #d1d5db; background: #ffffff; color: #111827; }
.carte[data-theme="sombre"] { background: #111827; color: #f9fafb; border-color: #374151; }
button { padding: 4px 10px; margin-right: 6px; }
.note { font-size: 12px; opacity: 0.7; }`,
          js: `const CLE = "demo-theme";
const app = document.getElementById("demo-app");
const etat = document.getElementById("demo-etat");

function appliquer(theme) {
  app.dataset.theme = theme;
  etat.textContent = theme;
  try {
    window.localStorage.setItem(CLE, theme);
  } catch (erreur) {
    etat.textContent = theme + " (stockage bloque)";
  }
}

let depart = "clair";
try {
  depart = window.localStorage.getItem(CLE) || "clair";
} catch (erreur) {
  depart = "clair";
}
app.dataset.theme = depart;
etat.textContent = depart;

app.addEventListener("click", (event) => {
  const bouton = event.target.closest("button[data-theme]");
  if (!bouton) return;
  appliquer(bouton.dataset.theme);
});`
        },
        { type: "h", level: 2, text: "Sauvegarder et restaurer une liste" },
        {
          type: "p",
          text: "Deux frontières se protègent : ce qui entre est validé, ce qui sort peut échouer sans casser la page."
        },
        {
          type: "list",
          items: [
            "`const CLE = \"formation:taches\";` nomme la clé de stockage.",
            "`charger()` lit la valeur, l'analyse avec `JSON.parse` et renvoie `[]` si la clé est absente ou si le texte est illisible, grâce au `catch`.",
            "`return Array.isArray(donnees) ? donnees : [];` valide la forme : un contenu inattendu repart d'un tableau vide au lieu d'être utilisé.",
            "`sauver(taches)` écrit `JSON.stringify(taches)` et renvoie `true` en cas de succès, `false` si le quota est dépassé ou le stockage bloqué.",
            "`const tache = { id: crypto.randomUUID(), titre: \"Réviser le DOM\", fait: false };` fabrique une tâche dont l'identifiant est unique, sans risque de collision.",
            "`const taches = [...charger(), tache];` ajoute la nouvelle tâche à celles déjà chargées, puis `sauver(taches);` persiste l'ensemble."
          ]
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Préfixez vos clés (`monapp:theme`) pour ne pas écraser celles d'un autre script du domaine",
            "Versionnez le format (`{\"v\":2,\"items\":[]}`) pour pouvoir migrer sans perdre les données",
            "Validez toujours ce que vous relisez : un `JSON.parse` réussi ne garantit pas la bonne forme",
            "Enveloppez lecture et écriture dans un `try`/`catch`, sans jamais bloquer l'interface",
            "Proposez une action pour effacer les données : c'est une exigence de respect de l'utilisateur"
          ]
        },
        {
          type: "p",
          text: "Un dernier réflexe : ne stockez que ce qui est nécessaire. Un identifiant et trois propriétés suffisent pour reconstruire une liste ; mettre en cache tout le HTML de la page rend le format fragile et le débogage pénible. Et pour un vrai besoin de données structurées hors ligne, `IndexedDB` prend le relais quand `localStorage` atteint ses limites — avec une API asynchrone, donc plus complexe."
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Ces réflexes évitent 90 % des bugs de persistance.",
          items: [
            "Sérialiser un objet avant de l'écrire, et le relire avec `JSON.parse`",
            "Fournir une valeur par défaut quand `getItem` renvoie `null`",
            "Envelopper le stockage dans un `try`/`catch` et continuer sans lui",
            "Citer trois limites : taille, synchronisme, confidentialité"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-25",
          title: "Aller-retour JSON",
          difficulty: 1,
          goal: "Convertir une liste d'objets en texte puis la relire pour compter ce qui reste à faire.",
          instructions: [
            "Le tableau `liste` contient deux tâches avec `titre` et `fait`.",
            "Convertissez-le en texte avec `JSON.stringify`, puis relisez-le avec `JSON.parse`.",
            "Filtrez les tâches non terminées et récupérez leurs titres.",
            "Affichez dans `#sortie` : `2 tâches - CSS à faire` (`<nombre relu> tâches - <titres> à faire`)."
          ],
          hint: "On relit depuis `JSON.parse` comme depuis une source réseau : `relu.filter((t) => !t.fait)` puis `.map((t) => t.titre).join(\", \")`.",
          starter: {
            html: `<h2>JSON</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 600; }`,
            js: `const liste = [
  { titre: "HTML", fait: true },
  { titre: "CSS", fait: false }
];

// stringify puis parse
// filtrez les tâches non faites

const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>JSON</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-weight: 600; }`,
            js: `const liste = [
  { titre: "HTML", fait: true },
  { titre: "CSS", fait: false }
];

const texte = JSON.stringify(liste);
const relu = JSON.parse(texte);

const restant = relu
  .filter((t) => !t.fait)
  .map((t) => t.titre)
  .join(", ");

const sortie = document.querySelector("#sortie");
sortie.textContent = \`\${relu.length} tâches - \${restant} à faire\`;`
          },
          checks: [
            "getText('#sortie').includes('2 tâches')",
            "getText('#sortie').includes('CSS')",
            "!/HTML/.test(getText('#sortie'))"
          ],
          checklist: [
            "`JSON.stringify` puis `JSON.parse` sont utilisés",
            "Seules les tâches non faites sont listées",
            "Le nombre de tâches vient du tableau relu"
          ]
        },
        {
          id: "js-ex-26",
          title: "Thème restauré au chargement",
          difficulty: 2,
          goal: "Lire une préférence stockée, l'appliquer via `dataset` et l'enregistrer sans casser l'application.",
          instructions: [
            "La clé de stockage est `theme-formation`. Lisez-la avec `localStorage.getItem` dans un `try`/`catch`.",
            "La valeur par défaut est `sombre` ; n'acceptez que `sombre` ou `clair` comme valeur lue.",
            "Appliquez le thème choisi avec `app.dataset.theme = theme` (le conteneur a déjà `data-theme=\"clair\"`).",
            "Enregistrez le thème retenu avec `setItem` dans un second `try`/`catch`, et affichez dans `#sortie` : `Thème : sombre (enregistré)`."
          ],
          hint: "Deux `try`/`catch` : un pour la lecture (avec le défaut `sombre`), un pour l'écriture. En cas d'échec du stockage, l'affichage doit rester cohérent.",
          starter: {
            html: `<div id="app" data-theme="clair">
  <h2>Tableau de bord</h2>
  <p id="sortie">Aucun réglage enregistré.</p>
</div>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#app[data-theme="sombre"] { background: #111827; color: #f9fafb; padding: 12px; border-radius: 8px; }`,
            js: `const app = document.querySelector("#app");
const sortie = document.querySelector("#sortie");
const CLE = "theme-formation";

// lire la préférence (défaut : sombre) dans un try/catch
// l'appliquer avec app.dataset.theme
// l'enregistrer dans un try/catch`
          },
          solution: {
            html: `<div id="app" data-theme="clair">
  <h2>Tableau de bord</h2>
  <p id="sortie">Aucun réglage enregistré.</p>
</div>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#app[data-theme="sombre"] { background: #111827; color: #f9fafb; padding: 12px; border-radius: 8px; }`,
            js: `const app = document.querySelector("#app");
const sortie = document.querySelector("#sortie");
const CLE = "theme-formation";

let theme = "sombre";
try {
  const enregistre = window.localStorage.getItem(CLE);
  if (enregistre === "sombre" || enregistre === "clair") {
    theme = enregistre;
  }
} catch (erreur) {
  theme = "sombre";
}

app.dataset.theme = theme;

try {
  window.localStorage.setItem(CLE, theme);
} catch (erreur) {
  /* stockage bloqué dans l'aperçu : le thème reste appliqué */
}

sortie.textContent = \`Thème : \${theme} (enregistré)\`;`
          },
          checks: [
            "getAttr('#app', 'data-theme') === 'sombre'",
            "getText('#sortie').toLowerCase().includes('sombre')"
          ],
          checklist: [
            "La lecture est protégée par un `try`/`catch`",
            "Le thème par défaut est `sombre`",
            "L'attribut `data-theme` du conteneur est mis à jour"
          ]
        }
      ]
    },
    {
      id: "js-12",
      title: "Erreurs et debugging",
      minutes: 55,
      summary: "Intercepter les erreurs au bon endroit, lire la console et diagnostiquer les bugs classiques.",
      objectives: [
        "Utiliser `try`/`catch`/`finally` et lever une erreur avec `throw`",
        "Reconnaître `TypeError`, `ReferenceError`, `SyntaxError` et `RangeError`",
        "Exploiter la console, les points d'arrêt et l'onglet Réseau des DevTools",
        "Appliquer une stratégie de test manuel pour les bugs fréquents"
      ],
      content: [
        {
          type: "lead",
          text: "Un bug n'est pas un échec, c'est une information. Encore faut-il savoir où la lire. Une erreur non interceptée arrête le script en cours : tout le code suivant ne s'exécute pas — d'où les pages « à moitié cassées » où seule la moitié supérieure fonctionne."
        },
        { type: "h", level: 2, text: "`try` / `catch` / `finally`" },
        {
          type: "p",
          text: "`try` contient le code risqué, `catch` reçoit l'erreur si elle survient, `finally` s'exécute dans **tous** les cas. On place dans le `try` le minimum utile : une opération fragile (`JSON.parse`, `fetch`, accès au stockage), pas quarante lignes. Le `catch` doit faire quelque chose d'utile : informer l'utilisateur, journaliser, renvoyer une valeur de repli. Un `catch` vide est un bug déguisé en stabilité — l'erreur disparaît et vous chercherez pendant des heures."
        },
        {
          type: "p",
          text: "Un seul point de sortie et un repli explicite : le `try` renvoie la valeur analysée, le `catch` renvoie la sienne."
        },
        {
          type: "list",
          items: [
            "`function lireJSON(texte)` tente `return JSON.parse(texte);` dans le `try` : la valeur analysée sort immédiatement.",
            "Le `catch (erreur)` affiche `\"JSON invalide :\"` avec `erreur.message`, puis renvoie `null`, une valeur de repli explicite.",
            "Le `finally` exécute `console.log(\"lecture terminée\");` après un succès comme après un échec.",
            "`lireJSON('{\"a\":1}');` renvoie un objet contenant la clé `a`, et la console affiche `lecture terminée`.",
            "`lireJSON('{a:1}');` renvoie `null` et affiche le message d'erreur : ce texte n'est pas du JSON valide, les clés doivent être entre guillemets."
          ]
        },
        {
          type: "callout",
          tone: "warning",
          title: "Ne pas avaler les erreurs",
          text: "`catch (e) {}` supprime l'information. Soit vous traitez (message UI, valeur de repli), soit vous rejetez plus haut avec un contexte : `throw new Error(\"chargement échoué\", { cause: e })`. Attention aussi à la portée : le `try`/`catch` d'une fonction ne protège pas l'appel asynchrone d'une autre — un `await` sans `try` dans la fonction appelante laissera la promesse rejetée silencieusement (`Uncaught (in promise)`)."
        },
        { type: "h", level: 2, text: "`throw` et les types d'erreur" },
        {
          type: "p",
          text: "`throw` interrompt l'exécution et remonte jusqu'au premier `catch`. Levez une erreur quand une **précondition est violée** : c'est mieux qu'un retour silencieux qui propage un `undefined`. Les types standard donnent une première indication : `TypeError` (mauvaise nature ou `null`), `ReferenceError` (variable inexistante, souvent une faute de frappe), `SyntaxError` (code ou JSON mal formé), `RangeError` (valeur hors limites). Pour un besoin métier, créez votre propre classe d'erreur : elle sera reconnaissable dans un `catch`."
        },
        {
          type: "p",
          text: "Une erreur qui porte son nom et sa donnée, et un `catch` qui ne traite que ce qu'il reconnaît."
        },
        {
          type: "list",
          items: [
            "`class ErreurValidation extends Error` crée une erreur sur mesure, dont le constructeur reçoit `champ` et `message`.",
            "Il transmet le message au parent avec `super(message);`, puis renseigne `this.name = \"ErreurValidation\"` et `this.champ = champ`.",
            "`function verifierAge(age)` lève `new TypeError(\"L'âge doit être un nombre\")` quand l'argument n'est pas un nombre.",
            "Elle lève `new RangeError(\"L'âge ne peut pas être négatif\")` pour une valeur négative, puis `new ErreurValidation(\"age\", \"Âge invraisemblable\")` au-delà de `130`.",
            "Quand tout est valide, la fonction renvoie simplement `age`.",
            "`verifierAge(-5);` est appelé dans un `try` : le `RangeError` remonte jusqu'au `catch`.",
            "Le `catch` teste `erreur instanceof RangeError` et affiche `\"Saisie hors limites :\"` avec le message.",
            "Toute autre erreur est relancée par `throw erreur` : on ne traite pas ce qu'on ne reconnaît pas, on la laisse remonter."
          ]
        },
        { type: "h", level: 2, text: "Lire la console et poser un `breakpoint`" },
        {
          type: "p",
          text: "Les DevTools (F12) sont votre table de travail. `console.log` affiche une valeur au moment de l'exécution ; `console.table` transforme un tableau d'objets en tableau lisible ; `console.group`/`groupEnd` hiérarchise ; `console.time`/`timeEnd` mesure une durée ; `console.assert` n'affiche que si la condition est fausse. Mieux encore : un `breakpoint` (clic sur le numéro de ligne dans l'onglet Sources) **arrête** le script et vous laisse inspecter chaque variable — infiniment plus précis que dix `console.log`. L'onglet Réseau, lui, montre les appels `fetch` : statut, corps de réponse, durée."
        },
        {
          type: "p",
          text: "Mesurer, grouper, tabuler puis s'arrêter net : l'ordre dans lequel chercher un bug."
        },
        {
          type: "list",
          items: [
            "`const paniers = [...]` fournit les données à inspecter, deux lignes à `40` et `25`.",
            "`console.table(paniers);` affiche le tableau sous forme de grille lisible, colonne par colonne.",
            "`console.group(\"Calcul du total\");` ouvre un groupe indenté, refermé plus loin par `console.groupEnd();`.",
            "À l'intérieur, `paniers.reduce((acc, p) => acc + p.prix, 0);` calcule `65`, et `console.log(\"total\", total);` affiche `total 65`.",
            "`console.time(\"tri\");` démarre un chronomètre, le tri s'exécute sur une copie, et `console.timeEnd(\"tri\");` affiche la durée, par exemple `tri: 0.1ms`.",
            "`console.assert(total === 65, \"Le total attendu est 65\", total);` n'écrit rien quand l'égalité est vraie et signale le problème sinon.",
            "`debugger;` suspend l'exécution à cette ligne si les DevTools sont ouverts, ce qui permet d'inspecter les variables."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Trois outils plus puissants que `console.log`",
          text: "1) Le `breakpoint` conditionnel : clic droit sur une ligne, ajoutez `index > 10` pour ne s'arrêter qu'au bon cas. 2) `console.trace()` : affiche la pile d'appels, parfait pour savoir **qui** a appelé une fonction. 3) Le point d'arrêt sur exception (« Pause on caught exceptions ») : le script s'arrête exactement à la ligne qui lève l'erreur."
        },
        {
          type: "table",
          head: ["Message fréquent", "Cause probable", "Parade"],
          rows: [
            ["`Cannot read properties of null`", "sélecteur sans résultat", "vérifier l'identifiant, tester `if (!el) return`"],
            ["`x is not defined`", "faute de frappe ou portée", "déclarer au bon niveau, relire le nom"],
            ["`Assignment to constant variable`", "réaffectation d'un `const`", "passer à `let` si la valeur doit changer"],
            ["`undefined is not a function`", "mauvaise méthode ou `this` perdu", "vérifier le nom et le contexte d'appel"],
            ["résultat figé malgré la modification", "tableau partagé (référence)", "copier avant de muter"]
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Avant de continuer, vérifiez que vous savez…",
          text: "Une méthode de diagnostic vaut mieux que dix essais au hasard.",
          items: [
            "Encadrer une opération fragile et renvoyer une valeur de repli",
            "Lever une `RangeError` avec un message utile",
            "Placer un `breakpoint` et inspecter une variable",
            "Reproduire un bug en trois étapes écrites avant de modifier le code"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-27",
          title: "JSON invalide",
          difficulty: 1,
          goal: "Intercepter une erreur de parsing et afficher un message exploitable.",
          instructions: [
            "La constante `texte` contient un JSON **invalide** (il manque la fermeture).",
            "Essayez de le lire avec `JSON.parse` dans un `try`.",
            "Dans le `catch`, affichez dans `#sortie` : `JSON invalide (<nom de l'erreur>)`, par exemple `JSON invalide (SyntaxError)`.",
            "Dans le `try`, si le parsing réussit, affichez `Lu : <titre>`."
          ],
          hint: "L'objet d'erreur possède une propriété `name` (ici `\"SyntaxError\"`) et une propriété `message` détaillée.",
          starter: {
            html: `<h2>Parsing</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { color: #b91c1c; font-weight: 600; }`,
            js: `const texte = '{"titre": "CSS",';

// essayez JSON.parse dans un try
// affichez un message dans le catch

const sortie = document.querySelector("#sortie");
sortie.textContent = "";`
          },
          solution: {
            html: `<h2>Parsing</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { color: #b91c1c; font-weight: 600; }`,
            js: `const texte = '{"titre": "CSS",';

const sortie = document.querySelector("#sortie");

try {
  const donnees = JSON.parse(texte);
  sortie.textContent = "Lu : " + donnees.titre;
} catch (erreur) {
  sortie.textContent = \`JSON invalide (\${erreur.name})\`;
}`
          },
          checks: [
            "getText('#sortie').toLowerCase().includes('invalide')",
            "getText('#sortie').includes('SyntaxError')"
          ],
          checklist: [
            "`JSON.parse` est dans un `try`",
            "Le message d'erreur utilise l'objet d'erreur",
            "Aucune exception ne s'échappe du script"
          ]
        },
        {
          id: "js-ex-28",
          title: "Validation avec `throw` et `finally`",
          difficulty: 2,
          goal: "Lever une erreur métier, la rattraper et journaliser proprement avec `finally`.",
          instructions: [
            "Complétez `verifierAge(age)` : si l'âge est négatif, levez une `RangeError` avec le message `âge invalide`.",
            "Écrivez une fonction `tester(age)` qui appelle `verifierAge` dans un `try`.",
            "Dans le `catch`, ajoutez au journal `Refusé : <message>`.",
            "Dans le `finally`, ajoutez `contrôle terminé` au journal.",
            "Appelez `tester(-5)` puis `tester(20)` et affichez le journal joint par ` | `."
          ],
          hint: "Déclarez `const journal = [];` en haut, remplissez-le avec `journal.push(...)`, et affichez avec `journal.join(\" | \")`.",
          starter: {
            html: `<h2>Validation</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; font-size: 13px; }`,
            js: `const journal = [];

function verifierAge(age) {
  // levez une RangeError si age < 0
  return "Âge accepté : " + age;
}

// écrivez tester(age) avec try / catch / finally

const sortie = document.querySelector("#sortie");`
          },
          solution: {
            html: `<h2>Validation</h2>
<p id="sortie">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#sortie { font-family: ui-monospace, monospace; font-size: 13px; }`,
            js: `const journal = [];

function verifierAge(age) {
  if (age < 0) {
    throw new RangeError("âge invalide");
  }
  return "Âge accepté : " + age;
}

function tester(age) {
  try {
    journal.push(verifierAge(age));
  } catch (erreur) {
    journal.push("Refusé : " + erreur.message);
  } finally {
    journal.push("contrôle terminé");
  }
}

tester(-5);
tester(20);

const sortie = document.querySelector("#sortie");
sortie.textContent = journal.join(" | ");`
          },
          checks: [
            "getText('#sortie').toLowerCase().includes('refusé')",
            "getText('#sortie').includes('20')",
            "getText('#sortie').toLowerCase().includes('terminé')"
          ],
          checklist: [
            "`throw new RangeError(...)` est utilisé",
            "Le `finally` ajoute une entrée pour les deux appels",
            "Le journal contient les quatre entrées dans l'ordre"
          ]
        }
      ]
    },
    {
      id: "js-13",
      title: "Mini-application : état, rendu, sauvegarde",
      minutes: 70,
      summary: "Assembler recherche, tri, compteur et persistance dans une application complète et structurée.",
      objectives: [
        "Structurer du code en trois fonctions : `init`, `render` et gestion d'état",
        "Filtrer et trier sans muter les données de référence",
        "Sauvegarder l'état et le restaurer au chargement",
        "Vérifier une checklist de qualité : accessibilité, erreurs, lisibilité"
      ],
      content: [
        {
          type: "lead",
          text: "Vous savez tout ce qu'il faut : variables, tableaux, objets, DOM, événements, stockage. La difficulté restante n'est plus la syntaxe, c'est l'**organisation**. Une mini-application tient en trois idées : un état, une fonction de rendu, des écouteurs qui modifient l'état puis redessinent."
        },
        { type: "h", level: 2, text: "Le plan en trois temps" },
        {
          type: "p",
          text: "Un seul objet `etat` contient la vérité de l'interface : terme de recherche, sens du tri, données. `render()` **reconstruit** l'affichage à partir de l'état, sans jamais lire le DOM pour retrouver une valeur. `init()` branche les écouteurs et déclenche le premier rendu. Cette discipline supprime la classe de bugs la plus fréquente : l'affichage et les données qui divergent parce qu'on a mis à jour l'un sans l'autre."
        },
        {
          type: "steps",
          items: [
            { title: "Définir les données", text: "Un tableau de référence, jamais modifié directement : c'est la source de vérité." },
            { title: "Décrire l'état", text: "Un objet unique et minimal : `{ recherche: \"\", trie: false }`. Tout ce qui est affiché doit être dérivable de cet état." },
            { title: "Écrire `render()`", text: "Il vide la liste, parcourt les données filtrées et triées, recrée les éléments, met à jour le compteur." },
            { title: "Brancher les écouteurs", text: "Chaque interaction ne fait que modifier `etat`, puis appelle `render()`. Aucune manipulation du DOM dans l'écouteur." },
            { title: "Sauvegarder et restaurer", text: "Après chaque changement et au démarrage, avec `JSON.stringify`/`parse` dans un `try`/`catch`." }
          ]
        },
        {
          type: "p",
          text: "Un état, un rendu, un branchement : l'affichage ne relit jamais le DOM pour se mettre à jour."
        },
        {
          type: "list",
          items: [
            "`const articles` garde les données de référence, jamais triées sur place.",
            "`const etat = { recherche: \"\", trie: false };` contient la vérité de l'interface : le filtre courant et l'état du tri.",
            "`selection()` normalise la recherche avec `etat.recherche.trim().toLowerCase()`, puis filtre sur `a.titre.toLowerCase().includes(q)`.",
            "Si `etat.trie` est vrai, la fonction copie avant de trier : `[...resultat].sort((a, b) => a.prix - b.prix)` classe du moins cher au plus cher ; sinon elle renvoie le résultat tel quel.",
            "`render()` appelle `selection()`, vide la liste avec `liste.innerHTML = \"\";`, puis crée un `li` par article.",
            "Le texte de chaque ligne vaut `article.titre + \" — \" + article.prix + \" EUR\"`, et l'élément est ajouté par `liste.append(li)`.",
            "Le rendu termine par `compteur.textContent = visibles.length + \" article(s)\";`, qui annonce le nombre de résultats.",
            "`init()` branche `champ.addEventListener(\"input\", ...)` : chaque frappe met `etat.recherche = champ.value;` à jour, puis appelle `render()`.",
            "`init()` se termine par un premier `render();`, et l'appel final `init();` démarre l'application."
          ]
        },
        {
          type: "callout",
          tone: "tip",
          title: "Une seule source de vérité",
          text: "Si vous vous surprenez à lire `element.textContent` pour savoir quel est le filtre courant, arrêtez : l'état doit contenir cette information. Le DOM est un **rendu**, pas un stockage. Cette règle rend les tests simples, l'annulation possible et le code dix fois plus lisible."
        },
        { type: "h", level: 2, text: "Filtrer et trier sans casser les données" },
        {
          type: "p",
          text: "Copier avant de trier, normaliser avant de comparer : les données d'origine restent intactes."
        },
        {
          type: "list",
          items: [
            "`const filtres = articles.filter((a) => a.prix < 100);` produit une nouvelle liste et laisse `articles` intact.",
            "`const ordonnes = [...filtres].sort((a, b) => a.prix - b.prix);` trie une copie : l'ordre d'origine de `filtres` est préservé.",
            "`const normaliser = (texte) => texte.toLowerCase().normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g, \"\");` met en minuscules, décompose les accents, puis retire les marques combinées.",
            "`normaliser(\"Câble\");` renvoie `\"cable\"` : la comparaison devient insensible à la casse et aux accents.",
            "`articles.filter((a) => normaliser(a.titre).includes(normaliser(recherche)))` compare deux textes normalisés : `Câble` et `cable` se retrouvent."
          ]
        },
        { type: "h", level: 2, text: "Rendre l'interface accessible et vivante" },
        {
          type: "p",
          text: "Dire l'absence de résultat, annoncer le compteur et refléter l'état d'un bouton : l'interface reste lisible sans la voir."
        },
        {
          type: "list",
          items: [
            "`compteur.setAttribute(\"aria-live\", \"polite\");` fait annoncer aux lecteurs d'écran chaque changement du compteur, à la fin de l'énoncé en cours.",
            "Si `visibles.length === 0`, le code crée un `li` dont le texte est `\"Aucun article ne correspond à cette recherche.\"` et l'ajoute à la liste : jamais une liste muette.",
            "`boutonTri.setAttribute(\"aria-pressed\", String(etat.trie));` publie l'état du tri dans l'attribut `aria-pressed`, qui vaut `\"true\"` ou `\"false\"`.",
            "Le champ de recherche reste associé à un libellé : un `label` dont le `for` désigne l'`id` du champ, ici `recherche`.",
            "Le champ lui-même est un `input` de type `search` portant le même `id` : le libellé visible et cliquable remplace un simple `placeholder`."
          ]
        },
        { type: "h", level: 2, text: "Sauvegarder, restaurer, et se remettre d'une erreur" },
        {
          type: "p",
          text: "Dégrader au lieu de planter : le stockage peut manquer ou mentir, et l'application continue."
        },
        {
          type: "list",
          items: [
            "`const CLE = \"monapp:etat\";` nomme la clé qui reçoit l'état.",
            "`sauver()` exécute `localStorage.setItem(CLE, JSON.stringify(etat));` dans un `try`.",
            "Si l'écriture échoue (quota dépassé ou stockage bloqué), l'erreur est ignorée et l'application reste utilisable.",
            "`restaurer()` relit la valeur dans un `try` et sort immédiatement si `texte` est vide, grâce à `if (!texte) return;`.",
            "`const relu = JSON.parse(texte);` analyse la chaîne : un contenu corrompu déclenche le `catch` et les valeurs par défaut sont conservées.",
            "`if (typeof relu.recherche === \"string\")` ne reprend la recherche que si son type est correct.",
            "`if (typeof relu.trie === \"boolean\")` ne reprend l'état du tri que si son type est correct : le stockage peut mentir, on ne lui fait pas confiance."
          ]
        },
        {
          type: "demo",
          title: "La mini-application complète",
          height: 340,
          html: `<h3>Mon catalogue</h3>
<p class="barre">
  <label for="demo-recherche">Rechercher</label>
  <input id="demo-recherche" type="search" placeholder="ex : cla" />
  <button id="demo-tri" type="button">Trier par prix</button>
</p>
<ul id="demo-liste"></ul>
<p id="demo-compteur" aria-live="polite">—</p>`,
          css: `body { font-family: system-ui, sans-serif; padding: 12px; margin: 0; }
.barre { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
ul { padding-left: 18px; }
li { margin: 4px 0; }
#demo-compteur { font-size: 13px; color: #4b5563; }`,
          js: `const articles = [
  { titre: "Casque audio", prix: 79 },
  { titre: "Clavier", prix: 49 },
  { titre: "Souris", prix: 25 },
  { titre: "Câble USB", prix: 9 }
];

const champ = document.getElementById("demo-recherche");
const liste = document.getElementById("demo-liste");
const compteur = document.getElementById("demo-compteur");
const boutonTri = document.getElementById("demo-tri");

const etat = { recherche: "", trie: false };

function visibles() {
  const q = etat.recherche.trim().toLowerCase();
  const resultat = articles.filter((a) => a.titre.toLowerCase().includes(q));
  return etat.trie ? [...resultat].sort((a, b) => a.prix - b.prix) : resultat;
}

function render() {
  const resultat = visibles();
  liste.innerHTML = "";
  for (const article of resultat) {
    const li = document.createElement("li");
    li.textContent = \`\${article.titre} — \${article.prix} EUR\`;
    liste.append(li);
  }
  compteur.textContent = resultat.length === 0
    ? "Aucun article ne correspond."
    : \`\${resultat.length} article(s) affiché(s)\`;
}

champ.addEventListener("input", () => {
  etat.recherche = champ.value;
  render();
});

boutonTri.addEventListener("click", () => {
  etat.trie = !etat.trie;
  boutonTri.setAttribute("aria-pressed", String(etat.trie));
  render();
});

boutonTri.setAttribute("aria-pressed", "false");
render();`
        },
        {
          type: "callout",
          tone: "tip",
          title: "Checklist de qualité avant de livrer",
          text: "Passez-la en revue : chaque ligne évite un retour de bâton.",
          items: [
            "Chaque `querySelector` a un garde-fou ou un identifiant vérifié",
            "Aucun tri ni `splice` sur le tableau de référence",
            "Les états vide, chargement et erreur sont affichés",
            "Le stockage est dans un `try`/`catch`, avec un état par défaut",
            "Le clavier seul suffit : libellés associés, `aria-live` sur les messages",
            "Le code est découpé en `init`, `render` et fonctions nommées, sans variable globale inutile"
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-29",
          title: "Premier rendu",
          difficulty: 1,
          goal: "Écrire une fonction de rendu qui transforme un tableau en liste affichée.",
          instructions: [
            "Le tableau `articles` contient trois objets avec `titre` et `prix`.",
            "Écrivez une fonction `render()` qui vide la liste `#liste` (`liste.innerHTML = \"\"`), puis crée un `li` par article avec le texte `<titre> — <prix> €`.",
            "La fonction doit aussi écrire dans `#compteur` le nombre d'articles suivi de ` articles`.",
            "Appelez `render()` à la fin du script, au chargement."
          ],
          hint: "Vider avant de reconstruire évite les doublons quand `render` est appelé plusieurs fois. Le compteur doit venir de `articles.length`, pas d'un nombre saisi à la main.",
          starter: {
            html: `<h2>Catalogue</h2>
<ul id="liste"></ul>
<p id="compteur" aria-live="polite">0</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#compteur { color: #6b7280; }`,
            js: `const articles = [
  { titre: "Casque", prix: 79 },
  { titre: "Clavier", prix: 49 },
  { titre: "Souris", prix: 25 }
];

const liste = document.querySelector("#liste");
const compteur = document.querySelector("#compteur");

function render() {
  // videz la liste, créez les li et mettez à jour le compteur
}

// appelez render()`
          },
          solution: {
            html: `<h2>Catalogue</h2>
<ul id="liste"></ul>
<p id="compteur" aria-live="polite">0</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#compteur { color: #6b7280; }`,
            js: `const articles = [
  { titre: "Casque", prix: 79 },
  { titre: "Clavier", prix: 49 },
  { titre: "Souris", prix: 25 }
];

const liste = document.querySelector("#liste");
const compteur = document.querySelector("#compteur");

function render() {
  liste.innerHTML = "";
  for (const article of articles) {
    const li = document.createElement("li");
    li.textContent = \`\${article.titre} — \${article.prix} €\`;
    liste.append(li);
  }
  compteur.textContent = articles.length + " articles";
}

render();`
          },
          checks: [
            "countOf('#liste li') === 3",
            "document.querySelector('#liste').textContent.includes('Casque')",
            "getText('#compteur').includes('3')"
          ],
          checklist: [
            "Une fonction `render()` est définie",
            "La liste est vidée avant le rendu",
            "Le compteur affiche 3"
          ]
        },
        {
          id: "js-ex-30",
          title: "Recherche appliquée au rendu",
          difficulty: 2,
          goal: "Dériver l'affichage d'un état de recherche, sans boucle sur les données brutes.",
          instructions: [
            "Le champ `#recherche` contient déjà la valeur `cl` : lisez-la pour initialiser un objet d'état.",
            "Écrivez une fonction `filtrer()` qui renvoie les articles dont le titre contient le terme recherché, sans tenir compte de la casse.",
            "`render()` doit afficher uniquement ces résultats et écrire dans `#compteur` le nombre de résultats.",
            "Appelez `render()` au chargement : avec `cl`, un seul article doit apparaître."
          ],
          hint: "`champ.value.toLowerCase()` puis `titre.toLowerCase().includes(terme)` : les deux côtés doivent être en minuscules. Mettez le terme dans `etat.recherche`, pas dans une variable lue au moment du rendu.",
          starter: {
            html: `<h2>Catalogue filtré</h2>
<input id="recherche" type="search" value="cl" aria-label="Filtrer le catalogue" />
<ul id="liste"></ul>
<p id="compteur" aria-live="polite">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
input { padding: 5px; margin-bottom: 8px; }
#compteur { color: #6b7280; }`,
            js: `const articles = ["Casque", "Clavier", "Souris", "Câble"];

const champ = document.querySelector("#recherche");
const liste = document.querySelector("#liste");
const compteur = document.querySelector("#compteur");

const etat = { recherche: champ.value };

// filtrez puis rendez`
          },
          solution: {
            html: `<h2>Catalogue filtré</h2>
<input id="recherche" type="search" value="cl" aria-label="Filtrer le catalogue" />
<ul id="liste"></ul>
<p id="compteur" aria-live="polite">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
input { padding: 5px; margin-bottom: 8px; }
#compteur { color: #6b7280; }`,
            js: `const articles = ["Casque", "Clavier", "Souris", "Câble"];

const champ = document.querySelector("#recherche");
const liste = document.querySelector("#liste");
const compteur = document.querySelector("#compteur");

const etat = { recherche: champ.value };

function filtrer() {
  const terme = etat.recherche.trim().toLowerCase();
  return articles.filter((nom) => nom.toLowerCase().includes(terme));
}

function render() {
  const resultats = filtrer();
  liste.innerHTML = "";
  for (const nom of resultats) {
    const li = document.createElement("li");
    li.textContent = nom;
    liste.append(li);
  }
  compteur.textContent = resultats.length + " résultat(s)";
}

champ.addEventListener("input", () => {
  etat.recherche = champ.value;
  render();
});

render();`
          },
          checks: [
            "countOf('#liste li') === 1",
            "document.querySelector('#liste').textContent.includes('Clavier')",
            "getText('#compteur').includes('1')"
          ],
          checklist: [
            "La recherche ignore la casse",
            "Seul `Clavier` est affiché",
            "Un écouteur `input` met à jour l'état puis appelle `render()`"
          ]
        },
        {
          id: "js-ex-31",
          title: "Tri, compteur et sauvegarde",
          difficulty: 3,
          goal: "Ajouter un tri sur copie, un compteur accessible et une sauvegarde locale protégée.",
          instructions: [
            "Les trois articles sont fournis et doivent rester dans cet ordre dans le tableau d'origine.",
            "L'état `etat` contient `trie: false` : quand il passe à `true`, `render()` doit afficher les articles **filtrés** triés par prix croissant.",
            "Affichez dans `#compteur` : `<n> article(s) affiché(s)`, avec `aria-live` déjà présent sur le paragraphe.",
            "À la fin de `render()`, sauvegardez l'état avec `JSON.stringify` dans `localStorage` (clé `mini-app-etat`) à l'intérieur d'un `try`/`catch` vide commenté.",
            "Le premier rendu s'exécute au chargement sans tri."
          ],
          hint: "`[...resultats].sort((a, b) => a.prix - b.prix)` trie une copie. Pour la sauvegarde : `window.localStorage.setItem(\"mini-app-etat\", JSON.stringify(etat))` dans un `try`, suivi d'un `catch (erreur) { /* stockage bloqué */ }`.",
          starter: {
            html: `<h2>Mini-app</h2>
<p><input id="recherche" type="search" aria-label="Rechercher" /> <button id="tri" type="button">Trier par prix</button></p>
<ul id="liste"></ul>
<p id="compteur" aria-live="polite">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#compteur { color: #4b5563; font-size: 13px; }`,
            js: `const articles = [
  { titre: "Casque", prix: 79 },
  { titre: "Clavier", prix: 49 },
  { titre: "Souris", prix: 25 }
];

const champ = document.querySelector("#recherche");
const bouton = document.querySelector("#tri");
const liste = document.querySelector("#liste");
const compteur = document.querySelector("#compteur");

const etat = { recherche: "", trie: false };

function articlesVisibles() {
  // filtrez, puis triez sur une copie si etat.trie
  return articles;
}

function render() {
  // affichez, comptez, sauvegardez
}

// écouteurs + premier rendu`
          },
          solution: {
            html: `<h2>Mini-app</h2>
<p><input id="recherche" type="search" aria-label="Rechercher" /> <button id="tri" type="button">Trier par prix</button></p>
<ul id="liste"></ul>
<p id="compteur" aria-live="polite">—</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#compteur { color: #4b5563; font-size: 13px; }`,
            js: `const articles = [
  { titre: "Casque", prix: 79 },
  { titre: "Clavier", prix: 49 },
  { titre: "Souris", prix: 25 }
];

const champ = document.querySelector("#recherche");
const bouton = document.querySelector("#tri");
const liste = document.querySelector("#liste");
const compteur = document.querySelector("#compteur");

const etat = { recherche: "", trie: false };

function articlesVisibles() {
  const terme = etat.recherche.trim().toLowerCase();
  const resultats = articles.filter((a) =>
    a.titre.toLowerCase().includes(terme)
  );
  return etat.trie ? [...resultats].sort((a, b) => a.prix - b.prix) : resultats;
}

function render() {
  const visibles = articlesVisibles();
  liste.innerHTML = "";
  for (const article of visibles) {
    const li = document.createElement("li");
    li.textContent = \`\${article.titre} — \${article.prix} €\`;
    liste.append(li);
  }
  compteur.textContent = \`\${visibles.length} article(s) affiché(s)\`;
  try {
    window.localStorage.setItem("mini-app-etat", JSON.stringify(etat));
  } catch (erreur) {
    /* stockage bloqué : l'application reste utilisable */
  }
}

champ.addEventListener("input", () => {
  etat.recherche = champ.value;
  render();
});

bouton.addEventListener("click", () => {
  etat.trie = !etat.trie;
  render();
});

render();`
          },
          checks: [
            "countOf('#liste li') === 3",
            "getText('#compteur').includes('3')",
            "document.querySelector('#liste').textContent.includes('Souris')"
          ],
          checklist: [
            "Le tri se fait sur une copie du tableau filtré",
            "Le compteur reflète le nombre d'articles affichés",
            "La sauvegarde est protégée par un `try`/`catch`",
            "Le premier rendu a lieu au chargement"
          ]
        }
      ]
    }
  ],
  quiz: {
    title: "Quiz — JavaScript",
    pass: 0.75,
    questions: [
      {
        q: "Que se passe-t-il quand on écrit `const liste = []; liste.push(1);` ?",
        options: [
          "Une erreur : `const` interdit toute modification",
          "Le tableau vaut `[1]` : `const` interdit la réaffectation, pas la mutation",
          "Le tableau reste vide jusqu'à la prochaine déclaration",
          "La modification est ignorée en mode strict"
        ],
        answer: 1,
        explain: "`const` verrouille la **référence**, pas le contenu : on ne peut pas faire `liste = []`, mais `push`, `splice` ou `sort` modifient bien le tableau."
      },
      {
        q: "Que renvoie `typeof null` ?",
        options: ["\"null\"", "\"object\"", "\"undefined\"", "\"boolean\""],
        answer: 1,
        explain: "Bug historique de 1995 conservé pour ne pas casser le Web. Pour tester l'absence de valeur, utilisez `valeur === null`, jamais `typeof valeur === \"object\"`."
      },
      {
        q: "Laquelle de ces comparaisons vaut `true` ?",
        options: ["`0 === \"\"`", "`0 == \"\"`", "`null === undefined`", "`NaN === NaN`"],
        answer: 1,
        explain: "`==` convertit les types : `0 == \"\"` est vrai, tout comme `0 == \"0\"`. Avec `===`, aucune de ces expressions n'est vraie ; `NaN` n'est égal à rien, même à lui-même."
      },
      {
        q: "Quelle est la différence entre `||` et `??` ?",
        options: [
          "Aucune, les deux fournissent une valeur par défaut",
          "`??` ne remplace que `null` et `undefined`, `||` remplace toute valeur falsy",
          "`||` est plus rapide car il ne convertit pas les types",
          "`??` ne fonctionne que dans les template literals"
        ],
        answer: 1,
        explain: "Avec `seuil = 0`, `seuil || 10` donne 10 (0 est falsy) alors que `seuil ?? 10` donne 0. Pour une valeur par défaut, `??` est presque toujours le bon choix."
      },
      {
        q: "Que renvoie `[1, 2, 3].forEach((n) => n * 2)` ?",
        options: ["`[2, 4, 6]`", "`undefined`", "`3`", "Une copie du tableau d'origine"],
        answer: 1,
        explain: "`forEach` sert uniquement à produire un effet (afficher, modifier une variable) : il ne renvoie rien. Pour obtenir une nouvelle liste, utilisez `map`, qui renvoie un tableau."
      },
      {
        q: "Que vaut `[10, 9, 100].sort()` sans fonction de comparaison ?",
        options: ["`[9, 10, 100]`", "`[10, 100, 9]`", "Une erreur, car les nombres ne sont pas triables", "`[100, 10, 9]`"],
        answer: 1,
        explain: "Sans comparator, `sort` convertit en chaînes et compare alphabétiquement : '10' < '100' < '9'. Fournissez toujours `(a, b) => a - b` pour des nombres."
      },
      {
        q: "Pourquoi écouter les clics sur le `<ul>` plutôt que sur chaque `<li>` ?",
        options: [
          "Parce que les `<li>` ne peuvent pas recevoir d'écouteur",
          "Parce que l'événement remonte au parent : un seul écouteur couvre les lignes existantes et futures",
          "Parce que cela empêche la propagation vers le document",
          "Parce que cela rend le CSS plus prioritaire"
        ],
        answer: 1,
        explain: "C'est la délégation d'événements : le clic *bubble* jusqu'au parent, et `event.target.closest(\"li\")` identifie la ligne concernée. Un écouteur suffit pour mille lignes."
      },
      {
        q: "Quelle méthode empêche un formulaire de recharger la page ?",
        options: [
          "`event.stopPropagation()`",
          "`event.preventDefault()`",
          "`form.reset()`",
          "`event.stopImmediatePropagation()`"
        ],
        answer: 1,
        explain: "`preventDefault()` annule le comportement natif (navigation, envoi HTTP). `stopPropagation()` empêche seulement la remontée de l'événement, sans bloquer l'envoi."
      },
      {
        q: "Vous affichez un nom saisi par l'utilisateur dans une liste. Que choisissez-vous ?",
        options: [
          "`liste.innerHTML = \"<li>\" + nom + \"</li>\"` car c'est plus court",
          "`createElement` + `textContent` (ou `textContent` sur la liste) : aucun HTML n'est interprété",
          "`innerHTML` après avoir retiré les espaces du nom",
          "`innerHTML` dans un `try`/`catch` : l'erreur sera interceptée"
        ],
        answer: 1,
        explain: "`innerHTML` interprète la chaîne et ouvre la porte à une injection (XSS) : un attribut `onerror` suffit. `textContent` affiche le texte tel quel, sans exécuter quoi que ce soit."
      },
      {
        q: "Après `const reponse = await fetch(url);`, quelle étape faut-il encore faire ?",
        options: [
          "`const donnees = await reponse.json();`",
          "Rien : `reponse` est déjà l'objet JavaScript",
          "`const donnees = JSON.stringify(reponse);`",
          "`const donnees = reponse.body;`"
        ],
        answer: 0,
        explain: "`fetch` renvoie une réponse HTTP, pas des données. Il faut convertir le corps : `.json()`, qui renvoie une promesse et ne peut être appelé qu'une seule fois. Testez aussi `reponse.ok` avant."
      },
      {
        q: "Que peut-on stocker dans `localStorage` ?",
        options: [
          "Des objets JavaScript quelconques",
          "Uniquement des chaînes : il faut sérialiser avec `JSON.stringify`",
          "Des nombres, des booléens et des tableaux, mais pas des objets",
          "Des fichiers binaires jusqu'à 5 Mo"
        ],
        answer: 1,
        explain: "Tout est converti en chaîne : un objet enregistré tel quel devient `\"[object Object]\"`. La convention est `JSON.stringify` à l'écriture, `JSON.parse` à la lecture, avec valeurs par défaut."
      },
      {
        q: "Que se passe-t-il avec `const f = objet.methode; f();` ?",
        options: [
          "Cela fonctionne : la méthode se souvient de son objet",
          "`this` vaut `undefined` (mode strict) : la méthode ne sait plus sur quel objet agir",
          "`this` vaut `window` dans tous les cas",
          "Cela fonctionne seulement si la méthode est une flèche"
        ],
        answer: 1,
        explain: "Le destinataire de l'appel est perdu : `this` n'est plus lié à `objet`. Appelez `objet.methode()`, ou utilisez `bind`, ou déclarez la méthode en flèche pour capturer le `this` englobant."
      }
    ]
  }
});
