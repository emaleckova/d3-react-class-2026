import * as d3 from "d3";
import { useRef } from "react";

import { useDimensions } from "./useDimensions";
import { AxisLeft } from "./AxisLeft";
import { AxisBottomYear } from "./AxisBottomYear";

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

  const maxEnergy = d3.min(data, (d) => d.primary_energy);

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
    .padding(0.05);

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="white" rx={5} />
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        {data.map((d, i) => (
          <g key={i}>
            <rect
              x={xScale(0)}
              y={yScale(d.country)}
              height={yScale.bandwidth()}
              width={xScale(d.primary_energy)}
              fill="#076fa2"
            />
            <text
              x={xScale(-60)}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              fill="black"
              fontSize={12}
              textAnchor="end"
            >
              {d.country}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

// Responsive version
