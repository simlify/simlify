import React, { useState } from 'react';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Tabbar from 'components/TabBar';
import RenderWidget from './RenderWidget';
import SideHelperSettings from './SideHelperSettings';

import './SideHelper.scss';

function renderDescription(description, nodeModel) {
  return (
    <div className="sideHelper__body__description">
      <RenderWidget nodeModel={nodeModel}/>
      { description }
    </div>
  )
}

const SideHelper = (props) => {
  const { nodeModel = {} } = props;
  const { options: nodeModelOptions = {} } = nodeModel;
  const { options } = nodeModelOptions;
  const [selectedTab, changeTab] = useState(0);

  return (
    <div className="sideHelper">
      <Tabbar
        tabs={[{ name: 'Description', icon: 'none' }, { name: 'Settings', icon: 'none' }]}
        onTabChange={(selectedTab) => changeTab(selectedTab)}
      />
      <div className="sideHelper__body" key={`${nodeModelOptions.id}`}>
        {
          selectedTab === 0 && options && options.description &&
          renderDescription(options.description, nodeModel)
        }
        {
          selectedTab === 1 && options && options.settings &&
          <SideHelperSettings
            settings={options.settings}
            nodeModel={nodeModel}
            nodeModelOptions={nodeModelOptions}
          />
        }
      </div>
    </div>
  );
};

export default SideHelper;
