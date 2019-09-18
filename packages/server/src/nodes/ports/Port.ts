'use strict';

import crypto from 'crypto';
import { logger } from '../../utilities';
import { PortType, PortValueType } from './portTypes';
import { NodeBase } from '../nodeBase';

const generateHash = (): string => {
  return crypto.randomBytes(20).toString('hex');
};

export class Port {
  id: string;
  parentNode: NodeBase;
  portType: PortType;
  label: string;
  portConnectedTo: Port;
  direction: string;
  allowConnection: boolean;

  constructor(
    parentNode: NodeBase,
    portType: PortType,
    label = '',
    value: any = 0,
    allowConnection = true
  ) {
    this.id = generateHash();

    if (!parentNode) logger.warning(this.constructor.name, 'No valid parent node in port constructor');
    this.parentNode = parentNode;

    this.portType = portType;
    this.label = label;
    this.allowConnection = allowConnection;

    // contains the node it is connected to
    this.portConnectedTo = null;

    if (value) {
      portType.value = value;
    }
  }

  public connectTo(targetPort: Port | string) {
    if (!targetPort) return;
    if (typeof targetPort === 'string') {
      const connectedPort = this.parentNode.parentFlow.getPortWithId(targetPort);
      if (connectedPort) this.connectTo(connectedPort);
    } else {
      this.portConnectedTo = targetPort;
      targetPort.portConnectedTo = this;
    }
  }

  async getValue(): Promise<any> {
    return this.portType.value;
  }

  setValue(value: any) {
    if (this.portType.type === PortValueType.number) {
      this.portType.value = Number(value);
    } else {
      this.portType.value = value;
    }
  }

  overrideId(id: string) {
    this.id = id;
  }

  getPortType(): PortType {
    return this.portType;
  }

  getConnectedPort(): Port {
    return this.portConnectedTo;
  }

  getConnectedNode(): any {
    if (!this.portConnectedTo) return null;
    return this.portConnectedTo.parentNode;
  }

  serialize(): any {
    return ({
      portType: this.portType,
      id: this.id,
      label: this.label,
      allowConnection: this.allowConnection,
      portConnectedToPortId: this.portConnectedTo ? this.portConnectedTo.id : null,
    });
  }

  /*deserialize(serializedData: any) {
    const {
      id,
      label,
      portType,
      portConnectedToPortId
    } = serializedData;

    this.id = id;
    this.label = label;

    if (portType.value) this.portType.value = portType.value;
    this.portType.type = portType.type;
    this.portType.color = portType.color;

    if (portConnectedToPortId) {
      const connectedPort = this.parentNode.parentFlow.getPortWithId(portConnectedToPortId);
      if (connectedPort) this.connectTo(connectedPort);
    }
  }*/
}
