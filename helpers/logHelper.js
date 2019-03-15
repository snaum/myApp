'use strict';
const winston = require('winston');

class LoggingService{

    constructor() {
        const logger = winston.createLogger({
            level: 'debug',
            format: winston.format.logstash(),
            //defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.Console({ level: 'debug', stderrLevels:['error'] }),
            ]
        });

        this.debug = (...args) => logger.debug(...args);
        this.info = (...args) => logger.info(...args);
        this.warn = (...args) => logger.warn(...args);
        this.error = (...args) => logger.error(...args);

        this.info("CHILL WINSTON! ... I put it in the logs.");
    }
}
//morgan logs http request and response (access log), winston for log statements (debug, info, error...)

module.exports = new LoggingService();