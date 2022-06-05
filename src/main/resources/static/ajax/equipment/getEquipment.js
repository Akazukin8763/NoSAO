export function getEquipmentByType(__type) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/equipment/getEquipmentByType",
            dataType: "json",
            data: {
                type: __type
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

export function getEquipmentByTypeAndNameLike(__type, __name) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/equipment/getEquipmentByTypeAndNameLike",
            dataType: "json",
            data: {
                type: __type,
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

export function getCharacterEquipmentInfo(__name) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/equipment/getCharacterEquipmentInfo",
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