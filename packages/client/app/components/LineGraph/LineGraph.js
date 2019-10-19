import React, {useState, useEffect} from 'react';
import { TimeSeries} from "pondjs";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  ScatterChart,
  Resizable
} from "react-timeseries-charts";

const dataSample =  [];

const chart = (data) => (
  <Charts>
      <ScatterChart axis="y" series={data} />
  </Charts>
);

const createSeries = (dataPoints) => new TimeSeries({
  name: '',
  columns: ['time', 'value'],
  points: dataPoints,
});

export default ({
    maxPoints = 1000,
    ...rest
  }) => {
    const [data, setData] = useState(dataSample);
    const series = createSeries(data);

    useEffect(() => {
      setInterval(() => {
        data.push([new Date().getTime(), Math.random() * 100]);
        if(data.length > maxPoints) data.pop();
        setData([...data]);
      }, 500);
    }, []);

    if(data.length < 2) return null;

    return (
      <Resizable>
        <ChartContainer timeRange={series.range()}>
          <ChartRow height="150">
            <YAxis
              id="y"
              label="Value"
              min={series.min()}
              max={series.max()}
              width="70"
              type="linear"
            />
            { chart(series) }
          </ChartRow>
        </ChartContainer>
      </Resizable>
    )
  }