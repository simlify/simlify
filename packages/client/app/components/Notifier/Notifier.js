import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withSnackbar } from 'notistack';
import { alertActions, flowActions, nodeActions } from 'store/actions';

import './Notifier.scss';

const Notifier = (props) => {
  const { enqueueSnackbar, closeSnackbar } = props;
  const [ displayedNotificationKeys, setDisplayedNotificationKeys ] = useState([]);
  const { notifications } = useSelector(state => state.alert);
  const dispatch = useDispatch();

  const addKey = (key) => {
    displayedNotificationKeys.push(key);
    setDisplayedNotificationKeys(displayedNotificationKeys);
  };

  const removeKey = (key) => {
    const keys = displayedNotificationKeys.filter(currentKey => currentKey != key);
    setDisplayedNotificationKeys(keys);
  };

  notifications.forEach(({ message, options, key }) => {
    if (displayedNotificationKeys.includes(key)) return;

    enqueueSnackbar(message, options);
    addKey(key);

    setTimeout(() => {
      closeSnackbar(key);
      dispatch(alertActions.removeSnackbar(key));
      removeKey(key);
    }, 1000);
  });

  return null;
}

export default withSnackbar(Notifier);