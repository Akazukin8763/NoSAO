import { showGraph } from "../ability/showGraph.js";

export function start() {
    var testing = $("#defenseTest");
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
    var hits = $('<label id="defenseScore"></label>');
    var next = $('<button type="button" class="btn btn-outline-light" id="defenseNext"></button>');

    var result = $("#defenseResult");
    result.empty();

    hits.html("???：0").appendTo(result);
    countdown.appendTo(result);
    next.html("Next >").appendTo(result);

    next.prop("disabled", true);
    next.click(function() {
        $("#registerDefenseTest").modal("hide");
        $("#registerReactionTest").modal("show");
    });

    result.removeClass("justify-content-center");
    result.addClass("justify-content-between");
    
    // Func
    function setGame() {
        // Set Game
        var score = 0;
        score = Math.floor(Math.random() * 100);
        
        testing.empty();
            
        // Ability Result
        var chart = $('<canvas></canvas>');
        chart.appendTo(testing);

        const attack = $("#abilityAttack").val();
        const health = $("#abilityHealth").val();
        const defense = score;
        const reaction = $("#abilityReaction").val();
        const agile = $("#abilityAgile").val();
        showGraph(chart, attack, health, defense, reaction, agile);
        $("#abilityDefense").val(score);

        next.prop("disabled", false);
        testing.off("click");
    }
}