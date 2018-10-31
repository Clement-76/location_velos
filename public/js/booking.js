var booking = {
    actualStep: 1,
    previousStep: function () {
        $("#step_two").css("right", "-120%");
        //because transition-duration = 0.5s in css
        $("#step_two").delay(500).hide(0);
        $("#step_one").delay(500).show(0);
        booking.actualStep = 1;
    },

    nextStep: function () {
        $("#step_one").hide(0);
        $("#step_two").show(0);
        $("#step_two").css("right", "0");
        booking.actualStep = 2;
    },

    setInformations: function (station) {
        if (this.actualStep === 2) {
            this.previousStep();
        }
        $(".name_station").text(station.name);
        $("#address_station").text(station.address);
        $("#available_bikes").text(station.available_bikes);
        $("#available_bike_stands").text(station.available_bike_stands);
    },

    book: function (event) {
        event.preventDefault();
    }
}

$(".booking_form form").on("submit", booking.book);
