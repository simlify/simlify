'use strict';

import { NodeTriggerBase } from '../nodeBase';
import { OutputPort, InputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import Flow from '../../flow/lib/Flow';
import { OptionsBase, SettingType } from '../nodeBase/NodeBase';

export default class JSON extends NodeTriggerBase {

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);

    super.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'measurement1', 0));

    super.addPort(new OutputPort(
        this,
        portTypeFactory.createJSONPortType(),
        'JSON',
        {}
    ));

    const options: OptionsBase = {
      settings: [
        {
          name: 'JSON',
          description: 'Template for generating a JSON object from the inputs',
          settingType: SettingType.String,
          value: '{}'
        }
      ],
      variables: {},
      description: 'This node generates a JSON output that can be processed from e.g. a MQTT output node.',
    };
    this.setOptions(options);
  }

  generateJSON(inputPortValues: any) {
    const {
      measurement1,
      measurement2,
      measurement3,
    } = inputPortValues;
    const jsonString = this.getSetting('JSON').value || '{ }';

    // In order to have arguments named the jsonString has to be wrapped
    const body = `{ return function(input1, input2, input3){ return(${jsonString}) }}`;

    // tslint:disable-next-line
    const func = new Function(body);
    const jsonOutput = func.call(null).call(measurement1, measurement2, measurement3);
    console.log(jsonOutput);
    return jsonOutput;
  }

  onTrigger(inputPortValues: any) {
    return this.getOutputPortsByLabel('JSON')[0]
      .setValue(this.generateJSON(inputPortValues));
  }
}
