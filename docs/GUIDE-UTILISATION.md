# Guide d'utilisation

> Tout ce qu'il faut savoir pour apprendre efficacement avec cette formation.

*Version 1.0 · formation HTML, CSS & JavaScript — ce guide est aussi consultable dans l'application, page « Guide d'utilisation ».*

## Sommaire

1. Bien démarrer
2. L'interface en un coup d'œil
3. Étudier une leçon
4. Réaliser un exercice
5. Comprendre la vérification automatique
6. Indices, corrigés et codes de départ
7. Quiz de fin de module
8. Le projet final guidé
9. Suivre sa progression
10. Raccourcis et gestes utiles
11. Dépannage
12. Après la formation

---

## 1. Bien démarrer

Cette formation s'adresse à **toute personne qui veut savoir construire un site web moderne** : débutant complet, étudiant, reconversion, ou développeur qui veut consolider ses bases. Aucun prérequis technique n'est exigé — seulement un ordinateur, un navigateur récent et de la régularité.

Le parcours est organisé en **trois modules** (HTML, CSS, puis JavaScript) qui se suivent, et se termine par un **projet final** guidé. Les modules sont volontairement progressifs : chaque leçon n'utilise que des concepts déjà expliqués. Sauter des leçons est possible, mais c'est le meilleur moyen de buter au milieu du module.

| Élément | Ce que vous obtenez |
| --- | --- |
| Module 1 — HTML | 10 leçons · 24 exercices · 12 questions de quiz — structurer, sémantique, formulaires, accessibilité |
| Module 2 — CSS | 12 leçons · 29 exercices · 12 questions de quiz — Flexbox, Grid, responsive, animations |
| Module 3 — JavaScript | 13 leçons · 31 exercices · 12 questions de quiz — DOM, événements, asynchrone, localStorage |
| Projet final | 8 étapes vérifiées — un portfolio responsive complet, téléchargeable |
| Durée estimée | environ 40 heures de cours + 4 heures de projet, à votre rythme |

### Ce dont vous avez besoin

- Un navigateur récent : **Chrome, Edge, Firefox ou Safari** (Chrome ou Edge recommandés pour les outils de développement).
- Un éditeur de texte pour aller plus loin : **VS Code** est gratuit et idéal pour la suite.
- Aucune installation : la formation fonctionne hors ligne, dans le navigateur.
- Un dossier où enregistrer vos essais si vous voulez garder votre propre code.

### Un rythme réaliste

Comptez **1 h à 1 h 30 par jour** pour finir en 5 à 6 semaines, ou **3 h par semaine** pour un parcours plus étalé. Ce qui compte n'est pas la vitesse mais la pratique : lire sans faire ne fait pas apprendre à coder.

| Semaine | Objectif | Repères |
| --- | --- | --- |
| 1 | Module HTML — leçons 1 à 5 | Vous écrivez une page complète sans aide |
| 2 | Module HTML — leçons 6 à 10 + quiz HTML | Formulaire accessible, quiz ≥ 75 % |
| 3 | Module CSS — leçons 1 à 6 | Vous stylisez une page et maîtrisez Flexbox |
| 4 | Module CSS — leçons 7 à 12 + quiz CSS | Grille responsive, animations sobres |
| 5 | Module JavaScript — leçons 1 à 8 | Vous manipulez le DOM et les événements |
| 6 | Module JavaScript — leçons 9 à 13 + quiz + projet | Portfolio livré, étape par étape |

> **Conseil — La méthode qui marche**
> Pour chaque leçon : lisez une fois sans coder, puis **refermez la page et réécrivez les exemples de mémoire**, enfin faites les exercices. L'effort de rappel est ce qui crée la mémoire — relire passivement donne seulement l'impression de comprendre.

- [ ] J'ai un navigateur à jour et un dossier pour mes essais
- [ ] J'ai choisi un créneau régulier dans ma semaine
- [ ] J'ai compris que je commence par le module HTML et que je ne saute pas les exercices

---

## 2. L'interface en un coup d'œil

L'application tient sur une seule page : la colonne de gauche sert de **sommaire permanent**, la zone centrale affiche la leçon, l'exercice ou le quiz en cours, et la barre du haut rappelle où vous êtes.

