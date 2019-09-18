'use strict';

import { NodeDataBase } from '../nodeBase';
import { OutputPort, InputPort } from '../ports';
import { portTypeFactory, timeSeriesPortType } from '../ports/portTypes';
import Flow from '../../flow/lib/Flow';
import { OptionsBase, VisualisationType } from '../nodeBase/NodeBase';

export default class Bezier extends NodeDataBase {
  value: number;

  constructor(parentFlow: Flow, nodeId: string) {
    super(parentFlow, nodeId);
    super.addPort(new InputPort(
      this,
      portTypeFactory.createNumberPortType(),
      'NumberOfPoints',
      200
    ));

    super.addPort(new OutputPort(
        this,
        portTypeFactory.createTimeSeriesPortType(),
        '',
        async () => await this.calculateBezierCurve()
    ));

    const options: OptionsBase = {
      variables: {
        points: [0.2, 0.2, 0.8, 0.8]
      },
      visualisation: VisualisationType.BezierCurve,
    };
    this.setOptions(options);
  }

  cubicBezier(p0: number, p1: number, p2: number, p3: number, t: number) {
    const term1 = p0 * Math.pow(1 - t, 3);
    const term2 = 3 * p1 * Math.pow(1 - t, 2) * t;
    const term3 = 3 * p2 * (1 - t) * Math.pow(t, 2);
    const term4 = p3 * Math.pow(t, 3);
    return  term1 + term2 + term3 + term4;
  }

  bezierCurve(points: number[] = [0.2, 0.2, 0.8, 0.8], tSteps: number) {
    const bezierXPoints = [];
    const bezierYPoints = [];
    for (let i = 0; i < tSteps; i = i + 1) {
      bezierXPoints.push(this.cubicBezier(0, points[0], points[2], 1, i / tSteps));
      bezierYPoints.push(this.cubicBezier(0, points[1], points[3], 1, i / tSteps));
    }
    return { bezierXPoints, bezierYPoints };
  }

  mapBezierPointsToArray(
    bezierPoints: { bezierXPoints: number[], bezierYPoints: number[] },
    numberOfPoints: number
  ) {
    const { bezierXPoints, bezierYPoints } = bezierPoints;
    let currentXPos = 0;
    const xStepSize = 1 / numberOfPoints;
    const bezierPointsLinear: { name: number, value: number }[] = [];

    bezierXPoints.forEach((xPoint, index) => {
      if (xPoint > currentXPos) {
        bezierPointsLinear.push({ name: xPoint, value: bezierYPoints[index] });
        currentXPos += xStepSize;
      }
    });

    return bezierPointsLinear;
  }

  async calculateBezierCurve() {
    const { NumberOfPoints } = await this.fetchInputPorts();
    const MIN_T_STEPS = 200;
    const xStepAmount = Math.max(NumberOfPoints * 10, MIN_T_STEPS);
    const bezierPoints = this.bezierCurve(this.getOptions().variables.points as any, xStepAmount);
    const bezierPointsLinear = this.mapBezierPointsToArray(bezierPoints, NumberOfPoints);
    return bezierPointsLinear;
  }
}
