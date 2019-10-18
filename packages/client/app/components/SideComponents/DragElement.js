import React from 'react';

import './DragElement.scss';

const DragElement = (props) => {
  return (
    <div
      className="dragElement boxShadow"
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

export default DragElement;