| Zone | Ce qu'elle contient |
| --- | --- |
| Colonne de gauche | Accueil, les 3 modules (repliables), le projet final, la progression et ce guide |
| Barre de progression | Votre avancement global, juste sous le logo (`Parcours … %`) |
| Barre du haut | Fil d'Ariane, bouton **Reprendre** (dernière activité), bascule clair / sombre |
| Zone centrale | Le contenu : leçon, exercice avec éditeur, quiz, projet ou tableau de bord |
| Colonne de droite | Le **sommaire de la leçon** (masqué sur écran étroit) |

### Lire la colonne de gauche

- Chaque module se replie en cliquant sur son nom : la petite flèche et le compteur `0/10` rappellent son avancement.
- La **pastille verte** à gauche d'une leçon signifie « leçon terminée ».
- Cliquer sur **Vue d'ensemble** d'un module ouvre sa page : objectifs, sommaire, durée, quiz.
- Les entrées **Projet final**, **Ma progression** et **Guide d'utilisation** sont toujours visibles en bas.

Sur téléphone et tablette, la colonne de gauche se cache derrière le **bouton de menu** en haut à gauche. Sur ordinateur, ce même bouton **affiche ou masque** la colonne (l'état choisi est mémorisé d'une visite à l'autre) : pratique pour travailler les exercices sur toute la largeur de l'écran. Le reste de l'interface s'adapte automatiquement, y compris l'éditeur.

> **À noter — Rien ne se perd**
> Vos réponses, vos brouillons de code et vos scores sont enregistrés **dans le navigateur** au fil de l'eau. Vous pouvez fermer l'onglet et revenir plus tard : le bouton **Reprendre** vous replace là où vous étiez.

### Clair ou sombre ?

Le bouton soleil / lune en haut à droite (ou en bas de la colonne de gauche) bascule entre **thème sombre et thème clair**, et mémorise votre choix. Les diapositives de code restent sur fond sombre dans les deux thèmes pour garder un contraste confortable.

---

## 3. Étudier une leçon

Une leçon suit toujours la même structure, ce qui rend la lecture prévisible et rapide :

1. **En-tête et objectifs** — Le titre, la durée estimée et **ce que vous saurez faire** à la fin. Lisez les objectifs d'abord : ils donnent le filtre de lecture.
2. **Le cours** — Texte explicatif, tableaux comparatifs, blocs de code prêts à copier (bouton **Copier**), encadrés de pièges fréquents et de bonnes pratiques.
3. **Les démos vivantes** — Un encadré avec le code à gauche et le **résultat réel** à droite. Les onglets HTML / CSS / JS montrent la source ; le code est exécuté, rien n'est une image.
4. **Le sommaire latéral** — À droite, les titres de la leçon. Un clic y amène directement (écrans larges uniquement).
5. **Valider et continuer** — Le bouton **Marquer comme terminée** met à jour votre progression ; les flèches **Précédent / Suivant** enchaînent les leçons.
6. **Les exercices** — En bas de chaque leçon, 2 à 4 exercices classés du plus simple au plus difficile, avec leur difficulté (1 à 3 traits).

> **Attention — Ne lisez pas comme un roman**
> Arrêtez-vous à chaque bloc de code : **recopiez-le dans un éditeur ou dans l'exercice suivant** en changeant une valeur, et observez ce qui casse. Une ligne comprise en testant vaut dix lignes lues.

### Faut-il tout mémoriser ?

Non. Un développeur professionnel consulte la documentation **tous les jours** pour les noms exacts de propriétés ou d'attributs. Ce que vous devez retenir, c'est le **modèle mental** : à quoi sert une balise sémantique, comment fonctionne la cascade, ce qu'est un événement, d'où vient l'ordre d'exécution en JavaScript. Le reste se retrouve dans la leçon ou sur MDN.

---

## 4. Réaliser un exercice

Chaque exercice est un petit laboratoire : un énoncé à gauche, un **éditeur sur trois onglets** et un **aperçu en direct**. Le code de départ est fonctionnel mais incomplet — c'est à vous de le compléter.

1. **Lire l'énoncé et les critères** — Le panneau de gauche donne le but, les étapes numérotées, puis les **critères de réussite**. Ce sont exactement ces critères qui seront vérifiés : lisez-les avant d'écrire.
2. **Écrire dans le bon onglet** — Onglet **HTML** pour la structure, **CSS** pour le style, **JS** pour le comportement. Les trois sont recopiés dans la même page d'aperçu, dans cet ordre : style, contenu, script.
3. **Observer l'aperçu** — L'aperçu se met à jour automatiquement (case **Live**). Pour forcer un rechargement : bouton **Relancer** ou `Ctrl + Entrée`. Si vous décochez Live, relancez vous-même après vos modifications.
4. **Vérifier** — Le bouton **Vérifier** relance l'aperçu puis teste chaque critère. Chaque ligne indique ✓ (réussi) ou × (à corriger), et une erreur technique s'affiche le cas échéant.
5. **Corriger et recommencer** — Corrigez dans l'éditeur et revérifiez autant de fois que nécessaire. Aucun essai n'est compté contre vous.
6. **Valider** — Quand tous les critères passent, l'exercice est marqué **validé** et enregistré dans votre progression. Le bouton **Suivant** vous mène à l'exercice d'après.

### Ce que fait l'éditeur pour vous

- **Coloration syntaxique** par langage, avec numéros de ligne (boutons **N°** pour masquer les numéros et **Couleurs** pour désactiver la coloration).
- **Indentation automatique** : `Entrée` conserve l'indentation et ajoute deux espaces après `{`, `:` ou `>` ; `Tab` insère deux espaces ; `Maj + Tab` enlève un niveau.
- **Brouillon automatique** : votre code est enregistré pendant que vous tapez. Revenir sur l'exercice plus tard restaure votre version.
- **Ouvrir** : ouvre l'aperçu complet dans un nouvel onglet, utile pour tester en plein écran ou avec les outils du navigateur.
- **Plein écran de travail** : la zone d'aperçu est redimensionnable à la souris (poignée en bas de l'éditeur).

