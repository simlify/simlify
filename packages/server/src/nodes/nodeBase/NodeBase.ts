'use strict';

import { InputPort, OutputPort, Port } from '../ports';
import Flow from '../../flow/lib/Flow';
import { generateId } from '../../utilities/flow';

const MODULENAME = 'NodeBase';

export enum SettingType {
  Number = 'Number',
  String = 'String',
  JSON = 'JSON',
  Options = 'Options',
}

export enum VisualisationType { BezierCurve = 'BezierCurve', LineChart= 'LineChart' }
export enum NodeCategory {
  Input = 'Input',
  Output = 'Output',
  Conversion = 'Conversion',
  Curve = 'Curve',
  Misc = 'Misc',
}

export interface Setting {
  name: string;
  description: string;
  settingType: SettingType;
  value: string | number;
  settingOptions?: { [property: string] : any };
}

export interface OptionsBase {
  settings?: Setting[];
  variables?: any;
  description?: string;
  visualisation?: VisualisationType;
}

export class NodeBase {
  id: string;
  parentFlow: Flow;
  inputPorts: InputPort[];
  outputPorts: OutputPort[];
  positionX: number;
  positionY: number;
  options: OptionsBase;
  nodeCategory: NodeCategory;

  constructor(parentFlow: Flow, nodeId: string, options?: OptionsBase) {
    this.id = nodeId || generateId();
    this.parentFlow = parentFlow;
    this.options = options;

    this.inputPorts = [];
    this.outputPorts = [];

    // Graphical representation
    this.positionX = 0;
    this.positionY = 0;

    this.nodeCategory = NodeCategory.Misc;

    this.initialize();
  }

  static getNodeName(): string {
    return this.name;
  }

  getOptions() {
    return this.options;
  }

  setOptions(options: OptionsBase) {
    this.options = options;
  }

  getSettings(): Setting[] {
    return this.options.settings;
  }

  getSetting(settingName: string): Setting {
    const defaultReturn = {
      name: '',
      description: '',
      settingType: SettingType.Number,
      value: 0
    };

    if (!this.options || !this.options.settings) {
      return defaultReturn;
    }
    return this.options.settings.find(setting => setting.name === settingName) || defaultReturn;
  }

  addPort(port: Port) {
    port.constructor.name === 'OutputPort'
    ? this.outputPorts.push(port as OutputPort)
    : this.inputPorts.push(port as InputPort);
  }

  getPorts(): Port[] {
    return this.inputPorts.concat(this.outputPorts);
  }

  getInputPorts(): InputPort[] {
    return this.inputPorts;
  }

  getOutputPorts(): OutputPort[] {
    return this.outputPorts;
  }

  getPortById(id: string): Port {
    let foundPort = this.inputPorts.find(inputPort => inputPort.id === id);
    if (!foundPort) foundPort = this.outputPorts.find(outputPort => outputPort.id === id);
    return foundPort;
  }

  getInputPortsByLabel(label: string): InputPort[] {
    return this.inputPorts.filter(inputPort => inputPort.label === label);
  }

  getOutputPortsByLabel(label: string): OutputPort[] {
    return this.outputPorts.filter(outputPort => outputPort.label === label);
  }

  async fetchInputPorts(): Promise<any> {
    const inputPortValues: any = {};

    for (let i = 0; i < this.inputPorts.length; i = i + 1) {
      const inputPort = this.inputPorts[i];
      const inputValue: any = await inputPort.getValue();
      inputPortValues[inputPort.label] = inputValue;
    }

    return inputPortValues;
  }

  getNodeId(): string { return this.id; }

  setPosition(_positionX: number, _positionY: number) {
    this.positionX = _positionX;
    this.positionY = _positionY;
  }

  serialize(): object {
    return({
      id: this.getNodeId(),
      name: this.constructor.name,
      options: this.options,
      inputPorts: this.inputPorts.map(inputPort => inputPort.serialize()),
      outputPorts: this.outputPorts.map(outputPort => outputPort.serialize()),
      positionX: this.positionX,
      positionY: this.positionY,
      nodeCategory: this.nodeCategory,
    });
  }

  deserialize(serializedData: any) {
    this.id = serializedData.id;
    this.options = serializedData.options;
    this.nodeCategory = serializedData.nodeCategory;

    serializedData.inputPorts.forEach((serializedPort: any, index: number) => {
      const inputPort = this.inputPorts[index];
      inputPort.overrideId(serializedPort.id);
      inputPort.setValue(serializedPort.portType.value);

      if (serializedPort.portConnectedToPortId) {
        inputPort.connectTo(serializedPort.portConnectedToPortId);
      }
    });

    serializedData.outputPorts.forEach((serializedPort: any, index: number) => {
      const outputPort = this.outputPorts[index];
      outputPort.overrideId(serializedPort.id);

      if (serializedPort.portConnectedToPortId) {
        outputPort.connectTo(serializedPort.portConnectedToPortId);
      }
    });

    this.positionX = serializedData.positionX;
    this.positionY = serializedData.positionY;

    this.initialize();
  }

  // Override these functions
  initialize() {
    // functionality that is executed on creation and on deserialization
  }

  onShutdown() {
  }

  // Override these functions
  start() {
  }

  stop() {
  }

  restart() {
    this.stop();
    this.start();
  }
}
