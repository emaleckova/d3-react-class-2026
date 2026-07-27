import EconomistPlot from "../visualizations/02_TheEconomistPlot/economistPlot";
import economistData from "../visualizations/02_TheEconomistPlot/economistData";

import "../visualizations/02_TheEconomistPlot/economistPlot.css";

export default function economistPage() {
  return (
    <div>
      <EconomistPlot data={economistData} />
    </div>
  );
}
