'use strict';

import { NodeBase } from './NodeBase';
import Flow from '../../flow/lib/Flow';
import { InputPort, OutputPort } from '../ports';
import { PortValueType, portTypeFactory } from '../ports/portTypes';
import logger from '../../utilities/logger';

const MODULENAME = 'NodeTriggerBase';

export default class NodeTriggerBase extends NodeBase {
  triggerInterval: NodeJS.Timer;

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);

    this.addPort(new InputPort(this, portTypeFactory.createTriggerPortType(), 'trigger', 0));
    this.addPort(new OutputPort(this, portTypeFactory.createTriggerPortType(), 'trigger', 0));
  }

  /**
   * This function is the entry point when the node is triggered.
   * It will do its task and then trigger the next node with triggerNext()
   */
  start() {
    this.fetchInputPorts()
      .then(inputPortValues => this.onTrigger(inputPortValues))
      .then(() => this.triggerNext());
  }

  stop() {
    clearInterval(this.triggerInterval);
  }

  /**
  * Override this function to give the node its functionality.
  * @param  {Object} inputPortValues This object contains all values from the InputPorts
  * e.g. { offset: 0, scale: 1 }
  */
  onTrigger(inputPortValues: { [lable: string]: any }) {
    logger.warning(MODULENAME, 'onTrigger not overwritten');
  }

  getTriggerInputPort(): InputPort {
    return this.getInputPorts()
      .find(inputPort => inputPort.getPortType().type === PortValueType.trigger);
  }

  getTriggerOutputPort(): OutputPort {
    return this.getOutputPorts()
      .find(outputPort => outputPort.getPortType().type === PortValueType.trigger);
  }

  triggerNext() {
    const triggerOutputPort = this.getTriggerOutputPort();
    if (triggerOutputPort) {
      const connectedPort = triggerOutputPort.getConnectedPort() as InputPort;
      if (!connectedPort) return;
      connectedPort.parentNode.start();
    }
  }

  connectInputTriggerPort(sourcePort: OutputPort) {
    this.getTriggerInputPort().connectTo(sourcePort);
  }

  connectOutputTriggerPort(targetPort: InputPort) {
    this.getTriggerOutputPort().connectTo(targetPort);
  }

  serialize() {
    const serializedBase = super.serialize();

    const triggerInputPort = this.getTriggerInputPort();
    const triggerOutputPort = this.getTriggerOutputPort();

    let triggerInputConnectedToNodeId: string  = null;
    if (triggerInputPort &&
      triggerInputPort.portConnectedTo &&
      triggerInputPort.portConnectedTo.parentNode) {
      triggerInputConnectedToNodeId = triggerInputPort.portConnectedTo.parentNode.getNodeId();
    }

    let triggerOutputConnectedToNodeId: string = null;
    if (triggerOutputPort &&
      triggerOutputPort.portConnectedTo &&
      triggerOutputPort.portConnectedTo.parentNode) {
      triggerOutputConnectedToNodeId = triggerOutputPort.portConnectedTo.parentNode.getNodeId();
    }

    return Object.assign({}, serializedBase, {
      triggerInputConnectedToNodeId,
      triggerOutputConnectedToNodeId,
    });
  }

  deserialize(serializedData: any) {
    super.deserialize(serializedData);
    const inputConnectedNodeId = serializedData.triggerInputConnectedToNodeId;
    const outputConnectedNodeId = serializedData.triggerOutputConnectedToNodeId;
    const inputNode = this.parentFlow.getNodeWithId(inputConnectedNodeId) as NodeTriggerBase;
    const outputNode = this.parentFlow.getNodeWithId(outputConnectedNodeId) as NodeTriggerBase;

    if (outputNode) this.connectInputTriggerPort(outputNode.getTriggerOutputPort());
    if (inputNode) this.connectOutputTriggerPort(inputNode.getTriggerInputPort());
  }
}
