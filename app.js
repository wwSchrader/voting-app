if ((process.env.NODE_ENV || 'development') === 'development') {
  require('dotenv').config();
}
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var datastore = require("./datastore").async;
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var flash = require('connect-flash');
var bcrypt = require('bcrypt');

var index = require('./routes/index');
var users = require('./routes/users')(passport);
var addVote = require('./routes/polls');
var getVotes = require('./routes/polls');
var getPollDetail = require('./routes/polldetail');
var deleteSinglePoll = require('./routes/polldetail');
var submitVote = require('./routes/polldetail');
var addOptionandSubmitVote = require('./routes/addoption');

var app = express();



app.use(logger('dev'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// setup our datastore
datastore.connect('userCollection');

datastore.connect('pollCollection');

passport.use(new LocalStrategy(
  {passReqToCallback: true},
  function(req, username, password, done) {
    datastore.findUser(username)
      .then(response => {
        if (response === null || username !== response.username) {
          return done(null, false, req.flash( 'authMessage', 'Incorrect username'));
        }

        bcrypt.compare(password, response.bcryptHash)
          .then(pswdMatch => {
            if (!pswdMatch) {
              return done(null, false, req.flash( 'authMessage', 'Incorrect password'));
            } else {
              return done(null, response);
            }
          })
      })
      .catch(ex => {
        return done(ex);
      });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FB_REDIRECT + "/api/auth/facebook/callback",
    profileFields: ['email']
  },
  function(accessToken, refreshToken, profile, done) {
    consoel.log("facebook search");
    datastore.findOrCreateUser({username: profile.emails[0].value}, {facebookId: profile.id})
      .then(response => {
        console.log("facebook success");
        return done(null, response.value);
      })
      .catch(ex => {
        console.log("facebook failure");
        console.log(ex);
        return done(ex);
      });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  datastore.findUserById(id)
    .then(response => {
      return done(null, response);
    })
    .catch(ex => {
      done(ex);
    });
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.all('*', function(request,response, next) {
    request.datastore = datastore;
    next();
});

app.all('*', function(request,response, next) {
    request.passport = passport;
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



app.use('/', index);
app.use('/users', users);
app.use('/api/addvote', addVote);
app.use('/api/getvotes', getVotes);
app.use('/api/getpoll/*', getPollDetail);
app.use('/api/deletepoll/*', deleteSinglePoll);
app.use('/api/submitvote/*', submitVote);
app.use('/api/addoptionandvote/*', addOptionandSubmitVote);
app.use('/api/auth', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("404 error message");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
