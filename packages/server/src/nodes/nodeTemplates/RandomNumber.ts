'use strict';

import { NodeDataBase } from '../nodeBase';
import { InputPort, OutputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import { OptionsBase, NodeCategory } from '../nodeBase/NodeBase';
import { logger } from '../../utilities';
import Flow from '../../flow/lib/Flow';

export default class RandomNumber extends NodeDataBase {
  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
    this.nodeCategory = NodeCategory.Input;

    this.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'min', 0));
    this.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'max', 1));
    this.addPort(new OutputPort(
        this,
        portTypeFactory.createNumberPortType(),
        'number',
        async () => await this.generateRandomValue()
    ));

    const options: OptionsBase = this.createOptions();
    this.setOptions(options);
  }

  createOptions() {
    const options: OptionsBase = {
      description: `This node will just output a random number between the minimum and maximum \
      number specified. You can use it to vary the scale or length of a curve.`,
    };

    return options;
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
