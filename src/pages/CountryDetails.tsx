import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CountryDetails.css";
import type { Country } from "../types/country";
import { getCountries } from "../services/api";

function CountryDetails() {
  const { countryName } = useParams();
  const decodedCountryName = decodeURIComponent(countryName || "");

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCountry() {
      try {
        const countries = await getCountries();
        const selectedCountry = countries.find(
          (item: Country) =>
            item.names.common.toLowerCase() ===
            decodedCountryName.toLowerCase(),
        );

        if (!selectedCountry) {
          throw new Error("Country not found");
        }

        setCountry(selectedCountry);
      } catch {
        setError("Failed to load country details.");
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [decodedCountryName]);

  if (loading) {
    return <p>Loading country details...</p>;
  }

  if (error || !country) {
    return <p>{error || "Country not found."}</p>;
  }

  return (
    <main className="country-details">
      <Link to="/" className="back-link">
        ← Back to Countries
      </Link>

      <div className="country-details-card">
        <h1>{country.names.common}</h1>

        <img
          src={country.flag.url_png}
          alt={country.flag.alt || `Flag of ${country.names.common}`}
        />
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital?.[0] || "No capital listed"}</p>
        <p>Population: {country.population.toLocaleString()}</p>
      </div>
    </main>
  );
}

export default CountryDetails;
