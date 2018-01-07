'use strict'
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

//security, helmet for safe headers, csurf for CSRF, passport for authentication
const helmet = require('helmet');
const csurf = require('csurf');
const passport = require('passport');

//logging morgan for http request and response, winston for log statements
const winston = require('winston');
winston.info("CHILL WINSTON! ... I put it in the logs.");
/*  For prod enable Redis and rate limited for DOS protection

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
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//secure headers
app.use(helmet())
//generates a CSRF token for use in API and UI forms
//app.use(csrf({ cookie: true }))
//http request/response logging using morgan
app.use(logger('combined'));
app.use(compression());

app.use(favicon(path.join(__dirname, 'ui', 'favicon-96x96.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'ui')));



/*
*
*   ROUTES SECTION
*
*/

const landingPage = require('./controllers/landingPage');
app.use('/', landingPage);

const users = require('./components/users/userController');
app.use('/users', users);


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