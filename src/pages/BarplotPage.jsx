import Barplot from "../visualizations/01_FirstBarchart/Barplot";
import barplotData from "../visualizations/01_FirstBarchart/barplotData";

export default function BarplotPage() {
  return (
    <div>
      <h3 style={{ color: "#505797" }}>First Cohort of React ❤️ Students</h3>
      <Barplot data={barplotData} />
    </div>
  );
}
