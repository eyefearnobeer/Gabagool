const CACHE_NAME = "gabagool-pwa-v1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",

  "./Graphics/Splash Graphic.png",
  "./Graphics/Gabagool Text-Splash.png",
  "./Graphics/street Graphic.png",
  "./Graphics/sando.png",

  "./Graphics/Tony Graphics/Tony Front.png",
  "./Graphics/Tony Graphics/Tony Left.png",
  "./Graphics/Tony Graphics/Tony Right.png",
  "./Graphics/Tony Graphics/Tony_Left_1.png",
  "./Graphics/Tony Graphics/Tony_Left_2.png",
  "./Graphics/Tony Graphics/Tony_Right_1.png",
  "./Graphics/Tony Graphics/Tony_Right_2.png",

  "./Graphics/Enemy 1 Graphics/Enemy 1 Left.png",
  "./Graphics/Enemy 1 Graphics/Enemy 1 Right.png",
  "./Graphics/Enemy 1 Graphics/Enemy_1_Left_1.png",
  "./Graphics/Enemy 1 Graphics/Enemy_1_Left_2.png",
  "./Graphics/Enemy 1 Graphics/Enemy_1_Right_1.png",
  "./Graphics/Enemy 1 Graphics/Enemy_1_Right_2.png",
  "./Graphics/Enemy 1 Graphics/Enemy_1_Shoot.png",

  "./Club Graphics/CLUB Setting.png",
  "./Club Graphics/Lady Graphics/Dancer Front.PNG",
  "./Club Graphics/Lady Graphics/Dancer Side.PNG",
  "./Club Graphics/Lady Graphics/Dancer Back.PNG",

  "./Sounds/score.mp3",
  "./Sounds/damage.wav",
  "./Sounds/death.wav",
  "./Sounds/pistol shot.mp3",
  "./Sounds/Gaba_1_Power_up.wav",
  "./Sounds/bada-bing-theme.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return response;
      }).catch(() => cached);
    })
  );
});
