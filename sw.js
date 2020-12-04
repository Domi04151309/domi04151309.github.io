---
layout: null
---
var CACHE_NAME = 'domi-cache-{{ site.time | date: "%Y-%m-%d-%H:%M" }}';
var urlsToCache = [
  '/',
  '/offline',
  '/images/error.svg',
  '/css/main.min.css',
  '/css/blue.min.css',
  '/css/home.min.css',
  '/social_media/main.min.css',
  '/js/scrolling.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(
        response => {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          var responseToCache = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }
      );
    }).catch(() => {
      return caches.match('/offline');
    })
  );
});

self.addEventListener('activate', event => {

  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
