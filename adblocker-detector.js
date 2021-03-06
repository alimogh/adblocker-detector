function detectAdBlock(callback) {
    var done = false;
    window.__adblocker__ = false;

    var adscript = document.createElement('script');
        adscript.type = 'text/javascript';
        adscript.async = false;
        adscript.src = '//ad.yieldmanager.com/imp';
        adscript.onload = loadHandler;
        adscript.onreadystatechange = readStateHandler;
        adscript.onerror = errorHandler;

    try { document.getElementsByTagName('head')[0].appendChild(adscript); }
    catch(err) { document.body.appendChild(adscript); }

    function readStateHandler() {
        if (done) return;
        var state = adscript.readyState;
        if (state === "complete") loadHandler();
    }
    function loadHandler() {
        if (!done) {
            done = true;
            window.__adblocker__ = false;
            callback(false);
        }
    }
    function errorHandler() {
        if (!done) {
            done = true;
            window.__adblocker__ = true;
            callback(true);
        }
    }
}