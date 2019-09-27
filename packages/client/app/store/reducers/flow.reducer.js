export const flowConstants = {
  LOAD: 'FLOW_LOAD',
  SEND: 'FLOW_SEND',
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
  currentFlowIndex: 0,
};

export function flowData(state = initialState, action) {
  switch (action.type) {
    case flowConstants.LOAD:
      return Object.assign({}, state, { flows: action.flows })
    case flowConstants.CHANGE_FLOW_INDEX:
      return Object.assign({}, state, { currentFlowIndex: action.index })
    default:
      return state
  }
}
