import React, { useState, useEffect } from 'react';
import SwitchUI from '@material-ui/core/Switch';

import './Switch.scss';

const Switch = ({
  id = '',
  label = '',
  defaultValue = false,
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
}) => {

  const [checked, setChecked] = useState(defaultValue);

  function handleTextChange(event) {
    setChecked(event.target.checked);
    onChange(event.target.checked);
  }

  return (
    <div className="switch">
      <SwitchUI
        id={id}
        checked={checked}
        label={label}
        onChange={(event) => handleTextChange(event)}
        onBlur={(event) => onBlur(event)}
        onFocus={(event) => onFocus(event)}
        size="small"
      />
      <div className="switch__label">
        {label}
      </div>
    </div>
  );
};

export default Switch;
