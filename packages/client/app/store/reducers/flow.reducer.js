export const flowConstants = {
  UPDATE: 'FLOW_UPDATE',
  CHANGE_FLOW_INDEX: 'FLOW_CHANGE_FLOW_INDEX',
};

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
};

export function flowData(state = initialState, action) {
  switch (action.type) {
    case flowConstants.UPDATE:
      return Object.assign({}, state, { flows: action.flows })
    case flowConstants.CHANGE_FLOW_INDEX:
      return Object.assign({}, state, { currentFlowIndex: action.index })
    default:
      return state
  }
}
