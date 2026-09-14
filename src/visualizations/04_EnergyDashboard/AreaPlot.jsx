import * as d3 from "d3";

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 50,
};

const width = 600;
const height = 600;

export function AreaPlot({ data, width, height }) {
  // Conversion: numerical year to date
  data = data.map((d) => ({
    ...d,
    year: new Date(d.year, 1, 1), // Jan 1st of each year
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
      </g>
    </svg>
  );
}
