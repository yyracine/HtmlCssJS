# Formation Web — HTML, CSS & JavaScript

Application interactive d'apprentissage du développement web : **3 modules**, des cours détaillés,
des exercices progressifs avec vérification automatique et corrigés, un quiz par module et un
**projet final guidé** (portfolio responsive).

> Objectif : rendre l'apprenant autonome — capable d'écrire un HTML sémantique et accessible,
> de styler avec un CSS moderne (Flexbox, Grid, responsive, animations) et de dynamiser une page
> avec le JavaScript du navigateur — puis de livrer un site web complet.

---

## Démarrage (aucune installation)

**Option 1 — la plus simple :** double-cliquer sur `index.html`. Tout fonctionne hors ligne,
sans serveur, sans dépendance, sans build.

**Option 2 — serveur local (recommandé) :** double-cliquer sur `Lancer.cmd`, ou :

```bash
node start-server.mjs          # → http://127.0.0.1:4173
node start-server.mjs 8080     # autre port
```

Node.js 18+ est suffisant. Aucun `npm install` n'est nécessaire.

---

## Ce que contient le parcours

| Module | Contenu | Volume |
|---|---|---|
| **1 · HTML** | Structure, sémantique, texte, liens & images, listes & tableaux, formulaires (base et avancé), médias, accessibilité & SEO, bonnes pratiques | 10 leçons · ~22 exercices · 12 questions de quiz |
| **2 · CSS** | Cascade & spécificité, sélecteurs, box model, unités & variables, typographie, Flexbox, Grid, positionnement, responsive, transitions & animations, composants modernes, organisation du CSS | 12 leçons · ~26 exercices · 12 questions de quiz |
| **3 · JavaScript** | Variables & types, conditions, boucles, fonctions, tableaux & objets, DOM, événements, classes & modules, asynchrone & `fetch`, localStorage, erreurs & debugging, mini-application | 13 leçons · ~28 exercices · 12 questions de quiz |
| **Projet final** | Portfolio responsive guidé en 8 étapes, avec grille de qualité | 8 étapes vérifiées |

Chaque leçon comporte : objectifs, explications du *pourquoi*, blocs de code colorés et copiables,
**démos exécutables** (code + aperçu), encadrés de pièges fréquents, critères « à vérifier », puis
2 à 4 exercices **progressifs**.

## Les fonctionnalités de l'application

- **Éditeur de code intégré** : 3 onglets HTML / CSS / JS, coloration syntaxique, numéros de ligne,
  indentation automatique, `Ctrl + Entrée` pour relancer, aperçu en direct dans une iframe isolée.
- **Vérification automatique des exercices** : les critères sont évalués dans la page d'aperçu
  (sélecteurs, textes, styles calculés, interactions). Chaque critère affiche son résultat.
- **Indices et corrigés** : un indice à la demande, un corrigé chargeable dans l'éditeur, et le
  retour au code de départ.
- **Progression sauvegardée** en `localStorage` : leçons terminées, exercices validés, brouillons de
  code, meilleurs scores de quiz, étapes du projet, thème clair/sombre. Export / import en JSON.
