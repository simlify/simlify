import React from 'react';
import Paper from '../Paper';

import './NodeDragBar.scss';

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

const NodeDragBar = (props) => {
  const { availableNodes } = props;
  const dragBar = Object.entries(availableNodes).map(([nodeName, nodeData]) => <DragElement nodeData={nodeData}>{nodeName}</DragElement>);
  return (
    <Paper className="nodeDragBar" elevation={4}>
      { dragBar }
    </Paper>
  );
};

export default NodeDragBar;
