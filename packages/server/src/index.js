const core = require('./core');
const express = require('./config/express');
const logger = require('./utilities/logger');
const swagger = require('./config/swagger');

const MODULENAME = 'SERVER';

module.exports = {
    start: () => {
        const server = express();
        swagger(server);
        core.init(server)
            .then(_ => {
                server.listen(3000, err => {
                    err
                    ? logger.error(MODULENAME, err)
                    : logger.info(MODULENAME, `Server running on Port ${3000}`);
                });
            })
            .catch(err => logger.error(MODULENAME, err))
    }
}
