import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import './DeleteDialog.scss';

function renderActions(handleClose, handleDelete) {
  return(
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancle
      </Button>
      <Button onClick={handleDelete} color="primary">
        Delete
      </Button>
    </DialogActions>
  )
}

export default function DeleteDialog(props) {
  const { onClose, onDelete, open } = props;

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
    if (onClose) onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      style={{ width: '100%' }}
      fullWidth
    >
      <DialogTitle id="simple-dialog-title">Delete Flow</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the Flow? You will not be able to recover it.
      </DialogContent>
      { renderActions(handleClose, handleDelete) }
    </Dialog>
  );
};
