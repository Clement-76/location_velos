var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.756327,
            lng: 4.853837
        },
        zoom: 15,
        gestureHandling: 'greedy'
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
            icon: icon,
            click: function () {
                map.setCenter(station.position);
                map.setZoom(20);

                if (station.status === 'OPEN') {
                    $("#state_station").text("Station ouverte");
                    $("#book").show();

                    $("#book").on("click", booking.nextStep);
                    $("#step_two h3 i").on("click", booking.previousStep);
                } else {
                    $("#state_station").text("Station fermée");
                    $("#book").hide();
                }
                
                booking.setInformations(station);
            }
        });

        marker.addListener("click", marker.click);
    })
})
