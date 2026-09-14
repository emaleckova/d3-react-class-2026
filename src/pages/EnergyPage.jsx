import EnergyDashboard from "../visualizations/04_EnergyDashboard/EnergyDashboard";
import energyData from "../visualizations/04_EnergyDashboard/energyData";

export default function EnergyPage() {
  return (
    <svg width={600} height={600}>
      <EnergyDashboard data={energyData} />
    </svg>
  );
}
