'use strict';

import { PortType, portTypeFactory } from './portTypes';
import { Port } from './Port';
import { NodeBase } from '../nodeBase';

export default class InputPort extends Port {
  constructor(
    parentNode: NodeBase,
    portType: PortType = portTypeFactory.createNumberPortType(),
    label: string = '',
    value: any = 0,
    allowConnection: boolean = true
  ) {
    super(parentNode, portType, label, value, allowConnection);
    this.direction = 'in';
  }

  async getValue(): Promise<any> {
    if (!this.portConnectedTo) return this.portType.value;
    return await this.portConnectedTo.getValue();
  }
}
