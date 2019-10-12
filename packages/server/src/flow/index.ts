import Flow from './lib/Flow';
import { CommonData } from '../core';

let commonData : CommonData;
let flows: Flow[] = [];

const createNewFlow = () => {
  const flow = new Flow(commonData);
  flows.push(flow);
  return flow;
};

const getFlowById = (flowId : string) => {
  return flows.filter(flow => flow.id === flowId)[0];
};

const deleteFlow = (flowId: string) => {
  flows = flows.filter(flow => flow.id !== flowId);
  return flows;
};

const getFlowByIndex = (index : number) => {
  return flows[index];
};

const getAllFlows = () => flows;

const init = (_commonData : CommonData) => {
  commonData = _commonData;
  createNewFlow();
};

export default {
  init,
  createNewFlow,
  deleteFlow,
  getAllFlows,
  getFlowById,
  getFlowByIndex,
};
