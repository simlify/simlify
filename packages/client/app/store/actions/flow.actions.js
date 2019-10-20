import socketIOClient from "socket.io-client";
import { flowConstants } from '../reducers/flow.reducer';
import api from 'helper/api';
import { store } from 'store';
import convertForApi from 'helper/convertForApi';
import { alertActions } from './index';

const getHostname = () => {
  const url = window.location.href;
  const splitter = url.split('/');

  if (url.indexOf('//') > -1) {
    return `${splitter[0]}//${splitter[2]}`;
  } else {
    return `http://${splitter[0]}`;
  }
}

const socket = socketIOClient(getHostname(), {path: '/socketio'});

export const flowActions = {
  createNewFlow,
  changeCurrentFlowIndex,
  deleteFlow,
  loadFlow,
  updateFlow,
};

function loadFlow() {
  return dispatch => {
    api.getFlows()
      .then((flows) => {
        dispatch({ type: flowConstants.UPDATE, flows });
        changeCurrentFlowIndex(0)(dispatch);
        dispatch(alertActions.success('Successfully loaded from server'));
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error('Could not load from server'));
      });
  }
}

function updateFlow(serializedFlow) {
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
        dispatch(alertActions.success('Deployed to server'));
        dispatch({ type: flowConstants.UPDATE, flows });
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error('Could not deploy to server'));
      });
  }
}

function createNewFlow(flow) {
  return dispatch => {
    const storeData = store.getState();
    const { flows } = storeData.flowData;
    
    if(!flow.name) flow.name = `Flow ${index}`;

    api.postFlow(flow)
      .then((newFlow) => {
        flows.push(newFlow);
        dispatch({ type: flowConstants.UPDATE, flows });
        return dispatch({ type: flowConstants.CHANGE_FLOW_INDEX, currentFlowIndex: flows.length });
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error('Could not create flow on server'));
      });
  }
}

const currentFlowState = {
  nodeId: null,
  percentageDone: 0,
  data: [],
};

function registerSocketIo(dispatch, eventName) {
  setInterval(() => {
    dispatch({ type: flowConstants.UPDATE_DATA, ...currentFlowState });
    currentFlowState.data = [];
  }, 1000)

  socket.on(eventName, data => {
    currentFlowState.nodeId = data.nodeId;
    currentFlowState.percentageDone = data.percentageDone;
    currentFlowState.data.push([data.timestamp, data.value]);
  });
}

function unregisterSocketIo(eventName) {
  socket.off(eventName);
}

function changeCurrentFlowIndex(index) {
  return dispatch => {
    const storeData = store.getState();
    const { flows, currentFlowIndex: previousIndex } = storeData.flowData;

    if (index > flows.length - 1) {
      index = flows.length;

      api.postFlow()
        .then((newFlow) => {
          flows.push(newFlow);
          dispatch({ type: flowConstants.UPDATE, flows });
          unregisterSocketIo(flows[previousIndex].id);
          registerSocketIo(dispatch, newFlow.id);
          return dispatch({ type: flowConstants.CHANGE_FLOW_INDEX, index });
        })
        .catch((err) => {
          console.log(err);
          dispatch(alertActions.error('Could not deploy to server'));
        });
    } else {
      unregisterSocketIo(flows[previousIndex].id);
      registerSocketIo(dispatch, flows[index].id);
      return dispatch({ type: flowConstants.CHANGE_FLOW_INDEX, index });
    }
  }
}

function deleteFlow(flowId) {
  return dispatch => {
    const storeData = store.getState();
    const { flows, currentFlowIndex } = storeData.flowData;
    const currentFlow = flows[currentFlowIndex];
    const flowId = currentFlow.id;

    api.deleteFlow(flowId)
      .then(flows => {
        dispatch(alertActions.success('Successfully deleted'));
        dispatch({ type: flowConstants.UPDATE, flows });
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error('Could not delete Flow'));
      });
  }
}
