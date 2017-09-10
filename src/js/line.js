import React from 'react';
import { extent, min, max } from 'd3-array';
import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryContainer,
  VictoryScatter,
  VictoryAxis,
  VictoryLegend,
  VictoryLabel,
  VictoryTooltip,
  Line,
} from 'victory';

const data = [
  { x: 0, y1: 0, y2: 4 },
  { x: 1, y1: 2, y2: 3 },
  { x: 2, y1: 1, y2: 8 },
  { x: 3, y1: 4, y2: 9 },
  { x: 4, y1: 3, y2: 7 },
  { x: 5, y1: 10, y2: 6 },
  { x: 6, y1: 9, y2: 6 },
  { x: 7, y1: 10, y2: 8 },
  { x: 8, y1: 8.5, y2: 8.5 },
  { x: 9, y1: 9, y2: 9 },
];

const legend = [{ name: 'A', symbol: { type: 'circle' } }, { name: 'B', symbol: { type: 'square' } }];

const domain = {
  x: extent(data, d => d.x),
  y: [Math.min(min(data, d => d.y1), min(data, d => d.y2)), Math.max(max(data, d => d.y1), max(data, d => d.y2))],
};

const padding = { left: 50, top: 20, bottom: 50, right: 20 }; // 50
const chartStyle = { parent: { border: '1px solid #ccc' } };
const legendStyle = {
  data: { opacity: 0.7 },
  labels: { fontSize: 12, fill: '#333' },
  parent: { stroke: 'red' },
};

const group1Style = {
  data: { fill: 'blue', strokeOpacity: 0.75 },
  labels: { fontSize: '14px', fill: '#333' },
};
const group2Style = {
  data: { fill: 'lightblue', strokeOpacity: 0.75 },
  labels: { fontSize: '14px', fill: '#333' },
};

const axisStyle = {
  axis: { stroke: '#756f6a' },
  axisLabel: { fontSize: 14, padding: 25 },
  grid: { stroke: '#efefef', strokeDasharray: '1,1' },
  ticks: { stroke: '#756f6a', size: 5 },
  tickLabels: { fontSize: '10px', padding: 5 },
};
const flyoutStyle = { fill: 'white', stroke: '#756f6a' };

const interpolation = 'linear'; // 'catmullRom'

const Chart = () => {
  return (
    <VictoryChart
      height={400}
      width={600}
      domainPadding={40}
      domain={domain}
      padding={padding}
      style={chartStyle}
      containerComponent={<VictoryContainer responsive={false} />}
    >
      {/* <VictoryChart height={200} width={300} domainPadding={10} domain={domain} padding={padding} style={chartStyle}> */}

      {/* order of dom nodes matters! elements stack fist=>bottom, last=>top */}

      {/* y axis */}
      <VictoryAxis dependentAxis tickCount={5} label="Amount (millions)" style={axisStyle} />

      {/* x axis */}
      <VictoryAxis label="Years" tickCount={5} tickFormat={t => `${Math.round(t)}yr`} style={axisStyle} />

      {/* legends */}
      {/* <VictoryLegend colorScale={['blue', 'lightblue']} data={legend} gutter={0} symbolSpacer={5} style={legendStyle} /> */}

      <VictoryGroup data={data} y={'y1'} style={group1Style}>
        <VictoryLine interpolation={interpolation} />
        <VictoryScatter
          size={3}
          labels={d => `${d.y1} million`}
          labelComponent={<VictoryTooltip dy={0} pointerLength={5} cornerRadius={0} flyoutStyle={flyoutStyle} />}
        />
      </VictoryGroup>

      <VictoryGroup data={data} y={'y2'} style={group2Style}>
        <VictoryLine interpolation={interpolation} />
        <VictoryScatter
          size={3}
          labels={d => `${d.y2} million`}
          labelComponent={<VictoryTooltip dy={0} pointerLength={5} cornerRadius={0} flyoutStyle={flyoutStyle} />}
        />
      </VictoryGroup>
    </VictoryChart>
  );
};

export default Chart;
