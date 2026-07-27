import * as d3 from "d3";

/*Image area*/

const width = 650;
const height = 360;

export default function EconomistPlot({ data }) {
  /*Scales*/
  const xScale = d3.scaleLinear().domain([0, 55]).range([0, width]);
  const pathogens = data.map((d) => d.name).reverse();
  console.log("Pathogens: " + pathogens);
  const yScale = d3
    .scaleBand()
    .domain(pathogens)
    .range([0, height])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  /*Sequence for horizontal lines*/
  const range = (start, end, step = 5) =>
    Array.from(
      { length: Math.floor((end - start) / step) + 1 },
      (_, i) => start + i * step,
    );

  const xBreaks = range(0, 55, 5);

  console.log(xBreaks);
  return (
    <div>
      <svg width={width} height={10} overflow="visible">
        <line
          x1={0}
          y1={0}
          x2={width - 50}
          y2={0}
          stroke="rgb(229, 1, 28)"
          strokeWidth={1}
        />
      </svg>
      {/* title & subtitle */}
      <h1>Escape artists</h1>
      <p>Number of laboratory-acquired infections, 1970-2021</p>
      <svg width={width} height={height} overflow="visible">
        {/*background*/}
        <rect width={width} height={height} fill="#f8f8f8" rx={4} />
        {/*axis lines*/}
        {xBreaks.map((d, i) => (
          <g key={i}>
            <line
              x1={xScale(d)}
              y1={0}
              x2={xScale(d)}
              y2={height}
              stroke="#808080"
              opacity={0.2}
              shapeRendering="crispEdges"
            />
            {/*axis labels*/}
            <text
              x={xScale(d)}
              y={-10}
              textAnchor="middle"
              alignmentBaseline="central"
              fill="#808080"
              fontSize={12}
            >
              {d}
            </text>
            {/*y-axis line*/}
            <line
              x1={xScale(0)}
              y1={0}
              x2={xScale(0)}
              y2={height}
              stroke="black"
              opacity={0.8}
              shapeRendering="crispEdges"
            />
          </g>
        ))}
        {/*Data*/}
        {data.map((d, i) => (
          <rect
            key={i}
            x={0}
            y={yScale(d.name)}
            height={yScale.bandwidth()}
            width={xScale(d.count)}
            fill="#076fa2"
          />
        ))}
        {/*Pathogen labels*/}
        {data.map((d, i) => (
          <text
            key={i}
            x={d.count > 10 ? 0 : xScale(d.count)}
            y={yScale(d.name) + yScale.bandwidth() / 2}
            dx={7}
            alignmentBaseline="central"
            textAnchor="start"
            fontFamily="Roboto"
            fontSize={14}
            fill={d.count > 10 ? "white" : "#076fa2"}
            fillOpacity={0.9}
          >
            {d.name}
          </text>
        ))}
        <text
          x={0}
          y={height + 10}
          fontFamily="Roboto"
          fontSize={12}
          textAnchor="start"
          fill="gray"
        >
          Sources: Laboratory-Acquired Infection Database; American Biological
          Safety Association
        </text>
        <text
          x={0}
          y={height + 25}
          fontFamily="Roboto"
          fontSize={12}
          textAnchor="start"
          fill="#808080"
        >
          The Economist
        </text>
      </svg>
    </div>
  );
}
