import { scaleLinear, scaleOrdinal, scaleSqrt, min, max } from "d3";

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";

const width = 650;
const height = 550;

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 50,
};

export default function GapminderPlot({ data }) {
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const maxGdp = max(data, (d) => d.gdpPercap);
  const minLifeExp = min(data, (d) => d.lifeExp);
  const maxLifeExp = max(data, (d) => d.lifeExp);
  const minPopulation = min(data, (d) => d.pop);
  const maxPopulation = max(data, (d) => d.pop);

  const continents = [...new Set(data.map((d) => d.continent))].sort();
  console.log(continents);
  const colorScale = scaleOrdinal()
    .domain(continents)
    .range(["#972D15FF", "#81A88DFF", "#A2A475FF", "#02401BFF", "#D8B70AFF"]);
  console.log("Max is " + maxGdp);

  const minRadius = 3;
  const maxRadius = 30;
  const popSizeScale = scaleSqrt()
    .domain([minPopulation, maxPopulation])
    .range([minRadius, maxRadius]);

  const xScale = scaleLinear()
    .domain([0, maxGdp])
    .range([maxRadius, boundsWidth - maxRadius]);
  const yScale = scaleLinear()
    .domain([minLifeExp, maxLifeExp])
    .range([boundsHeight - maxRadius, minLifeExp]);

  return (
    <div className="gapminder-plot">
      <svg width={width} height={height}>
        <text
          x={boundsWidth / 2}
          y={MARGIN.top}
          fill="#808080"
          fontSize="20px"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          Title
        </text>
        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          {/* Data points */}
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
          {/* Axes */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={60}
              label={"GDP per capita (USD)"}
            />
          </g>
          <AxisLeft
            yScale={yScale}
            pixelsPerTick={60}
            label={"Life expectancy"}
          />
        </g>
      </svg>
    </div>
  );
}
