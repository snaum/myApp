'use strict';

const express = require('express');

var passport = require('passport');
let authNHelper = require('../helpers/authNHelper');
let jwtHelper = require('../helpers/JWTauthNHelper');


let router = express.Router();


router.get('/register', function(req, res) {
  res.render('register', { });
});


//TODO input validation https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Password_Storage_Cheat_Sheet.md
router.post('/register', function(req, res) {
  let passwordHash  = authNHelper.passwordHasher(req.body.password);
  let userObj = {
     email : req.body.email,
     passwordHash : passwordHash,
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
            return res.render('login', { authError : {message: profile.message }}); 
        }
        req.logIn(user, { session : false }, function(err) {
            if (err) { 
                return next(err); 
            }
            const tokenObj = jwtHelper.createToken(user);
            res.cookie("jwt", tokenObj.jwt, {httpOnly:true, secure: true, sameSite:true});
            res.cookie("user", tokenObj.payload, {secure: true, sameSite:true});
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
