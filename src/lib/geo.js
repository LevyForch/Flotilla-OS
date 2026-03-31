// Geo utilities

const R = 6371 // Earth radius km

function toRad(deg) {
  return (deg * Math.PI) / 180
}

/** Haversine distance in nautical miles */
export function distanceNm(a, b) {
  if (!a || !b) return null
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const sinLat = Math.sin(dLat / 2)
  const sinLng = Math.sin(dLng / 2)
  const c = sinLat * sinLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng
  const km = 2 * R * Math.asin(Math.sqrt(c))
  return km * 0.539957 // km to nautical miles
}

/** Clamp a value between min and max */
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

/** Nudge a position slightly (for demo movement) */
export function nudgePosition(pos, scale = 0.003) {
  return {
    lat: pos.lat + (Math.random() - 0.5) * scale,
    lng: pos.lng + (Math.random() - 0.5) * scale,
    heading: (pos.heading + (Math.random() - 0.5) * 20 + 360) % 360,
    speedKts: clamp(pos.speedKts + (Math.random() - 0.5) * 0.5, 0, 12),
    updatedAt: new Date().toISOString(),
  }
}

/** Validate lat/lng inputs */
export function isValidLat(v) {
  const n = parseFloat(v)
  return !isNaN(n) && n >= -90 && n <= 90
}

export function isValidLng(v) {
  const n = parseFloat(v)
  return !isNaN(n) && n >= -180 && n <= 180
}
