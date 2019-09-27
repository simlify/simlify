import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { flowData } from './flow.reducer';

export default combineReducers({
  alert,
  flowData,
});
