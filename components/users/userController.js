'use strict'

const express = require('express');

const RequestContext = require('../../requestContext');
const User = require('./user');

let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  let context = new RequestContext(req);
  let user = new User('simon');
  res.send("respond with a "+user.constructor.name+":"+user.getName());
});

module.exports = router;
