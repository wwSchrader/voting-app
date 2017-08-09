var express = require('express');
var router = express.Router();

module.exports = function(passport) {
  router.post('/login',
    passport.authenticate('local', { failWithError: true, flashFailure: true }),
    function(req, res) {
      // handle success
      return res.send("Logged In!");
    },
    function(err, req, res, next) {
      // handle error
      return res.status(401).send(req.flash('authMessage')[0]);
    }
  );

  router.get('/login', function (req, res) {
    res.send(req.flash);
  })

  router.get('/logout', function(req, res) {
    req.logout();
    res.send("Logged Out");
  });

    router.post('/register', (req, res, next) => {
        req.datastore.findUser(req.body.username)
          .then(response => {
            if (response !== null) {
              res.status(400).send("Already registered");
            } else {
              req.datastore.addUser(req.body)
                .then(response => {})
                .catch (ex => {
                  res.sendStatus(500);
                });
            }
          })
          .then(() => {
            passport.authenticate('local', (err, user, info) => {
              if (err || !user) {
                res.sendStatus(500);
                console.log(err);
                console.log(info);
              } else {
                req.login(user, err => {
                  if (err) {
                    console.log(err)
                    return res.sendStatus(500);
                  } else {
                    return res.status(200).send("Logged In!");
                  }
                });
              }
            })(req, res);
          })
          .catch((ex) => {
            console.log("finduser threw error" + ex);
            res.sendStatus(500);
          })
    });

    return router;
}