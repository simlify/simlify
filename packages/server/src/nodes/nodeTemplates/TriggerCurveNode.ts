'use strict';

import { NodeTriggerBase } from '../nodeBase/';
import { InputPort, OutputPort } from '../ports';
import { portTypeFactory } from '../ports/portTypes';
import { OptionsBase } from '../nodeBase/NodeBase';
import { logger } from '../../utilities';
import Flow from '../../flow/lib/Flow';

export default class TriggerCurveNode extends NodeTriggerBase {
  latestValue: number;

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);

    this.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'offset', 0));
    this.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'scale', 1));
    this.addPort(new InputPort(this, portTypeFactory.createNumberPortType(), 'durationMs', 3000));
    this.addPort(new InputPort(
      this,
      portTypeFactory.createNumberPortType(),
      'samplesPerSecond',
      20
    ));

    this.addPort(new InputPort(
      this,
      portTypeFactory.createTimeSeriesPortType(),
      'curveData',
      [{ key: 0, value: 10 }, { key: 2, value: 20 }]
    ));

    this.addPort(new OutputPort(
      this,
      portTypeFactory.createNumberPortType(),
      'latestValue',
      () => this.latestValue
    ));

    const options: OptionsBase = this.createOptions();
    this.setOptions(options);
  }

  createOptions() {
    const options: OptionsBase = {
      description: `The curve connected to the curveData will be used to generate a new value for this flow. \
      The value of samplesPerSecond specifies how often per second the value is update. \
      The length of the curve can be set by the durationMs input.`,
    };

    return options;
  }

  /**
   * Interpolating the output value.
   * This is important if the duration is long and/or there are not much data points.
   * @param  {Number} percentageDone Eclipsed time of the duration in % (1.0 = 100%)
   * @param  {Object} inputPortValues This object contains all values from the InputPorts
   * e.g. { offset: 0, scale: 1 }
   */
  interpolateOutput(percentageDone: number, inputPortValues: any): number {
    const { curveData, scale, offset } = inputPortValues;
    const curveSteps = curveData.length - 1;

    if (percentageDone >= 1.0) return curveData[curveSteps].value * scale + offset;
    const indexFloat = percentageDone * curveSteps;
    const lowerIndex = Math.floor(indexFloat);
    const upperIndex = Math.ceil(indexFloat);
    const percentageBetweenIndizes = indexFloat - lowerIndex;

    const interpolatedValue = curveData[lowerIndex].value +
      (curveData[upperIndex].value - curveData[lowerIndex].value) * percentageBetweenIndizes;
    return interpolatedValue * scale + offset;
  }

  /**
   * Generating new output values using the sampling time of the Node
   * @param  {Object} inputPortValues This object contains all values from the InputPorts
   * e.g. { offset: 0, scale: 1 }
   */
  runSampling(inputPortValues: any): Promise<number> {
    return new Promise((resolve, reject) => {
      const { durationMs, samplesPerSecond } = inputPortValues;

      const timestampStart = new Date().getTime();

      this.triggerInterval = setInterval(() => {
        const runtimeMs = new Date().getTime() - timestampStart;

        const percentageDone = runtimeMs / durationMs;
        const calculationValue = this.interpolateOutput(percentageDone, inputPortValues);

        this.parentFlow.updateValue(calculationValue, this, percentageDone);

        if (runtimeMs >= durationMs) {
          this.latestValue = calculationValue;
          resolve();
          this.stop();
        }
      },                                 1000 / samplesPerSecond);
    });
  }

  onTrigger(inputPortValues: any): Promise<number> {
    return new Promise((resolve, reject) => {
      this.runSampling(inputPortValues)
        .then(resolve)
        .catch((err) => {
          logger.error(this.constructor.name, err);
          reject(err);
        });
    });
  }
}
