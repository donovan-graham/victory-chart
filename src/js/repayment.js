import React from 'react';
import ReactDOM from 'react-dom';
import { extent, min, max } from 'd3-array';
import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryArea,
  VictoryContainer,
  VictoryStack,
  VictoryScatter,
  VictoryAxis,
  VictoryLegend,
  VictoryLabel,
  VictoryTooltip,
  Line,
} from 'victory';

import ds from './amortisation-data';
const { data, labels } = ds;

const repaymentNumber = 0;
const openingBalance = 1;
const loanRepayment = 2;
const interestCharged = 3;
const capitalRepaid = 4;
const closingBalance = 5;
/*
const domain = {
  x: [1, data.length],
  y: [0, data[0][openingBalance]],
};
*/

const domain = {
  x: [1, data.length],
  y: [0, data[0][loanRepayment]],
};

// const yearly = (val, max, acc = []) => {
//   if (val > max) return acc;
//   const nextVal = val === 1 ? 12 : val + 12;
//   return [val, ...yearly(val + 12, max, acc)];
// };
// const xTickValues = yearly(0, domain.x[1]);

const annualData = data.filter((d, i) => i === 0 || d[repaymentNumber] % 12 === 0);
const xTickValues = annualData.map(d => d[repaymentNumber]);

const xTickFormat = x => {
  if (x % 12 === 0) {
    return `${x / 12}yr`;
  }
  return `${x}m`;
};

const yTickFormat = y => {
  if (y < 1000) {
    return y;
  } else if (y < 1000000) {
    return `${y / 1000}k`;
  }
  return `${y / 1000000}m`;
};

const cumData = [];
let cumInterestCharged = 0;
let cumCapitalRepaid = 0;

for (const d of data) {
  cumInterestCharged += d[interestCharged];
  cumCapitalRepaid += d[capitalRepaid];

  const [...n] = d;
  n[interestCharged] = cumInterestCharged;
  n[capitalRepaid] = cumCapitalRepaid;
  cumData.push(n);
}
const cumulativeData = cumData.filter((d, i) => i === 0 || d[repaymentNumber] % 12 === 0);

const cumulativeDomain = {
  x: [1, data.length],
  y: [
    0,
    cumulativeData[cumulativeData.length - 1][interestCharged] +
      cumulativeData[cumulativeData.length - 1][capitalRepaid],
  ],
};

const repaymentDomain = {
  x: [1, data.length],
  y: [0, data[0][openingBalance]],
};

const interpolation = 'linear'; // 'catmullRom'
const padding = { left: 50, top: 20, bottom: 50, right: 20 }; // 50
const legend = [{ name: 'Interest Charged', symbol: { type: 'circle' } }, { name: 'B', symbol: { type: 'square' } }];

const axisStyle = {
  axis: { stroke: '#756f6a' },
  axisLabel: { fontSize: 14, padding: 25 },
  grid: { stroke: '#efefef', strokeDasharray: '1,1' },
  ticks: { stroke: '#756f6a', size: 5 },
  tickLabels: { fontSize: '10px', padding: 5 },
};

const colorScale = ['red', 'blue'];
const flyoutStyle = { fill: 'white', stroke: '#756f6a' };

