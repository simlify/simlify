'use strict';

import { NodeTriggerBase } from '../nodeBase';
import { OutputPort, InputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import Flow from '../../flow/lib/Flow';
import { OptionsBase } from '../nodeBase/NodeBase';

export default class CreateJSON extends NodeTriggerBase {

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);

    super.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'measurement', 0));

    super.addPort(new OutputPort(
        this,
        portTypeFactory.createJSONPortType(),
        'JSON',
        {}
    ));

    const options: OptionsBase = {
      settings: [],
      variables: {},
      description: 'This node generates a JSON output that can be processed from e.g. a MQTT output node.',
    };
    this.setOptions(options);
  }

  onTrigger(inputPortValues: any) {
    return this.getOutputPortsByLabel('JSON')[0]
      .setValue({ measurement: inputPortValues.measurement });
  }
}
