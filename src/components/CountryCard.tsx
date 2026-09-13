import { Link } from "react-router-dom";
import type { Country } from "../types/country";
import "./CountryCard.css";

interface CountryCardProps {
  country: Country;
}

function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      to={`/country/${encodeURIComponent(country.names.common)}`}
      className="country-card-link"
    >
      <article className="country-card">
       <img
  src={country.flag.url_png}
  loading="lazy"
          alt={country.flag.alt || `Flag of ${country.names.common}`}
        />

        <div className="country-card-content">
          <h2>{country.names.common}</h2>

          <p>Region: {country.region}</p>
          <p>Capital: {country.capital?.[0] || "No capital listed"}</p>
          <p>Population: {country.population.toLocaleString()}</p>
        </div>
      </article>
    </Link>
  );
}

export default CountryCard;
