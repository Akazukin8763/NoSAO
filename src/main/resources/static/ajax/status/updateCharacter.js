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