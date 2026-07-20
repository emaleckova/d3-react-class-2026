import * as d3 from "d3";

const Barplot = ({ data }) => {
  const width = 700;
  const height = 420;

  const margin = {
    top: 5,
    right: 20,
    bottom: 5,
    left: 160,
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, 400])
    .padding(0.2);

  const xScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.students), 0)])
    .range([0, 500]);

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Students by country bar chart"
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((d, i) => {
          const y = yScale(d.country);
          if (y === undefined) return null;

          const barWidth = xScale(d.students);
          const barHeight = yScale.bandwidth();
          const barCenterY = y + barHeight / 2;

          return (
            <g key={d.country}>
              {/* Country label */}
              <text
                x={-10}
                y={barCenterY}
                textAnchor="end"
                dominantBaseline="middle"
                fill="#FFFFFF"
                fontSize="14px"
              >
                {d.country}
              </text>

              {/* Bar */}
              <rect
                x={0}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#505797"
                rx={5}
              />

              {/* Value label */}
              <text
                x={barWidth + 8}
                y={barCenterY}
                textAnchor="start"
                dominantBaseline="middle"
                fill="#FFFFFF"
                fontSize="14px"
              >
                {d.students}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default Barplot;
