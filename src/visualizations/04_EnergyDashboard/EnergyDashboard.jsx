import * as d3 from "d3";

import { ResponsiveAreaPlot } from "./AreaPlot";
import energyData from "./energyData";

const worldPrimaryEnergy = energyData.filter(
  (global) => global.country === "World",
);

console.log(worldPrimaryEnergy);

export default function EnergyDashboard() {
  return (
    <div>
      <ResponsiveAreaPlot data={worldPrimaryEnergy} />
    </div>
  );
}
