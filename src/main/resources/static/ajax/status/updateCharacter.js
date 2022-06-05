export function updateDescription(__id, __description) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/status/updateCharacterDescription",
            dataType: "json",
            data: {
                id: __id,
                description: __description
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

export function updateEquipments(__id, __helmet, __chestplate, __vambrace, __cuish, __main, __sub) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/status/updateCharacterEquipments",
            dataType: "json",
            data: {
                id: __id,
                helmet: __helmet,
                chestplate: __chestplate,
                vambrace: __vambrace,
                cuish: __cuish,
                main: __main,
                sub: __sub
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