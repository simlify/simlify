export const alertConstants = {
  ENQUEUE_SNACKBAR: 'ALERT_ENQUEUE_SNACKBAR',
  REMOVE_SNACKBARO: 'ALERT_REMOVE_SNACKBAR',
};

const initialState = {
  notifications: [],
};

export function alert(state = initialState, action) {
  switch (action.type) {
    case alertConstants.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
          },
        ],
      };

    case alertConstants.REMOVE_SNACKBARO:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      };

    default:
      return state;
  }
};