const Chart = () => {
  return (
    <div>
      <h1>Monthly effect</h1>

      <VictoryChart
        height={400}
        width={600}
        domainPadding={40}
        domain={domain}
        padding={padding}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        {/* y axis */}
        <VictoryAxis dependentAxis label="Rands" style={axisStyle} tickFormat={yTickFormat} />

        {/* x axis */}
        <VictoryAxis label="Repayments" tickValues={xTickValues} tickFormat={xTickFormat} style={axisStyle} />

        {/* legends */}
        <VictoryLegend
          colorScale={colorScale}
          style={{ data: { fillOpacity: 0.5, strokeOpacity: 0.3, strokeWidth: '1px' } }}
          data={[{ name: 'Monthly interest paid' }, { name: 'Monthly capital repaid' }]}
          gutter={0}
          symbolSpacer={5}
        />

        <VictoryGroup style={{ data: { fill: 'red', fillOpacity: 0.5, strokeOpacity: 0.3, strokeWidth: '1px' } }}>
          <VictoryLine data={data} x={repaymentNumber} y={interestCharged} interpolation={interpolation} />
          <VictoryScatter
            data={annualData}
            x={repaymentNumber}
            y={interestCharged}
            size={2}
            labels={d => `R ${d[interestCharged]}`}
            labelComponent={<VictoryTooltip dy={0} pointerLength={5} cornerRadius={0} flyoutStyle={flyoutStyle} />}
          />
        </VictoryGroup>

        <VictoryGroup style={{ data: { fill: 'blue', fillOpacity: 0.5, strokeOpacity: 0.3, strokeWidth: '1px' } }}>
          <VictoryLine data={data} x={repaymentNumber} y={capitalRepaid} interpolation={interpolation} />
          <VictoryScatter
            data={annualData}
            x={repaymentNumber}
            y={capitalRepaid}
            size={2}
            labels={d => `R ${d[closingBalance]}`}
            labelComponent={<VictoryTooltip dy={0} pointerLength={5} cornerRadius={0} flyoutStyle={flyoutStyle} />}
          />
        </VictoryGroup>
      </VictoryChart>

      <VictoryChart
        height={400}
        width={600}
        domainPadding={40}
        domain={domain}
        padding={padding}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        {/* y axis */}
        <VictoryAxis dependentAxis label="Rands" style={axisStyle} tickFormat={yTickFormat} />

        {/* x axis */}
        <VictoryAxis label="Repayments" tickValues={xTickValues} tickFormat={xTickFormat} style={axisStyle} />

        {/* legends */}
        <VictoryLegend
          colorScale={colorScale}
          style={{ data: { fillOpacity: 0.5, strokeOpacity: 0.3, strokeWidth: '1px' } }}
          data={[{ name: 'Monthly interest paid' }, { name: 'Monthly capital repaid' }]}
          gutter={0}
          symbolSpacer={5}
        />

        <VictoryStack
          colorScale={colorScale}
          style={{ data: { fillOpacity: 0.5, strokeOpacity: 0.3, strokeWidth: '1px' } }}
        >
          <VictoryArea data={annualData} x={repaymentNumber} y={interestCharged} />
          <VictoryArea data={annualData} x={repaymentNumber} y={capitalRepaid} />
        </VictoryStack>
      </VictoryChart>

      <h1>Cumulative effect</h1>

      <VictoryChart
        height={400}
        width={600}
        domainPadding={40}
        domain={cumulativeDomain}
        padding={padding}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        {/* y axis */}
        <VictoryAxis dependentAxis label="Rands" style={axisStyle} tickFormat={yTickFormat} />

        {/* x axis */}
        <VictoryAxis label="Repayments" tickValues={xTickValues} tickFormat={xTickFormat} style={axisStyle} />

        {/* legends */}
        <VictoryLegend
          colorScale={colorScale}
          style={{ data: { fillOpacity: 0.5, strokeOpacity: 0.3, strokeWidth: '1px' } }}
          data={[{ name: 'Cumulative interest paid' }, { name: 'Cumulative captial repaid' }]}
          gutter={0}
          symbolSpacer={5}
        />

        <VictoryStack
          colorScale={colorScale}
          style={{ data: { fillOpacity: 0.5, strokeOpacity: 0.3, strokeWidth: '1px' } }}
        >
          <VictoryArea data={cumulativeData} x={repaymentNumber} y={interestCharged} />
          <VictoryArea data={cumulativeData} x={repaymentNumber} y={capitalRepaid} />
        </VictoryStack>
      </VictoryChart>

      <VictoryChart
        height={400}
        width={600}
        domainPadding={40}
        domain={repaymentDomain}
        padding={padding}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        {/* y axis */}
        <VictoryAxis dependentAxis label="Rands" style={axisStyle} tickFormat={yTickFormat} />

        {/* x axis */}
        <VictoryAxis label="Repayments" tickValues={xTickValues} tickFormat={xTickFormat} style={axisStyle} />

        {/* legends */}
        <VictoryLegend
          colorScale={['blue']}
          style={{ data: { fillOpacity: 0.5, strokeOpacity: 0.3, strokeWidth: '1px' } }}
          data={[{ name: 'Captial repayment' }]}
          gutter={0}
          symbolSpacer={5}
        />

        <VictoryGroup style={{ data: { fill: 'blue', fillOpacity: 0.5, strokeOpacity: 0.3, strokeWidth: '1px' } }}>
          <VictoryLine data={data} x={repaymentNumber} y={closingBalance} interpolation={interpolation} />
          <VictoryScatter
            data={annualData}
            x={repaymentNumber}
            y={closingBalance}
            size={2}
            labels={d => `R ${d[closingBalance]}`}
            labelComponent={<VictoryTooltip dy={0} pointerLength={5} cornerRadius={0} flyoutStyle={flyoutStyle} />}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export default Chart;

const app = document.getElementById('app');
ReactDOM.render(<Chart />, app);
