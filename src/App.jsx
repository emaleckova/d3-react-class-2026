import Barplot from "./visualizations/01_FirstBarchart/Barplot.jsx";

import { barplotData } from "./visualizations/01_FirstBarchart/barplotData.js";

export default function App() {
  return (
    <div>
      <h1>D3 ❤️ React: Course Gallery by Eva Maleckova</h1>

      <section>
        <h2>My First Barplot</h2>
        <Barplot data={barplotData} />
      </section>
    </div>
  );
}
