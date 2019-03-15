'use strict'

/*
TODO: this needs to get sorted out. 
Is this the TOP level controller that delegates to the others?
How will the sub controllers be organized? view vs API? by component? by feature? by page?
*/
const logger = require('../helpers/logHelper');

const express = require('express');

let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.debug("...");
  
  res.render('index', { title: 'Express',  user : req.user});
});

module.exports = router;
