import * as d3 from "d3";
import { useRef } from "react";

import { useDimensions } from "./useDimensions";
import { AxisLeft } from "./AxisLeft";
import { AxisBottomYear } from "./AxisBottomYear";

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 80,
};

// Static area plot
export const AreaPlot = ({ data, width, height }) => {
  console.log("AreaPlot size:", width, height);
  // Prevent running the code while container measurement still ongoing
  if (!width || !height) {
    return null;
  }
  // Conversion: numerical year to date
  data = data.map((d) => ({
    ...d,
    year: new Date(d.year, 0, 1), // Jan 1st of each year
  }));
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // x axis - for time
  const [xMin, xMax] = d3.extent(data, (d) => d.year);
  const xScale = d3.scaleTime().domain([xMin, xMax]).range([0, boundsWidth]);
  // y axis
  const [yMin, yMax] = d3.extent(data, (d) => d.primary_energy);
  const yScale = d3
    .scaleLinear()
    .domain([0, yMax || 0])
    .range([boundsHeight, 0]);

  // Build the area
  const areaBuilder = d3
    .area()
    .x((d) => xScale(d.year))
    .y1((d) => yScale(d.primary_energy))
    .y0((d) => yScale(0));
  const areaPath = areaBuilder(data);

  // Build the line
  const lineBuilder = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.primary_energy));
  const linePath = lineBuilder(data);

  if (!areaPath || !linePath) {
    return null;
  }

  // SVG plot
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="white" rx={5} />
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        <path
          d={areaPath}
          // scale_colour_paletteer_d("yarrr::basel")
          fill="#16A08C"
          stroke="none"
          fillOpacity={0.5}
        />
        <path
          d={linePath}
          opacity={1}
          stroke="#16A08C"
          fill="none"
          strokeWidth={2}
        />
        {/* y-axis */}
        <AxisLeft
          yScale={yScale}
          pixelsPerTick={50}
          label="energy consumption [TWh]"
        />
        {/* x-axis: years */}
        <g transform={`translate(0, ${boundsHeight})`}>
          <AxisBottomYear xScale={xScale} pixelsPerTick={50} />
        </g>
      </g>
    </svg>
  );
};

// Responsive version
export const ResponsiveAreaPlot = (props) => {
  const chartRef = useRef(null);
  const chartSize = useDimensions(chartRef);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
      <AreaPlot height={chartSize.height} width={chartSize.width} {...props} />
    </div>
  );
};
