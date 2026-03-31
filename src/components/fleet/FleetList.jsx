import { useContext } from 'react'
import { FleetContext } from '../../App.jsx'
import { BoatCard } from './BoatCard.jsx'
import { EmptyState } from '../common/EmptyState.jsx'
import { STATUS_SEVERITY } from '../../lib/constants.js'

function sortBoats(boats) {
  return [...boats].sort((a, b) => {
    const sa = STATUS_SEVERITY[a.status] ?? 99
    const sb = STATUS_SEVERITY[b.status] ?? 99
    if (sa !== sb) return sa - sb
    return a.name.localeCompare(b.name)
  })
}

export function FleetList() {
  const { state } = useContext(FleetContext)
  const sorted = sortBoats(state.boats)

  if (!sorted.length) {
    return <EmptyState icon="⛵" title="No boats registered" description="Add boats or reset to demo data in Settings" />
  }

  return (
    <div className="space-y-3">
      {sorted.map(boat => (
        <BoatCard key={boat.id} boat={boat} />
      ))}
    </div>
  )
}
