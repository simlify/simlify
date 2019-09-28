import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import './ImportDialog.scss';

export default function ImportDialog(props) {
  const { onClose, onImport, open } = props;
  let jsonFieldRef;

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleImport = () => {
    if (onImport) onImport(jsonFieldRef.value);
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
      <DialogTitle id="simple-dialog-title">Import Flow</DialogTitle>
      <DialogContent>
        <TextField
          id="filled-multiline-static"
          label="JSON with the flow information"
          inputRef={e => jsonFieldRef = e}
          multiline
          rows="6"
          defaultValue=""
          className=""
          margin="normal"
          variant="filled"
          style={{width: '100%'}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancle
        </Button>
        <Button onClick={handleImport} color="primary">
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};
