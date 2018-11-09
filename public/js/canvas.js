var canvas = {
    init: function () {
        this.canvas = $("#canvas");
        this.ctx = this.canvas[0].getContext("2d");
        this.posX;
        this.posY;
        this.isEmpty = true;
        this.initCanvas();
    },

    initCanvas: function () {
        $("#reset").on("click", this.clearCanvas);
        $("#canvas").on("mousedown touchstart", this.mouseDown);
        $("#canvas").on("mouseup touchend mouseleave", this.mouseUp);
        $(window).on("resize", this.sizeOfCanvas);
    },

    mouseUp: function () {
        //stop mousemove event
        $("#canvas").off("mousemove touchmove", canvas.mouseMove);
    },

    mouseDown: function (e) {
        e.preventDefault();
        canvas.ctx.beginPath();
        $("#canvas").on("mousemove touchmove", canvas.mouseMove);
    },

    mouseMove: function (e) {
        if (e.type === "touchmove") {
            this.posX = e.originalEvent.touches[0].pageX;
            this.posY = e.originalEvent.touches[0].pageY;
        } else {
            this.posX = e.pageX;
            this.posY = e.pageY;
        }

        var offsetLeftCanvas = $("#canvas").offset().left;
        var offsetTopCanvas = $("#canvas").offset().top;

        var canvasX = this.posX - offsetLeftCanvas;
        var canvasY = this.posY - offsetTopCanvas;

        canvas.ctx.lineTo(canvasX, canvasY);
        canvas.ctx.stroke();
        
        canvas.isEmpty = false;
    },

    clearCanvas: function () {
        canvas.ctx.clearRect(0, 0, $("#canvas").width(), $("#canvas").height());
        canvas.isEmpty = true;
    },

    sizeOfCanvas: function () {
        //because resize canvas clears it
        canvas.isEmpty = true;
        
        canvas.formWidth = $(".booking_form").width();

        //the - 2 is for canvas borders
        $("#canvas")[0].width = canvas.formWidth - 2;

        //line styles
        canvas.ctx.lineJoin = 'round';
        canvas.ctx.lineCap = 'round';
        canvas.ctx.lineWidth = 3;
    }
}

canvas.init();