- **Quiz notés** par module, avec explication de chaque réponse et score conservé.
- **Badges et tableau de progression** : avancement par module, global, badges déblocables.
- **Projet final téléchargeable** : export du site complet en un fichier HTML autonome.
- **Thème clair / sombre**, **colonne de navigation repliable** (état mémorisé, bouton en haut à
  gauche), navigation responsive, accessible au clavier (lien d'évitement, focus visibles).

## Structure du dépôt

```
index.html                 Coquille de l'application (une seule page)
start-server.mjs           Serveur statique local (zéro dépendance)
assets/css/app.css         Design system complet (tokens, composants, responsive)
assets/js/ui.js            Échappement, markdown en ligne, coloration, icônes, toasts
assets/js/store.js         Catalogue + progression persistée (localStorage)
assets/js/render.js        Rendu des blocs de cours, des démos, des listes
assets/js/editor.js        Bac à sable de code, aperçu live, moteur de vérification
assets/js/views.js         Vues : accueil, module, leçon, exercice, quiz, projet, progression
assets/js/app.js           Routeur (hash) et chrome de l'application
content/meta.js            Métadonnées du parcours
content/module-html.js     Contenu du module HTML
content/module-css.js      Contenu du module CSS
content/module-js.js       Contenu du module JavaScript
content/project.js         Projet final guidé (étapes, starter, corrigés, checks)
content/guide.js           Guide d'utilisation intégré (12 sections)
docs/CONTENT-SCHEMA.md     Contrat de contenu (à respecter pour ajouter du contenu)
docs/GUIDE-UTILISATION.md  Guide d'utilisation hors ligne (généré)
tools/validate-content.mjs Contrôle structurel du contenu (Node)
tools/export-guide.mjs     Génère docs/GUIDE-UTILISATION.md depuis content/guide.js
tools/selftest.html        Auto-test dans le navigateur (vérifie les corrigés)
tools/layout-check.html    Audit de mise en page (débordements, éléments visibles)
tools/interaction-check.html  Parcours utilisateur joués dans le navigateur
tools/verify.ps1           Lance toute la vérification (résultats dans tools/_out/)
```

## Guide d'utilisation

Un **guide d'utilisation intégré** est accessible depuis la colonne de gauche ou l'adresse
`index.html#/guide`. Il répond aux questions concrètes : à qui s'adresse la formation, comment
lire une leçon, mener un exercice, comprendre un critère refusé, utiliser les indices et corrigés,
passer un quiz, avancer dans le projet final, sauvegarder sa progression, raccourcis clavier,
dépannage, et quoi faire après.

- **Dans l'application** : page `#/guide` (sommaire latéral, bouton « Imprimer / PDF »).
- **Hors ligne** : [`docs/GUIDE-UTILISATION.md`](docs/GUIDE-UTILISATION.md), généré depuis
  `content/guide.js` avec `node tools/export-guide.mjs` — une seule source, jamais désynchronisée.

## Ajouter ou modifier du contenu

Tout le contenu est décrit par des objets JavaScript dans `content/*.js`. Le contrat complet
(types de blocs, champs obligatoires, format des checks, règles pédagogiques) est documenté dans
[`docs/CONTENT-SCHEMA.md`](docs/CONTENT-SCHEMA.md).

Contrôles disponibles :

```bash
node tools/validate-content.mjs        # structure : ids, blocs, checks, quiz, étapes
node --check content/module-html.js    # syntaxe JS de chaque fichier de contenu
```

Puis, dans le navigateur : ouvrir `tools/selftest.html` — la page exécute **chaque corrigé et
chaque code de départ** dans une iframe et affiche les vérifications en échec (résumé
`modules / leçons / exercices / checks / échecs`). C'est le test de référence avant de livrer.

## Contrôle qualité automatisé

```bash
pwsh -File tools/verify.ps1                 # tout : syntaxe + structure + navigateur
pwsh -File tools/verify.ps1 -Only node      # syntaxe JS + validation du contenu
pwsh -File tools/verify.ps1 -Only selftest  # les 84 corrigés + codes de départ dans Chrome
pwsh -File tools/verify.ps1 -Only layout    # 30 pages × 3 tailles d'écran (débordements, éléments clés)
pwsh -File tools/verify.ps1 -Only interactions  # parcours réels : éditeur → vérifier → progression, quiz, projet
pwsh -File tools/verify.ps1 -Only shots     # 7 captures d'écran dans tools/_out/
```

Dernier état connu : **337 vérifications d'exercices au vert**, 0 échec de rendu, 30/30 pages
sans anomalie de mise en page, et tous les parcours d'interaction validés.

| Outil | Rôle |
|---|---|
| `tools/validate-content.mjs` | Contrôle structurel du contenu (Node, sans navigateur) |
| `tools/selftest.html` | Exécute corrigés + codes de départ, vérifie les checks |
| `tools/layout-check.html` | Mesure le DOM rendu (débordements, éléments visibles, tailles) |
| `tools/interaction-check.html` | Joue les parcours utilisateur dans le navigateur |
| `tools/verify.ps1` | Orchestre le tout et écrit les résultats dans `tools/_out/` |

## Notes techniques

- **Zéro dépendance, zéro build** : HTML, CSS et JavaScript natifs. Les fichiers de contenu sont
  chargés par balise `<script>` (pas de `fetch`), ce qui permet l'ouverture directe en `file://`.
- Le moteur de vérification exécute du code de l'apprenant dans une **iframe d'aperçu** (sans accès
  réseau). Aucune donnée n'est envoyée à un serveur ; la progression reste dans le navigateur.
- Accessibilité : structure sémantique, `aria-*` sur les contrôles, contrastes, `prefers-reduced-motion`.
