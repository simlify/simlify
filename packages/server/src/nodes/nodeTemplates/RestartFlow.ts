'use strict';

import { NodeTriggerBase } from '../nodeBase/';
import { OptionsBase, NodeCategory } from '../nodeBase/NodeBase';
import Flow from '../../flow/lib/Flow';

export default class RestartFlow extends NodeTriggerBase {
  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
    this.nodeCategory = NodeCategory.Misc;

    this.removeOutputPort();

    const options: OptionsBase = this.createOptions();
    this.setOptions(options);
  }

  createOptions() {
    const options: OptionsBase = {
      description: 'This node will restart the flow and thus create a new curve.',
    };

    return options;
  }

  removeOutputPort() {
    this.getOutputPorts().forEach(port => this.removePort(port.id));
  }

  onTrigger() {
    this.parentFlow.stop();
    this.parentFlow.start();
  }
}
