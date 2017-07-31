var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {
    console.log("add vote triggered");

    req.datastore.insert(req.body)
        .then(response => {
            res.sendStatus(200);
        })
        .catch((e) => {
            console.log(e);
        });

});

router.get('/', function(req, res) {
    console.log("get votes");
    req.datastore.getAllNames()
        .then(response => {
            res.send(JSON.stringify(response));
        })
        .catch((e) => {
            console.log(e);
        })

});

module.exports = router;
