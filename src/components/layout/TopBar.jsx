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
    <header className="glass-nav text-white px-5 py-3.5 flex items-center justify-between shadow-glass flex-shrink-0 border-b border-white/5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-ocean-gradient flex items-center justify-center shadow-glow-lg">
          <Anchor className="w-4 h-4 text-white" aria-hidden="true" />
        </div>
        <span className="font-bold text-lg tracking-tight">{APP_NAME}</span>
        {state.ui.demoMode && (
          <span className="ml-1 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            Demo
          </span>
        )}
      </div>
      <div className="text-xs text-right">
        <div className="text-ocean-300 font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        {lastUpdate && <div className="text-navy-300 text-[10px] mt-0.5">updated {formatAgo(lastUpdate)}</div>}
      </div>
    </header>
  )
}
