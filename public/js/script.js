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
            click: function (event) {
                map.setCenter(station.position);
                map.setZoom(20);

                if (station.status === 'OPEN') {
                    $("#state_station").text("Station ouverte");
                    $("#book").css("visibility", "visible");

                    $("#book").on("click", function () {
                        $("#step_one").hide();
                        $("#step_two").show(0);
                        $("#step_two").css("right", "0");
                    })

                    $("#step_two h3 i").on("click", function () {
                        $("#step_two").css("right", "-120%");
                        $("#step_two").delay(500).hide(0);
                        $("#step_one").delay(500).show(0);
                    })
                } else {
                    $("#state_station").text("Station fermée");
                }

                $("#name_station").text(station.name);
                $("#address_station").text(station.address);
                $("#available_bikes").text(station.available_bikes);
                $("#available_bike_stands").text(station.available_bike_stands);
            }
        });

        marker.addListener("click", marker.click);
    })
})
