import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";
import Toggle from "./components/Toggle";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="app-logo">
          Atlas
        </Link>

        <Toggle />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryName" element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;
