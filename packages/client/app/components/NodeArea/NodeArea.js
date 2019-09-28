import React from 'react';
import createEngine, { DefaultLinkModel, DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { SimulationNodeModel } from './SimulationNodes/SimulationNodeModel.js';
import { SimulationNodeFactory } from './SimulationNodes/SimulationNodeFactory.js';
import { SimPortFactory } from './Ports/SimPortFactory';
import NodeDragBar from 'components/NodeDragBar';

import './NodeArea.scss';

class NodeArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    
    this.setup();
    this.createNodesAndLinks();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if(this.props.options !== newProps.options) {
      this.clear();
      this.createNodesAndLinks(newProps.options);
    }
  }

  serialize() {
    return this.model.serialize();
  }

  setup() {
    this.engine = createEngine();

    this.engine.getNodeFactories().registerFactory(new SimulationNodeFactory());
    this.engine.getPortFactories().registerFactory(new SimPortFactory());
    this.engine.setMaxNumberPointsPerLink(0);
    
    this.model = new DiagramModel();
  }

  clear() {
    this.model.getNodes().forEach(node => this.model.removeNode(node));
    this.model.getLinks().forEach(link => this.model.removeLink(link));
  }

  createNodes(nodes) {
    if (nodes) {
      nodes.forEach(nodeData => this.createNode(nodeData));
    }
  }

  createNode(nodeData, newIds = false) {
    const node = new SimulationNodeModel(nodeData, newIds);
    const nodeModel = this.model.addNode(node);

    // Registering the event listener so the parent knows what happens
    nodeModel.registerListener({
      eventDidFire: this.onEvent.bind(this),
    });

    nodeData.nodeModel = nodeModel;
    return node;
  }

  createLinks() {
    const allNodes = this.model.getNodes();
    const allPorts = {};

    allNodes.forEach((node) => {
      Object.assign(allPorts, node.ports);
    });

    // just iterating over the outputPorts; iterating over all ports will result in duplicate links
    allNodes.forEach((node) => {
      node.options.outputPorts.forEach((outputPort) => {
        if (outputPort.portConnectedToPortId) {
          const link = new DefaultLinkModel();
          link.setSourcePort(allPorts[outputPort.id]);
          link.setTargetPort(allPorts[outputPort.portConnectedToPortId]);
          this.model.addLink(link);
        }
      })
    });
  }

  createNodesAndLinks(options) {
    if (options) {
      this.createNodes(options.nodes);
      this.createLinks(options.nodes);
    }

    this.engine.setModel(this.model);
  }

  onDrop(event) {
    const nodeData = JSON.parse(event.dataTransfer.getData('diagram-node'));
    const point = this.engine.getRelativeMousePoint(event);
    const node = this.createNode(nodeData, true);
    node.setPosition(point);
    this.forceUpdate();
  }

  onEvent(event) {
    if (this.props.onEvent) this.props.onEvent(event);
  }

  render() {
    const { availableNodes } = this.props;
    return (
      <div
        className="nodeArea"
        onDrop={(event) => this.onDrop(event)}
        onDragOver={event => {
          event.preventDefault();
        }}
      >
        <NodeDragBar availableNodes={availableNodes}/>
        <CanvasWidget
          className="nodeArea__canvas"
          engine={this.engine}
        />
      </div>
    );
  }
}

export default NodeArea;
