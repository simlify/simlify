export const nodeConstants = {
  UPDATE_AVAILABLE_NODES: 'NODES_UPDATE_AVAILABLE_NODES',
  SELECTED_NODE_MODEL: 'NODES_SELECTED_NODE_MODEL',
};

const initialState = {
  availableNodes: {},
  selectedNodeModel: {},
};

export function nodeData(state = initialState, action) {
  switch (action.type) {
    case nodeConstants.UPDATE_AVAILABLE_NODES:
      return Object.assign({}, state, { availableNodes: action.availableNodes })
    case nodeConstants.SELECTED_NODE_MODEL:
      return Object.assign({}, state, { selectedNodeModel: action.selectedNodeModel })
    default:
      return state
  }
}
