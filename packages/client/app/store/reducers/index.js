import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { flowData } from './flow.reducer';
import { nodeData } from './node.reducer';

export default combineReducers({
  alert,
  flowData,
  nodeData
});
