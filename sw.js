var urlsToCache = [
    "/",
    "/assets/css/style.css",
    "/assets/font/OpenSans-Regular.ttf",
    "/assets/js/showdown.min.js",
    "/assets/logo/loading.svg",
    "/assets/logo/logo.png",
    "/assets/logo/logo.svg",
    "/assets/logo/manifest_logo.png",
    "/assets/logo/manifest_logo.svg",
    "/article.html",
    "/article.json?version=1",
    "/favicon.ico",
    "/index.html",
    "/index.js",
    "/manifest.webmanifest",
];
caches.delete("version-1")
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("version-2")
            .then(c => {
                console.log("Cache opened");
                return c.addAll(urlsToCache);
            })
    )
})
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request)
            .then(r => {
                if (r) {
                    return r;
                }
                console.log(e.request)
                return fetch(e.request)
                    .catch(er => {
                        console.log(`Error: ${er}`);
                        console.log(e.request.url)
                        return caches.match(e.request);
                    })
            })
    )
})
self.addEventListener('activate', e => {
    var cWl = [];
    cWl.push("version-2");
    e.waitUntil(
        caches.keys().then(c => {
            return Promise.all(
                c.map(c_ => {
                    if (!cWl.includes(c_)) {
                        return caches.delete(c_);
                    }
                })
            );
        })
    );
});