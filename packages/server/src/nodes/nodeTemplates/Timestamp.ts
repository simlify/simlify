'use strict';
import moment from 'moment';
import { NodeDataBase } from '../nodeBase';
import { OutputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import { OptionsBase, NodeCategory, SettingType } from '../nodeBase/NodeBase';
import { logger } from '../../utilities';
import Flow from '../../flow/lib/Flow';

export default class Timestamp extends NodeDataBase {
  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
    this.nodeCategory = NodeCategory.Input;

    this.addPort(new OutputPort(
      this,
      portTypeFactory.createStringPortType(),
      'timestamp',
      async () => await this.generateTimestamp()
    ));

    const options: OptionsBase = this.createOptions();
    this.setOptions(options);
  }

  createOptions() {
    const options: OptionsBase = {
      description: `This node will output a the current timestamp. The format can be set under settings. \
        The node utilizes moment.js -see https://momentjs.com/ for information on how to choose the string.`,
      settings: [
        {
          name: 'timestampFormat',
          description: 'Format of the timestamp',
          settingType: SettingType.String,
          value: 'x',
        }
      ],
    };

    return options;
  }

  async generateTimestamp(): Promise<string> {
    try {
      const timestampFormat = this.getSetting('timestampFormat').value as string || 'x';
      return moment().format(timestampFormat);
    } catch (err) {
      logger.error(this.constructor.name, err);
      return new Date().toISOString();
    }
  }
}
