import * as d3 from "d3";
import { useRef } from "react";

import { useDimensions } from "./useDimensions";

const MARGIN = 30;

export const DonutChartByType = ({ data, width, height, fillScale, label, highlightedType, setHighlightedType }) => {
  // Prevent running the code while container measurement still ongoing
  if (!width || !height) {
    return null;
  }

  const radius = Math.min(width, height) / 2 - MARGIN;

  // angle calculation (but NO svg yet!)
  const pieGenerator = d3.pie().value((d) => d.value);
  const pie = pieGenerator(data);
  // slice drawing
  const arcGenerator = d3.arc().innerRadius(100).outerRadius(radius);
  
  // How far the selected segment moves outward
  const highlightOffset = 15;

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <rect width={width} height={height} fill="white" rx={5} />

      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pie.map((p) => {
          const type = p.data.energyType;
          const isSelected = highlightedType === type;

          // When nothing is selected, show all segments normally
          const hasSelection = highlightedType !== null;

          // Calculate the midpoint angle of the segment
          const midAngle = (p.startAngle + p.endAngle) / 2;

          // Move the selected segment outward along its midpoint
          const offsetX = isSelected
            ? highlightOffset * Math.sin(midAngle)
            : 0;

          const offsetY = isSelected
            ? -highlightOffset * Math.cos(midAngle)
            : 0;

          return (
            <path
              key={type}
              d={arcGenerator(p) || ""}
              transform={`translate(${offsetX}, ${offsetY})`}
              fill={fillScale(type)}
              opacity={
                hasSelection && !isSelected ? 0.25 : 1
              }
              stroke={isSelected ? "#222" : "white"}
              strokeWidth={isSelected ? 2 : 1}
              style={{
                transition: "opacity 150ms ease",
              }}
              onMouseEnter={() => setHighlightedType(type)}
              onMouseLeave={() => setHighlightedType(null)}
            />
          );
        })}

        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={20}
          fontWeight="bold"
          pointerEvents="none"
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
    <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
      <DonutChartByType
        height={chartSize.height}
        width={chartSize.width}
        {...props}
      />
    </div>
  );
};
