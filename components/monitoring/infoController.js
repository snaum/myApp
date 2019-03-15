'use strict';
const logger = require('../../helpers/logHelper');

const express = require('express');
let router = express.Router();

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

//TODO check on health of dependant services
router.get('/health', function(req, res){
    res.status(200).send("Healthy");
});

module.exports = router;
