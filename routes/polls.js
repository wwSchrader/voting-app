var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../library.js');


router.post('/', ensureAuthenticated, function(req, res) {
    let newPoll = Object.assign({}, req.body);
    console.log(req.user);

    //convert option name array into an array of objects with name and vote attributes
    newPoll.voteOptions = req.body.voteOptions.map((option) => {
        return ({
            optionName: option,
            optionVotes: 0
        });
    });

    //add fields to keep track of poll creator and voters
    newPoll.creatorId = req.user._id;
    newPoll.voterList = [];

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
