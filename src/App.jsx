import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

import Home from "./pages/Home";
import BarplotPage from "./pages/BarplotPage";

export default function App() {
  return (
    <>
      <h1>D3 ❤️ React: Course Gallery by Eva Maleckova</h1>

      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barplot" element={<BarplotPage />} />
      </Routes>
    </>
  );
}