> **Conseil — Le bon réflexe**
> Écrivez d'abord **la plus petite chose qui marche**, puis complétez critère par critère. Un exercice réussi en trois étapes vaut mieux qu'un exercice parfait écrit d'un coup… qui ne fonctionne pas.

- [ ] J'ai lu les critères avant d'écrire
- [ ] Je vérifie plutôt que de deviner
- [ ] Je n'ai pas peur de casser mon code : le bouton de réinitialisation existe

---

## 5. Comprendre la vérification automatique

La vérification ne compare pas votre code caractère par caractère à un corrigé — ce serait absurde, il existe mille façons correctes d'écrire la même page. Elle exécute votre code dans une **page de test isolée** et vérifie le **résultat observable** : présence des éléments, textes, attributs, styles calculés, comportements au chargement.

Conséquence directe : **toute solution qui produit le résultat demandé est acceptée**, même très différente du corrigé. Vous pouvez nommer vos classes comme vous voulez, dans l'ordre que vous voulez, avec ou sans indentation particulière.

### « Mon critère échoue alors que ça a l'air bon »

| Cause fréquente | Ce que vous vérifiez |
| --- | --- |
| Le texte ne correspond pas | Casse, accents, espaces en trop : `getText` normalise les espaces mais pas les accents ; comparez mot à mot avec l'énoncé |
| Sélecteur différent | Le critère cherche une balise précise (`h1`, `nav a`, `p.prix`). Un `div` à la place d'un `nav` ne compte pas |
| Style non appliqué | Ouvrez les outils du navigateur (**F12**) sur l'aperçu : une règle barrée est perdante, une règle grisée est invalide |
| JavaScript inopérant | Une erreur dans le script interrompt tout ce qui suit : regardez la console, corrigez d'abord l'erreur |
| Attribut manquant | Beaucoup de critères portent sur `alt`, `href`, `type`, `aria-*`, `for`/`id` — relisez l'énoncé |
| Balise en double | Deux `h1` ou deux `main` font échouer un critère de quantité : il n'en faut qu'un |

