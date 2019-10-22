import path from 'path';
import clientApi from '../client-api';
import { logger } from '../utilities';
import flow from '../flow';
import Flow from '../flow/lib/Flow';
import * as NodeRegistry from '../nodes/nodeRegistry';

const MODULENAME = 'CORE';

let server : Express.Application = null;
let io: SocketIO.Server = null;

export interface CommonData {
  settings: object;
  nodeRegistry: any;
  server: any;
  flows: any;
  socketio: SocketIO.Server;
}

export const commonData : CommonData = {
  settings: {},
  get nodeRegistry() { return NodeRegistry; },
  get server() { return server; },
  get flows() { return flow; },
  get socketio() { return io; },
};

const addInitialNodes = (currentFlow: Flow) => {
  const startNode = currentFlow.addNode('StartNode') as any;
  startNode.setPosition(240, 80);

  const triggerCurveNode = currentFlow.addNode('TriggerCurve') as any;
  triggerCurveNode.setPosition(480, 190);

  const numberNode = currentFlow.addNode('RandomNumber');
  numberNode.setPosition(240, 190);

  const restartFlow = currentFlow.addNode('RestartFlow') as any;
  restartFlow.setPosition(720, 300);

  startNode.connectOutputTriggerPort(triggerCurveNode.getTriggerInputPort());
  triggerCurveNode.connectOutputTriggerPort(restartFlow.getTriggerInputPort());

  const sourcePort = numberNode.getOutputPortsByLabel('random number')[0];
  const targetPort = triggerCurveNode.getInputPortsByLabel('offset')[0];
  sourcePort.connectTo(targetPort);
};

export const init = async (_server : Express.Application, _io: SocketIO.Server) => {
  server = _server;
  io = _io;

  try {
    const pathToNodes = path.join(__dirname, '../nodes/nodeTemplates');
    await NodeRegistry.registerNodesFromFolder(pathToNodes);
  } catch (err) {
    logger.error(MODULENAME, err);
  }
  flow.init(commonData);
  const currentFlow = flow.getFlowByIndex(0);
  addInitialNodes(currentFlow);
  currentFlow.start();

  return await clientApi.init(server, commonData);
};
