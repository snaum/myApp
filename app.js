const express = require('express');
const app = express();

const path = require('path');
const favicon = require('serve-favicon');

//morgan logs http request and response (access log), winston for log statements (debug, info, error...)
//TODO: why???
const winston = require('winston');
winston.info("CHILL WINSTON! ... I put it in the logs.");
const logger = require('morgan');
//TODO: http request/response logging using morgan
app.use(logger('combined'));


//TODO: session management with Redis
const session  = require('express-session');
var RedisStore = require('connect-redis')(session);
var mongoose = require('mongoose');

const bodyParser = require('body-parser');
const compression = require('compression');

//security, helmet for safe headers, csurf for CSRF, passport for authentication
const helmet = require('helmet');
const csurf = require('csurf');







/*  TODO: For prod enable Redis and rate limited for DOS protection
var client = require('redis').createClient();
var limiter = require('express-limiter')(app, client);

limiter({
  path: '/api/action',
  method: 'get',
  lookup: ['connection.remoteAddress'],
  // 150 requests per hour 
  total: 150,
  expire: 1000 * 60 * 60
})
*/







/* AUTHENTICATION */
let authNHelper = require('./helpers/authNHelper');
const passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
app.use(session({ 
//  store: new RedisStore(options),
  secret: 'GdkDn5Zilu4zvBLmWJ0pIFvdclTwl9mXnU0aXAxIT6cCWnWbqkWyzjQzIdEwWSdx',
  resave: true, 
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
  function(username, password, done) {
    /*
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
    */
    return authNHelper.authenticate(username, password, done);
  }
));
passport.serializeUser(authNHelper.serializeUser);
passport.deserializeUser(authNHelper.deserializeUser);


/*
TODO: is this DEAD code yet?
var Account = require('./components/accounts/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
*/


//mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

mongoose.connect('mongodb://localhost/newLocalTest');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//secure headers
app.use(helmet());
//TODO generates a CSRF token for use in API and UI forms
//app.use(csrf({ cookie: true }))

app.use(compression());

app.use(favicon(path.join(__dirname, 'ui', 'favicon-96x96.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'ui')));



/*
*
*   ROUTES SECTION
*
*/

const landingPage = require('./controllers/landingPage');
app.use('/', landingPage);

const authN = require('./controllers/authNController');
app.use('/', authN);

const users = require('./components/users/userController');
app.use('/users', authNHelper.ensureAuthenticated, users);


//error handlers


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
