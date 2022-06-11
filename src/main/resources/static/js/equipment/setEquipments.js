// Variable
var _initData = {"name": "", "ability": {"attack": 0, "health": 0, "defense": 0, "reaction": 0, "agile": 0}};
var _currentHelmetData;
var _currentChestplateData;
var _currentVambraceData;
var _currentCuishData;
var _currentMainData;
var _currentSubData;

export function getInitData() {
    return _initData;
}
export function getHelmetData() {
    return _currentHelmetData;
}
export function setHelmetData(currentHelmetData) {
    _currentHelmetData = currentHelmetData;
}
export function getChestplateData() {
    return _currentChestplateData;
}
export function setChestplateData(currentChestplateData) {
    _currentChestplateData = currentChestplateData;
}
export function getVambraceData() {
    return _currentVambraceData;
}
export function setVambraceData(currentVambraceData) {
    _currentVambraceData = currentVambraceData;
}
export function getCuishData() {
    return _currentCuishData;
}
export function setCuishData(currentCuishData) {
    _currentCuishData = currentCuishData;
}
export function getMainData() {
    return _currentMainData;
}
export function setMainData(currentMainData) {
    _currentMainData = currentMainData;
}
export function getSubData() {
    return _currentSubData;
}
export function setSubData(currentSubData) {
    _currentSubData = currentSubData;
}

// Function
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

    refreshHelmet(helmet);
    refreshChestplate(chestplate);
    refreshVambrace(vambrace);
    refreshCuish(cuish);
    refreshMain(main);
    refreshSub(sub);
}

export function refreshHelmet(helmet) {
    let helmetFrame = $("#armorHelmet");
    helmetFrame.empty();

    let cardHelmet = $('<div class="card-image"></div>');
    
    if (helmet === undefined || helmet.name === "") {
        $('<img class="card-img-top" style="height: 19.7vh;">').appendTo(cardHelmet);
        $('<div><h5>Empty...</h5></div>').appendTo(cardHelmet);
        _currentHelmetData = _initData;
    }
    else {
        $('<img src="' + helmet.img + '" class="card-img-top" style="height: 19.7vh;">').appendTo(cardHelmet);
        $('<div><h5>' + helmet.name + '</h5></div>').appendTo(cardHelmet);
        _currentHelmetData = helmet;
    }

    cardHelmet.appendTo(helmetFrame);
}

export function refreshChestplate(chestplate) {
    let chestplateFrame = $("#armorChestplate");
    chestplateFrame.empty();

    let cardChestplate = $('<div class="card-image"></div>');

    if (chestplate === undefined || chestplate.name === "") {
        $('<img class="card-img-top" style="height: 19.7vh;">').appendTo(cardChestplate);
        $('<div><h5>Empty...</h5></div>').appendTo(cardChestplate);
        _currentChestplateData = _initData;
    }
    else {
        $('<img src="' + chestplate.img + '" class="card-img-top" style="height: 19.7vh;">').appendTo(cardChestplate);
        $('<div><h5>' + chestplate.name + '</h5></div>').appendTo(cardChestplate);
        _currentChestplateData = chestplate;
    }

    cardChestplate.appendTo(chestplateFrame);
}

export function refreshVambrace(vambrace) {
    let vambraceFrame = $("#armorVambrace");
    vambraceFrame.empty();
    
    let cardVambrace = $('<div class="card-image"></div>');

    if (vambrace === undefined || vambrace.name === "") {
        $('<img class="card-img-top" style="height: 19.7vh;">').appendTo(cardVambrace);
        $('<div><h5>Empty...</h5></div>').appendTo(cardVambrace);
        _currentVambraceData = _initData;
    }
    else {
        $('<img src="' + vambrace.img + '" class="card-img-top" style="height: 19.7vh;">').appendTo(cardVambrace);
        $('<div><h5>' + vambrace.name + '</h5></div>').appendTo(cardVambrace);
        _currentVambraceData = vambrace;
    }

    cardVambrace.appendTo(vambraceFrame);
}

export function refreshCuish(cuish) {
    let cuishFrame = $("#armorCuish");
    cuishFrame.empty();

    let cardCuish = $('<div class="card-image"></div>');

    if (cuish === undefined || cuish.name === "") {
        $('<img class="card-img-top" style="height: 19.7vh;">').appendTo(cardCuish);
        $('<div><h5>Empty...</h5></div>').appendTo(cardCuish);
        _currentCuishData = _initData;
    }
    else {
        $('<img src="' + cuish.img + '" class="card-img-top" style="height: 19.7vh;">').appendTo(cardCuish);
        $('<div><h5>' + cuish.name + '</h5></div>').appendTo(cardCuish);
        _currentCuishData = cuish;
    }

    cardCuish.appendTo(cuishFrame);
}

export function refreshMain(main) {
    let mainFrame =$("#weaponMain");
    mainFrame.empty();
    
    let cardMain = $('<div class="card-image"></div>');
    
    if (main === undefined || main.name === "") {
        $('<img class="card-img-top" style="height: 19.7vh;">').appendTo(cardMain);
        $('<div><h5>Empty...</h5></div>').appendTo(cardMain);
        _currentMainData = _initData;
    }
    else {
        $('<img src="' + main.img + '" class="card-img-top" style="height: 19.7vh;">').appendTo(cardMain);
        $('<div><h5>' + main.name + '</h5></div>').appendTo(cardMain);
        _currentMainData = main;
    }

    cardMain.appendTo(mainFrame);
}

export function refreshSub(sub) {
    let subFrame = $("#weaponSub");
    subFrame.empty();
    
    let cardSub = $('<div class="card-image"></div>');

    if (sub === undefined || sub.name === "") {
        $('<img class="card-img-top" style="height: 19.7vh;">').appendTo(cardSub);
        $('<div><h5>Empty...</h5></div>').appendTo(cardSub);
        _currentSubData = _initData;
    }
    else {
        $('<img src="' + sub.img + '" class="card-img-top" style="height: 19.7vh;">').appendTo(cardSub);
        $('<div><h5>' + sub.name + '</h5></div>').appendTo(cardSub);
        _currentSubData = sub;
    }

    cardSub.appendTo(subFrame);
}