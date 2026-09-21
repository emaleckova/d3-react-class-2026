import * as d3 from "d3";
import { useRef } from "react";

import { useDimensions } from "./useDimensions";

const MARGIN = 30;

export const DonutChartByType = ({ data, width, height, fillScale, label }) => {
  // Prevent running the code while container measurement still ongoing
  if (!width || !height) {
    return null;
  }

  const radius = Math.min(width, height) / 2 - MARGIN;

  // angle calculation (but NO svg yet!)
  const pieGenerator = d3.pie().value((d) => d.value);
  const pie = pieGenerator(data);
  // slice drawing
  const arcGenerator = d3.arc().innerRadius(150).outerRadius(radius);

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <rect width={width} height={height} fill="white" rx={5} />
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pie.map((p, i) => (
          <path
            key={p.data.energyType}
            d={arcGenerator(p) || ""}
            fill={fillScale(p.data.energyType)}
          />
        ))}

        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={20}
          fontWeight="bold"
        >
          {label}
        </text>
      </g>
    </svg>
  );
};

// Responsive version
export const ResponsiveDonutChartByType = (props) => {
  const chartRef = useRef(null);
  const chartSize = useDimensions(chartRef);

  return (
    <div ref={chartRef} style={{ widht: "100%", height: "100%" }}>
      <DonutChartByType
        height={chartSize.height}
        width={chartSize.width}
        {...props}
      />
    </div>
  );
};
