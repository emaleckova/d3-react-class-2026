import EnergyDashboard from "../visualizations/04_EnergyDashboard/EnergyDashboard";
import energyData from "../visualizations/04_EnergyDashboard/energyData";

export default function EnergyPage() {
  return (
    <div>
      <EnergyDashboard data={energyData} />
    </div>
  );
}
