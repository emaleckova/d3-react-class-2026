import * as d3 from "d3";

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 50,
};

const width = 600;
const height = 600;

export function ConnectedScatterplot({ data, width, height }) {
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

  // Build the line
  const lineBuilder = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.primary_energy));
  const linePath = lineBuilder(data);
  if (!linePath) {
    return null;
  }
  // Build the circles
  const allCircles = data.map((item, i) => {
    return (
      <circle
        key={i}
        cx={xScale(item.year)}
        cy={yScale(item.primary_energy)}
        r={4}
        fill={"#cb1dd1"}
      />
    );
  });
  // SVG plot
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        <path d={linePath} fill="none" stroke="#cb1dd1" />
        {allCircles}
      </g>
    </svg>
  );
}
