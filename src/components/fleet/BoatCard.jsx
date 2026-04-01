import { useContext } from 'react'
import { Navigation, Gauge, Clock } from 'lucide-react'
import { FleetContext } from '../../App.jsx'
import { ACTIONS } from '../../lib/fleetReducer.js'
import { StatusPill } from './StatusPill.jsx'
import { StatusQuickActions } from '../status/StatusQuickActions.jsx'
import { Card } from '../common/Card.jsx'
import { formatSpeed, formatHeading, formatAgo } from '../../lib/formatters.js'
import { distanceNm } from '../../lib/geo.js'
import clsx from 'clsx'

export function BoatCard({ boat }) {
  const { state, dispatch } = useContext(FleetContext)
  const isSelected = state.ui.selectedBoatId === boat.id
  const meetup = state.sharedPlan.meetupPoint
  const dist = distanceNm(boat.position, meetup)

  return (
    <Card
      className={clsx(
        'animate-slide-up border-2 transition-all duration-300',
        isSelected ? 'border-ocean-400 shadow-glow' : 'border-transparent'
      )}
      onClick={() => dispatch({ type: ACTIONS.BOAT_SELECTED, payload: { boatId: boat.id } })}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <span
            className="w-3.5 h-3.5 rounded-full flex-shrink-0 ring-2 ring-white shadow-sm"
            style={{ background: boat.color }}
            aria-hidden="true"
          />
          <div>
            <p className="font-bold text-navy-900 leading-tight tracking-tight">{boat.name}</p>
            <p className="text-xs text-gray-400">{boat.captain}</p>
          </div>
        </div>
        <StatusPill status={boat.status} />
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
        <span className="flex items-center gap-1">
          <Gauge className="w-3 h-3" aria-hidden="true" />
          {formatSpeed(boat.position?.speedKts)}
        </span>
        <span className="flex items-center gap-1">
          <Navigation className="w-3 h-3" aria-hidden="true" />
          {formatHeading(boat.position?.heading)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" aria-hidden="true" />
          {formatAgo(boat.position?.updatedAt)}
        </span>
        {dist != null && (
          <span className="text-ocean-600 font-semibold">
            {dist.toFixed(1)} nm
          </span>
        )}
      </div>

      {boat.note && <p className="text-xs italic text-gray-400 mb-2 bg-gray-50 rounded-lg px-2.5 py-1.5">"{boat.note}"</p>}

      <StatusQuickActions boatId={boat.id} currentStatus={boat.status} />
    </Card>
  )
}
