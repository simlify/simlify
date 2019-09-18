'use strict';

import { NodeTriggerBase } from '../nodeBase/';
import Flow from '../../flow/lib/Flow';

export default class StartNode extends NodeTriggerBase {
  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
  }

  onTrigger() {
  }
}
