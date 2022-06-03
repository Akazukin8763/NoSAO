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

            .list-group-item {
                background: linear-gradient(270deg, rgba(16, 46, 102, 0.9)0%, rgba(135, 220, 233, 0.8)100%);
            }
            .list-group-item:hover {
                transform: scale(1.02);
            }
        </style>

        <script type="module">
            import { getCookie } from "./js/cookie.js";
            import * as ajax from "./js/ajax.js";

            let __ID = getCookie("ID");
            let __name = getCookie("username");

            // Search Player
            $("#searchName").keyup(function(e) {
                var code = e.key;

                if (code === "Enter")
                    searchPlayer($("#searchName").val());
            });
            $("#searchBtn").click(function() {
                searchPlayer($("#searchName").val());
            });
            import * as ability from "./js/ability/showGraph.js";
            function searchPlayer(searchName) {
                $("#searchName").val("");

                ajax.ajax_searchPlayer(searchName).then(function(response) {
                    if (response.message.successed) {
                        let playerInfo = response.playerInfo;

                        // Based
                        let ID = playerInfo[1];
                        let name = playerInfo.name;

                        $("#playerID").html("#" + ID);
                        $("#playerName").html(name);

                        // Ability
                        let attack = playerInfo.attack;
                        let health = playerInfo.health;
                        let defense = playerInfo.defense;
                        let reaction = playerInfo.reaction;
                        let agile = playerInfo.agile;
                        
                        $("#abilityChart").empty();
                        let chart = $("<canvas></canvas>").appendTo($("#abilityChart"));
                        ability.showGraph(chart, attack, health, defense, reaction, agile);

                        // Description
                        let description = playerInfo.description;
                        $("#descriptionArea").html(description);

                        // Aincrad
                        let level = playerInfo.levels;
                        $("#aincradLevel").html("#" + level);

                        // Guild
                        let guild_name = playerInfo.guild_name;
                        $("#guildName").html((guild_name == null) ? "[None]" : guild_name);
                    }
                    else {
                        searchNone();
                    }
                }).catch(function(jqXHR) {
                    searchNone();
                });

                function searchNone() {
                    $("#playerID").html("#CR000000");
                    $("#playerName").html("");

                    $("#abilityChart").empty();
                    let chart = $("<canvas></canvas>").appendTo($("#abilityChart"));
                    ability.showGraph(chart, null, null, null, null, null);

                    $("#descriptionArea").html("");
                    $("#aincradLevel").html("#0");
                    $("#guildName").html("[None]");
                }
            }

            // Search List
            $("#selfData").click(function() {
                searchPlayer(__name);
            });

            // Window Load
            import { setList } from "./js/player/setList.js";
            import { resetPlayer } from "./js/player/showPlayer.js";
            window.addEventListener("load", function(event) {
                $("#currentUsername").html(__name);
                $("#selfData").html("#" + __ID + "　｜　" + __name)

                $("#abilityChart").empty();
                let chart = $("<canvas></canvas>").appendTo($("#abilityChart"));
                ability.showGraph(chart, null, null, null, null, null);

                setList();
                resetPlayer();
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
                                <a class="nav-link" href="status.php">Status</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="aincrad.php">Aincrad</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="guild.php">Guild</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="player.php">Player</a>
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
                <div class="d-flex justify-content-center">
                    <div class="input-group w-50">
                        <input type="text" class="form-control" placeholder="Username" id="searchName">
                            <button type="button" class="btn btn-danger" id="searchBtn">
                                <i class="bi bi-search"></i>
                            </button>
                        </input>
                    </div>
                </div>

                <br>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="" style="height: 72vh">
                            <ul class="list-group">
                                <li class="list-group-item" id="selfData"></li>

                                <hr>

                                <div class="row" id="allPlayer">
                                    <!-- Nothing -->
                                </div>
                            </ul>
                        </div>

                        <div style="height: 1vh"></div>

                        <div style="height: 4vh">
                            <nav class="d-flex justify-content-center">
                                <ul class="pagination" id="pageSelect">
                                    <!-- Nothing -->
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div class="col-sm-4">
                        <div class="card header-gradient" style="height: 78vh">
                            <div class="card-header">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span id="playerID">#CR000000</span>
                                    <span id="playerName"></span>
                                </div>
                            </div>
                            <div class="card-body" id="abilityChart">
                                <!-- Nothing -->
                            </div>
                            <div class="card-footer" style="height: 20vh;">
                                <div class="d-flex justify-content-center text-center">
                                    <textarea class="form-control" id="descriptionArea" style="background-color: inherit; height: 100%;" disabled></textarea>
                                </div>

                                <div style="height: 1vh;"></div>

                                <div class="d-flex justify-content-evenly text-center">
                                    <span class="col-sm-6">Aincrad</span>
                                    <span class="col-sm-6" id="aincradLevel">#0</span>
                                </div>
                                <div class="d-flex justify-content-evenly text-center">
                                    <span class="col-sm-6">Guild</span>
                                    <span class="col-sm-6" id="guildName">[None]</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </body>
</html>