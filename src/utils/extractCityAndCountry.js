export function extractCityAndCountry(address) {
  if (!address) return { city: "", country: "" };

  const parts = address.split(",").map((p) => p.trim());
  return {
    city: parts[parts.length - 2] || "",
    country: parts[parts.length - 1] || "",
  };
}
