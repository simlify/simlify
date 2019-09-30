import { NodeModel } from '@projectstorm/react-diagrams';
import { SimPortModel } from '../Ports/SimPortModel';
/**
 * Example of a custom model using pure javascript
 */
export class SimulationNodeModel extends NodeModel {
	constructor(options = {}, createNewIds = false) {
		super({
			...options,
			type: 'SimulationNode'
		});

		if (createNewIds) this.createNewIds(options);

		const createSimPortModel = (port, direction = 'in') => {
			const { id, label, value, portType, allowConnection } = port;
			return new SimPortModel({
				in: true,
				name: id,
				label,
				direction,
				portType,
				value,
				allowConnection,
			})
		}

		options.inputPorts.forEach((inputPort) => {
			this.addPort(createSimPortModel(inputPort, 'in'));
		});

		options.outputPorts.forEach((outputPort) => {
			this.addPort(createSimPortModel(outputPort, 'out'));
		});

		this.setPosition(options.positionX, options.positionY);
	}

	createId() {
		return Math.random().toString(36).substring(2, 15);
	}

	createNewIds(options) {
		this.options.id = this.createId();
		options.inputPorts.map(inputPort => {
			inputPort.id = this.createId();
			return inputPort;
		});
		options.outputPorts.map(outputPorts => {
			outputPorts.id = this.createId();
			return outputPorts;
		})
	}

	serialize() {
		return {
			...super.serialize(),
			name: this.options.name,
			options: this.options.options,
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
		this.options.name = ob.name;
	}
}