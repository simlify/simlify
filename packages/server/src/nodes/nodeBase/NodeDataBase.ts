'use strict';

import { NodeBase } from './NodeBase';
import Flow from '../../flow/lib/Flow';

export default class NodeDataBase extends NodeBase {
  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
  }
}
