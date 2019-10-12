'use strict';

import { NodeBase } from '../nodeBase';
import Flow from '../../flow/lib/Flow';
import { InputPort, OutputPort } from '../ports';
import { PortValueType, portTypeFactory } from '../ports/portTypes';
import { OptionsBase, NodeCategory } from '../nodeBase/NodeBase';

const MODULENAME = 'CurrentValue';

export default class CurrentValue extends NodeBase {
  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
    this.nodeCategory = NodeCategory.Output;

    super.addPort(new InputPort(
      this,
      portTypeFactory.createNumberPortType(),
      'FlowIndex',
      0,
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

    const options: OptionsBase = this.createOptions();
    this.setOptions(options);
  }

  createOptions() {
    const options: OptionsBase = {
      description: `This node will access the value of a flow \
      and sends it to the connected node. The trigger output is exectued every time \
      the value changes. \n
      You have to choose the index of the flow (first tab = index 0) to get the correct value`,
    };

    return options;
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
