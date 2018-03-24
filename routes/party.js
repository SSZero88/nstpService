var express = require('express');
var router = express.Router();
var partyDataAccess = require('../dataaccess/party');
var math = require('../lib/math');

router.get('/experiencebar', function(req, res, next) {
    partyDataAccess.getPartyStatus((party) => {
        party.percent = math.getPercent(party.next_xp - party.prev_xp, party.current_xp - party.prev_xp);
        res.render("experiencebar", {title: "Party Experience", party: party});
    });
});

router.get(['/','/experience'], function(req, res, next) {
    partyDataAccess.getPartyStatus((party) => {
        party.percent = math.getPercent(party.next_xp - party.prev_xp, party.current_xp - party.prev_xp);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(party);
    });
});

module.exports = router;
