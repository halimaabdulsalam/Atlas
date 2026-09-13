const API_URL = "https://api.restcountries.com/countries/v5?limit=100";

export async function getCountries() {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const result = await response.json();



  return result.data.objects;
}