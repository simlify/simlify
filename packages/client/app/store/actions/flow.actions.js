import { flowConstants } from '../reducers/flow.reducer';
import api from '../../../helper/api';
import { store } from '../../store';
import convertForApi from '../../../helper/convertForApi';

export const flowActions = {
  loadFlow,
  sendFlow,
  changeCurrentFlowIndex
};

function loadFlow() {
  return dispatch => {
    api.getFlows()
      .then((flows) => {
        dispatch({ type: flowConstants.LOAD, flows });
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
        dispatch({ type: flowConstants.LOAD, flows });
      })
      .catch(console.log);
  }
}

function changeCurrentFlowIndex(index) {
  return { type: flowConstants.CHANGE_FLOW_INDEX, index };
}
