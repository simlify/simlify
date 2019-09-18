let server = null;

module.exports = {
    init: async (_server, commonData) => {
        server = _server;
        require('./endpoints/flows/flows.route')(server, commonData);
        require('./endpoints/nodes/nodes.route')(server, commonData);
    }
}