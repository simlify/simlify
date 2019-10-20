export const flowConstants = {
  UPDATE: 'FLOW_UPDATE',
  CHANGE_FLOW_INDEX: 'FLOW_CHANGE_FLOW_INDEX',
  UPDATE_DATA: 'FLOW_UPDATE_DATA',
};

const MAX_DATA_POINTS = 500;

const initialState = {
  flows: [
    {
      "id":"24c5e99076ba351b212d069a41f1d054fe60d4bc",
      "name":"Flow 1",
      "nodes":[],
    }
  ],
  // States the index of 'flows' that is currently open
  currentFlowIndex: 0,
  currentFlowState: {
    nodeId: null,
    percentageDone: 0,
    data: [],
  }
};

export function flowData(state = initialState, action) {
  switch (action.type) {
    case flowConstants.UPDATE:
      return { ...state, flows: action.flows };
    case flowConstants.CHANGE_FLOW_INDEX:
      return { 
        ...state,
        currentFlowIndex: action.index,
        currentFlowState: initialState.currentFlowState,
      };
    case flowConstants.UPDATE_DATA:
      const newDataArray = state.currentFlowState.data.concat(action.data);
      while(newDataArray.length > MAX_DATA_POINTS) newDataArray.shift();
      return { 
        ...state,
        currentFlowState: {
          nodeId: action.nodeId,
          percentageDone: action.percentageDone,
          data: newDataArray,
        }
      };
    default:
      return state
  }
}
