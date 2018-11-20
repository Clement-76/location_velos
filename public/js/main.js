//$(document).ready(function () {
    var slideshowObj = Object.create(slideshow);
    slideshowObj.init(5000);
    
    var canvasObj = Object.create(canvas);
    canvasObj.init("canvas", "reset");
    
    var bookingObj = Object.create(booking);
    bookingObj.init(canvasObj);
    
    var mapObj = Object.create(map);
    mapObj.init(bookingObj, "Lyon");
//})
