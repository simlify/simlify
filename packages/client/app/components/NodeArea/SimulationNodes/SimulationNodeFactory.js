import * as React from 'react';
import { SimulationNodeModel } from './SimulationNodeModel';
import { SimulationNodeWidget } from './SimulationNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

export class SimulationNodeFactory extends AbstractReactFactory {
	constructor() {
		super('SimulationNode');
	}

	generateModel(event) {
		return new SimulationNodeModel();
	}

	generateReactWidget(event) {
		return <SimulationNodeWidget
			engine={this.engine}
			node={event.model}
		/>;
	}
}