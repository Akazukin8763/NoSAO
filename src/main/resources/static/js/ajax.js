/**
 * Player
 */

// checkNameExist
export function ajax_checkNameExist(__name) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Player/checkNameExist.php",
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

// registerPlayer
export function ajax_registerPlayer(__name, __attack, __health, __defense, __reaction, __agile) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Player/registerPlayer.php",
            dataType: "json",
            data: {
                name: __name,
                attack: __attack,
                health: __health,
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

// showAllPlayer
export function ajax_getPlayerList() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Player/getPlayerList.php",
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

// searchPlayer
export function ajax_searchPlayer(__name) {
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

// updatePlayer_description
export function ajax_updatePlayer_description(__description) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Player/updatePlayer.php",
            dataType: "json",
            data: {
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

// updatePlayer_level
export function ajax_updatePlayer_level(__levels) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Player/updatePlayer.php",
            dataType: "json",
            data: {
                levels: __levels
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

/**
 * Aincrad
 */

// getDescription
export function ajax_getDescription() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "POST",
            url: "API/Aincrad/getDescription.php",
            dataType: "json",
            data: {
            },
            success: function(response) {
                resolve(response)
            },
            error: function(jqXHR) {
                reject(jqXHR)
            }
        });
    });
}

/**
 * Guild
 */

// getGuildDetail
export function ajax_getGuildDetail(__guild_name) {
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