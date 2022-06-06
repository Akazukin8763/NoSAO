export function getCharacters() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/player/getCharacters",
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