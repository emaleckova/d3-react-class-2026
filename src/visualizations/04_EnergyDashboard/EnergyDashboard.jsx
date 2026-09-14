import * as d3 from "d3";

import { ConnectedScatterplot } from "./ConnectedScatterplot";
import energyData from "./energyData";

export default function EnergyDashboard() {
  return (
    <svg width={600} height={400}>
      <ConnectedScatterplot data={energyData} width={600} height={400} />
    </svg>
  );
}
