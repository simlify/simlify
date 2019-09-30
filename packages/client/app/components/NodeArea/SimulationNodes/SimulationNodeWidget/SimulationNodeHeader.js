import * as React from 'react';
import { SimPortLabel } from '../../Ports/SimPortWidget';

function renderPort(inActive, engine, port, isLeft=true) {
  return (
    <SimPortLabel
      roundedLeft={isLeft}
      roundedRight={!isLeft}
      inactivePort={inActive}
      disableLabel
      engine={engine}
      port={port}
    />
  );
}

export default function SimulationNodeHeader(props) {
  const {
    engine,
    triggerInputPort,
    triggerOutputPort,
    inActive,
    nodeName,
  } = props;

  return (
    <div className="simulationNode__header">
      <div className="simulationNode__titleNode">
        {
          triggerInputPort ? renderPort(inActive, engine, triggerInputPort, true) : <div />
        }
        <div className="simulationNode__titleNode__title"> {nodeName} </div>
        {
          triggerOutputPort ? renderPort(inActive, engine, triggerOutputPort, false) : <div />
        }
      </div>
    </div>
  );
}