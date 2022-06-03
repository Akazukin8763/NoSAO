export function linkOver() {
    var main = $("#main");
    main.empty();

    var video = $('<video id="linkVideo" style="width: 100% !important; height: auto !important;"></video>');
    video.html('<source src="src/video/linkover.mp4" type="video/mp4"></source>');
    video.appendTo(main);
    video.trigger("play");
    
    video.on("ended", function() {
        window.location.href = "main.php";
    });
}