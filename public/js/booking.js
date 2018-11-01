var booking = {

    init: function () {
        this.actualStep = 1;
        $(".booking_form form").on("submit", booking.book);
        
        //if name and firstName are registered in localStorage
        if (localStorage.getItem("name") && localStorage.getItem("firstName")) {
            $("#name").val(localStorage.getItem("name"));
            $("#first_name").val(localStorage.getItem("firstName"));
        }
    },

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
        
        this.selectedStation = station;
        
        $(".name_station").text(station.name);
        $("#address_station").text(station.address);
        $("#available_bikes").text(station.available_bikes);
        $("#available_bike_stands").text(station.available_bike_stands);
    },

    check: function (boolean, elt) {
        if (boolean) {
            event.preventDefault();
            $(elt).css("border", "1px solid #e74c3c");
        } else {
            $(elt).css("border", "1px solid #49e73c");
        }
    },

    book: function () {
        var emptyRegex = /^[\s]*$/;
        booking.name = $("#name").val();
        booking.firstName = $("#first_name").val();
        
        //checking if form elements are not empty
        booking.check(canvas.isEmpty, $("#canvas"));
        booking.check(emptyRegex.test(booking.name), $("#name"));
        booking.check(emptyRegex.test(booking.firstName), $("#first_name"));

        if (canvas.isEmpty === false && emptyRegex.test(booking.name) === false && emptyRegex.test(booking.firstName) === false) {
            localStorage.clear();
            localStorage.setItem("name", booking.name);
            localStorage.setItem("firstName", booking.firstName);
            
//            sessionStorage.setItem("reservedStation", booking.selectedStation);
        }
    }
}

booking.init();
