---
layout: null
---
var CACHE_NAME = 'domi-cache-v4';
var urlsToCache = [
{% for page in site.pages %}{% unless page.url contains '404' %}  '{{ page.url | remove: ".html" }}',
{% endunless %}{% endfor %}
  '/images/error.png',
  '/css/main.css',
  '/css/main_green.css',
  '/css/home.css',
  '/social_media/main.css',
  '/js/postprocess.js',
  '/js/scrolling.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }

      return fetch(event.request).then(
        function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          var responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache);
          });
            
          return response;
        }
      );
    }).catch(function() {
      return caches.match('/offline');
    })
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
