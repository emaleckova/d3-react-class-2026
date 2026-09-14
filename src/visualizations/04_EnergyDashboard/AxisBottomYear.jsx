import * as d3 from "d3";

// tick length
const TICK_LENGTH = 6;

export const AxisBottomYear = ({ xScale, pixelsPerTick }) => {
  const range = xScale.range();

  const width = range[1] - range[0];
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

  const formatYear = d3.timeFormat("%Y");

  return (
    <>
      {/* Main horizontal line */}
      <line
        x1={range[0]}
        y1={0}
        x2={range[1]}
        y2={0}
        stroke="black"
        fill="none"
      />

      {/* Ticks and labels */}
      {xScale.ticks(numberOfTicksTarget).map((value) => (
        <g key={value.getTime()} transform={`translate(${xScale(value)}, 0)`}>
          <line y2={TICK_LENGTH} stroke="black" />
          <text fontSize={10} textAnchor="middle" transform="translate(0, 20)">
            {formatYear(value)}
          </text>
        </g>
      ))}
    </>
  );
};
