import { showGraph } from "../ability/showGraph.js";
import { ajax_getDescription, ajax_getAincradDetail } from "../ajax.js";

export function showAincrad(index = 0) {
    let noName = "[No Name]";
    let noDescription = "...";

    ajax_getDescription().then(function(response) {
        if (response.message.successed) {
            let levelsInfo = response.levelsInfo;
            let length = levelsInfo.length;

            // Indicators
            var indicators = $("#indicatorsAincrad");
            indicators.empty();

            for (let i = 0; i < length / 10; i++) {
                var indicatorsButton = $('<button type="button" data-bs-target="#carouselAincrad" data-bs-slide-to="' + i + '" aria-label="Slide ' + i + 1 + '"></button>');
                if (i == 0) indicatorsButton.addClass("active");

                indicatorsButton.appendTo(indicators);
            }

            // Inner
            var inner = $("#innerAincrad");
            inner.empty();

            for (let i = 0; i < length / 10; i++) {
                var innerItem = $('<div class="carousel-item">');
                if (i == index) innerItem.addClass("active");

                // 0 ~ 4
                $('<br>').appendTo(innerItem);
                var inner1 = $('<div class="row"></div>');
                inner1.appendTo(innerItem);
                // 5 ~ 9
                $('<br>').appendTo(innerItem);
                var inner2 = $('<div class="row"></div>');
                inner2.appendTo(innerItem);
                // All
                var innerAll = [inner1, inner2];

                for (let j = 0; j < 10; j++) {
                    if (i * 10 + j >= length) break;

                    let levelInfo = levelsInfo[i * 10 + j];
                    let main_area = levelInfo.main_area;
                    let major_area = levelInfo.major_area;

                    if (main_area == null) main_area = noName;
                    if (major_area == null) major_area = noName;

                    var col = $('<div class="col-md-1-5"></div>');
                    var card = $('<div class="card"></div>');
                    var cardImage = $('<div class="card-image"></div>');
                    var cardBody = $('<div class="card-body"></div>');

                    // Image
                    if ((i * 10 + j + 1) == 74) $('<img src="src/image/level74.gif" class="card-img-top">').appendTo(cardImage);
                    else $('<img src="src/image/Tier-S_Forest.png" class="card-img-top">').appendTo(cardImage);
                    $('<div>Levels ' + (i * 10 + j + 1) + '</div>').appendTo(cardImage);

                    // Body
                    $('<h5 class="card-title">Main Area</h5>').appendTo(cardBody);
                    $('<p class="card-text">' + main_area + '</p>').appendTo(cardBody);
                    $('<h5 class="card-title">Major Area</h5>').appendTo(cardBody);
                    $('<p class="card-text">' + major_area + '</p>').appendTo(cardBody);

                    cardImage.appendTo(card);
                    cardBody.appendTo(card);
                    card.appendTo(col);
                    col.appendTo(innerAll[Math.floor(j / 5)]);

                    card.click(function() {
                        ajax_getAincradDetail(i * 10 + j + 1).then(function(response) {
                            if (response.message.successed) {
                                $("#description").modal("show");
                                $(".carousel").carousel("pause");
                
                                let levelInfo = response.levelInfo;

                                // Level
                                let levels = levelInfo.levels;
                                let main_area = levelInfo.main_area;
                                let main_description = levelInfo.main_description;
                                let major_area = levelInfo.major_area;
                                let major_description = levelInfo.major_description;
                                let landscape_description = levelInfo.landscape_description;

                                if (main_area == null) main_area = noName;
                                if (main_description == null) main_description = noDescription;
                                if (major_area == null) major_area = noName;
                                if (major_description == null) major_description = noDescription;
                                if (landscape_description == null) landscape_description = noDescription;

                                $("#descriptionHeaderTitle").html("Levels：" + levels + "｜Description");
                                $("#mainArea").html("Main Area：" + main_area);
                                $("#mainDescription").html(main_description);
                                $("#majorArea").html("Major Area：" + major_area);
                                $("#majorDescription").html(major_description);
                                $("#landscape").html("Landscape");
                                $("#landscapeDescription").html(landscape_description);
                
                                // Enemy
                                let enemies = levelInfo.enemy;

                                $("#enemyHeaderTitle").html("Levels：" + (i * 10 + j + 1) + "｜Enemy");
                
                                var boss = $("#boss");
                                boss.empty();
                
                                var mobs = $("#mobs");
                                mobs.empty();
                
                                enemies.forEach(function(enemy) {
                                    let enemyName = enemy.name;
                                    let enemyDescription = enemy.description;
                                    let enemyAttack = enemy.attack;
                                    let enemyHealth = enemy.health;
                                    let enemyDefense = enemy.defense;
                                    let enemyReaction = enemy.reaction;
                                    let enemyAgile = enemy.agile;

                                    if (enemyName == null) enemyName = noName;
                                    if (enemyDescription == null) enemyDescription = noDescription;

                                    var title = $('<div class="d-flex justify-content-between align-items-center"></div>')
                                    var description = $('<p></p>');
                                    var chart = $('<canvas></canvas>');
                    
                                    if (enemy.is_boss == 1) {
                                        title.appendTo(boss);
                                        description.appendTo(boss);
                                        chart.appendTo(boss);
                                    }
                                    else {
                                        title.appendTo(mobs);
                                        description.appendTo(mobs);
                                        chart.appendTo(mobs);
                                    }
                    
                                    showGraph(chart, enemyAttack, enemyHealth, enemyDefense, enemyReaction, enemyAgile);
                                    chart.css({ "display": "none" });
                    
                                    // Name
                                    var name = $('<span style="font-weight: bold">' + enemyName + '</span>')
                                    var detail = $('<span class="detail bi bi-clipboard-data"></span>')
                    
                                    var flag = false;
                                    detail.click(function() {
                                        if (flag) chart.css({ "display": "none" });
                                        else chart.css({ "display": "block" });
                                        flag = !flag;
                                    });
                    
                                    name.appendTo(title);
                                    detail.appendTo(title);
                    
                                    // Desciption
                                    description.html(enemyDescription);
                                });

                                if (boss.children().length == 0)
                                    $("<p>" + noDescription + "</p>").appendTo(boss);
                                if (mobs.children().length == 0)
                                    $("<p>" + noDescription + "</p>").appendTo(mobs);
                            }
                            else
                                return;
                        }).catch(function(jqXHR) {
                            console.log(jqXHR)
                        });
                    });
                }

                innerItem.appendTo(inner);
            }
        }
        else {
            return;
        }
    }).catch(function(jqXHR) {
        console.log(jqXHR)
    });
}