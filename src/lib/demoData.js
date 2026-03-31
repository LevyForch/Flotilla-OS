import { BOAT_COLORS } from './constants.js'
import { genId } from './id.js'

const NAMES = [
  'Sea Otter', 'Blue Heron', 'Pacific Star', 'Coral Reef',
  'Tide Runner', 'Dusk Sailor', 'Harbor Light', 'Wave Dancer',
]
const CAPTAINS = [
  'Capt. Rivera', 'Capt. Chen', 'Capt. Okafor', 'Capt. Mills',
  'Capt. Torres', 'Capt. Walsh', 'Capt. Park', 'Capt. Reyes',
]
const STATUSES = ['ok', 'ok', 'ok', 'arrived', 'ok', 'need_help', 'fuel_issue', 'ok']

// Monterey Bay area
const BASE_LAT = 36.8
const BASE_LNG = -121.9

function seed(i) {
  const angle = (i / 8) * 2 * Math.PI
  const r = 0.05 + (i % 3) * 0.04
  return {
    lat: parseFloat((BASE_LAT + Math.sin(angle) * r).toFixed(5)),
    lng: parseFloat((BASE_LNG + Math.cos(angle) * r).toFixed(5)),
  }
}

export function buildDemoBoats() {
  return NAMES.map((name, i) => {
    const pos = seed(i)
    return {
      id: `boat_${i + 1}`,
      name,
      captain: CAPTAINS[i],
      color: BOAT_COLORS[i],
      position: {
        lat: pos.lat,
        lng: pos.lng,
        heading: Math.round(Math.random() * 360),
        speedKts: parseFloat((Math.random() * 8 + 1).toFixed(1)),
        updatedAt: new Date().toISOString(),
      },
      status: STATUSES[i],
      note: '',
    }
  })
}

export function buildDemoMessages(boats) {
  const now = Date.now()
  return [
    { id: genId('msg'), boatId: boats[0].id, sender: boats[0].name, text: 'Morning! All good here 🌊', createdAt: new Date(now - 14 * 60000).toISOString() },
    { id: genId('msg'), boatId: boats[2].id, sender: boats[2].name, text: 'Visibility is great, following the plan', createdAt: new Date(now - 10 * 60000).toISOString() },
    { id: genId('msg'), boatId: boats[5].id, sender: 'System', text: `${boats[5].name} reported an ENGINE ISSUE 🆘`, createdAt: new Date(now - 6 * 60000).toISOString(), isSystem: true },
    { id: genId('msg'), boatId: 'coordinator', sender: 'Coordinator', text: 'Tide Runner, heading your way. ETA 12 min.', createdAt: new Date(now - 4 * 60000).toISOString() },
    { id: genId('msg'), boatId: boats[3].id, sender: boats[3].name, text: 'Arrived at meetup ⚓', createdAt: new Date(now - 2 * 60000).toISOString() },
  ]
}

export function buildDemoPlan() {
  return {
    meetupPoint: {
      name: 'Moss Landing Marina',
      lat: 36.8046,
      lng: -121.787,
      etaWindow: '14:00 – 15:00',
    },
    fallbackCoves: [
      { id: genId('cove'), name: 'Capitola Cove', lat: 36.973, lng: -121.951, notes: 'Good anchorage, watch for rocks on south side' },
      { id: genId('cove'), name: 'Stillwater Cove', lat: 36.557, lng: -121.924, notes: 'Protected from NW winds' },
    ],
  }
}
