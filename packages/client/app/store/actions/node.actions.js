import { nodeConstants } from '../reducers/node.reducer';
import api from '../../../helper/api';

export const nodeActions = {
  loadAvailableNodes,
  setSelectedNodeModel,
};

function loadAvailableNodes() {
  return dispatch => {
    api.getAvailableNodes()
      .then((availableNodes) => {
        dispatch({ type: nodeConstants.UPDATE_AVAILABLE_NODES, availableNodes });
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

function setSelectedNodeModel(selectedNodeModel = {}) {
  return dispatch => dispatch({ type: nodeConstants.SELECTED_NODE_MODEL, selectedNodeModel });
}
