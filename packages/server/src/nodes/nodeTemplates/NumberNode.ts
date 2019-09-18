'use strict';

import { NodeDataBase } from '../nodeBase';
import { OutputPort, InputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import Flow from '../../flow/lib/Flow';

export default class NumberNode extends NodeDataBase {
  value: number;

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
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
  }

  async getNumber() {
    const { number } = await this.fetchInputPorts();
    return number;
  }
}
