const HEADER_CONTENT_TYPE = 'Content-Type';
const HEADER_ETAG = 'Etag';

const SPEED_CACHE_NAME = 'domi-speed';
const OFFLINE_CACHE_NAME = 'domi-offline';

const OFFLINE_CACHE_CONTENT_TYPES = [
  'application/javascript',
  'font/',
  'image/',
  'text/css'
];

const OFFLINE_PAGE = '/offline';
const OFFLINE_RESOURCES = [
  OFFLINE_PAGE,
  '/images/cloud_off.svg'
];

/**
 * @param {Request} request
 * @param {Response | undefined} speedCacheItem
 * @returns {Promise<Response | null>}
 */
async function getResponse(request, speedCacheItem) {
  try {
    return await fetch(
      request,
      speedCacheItem
        ? {
          headers: {
            'If-None-Match': speedCacheItem.headers.get(HEADER_ETAG) ?? ''
          }
        }
        : {}
    );
  } catch {
    return null;
  }
}

/**
 * @param {Cache} speedCache
 * @param {Cache} offlineCache
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<void>}
 */
async function updateCache(speedCache, offlineCache, request, response) {
  const promises = [];
  const hostname = new URL(request.url).hostname.toLocaleLowerCase();

  if (
    response.headers.has(HEADER_ETAG)
  ) promises.push(speedCache.put(request, response.clone()));
  if (
    hostname !== 'localhost' &&
    OFFLINE_CACHE_CONTENT_TYPES.some(
      contentType => (
        response.headers.get(HEADER_CONTENT_TYPE) ?? ''
      ).toLowerCase().includes(contentType)
    )
  ) promises.push(offlineCache.put(request, response.clone()));

  await Promise.all(promises);
}

/**
 * @param {{request: Request}} event
 * @returns {Promise<Response|undefined>}
 */
async function onFetch(event) {
  const [offlineCache, speedCache] = await Promise.all([
    caches.open(OFFLINE_CACHE_NAME),
    caches.open(SPEED_CACHE_NAME)
  ]);
  const [offlineCacheItem, speedCacheItem] = await Promise.all([
    offlineCache.match(event.request),
    speedCache.match(event.request)
  ]);

  if (offlineCacheItem) return offlineCacheItem;

  const response = await getResponse(event.request, speedCacheItem);

  if (response === null) {
    const offlinePage = await offlineCache.match(OFFLINE_PAGE);
    if (!offlinePage) throw new Error('Invalid cache.');
    return offlinePage;
  }

  if (response.status === 304) return speedCacheItem;

  if (
    !response.ok ||
    !event.request.url.startsWith('http') ||
    event.request.method !== 'GET'
  ) return response;

  await updateCache(speedCache, offlineCache, event.request, response);

  return response;
}

/**
 * @returns {Promise<void>}
 */
async function onActivate() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
  const offlineCache = await caches.open(OFFLINE_CACHE_NAME);
  await offlineCache.addAll(OFFLINE_RESOURCES);
}

// eslint-disable-next-line sonarjs/post-message
self.addEventListener('message', event => {
  // @ts-expect-error Missing worker types in context
  if (event.data.action === 'skipWaiting') globalThis.skipWaiting();
});

self.addEventListener('fetch', event => {
  // @ts-expect-error Missing worker types in context
  event.respondWith(onFetch(event));
});

self.addEventListener('activate', event => {
  // @ts-expect-error Missing worker types in context
  event.waitUntil(onActivate());
});
