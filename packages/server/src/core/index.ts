import path from 'path';
import clientApi from '../client-api';
import { logger } from '../utilities';
import flow from '../flow';
import * as NodeRegistry from '../nodes/nodeRegistry';

const MODULENAME = 'CORE';

let server : Express.Application = null;

export interface CommonData {
  settings: object;
  nodeRegistry: any;
  server: any;
  flows: any;
}

const commonData : CommonData = {
  settings: {},
  get nodeRegistry() { return NodeRegistry; },
  get server() { return server; },
  get flows() { return flow; },
};

export const init = async (_server : Express.Application) => {
  server = _server;

  try {
    const pathToNodes = path.join(__dirname, '../nodes/nodeTemplates');
    NodeRegistry.init(commonData);
    await NodeRegistry.registerNodesFromFolder(pathToNodes);
  } catch (err) {
    logger.error(MODULENAME, err);
  }

  flow.init(commonData);
  const currentFlow = flow.getFlowByIndex(0);

  const startNode = currentFlow.addNode('StartNode') as any;
  startNode.setPosition(100, 100);

  const triggerCurveNode = currentFlow.addNode('TriggerCurveNode') as any;
  triggerCurveNode.setPosition(300, 100);

  const numberNode = currentFlow.addNode('RandomNode');
  numberNode.setPosition(300, 300);

  startNode.connectOutputTriggerPort(triggerCurveNode.getTriggerInputPort());
  triggerCurveNode.connectOutputTriggerPort(startNode.getTriggerInputPort());

  const sourcePort = numberNode.getOutputPortsByLabel('number')[0];
  const targetPort = triggerCurveNode.getInputPortsByLabel('offset')[0];
  sourcePort.connectTo(targetPort);

  currentFlow.start();

  await clientApi.init(server, commonData);
};
