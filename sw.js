/* =========================================================================
   sw.js — Service Worker de la formation (installation PWA + hors ligne).

   Stratégie :
   - pré-cache à l'installation de tous les fichiers statiques de l'app ;
   - « stale-while-revalidate » pour les fichiers du site : réponse immédiate
     depuis le cache, puis mise à jour en arrière-plan (la version la plus
     récente est utilisée à la visite suivante) ;
   - « réseau d'abord, cache en secours » pour le reste ;
   - navigation hors ligne → repli sur index.html (l'app gère le routage
     par hash) ;
   - les anciens caches sont purgés à l'activation.

   Note : bump SW_VERSION à chaque livraison pour forcer la mise à jour
   chez les utilisateurs déjà installés.
   ========================================================================= */
const SW_VERSION = "v1";
const CACHE = `formation-web-${SW_VERSION}`;

const PRECACHE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/css/app.css",
  "assets/js/ui.js",
  "assets/js/store.js",
  "assets/js/render.js",
  "assets/js/editor.js",
  "assets/js/views.js",
  "assets/js/app.js",
  "content/meta.js",
  "content/module-html.js",
  "content/module-css.js",
  "content/module-js.js",
  "content/project.js",
  "content/guide.js",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon-maskable-512.png",
  "assets/icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // hors périmètre : réseau seul.

  // Navigation : réseau d'abord ; hors ligne, repli sur index.html
  // (l'app est routée par hash, donc index.html couvre toutes ses URLs).
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("index.html")));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);

  const network = fetch(request)
    .then((response) => {
      // On ne met en cache que les réponses valides (pas les 404/500).
      if (response && response.ok && response.type === "basic") {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached); // hors ligne : la réponse sert de secours.

  // Réponse immédiate depuis le cache si possible, sinon on attend le réseau.
  return cached || network;
}
