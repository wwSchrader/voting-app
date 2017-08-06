var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    req.datastore.getPollDetail(req.query.id)
        .then(response => {
            console.log(response[0]);
            res.send(JSON.stringify(response[0]));
        })
        .catch((e) => {
            res.sendStatus(500)
            console.log(e);
        });

});

router.delete('/', function(req, res) {
    req.datastore.deleteOnePoll(req.query.id)
        .then(response => {
            console.log(response.result.ok);
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

router.put('/', function(req, res) {
    req.datastore.addVoteToOption(req.query.id, req.query.vote)
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
})

module.exports = router;