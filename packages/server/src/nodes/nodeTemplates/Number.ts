'use strict';

import { NodeDataBase } from '../nodeBase';
import { OutputPort, InputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import { OptionsBase, NodeCategory } from '../nodeBase/NodeBase';
import Flow from '../../flow/lib/Flow';

export default class Number extends NodeDataBase {
  value: number;

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
    this.nodeCategory = NodeCategory.Input;

    super.addPort(new InputPort(
      this,
      portTypeFactory.createNumberPortType(),
      'number',
      1,
      false
    ));

    super.addPort(new OutputPort(
        this,
        portTypeFactory.createNumberPortType(),
        '',
        async () => await this.getNumber()
    ));

    const options: OptionsBase = this.createOptions();
    this.setOptions(options);
  }

  createOptions() {
    const options: OptionsBase = {
      description: 'This node will just output the number spezified.',
    };

    return options;
  }

  async getNumber() {
    const { number } = await this.fetchInputPorts();
    return number;
  }
}
