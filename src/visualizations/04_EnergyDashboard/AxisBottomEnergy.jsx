import * as d3 from "d3";

// tick length
const TICK_LENGTH = 6;

export const AxisBottomEnergy = ({ xScale, pixelsPerTick, label, labelXpos=0}) => {
  const range = xScale.range();

  const width = range[1] - range[0];
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

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
      {xScale.ticks(numberOfTicksTarget).map((primary_energy) => (
        <g transform={`translate(${xScale(primary_energy)}, 0)`}>
          <line y2={TICK_LENGTH} stroke="black" />
          <text fontSize={10} textAnchor="middle" transform="translate(0, 20)">
            {primary_energy}
          </text>
        </g>
      ))}
      {/* Axis title */}
      {label && (
        <text
          x={labelXpos}
          y={40}
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </>
  );
};
