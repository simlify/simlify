class Logger {
    constructor() {

    }

    info(moduleName, message) {
        if(!message) message = moduleName;
        this._output(moduleName, 'Info', message)
    }

    warning(moduleName, message) {
        if(!message) message = moduleName;
        this._output(moduleName, 'Warning', message)
    }

    error(moduleName, message) {
        if(!message) message = moduleName;
        this._output(moduleName, 'Error', message)
    }

    _output(moduleName, messageLevel, message) {
        console.log(`[${moduleName}] ${messageLevel}: ${message}`);
    }
}

const logger = new Logger();
Object.freeze(logger);

module.exports = logger;
