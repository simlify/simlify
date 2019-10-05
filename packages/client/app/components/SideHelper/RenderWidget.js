import React from 'react';
import createEngine from '@projectstorm/react-diagrams';
import { SimulationNodeWidget } from 'components/NodeArea/SimulationNodes/SimulationNodeWidget';

const RenderWidget = (props) => {
  const { nodeModel } = props;
  const engine = createEngine();

  return (
    <SimulationNodeWidget node={nodeModel} engine={engine} inActive/>
  );
}

export default RenderWidget;
