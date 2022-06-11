import { getCharacters } from "../../ajax/player/characters.js";

var players;
var currentPage = 0;

export function resetPlayer() {
    getCharacters().then(function(response) {
        if (response.success) {
            players = response.data;

            // Page
            let page = $("#pageSelect");
            page.empty();

            let nums = Math.ceil(players.length / 14);

            // Button
            let previous = $('<li class="page-item">');
            let next = $('<li class="page-item">');

            previous.click(function() {
                showPlayer(currentPage == 0 ? 0 : currentPage - 1);
            });
            next.click(function() {
                showPlayer(currentPage == nums - 1 ? nums - 1 : currentPage + 1);
            });

            previous.html('<a class="page-link" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>');
            next.html('<a class="page-link" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>');

            // Nums
            previous.appendTo(page);
            for (let i = 0; i < nums; i++) {
                let li = $('<li class="page-item" id="page-' + i + '"></li>');
                li.html('<a class="page-link">' + (i + 1) + '</a>');
                
                li.click(function() {
                    showPlayer(i);
                })

                li.appendTo(page);
            }
            next.appendTo(page);

            // Reset
            showPlayer();
        }
        else {
            console.log(response.message);
        }
    }).catch(function(jqXHR) {
        console.log(jqXHR)
    });
}

// 0 ~ N - 1
export function showPlayer(index = 0) {
    $("#page-" + currentPage).removeClass("active");
    $("#page-" + index).addClass("active");

    currentPage = index;
    for (let i = 0; i < 14; i++) {
        if (index * 14 + i < players.length) {
            $("#list-" + i).css("visibility", "visible");

            $("#list-" + i).html("#" + players[index * 14 + i].id + "　｜　" + players[index * 14 + i].name);
            $("#input-" + i).val(players[index * 14 + i].name);
        }
        else {
            $("#list-" + i).css("visibility", "hidden");
        }
    }
}