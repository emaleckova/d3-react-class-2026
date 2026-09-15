import * as d3 from "d3";

const MARGIN = 30;

export const DonutChartByType = ({data, width, height, fillScale, label}) => {
    const radius = Math.min(width, height) / 2 - MARGIN;

    // angle calculation (but NO svg yet!)
    const pieGenerator = d3.pie().value((d) => d.value);
    const pie = pieGenerator(data);
    // slice drawing
    const arcGenerator = d3
        .arc()
        .innerRadius(150)
        .outerRadius(radius);
        
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
