var express = require('express');
var router = express.Router();

router.put('/', function(req, res) {
    req.datastore.addOptionAndVote(req.query.id, req.query.votename)
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