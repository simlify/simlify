'use strict';

import { PortType, portTypeFactory } from './portTypes';
import { Port } from './Port';
import { NodeBase } from '../nodeBase';

export default class OutputPort extends Port {
  constructor(
    parentNode: NodeBase,
    portType: PortType = portTypeFactory.createNumberPortType(),
    label: string = '',
    value: any = 0,
    allowConnection: boolean = true,
  ) {
    super(parentNode, portType, label, value, allowConnection);
    this.direction = 'out';
  }

  async getValue(): Promise<any> {
    if (typeof this.portType.value === 'function') {
      return await this.portType.value(this);
    }
    return this.portType.value;
  }

  setValue(value: any) {
    this.portType.value = value;
  }
}
