importScripts('/pwa/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('domi').then(function(cache) {
      return cache.addAll([
        '/',
        '/css/home.css',
        '/css/main.css',
        '/images/header_bg.jpg',
        '/images/logo.png',
        '/images/home_bg.jpg',
        '/images/logo_big.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});