1. Relisez le libellé du critère en échec : il décrit exactement ce qui est contrôlé.
2. Comparez avec la ligne « expression » affichée sous le critère : c'est le test réel, en clair.
3. Inspectez l'aperçu avec **F12** (clic droit → Inspecter) : l'élément existe-t-il ? le style s'applique-t-il ?
4. Si le code de l'aperçu semble figé, cliquez **Relancer** (ou `Ctrl + Entrée`).
5. Utilisez le bouton **Indice** ; en dernier recours, le **Corrigé**.

> **À noter — Un critère = une compétence**
> Les critères ne sont pas des cases à cocher arbitraires : chacun correspond à une pratique du métier (texte alternatif, structure sémantique, `label` associé à un champ, focus visible…). Les réussir, c'est déjà écrire du code professionnel.

---

## 6. Indices, corrigés et codes de départ

Trois boutons vous accompagnent, à utiliser dans cet ordre :

| Bouton | Quand l'utiliser | Ce qu'il fait |
| --- | --- | --- |
| Indice | Après 10 à 15 minutes de blocage | Ouvre une piste de réflexion, sans donner la solution |
| Corrigé | Quand vous avez essayé sincèrement | Affiche deux options : charger le corrigé dans l'éditeur, ou revenir à votre code |
| Réinitialiser (flèche circulaire) | Si votre code est devenu illisible | Restaure le code de départ de l'exercice |

> **Attention — Comment utiliser un corrigé sans perdre le bénéfice**
> Ne vous contentez pas de le regarder. Chargez-le, **cherchez ce que vous aviez raté**, puis cliquez sur **Réinitialiser** et réécrivez l'exercice de mémoire. Un corrigé lu n'apprend presque rien ; un corrigé réécrit est acquis.

Le code de départ n'est jamais vide : il contient un contexte HTML crédible (une page, un formulaire, une carte). Votre travail consiste à le transformer, comme face à une demande réelle. Si vous partez de zéro pour chaque exercice, vous passerez à côté de l'essentiel.

---

## 7. Quiz de fin de module

Chaque module se termine par un quiz de **12 questions** à choix unique, avec un seuil de réussite à **75 %**.

1. Cochez une réponse par question, puis cliquez sur **Valider mes réponses**. Toutes les questions doivent être répondues.
2. Chaque question est corrigée immédiatement : la bonne réponse est surlignée en vert, votre erreur en rouge, avec une **explication**.
3. Votre score s'affiche avec la mention **Module validé** si vous atteignez le seuil.
4. Le **meilleur score** est conservé : un essai moins bon ne remplace jamais un meilleur résultat.
5. **Recommencer** relance le quiz à zéro pour réviser.

> **Conseil — Un quiz n'est pas une évaluation**
> C'est un outil de diagnostic. Si vous échouez sur les mêmes thèmes, retournez à la leçon correspondante — le quiz vous dit précisément quoi relire. Un quiz raté puis réussi est bien plus formateur qu'un quiz réussi du premier coup.

Réussir les trois quiz et valider vos exercices fait de vous quelqu'un capable de produire un site complet : c'est exactement ce que teste le projet final.

---

## 8. Le projet final guidé

Le projet final assemble tout : vous construisez un **portfolio responsive** en huit étapes, chacune vérifiable et corrigée.

| Étape | Contenu |
| --- | --- |
| 1 — Structure sémantique | En-tête, navigation, contenu principal, pied de page, lien d'évitement |
| 2 — Contenu | Accroche, projets, compétences, formulaire de contact |
| 3 — Fondations CSS | Variables, thème clair/sombre, en-tête collant, boutons |
| 4 — Grid & Flexbox | Grille de cartes, listes, formulaire, largeur maximale et tailles fluides |
| 5 — Responsive | Media queries, menu mobile, grille sur une colonne |
| 6 — Animations | Transitions, apparition, survol des cartes, micro-interactions |
| 7 — JavaScript | Thème persistant, menu accessible, année automatique, apparition au défilement |
| 8 — Finitions | Focus visible, `aria-live`, `prefers-reduced-motion`, relecture |

Le code de départ de chaque étape correspond à **l'état final de l'étape précédente** : vous avancez de façon incrémentale, comme dans un vrai projet. Le bouton **Vérifier l'étape** contrôle les critères de l'étape courante ; **Voir le code de référence** charge la version attendue pour comparer.

