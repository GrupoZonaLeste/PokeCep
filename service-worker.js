const CACHE_NAME = 'cache-v1';
//Salvando assets no cache
const urlsToCache = [
  '/Frontend/CSS/cadastro.css',
  '/Frontend/CSS/cadastroPokeCep.css',
  '/Frontend/CSS/lista.css',
  '/Frontend/CSS/login.css',
  '/Frontend/HTML/index.html',
  '/Frontend/HTML/cadastro.html',
  '/Frontend/HTML/lista.html',
  '/Frontend/HTML/cadastroPokeCEP.html',
  '/Frontend/images/4814407.jpg',
  '/Frontend/images/placeholder_1514017.png',
  '/Frontend/images/pokeball_419467.png'
];
//instalando Service Worker/ Abrindo Cache e adicionando assets
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});
//Atualiza service Worker / deleta cache antigo
self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
// Ativado quando requisições forem feitas
self.addEventListener('fetch', event => {
  const requestURL = new URL(event.request.url);

  // Check if the request is for Pokemon API
  if (requestURL.origin === 'http://localhost:8000' && requestURL.pathname.startsWith('/Pokemon/')) {
    // If it is, add JWT token to the request
    event.respondWith(
      (async () => {
        const token = await getTokenFromIndexedDB();
        const urlWithToken = new URL(event.request.url);
        urlWithToken.searchParams.append('token', token);

        const modifiedRequest = new Request(urlWithToken, {
          method: event.request.method,
          headers: event.request.headers,
          body: event.request.method !== 'GET' && event.request.method !== 'HEAD' ? await event.request.clone().blob() : null,
          mode: event.request.mode,
          credentials: event.request.credentials,
          cache: event.request.cache,
          redirect: event.request.redirect,
          referrer: event.request.referrer,
          referrerPolicy: event.request.referrerPolicy,
          integrity: event.request.integrity
        });

        try {
          // Fetch the modified request
          const networkResponse = await fetch(modifiedRequest);
          return networkResponse;
        } catch (error) {
          console.error('Network error:', error);
          // Respond with a custom offline page or a cached resource
          return caches.match(event.request).catch(() => new Response('Offline', { status: 503 }));
        }
      })()
    );
  } else {
    // For other requests, check cache first and then fetch from network
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          // Serve from cache if available
          return response;
        }
        // Fetch from network
        return fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          // Cache the response
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      }).catch(() => {
        // Respond with offline page if fetch fails
        return caches.match('/Frontend/HTML/index.html').catch(() => new Response('Offline', { status: 503 }));
      })
    );
  }
});



async function getTokenFromIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("tokenDB", 1);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const tokenStore = db.transaction("tokens", "readonly").objectStore("tokens");
            const getRequest = tokenStore.get("jwt_token");

            getRequest.onsuccess = () => {
                if (getRequest.result) {
                    resolve(getRequest.result.token);
                } else {
                    resolve(null);
                }
            };

            getRequest.onerror = () => {
                reject("Error fetching token from IndexedDB");
            };
        };

        request.onerror = () => {
            reject("Error opening IndexedDB");
        };
    });
}
