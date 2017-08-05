var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {
    req.datastore.insert(req.body)
        .then(response => {
            res.send(JSON.stringify({insertedId: response.insertedId}));
        })
        .catch((e) => {
            console.log(e);
        });

});

router.get('/', function(req, res) {
    req.datastore.getAllNames()
        .then(response => {
            res.send(JSON.stringify(response));
        })
        .catch((e) => {
            console.log(e);
        })

});

module.exports = router;
