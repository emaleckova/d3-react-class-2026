import * as d3 from "d3";
import { useRef, useState } from "react";

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

  // HOOKS
  const [selectedYear, setSelectedYear] = useState(null);
  const plotGroupRef = useRef(null);

  // Prevent running the code while container measurement still ongoing
  // CRITICAL: All hokks must before to avoid hook order error
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

  //Vertical line handling - should follow the cursor
  const bisectYear = d3.bisector((d) => d.year).center;
    
  const handleMouse = (event) => {
    // If zero: !false -> true
    if (!data.length) return;

    // Mouse position relative to the translated plot group
    const [mouseX] = d3.pointer(event);
    // Convert index to year
    const mouseYear = xScale.invert(mouseX);
    // Find closest data point
    const index = bisectYear(data, mouseYear);
    const point = data[index];

    console.log("handleMouse outcome: point is " + point);
  };

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
      <rect width={width} height={height} fill="white" rx={5} onMouseMove={handleMouse} onMouseLeave={() => setSelectedYear(null)} />
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
        {/*Year idicator*/}
        <line
        className="year-indicator"
        x1={selectedYear !== null ? xScale(selectedYear) : 0}
        x2={selectedYear !== null ? xScale(selectedYear) : 0}
        y1={0}
        y2={boundsHeight}
        stroke="black"
        strokeWidth={1}
        visibility={selectedYear !== null ? "visible" : "hidden"}
        pointerEvents="none"
        />
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
