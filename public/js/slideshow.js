var slideshow = {
    init: function (timeSlideshow) {
        this.animate = false;
        this.actualSlide = 0;
        this.actualControl = "pause";
        // Plus 1000 for the transition
        this.timeSlideshow = timeSlideshow + 1000;
        this.autoSlide = setInterval(this.nextSlide.bind(this), this.timeSlideshow);

        $(".controls").on("click", this.controls.bind(this));
        $(document).on("keydown", this.keydown.bind(this));
        $(".arrow_left").on("click", this.previousSlide.bind(this));
        $(".arrow_right").on("click", this.nextSlide.bind(this));
    },

    nextSlide: function () {
        //if the slideshow is not animated
        //to not have multiple animations at the same time
        if (this.animate === false) {
            this.animate = true;

            this.actualSlide++;

            var leftPercentage = -this.actualSlide * 100;

            $(".image_container").animate({
                left: leftPercentage + "%"
            }, 1000, function () {
                //if the next image is the 5th we directly go to the 1st
                //because the 5th image is just for the transition
                if (this.actualSlide + 1 === 5) {
                    $(".image_container").css("left", "0");
                    this.actualSlide = 0;
                }

                //end of the animation
                this.animate = false;
            }.bind(this));
        }
    },

    previousSlide: function () {
        if (this.animate === false) {
            this.animate = true;

            //if the current image is the first one, we go to the last one for the transition
            if (this.actualSlide === 0) {
                $(".image_container").css("left", "-400%");
                this.actualSlide = 4;
            }

            this.actualSlide--;

            var leftPercentage = -this.actualSlide * 100;

            $(".image_container").animate({
                left: leftPercentage + "%"
            }, 1000, function () {
                //end of the animation
                this.animate = false;
            }.bind(this));
        }
    },
    
    keydown: function (e) {
        if (e.keyCode === 37) {
            this.previousSlide();
        } else if (e.keyCode === 39) {
            this.nextSlide();
        }
    },

    controls: function () {
        if (this.actualControl === "pause") {
            this.pause();
        } else {
            this.play();
        }
    },

    pause: function () {
        clearInterval(this.autoSlide);
        $(".controls i").replaceWith("<i class='fas fa-play'></i>");
        this.actualControl = "play";
    },

    play: function () {
        this.autoSlide = setInterval(this.nextSlide.bind(this), this.timeSlideshow);
        $(".controls i").replaceWith("<i class='fas fa-pause'></i>");
        this.actualControl = "pause";
    }
}
