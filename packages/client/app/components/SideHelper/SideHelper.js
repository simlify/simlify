import React, { useState, useEffect } from 'react';
import TextField from '../TextField';
import Button from '../Button';
import Tabbar from '../TabBar';
import RenderWidget from './RenderWidget';

import './SideHelper.scss';


const SideHelper = (props) => {
  const { node = {} } = props;
  const { options } = node;
  const [selectedTab, changeTab] = useState(0);

  function onSettingSave(settings) {
    console.log(settings);
  }
  
  function renderSettings(settings) {
    console.log(node);
    return (
      <div>
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

  function generateId() {
    return 'Id' + Math.random() * 100;
  }

  function renderDescription(description) {
    return (
      <div>
        <RenderWidget id={generateId()} node={node}/>
        { description }
      </div>
    )
  }

  return (
    <div className="sideHelper">
      <Tabbar
        tabs={[{ name: 'Description', icon: 'asdf' }, { name: 'Settings', icon: 'asdf' }]}
        onTabChange={(selectedTab) => changeTab(selectedTab)}
      />
      <div className="sideHelper__body">
        {
          selectedTab === 0 && options && options.description && renderDescription(options.description)
        }
        {
          selectedTab === 1 && options && options.settings && renderSettings(options.settings)
        }
      </div>
    </div>
  );
};

export default SideHelper;
