// Geocoding via OpenStreetMap Nominatim (free, no API key)

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'

/**
 * Search for places by name. Returns an array of { name, lat, lng }.
 * Biased toward the viewbox region but not strictly bounded.
 */
export async function geocodeSearch(query, { signal } = {}) {
  if (!query || query.trim().length < 3) return []

  const params = new URLSearchParams({
    q: query.trim(),
    format: 'json',
    limit: '5',
    viewbox: '-122.1,36.6,-121.75,36.95',
    bounded: '0',
  })

  const res = await fetch(`${NOMINATIM_URL}?${params}`, {
    signal,
    headers: { 'Accept-Language': 'en' },
  })

  if (!res.ok) return []

  const data = await res.json()
  return data.map(item => ({
    name: item.display_name,
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lon),
  }))
}
