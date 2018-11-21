var booking = {

    init: function (canvasObj) {
        this.actualStep = 1;
        $(".booking_form form").on("submit", this.book.bind(this));
        this.autocompletion();
        this.showBooking();
        this.canvas = canvasObj;
    },

    showBooking: function () {
        if (sessionStorage.getItem("time")) {
            $("#booking_state").show();
            $("#booking_state").html("Il y a une réservation : <br><b>Station</b> : " + sessionStorage.getItem("reservedStation") + "<br><b>Par</b> : " + localStorage.getItem("firstName") + " " + localStorage.getItem("name") + "<br><b>Temps restant</b> : <span id='remaining_time'></span>");
            this.remainingTime();
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
            $("#name").val(localStorage.getItem("name"));
            $("#first_name").val(localStorage.getItem("firstName"));
        }
    },

    previousStep: function () {
        $("#step_two").css("right", "-120%");
        //because transition-duration = 0.5s in css
        $("#step_two").delay(500).hide(0);
        $("#step_one").delay(500).show(0);
        this.actualStep = 1;
    },

    nextStep: function () {
        $("#step_one").hide(0);
        $("#step_two").show(0);
        $("#step_two").css("right", "0");
        this.actualStep = 2;
    },

    setInformations: function (station) {
        $(".booking_form").show("slow", function () {
            this.canvas.sizeOfCanvas();
        }.bind(this));

        if (this.actualStep === 2) {
            this.previousStep();
        }

        this.selectedStation = station;

        if (station.status === 'OPEN') {
            $("#state_station").text("Station ouverte");
        } else {
            $("#state_station").text("Station fermée");
        }

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
            $(elt).css("border", "1px solid #e74c3c");
        } else {
            $(elt).css("border", "1px solid #49e73c");
        }
    },

    clearBooking: function () {
        $(".booking_form").hide("slow");
        // borders reset
        $("#canvas, #name, #first_name").css("border", "");
    },

    book: function (e) {
        e.preventDefault();

        var emptyRegex = /^[\s]*$/;
        this.name = $("#name").val();
        this.firstName = $("#first_name").val();

        //checking if form elements are not empty
        this.check(this.canvas.isEmpty, $("#canvas"));
        this.check(emptyRegex.test(this.name), $("#name"));
        this.check(emptyRegex.test(this.firstName), $("#first_name"));

        if (this.canvas.isEmpty === false && emptyRegex.test(this.name) === false && emptyRegex.test(this.firstName) === false) {
            localStorage.setItem("name", this.name);
            localStorage.setItem("firstName", this.firstName);

            sessionStorage.setItem("reservedStation", this.selectedStation.name);
            sessionStorage.setItem("time", Date.now());
            
            this.previousStep();
            this.clearBooking();
            this.showBooking();
        }
    }
}
