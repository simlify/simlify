import React, { useState, useEffect } from 'react';
import TextFieldUi from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  textFieldFilled: {
    'background-color': '#4b69a5aa',
    'margin-top': '2px',
    'width': '30px',
    'borderRadius': '2px',
    'marginRight': '5px',
  },
  textFieldInnerEnabled: {
    color: '#d4d4d4de',
  },
  textFieldInnerDisabled: {
    fontStyle: 'italic',
    color: '#a4a5a5de',
  }
};

function getInnerStyle(height, disabled) {
  const innerStyleMod = disabled
    ? styles.textFieldInnerDisabled
    : styles.textFieldInnerEnabled;

  return ({
    style: Object.assign({
      height,
      padding: '0 3px',
      fontSize: '8px',
    }, innerStyleMod)  
  })
}

const PortTextField = ({
  height = 15,
  defaultValue = 0,
  disabled = false,
  onFocus = (event) => {},
  onBlur = (event) => {},
  onChange = (value) => {},
  classes = {},
}) => {
  const [text, setText] = useState(defaultValue);

  function handleTextChange(event) {
    setText(event.target.value);
    onChange(event.target.value);
  }

  return (
    <TextFieldUi
      variant="filled"
      className={classes.textFieldFilled}
      style={{ height }}
      value={ disabled ? '-' : text }
      onChange={(event) => handleTextChange(event)}
      disabled={disabled}
      onFocus={(event) => onFocus(event)}
      onBlur={(event) => onBlur(event)}
      inputProps={getInnerStyle(height, disabled)}
    />
  );
};

export default withStyles(styles)(PortTextField);
