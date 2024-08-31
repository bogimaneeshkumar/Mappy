// If serviceWorker.js is installed then this fn will handled  and it will run 0nly once ie before intallling once installed nothing happens 
// ehenver this file is changed from server etc this runs again 

let CACHE_NAME = 'Mappy WebApp-v1.1';

  


 // whenver service worker changes it will not updated automatically to do so close tab and open but creates bad user experience so skipwaiting is needed


 // adding caches to make sure it becomes installable

 self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll([
        '/',
        '/index.html',
        '/index.js',
        '/style.css',
        'http://mt3.google.com/vt/' , // try to cache all images so that no need 
        'http://mt2.google.com/vt/',  // try to cache all images so that no need 
        'http://mt1.google.com/vt/',  // try to cache all images so that no need 
        'http://mt0.google.com/vt/',  // try to cache all images so that no need 
        'https://c.tile.openstreetmap.org/',
        'https://b.tile.openstreetmap.org/',
        'https://a.tile.openstreetmap.org/',
       
      ])),
    );
  });
  
  // listening to active event to activate unregister and then register by reloading page   

  self.addEventListener('activate', function(event) {
    console.log('Service worker has been activated')
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });


  // this code shows add to home screen button in chrome
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });
  

  // 4 - Message
// Here we wait for a MessageEvent to fire, if the message contains skipWaiting we should execute that method.
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') return skipWaiting();
});
