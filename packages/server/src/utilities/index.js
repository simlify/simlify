const logger = require('./logger');
const opcuaManager = require('./opcuaManager');

module.exports = {
    logger,
    opcuaManager: opcuaManager.default,
}