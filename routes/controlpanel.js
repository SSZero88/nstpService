var express = require('express');
var router = express.Router();
var playerDataAccess = require('../dataaccess/players');

/* GET control panel - this page allows a user to update player status. */
router.get('/', function(req, res, next) {
  var players = playerDataAccess.getPlayerStatus( (players)=>{
    res.render('controlpanel', {title: 'Player Status', players: players});
  })
});

/* POST control panel - this is called on submitting the form and updates player status */
router.post('/', function(req, res, next) {
    console.log(req.body);
    var playerstatus = req.body.player;
    var pending = playerstatus.length;

    for(var i in playerstatus){
      var status = playerstatus[i];
      console.log('updating '+status.name);
      playerDataAccess.updatePlayerStatus(status, (st)=>{
        console.log('updated '+st.name);
        if(0 == --pending){
            res.redirect('back');
        }
      });
    }
});

module.exports = router;
