var express = require('express');
var router = express.Router();
var playerDataAccess = require('../dataaccess/players');

/* GET home page. */
router.get('/', function(req, res, next) {
  var players = playerDataAccess.getPlayerStatus( (players)=>{
    res.render('controlpanel', {title: 'Player Status', players: players});
  })
});

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
