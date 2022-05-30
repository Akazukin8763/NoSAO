import { showGraph } from "../ability/showGraph.js";

export function start() {
    var testing = $("#healthTest");
    testing.empty();

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

    // Result
    var hits = $('<label id="healthScore"></label>');
    var next = $('<button type="button" class="btn btn-outline-light" id="healthNext"></button>');

    var result = $("#healthResult");
    result.empty();

    hits.html("???：0").appendTo(result);
    countdown.appendTo(result);
    next.html("Next >").appendTo(result);

    next.prop("disabled", true);
    next.click(function() {
        $("#registerHealthTest").modal("hide");
        $("#registerDefenseTest").modal("show");
    });

    result.removeClass("justify-content-center");
    result.addClass("justify-content-between");
    
    // Func
    function setGame() {
        // Set Game
        var score = 0;
        score = Math.floor(Math.random() * 50) + 50;
        
        testing.empty();
            
        // Ability Result
        var chart = $('<canvas></canvas>');
        chart.appendTo(testing);

        const attack = $("#abilityAttack").val();
        const health = score;
        const defense = $("#abilityDefense").val();
        const reaction = $("#abilityReaction").val();
        const agile = $("#abilityAgile").val();
        showGraph(chart, attack, health, defense, reaction, agile);
        $("#abilityHealth").val(score);

        next.prop("disabled", false);
        testing.off("click");
    }
}