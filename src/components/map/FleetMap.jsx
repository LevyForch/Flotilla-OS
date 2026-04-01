import { useContext } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FleetContext } from '../../App.jsx'
import { ACTIONS } from '../../lib/fleetReducer.js'
import { BoatMarker } from './BoatMarker.jsx'
import { MapLegend } from './MapLegend.jsx'
import { Maximize2 } from 'lucide-react'

function FitBoundsButton({ boats }) {
  const map = useMap()
  function fitAll() {
    if (!boats.length) return
    const positions = boats.filter(b => b.position).map(b => [b.position.lat, b.position.lng])
    if (positions.length) map.fitBounds(positions, { padding: [40, 40] })
  }
  return (
    <button
      onClick={fitAll}
      className="absolute top-3 right-3 z-[1000] glass rounded-xl shadow-glass p-2.5 text-navy-800 hover:bg-white/90 transition-all active:scale-95"
      aria-label="Fit all boats in view"
      title="Where is everyone?"
    >
      <Maximize2 className="w-4 h-4" />
    </button>
  )
}

function MeetupMarker({ meetup }) {
  if (!meetup?.lat || !meetup?.lng) return null
  return (
    <CircleMarker
      center={[meetup.lat, meetup.lng]}
      radius={10}
      pathOptions={{ color: '#0ea5e9', fillColor: '#0ea5e9', fillOpacity: 0.4 }}
    >
      <Popup>⚓ Meetup: {meetup.name || 'Meetup Point'}</Popup>
    </CircleMarker>
  )
}

function FallbackCoveMarker({ cove }) {
  if (!cove?.lat || !cove?.lng) return null
  return (
    <CircleMarker
      center={[cove.lat, cove.lng]}
      radius={8}
      pathOptions={{ color: '#10b981', fillColor: '#34d399', fillOpacity: 0.5 }}
    >
      <Popup>🏝 {cove.name}{cove.notes ? `: ${cove.notes}` : ''}</Popup>
    </CircleMarker>
  )
}

export function FleetMap({ compact = false }) {
  const { state, dispatch } = useContext(FleetContext)
  const { boats, sharedPlan, ui } = state

  const center = boats[0]?.position
    ? [boats[0].position.lat, boats[0].position.lng]
    : [36.8, -121.9]

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={center}
        zoom={compact ? 11 : 12}
        className="h-full w-full"
        zoomControl={!compact}
        attributionControl={!compact}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {boats.map(boat => (
          <BoatMarker
            key={boat.id}
            boat={boat}
            isSelected={ui.selectedBoatId === boat.id}
            onSelect={(id) => dispatch({ type: ACTIONS.BOAT_SELECTED, payload: { boatId: id } })}
          />
        ))}

        <MeetupMarker meetup={sharedPlan.meetupPoint} />
        {sharedPlan.fallbackCoves.map(cove => (
          <FallbackCoveMarker key={cove.id} cove={cove} />
        ))}

        <FitBoundsButton boats={boats} />
        {!compact && <MapLegend />}
      </MapContainer>
    </div>
  )
}
