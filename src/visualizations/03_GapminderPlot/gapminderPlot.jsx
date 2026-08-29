import { scaleLinear, scaleOrdinal, scaleSqrt, min, max, ticks } from "d3";

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { ContinentsLegend } from "./ContinentsLegend";
import { PopulationSizeLegend } from "./PopulationSizeLegend";

const width = 650;
const height = 550;

const MARGIN = {
  top: 50,
  right: 20,
  bottom: 50,
  left: 50,
};

export default function GapminderPlot({ data }) {
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const maxGdp = Math.ceil(max(data, (d) => d.gdpPercap) / 1000) * 1000;
  console.log("Max GDP is " + maxGdp);
  const minLifeExp = Math.floor(min(data, (d) => d.lifeExp) / 5) * 5;
  console.log("Min life expectancy is " + minLifeExp);
  const maxLifeExp = Math.ceil(max(data, (d) => d.lifeExp) / 5) * 5;
  const minPopulation = min(data, (d) => d.pop);
  const maxPopulation = max(data, (d) => d.pop);
  console.log("Min population is " + minPopulation);
  console.log("Max population is " + maxPopulation);

  {
    /* Transfromed populations for a legend: min, max and two intermediate values */
  }
  const minPopLegend = Math.floor(minPopulation / 1000) * 1000;
  const maxPopLegend = Math.ceil(maxPopulation / 1000) * 1000;
  console.log("Min population legend is " + minPopLegend);
  console.log("Max population legend is " + maxPopLegend);
  const popDivision = maxPopLegend / minPopLegend;
  console.log("Pop division: " + popDivision);
  const popSteps = maxPopLegend / popDivision;
  console.log("Population steps to max: " + popSteps);
  const popLegendData = [
    { label: "10 M", value: 100000000 },
    { label: "50 M", value: 500000000 },
    { label: "1 B", value: 1000000000 },
  ];

  const continents = [...new Set(data.map((d) => d.continent))].sort();
  console.log(continents);
  const colorScale = scaleOrdinal()
    .domain(continents)
    .range(["#972D15FF", "#81A88DFF", "#A2A475FF", "#02401BFF", "#D8B70AFF"]);

  const minRadius = 2;
  const maxRadius = 40;
  const popSizeScale = scaleSqrt()
    .domain([minPopLegend, maxPopLegend])
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
        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          {/*Title and subtitle*/}
          <text
            x={boundsWidth / 2}
            y={0}
            fill="#808080"
            fontSize="20px"
            textAnchor="middle"
            alignmentBaseline="top"
          >
            GDP per Capita vs Life Expectancy{" "}
          </text>
          <text
            x={boundsWidth / 2}
            y={MARGIN.top / 2}
            fill="#808080"
            fontSize="15px"
            textAnchor="middle"
            alignmentBaseline="bottom"
          >
            Increasing wealth increases chances for a longer life
          </text>
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
          {/* Population legend */}
          <PopulationSizeLegend
            popLegendData={popLegendData}
            xScale={xScale}
            yScale={yScale}
            popSizeScale={popSizeScale}
            maxGdp={maxGdp}
            minLifeExp={minLifeExp}
            label={"Population size"}
          />

          {/* Axes */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={50}
              label={"GDP per capita (USD)"}
            />
          </g>
          <AxisLeft
            yScale={yScale}
            pixelsPerTick={40}
            label={"Life expectancy"}
          />
          {/* Continent legend */}
          <ContinentsLegend
            continents={continents}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            minLifeExp={minLifeExp}
          />
        </g>
      </svg>
    </div>
  );
}
