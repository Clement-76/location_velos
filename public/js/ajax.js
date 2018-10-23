function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", function () {
        if (request.status >= 200 && request.status < 400) {
            callback(request.responseText);
        } else {
            console.error(request.status + " " + request.statusText + " " + url);
        }
    })
    request.addEventListener("error", function () {
        console.error("Erreur réseau avec l'url " + url);
    })
    request.send();
}