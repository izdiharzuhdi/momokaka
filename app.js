var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/database.js')
mongoose.Promise = global.Promise
mongoose.connect(configDB.url, configDB.options);
// set Promise provider to bluebird
// mongoose.Promise = require('bluebird');


require('./config/passport.js')(passport);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(parsth.join(__dirname, 'public', 'favicon.ico')));
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(logger('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({secret:'anystring',// session secret
                saveUninitialized: true,
                resave: true}))
app.use(passport.initialize());
app.use(passport.session());// persistent login sessions
app.use(flash());// use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, 'public')));


// routes ======================================================================
require('./routes/routes.js')(app, passport);
require('./routes/pages.js')(app);
require('./routes/fbwebhook.js')(app);


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
