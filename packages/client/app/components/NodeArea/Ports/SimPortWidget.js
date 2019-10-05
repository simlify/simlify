import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import PortTextField from 'components/PortTextField';

import './SimPortStyle.scss';

function renderPort(engine, port, roundedLeft, roundedRight, inactivePort = false) {
	const { color: portBackgroundColor } = port.portType;
	const className = `${roundedLeft ? 'simPortLabel__port--left' : ''} \
		${roundedRight ? 'simPortLabel__port--right' : ''} simPortLabel__port`;
		
	if(!port.allowConnection) return <div className="simPortLabel__port" />;

	return(
		inactivePort
		?
		<div
			className={className}
			style={{ backgroundColor: portBackgroundColor }}
		/>
		:
		<PortWidget engine={engine} port={port}>
			<div
				className={className}
				style={{ backgroundColor: portBackgroundColor }}
			/>
		</PortWidget>
	)
}

function renderLabel(isEditable, port, isConnected, isDisabled) {
	return(
		<div className="simPortLabel__label">
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
			{ !isDisabled && port.options.label }
		</div>
	)
}

export function SimPortLabel({ port,
	engine,
	roundedLeft,
	roundedRight,
	inactivePort,
	disableLabel,
}) {
	const isConnected = !!Object.keys(port.links).length;

	const { isEditable } = port.portType;

	const portElem = renderPort(engine, port, roundedLeft, roundedRight, inactivePort);
	const labelElem = renderLabel(isEditable, port, isConnected, disableLabel);

	return (
		<div className="simPortLabel">
			{port.direction === 'in' ? portElem : labelElem}
			{port.direction === 'in' ? labelElem : portElem}
		</div>
	);
}