- La colonne de gauche liste les étapes : cliquez pour revenir à une étape passée, les travaux sont conservés.
- Le bouton **Télécharger le site** produit un fichier HTML autonome (CSS et JS inclus) que vous pouvez envoyer ou publier.
- La **grille de qualité finale** en bas de page récapitule les critères d'un site professionnel : structure, accessibilité, responsive, code lisible.

> **Conseil — Personnalisez**
> Ne recopiez pas le portfolio tel quel : remplacez le nom, les projets et les couleurs. Le code doit devenir **le vôtre** — c'est ce que vous montrerez à un employeur ou à un client.

---

## 9. Suivre sa progression

La page **Ma progression** rassemble tout : pourcentage global, détail par module, scores de quiz, étapes du projet et badges obtenus.

Le pourcentage de chaque module se calcule sur l'ensemble des unités : **leçons terminées**, **exercices validés** et **quiz réussi**. Un module à 100 % suppose donc que le quiz a été réussi au seuil de 75 %.

### Les badges

- **Premiers pas** : Terminer la première leçon.
- **Fondations HTML** : Terminer toutes les leçons du module HTML.
- **Styliste confirmé** : Terminer toutes les leçons du module CSS.
- **Logique maîtrisée** : Terminer toutes les leçons du module JavaScript.
- **Sérieux** : Valider 10 exercices.
- **La moitié du chemin** : Valider la moitié de tous les exercices.
- **Quiz réussi (×3)** : Obtenir 75 % à chacun des quiz HTML, CSS et JavaScript.
- **Projet livré** : Terminer toutes les étapes du projet final.
- **Parcours terminé** : Atteindre 100 % de la formation.

### Sauvegarder, transférer, recommencer

- **Exporter** télécharge un fichier JSON avec votre progression et vos brouillons.
- **Importer** recharge ce fichier : utile pour changer d'ordinateur, de navigateur, ou après un nettoyage.
- **Réinitialiser** efface tout (une confirmation est demandée). L'export est votre filet de sécurité : faites-le avant.
- Les données restent **sur votre machine**, dans le stockage local du navigateur. Aucune information n'est envoyée à un serveur.
- En navigation privée, les données disparaissent à la fermeture de la fenêtre : exportez si besoin.

> **À noter — Pourquoi ma progression ne suit pas d'un navigateur à l'autre ?**
> Chaque navigateur possède son propre stockage. Ouvrir la formation dans Chrome puis dans Firefox donne deux progressions distinctes. Utilisez le même navigateur, ou exportez puis importez.

---

## 10. Raccourcis et gestes utiles

| Raccourci ou geste | Effet |
| --- | --- |
| `Ctrl + Entrée` (ou `Cmd + Entrée`) | Relancer immédiatement l'aperçu |
| `Tab` | Insérer deux espaces dans l'éditeur |
| `Maj + Tab` | Retirer un niveau d'indentation |
| `Entrée` | Nouvelle ligne avec la même indentation (deux espaces en plus après `{`, `:` ou `>`) |
| `F5` | Recharger la page de la formation (la progression est conservée) |
| **Échap** | Fermer le menu latéral sur téléphone |
| Bouton de menu (haut à gauche) | Masquer / afficher la colonne de gauche sur ordinateur ; ouvrir le menu sur téléphone |
| Clic sur un titre du sommaire | Aller à la section correspondante de la leçon |
| Clic sur **Reprendre** (barre du haut) | Revenir à la dernière leçon ou au dernier exercice ouvert |
| Mise à la taille en bas de l'éditeur | Agrandir la zone d'écriture |

