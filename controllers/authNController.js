'use strict';

const express = require('express');

var passport = require('passport');
let authNHelper = require('../helpers/authNHelper');

let router = express.Router();


router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {

  let userObj = {
     email : req.body.email,
     password : req.body.password,
     firstname : req.body.firstname,
     lastname : req.body.lastname,
     screenname : req.body.screenname,
     language : "en",
     phone : req.body.phone  
  }

  authNHelper.register(userObj).then(function(result){
    res.redirect('/');
  }, function(err){
    return res.render('register', { error : err.message });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, profile) {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.render('login', { error : profile.message }); 
        }
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
