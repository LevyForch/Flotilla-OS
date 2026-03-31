import { useContext } from 'react'
import { Anchor } from 'lucide-react'
import { FleetContext } from '../../App.jsx'
import { formatAgo } from '../../lib/formatters.js'
import { APP_NAME } from '../../lib/constants.js'

export function TopBar() {
  const { state } = useContext(FleetContext)
  const lastUpdate = state.boats.reduce((latest, b) => {
    if (!b.position?.updatedAt) return latest
    return !latest || b.position.updatedAt > latest ? b.position.updatedAt : latest
  }, null)

  return (
    <header className="bg-navy-900 text-white px-4 py-3 flex items-center justify-between shadow-lg flex-shrink-0">
      <div className="flex items-center gap-2">
        <Anchor className="w-5 h-5 text-ocean-400" aria-hidden="true" />
        <span className="font-bold text-lg tracking-tight">{APP_NAME}</span>
        {state.ui.demoMode && (
          <span className="ml-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
            Demo
          </span>
        )}
      </div>
      <div className="text-xs text-navy-200 text-right">
        <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        {lastUpdate && <div className="opacity-60">updated {formatAgo(lastUpdate)}</div>}
      </div>
    </header>
  )
}
