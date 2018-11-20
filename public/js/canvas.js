var canvas = {
    init: function (idCanvas, idResetBtn) {
        this.canvas = $("#" + idCanvas);
        this.ctx = this.canvas[0].getContext("2d");
        this.posX;
        this.posY;
        this.isEmpty = true;
        this.drawBind = this.draw.bind(this);
        
        $("#" + idResetBtn).on("click", this.clearCanvas.bind(this));
        this.canvas.on("mousedown touchstart", this.mouseDown.bind(this));
        this.canvas.on("mouseup touchend mouseleave", this.mouseUp.bind(this));
        $(window).on("resize", this.sizeOfCanvas.bind(this));
    },

    mouseUp: function () {
        //stop mousemove event
        this.canvas.off("mousemove touchmove", this.drawBind);
    },

    mouseDown: function (e) {
        e.preventDefault();
        this.ctx.beginPath();
        this.drawBind(e);
        this.isEmpty = false;
        this.canvas.on("mousemove touchmove", this.drawBind);
    },

    draw: function (e) {
        if (e.type === "touchmove" || e.type === "touchstart") {
            this.posX = e.originalEvent.touches[0].pageX;
            this.posY = e.originalEvent.touches[0].pageY;
        } else {
            this.posX = e.pageX;
            this.posY = e.pageY;
        }

        var offsetLeftCanvas = this.canvas.offset().left;
        var offsetTopCanvas = this.canvas.offset().top;

        var canvasX = this.posX - offsetLeftCanvas;
        var canvasY = this.posY - offsetTopCanvas;

        this.ctx.lineTo(canvasX, canvasY);
        this.ctx.stroke();
        
        this.isEmpty = false;
    },

    clearCanvas: function () {
        this.ctx.clearRect(0, 0, this.canvas.width(), this.canvas.height());
        this.isEmpty = true;
    },

    sizeOfCanvas: function () {
        //because resize canvas clears it
        this.isEmpty = true;
        
        this.formWidth = $(".booking_form").width();

        //the - 2 is for canvas borders
        this.canvas[0].width = this.formWidth - 2;

        //line styles
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 3;
    }
}
