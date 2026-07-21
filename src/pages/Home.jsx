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

const width = 700;
const height = 700;

/*Scales*/
const xScale = d3.scaleLinear().domain([0, 55]).range([0, width]);

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

      <svg width={width} height={height}>
        {/*background*/}
        <rect width={width} height={height} fill="#f8f8f8" rx={4} />
        {/*axis lines*/}
        {xBreaks.map((d) => (
          <line
            x1={xScale(d)}
            y1={0}
            x2={xScale(d)}
            y2={height}
            stroke="#504f53"
          />
        ))}
        <rect x={250} y={250} height={50} width={50} fill="red" />
      </svg>
    </div>
  );
}
