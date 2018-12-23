'use strict';

const winston = require('winston');

module.exports = {
    performanceLog: function(label, startTime){
        winston.log('info', label, {start:startTime, durationInMs:Date.now()-startTime});        
    },
    errorLog: function(){
    }
}