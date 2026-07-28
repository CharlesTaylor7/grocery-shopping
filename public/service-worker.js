const ASSET_CACHE = "asset_v1";
const DATA_CACHE = "data_v1";
const ASSETS = ["/manifest.json", "/pwa-icon.png"];
const BASE_ROUTE = "/grocery-shopping"

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(ASSET_CACHE).then((cache) => {
      return cache.addAll(ASSETS.map(url => `${BASE_ROUTE}${url}`));
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== ASSET_CACHE && key !== DATA_CACHE) {
            return caches.delete(key);
          }
        }),
      )
    ),
  );

  self.clients.claim();
});

async function fetchWithCache(request) {
  // only intercept GET requests
  // only intercept http requests
  if (
    request.method !== "GET" || request.url.startsWith("chrome-extension://")
  ) {
    if (!navigator.onLine) throw new Error("Offline");
    return await fetch(request);
  }

  // all offline requests use the cache
  if (!navigator.onLine) {
    return await caches.match(request);
  }

  const assets = await caches.open(ASSET_CACHE);
  const asset = await assets.match(request);
  if (asset) return asset;

  // all online requests are put into the cache first before responding
  const dataCache = await caches.open(DATA_CACHE);

  // cache any 20x status code
  const response = await fetch(request);
  if (response.ok) {
    await dataCache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  event.respondWith(fetchWithCache(event.request));
});
