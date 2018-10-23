var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48.859444,
            lng: 2.366209
        },
        zoom: 16
    });
}
