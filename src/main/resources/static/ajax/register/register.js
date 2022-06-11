export function addNewCharacter(__name,__health,__attack,__defense,__reaction,__agile) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/registerCharacter",
            dataType: "json",
            data: {
                name: __name,
                health: __health,
                attack: __attack,
                defense: __defense,
                reaction: __reaction,
                agile: __agile
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