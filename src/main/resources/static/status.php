<?php
    session_start();

    if (isset($_SESSION["ID"])) {
        $ID = $_SESSION["ID"];
        $username = $_SESSION["username"];

        setcookie("ID", $ID);
        setcookie("username", $username);
    }
    else {
        header('location: index.php');
        exit;
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Bootstrap CSS --><!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet">

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

        <title>MySAO</title>

        <style>
            .Aincrad {
                height: 100vh;
                background-image: url('src/image/Aincrad.png');
                background-size: cover;
            }
            .header-gradient {
                background: linear-gradient(270deg, rgba(16, 46, 102, 0.9)0%, rgba(135, 220, 233, 0.8)100%);
                background: -moz-linear-gradient(270deg, rgba(16, 46, 102, 0.9)0%, rgba(135, 220, 233, 0.8)100%);
                background: -webkit-linear-gradient(270deg, rgba(16, 46, 102, 0.9)0%, rgba(135, 220, 233, 0.8)100%);
                background: -o-linear-gradient(270deg, rgba(16, 46, 102, 0.9)0%, rgba(135, 220, 233, 0.8)100%);
            }

            .card-header {
                color: white;
            }

            .form-control:focus {
                border-color: rgba(135, 220, 233, 0.95);
                box-shadow: 0 0 0 0.2rem rgba(16, 46, 102, 0.25);
            }

            :root {
                --size: 42px;
            }
            #aincrad .card-body {
                text-align: center;
                color: hsla(210, 20%, 90%, 0.89);
                font-family: 'Roboto Condensed', sans-serif;
                font-weight: 300;
                overflow: hidden;
            }
            .column {
                display: inline-block;
                vertical-align: top;
                font-size: var(--size);
                line-height: var(--size);
                transition: transform 300ms;
            }
            .num {
                transition: opacity 500ms, text-shadow 100ms;
                opacity: 0.025;
            }
            .num.visible {
                opacity: 1.0;
                text-shadow: 1px 1px 0px hsl(210, 50%, 40%);
            }
            .num.close {
                opacity: 0.35;
            }
            .num.far {
                opacity: 0.15;
            }
            .num.distant {
                opacity: 0.1;
            }
        </style>

        <script type="module">
            import { getCookie } from "./js/cookie.js";
            import * as ajax from "./js/ajax.js";

            let __level = 1; // Default
            let __ID = getCookie("ID");
            let __name = getCookie("username");

            // Ability, Guild
            import * as ability from "./js/ability/showGraph.js";
            import * as guild from "./js/guild/showGraph.js";
            function setStatus() {
                ajax.ajax_searchPlayer(__name).then(function(response) {
                    if (response.message.successed) {
                        let playerInfo = response.playerInfo;

                        // Ability
                        let attack = playerInfo.attack;
                        let health = playerInfo.health;
                        let defense = playerInfo.defense;
                        let reaction = playerInfo.reaction;
                        let agile = playerInfo.agile;
                        
                        ability.showGraph($("#abilityChart"), attack, health, defense, reaction, agile);
                        $("#attack").html(attack);
                        $("#health").html(health);
                        $("#defense").html(defense);
                        $("#reaction").html(reaction);
                        $("#agile").html(agile);

                        // Description
                        let description = playerInfo.description;

                        $("#descriptionArea").html(description);

                        // Aincrad
                        __level = playerInfo.levels;

                        setLevel(__level);

                        // Guild
                        let __guild_name = playerInfo.guild_name;

                        ajax.ajax_getGuildDetail(__guild_name).then(function(response) {
                            if (response.message.successed) {
                                let detail = new Map();

                                response.memberDistribution.forEach(function(element) {
                                    detail.set(element.lv, element.num);
                                });

                                $("#guildName").html(__guild_name);
                                guild.showGraph($("#guildChart"), [...detail.keys()], [...detail.values()]);
                            }
                            else { // 沒有公會則只顯示自己
                                $("#guildName").html("[None]");
                                guild.showGraph($("#guildChart"), [__level], [1]);
                            }
                        }).catch(function(jqXHR) { // 錯誤則只顯示自己
                            $("#guildName").html("[None]");
                            guild.showGraph($("#guildChart"), [__level], [1]);
                        });
                    }
                    else {
                        location.href = "main.php";
                    }
                }).catch(function(jqXHR) {
                    location.href = "main.php";
                });
            }

            // Description Update
            $("#descriptionArea").parent().dblclick(function() {
                $("#descriptionArea").prop('disabled', false);
                $("#descriptionArea").focus();
                $("#descriptionERR").html("");
            })
            $("#descriptionArea").focusout(function() {
                $("#descriptionArea").prop('disabled', true);

                let __description = $("#descriptionArea").val();
                ajax.ajax_updatePlayer_description(__description).then(function(response) {
                    if (response.message.successed) {
                        // Nothing
                    }
                    else {
                        $("#descriptionERR").html(response.message.statement);
                    }
                }).catch(function(jqXHR) {
                    $("#descriptionERR").html("伺服器連線錯誤。");
                });
            })

            // Level Selector
            // https://codepen.io/Alca/pen/BZbPrE
            let size = 42; // font size (px)
            let classList = [ 'visible', 'close', 'far', 'far', 'distant', 'distant' ];

            $("#moreAincrad").click(function() {
                location.href = "aincrad.php?index=" + Math.floor((__level - 1) / 10);
            });
            $("#aincradLevelPrev").click(function() {
                __level = (__level + 98) % 100 + 1;
                setLevel(__level);
            });
            $("#aincradLevelNext").click(function() {
                __level = __level % 100 + 1;
                setLevel(__level);
            });
            function setLevel(__level) {
                let columns = [...document.getElementsByClassName('column')];
                let num = ("000" + __level).slice(-3);

                columns.forEach((ele, i) => {
                    let n = +num[i];
                    let offset = -n * size;
                    ele.style.transform = 'translateY(calc(25% + ' + offset + 'px - ' + (size / 2) + 'px))';
                    
                    Array.from(ele.children).forEach((ele2, i2) => {
                        ele2.className = 'num ' + getClass(n, i2);
                    });
                });

                $("#aincradLevel").html("#" + __level);
            }
            function getClass(n, i2) {
                return classList.find((class_, classIndex) => Math.abs(n - i2) === classIndex) || '';
            }

            // Window Load
            window.addEventListener("load", function(event) {
                $("#currentUsername").html(__name);
                $("#playerID").html("#" + __ID);
                $("#playerName").html(__name);

                setStatus();
            });
            window.addEventListener("beforeunload", function(event) {
                // 離開時才更新資料庫
                ajax.ajax_updatePlayer_level(__level).then(function(response) {
                    if (response.message.successed) {
                        // Nothing
                    }
                    else {
                        console.log(response.message.statement);
                    }
                }).catch(function(jqXHR) {
                    console.log(jqXHR)
                });
            });
        </script>
    </head>
    <body>
        <div class="Aincrad">

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark header-gradient">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <!-- <img src="https://imgur.com/FuZhgll.png" alt="" width="30" height="24"> -->
                        MySAO
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarToggler">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="main.php">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="status.php">Status</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="aincrad.php">Aincrad</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="guild.php">Guild</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="player.php">Player</a>
                            </li>
                        </ul>
                        <div class="justify-content-end" style="color: white;">
                            <i class="bi bi-person-circle"></i>
                            &zwnj;&zwnj;&zwnj;
                            <span id="currentUsername"></span>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="container">
                <br>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="card header-gradient" style="height: 86vh">
                            <div class="card-header">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span id="playerID"></span>
                                    <span id="playerName"></span>
                                </div>
                            </div>
                            <div class="card-body">
                                <canvas id="abilityChart">
                                    <!-- Nothing -->
                                </canvas>
                            </div>
                            <div class="card-footer">
                                <div>
                                    <div class="d-flex justify-content-center text-center">
                                        <span class="col-6">Attack</span>
                                        <span class="col-6" id="attack"></span>
                                    </div>
                                    <div class="d-flex justify-content-center text-center">
                                        <span class="col-6">Health</span>
                                        <span class="col-6" id="health"></span>
                                    </div>
                                    <div class="d-flex justify-content-center text-center">
                                        <span class="col-6">Defense</span>
                                        <span class="col-6" id="defense"></span>
                                    </div>
                                    <div class="d-flex justify-content-center text-center">
                                        <span class="col-6">Reaction</span>
                                        <span class="col-6" id="reaction"></span>
                                    </div>
                                    <div class="d-flex justify-content-center text-center">
                                        <span class="col-6">Agile</span>
                                        <span class="col-6" id="agile"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-8">
                        <div class="card header-gradient" id="description" style="height: 40vh">
                            <div class="card-header">
                                <span>Description</span>
                            </div>
                            <div class="card-body">
                                <textarea class="form-control" id="descriptionArea" style="background-color: inherit; color: white; height: 100%;" disabled></textarea>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between">
                                    <span>
                                        <i class="bi bi-lightbulb"></i>
                                        Double-click on textarea to edit description.
                                    </span>
                                    <span id="descriptionERR" style="color: rgb(200, 0, 0)"></span>
                                </div>
                            </div>
                        </div>

                        <div style="height: 2vh"></div>

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="card header-gradient" id="aincrad" style="height: 44vh;">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span>Aincrad</span>
                                            <span id="aincradLevel"></span>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="column">
                                            <div class="num">0</div>
                                            <div class="num">1</div>
                                            <div class="num">&zwnj;</div>
                                            <div class="num">&zwnj;</div>
                                            <div class="num">&zwnj;</div>
                                            <div class="num">&zwnj;</div>
                                            <div class="num">&zwnj;</div>
                                            <div class="num">&zwnj;</div>
                                            <div class="num">&zwnj;</div>
                                            <div class="num">&zwnj;</div>
                                        </div>
                                        <div class="column">
                                            <div class="num">0</div>
                                            <div class="num">1</div>
                                            <div class="num">2</div>
                                            <div class="num">3</div>
                                            <div class="num">4</div>
                                            <div class="num">5</div>
                                            <div class="num">6</div>
                                            <div class="num">7</div>
                                            <div class="num">8</div>
                                            <div class="num">9</div>
                                        </div>
                                        <div class="column">
                                            <div class="num">0</div>
                                            <div class="num">1</div>
                                            <div class="num">2</div>
                                            <div class="num">3</div>
                                            <div class="num">4</div>
                                            <div class="num">5</div>
                                            <div class="num">6</div>
                                            <div class="num">7</div>
                                            <div class="num">8</div>
                                            <div class="num">9</div>
                                        </div>
                                        
                                        <button class="carousel-control-prev" id="aincradLevelPrev" type="button">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" id="aincradLevelNext" type="button">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                    <div class="card-footer">
                                        <a class="btn btn-sm btn-outline-dark w-100" id="moreAincrad">Click here to see more Information</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="card header-gradient" id="guild" style="height: 44vh;">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span>Guild</span>
                                            <span id="guildName"></span>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="guildChart">
                                            <!-- Nothing -->
                                        </canvas>
                                    </div>
                                    <div class="card-footer">
                                        <a class="btn btn-sm btn-outline-dark w-100" href="guild.php">Click here to see more Information</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </body>
</html>