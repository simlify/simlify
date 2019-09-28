import { alertConstants } from '../reducers/alert.reducer';



function createNotification(message, variant = 'warning') {
  return (
    { 
      type: alertConstants.ENQUEUE_SNACKBAR,
      notification: {
        key: new Date().getTime() + Math.random(),
        message,
        options: {
          variant,
        }
      }
    }
  );
}

export const alertActions = {
  success: (message) => dispatch => dispatch(createNotification(message, 'success')),
  info: (message) => dispatch => dispatch(createNotification(message, 'info')),
  error: (message) => dispatch => dispatch(createNotification(message, 'error')),
  warning: (message) => dispatch => dispatch(createNotification(message, 'warning')),
  removeSnackbar: (key) => dispatch => dispatch({ type: alertConstants.REMOVE_SNACKBARO, key }),
};

