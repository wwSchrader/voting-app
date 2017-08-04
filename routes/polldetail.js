var express = require('express');
var router = express.Router();




router.get('/', function(req, res) {
    req.datastore.getPollDetail(req.query.id)
        .then(response => {
            res.send(JSON.stringify(response[0]));
        })
        .catch((e) => {
            res.sendStatus(500)
            console.log(e);
        });

});

module.exports = router;