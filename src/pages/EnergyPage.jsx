import EnergyDashboard from "../visualizations/04_EnergyDashboard/EnergyDashboard";
import EnergyData from "../visualizations/04_EnergyDashboard/EnergyData";

export default function EnergyPage() {
  return (
    <div>
      <h3 style={{ color: "#505797" }}>First Cohort of React ❤️ Students</h3>
      <EnergyDashboard data={EnergyData} />
    </div>
  );
}
