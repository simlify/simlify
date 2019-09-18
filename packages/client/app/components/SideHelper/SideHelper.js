import React, { useState, useEffect } from 'react';
import TextField from '../TextField';
import Button from '../Button';

import './SideHelper.scss';


const SideHelper = (props) => {
  const { node = {} } = props;
  const { options } = node;

  function onSettingSave(settings) {
    console.log(settings);
  }
  
  function renderSettings(settings) {
    console.log(node);
    return (
      <div>
        <div>Settings</div>
        {
          settings.map(setting => <TextField
            label={setting.name}
            defaultValue={setting.value}
            onChange={(newValue) => setting.value = newValue}
            />)
        }
        <Button onClick={() => onSettingSave(settings)}>Save</Button>
      </div>
    )
  }

  return (
    <div className="sideHelper">
      <div className="sideHelper__settings">
        {
          options && options.settings && renderSettings(options.settings)
        }
      </div>
    </div>
  );
};

export default SideHelper;
