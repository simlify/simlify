import React from 'react';
import { styler } from 'react-timeseries-charts';
import { TimeSeries} from 'pondjs';
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  ScatterChart,
  Resizable
} from "react-timeseries-charts";

import "./LineGraph.scss";

const chart = (data) => (
  <Charts>
      <ScatterChart axis="y" series={data} style={perEventStyle}/>
  </Charts>
);

const axisStyle = { 
  label: { 
    stroke: "none",
    fill: "#FFFFFF", // Default label color
    fontWeight: 100,
    fontSize: 12,
    font: '"Goudy Bookletter 1911", sans-serif"'
  },
  values: {
    stroke: "none",
    fill: "#FFFFFF", // Default value color
    fontWeight: 100,
    fontSize: 11,
    font: '"Goudy Bookletter 1911", sans-serif"'
  }, 
  ticks: {
    fill: "none",
    stroke: "#C0C0C0"
  },
  axis: {
    fill:
    "none",
    stroke: "#C0C0C0"
  }
}

const createSeries = (dataPoints) => new TimeSeries({
  name: '',
  columns: ['time', 'value'],
  points: dataPoints,
});

const perEventStyle = (column, event) => {
  const color = "#FFFFFF"; // heat[Math.floor((1 - event.get("station1") / 40) * 9)];
  return {
      normal: {
          fill: color,
          opacity: 1.0
      },
      highlighted: {
          fill: color,
          stroke: "none",
          opacity: 1.0
      },
      selected: {
          fill: "none",
          stroke: "#2CB1CF",
          strokeWidth: 3,
          opacity: 1.0
      },
      muted: {
          stroke: "none",
          opacity: 0.4,
          fill: color
      }
  };
};

export default ({
    data,
    maxPoints = 1000,
    className,
    ...rest
  }) => {
    const series = createSeries(data);

    if(data.length < 2) return null;

    return (
      <div className="lineGraph blueprintBackground boxShadow" >
        <Resizable>
          <ChartContainer timeAxisStyle={axisStyle} timeRange={series.range()}>
            <ChartRow height="150">
              <YAxis
                id="y"
                label=""
                min={series.min()}
                max={series.max()}
                width="70"
                type="linear"
                style={axisStyle}
              />
              { chart(series) }
            </ChartRow>
          </ChartContainer>
        </Resizable>
      </div>
    )
  }