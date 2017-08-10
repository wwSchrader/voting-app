var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../library.js');

router.get('/', function(req, res) {
    req.datastore.getPollDetail(req.query.id)
        .then(response => {
            let responsePoll = response[0];
            responsePoll.userIp = req.ip;
            res.send(JSON.stringify(responsePoll));
        })
        .catch((e) => {
            res.sendStatus(500)
            console.log(e);
        });
});

router.delete('/', ensureAuthenticated, function(req, res) {
    req.datastore.deleteOnePoll(req.query.id)
        .then(response => {
            if (response.result.ok !== 1) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200)
            }
        })
        .catch((e) => {
            res.sendStatus(500)
            console.log(e);
        });
});

//submit vote
router.put('/', function(req, res) {
    req.datastore.addVoteToOption(req.query.id, req.query.vote, req.ip)
        .then(response => {
            if (response.result.ok !== 1) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200)
            }
        })
        .catch((e) => {
            res.sendStatus(500)
            console.log(e);
        });
});

module.exports = router;