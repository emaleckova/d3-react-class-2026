import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/barplot">Barplot</Link>
      <Link to="/economist">Economist</Link>
    </nav>
  );
}
