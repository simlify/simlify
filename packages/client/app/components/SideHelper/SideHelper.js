import React, { useState } from 'react';
import Tabbar from 'components/TabBar';
import RenderWidget from './RenderWidget';
import SideHelperSettings from './SideHelperSettings';

import './SideHelper.scss';

const defaultDescription = `This project is work in progress. Feel free to give feedback on https://github.com/simlify/simlify. \
For examples visit https://github.com/simlify/simlify/wiki/Example-Flows.`;

function renderDescription(description, nodeModel) {
  return (
    <div className="sideHelper__body__description">
      { nodeModel !== {} || <RenderWidget nodeModel={nodeModel}/> }
      { description || defaultDescription }
    </div>
  )
}

function renderSettings(settings, nodeModel, nodeModelOptions) {
  return (
    <SideHelperSettings
      settings={settings}
      nodeModel={nodeModel}
      nodeModelOptions={nodeModelOptions}
    />
  )
}

const SideHelper = (props) => {
  const { nodeModel = {} } = props;
  const { options: nodeModelOptions = {} } = nodeModel;
  const { options = { description: null } } = nodeModelOptions;
  const [selectedTab, changeTab] = useState(0);

  return (
    <div className="sideHelper">
      <Tabbar
        tabs={[{ name: 'Description', icon: 'none' }, { name: 'Settings', icon: 'none' }]}
        onTabChange={(selectedTab) => changeTab(selectedTab)}
      />
      <div className="sideHelper__body boxShadow" key={`${nodeModelOptions.id}`}>
        {
          selectedTab === 0 &&
          renderDescription(options.description, nodeModel)
        }
        {
          selectedTab === 1 && options && options.settings &&
          renderSettings(options.settings, nodeModel, nodeModelOptions)
        }
      </div>
    </div>
  );
};

export default SideHelper;
