// tick length
const TICK_LENGTH = 6;

export const AxisBottom = ({ xScale, pixelsPerTick, label }) => {
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
        stroke="currentColor"
        fill="none"
      />

      {/* Ticks and labels */}
      {xScale.ticks(numberOfTicksTarget).map((value) => (
        <g key={value} transform={`translate(${xScale(value)}, 0)`}>
          <line y2={TICK_LENGTH} stroke="currentColor" />
          <text
            key={value}
            fontSize={10}
            textAnchor="middle"
            transform="translate(0, 20)"
          >
            {value / 1000} K
          </text>
        </g>
      ))}
      {/* Axis title */}
      {label && (
        <text
          x={width / 2}
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
          transform="translate(0, 40)"
        >
          {label}
        </text>
      )}
    </>
  );
};
