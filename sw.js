var urlsToCache = [
    "/",
    "/index.html",
    "/index.js",
    "/article.json",
    "/style.css",
    "/logo.png",
    "/article.html",
    "/showdown.min.js"
];
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("version-1")
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
    cWl.push("version-1");
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