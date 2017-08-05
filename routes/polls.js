var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {
    let newPoll = Object.assign({}, req.body);

    //convert option name array into an array of objects with name and vote attributes
    newPoll.voteOptions = req.body.voteOptions.map((option) => {
        return ({
            optionName: option,
            optionVotes: 0
        });
    });

    req.datastore.insert(newPoll)
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
