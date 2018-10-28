var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.756327,
            lng: 4.853837
        },
        zoom: 15
    });
}

get("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=a443018b15d69f18cf8c629825d3a24a12bb79f3", function (response) {
    var stations = JSON.parse(response);
    stations.forEach(function (station) {
        
        var icon = "";
        if (station.status === 'OPEN') {
            icon = "/public/images/biker_green.png";
        } else {
            icon = "/public/images/biker_red.png";
        }

        var marker = new google.maps.Marker({
            position: station.position,
            map: map,
            title: station.name,
            icon: icon
        });
        
        marker.addListener("click", function () {
            
        })
    })
})
