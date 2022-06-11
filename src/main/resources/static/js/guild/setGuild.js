import * as guild from "./showGraph.js";
import { getCookie } from "../../js/cookie.js";
export function showGuild(index = 0) {
    let noName = "[No Name]";
    let noDescription = "...";
    let allPlayer;
    let guild_person;
    let __ID = getCookie("ID");
    let __name = getCookie("username");

    ajax_searchPlayer(__name).then(function(response) {
        if (response.message.successed) {
            let Player = response.playerInfo;
            console.log(Player);
            if(Player.guild_name!=null){
                console.log(Player.guild_name);
                $("#buildGuild").attr("disabled", true);
            }
            else{
                $("#quit").attr("disabled", true);
            }
        }
        else
            return;
    }).catch(function(jqXHR) {
        console.log(jqXHR)
    });
    ajax_getGuildALL().then(function(response) {
        if (response.message.successed) {
            console.log(response);        
            
            
            let guildsInfo = response.guildsInfo;
            let length = guildsInfo.length;

            // Indicators
            var indicators = $("#indicatorsGuild");
            indicators.empty();

            for (let i = 0; i < length / 2; i++) {
                var indicatorsButton = $('<button type="button" data-bs-target="#indicatorsGuild" data-bs-slide-to="' + i + '" aria-label="Slide ' + i + 1+ '"></button>');
                if (i == 0) indicatorsButton.addClass("active");

                indicatorsButton.appendTo(indicators);
            }

            


            var quit = $("#quit");
            quit.click(function() {     
                var yes=window.confirm("Are you sure you want to quit the guild?");
                if(yes){
                    ajax_quitGuild("").then(function(response) {
                        if (response.message.successed) {
                            window.alert("success");
                            location.href="guild.php";
                        }
                    }).catch(function(jqXHR) { 
                        console.log(jqXHR);
                    });    
                } 
            });


            var create = $("#buildGuild");
            create.click(function() {     
                $("#create").modal("show");
                $(".carousel").carousel("pause");
            });

            var newGuild = $("#create_guild");

            newGuild.click(function() {
                var newName =  $("#uploadTitle").val();
                console.log(newName);
                ajax_createGuild(newName).then(function(response) {
                    if (response.message.successed) {
                        $("#create").modal("hide");
                        window.alert("Successfully created a new guild");
                        location.href="guild.php";
                    }
                }).catch(function(jqXHR) { 
                    console.log(jqXHR);
                });
            });



            // Inner
            var inner = $("#innerGuild");
            inner.empty();

            for (let i = 0; i < length / 2; i++) {
                var innerItem = $('<div class="carousel-item">');
                if (i == index) innerItem.addClass("active");

                // 0 ~ 4
                $('<br>').appendTo(innerItem);
                var inner1 = $('<div class="row"></div>');
                inner1.appendTo(innerItem);
                // All
                var innerAll = [inner1];

                for (let j = 0; j < 2; j++) {
                    if (i * 2 + j >= length) break;

                    let guildInfo = guildsInfo[i * 2 + j];
                    let guild_name = guildInfo.guild_name;
                    let guild_establishment = guildInfo.establishment;
                    let guild_person = guildInfo.leader;

                    var col = $('<div class="col-md-5" style="width:50%;"></div>');
                    var card = $('<div class="card card-cover h-100 overflow-hidden shadow-lg rounded-5"></div>');

                    if(guild_name == "月夜黑貓團")
                        card.css("background-image", "url('src/image/Black_Cats.png')");
                    else if(guild_name == "血盟騎士團")
                        card.css("background-image", "url('src/image/Knights_Of_Blood.png')");
                    else if(guild_name == "微笑棺木")
                        card.css("background-image", "url('src/image/Laughing_Coffin.png')");
                    else if(guild_name == "艾恩葛朗特解放軍")
                        card.css("background-image", "url('src/image/Aincrad_Leave_Forces.png')");
                    else if(guild_name == "黃金蘋果")
                        card.css("background-image", "url('src/image/Golden_Apple.png')");
                    else if(guild_name == "風林火山")
                        card.css("background-image", "url('src/image/Fuurinkazan.png')");
                    
                    var cardBody = $('<div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1"></div>');

                    // Body
                    $('<h2 class="fw-bold" style="text-shadow: 0 0 15px black;">' + guild_name +'</h2>').appendTo(cardBody);
                    $('<ul class="d-flex mt-auto">').appendTo(cardBody);
                    $('<li class="me-auto" style="list-style-type: none;"></li><br><br>').appendTo(cardBody);
                    $('<br><br>').appendTo(cardBody);
                    $('<li class="d-flex align-items-center me-3 justify-content-around fw-bold" style="text-shadow: 0 0 15px black;"><small><img src="src/image/level74.gif"width="32" height="32" class="rounded-circle border border-white"> '+guild_person+'</small><h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   </h1><small>'+guild_establishment+'</small></li>').appendTo(cardBody);
                    
                    cardBody.appendTo(card);
                    card.appendTo(col);
                    col.appendTo(innerAll[Math.floor(j / 2)]);
                    
                    card.click(function() {     
                       
                        //每次生成圖表前要先破壞前有的
                        $("#guildChart").remove();  
                        $("#Chart").append('<canvas id="guildChart"></canvas>');

                        ajax_getGuildDetail(guild_name).then(function(response) {
                            if (response.message.successed) {
                                console.log(response.memberDistribution);
                                let detail = new Map();

                                let guildsNumber = 0;
                                response.memberDistribution.forEach(function(element) {
                                    detail.set(element.lv, element.num);
                                    guildsNumber+=element.num;
                                });

                                guild.showGraph($("#guildChart"), [...detail.keys()], [...detail.values()]);

                                $("#description").modal("show");
                                $(".carousel").carousel("pause");

                                // 資訊
                                $("#descriptionHeaderTitle").html("SAO Guild｜Description");
                                $("#guildName").html("Guild Name：");
                                $("#mainDescription").html(guild_name);
                                $("#guildPerson").html("Founder：");
                                $("#personDescription").html(guild_person);
                                $("#date").html("Date created：");
                                $("#dateDescription").html(guild_establishment);

                                //其他資訊
                                $("#guildTitle").html("SAO Guild｜Other Description");

                                var info = $("#info");
                                info.empty();


                                var title = $('<div class="d-flex justify-content-between align-items-center"></div>')
                                
                                title.appendTo(info);

                                // people
                                var people = $('<span style="font-weight: bold">There is '+guildsNumber+' member(s) in the guild.</span>')
                                
                                people.appendTo(title);

                                var join=$("#join");
                                join.click(function() {     
                                    var yes=window.confirm("Are you sure you want to join this guild?");

                                    if(yes){
                                        ajax_joinGuild(guild_name).then(function(response) {
                                            if (response.message.successed) {
                                                window.alert("success");
                                                location.href="guild.php";
                                            }
                                        }).catch(function(jqXHR) { 
                                            console.log(jqXHR);
                                        });
                                    }
                                });
                            }
                        }).catch(function(jqXHR) { 
                            console.log(jqXHR);
                        });


                       
                    });
                }

                innerItem.appendTo(inner);
            }
        }
        else
            return;
    }).catch(function(jqXHR) {
        console.log(jqXHR)
    });

    
}

