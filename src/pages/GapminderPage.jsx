import GapminderPlot from "../visualizations/03_GapminderPlot/gapminderPlot";
import GapminderData from "../visualizations/03_GapminderPlot/gapminderData";

import "../visualizations/03_GapminderPlot/gapminderPlot.css";

export default function gapminderPage() {
  return (
    <div>
      <GapminderPlot data={GapminderData} />
    </div>
  );
}
