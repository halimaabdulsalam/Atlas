import { useEffect, useState } from "react";
import "../App.css";
import CountryCard from "../components/CountryCard";
import { getCountries } from "../services/api";
import type { Country } from "../types/country";

function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch {
        setError("Failed to load countries.");
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  const handleSearch = () => {
    setSubmittedSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) {
    return <p>Loading countries...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredCountries = countries.filter((country) =>
    country.names.common.toLowerCase().includes(submittedSearch.toLowerCase()),
  );

  return (
    <main>
      <h1>Atlas</h1>
      <p>Discover the world, one country at a time.</p>

      <div className="search-container">
        <label htmlFor="country-search">Search for a country</label>

        <input
          id="country-search"
          type="text"
          placeholder="Search country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search for a country"
        />

        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <p>
        {filteredCountries.length}{" "}
        {filteredCountries.length === 1 ? "country" : "countries"} found.
      </p>

      <section className="countries-grid">
        {filteredCountries.length === 0 ? (
          <p>No countries found.</p>
        ) : (
          filteredCountries.map((country) => (
            <CountryCard key={country.names.common} country={country} />
          ))
        )}
      </section>
    </main>
  );
}

export default Home;
