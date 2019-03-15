'use strict';
const logger = require('../../helpers/logHelper');

const express = require('express');
let router = express.Router();


router.get('/loglevel', function(req, res){
    res.status(200).send("ok");
});

router.post('/loglevel', function(req, res){
    let logLevel = req.body.level;
    logger.setLogLevel(logLevel);
    res.status(200).send("ok");
});

module.exports = router;
