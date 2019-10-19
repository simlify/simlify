const socketio = require('socket.io');
            
const getHostname = () => {
    const url = window.location.href;

    // remove '//' if found 
    let hostname = url.indexOf("//") > -1 ? url.split('/')[2] : url.split('/')[0];
    hostnameWithoutPort = hostname.split(':')[0];
    hostnameWithoutQuery = hostnameWithoutPort.split('?')[0];

    return hostnameWithoutQuery;
}

module.exports = (httpServer) => {
    return socketio(httpServer);
};
