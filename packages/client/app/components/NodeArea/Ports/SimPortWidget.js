import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import PortTextField from '../../PortTextField';

import './SimPortStyle.scss';

export class SimPortLabel extends React.Component {
	renderPort(engine, port, roundedLeft, roundedRight) {
		const { color: portBackgroundColor } = port.portType;
		const className = `${roundedLeft ? 'simPortLabel__port--left' : ''} \
		    ${roundedRight ? 'simPortLabel__port--right' : ''} simPortLabel__port`;

		return(
			port.allowConnection
			?
			<PortWidget engine={engine} port={port}>
				<div
					className={className}
					style={{ backgroundColor: portBackgroundColor }}
				/>
			</PortWidget>
			:
			<div className="simPortLabel__port" />
		)
	}

	render() {
		const { port, engine, roundedLeft, roundedRight } = this.props;
		const isConnected = !!Object.keys(port.links).length;

        const { isEditable } = port.portType;

		const portElem = this.renderPort(engine, port, roundedLeft, roundedRight);

        const labelElem = <div className="simPortLabel__label">
            {
                isEditable &&
                port.direction === 'in' &&
                <PortTextField
                    disabled={isConnected}
                    defaultValue={port.portType.value}
                    onChange={(value) => port.portType.value = value}
                    onFocus={() => port.parent.setLocked(true)}
                    onBlur={() => port.parent.setLocked(false)}
				/>
            }
            { !this.props.disableLabel && port.options.label }
        </div>;

		return (
			<div className="simPortLabel">
				{port.direction === 'in' ? portElem : labelElem}
				{port.direction === 'in' ? labelElem : portElem}
			</div>
		);
	}
}