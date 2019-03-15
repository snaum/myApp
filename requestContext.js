'use strict';
const assert = require('assert');

class RequestContext{
    
    constructor(req){
        this.startTime = Date.now();
        this.body = req.body;
        this.method = req.method;
        this.url = req.url;
        this.params = req.params;
        this.protocol = req.protocol;
        this.query = req.query;
        this.requestId = req.get('X-Request-ID');
        this.authorization = req.get('Authorization');
        this.cacheControl = req.get('Cache-Control');
        this.cookie = req.get('Cookie');
        this.userAgent = req.get('User-Agent');
        this.userId;
    }
    
    
}

module.exports = RequestContext;
