console.log("Service worker loaded...");

const CACHE_NAME = "v1";
const urlsToChache = ["/", "/client.js", "/vendors~client.js"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToChache))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(thisCacheName => {
          console.log(thisCacheName);
          if (thisCacheName !== CACHE_NAME) {
            caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.response))
  );
});

self.addEventListener("push", e => {
  const data = e.data.json();

  console.log("Push has been recieved...");

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});