function ajax_getGuildALL() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Guild/getAll.php",
            dataType: "json",
            data: {
            },
            success: function(response) {
                resolve(response)
            },
            error: function(jqXHR) {
                reject(jqXHR)
            }
        })
    });
}

function ajax_getGuildDetail(__guild_name) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Guild/getGuildDetail.php",
            dataType: "json",
            data: {
                guild_name: __guild_name
            },
            success: function(response) {
                resolve(response)
            },
            error: function(jqXHR) {
                reject(jqXHR)
            }
        })
    });
}

function ajax_createGuild(__guild_name) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Guild/createGuild.php",
            dataType: "json",
            data: {
                guild_name: __guild_name
            },
            success: function(response) {
                resolve(response)
            },
            error: function(jqXHR) {
                reject(jqXHR)
            }
        })
    });
}

function ajax_quitGuild(__guild_name) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Player/updatePlayer.php",
            dataType: "json",
            data: {
                guild_name: __guild_name
            },
            success: function(response) {
                resolve(response)
            },
            error: function(jqXHR) {
                reject(jqXHR)
            }
        })
    });
}

function ajax_joinGuild(__guild_name) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Player/updatePlayer.php",
            dataType: "json",
            data: {
                guild_name: __guild_name
            },
            success: function(response) {
                resolve(response)
            },
            error: function(jqXHR) {
                reject(jqXHR)
            }
        })
    });
}

function ajax_searchPlayer(__name) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Player/searchPlayer.php",
            dataType: "json",
            data: {
                name: __name
            },
            success: function(response) {
                resolve(response)
            },
            error: function(jqXHR) {
                reject(jqXHR)
            }
        })
    });
}