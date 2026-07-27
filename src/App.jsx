import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

import Home from "./pages/Home";
import BarplotPage from "./pages/BarplotPage";
import EconomistPage from "./pages/EconomistPage";

export default function App() {
  return (
    <>
      <h2>D3 ❤️ React: Course Gallery by Eva Maleckova</h2>

      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barplot" element={<BarplotPage />} />
        <Route path="/economist" element={<EconomistPage />} />
      </Routes>
    </>
  );
}
