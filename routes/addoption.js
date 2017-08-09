var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../library.js');

router.put('/', ensureAuthenticated, function(req, res) {
    req.datastore.addOptionAndVote(req.query.id, req.query.votename)
        .then(response => {
            res.sendStatus(200);
        })
        .catch((e) => {
            res.sendStatus(500);
            console.log(e);
        });
});



module.exports = router;