// tick length
const TICK_LENGTH = 6;

export const AxisLeft = ({ yScale, pixelsPerTick, label }) => {
  const range = yScale.range();

  const height = range[0] - range[1];
  const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

  return (
    <>
      {/* Main horizontal line */}
      <line
        x1={0}
        y1={range[0]}
        x2={0}
        y2={range[1]}
        stroke="currentColor"
        fill="none"
      />

      {/* Ticks and labels */}
      {yScale.ticks(numberOfTicksTarget).map((value) => (
        <g key={value} transform={`translate(0, ${yScale(value)})`}>
          <line x1={0} x2={-TICK_LENGTH} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              alignmentBaseline: "middle",
              transform: "translateX(-20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
      {/* Axis title */}
      {label && (
        <text
          x={-height / 2}
          y={-40}
          fontSize={12}
          textAnchor="middle"
          transform="rotate(-90)"
        >
          {label}
        </text>
      )}
    </>
  );
};
