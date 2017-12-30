var express = require('express');
var router = express.Router();
var playerDataAccess = require('../dataaccess/players');

/* GET users listing. */
router.get('/', function(req, res, next) {
    playerDataAccess.getPlayerStatus((players) => {
        res.send(players);
    });
});

router.get('/healthbars', function(req, res, next) {

    function getPercent(max, current){
        if(max===0){
            return 0;
        }
        return Math.floor((current/max)*100)
    }

    playerDataAccess.getPlayerStatus((players) => {
        var healthstatus = [];
        for(var i in players){
            var player = players[i];
            healthstatus.push({
                "player": player,
                "hp":{
                    "max": player.character.total_hp,
                    "current": player.character.current_hp,
                    "percent": getPercent(player.character.total_hp, player.character.current_hp)
                },
                "stamina":{
                    "max":  player.character.total_stamina,
                    "current": player.character.current_stamina,
                    "percent": getPercent(player.character.total_stamina, player.character.current_stamina)
                },
                "forcefield":{
                    "max":  player.character.total_forcefield,
                    "current": player.character.current_forcefield,
                    "percent": getPercent(player.character.total_forcefield, player.character.current_forcefield)
                },
                "resolve":{
                    "max":  player.character.total_resolve,
                    "current": player.character.current_resolve,
                    "percent": getPercent(player.character.total_resolve, player.character.current_resolve)
                }
            });
        }
        console.log(healthstatus);

        res.render("healthbars", { title:"Health Bars", healthstatus: healthstatus});
    });
});

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
