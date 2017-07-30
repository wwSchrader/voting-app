var express = require('express');
var router = express.Router();

var allVotes = [];


router.post('/', function(req, res) {
  allVotes.push(req.body);
  res.sendStatus(200)
  console.log(allVotes);
});

router.get('/', function(req, res) {
    console.log("Get request: " + allVotes);
    res.send(JSON.stringify(allVotes));
});

module.exports = router;
