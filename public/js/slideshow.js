var slideshow = {
    init: function () {
        this.animate = false;
        this.actualSlide = 0;
        this.actualControl = "pause";
        this.autoSlide = setInterval(this.nextSlide, 6000);
        $(".controls").on("click", slideshow.controls);
        $(".arrow_left").on("click", slideshow.previousSlide);
        $(".arrow_right").on("click", slideshow.nextSlide);
    },

    nextSlide: function () {
        //if the slideshow is not animated
        //to not have multiple animations at the same time
        if (slideshow.animate === false) {
            slideshow.animate = true;
            slideshow.actualSlide++;

            var leftPercentage = -slideshow.actualSlide * 100;

            $(".image_container").animate({
                left: leftPercentage + "%"
            }, 1000, function () {
                //if the next image is the 5th we directly go to the 1st
                //because the 5th image is just for the transition
                if (slideshow.actualSlide + 1 === 5) {
                    $(".image_container").css("left", "0");
                    slideshow.actualSlide = 0;
                }
                slideshow.animate = false;
            });
        }

    },

    previousSlide: function () {

    },

    controls: function () {
        if (slideshow.actualControl === "pause") {
            slideshow.pause();
        } else {
            slideshow.play();
        }
    },

    pause: function () {
        clearInterval(slideshow.autoSlide);
        $(".controls i").replaceWith("<i class='fas fa-play'></i>");
        slideshow.actualControl = "play";
    },

    play: function () {
        slideshow.autoSlide = setInterval(this.nextSlide, 5000);
        $(".controls i").replaceWith("<i class='fas fa-pause'></i>");
        slideshow.actualControl = "pause";
    }
}

slideshow.init();
