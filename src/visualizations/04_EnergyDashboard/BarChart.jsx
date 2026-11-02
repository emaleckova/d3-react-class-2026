import * as d3 from "d3";
import { useRef } from "react";

import { useDimensions } from "./useDimensions";
import { AxisLeft } from "./AxisLeft";
import { AxisBottomYear } from "./AxisBottomYear";

import "./barChartStyles.css";

const MARGIN = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 100,
};

// Static plot
export const BarChart = ({ data, width, height }) => {
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  console.log("BarChart - input data:");
  console.table(data);
  const maxEnergy = d3.max(data, (d) => d.primary_energy);
  console.log("maxEnergy = " + maxEnergy);

  const countries = [...data]
    .sort((a, b) => b.primary_energy - a.primary_energy)
    .map((d) => d.country);
  console.log("countries in BarChart: " + countries);

  const xScale = d3
    .scaleLinear()
    .domain([0, maxEnergy])
    .range([0, boundsWidth]);

  const yScale = d3
    .scaleBand()
    .domain(countries)
    .range([0, boundsHeight])
    .padding(0.25);

  // Calculating rowHeight like this removes any padding between bars and thus removes any flicking when moving around the plot
  const rowHeight = boundsHeight / 10; // 10 = n countries; ideally would be calculated here
  
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="white" rx={5} />
      <g className="container" transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        {data.map((d, i) => {
          const y = yScale(d.country);

          return (
            <g className="bar"> 
              {/* Invisible hit area — covers the full row */}
              <rect
                x={-MARGIN.left}
                y={y}
                width={boundsWidth}
                height={rowHeight}
                fill="transparent"
              />
              {/*Visible bar reflecting data*/}
              <rect
                x={xScale(0)}
                y={y}
                height={yScale.bandwidth()}
                width={xScale(d.primary_energy)}
                fill="#16A08C"
                fillOpacity={0.55}
                stroke="#16A08C"
                strokeWidth={2}
                rx={5}
                pointerEvents="none"
              />
              <text
                x={xScale(-200)}
                y={y + yScale.bandwidth() / 2}
                fill="black"
                fontSize={12}
                textAnchor="end"
              >
                {d.country}
              </text>
            </g>)
        })}
      </g>
    </svg>
  );
};

// Responsive version
export const ResponsiveBarChart = (props) => {
  const chartRef = useRef(null);
  const chartSize = useDimensions(chartRef);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
      <BarChart height={chartSize.height} width={chartSize.width} {...props} />
    </div>
  );
};
