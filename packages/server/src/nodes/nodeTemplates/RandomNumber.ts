'use strict';

import { NodeDataBase } from '../nodeBase';
import { InputPort, OutputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import { OptionsBase, NodeCategory } from '../nodeBase/NodeBase';
import { logger } from '../../utilities';
import Flow from '../../flow/lib/Flow';

export default class RandomNumber extends NodeDataBase {
  randomNumber: number;

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
    this.nodeCategory = NodeCategory.Input;

    this.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'min', 0));
    this.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'max', 1));
    this.addPort(new OutputPort(
      this,
      portTypeFactory.createNumberPortType(),
      'random number',
      async () => await this.generateRandomValue()
    ));
    this.addPort(new OutputPort(
      this,
      portTypeFactory.createNumberPortType(),
      'latest number',
      async () => await this.randomNumber
  ));

    const options: OptionsBase = this.createOptions();
    this.setOptions(options);
  }

  createOptions() {
    const options: OptionsBase = {
      description: `This node will just output a random number between the minimum and maximum \
      number specified. You can use it to vary the scale or length of a curve. \n
      The output port "random number" will generate each time it is fetched a new random number. \
      The output port "latest number" can be used to fetch the latest random number \
      without generating a new one.`,
    };

    return options;
  }

  async generateRandomValue(): Promise<number> {
    try {
      const { min, max } = await this.fetchInputPorts();
      const range = max - min;
      this.randomNumber = Math.random() * range + min;
      return this.randomNumber;
    } catch (err) {
      logger.error(this.constructor.name, err);
      return 0;
    }
  }
}
