const core = require('../../src/core');
let server;

beforeAll(async() => {
  server = await core.init(global.coreApp);
});

describe('Core module', () => {
  const { flows } = core.commonData;
  const flowArray = flows.getAllFlows();

  it('is loading', async done => {
    expect(server).toBeTruthy();
    done();
  });

  it('has flowArray with element', async done => {
    expect(flowArray.length).toEqual(1);
    done();
  });

  it('has flow with properties', async done => {
    expect(flowArray[0].id).toBeDefined();
    expect(flowArray[0].name).toMatch('Flow 1');
    expect(flowArray[0].isRunning).toBeTruthy();
    done();
  });

  it('allows to getFlowById', async done => {
    const flow = flows.getFlowById(flowArray[0].id);
    expect(flow.id).toBeDefined();
    done();
  });
});
