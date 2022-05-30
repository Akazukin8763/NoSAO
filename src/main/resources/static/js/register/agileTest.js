import { showGraph } from "../ability/showGraph.js";

export function start() {
    var testing = $("#agileTest");
    testing.empty();

    var n = 4;
    var cell = new Array(n);
    for (let i = 0; i < n; i++)
        cell[i] = new Array(n);

    // Table
    var table = $('<table style="background-image: url(src/image/Tier-S_Forest.png);"></table>');
    for (let i = 0; i < n; i++) {
        var tr = $('<tr></tr>');
        for (let j = 0; j < n; j++) {
            cell[i][j] = $('<td><img draggable="false" width="100%" height="100%" src="src/image/Tier-S_Ingredients.png"></td>');
            cell[i][j].css({ "opacity": "0%" });
            cell[i][j].appendTo(tr);
        }
        tr.appendTo(table);
    }
    
    table.appendTo(testing);
    //$('<div class="progress" style="height: 5px;"><div class="progress-bar w-100" role="progressbar"></div></div>').appendTo(testing);
    
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
    var hits = $('<label id="agileScore"></label>');
    var next = $('<button type="button" class="btn btn-outline-light" id="agileNext"></button>');

    var result = $("#agileResult");
    result.empty();

    hits.html("Hits：0").appendTo(result);
    countdown.appendTo(result);
    next.html("Next >").appendTo(result);

    next.prop("disabled", true);
    next.click(function() {
        $("#registerAgileTest").modal("hide");
        $("#testResult").modal("show");
    });

    result.removeClass("justify-content-center");
    result.addClass("justify-content-between");

    // Func
    function setGame() {
        // Set Game
        var score = 0;

        var flag = new Array(n);
        for (let i = 0; i < n; i++)
            flag[i] = new Array(n);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                flag[i][j] = false;
                cell[i][j].click(function() {
                    if (flag[i][j]) {
                        score++;
                        flag[i][j] = false;
                        cell[i][j].css({ "opacity": "0%" });

                        while (true) {
                            let c = Math.floor(Math.random() * n * n);
                            let row = Math.floor(c / 4);
                            let col = c % 4;

                            if (!flag[row][col] && (row != i && col != j)) {
                                flag[row][col] = true;
                                cell[row][col].css({ "opacity": "100%" });
                                break;
                            }
                        }
                    }
                    else {
                        score--;
                    }
                    hits.html("Hits：" + score);
                });
            }
        }

        // Random 3 Hit
        for (let i = 0; i < 3; i++) {
            while (true) {
                let c = Math.floor(Math.random() * n * n);
                let row = Math.floor(c / 4);
                let col = c % 4;

                if (!flag[row][col]) {
                    flag[row][col] = true;
                    cell[row][col].css({ "opacity": "100%" });
                    break;
                }
            }
        }

        // Timer
        var sec = 16; // 16 sec
        setTimeout(function() {
            testing.empty();
            
            // Ability Result
            var chart = $('<canvas></canvas>');
            chart.appendTo(testing);

            const attack = $("#abilityAttack").val();
            const health = $("#abilityHealth").val();
            const defense = $("#abilityDefense").val();
            const reaction = $("#abilityReaction").val();
            const agile = score;
            showGraph(chart, attack, health, defense, reaction, agile);
            $("#abilityAgile").val(score);

            next.prop("disabled", false);
            testing.off("click");
        }, sec * 1000);
    }
}