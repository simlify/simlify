const socketio = require('socket.io');

module.exports = (httpServer) => {
    return socketio(httpServer, {path: '/socketio'});
};
