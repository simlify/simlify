import React from 'react';
import DragElement from './DragElement';

import './SideComponents.scss';

const convertToCategories = (availableNodes) => {
  const dragElements = {};

  Object.entries(availableNodes)
    .forEach(([nodeName, nodeData]) => {
      const { nodeCategory } = nodeData;
      const dragElement = <DragElement nodeData={nodeData}>{nodeName}</DragElement>;
      dragElements[nodeCategory] = dragElements[nodeCategory] || [];
      dragElements[nodeCategory].push(dragElement);
  });

  return dragElements;
}

const renderCategories = (dragElements) => {
  return Object.entries(dragElements).map(([category, dragElements]) => {
    return(
      <div>
        {category}
        {dragElements}
      </div>
    )
  })
}

const SideComponents = (props) => {
  const { availableNodes } = props;
  const dragElements = convertToCategories(availableNodes);

  return (
    <div className="sideComponents">
      <div className="sideComponents__container">
        <div className="sideComponents__container__header">
          Available Nodes
        </div>
        { renderCategories(dragElements) }
      </div>
    </div>
  );
};

export default SideComponents;
