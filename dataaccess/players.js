module.exports = {
    /**
     * Gets the current player status.
     * @param callback
     */
    getPlayerStatus: function(callback){
        var players = [];
        connection.query('CALL getCharacterStatus();', (err, result) => {
            if(err) throw err;
            if(result === undefined){
                console.log("no rows returned");
                return;
            }
            var rows = result[0];
            for(var i in rows){
                var row = rows[i];
                //console.log(row.player);
                var player = {
                    "id": row.player_id,
                    "name": row.player,
                    "character": {
                        "id": row.char_id,
                        "name": row.name,
                        "race": row.race,
                        "class": row.class,
                        "total_forcefield": row.total_forcefield,
                        "total_hp": row.total_hp,
                        "total_stamina": row.total_stamina,
                        "total_resolve": row.total_resolve,
                        "current_forcefield": row.current_forcefield,
                        "current_hp": row.current_hp,
                        "current_stamina": row.current_stamina,
                        "current_resolve": row.current_resolve
                    }
                }
                players.push(player);
            }

            // execute callback
            callback(players);
        });
    },

    /***
     * Updates current player status.
     * @param status
     * @param callback
     */
    updatePlayerStatus: function(status, callback){
        connection.query('CALL updateCharacterStatus(?,?,?,?,?);',
            [
                status.id,
                status.current_forcefield,
                status.current_stamina,
                status.current_hp,
                status.current_resolve
            ],
            (err, result) => {
                if (err) throw err;
                console.log(status);
                callback(status);
            });
    }
}