var express = require('express');
var router = express.Router();
var playerDataAccess = require('../dataaccess/players');
var math = require('../lib/math');

/* GET players status. Returns JSON, to be used with external integrations */
router.get('/', function(req, res, next) {
    playerDataAccess.getPlayerStatus((players) => {
        res.send(players);
    });
});

/* GET /players/healthbars - a web page displaying all users' statuses. */
router.get('/healthbars', function(req, res, next) {
    playerDataAccess.getPlayerStatus((players) => {
        var healthstatus = [];
        for(var i in players){
            var player = players[i];
            healthstatus.push({
                "player": player,
                "hp":{
                    "max": player.character.total_hp,
                    "current": player.character.current_hp,
                    "percent": math.getPercent(player.character.total_hp, player.character.current_hp)
                },
                "stamina":{
                    "max":  player.character.total_stamina,
                    "current": player.character.current_stamina,
                    "percent": math.getPercent(player.character.total_stamina, player.character.current_stamina)
                },
                "forcefield":{
                    "max":  player.character.total_forcefield,
                    "current": player.character.current_forcefield,
                    "percent": math.getPercent(player.character.total_forcefield, player.character.current_forcefield)
                },
                "resolve":{
                    "max":  player.character.total_resolve,
                    "current": player.character.current_resolve,
                    "percent": math.getPercent(player.character.total_resolve, player.character.current_resolve)
                }
            });
        }
        console.log(healthstatus);

        res.render("healthbars", { title:"Health Bars", healthstatus: healthstatus});
    });
});

/* POST /players/<id>/status - restful service that updates player status. To be used by external integrations */
router.post('/:id/status', function(req, res, next) {
    var id = req.params.id;
    var status = req.body;
    console.log(status);
    connection.query('CALL updateCharacterStatus(?,?,?,?,?);', [id, status.forcefield, status.hp, status.stamina, status.resolve],(err, result) => {
        if(err) throw err;
        if(result === undefined){
            console.log("no rows returned");
            return;
        }
        res.send();
    });
});

module.exports = router;
