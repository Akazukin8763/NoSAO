import { setCookie } from "../start/linkOver.js";

// https://www.youtube.com/watch?v=kBQ6GMI5iiM
export function linkStart() {
    $("#linkStart").modal("hide");
    
    var main = $("#main");
    main.empty();

    // Link Sound
    var audio = $('<audio></audio>');
    audio.html('<source src="src/sound/LinkStart.SAO.Kirito.wav" type="audio/wav">');
    audio.trigger("play");

    // Link Video
    audio.on("ended", function() {
        var audio = $('<audio></audio>');
        audio.html('<source src="src/sound/start.ogg" type="audio/ogg">');
        audio.trigger("play");

        var video = $('<video id="linkVideo" style="width: 100% !important; height: auto !important;"></video>');
        video.html('<source src="src/video/linkstart.webm" type="video/mp4"></source>');
        video.appendTo(main);
        video.trigger("play");

        audio.on("ended", function() {
            loginMenu();
        });
    });
}

function loginMenu() {
    var main = $("#main");
    main.css({ "background-color": "rgb(233, 236, 233)" });
    main.empty();

    // Login HTML
    var login = $('<div class="login"></div>');
    var div = $('<div class="row" style="padding: 5% 0%;"></div>')

    var col1 = $('<div class="col-1"></div>');
    col1.appendTo(div);

    var col2 = $('<div class="col-5"></div>');
    $('<h2>Log in_::</h2>').appendTo(col2);
    $('<span id="loginERR" style="color: rgb(200, 0, 0);"></span>').appendTo(col2);
    col2.appendTo(div);

    var col3 = $('<div class="col-5"></div>');
    $('<br>').appendTo(col3);
    $('<label for="username" required="required">:account</label><a class="float-end" href="register.html">register</a>').appendTo(col3);
    let username = $('<input type="text" class="form-control" id="username" name="username">').appendTo(col3);
    $('<label for="password" required="required" style="padding-top: 5%;">:password</label>').appendTo(col3);
    $('<input type="text" class="form-control" id="password" name="password" value="******" disabled>').appendTo(col3);
    col3.appendTo(div);

    div.appendTo(login);
    login.appendTo(main);

    // Login Func
    username.keyup(function(e) {
        var code = e.key;

        if (code === "Enter") {
            $("#loginERR").html("");

            var __name = $("#username").val();
        
            $.ajax({
                type: "POST",
                url: "API/Player/login.php",
                dataType: "json",
                data: {
                    name: __name
                },
                success: function(response) {
                    if (response.message.successed) {
                        linkOver();
                    }
                    else {
                        $("#loginERR").html("Account not existed");
                    }
                },
                error: function(jqXHR) {
                    $("#loginERR").html("ERROR CONNENTING...");
                }
            })
        }
    });
}