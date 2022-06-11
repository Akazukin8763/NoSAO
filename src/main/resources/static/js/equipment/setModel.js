import { getInitData, setHelmetData, setChestplateData, setVambraceData, setCuishData, setMainData, setSubData } from "./setEquipments.js";
import { refreshHelmet, refreshChestplate, refreshVambrace, refreshCuish, refreshMain, refreshSub } from "./setEquipments.js";

export function initCurrent(modelFrame, data) {
    modelFrame.empty();

    if (data.length == 0) {
        $('<span style="color: rgb(200, 0, 0);">Empty...</span>').appendTo(modelFrame);
    }
    else if (data.length == 1) {
        let kind = data[0].type.toLowerCase();

        let attack = data[0].ability.attack;
        let health = data[0].ability.health;
        let defense = data[0].ability.defense;
        let reaction = data[0].ability.reaction;
        let agile = data[0].ability.agile;

        let card = $('<div class="card mb-3" style="background-color: transparent;"></div>');
        let row = $('<div class="row g-0"></div>');

        let imgInfo = $('<div class="col-md-4" style="height: 26vh;"><div>');
        $('<div style="height: 4vh;"></div>').appendTo(imgInfo);
        $('<img src="' + data[0].img + '" class="card-img-bottom" style="height: 18vh;">').appendTo(imgInfo);
        $('<div style="height: 4vh;"></div>').appendTo(imgInfo);
    
        let abilityInfo = $('<div class="col-md-8" style="height: 26vh;"><div>');
        let body = $('<div class="card-body"></div>');
        $('<h6 class="card-title">' + data[0].name + '</h6>').appendTo(body);
        $('<hr>').appendTo(body);
        $('<div class="d-flex justify-content-between"><span class="col-6">Attack</span><span class="col-6">' + (attack == 0 ? "±" : (attack > 0 ? "+" : "")) + attack + '</span></div>').appendTo(body);
        $('<div class="d-flex justify-content-between"><span class="col-6">Health</span><span class="col-6">' + (health == 0 ? "±" : (health > 0 ? "+" : "")) + health + '</span></div>').appendTo(body);
        $('<div class="d-flex justify-content-between"><span class="col-6">Defense</span><span class="col-6">' + (defense == 0 ? "±" : (defense > 0 ? "+" : "")) + defense + '</span></div>').appendTo(body);
        $('<div class="d-flex justify-content-between"><span class="col-6">Reaction</span><span class="col-6">' + (reaction == 0 ? "±" : (reaction > 0 ? "+" : "")) + reaction + '</span></div>').appendTo(body);
        $('<div class="d-flex justify-content-between"><span class="col-6">Agile</span><span class="col-6">' + (agile == 0 ? "±" : (agile > 0 ? "+" : "")) + agile + '</span></div>').appendTo(body);
        body.appendTo(abilityInfo);
    
        imgInfo.appendTo(row);
        abilityInfo.appendTo(row);
        row.appendTo(card);
        card.appendTo(modelFrame);

        // Take off Equipment
        card.click(function() {
            setData(kind, getInitData());
            $("#" + kind).modal("hide");
        });
    }
    else {
        $('<span style="color: rgb(200, 0, 0);">Data error</span>').appendTo(modelFrame);
    }
}

export function initAvailable(modelFrame, data) {
    modelFrame.empty();

    if (data.length == 0) {
        $('<span style="color: rgb(200, 0, 0);">Empty...</span>').appendTo(modelFrame);
    }
    else {
        let kind = data[0].type.toLowerCase();

        for (let i = 0; i < data.length; i++) {
            let attack = data[i].ability.attack;
            let health = data[i].ability.health;
            let defense = data[i].ability.defense;
            let reaction = data[i].ability.reaction;
            let agile = data[i].ability.agile;
    
            let card = $('<div class="card mb-3" style="background-color: transparent;"></div>');
            let row = $('<div class="row g-0"></div>');
        
            let imgInfo = $('<div class="col-md-4" style="height: 26vh;"><div>');
            $('<div style="height: 4vh;"></div>').appendTo(imgInfo);
            $('<img src="' + data[i].img + '" class="card-img-bottom" style="height: 18vh;">').appendTo(imgInfo);
            $('<div style="height: 4vh;"></div>').appendTo(imgInfo);
        
            let abilityInfo = $('<div class="col-md-8" style="height: 26vh;"><div>');
            let body = $('<div class="card-body"></div>');
            $('<h6 class="card-title">' + data[i].name + '</h6>').appendTo(body);
            $('<hr>').appendTo(body);
            $('<div class="d-flex justify-content-between"><span class="col-6">Attack</span><span class="col-6">' + (attack == 0 ? "±" : (attack > 0 ? "+" : "")) + attack + '</span></div>').appendTo(body);
            $('<div class="d-flex justify-content-between"><span class="col-6">Health</span><span class="col-6">' + (health == 0 ? "±" : (health > 0 ? "+" : "")) + health + '</span></div>').appendTo(body);
            $('<div class="d-flex justify-content-between"><span class="col-6">Defense</span><span class="col-6">' + (defense == 0 ? "±" : (defense > 0 ? "+" : "")) + defense + '</span></div>').appendTo(body);
            $('<div class="d-flex justify-content-between"><span class="col-6">Reaction</span><span class="col-6">' + (reaction == 0 ? "±" : (reaction > 0 ? "+" : "")) + reaction + '</span></div>').appendTo(body);
            $('<div class="d-flex justify-content-between"><span class="col-6">Agile</span><span class="col-6">' + (agile == 0 ? "±" : (agile > 0 ? "+" : "")) + agile + '</span></div>').appendTo(body);
            body.appendTo(abilityInfo);
        
            imgInfo.appendTo(row);
            abilityInfo.appendTo(row);
            row.appendTo(card);
            card.appendTo(modelFrame);

            // Wear Equipment
            card.click(function() {
                setData(kind, data[i]);
                $("#" + kind).modal("hide");
            });
        }
    }
}

function setData(type, data) {
    if (type === "helmet") {
        setHelmetData(data);
        refreshHelmet(data);
    }
    else if (type === "chestplate") {
        setChestplateData(data);
        refreshChestplate(data);
    }
    else if (type === "vambrace") {
        setVambraceData(data);
        refreshVambrace(data);
    }
    else if (type === "cuish") {
        setCuishData(data);
        refreshCuish(data);
    }
    else if (type === "main") {
        setMainData(data);
        refreshMain(data);
    }
    else if (type === "sub") {
        setSubData(data);
        refreshSub(data);
    }
}