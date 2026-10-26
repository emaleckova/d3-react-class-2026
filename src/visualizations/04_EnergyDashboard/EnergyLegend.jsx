export const EnergyLegend = ({
  data,
  fillScale,
  highlightedType,
  setHighlightedType,
}) => {
  const energyTypes = [...new Set(data.map(d => d.energyType))];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "6px 12px",
        fontSize: 12,
      }}
    >
      {energyTypes.map(type => (
        <div
          key={type}
          onMouseEnter={() => setHighlightedType(type)}
          onMouseLeave={() => setHighlightedType(null)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            lineHeight: "12px"
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: fillScale(type),
              opacity:
                highlightedType && highlightedType !== type
                  ? 0.25
                  : 1,
              flexShrink: 0,
            }}
          />
          <span 
            style={{
              color: "black",
              lineHeight: 2,
              transform: "translateY(-1px)",
            }}
            >{type}</span>
        </div>
      ))}
    </div>
  );
};