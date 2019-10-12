'use strict';

import { NodeTriggerBase } from '../nodeBase';
import { OutputPort, InputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import Flow from '../../flow/lib/Flow';
import { OptionsBase, SettingType, NodeCategory } from '../nodeBase/NodeBase';

const initialJSON = `{
  "measurement": input1,
  "aString": "The answer",
  "aNumber": 43,
  "aBoolean": true,
}`;

export default class JSON extends NodeTriggerBase {

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
    this.nodeCategory = NodeCategory.Conversion;

    super.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'input1', 0));
    super.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'input2', 0));
    super.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'input3', 0));
    super.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'input4', 0));
    super.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'input5', 0));
    super.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'input6', 0));
    super.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'input7', 0));
    super.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'input8', 0));

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
          settingType: SettingType.JSON,
          value: initialJSON,
          settingOptions: {
            multiline: true,
          }
        }
      ],
      variables: {},
      description: `This node generates a JSON output that can be processed from e.g. a MQTT output node. \
        Adapt the JSON under settings according to your needs. To access the input values in the JSON \
        you have to use property naming of the input port (e.g. input1).`,
    };
    this.setOptions(options);
  }

  generateJSON(inputPortValues: any) {
    const {
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      input7,
      input8,
    } = inputPortValues;
    const jsonString = this.getSetting('JSON').value || '{ }';

    // In order to have arguments named the jsonString has to be wrapped
    const body = `{
      return function(input1, input2, input3, input4, input5, input6, input7, input8){
        return(${jsonString})
      }
    }`;

    // tslint:disable-next-line
    const func = new Function(body);
    const jsonOutput = func.call(null)
      .call(null, input1, input2, input3, input4, input5, input6, input7, input8);
    return jsonOutput;
  }

  onTrigger(inputPortValues: any) {
    return this.getOutputPortsByLabel('JSON')[0]
      .setValue(this.generateJSON(inputPortValues));
  }
}
