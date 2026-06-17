const CACHE_NAME = "manguito-ia-v1";

const urlsToCache = [
"/",
"/index.html",
"/offline.html",
"/style.css",
"/app.js",
"/icon.png",
"/manifest.json"
];

self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
);
});

self.addEventListener("fetch", event => {

if (event.request.mode === "navigate") {

event.respondWith(
  fetch(event.request)
    .catch(() => caches.match("/offline.html"))
);

return;

}

event.respondWith(
caches.match(event.request)
.then(response => response || fetch(event.request))
);

});
