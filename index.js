if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => { console.log('ServiceWorker registration successful with scope: ', registration.scope) })
            .catch(err => { console.log('ServiceWorker registration failed: ', err) });
    });
}
const checkOnlineStatus = async () => {
    try {
        const online = await fetch(`/google0d0804a11aec577f.html?random=${Math.round(Math.random() * 100000)}`);
        return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
        return false; // definitely offline
    }
};
checkOnlineStatus().then(v => {
    if (v) {
        document.getElementById("offlineIndi").style.display = "none"
    } else {
        document.getElementById("offlineIndi").style.display = "block"
        caches.open("version-1")
            .then(cache => cache.keys())
            .then(keys => {
                var data = keys.map(req => { return req.url })
                console.log(data)
                document.querySelectorAll("div.blogitem a").forEach((elm) => {
                    if (data.includes(new URL(elm.getAttribute("href"), document.baseURI).href)) {} else {
                        elm.parentElement.classList.add("disabled")
                    }
                    
                })
            })
    }
})