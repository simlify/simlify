'use strict';

import { NodeBase } from '../nodeBase';
import Flow from '../../flow/lib/Flow';
import { InputPort, OutputPort } from '../ports';
import { PortValueType, portTypeFactory } from '../ports/PortTypes';
import logger from '../../utilities/logger';

const MODULENAME = 'NodeFlowValue';

export default class NodeFlowValue extends NodeBase {
  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);

    super.addPort(new InputPort(
      this,
      portTypeFactory.createNumberPortType(),
      'FlowIndex',
      1,
      false
    ));

    this.addPort(new OutputPort(this, portTypeFactory.createTriggerPortType(), 'trigger', 0));

    this.addPort(new OutputPort(
      this,
      portTypeFactory.createNumberPortType(),
      'latestMeasurement',
      async () => await this.getLatestMeasurement())
    );

    if (parentFlow) parentFlow.registerOnValueUpdateCB(nodeId, this.triggerNext.bind(this));
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

  async getLatestMeasurement() {
    try {
      const fetchedInputPorts = await this.fetchInputPorts();
      const flowIndex = fetchedInputPorts.FlowIndex;
      return this.parentFlow.commonData.flows.getFlowByIndex(flowIndex).getCurrentValue();
    } catch (err) {
      return 0;
    }
  }
}
