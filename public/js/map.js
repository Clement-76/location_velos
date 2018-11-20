var map = {
    apiKey: "a443018b15d69f18cf8c629825d3a24a12bb79f3",
    locations: [],

    init: function (bookingObj, ville) {
        this.url = "https://api.jcdecaux.com/vls/v1/stations?contract=" + ville + "&apiKey=" + this.apiKey;
        this.bookingObj = bookingObj;
        this.getStations();
    },

    initMap: function () {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 45.756327,
                lng: 4.853837
            },
            zoom: 15,
            gestureHandling: 'greedy'
        });
    },

    getStations: function () {
        get(this.url, function (response) {
            var stations = JSON.parse(response);
            stations.forEach(function (station) {

                var icon = "";
                if (station.status === 'OPEN' && station.available_bikes > 0) {
                    icon = "/public/images/biker_green.png";
                } else {
                    icon = "/public/images/biker_red.png";
                }

                var marker = new google.maps.Marker({
                    position: station.position,
                    map: this.map,
                    title: station.name,
                    icon: icon,
                    click: function () {
                        this.map.setCenter(station.position);
                        this.map.setZoom(20);

                        if (station.status === 'OPEN' && station.available_bikes > 0) {
                            $("#book").show();
                            $("#book").on("click", this.bookingObj.nextStep);
                            $("#step_two h3 i").on("click", this.bookingObj.previousStep);
                        } else {
                            $("#book").hide();
                        }

                        this.bookingObj.setInformations(station);
                    }
                });
                this.locations.push(marker);

                marker.addListener("click", marker.click.bind(this));
            }.bind(this));

            var markerCluster = new MarkerClusterer(this.map, this.locations, {
                imagePath: '/public/images/m'
            });
        }.bind(this));
    }
}
