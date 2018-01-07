'use strict'
const assert = require('assert');

class User{
    constructor(name){
        assert.equal(typeof (name), 'string',"argument 'name' must be a string");

        this.name = name;
        this._private;
    }

    getName(){
        return this.name;
    }
}

module.exports = User;
