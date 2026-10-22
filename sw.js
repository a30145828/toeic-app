/*
 * Service Worker：讓 App 沒有網路也能打開。
 *
 * 做法（stale-while-revalidate）：先用手機裡存好的檔案馬上打開 App，
 * 同時在背景下載最新版本；所以網站更新後，「下一次」打開 App 就會是新版。
 * 修改這個檔案的檔案清單時，請把 VERSION 的數字加 1。
 */
const VERSION = "v1";
const CACHE = "toeic600-" + VERSION;
const FILES = [
  "./", "index.html", "style.css", "app.js", "storage.js", "cloud-config.js", "grammar.js",
  "words-level1.js", "words-level2.js", "words-level3.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("toeic600-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // 只處理本網站的檔案；Firebase 登入、雲端資料庫等外部連線不經過這裡
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const update = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      if (cached) {
        event.waitUntil(update); // 背景更新，下次打開就是新版
        return cached;
      }
      const res = await update;
      return res || Response.error();
    })
  );
});
