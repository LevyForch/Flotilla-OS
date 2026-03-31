import { divIcon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { BOAT_STATUSES } from '../../lib/constants.js'
import { formatSpeed, formatHeading, formatAgo } from '../../lib/formatters.js'

const statusIcons = {
  ok: '🟢',
  arrived: '⚓',
  need_help: '🆘',
  fuel_issue: '⚠️',
}

const SELECTED_RING_STYLE = 'box-shadow: 0 0 0 3px white, 0 0 0 5px {color};'
const BASE_SHADOW = 'box-shadow: 0 2px 6px rgba(0,0,0,0.35);'

function makeIcon(color, status, isSelected) {
  const ringStyle = isSelected ? SELECTED_RING_STYLE.replace('{color}', color) : BASE_SHADOW
  const html = `
    <div style="
      width: 32px; height: 32px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
      ${ringStyle}
    ">${statusIcons[status] || '🟢'}</div>
  `
  return divIcon({ html, className: '', iconSize: [32, 32], iconAnchor: [16, 16] })
}

export function BoatMarker({ boat, isSelected, onSelect }) {
  if (!boat.position) return null
  const { lat, lng } = boat.position
  const icon = makeIcon(boat.color, boat.status, isSelected)
  const statusInfo = BOAT_STATUSES[boat.status]

  return (
    <Marker
      position={[lat, lng]}
      icon={icon}
      eventHandlers={{ click: () => onSelect(boat.id) }}
    >
      <Popup>
        <div className="min-w-[160px]">
          <div className="font-bold text-navy-900">{boat.name}</div>
          <div className="text-sm text-gray-500 mb-1">{boat.captain}</div>
          <div className="text-sm mb-1">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: `${boat.color}22`, color: boat.color }}
            >
              {statusInfo?.emoji} {statusInfo?.label}
            </span>
          </div>
          <div className="text-xs text-gray-500 space-y-0.5">
            <div>Speed: {formatSpeed(boat.position.speedKts)}</div>
            <div>Heading: {formatHeading(boat.position.heading)}</div>
            <div>Updated: {formatAgo(boat.position.updatedAt)}</div>
          </div>
          {boat.note && <p className="text-xs mt-1 italic text-gray-600">"{boat.note}"</p>}
        </div>
      </Popup>
    </Marker>
  )
}
