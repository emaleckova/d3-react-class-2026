import * as d3 from "d3";

import { ConnectedScatterplot } from "./ConnectedScatterplot";
import energyData from "./energyData";

const worldPrimaryEnergy = energyData.filter(
  (global) => global.country === "World",
);

console.log(worldPrimaryEnergy);

export default function EnergyDashboard() {
  return (
    <svg width={600} height={600}>
      <ConnectedScatterplot
        data={worldPrimaryEnergy}
        width={600}
        height={600}
      />
    </svg>
  );
}
