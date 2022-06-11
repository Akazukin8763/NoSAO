export function initEquipments(data) {
    let helmet, chestplate, vambrace, cuish, main, sub;

    for (let i = 0; i < data.length; i++) {
        if (data[i].type == "HELMET")
            helmet = data[i];
        else if (data[i].type == "CHESTPLATE")
            chestplate = data[i];
        else if (data[i].type == "VAMBRACE")
            vambrace = data[i];
        else if (data[i].type == "CUISH")
            cuish = data[i];
        else if (data[i].type == "MAIN")
            main = data[i];
        else if (data[i].type == "SUB")
            sub = data[i];
    }

    let helmetFrame = $("#armorHelmet");
    let chestplateFrame = $("#armorChestplate");
    let vambraceFrame = $("#armorVambrace");
    let cuishFrame = $("#armorCuish");
    let mainFrame =$("#weaponMain");
    let subFrame = $("#weaponSub");

    helmetFrame.empty();
    chestplateFrame.empty();
    vambraceFrame.empty();
    cuishFrame.empty();
    mainFrame.empty();
    subFrame.empty();
    
    let cardHelmet = $('<div class="card-image"></div>');
    let cardChestplate = $('<div class="card-image"></div>');
    let cardVambrace = $('<div class="card-image"></div>');
    let cardCuish = $('<div class="card-image"></div>');
    let cardMain = $('<div class="card-image"></div>');
    let cardSub = $('<div class="card-image"></div>');

    if (helmet === undefined) {
        $('<img class="card-img-top" style="height: 20.7vh;">').appendTo(cardHelmet);
        $('<div><h5>Empty...</h5></div>').appendTo(cardHelmet);
    }
    else {
        $('<img src="' + helmet.img + '" class="card-img-top" style="height: 20.7vh;">').appendTo(cardHelmet);
        $('<div><h5>' + helmet.name + '</h5></div>').appendTo(cardHelmet);
    }

    if (chestplate === undefined) {
        $('<img class="card-img-top" style="height: 20.7vh;">').appendTo(cardChestplate);
        $('<div><h5>Empty...</h5></div>').appendTo(cardChestplate);
    }
    else {
        $('<img src="' + chestplate.img + '" class="card-img-top" style="height: 20.7vh;">').appendTo(cardChestplate);
        $('<div><h5>' + chestplate.name + '</h5></div>').appendTo(cardChestplate);
    }

    if (vambrace === undefined) {
        $('<img class="card-img-top" style="height: 20.7vh;">').appendTo(cardVambrace);
        $('<div><h5>Empty...</h5></div>').appendTo(cardVambrace);
    }
    else {
        $('<img src="' + vambrace.img + '" class="card-img-top" style="height: 20.7vh;">').appendTo(cardVambrace);
        $('<div><h5>' + vambrace.name + '</h5></div>').appendTo(cardVambrace);
    }

    if (cuish === undefined) {
        $('<img class="card-img-top" style="height: 20.7vh;">').appendTo(cardCuish);
        $('<div><h5>Empty...</h5></div>').appendTo(cardCuish);
    }
    else {
        $('<img src="' + cuish.img + '" class="card-img-top" style="height: 20.7vh;">').appendTo(cardCuish);
        $('<div><h5>' + cuish.name + '</h5></div>').appendTo(cardCuish);
    }

    if (main === undefined) {
        $('<img class="card-img-top" style="height: 20.7vh;">').appendTo(cardMain);
        $('<div><h5>Empty...</h5></div>').appendTo(cardMain);
    }
    else {
        $('<img src="' + main.img + '" class="card-img-top" style="height: 20.7vh;">').appendTo(cardMain);
        $('<div><h5>' + main.name + '</h5></div>').appendTo(cardMain);
    }

    if (sub === undefined) {
        $('<img class="card-img-top" style="height: 20.7vh;">').appendTo(cardSub);
        $('<div><h5>Empty...</h5></div>').appendTo(cardSub);
    }
    else {
        $('<img src="' + sub.img + '" class="card-img-top" style="height: 20.7vh;">').appendTo(cardSub);
        $('<div><h5>' + sub.name + '</h5></div>').appendTo(cardSub);
    }

    cardChestplate.appendTo(chestplateFrame);
    cardVambrace.appendTo(vambraceFrame);
    cardHelmet.appendTo(helmetFrame);
    cardCuish.appendTo(cuishFrame);
    cardMain.appendTo(mainFrame);
    cardSub.appendTo(subFrame);
}