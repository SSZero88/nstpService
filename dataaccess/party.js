module.exports = {
    /**
     * Gets the party status
     */
    getPartyStatus: function(callback) {
        var party = {};
        connection.query('CALL getPartyStatus(?)', [1], (err, result) => {
            if (err) throw err;
            if (result === undefined){
                console.log("no rows returned");
                return;
            }

            // should only return one row
            var rows = result[0];
            var curr = rows[0];

            var party = {
                id: curr.id,
                current_xp: curr.current_xp,
                next_xp: curr.next,
                level: curr.level
            };

            callback(party);
        });
    },

    updatePartyExperience: function(experience, callback){
        connection.query('CALL updatePartyExperience(?,?)',
            [
                1,
                experience
            ],
            (err, result) => {
                if (err) throw err;
                console.log("Party XP updated to " + experience);
                callback();
            })
    }
}