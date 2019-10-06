import * as React from 'react';
import SimulationNodeHeader from './SimulationNodeWidget/SimulationNodeHeader';
import SimulationNodeBody from './SimulationNodeWidget/SimulationNodeBody';

import './SimulationNodeStyle.scss';

export function SimulationNodeWidget(props) {
		const { node, inActive } = props;

		return (
			<div key={node.options.id} className={`simulationNode ${node.isSelected() ? 'simulationNode--selected' : ''}`}>
			  <SimulationNodeHeader
					engine={props.engine}
					triggerInputPort={null}
					triggerOutputPort={null}
					inActive={inActive}
					nodeName={node.options.name}
				/>
				<SimulationNodeBody {...props} />
			</div>
		);
}