import { BOAT_STATUSES } from '../../lib/constants.js'

export function MapLegend() {
  return (
    <div className="absolute bottom-4 left-2 z-[1000] bg-white/90 backdrop-blur rounded-xl shadow-card p-3 text-xs">
      <p className="font-bold text-navy-900 mb-2">Status Legend</p>
      {Object.entries(BOAT_STATUSES).map(([key, { label, emoji }]) => (
        <div key={key} className="flex items-center gap-2 mb-1">
          <span>{emoji}</span>
          <span className="text-gray-700">{label}</span>
        </div>
      ))}
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-ocean-400 border-2 border-white inline-block" />
          <span className="text-gray-700">Meetup point</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-3 h-3 rounded bg-emerald-400 border border-white inline-block" />
          <span className="text-gray-700">Fallback cove</span>
        </div>
      </div>
    </div>
  )
}
