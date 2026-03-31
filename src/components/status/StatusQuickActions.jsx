import { useState, useContext } from 'react'
import { FleetContext } from '../../App.jsx'
import { ACTIONS } from '../../lib/fleetReducer.js'
import { Button } from '../common/Button.jsx'
import { CheckCircle, Anchor, AlertTriangle, Fuel, X } from 'lucide-react'

const actions = [
  { status: 'ok', label: 'OK', Icon: CheckCircle, variant: 'success' },
  { status: 'arrived', label: 'Arrived', Icon: Anchor, variant: 'primary' },
  { status: 'fuel_issue', label: 'Fuel/Engine', Icon: Fuel, variant: 'warning' },
  { status: 'need_help', label: 'Need Help', Icon: AlertTriangle, variant: 'danger', confirm: true },
]

export function StatusQuickActions({ boatId, currentStatus }) {
  const { dispatch } = useContext(FleetContext)
  const [pendingConfirm, setPendingConfirm] = useState(false)

  function handleAction(status, requiresConfirm) {
    if (requiresConfirm && !pendingConfirm) {
      setPendingConfirm(true)
      return
    }
    dispatch({ type: ACTIONS.BOAT_STATUS_SET, payload: { boatId, status } })
    setPendingConfirm(false)
  }

  if (pendingConfirm) {
    return (
      <div className="flex items-center gap-2 p-2 bg-red-50 rounded-xl border border-red-200">
        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" aria-hidden="true" />
        <span className="text-xs text-red-700 font-medium flex-1">Confirm distress signal?</span>
        <Button
          size="sm"
          variant="danger"
          onClick={(e) => { e.stopPropagation(); handleAction('need_help', false) }}
          aria-label="Confirm need help"
        >
          Confirm
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => { e.stopPropagation(); setPendingConfirm(false) }}
          aria-label="Cancel"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-1.5" onClick={e => e.stopPropagation()}>
      {actions.map(({ status, label, Icon, variant, confirm }) => (
        <Button
          key={status}
          size="sm"
          variant={currentStatus === status ? variant : 'outline'}
          onClick={() => handleAction(status, confirm)}
          aria-label={`Set status to ${label}`}
          className="text-xs"
        >
          <Icon className="w-3 h-3" aria-hidden="true" />
          {label}
        </Button>
      ))}
    </div>
  )
}
