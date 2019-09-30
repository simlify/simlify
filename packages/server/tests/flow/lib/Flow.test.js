const express = require('express')();
const Flow = require('../../../src/flow/lib/Flow');
const {init, commonData} = require('../../../src/core');

const mockFlowData = require('./mockFlowData');
let flow;
let flow2;

function sleepMs(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

beforeAll(async (done) => {
  await init(express);
  flow = new Flow.default(commonData);
  flow2 = new Flow.default(commonData);
  done();
});

describe('Flow class', () => {
  it('is created', async done => {
    expect(flow).toBeDefined();
    done();
  });

  it('addNode() is adding new node', async done => {
    const newFlow = new Flow.default(commonData);
    let getStartNode = newFlow.getStartNode();
    expect(getStartNode).toBe(null);

    const startNode = newFlow.addNode('StartNode');
    expect(startNode).toBeDefined();

    getStartNode = newFlow.getStartNode();
    expect(getStartNode).toBeDefined();
    done();
  });

  it('findNodeByName() retuns correct node', async done => {
    const newFlow = new Flow.default(commonData);
    let findStartNode = newFlow.findNodeByName('StartNode');
    expect(findStartNode.length).toBe(0);

    const startNode = newFlow.addNode('StartNode');
    expect(startNode).toBeDefined();

    findStartNode = newFlow.findNodeByName('StartNode');
    expect(findStartNode).toBeDefined();
    done();
  });

  it('serialize and deserialize', async done => {
    flow.deserialize(mockFlowData);
    
    expect(flow.id === '721e1054692b61fccb61583e8b9e719d5dc917b8').toBeTruthy();

    const serialized = flow.serialize();
    expect(serialized.id === mockFlowData.id).toBeTruthy();
    done();
  });

  it('find methods work', async done => {
    const newFlow = new Flow.default(commonData);
    newFlow.deserialize(mockFlowData);
    
    const foundPort = newFlow.getPortWithId('d10c5eb63d0e041adc1239860aacc74704845a0e');
    expect(foundPort).toBeDefined();
    expect(foundPort.label === 'trigger').toBeTruthy();

    const foundNode = newFlow.getNodeWithId('b581fa4635ad4f8dcc127dcf5bc5a35b677f5248');
    expect(foundNode).toBeDefined();
    expect(foundNode.inputPorts.length === 1).toBeTruthy();
    expect(foundNode.outputPorts.length === 1).toBeTruthy();

    done();
  });

  it('clear nodes creates a fresh flow', async done => {
    const newFlow = new Flow.default(commonData);
    newFlow.deserialize(mockFlowData);

    newFlow.clearNodes();
    expect(Object.keys(newFlow.nodes).length === 0).toBeTruthy();

    done();
  });

  it('currentValue of Flow is changing', async done => {
    flow.deserialize(mockFlowData);
    expect(flow).toBeDefined();
    expect(flow.isRunning).toBeFalsy();

    flow.start();
    expect(flow.isRunning).toBeTruthy();

    const currentValue1 = flow.getCurrentValue();
    await sleepMs(500);
    const currentValue2 = flow.getCurrentValue();
    expect(currentValue1 === currentValue2).toBeFalsy();

    flow.stop();
    expect(flow.isRunning).toBeFalsy();

    done();
  });

  it('currentValue is returned in callback', async done => {
    flow.deserialize(mockFlowData);
    expect(flow).toBeDefined();
    
    flow.registerOnValueUpdateCB('testId', (value) => {
      expect(value).toBeDefined();
      expect(value === flow.getCurrentValue()).toBeTruthy();
      done();
    });

    flow.start();
  });

  it('currentValue is updated via updateValue()', async done => {
    flow.deserialize(mockFlowData);

    const testValue = 1337;

    expect(flow).toBeDefined();
    const foundNode = flow.getNodeWithId('b581fa4635ad4f8dcc127dcf5bc5a35b677f5248');
    flow.updateValue(testValue, foundNode, 0.1);
    const currentValue = flow.getCurrentValue();
    expect(currentValue === testValue).toBeTruthy();
    done();
  });

  it('createNewIds() is generating new NodeIds and PortIds', async done => {
    flow.deserialize(mockFlowData);
    flow2.deserialize(mockFlowData);
    flow2.createNewIds();

    Object.entries(flow.nodes).forEach(([key, value]) => {
      expect(flow2.nodes[key]).toBeUndefined();
    });
    done();
  });
});
