import { SimPortModel } from './SimPortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';

export class SimPortFactory extends AbstractModelFactory {
	constructor() {
		super('default');
	}

	generateModel() {
		return new SimPortModel({
			name: 'unknown'
		});
	}
}