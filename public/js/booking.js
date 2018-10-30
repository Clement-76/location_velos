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


var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
ctx.lineWidth = 2;
var firstPosX;
var firstPosY;
var firstCanvasX;
var firstCanvasY;

function mouseUp() {
    //delete old mouseup event
    $(canvas).off("mouseup", mouseUp);
    //stop mousemove event
    $(canvas).off("mousemove", mouseMove)
}

function mouseMove(event) {
    posX = event.clientX;
    posY = event.clientY;
    
    var offsetLeftCanvas = $(canvas).offset().left;
    var offsetTopCanvas = $(canvas).offset().top;
    
    var secondCanvasX = posX - offsetLeftCanvas;
    var secondCanvasY = posY - offsetTopCanvas;
        
    ctx.lineTo(firstCanvasX, firstCanvasY);
    ctx.lineTo(secondCanvasX, secondCanvasY);
    ctx.stroke();
    
    firstCanvasX = secondCanvasX;
    firstCanvasY = secondCanvasY;
}

$(canvas).on("mousedown", function (event) {
    firstPosX = event.clientX;
    firstPosY = event.clientY;
    
    firstCanvasX = firstPosX - $(canvas).offset().left;
    firstCanvasY = firstPosY - $(canvas).offset().top;
    
    ctx.beginPath();
    
    $(canvas).on("mousemove", mouseMove)
    $(canvas).on("mouseup", mouseUp);
})

$("#reset").on("click", function (event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
