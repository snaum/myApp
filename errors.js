'use strict'
const VError = require('verror');

class AppError extends WError{
    constructor(message){
        super(message);
    }
}