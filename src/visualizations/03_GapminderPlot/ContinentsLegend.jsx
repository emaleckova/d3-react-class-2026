export const ContinentsLegend = ({
  continents,
  xScale,
  yScale,
  colorScale,
  minLifeExp,
}) => {
  return (
    <g>
      <text
        x={xScale(25000)}
        y={yScale(minLifeExp * 1.35)}
        fontSize="10px"
        fill="black"
        fontWeight="bold"
        textAnchor="left"
        alignmentBaseline="middle"
      >
        Continents
      </text>
      {continents.map((continent, i) => (
        <g
          key={i}
          transform={`translate(${xScale(25000)}, ${yScale(minLifeExp * 1.25) + i * 15})`}
        >
          <circle
            r={5}
            fill={colorScale(continent)}
            fillOpacity={0.5}
            stroke={colorScale(continent)}
          />
          <text
            x={15}
            y={0}
            alignment="left"
            alignmentBaseline="middle"
            fontSize="10px"
          >
            {continent}
          </text>
        </g>
      ))}
    </g>
  );
};
