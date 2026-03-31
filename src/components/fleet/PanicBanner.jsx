import { useContext } from 'react'
import { AlertTriangle } from 'lucide-react'
import { FleetContext } from '../../App.jsx'
import { ACTIONS } from '../../lib/fleetReducer.js'
import { BOAT_STATUSES } from '../../lib/constants.js'

export function PanicBanner() {
  const { state, dispatch } = useContext(FleetContext)
  const alertBoats = state.boats.filter(b => b.status === 'need_help' || b.status === 'fuel_issue')
  if (!alertBoats.length) return null

  return (
    <div className="bg-red-600 text-white px-4 py-3 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
        <span className="font-bold text-sm">Active Alerts</span>
      </div>
      <div className="space-y-1">
        {alertBoats.map(boat => {
          const info = BOAT_STATUSES[boat.status]
          return (
            <div key={boat.id} className="flex items-center justify-between text-sm">
              <span>{info.emoji} <strong>{boat.name}</strong> — {info.label}</span>
              <button
                onClick={() => dispatch({ type: ACTIONS.BOAT_STATUS_SET, payload: { boatId: boat.id, status: 'ok' } })}
                className="text-xs bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full ml-2 transition-colors"
                aria-label={`Clear alert for ${boat.name}`}
              >
                Clear
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
