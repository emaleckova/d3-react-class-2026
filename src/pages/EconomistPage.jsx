import economistPlot from "../visualizations/02_TheEconomistPlot/economistPlot";
import economistData from "../visualizations/02_TheEconomistPlot/economistData";

export default function economistPage() {
  return (
    <div>
      <economistPlot data={economistData} />
    </div>
  );
}
