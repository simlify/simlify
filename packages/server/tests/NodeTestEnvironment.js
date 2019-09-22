// Why an individual test environment is needend:
// The express configuration is async because the possible Nodes for the Flow
// are loaded async from the file system. Several options have not worked
// (e.g. setupFiles in the configuration)

const NodeEnvironment = require('jest-environment-node');

class NodeTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    const supertest = require('supertest');
    // cannot use /src folder because of `Error: unexpected token import`
    const app = require('../dist/config/express')();
    const core = require('../dist/core/index');
    const coreApp = await core.init(app);
    const request = supertest(coreApp);
    this.global.coreApp = coreApp;
    this.global.request = request;
    this.global.commonData = core.commonData;
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = NodeTestEnvironment;
