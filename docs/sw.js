/* Service worker: guarda la app en el movil para que abra sin internet.
   Los videos NO pasan por aqui — viven en IndexedDB dentro del propio movil.

   OJO con la estrategia: la primera version servia SIEMPRE desde la copia
   guardada, asi que una vez instalada la app no volvia a mirar el servidor
   nunca y se quedaba congelada. Ahora:
     - la pagina (navegacion / index.html) va a la RED primero, y solo tira
       de la copia si no hay conexion;
     - el resto de ficheros propios se sirven rapido de la copia pero se
       refrescan por detras para la proxima vez;
     - las fuentes de Google, que no cambian, se quedan cacheadas.
   Al cambiar VERSION se borra todo lo viejo. */
const VERSION = '2026-09-11.2';
const CACHE = 'kaos-plantillas-' + VERSION;
const ASSETS = [
  './',
  './index.html',
  './mp4-muxer.js',
  './usage.js',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* la app puede pedir que se active una version recien instalada */
self.addEventListener('message', e => {
  if (e.data === 'saltar-espera') self.skipWaiting();
  if (e.data === 'que-version') {
    e.source && e.source.postMessage({ version: VERSION });
  }
});

const guardar = (req, res) => {
  if (res && res.status === 200 && res.type !== 'opaque') {
    const copia = res.clone();
    caches.open(CACHE).then(c => c.put(req, copia)).catch(() => {});
  }
  return res;
};

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  const propio = url.origin === self.location.origin;
  const fuentes = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  if (!propio && !fuentes) return;

  const esPagina = req.mode === 'navigate' ||
    (propio && (url.pathname.endsWith('/') || url.pathname.endsWith('.html')));

  /* La pagina: red primero. Es lo que evita quedarse con una version vieja. */
  if (esPagina) {
    e.respondWith(
      fetch(req).then(res => guardar(req, res))
        .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  /* Fuentes: no cambian nunca, copia primero. */
  if (fuentes) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => guardar(req, res)))
    );
    return;
  }

  /* Lo demas propio: sirve la copia ya, pero refresca por detras. */
  e.respondWith(
    caches.match(req).then(hit => {
      const red = fetch(req).then(res => guardar(req, res)).catch(() => null);
      return hit || red.then(r => r || new Response('', { status: 504 }));
    })
  );
});
