const http = require('http');
const core = require('./core');
const express = require('./config/express');
const socketio = require('./config/socketio');
const logger = require('./utilities/logger');
const swagger = require('./config/swagger');

const MODULENAME = 'SERVER';
const PORT = 3000;

module.exports = {
    start: (app, httpServer) => {
        return new Promise((resolve, reject) => {
            app = express(app);
            if (!httpServer) httpServer = http.Server(app);
            const io = socketio(httpServer);
            swagger(app);
            core.init(app, io)
                .then(_ => {
                    resolve({app, httpServer});
                })
                .catch(err => {
                    logger.error(MODULENAME, err);
                    reject(app);
                })
        })
    }
}

const args = process.argv.slice(2);
if(args[0] === 'standalone') {
    module.exports.start()
        .then(({app, httpServer}) => {
            app.get('/', (req, res) => res.redirect('/api-docs'));
            httpServer.listen(PORT, () => {
                console.log(`Server started and listening on Port ${PORT}`)
                console.log(`Go to 'http://localhost:${PORT}/api-docs' for the API documentation`);
            });
        })
}