Dans l'éditeur, la coloration et la numérotation ne modifient jamais votre code : ce sont deux couches d'affichage. Si la coloration vous gêne (lecteur d'écran, contraste, préférence personnelle), désactivez-la via le bouton **Couleurs**.

---

## 11. Dépannage

Les problèmes les plus fréquents et leur solution immédiate :

1. **L'aperçu reste vide** — Cliquez sur **Relancer** (ou `Ctrl + Entrée`). Si rien ne change, vérifiez l'onglet **JS** : une erreur de syntaxe au chargement peut empêcher tout le reste de s'exécuter. Ouvrez les outils du navigateur (`F12`) → Console pour lire le message.
2. **Un critère refuse de passer** — Lisez l'expression affichée sous le critère : elle indique précisément la balise, le texte ou le style attendu. Comparez avec votre aperçu (clic droit → Inspecter). L'indice donne la piste dans 9 cas sur 10.
3. **Le texte comparé ne correspond pas** — Les accents et la ponctuation comptent, la casse non ; les espaces multiples sont normalisés. Recopiez le texte demandé mot pour mot depuis l'énoncé.
4. **Ma progression a disparu** — Vous avez peut-être changé de navigateur, de profil, utilisé une fenêtre de navigation privée, ou réinitialisé les données du site. Utilisez **Importer** si vous aviez exporté votre sauvegarde.
5. **Rien ne s'enregistre** — Certains environnements bloquent le stockage local (mode entreprise, navigation très restreinte). Un message l'annonce ; la formation reste utilisable, mais la progression est perdue à la fermeture. Passez par un navigateur standard ou lancez la formation avec le petit serveur local.
6. **Le menu est invisible sur téléphone** — Touchez le bouton menu en haut à gauche. Sur ordinateur, élargissez la fenêtre : la colonne de gauche réapparaît au-delà d'environ 860 pixels.
7. **Les animations me gênent** — La formation respecte automatiquement le réglage système « réduire les animations ». Aucune animation n'est indispensable à la compréhension.
8. **L'ouverture du fichier ne se comporte pas comme prévu** — Ouvrez plutôt la formation via **Lancer.cmd** (ou `node start-server.mjs`) : cela sert la page depuis une adresse locale `http://127.0.0.1:4173` et évite les restrictions propres à l'ouverture directe d'un fichier.

> **Piège — Ne restez jamais bloqué plus de 20 minutes**
> Passez à l'exercice suivant, revenez plus tard : le cerveau résout souvent en arrière-plan. Et si un critère vous semble vraiment impossible, notez-le — mais vérifiez d'abord que votre code produit bien le résultat demandé dans l'aperçu, visuellement.

---

## 12. Après la formation

À la fin du parcours, vous savez écrire une page structurée, la styler, l'adapter à tous les écrans et la rendre interactive. Voilà comment transformer ces acquis en compétence durable :

1. **Refaites le projet final sans regarder les corrigés**, avec votre propre sujet (association, commerce, événement).
2. **Construisez deux autres pages** : une page de connexion (formulaire + validation JS) et une liste filtrable (tableau de données + recherche).
3. **Prenez l'habitude des outils du navigateur** : Inspecteur, Console, onglet Réseau, émulation mobile.
4. **Versionnez votre code** avec Git et publiez sur GitHub — un portfolio se juge autant sur le code que sur le rendu.
5. **Apprenez à lire la documentation** : MDN pour le HTML/CSS/JS, `web.dev` pour la performance et l'accessibilité, le validateur du W3C pour le HTML, `caniuse.com` pour la compatibilité.

### Et ensuite ?

| Direction | Pourquoi |
| --- | --- |
| Approfondir l'accessibilité | C'est un différenciateur immédiat sur le marché et une exigence légale croissante |
| Un framework (React, Vue…) | Utile quand une interface devient complexe ; les bases HTML/CSS/JS restent le socle |
| Un peu de back-end (Node, base de données) | Pour rendre un site réellement dynamique (comptes, formulaires enregistrés) |
| Performance et SEO technique | Ce qui transforme un joli site en site qui fonctionne en conditions réelles |

> **Objectif — Le critère de réussite**
> Vous avez réussi quand, devant une maquette ou une idée, vous savez **par où commencer** : la structure HTML d'abord, la mise en page ensuite, l'interactivité seulement si elle sert l'utilisateur. Le reste n'est que de la pratique.

> On n'apprend pas à coder en lisant du code, mais en écrivant du code qu'on ne sait pas encore écrire.
>
> — Le seul conseil qui vaille

---

*Document généré depuis `content/guide.js` — ne pas éditer directement.*