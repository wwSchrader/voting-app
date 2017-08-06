require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var datastore = require("./datastore").async;

var index = require('./routes/index');
var users = require('./routes/users');
var addVote = require('./routes/polls');
var getVotes = require('./routes/polls');
var getPollDetail = require('./routes/polldetail');
var deleteSinglePoll = require('./routes/polldetail');
var submitVote = require('./routes/polldetail');
var addOptionandSubmitVote = require('./routes/addoption');

var app = express();

// setup our datastore

datastore.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.all('*', function(request,response, next) {
    request.datastore = datastore;
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', index);
app.use('/users', users);
app.use('/api/addvote', addVote);
app.use('/api/getvotes', getVotes);
app.use('/api/getpoll/*', getPollDetail);
app.use('/api/deletepoll/*', deleteSinglePoll);
app.use('/api/submitvote/*', submitVote);
app.use('/api/addoptionandvote/*', addOptionandSubmitVote)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
