'use strict';

import { NodeTriggerBase } from '../nodeBase';
import { InputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import Flow from '../../flow/lib/Flow';
import { opcuaManager } from '../../utilities';

import { DataType, Variant } from 'node-opcua';
import { OptionsBase, SettingType } from '../nodeBase/NodeBase';

export default class OPCUA extends NodeTriggerBase {
  value: number;
  isConnected: boolean;

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);

    this.addPort(new InputPort(
        this,
        portTypeFactory.createNumberPortType(),
        'measurement',
        0
    ));

    const options: OptionsBase = this.createOptions();
    this.isConnected = false;
    this.setOptions(options);
  }

  initialize() {
    if (this.options) {
      const port = this.getSetting('Port').value as number || 4334;
      const resourcePath = this.getSetting('ResourcePath').value as string || '/UA/measurements';
      const deviceName = this.getSetting('BrowseName').value as string || 'Simlify';
      const variableName = this.getSetting('VariableName').value as string || 'Flow1';
      const callback = () => new Variant({
        dataType: DataType.Double,
        value: this.value
      });

      opcuaManager.registerValue(port, resourcePath, deviceName, variableName, callback)
        .then(() => console.log('registered'));

      this.options.variables = {
        port,
        resourcePath,
        deviceName,
        variableName,
      };
    }
  }

  onShutdown() {
    const {
      port,
      resourcePath,
      deviceName,
      variableName,
    } = this.options.variables as any;

    opcuaManager.deregisterValue(port, resourcePath, deviceName, variableName);
  }

  createOptions() {
    const options: OptionsBase = {
      settings: [
        {
          name: 'Port',
          description: 'Port of the OPCUA server',
          settingType: SettingType.Number,
          value: 4334
        },
        {
          name: 'ResourcePath',
          description: 'Resource path on the server',
          settingType: SettingType.String,
          value: '/UA/measurements'
        },
        {
          name: 'BrowseName',
          description: 'Name of the Object',
          settingType: SettingType.String,
          value: 'Simlify'
        },
        {
          name: 'VariableName',
          description: 'Variable name',
          settingType: SettingType.String,
          value: this.parentFlow ? this.parentFlow.name : 'Flow1',
        }
      ],
      variables: {},
      description: `This output node allows setup an OPC-UA server. \
      Check the settings page to configure the server for your needs. \
      You can have multiple OPC-UA nodes just with differing VariableNames.`,
    };

    return options;
  }

  onTrigger(inputPortValues: any) {
    this.value = inputPortValues.measurement;
  }
}
