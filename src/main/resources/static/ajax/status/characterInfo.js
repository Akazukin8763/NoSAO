export function getAbility(__name) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/status/getCharacterAbility",
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

export function getDescription(__name) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/status/getCharacterDescription",
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