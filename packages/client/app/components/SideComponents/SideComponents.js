import React from 'react';

import './SideComponents.scss';

const DragElement = (props) => {
  return (
    <div
      className="dragElement"
      draggable={true}
      onDragStart={event => {
        event.dataTransfer.setData('diagram-node', JSON.stringify(props.nodeData));
      }}
    >
      {props.children}
      <span class="dragElement__grip"></span>
    </div>
  );
}

const SideComponents = (props) => {
  const { availableNodes } = props;
  const dragElements = Object.entries(availableNodes)
    .map(([nodeName, nodeData]) => <DragElement nodeData={nodeData}>{nodeName}</DragElement>);

  return (
    <div className="sideComponents">
      <div className="sideComponents__container">
        <div className="sideComponents__container__header">
          Available Nodes
        </div>
        { dragElements }
      </div>
    </div>
  );
};

export default SideComponents;
