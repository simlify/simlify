import { alertConstants } from '../reducers/alert.reducer';

export const alertActions = {
  success,
  error,
  clear
};

let timeout;

function success(message) {
  return dispatch => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(clear());
    }, 2000);
    return dispatch({ type: alertConstants.SUCCESS, message });
  }
}

function error(message) {
  return dispatch => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(clear());
    }, 2000);
    return dispatch({ type: alertConstants.ERROR, message });
  }
}

function clear() {
  return { type: alertConstants.CLEAR };
}
