export const PopulationSizeLegend = ({
  popLegendData,
  xScale,
  yScale,
  popSizeScale,
  maxGdp,
  minLifeExp,
  label,
}) => {
  return (
    <>
      {popLegendData.map((d, i) => (
        <>
          {label && (
            <text
              x={xScale(maxGdp * 0.75)}
              y={yScale(minLifeExp * 1.35)}
              fontSize="10px"
              fill="black"
              fontWeight="bold"
              textAnchor="left"
              alignmentBaseline="middle"
            >
              {label}
            </text>
          )}

          <circle
            key={i}
            cx={xScale(maxGdp * 0.75) + popSizeScale(d.value)}
            cy={yScale(minLifeExp * 1.15)}
            r={popSizeScale(d.value)}
            stroke="black"
            strokeDasharray="5,2"
            strokeWidth={0.5}
            fill="none"
          />
          <line
            x1={xScale(maxGdp * 0.75) + popSizeScale(d.value)}
            x2={xScale(maxGdp * 0.75) + 85}
            y1={yScale(minLifeExp * 1.15) - popSizeScale(d.value)}
            y2={yScale(minLifeExp * 1.15) - popSizeScale(d.value)}
            stroke="black"
            strokeDasharray="5,2"
          ></line>
          <text
            x={xScale(maxGdp * 0.75) + 95}
            y={yScale(minLifeExp * 1.15) - popSizeScale(d.value)}
            textAnchor="left"
            alignmentBaseline="middle"
            fill="black"
            fontSize="9px"
          >
            {d.label}
          </text>
        </>
      ))}
    </>
  );
};
