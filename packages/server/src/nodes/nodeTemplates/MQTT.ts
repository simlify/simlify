'use strict';

import { NodeTriggerBase } from '../nodeBase';
import { InputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import Flow from '../../flow/lib/Flow';

import mqtt from 'mqtt';
import { OptionsBase, SettingType, NodeCategory } from '../nodeBase/NodeBase';

export default class MQTT extends NodeTriggerBase {
  value: number;
  client: mqtt.Client;
  isConnected: boolean;

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
    this.nodeCategory = NodeCategory.Output;

    this.addPort(new InputPort(
        this,
        portTypeFactory.createJSONPortType(),
        'JSON',
        {}
    ));

    const options: OptionsBase = this.createOptions();
    this.setOptions(options);
  }

  initialize() {
    if (this.options) {
      const host = this.getSetting('host').value || 'mqtt://localhost';
      const clientId = this.getSetting('clientId').value as string || 'identifier';
      const username = this.getSetting('user').value as string || 'user';
      const password = this.getSetting('password').value as string || 'secret';
      this.client  = mqtt.connect(`mqtt://${host}`,
                                  { clientId, username, password, protocol: 'mqtt' }
      );
      this.client.on('connect', () => {
        console.log('connected');
        this.isConnected = true;
      });
    }
  }

  createOptions() {
    const options: OptionsBase = {
      settings: [
        {
          name: 'host',
          description: 'Hostname of the MQTT server',
          settingType: SettingType.String,
          value: 'localhost'
        },
        {
          name: 'port',
          description: 'Port of the MQTT server (usual ports: 1883 (unsecured), 8883 (secured))',
          settingType: SettingType.Number,
          value: 1883
        },
        {
          name: 'clientId',
          description: 'Id of the client',
          settingType: SettingType.String,
          value: 'identifier'
        },
        {
          name: 'topic',
          description: 'Topic for the MQTT messages',
          settingType: SettingType.String,
          value: 'topicname'
        },
        {
          name: 'user',
          description: 'Username of the client',
          settingType: SettingType.String,
          value: 'user'
        },
        {
          name: 'password',
          description: 'Password of the client',
          settingType: SettingType.String,
          settingOptions: {
            type: 'password',
          },
          value: 'secret'
        },
      ],
      variables: {},
      description: `The MQTT node is an output node allowing you to send JSON data to a MQTT broker. \
      Use the setting page to specify the credentials for the connection.`,
    };

    return options;
  }

  onTrigger(inputPortValues: any) {
    if (!this.client) return;

    const topic = this.getSetting('topic').value as string || 'topicname';
    return this.client.publish(topic, JSON.stringify(inputPortValues.JSON));
  }

  onShutdown() {
    this.client.end();
  }
}
