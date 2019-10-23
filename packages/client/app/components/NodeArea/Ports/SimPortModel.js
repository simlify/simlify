import {
	PortModel,
	PortModelAlignment,
} from '@projectstorm/react-diagrams-core';
import { DefaultLinkModel } from '@projectstorm/react-diagrams';

export class SimPortModel extends PortModel {
	constructor({ label, direction, portType, name, value, allowConnection }) {
		super({
			label,
			alignment: direction === 'in' ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
			type: 'default',
			name,
		});

		this.portType = portType;
		this.direction = direction;
		this.value = value;
		this.allowConnection = allowConnection;
	}

	deserialize(event) {
		super.deserialize(event);
		this.options.label = event.data.label;
		this.portType = event.data.portType;
		this.direction = event.data.direction;
		this.value = event.data.value;
		this.allowConnection = event.data.allowConnection;
	}

	serialize() {
		return {
			...super.serialize(),
			label: this.options.label,
			portType: this.portType,
			direction: this.direction,
			value: this.value,
			allowConnection: this.allowConnection,
		};
	}

	link(port, factory) {
		let link = this.createLinkModel(factory);
		link.setSourcePort(this);
		link.setTargetPort(port);
		return link;
	}

	canLinkToPort(port) {
		if (port instanceof SimPortModel) {
			const sameDirection = this.direction === port.direction;
			const samePortType = this.portType.type === port.portType.type;
			const portTypeAny = this.portType.type === 'any' || port.portType.type === 'any'; 
			if (!sameDirection && (samePortType || portTypeAny)) return true;
		}
		return false;
	}

	createLinkModel(factory) {
		let link = super.createLinkModel();
		if (!link && factory) {
			return factory.generateModel({});
		}
		return link || new DefaultLinkModel();
	}
}