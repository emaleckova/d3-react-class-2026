import * as d3 from "d3";

import { AreaPlot } from "./AreaPlot";
import energyData from "./energyData";

const worldPrimaryEnergy = energyData.filter(
  (global) => global.country === "World",
);

console.log(worldPrimaryEnergy);

export default function EnergyDashboard() {
  return (
    <svg width={600} height={600}>
      <AreaPlot data={worldPrimaryEnergy} width={600} height={600} />
    </svg>
  );
}
