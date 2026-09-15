import * as d3 from "d3";

import { ResponsiveAreaPlot } from "./AreaPlot";
import { ResponsiveDonutChartByType } from "./DonutChartByType"
import energyData from "./energyData";

// Colours by energy type
const energyTypes = Object.keys(energyData[0]).filter(
  key => key !== "country" && key !== "year"
);

console.log(energyTypes);

// scale_colour_paletteer_d("yarrr::basel")
const TypeColorScale = d3.scaleOrdinal()
  .domain(energyTypes)
  .range(["#16A08C", "#9A703E", "#EC579A", "#FA6B09", "#EE0011", "#0C5BB0", "#FEC10B", "#149BED", "#A1C720", "#15983D"]);

// For ResponsiveAreaPlot: total global energy in time
const worldPrimaryEnergy = energyData.filter(
  (global) => global.country === "World",
);

console.log(worldPrimaryEnergy);

// DonutChartByType: 1. Global in first year, 2. Global is last year with data
const [firstYear, lastYear] = d3.extent(worldPrimaryEnergy, (d) => d.year);
console.log(`First year: ${firstYear}, last year: ${lastYear}`)

const worldEnergyFirstYear = Object.entries(
  energyData.find(
    d => d.country === "World" && d.year === firstYear
  )
)
  .filter(([key]) => !["country", "year", "primary_energy"].includes(key))
  .map(([energyType, value]) => ({
    energyType,
    value
  }));
console.log(worldEnergyFirstYear);

// Total global consumption in the given year
const worldPrimaryEnergeFirstYear = worldPrimaryEnergy.find(
  (world) => world.year === firstYear
).primary_energy;
console.log(worldPrimaryEnergeFirstYear);


export default function EnergyDashboard() {
  return (
    <div>
      <h3>Energy Dashboard</h3>
      {/*Container for all plots*/}
      <div style={{ display: "flex", gap: 5 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
      <ResponsiveAreaPlot data={worldPrimaryEnergy} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
      <ResponsiveDonutChartByType data = {worldEnergyFirstYear} fillScale={TypeColorScale} label={`${worldPrimaryEnergeFirstYear} TWh`}/>
      </div>
    </div>
    </div>
  );
}
