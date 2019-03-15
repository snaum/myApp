const express = require('express');
const app = express();

const path = require('path');
const favicon = require('serve-favicon');

/*
//morgan logs http request and response (access log), winston for log statements (debug, info, error...)
const winston = require('winston');
winston.info("CHILL WINSTON! ... I put it in the logs.");
*/
const http_req_logger = require('morgan');
app.use(http_req_logger('combined'));

const logger = require('./helpers/logHelper');
logger.info("logger is up");

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
let jwtHelper = require('./helpers/JWTauthNHelper');

const passport = require('passport');
app.use(passport.initialize());

var LocalStrategy = require('passport-local');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
  
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'top_secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  return jwtHelper.authenticate(jwt_payload.user._id, done);
}));

passport.use(new LocalStrategy(
  function(email, password, done) {
    return authNHelper.authenticate(email, password, done);
  }
));

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
app.use('/users', passport.authenticate('jwt', { session : false }), users);

//unautenticated
const info = require('./components/monitoring/infoController');
app.use('/info', info);

//authenticated and ADMIN role
const admin = require('./components/monitoring/adminController');
app.use('/admin', passport.authenticate('jwt', { session : false }), admin);


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
