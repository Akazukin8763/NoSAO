import { showGraph } from "../ability/showGraph.js";

export function start() {
    var testing = $("#attackTest");
    testing.empty();

    // Generate Video
    var video = $('<video id="attackVideo" style="opacity: 0.25;"></video>');
    video.html('<source src="src/video/Starburst Stream.mp4" type="video/mp4"></source>');
    video.appendTo(testing);

    // Countdown
    var countdown = $('<span class="d-flex justify-content-center">Ready?</span>');
    var sec = 3; // 3 sec
    var timer = setInterval(function () {
        if (sec > 0) {
            countdown.html(sec--);
        }
        else {
            clearInterval(timer);

            // Set Game
            setGame();

            // Start testing
            countdown.html("Start!");
            countdown.fadeOut(2000);
            setInterval(function() { countdown.html(""); clearInterval() }, 2000);

            video.prop("volume", 0.1);
            video.trigger("play");
        }
    }, 1000);

    // Result
    var combo = $('<label id="attackScore"></label>');
    var next = $('<button type="button" class="btn btn-outline-light" id="attackNext"></button>');

    var result = $("#attackResult");
    result.empty();

    combo.html("Combo：0").appendTo(result);
    countdown.appendTo(result);
    next.html("Next >").appendTo(result);

    next.prop("disabled", true);
    next.click(function() {
        $("#registerAttackTest").modal("hide");
        $("#registerHealthTest").modal("show");
    });

    result.removeClass("justify-content-center");
    result.addClass("justify-content-between");

    // Func
    function setGame() {
        // Set Game
        
        var score = 0;
        testing.click(function() {
            combo.html("Combo：" + ++score);
        });

        // Timer
        video.on("ended", function() {
            testing.empty();
            
            // Ability Result
            var chart = $('<canvas></canvas>');
            chart.appendTo(testing);

            const attack = score;
            const health = $("#abilityHealth").val();
            const defense = $("#abilityDefense").val();
            const reaction = $("#abilityReaction").val();
            const agile = $("#abilityAgile").val();
            showGraph(chart, attack, health, defense, reaction, agile);
            $("#abilityAttack").val(attack);

            next.prop("disabled", false);
            testing.off("click");
        });

        // Bonus
        //video.css({ "border-style": "solid", "border-color": "red" });
    }
}