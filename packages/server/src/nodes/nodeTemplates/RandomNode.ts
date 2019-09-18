'use strict';

import { NodeDataBase } from '../nodeBase';
import { InputPort, OutputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import { logger } from '../../utilities';
import Flow from '../../flow/lib/Flow';

export default class RandomNode extends NodeDataBase {
  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);

    this.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'min', 0));
    this.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'max', 1));
    this.addPort(new OutputPort(
        this,
        portTypeFactory.createNumberPortType(),
        'number',
        async () => await this.generateRandomValue()
    ));
  }

  async generateRandomValue(): Promise<number> {
    try {
      const { min, max } = await this.fetchInputPorts();
      const range = max - min;
      return Math.random() * range + min;
    } catch (err) {
      logger.error(this.constructor.name, err);
      return 0;
    }
  }
}
