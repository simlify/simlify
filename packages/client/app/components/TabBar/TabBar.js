import React, { useState, useEffect } from 'react';
import shortid from 'shortid';

import './TabBar.scss';

const Tab = (props) => {
  return (
    <div className={`tab ${props.isActive ? 'tab--active' : ''}`} onClick={props.onClick}>{props.children}</div>
  )
}

const TabBar = (props) => {
  const { tabs = [{ name: 'tab1', icon: 'asdf'}, { name: 'tab2', icon: 'asdf'}] } = props;
  const [activeTab, setActiveTab] = useState(0);

  function onTabChange(index) {
    if (props.onTabChange) props.onTabChange(index);
  }

  return (
    <div className="tabBar">
      {
        tabs.map((tab, index) => <Tab
            isActive={index === activeTab}
            key={shortid.generate()}
            onClick={() => {
              setActiveTab(index);
              onTabChange(index);
            }}
          >
            {tab.name}
          </Tab>
        )
      }
    </div>
  );
};

export default TabBar;
