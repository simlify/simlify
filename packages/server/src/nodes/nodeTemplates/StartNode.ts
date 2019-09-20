'use strict';

import { NodeTriggerBase } from '../nodeBase/';
import { OptionsBase } from '../nodeBase/NodeBase';
import Flow from '../../flow/lib/Flow';

export default class StartNode extends NodeTriggerBase {
  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);

    const options: OptionsBase = this.createOptions();
    this.setOptions(options);
  }

  createOptions() {
    const options: OptionsBase = {
      description: `Every flow can have only one StartNode. This is the starting point for the curve generation. \
      Connect the trigger output to an value generation node (like TriggerCurveNode). \
      If you want to realize an infinite curve generation route back the to the trigger input of this node.`,
    };

    return options;
  }

  onTrigger() {
  }
}
