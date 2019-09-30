const core = require('./core');
const express = require('./config/express');
const logger = require('./utilities/logger');
const swagger = require('./config/swagger');

const MODULENAME = 'SERVER';
const PORT = 3000;

module.exports = {
    start: (server) => {
        return new Promise((resolve, reject) => {
            server = express(server);
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

const args = process.argv.slice(2);
if(args[0] === 'standalone') {
    module.exports.start()
        .then(server => {
            server.get('/', (req, res) => res.redirect('/api-docs'));

            server.listen(PORT, () => {
                console.log(`Server started and listening on Port ${PORT}`)
                console.log(`Go to 'http://localhost:${PORT}/api-docs' for the API documentation`);
            });
        })
}
