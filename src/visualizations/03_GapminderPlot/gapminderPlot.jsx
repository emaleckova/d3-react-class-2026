//import { AxisBottom } from "./AxisBottom";

import { scaleLinear, scaleOrdinal, scaleSqrt, min, max } from "d3";

const width = 600;
const height = 500;

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 10,
};

export default function GapminderPlot({ data }) {
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const maxGdp = max(data, (d) => d.gdpPercap);
  const maxLifeExp = max(data, (d) => d.lifeExp);
  const minPopulation = min(data, (d) => d.pop);
  const maxPopulation = max(data, (d) => d.pop);

  const continents = [...new Set(data.map((d) => d.continent))].sort();
  console.log(continents);
  const colorScale = scaleOrdinal()
    .domain(continents)
    .range(["#000000", "#EE334E", "#FCB131", "#0081C8", "#00A651"]);
  console.log("Max is " + maxGdp);

  const xScale = scaleLinear().domain([0, maxGdp]).range([0, boundsWidth]);
  const yScale = scaleLinear().domain([0, maxLifeExp]).range([boundsHeight, 0]);
  const popSizeScale = scaleSqrt()
    .domain([minPopulation, maxPopulation])
    .range([3, 30]);

  return (
    <div className="gapminder-plot">
      <svg width={width} height={height}>
        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(d.gdpPercap)}
              cy={yScale(d.lifeExp)}
              r={popSizeScale(d.pop)}
              stroke={colorScale(d.continent)}
              fill={colorScale(d.continent)}
              opacity={0.35}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
