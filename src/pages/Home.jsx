{
  /* export default function Home() {
  return (
    <div>
      <h3>About</h3>
      <p>
        This is a gallery of small projects created for the course "D3 ❤️ React"
        course.
      </p>
    </div>
  );
}*/
}

import * as d3 from "d3";

const data = [
  { count: 6, name: "Hantavirus" },
  { count: 7, name: "Tularemia" },
  { count: 7, name: "Dengue" },
  { count: 9, name: "Ebola" },
  { count: 11, name: "E. coli" },
  { count: 15, name: "Tuberculosis" },
  { count: 17, name: "Salmonella" },
  { count: 18, name: "Vaccinia" },
  { count: 54, name: "Brucella" },
];

console.log(data);

/*Image area*/

const width = 650;
const height = 360;

const margins = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const innerWidth = width - margins.left - margins.right;
const innerHeight = height - margins.top - margins.bottom;

/*Scales*/
const xScale = d3.scaleLinear().domain([0, 55]).range([0, innerWidth]);
const pathogens = data.map((d) => d.name).reverse();
console.log("Pathogens: " + pathogens);
const yScale = d3
  .scaleBand()
  .domain(pathogens)
  .range([0, innerHeight])
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

export default function Home() {
  return (
    <div>
      <h4>Prototype Area</h4>

      <svg width={width} height={height} overflow="visible">
        {/*plotting area*/}
        <g transform={`translate(${margins.top},${margins.right})`}>
          {/*background*/}
          <rect width={width} height={height} fill="#f8f8f8" rx={4} />
          <text x={width / 2} y={25} textAnchor="middle" fill="red">
            My Title
          </text>
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
                y={-25}
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
        </g>
        {/*End of transform group*/}
      </svg>
    </div>
  );
}
