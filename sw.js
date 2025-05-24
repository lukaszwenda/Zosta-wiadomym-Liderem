const CACHE_NAME = "zsl-pwa-v1";
const urlsToCache = [
  "./",
  "index.html",
  "abeg.html",
  "quiz.html",
  "style.css",
  "script.js",
  "manifest.json",
  "First Page.png",
  "2page.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
