var canvas = {

}

var canvas = $("#canvas");
var ctx = canvas[0].getContext("2d");
var firstPosX;
var firstPosY;
var firstCanvasX;
var firstCanvasY;

var formWidth = $(".booking_form").width();
canvas[0].width = formWidth - 2;

$(window).on("resize", function () {
    formWidth = $(".booking_form").width();
    canvas[0].width = formWidth - 2;
    initCtxCanvas();
})

function initCtxCanvas() {
    //lines styles
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;
}


function mouseUp() {
    //delete old mouseup event
    canvas.off("mouseup touchend mouseleave", mouseUp);
    //stop mousemove event
    canvas.off("mousemove touchmove", mouseMove)
}

function mouseMove(event) {
    if (event.type === "touchmove") {
        posX = event.originalEvent.touches[0].pageX;
        posY = event.originalEvent.touches[0].pageY;
    } else {
        posX = event.pageX;
        posY = event.pageY;
    }
    
    var offsetLeftCanvas = canvas.offset().left;
    var offsetTopCanvas = canvas.offset().top;

    var secondCanvasX = posX - offsetLeftCanvas;
    var secondCanvasY = posY - offsetTopCanvas;

    ctx.lineTo(firstCanvasX, firstCanvasY);
    ctx.lineTo(secondCanvasX, secondCanvasY);
    ctx.stroke();

    firstCanvasX = secondCanvasX;
    firstCanvasY = secondCanvasY;
}

$(canvas).on("mousedown touchstart", function (event) {
    if (event.type === "touchstart") {
        firstPosX = event.originalEvent.touches[0].pageX;
        firstPosY = event.originalEvent.touches[0].pageY;
    } else {
        firstPosX = event.pageX;
        firstPosY = event.pageY;
    }

    firstCanvasX = firstPosX - canvas.offset().left;
    firstCanvasY = firstPosY - canvas.offset().top;
    
    console.log(firstCanvasX);

    ctx.beginPath();

    canvas.on("mousemove touchmove", mouseMove);
    canvas.on("mouseup touchend mouseleave", mouseUp);
})

initCtxCanvas();

$("#reset").on("click", function (event) {
    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
})
