const core = require('./core');
const express = require('./config/express');
const logger = require('./utilities/logger');
const swagger = require('./config/swagger');

const MODULENAME = 'SERVER';

module.exports = {
    start: (server) => {
        return new Promise((resolve, reject) => {
            if(!server) server = express();
            swagger(server);
            core.init(server)
                .then(_ => {
                    resolve(server);
                })
                .catch(err => {
                    logger.error(MODULENAME, err);
                    reject(server);
                })
        })
    }
}
