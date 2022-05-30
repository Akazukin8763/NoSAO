import { showGraph } from "../ability/showGraph.js";

export function start() {
    var testing = $("#reactionTest");
    testing.empty();

    testing.css({ "background-image": "url(src/image/Tier-S_Forest.png)"});

    // Image
    var image = $('<img src="src/image/Tier-S_Ingredients.png">');
    image.appendTo(testing);

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
            setTimeout(function() { countdown.html(""); }, 2000)
        }
    }, 1000);
    image.fadeOut(5000);
    setTimeout(function() { image.css({ "visibility": "hidden" }); image.fadeIn(1); }, 5000)
    
    // Result
    var times = $('<label id="reactionScore"></label>');
    var next = $('<button type="button" class="btn btn-outline-light" id="reactionNext"></button>');

    var result = $("#reactionResult");
    result.empty();

    times.html("Times：0").appendTo(result);
    countdown.appendTo(result);
    next.html("Next >").appendTo(result);

    next.prop("disabled", true);
    next.click(function() {
        $("#registerReactionTest").modal("hide");
        $("#registerAgileTest").modal("show");
    });

    result.removeClass("justify-content-center");
    result.addClass("justify-content-between");

    // Func
    function setGame() {
        // Set Game
        var score = 0;
        var appear = Math.floor(Math.random() * 15 + 7);
        var flag = false;
        var timer;

        testing.click(function() {
            if (flag) {
                score = +(Math.round(score + "e+2")  + "e-2");
                times.html("Times：" + score + "s");
            }
            else {
                score = -1;
                countdown.html("");
                times.html("Times：" + score);
            }

            clearInterval(timer);
            testing.empty();

            // Ability Result
            var chart = $('<canvas></canvas>');
            chart.appendTo(testing);

            const attack = $("#abilityAttack").val();
            const health = $("#abilityHealth").val();
            const defense = $("#abilityDefense").val();
            const reaction = (score > 0 ? parseInt(10 / score) : 0) + 10;
            const agile = $("#abilityAgile").val();
            showGraph(chart, attack, health, defense, reaction, agile);
            $("#abilityReaction").val(reaction);

            next.prop("disabled", false);
            testing.removeAttr("style");
            testing.off("click");
        });

        setTimeout(function() {
            flag = true;
            image.css({ "visibility": "visible" });

            timer = setInterval(function() {
                score += 0.01;
            }, 10);
        }, appear * 1000);
    }
}