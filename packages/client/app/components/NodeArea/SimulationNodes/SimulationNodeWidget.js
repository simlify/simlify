import * as React from 'react';
import Bezier from 'components/Bezier';
import shortid from 'shortid';
import { SimPortLabel } from '../Ports/SimPortWidget';

import './SimulationNodeStyle.scss';

export class SimulationNodeWidget extends React.Component {
	render() {
		const { node, inActive } = this.props;
		const ports = node.getPorts();

		const inputPorts = [];
		const outputPorts = [];
		let triggerInputPort = null;
		let triggerOutputPort = null;

		Object.values(ports).forEach((port) => {
			port.setMaximumLinks(1);
			if (port.direction === 'in') {
				if(port.portType.type === 'trigger') triggerInputPort = port;
				else inputPorts.push(port);
			} 
			else {
				if(port.portType.type === 'trigger') triggerOutputPort = port;
				else outputPorts.push(port);
			}
		});

		let visualisation = ''
		if (node.options && node.options.options) {
			const visualisationType = node.options.options.visualisation;
			if (visualisationType === 'BezierCurve') {
				const points = node.options.options.variables.points;
				visualisation = <div 
				  onMouseDown={() => node.setLocked(true)}
					onMouseUp={() => node.setLocked(false)}
					onMouseLeave={() => node.setLocked(false)}
					className="simulationNode__body__visualisation"
			  >
					<Bezier
						defaultPosition={points}
						onChange={(newPoints) => {node.options.options.variables.points = newPoints}}
						width={150}
						height={150}
					/>
				</div>
			}
		}

		return (
			<div key={node.options.id} className={`simulationNode ${node.isSelected() ? 'simulationNode--selected' : ''}`}>
				<div className="simulationNode__header">
					<div className="simulationNode__titleNode">
						{
							triggerInputPort
							? <SimPortLabel
								  roundedLeft
								  inactivePort={inActive}
								  disableLabel
								  engine={this.props.engine}
								  port={triggerInputPort}
								/>
							: <div />
						}
						<div className="simulationNode__titleNode__title"> {node.options.name} </div>
						{
							triggerOutputPort
							? <SimPortLabel
								roundedRight
								inactivePort={inActive}
								disableLabel
								engine={this.props.engine}
								port={triggerOutputPort}
							/>
							: <div />
						}
					</div>
				</div>
				<div className="simulationNode__body">
				  {
					  visualisation
					}
					<div className="simulationNode__ports simulationNode__inputPorts">
					{
						inputPorts.map((inputPort) => (
							<SimPortLabel
								roundedLeft
								inactivePort={inActive}
								engine={this.props.engine}
								port={inputPort}
								key={shortid.generate()}
							/>
						))
					}
					</div>
					<div className="simulationNode__ports simulationNode__outputPorts">
					{
						outputPorts.map((outputPort) => (
							<SimPortLabel
								roundedRight
								inactivePort={inActive}
								engine={this.props.engine}
								port={outputPort}
								key={shortid.generate()}
							/>
						))
					}
					</div>
				</div>
			</div>
		);
	}
}