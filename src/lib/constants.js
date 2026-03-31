// App-wide constants

export const APP_NAME = 'Flotilla OS'

export const BOAT_STATUSES = {
  ok: { label: 'OK', color: 'emerald', emoji: '✅' },
  arrived: { label: 'Arrived', color: 'ocean', emoji: '⚓' },
  need_help: { label: 'Need Help', color: 'coral', emoji: '🆘' },
  fuel_issue: { label: 'Fuel / Engine', color: 'amber', emoji: '⚠️' },
}

export const STATUS_SEVERITY = {
  need_help: 0,
  fuel_issue: 1,
  ok: 2,
  arrived: 3,
}

// Demo tick interval in ms
export const DEMO_TICK_MS = 3000

// localStorage keys
export const LS_KEY = 'flotilla_os_v1'

// Small coastal region bounding box (California coast near Monterey Bay)
export const REGION = {
  minLat: 36.6,
  maxLat: 36.95,
  minLng: -122.1,
  maxLng: -121.75,
}

export const BOAT_COLORS = [
  '#0ea5e9', // sky
  '#f43f5e', // coral
  '#f59e0b', // amber
  '#10b981', // emerald
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
]
