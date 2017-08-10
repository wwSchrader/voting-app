var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

module.exports = function(passport) {
  router.post('/login',
    passport.authenticate('local', { failWithError: true, flashFailure: true }),
    function(req, res) {
      // handle success
      console.log(req.user);
      return res.json({isLoggedIn: true, userId: req.user._id});
    },
    function(err, req, res, next) {
      // handle error
      return res.status(401).json({authError: req.flash('authMessage')[0]});
    }
  );

  router.get('/logout', function(req, res) {
    req.logout();
    res.json({isLoggedIn: false});
  });

    router.post('/register', (req, res, next) => {
        req.datastore.findUser(req.body.username)
          .then(response => {
            if (response !== null) {
              res.status(400).send("Already registered");
            } else {
              //convert password to hash and add it to the database
              bcrypt.hash(req.body.password, 13).
                then(hash => {
                  req.datastore.addUser({
                    username: req.body.username,
                    bcryptHash: hash
                  })
                    .then(() => {
                      passport.authenticate('local', (err, user, info) => {
                        if (err || !user) {
                          res.sendStatus(500);
                          console.log(err);
                          console.log(info);
                          console.log(user);
                        } else {
                          req.login(user, err => {
                            if (err) {
                              console.log("login error");
                              console.log(err)
                              return res.sendStatus(500);
                            } else {
                              return res.status(200).send("LOGGED_IN");
                            }
                          });
                        }
                      })(req, res);
                    })
                    .catch (ex => {
                      console.log("add user error");
                      res.sendStatus(500);
                    });
                })
            }
          })
          .catch((ex) => {
            console.log("finduser threw error" + ex);
            res.sendStatus(500);
          })
    });

    return router;
}