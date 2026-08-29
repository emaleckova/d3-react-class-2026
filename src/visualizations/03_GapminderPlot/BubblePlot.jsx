export const BubblePlot = ({
  data,
  xScale,
  yScale,
  popSizeScale,
  colorScale,
}) => {
  return (
    <>
      {data.map((d, i) => (
        <circle
          key={i}
          cx={xScale(d.gdpPercap)}
          cy={yScale(d.lifeExp)}
          r={popSizeScale(d.pop)}
          stroke={colorScale(d.continent)}
          strokeWidth={0.5}
          fill={colorScale(d.continent)}
          fillOpacity={0.5}
        />
      ))}
    </>
  );
};
