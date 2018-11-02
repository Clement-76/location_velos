var booking = {

    init: function () {
        this.actualStep = 1;
        $(".booking_form form").on("submit", booking.book);
        this.autocompletion();
        this.showBooking();
    },

    showBooking: function () {
        if (sessionStorage.getItem("time")) {
            $("#booking_state").show();
            $("#booking_state").html("Il y a une réservation : <br><b>Station</b> : " + sessionStorage.getItem("reservedStation") + "<br><b>Par</b> : " + localStorage.getItem("firstName") + " " + localStorage.getItem("name") + "<br><b>Temps restant</b> : <span id='remaining_time'></span>");
            booking.remainingTime();
        }
    },

    remainingTime: function () {
        //twenty minutes in ms
        var twentyMinutes = 1200000;

        var chrono = setInterval(function () {
            //Time spent since booking
            var timeSpent = Date.now() - Number(sessionStorage.getItem("time"));
            
            var remainingMs = twentyMinutes - timeSpent;
            var remainingMinutes = Math.floor(remainingMs / 1000 / 60);
            
            // % 60 to substract the minutes to the seconds
            var remainingSeconds = Math.floor((remainingMs / 1000) % 60);
            
            if (String(remainingSeconds).length === 1) {
                remainingSeconds = "0" + remainingSeconds;
            }
            
            if (timeSpent < twentyMinutes) {
                $("#remaining_time").text(remainingMinutes + "min " + remainingSeconds + "s");
            } else {
                $("#booking_state").html("");
                $("#booking_state").hide();
                sessionStorage.removeItem("time");
                sessionStorage.removeItem("reservedStation");
                clearInterval(chrono);
            }
        }, 1000);
    },

    autocompletion: function () {
        //if name and firstName are registered in localStorage
        if (localStorage.getItem("name") && localStorage.getItem("firstName")) {
            document.getElementById("name").value = localStorage.getItem("name");
            document.getElementById("first_name").value = localStorage.getItem("firstName");
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

        if (sessionStorage.getItem("reservedStation") && sessionStorage.getItem("reservedStation") === station.name) {
            $("#available_bikes").text(station.available_bikes - 1 + " (Vous avez 1 vélo de réservé)");
        } else {
            $("#available_bikes").text(station.available_bikes);
        }

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
            localStorage.setItem("name", booking.name);
            localStorage.setItem("firstName", booking.firstName);

            sessionStorage.setItem("reservedStation", booking.selectedStation.name);
            sessionStorage.setItem("time", Date.now());
        }
    }
}

booking.init();
