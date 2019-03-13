'use strict'

/*
TODO: this needs to get sorted out. 
Is this the TOP level controller that delegates to the others?
How will the sub controllers be organized? view vs API? by component? by feature? by page?
*/

const express = require('express');

var passport = require('passport');
var Account = require('../components/accounts/account');
let authNHelper = require('../helpers/authNHelper');

var userDao = require('../components/users/userDao');

let User = require('../components/users/user');


let router = express.Router();


router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register1', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
          console.log("error!! "+err.message);
          return res.render('register', { error : err.message });
      }

      passport.authenticate('local')(req, res, function () {
        req.session.save(function (err) {
          if (err) {
              return next(err);
          }
          res.redirect('/');
        });
      });
  });
});

router.post('/register2', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let email = username +"@aol.com";
  let firstname = username+" jr.";
  let lastname = "von "+ username;
  let language = "en-US";
  let phone = 5558675309;
  userDao.register_old(email, username, password, firstname, lastname, language, phone);
});

router.post('/register', function(req, res) {
  
  let username = req.body.username;
  let password = req.body.password;
  let email = username +"@aol.com";
  let firstname = username+" jr.";
  let lastname = "von "+ username;
  let language = "en-US";
  let phone = 5558675309;

  let user = new User(email, password);
  user.firstname = firstname;
  user.lastname = lastname;
  user.language = language;
  user.phone = phone;

  authNHelper.register(user).then(function(result){
    res.redirect('/');
  }, function(err){
    return res.render('register', { error : err.message });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

//TODO login error?
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
