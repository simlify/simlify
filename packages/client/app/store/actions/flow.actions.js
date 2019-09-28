import { flowConstants } from '../reducers/flow.reducer';
import api from '../../../helper/api';
import { store } from '../../store';
import convertForApi from '../../../helper/convertForApi';

export const flowActions = {
  loadFlow,
  sendFlow,
  changeCurrentFlowIndex,
};

function loadFlow() {
  return dispatch => {
    api.getFlows()
      .then((flows) => {
        dispatch({ type: flowConstants.UPDATE, flows });
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

function sendFlow(serializedFlow) {
  return dispatch => {
    const storeData = store.getState();
    const { flows, currentFlowIndex } = storeData.flowData;
    const currentFlow = flows[currentFlowIndex];
    serializedFlow.id = currentFlow.id;
    serializedFlow.name = currentFlow.name;
    const serializedFlowForApi = convertForApi.convertFlow(serializedFlow);

    api.putFlow(serializedFlowForApi)
      .then(updatedFlow => {
        flows[currentFlowIndex] = updatedFlow;
        dispatch({ type: flowConstants.UPDATE, flows });
      })
      .catch(console.log);
  }
}

function changeCurrentFlowIndex(index) {
  return dispatch => {
    const storeData = store.getState();
    const { flows, currentFlowIndex } = storeData.flowData;

    if (index > flows.length - 1) {
      index = flows.length;
      api.postFlow()
      .then((newFlow) => {
        flows.push(newFlow);
        dispatch({ type: flowConstants.UPDATE, flows });
        return dispatch({ type: flowConstants.CHANGE_FLOW_INDEX, index });
      })
      .catch(console.log);
    } else {
      return dispatch({ type: flowConstants.CHANGE_FLOW_INDEX, index });
    }
  }
}
