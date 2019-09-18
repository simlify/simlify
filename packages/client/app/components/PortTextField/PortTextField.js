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

const PortTextField = (props) => {
  const {
    height = 15,
    defaultValue = 0,
    disabled = false
  } = props;
  const [text, setText] = useState(defaultValue);

  const innerStyleMod = disabled
    ? styles.textFieldInnerDisabled
    : styles.textFieldInnerEnabled;

  function handleTextChange(event) {
    event.stopPropagation();
    event.preventDefault();
    setText(event.target.value);
    if (props.onChange) props.onChange(event.target.value);
  }

  function onFocus(event) {
    if (props.onFocus) props.onFocus(event);
  }

  function onBlur(event) {
    if (props.onBlur) props.onBlur(event);
  }

  return (
    <TextFieldUi
      variant="filled"
      className={props.classes.textFieldFilled}
      style={{ height }}
      value={ disabled ? '-' : text }
      onChange={(event) => handleTextChange(event)}
      disabled={disabled}
      onFocus={(event) => onFocus(event)}
      onBlur={(event) => onBlur(event)}

      /* styles the input component */
      inputProps={{
        style: Object.assign({
          height,
          padding: '0 3px',
          fontSize: '8px',
        }, innerStyleMod)  
      }}
    />
  );
};

export default withStyles(styles)(PortTextField);
