import { useContext, Component } from 'react'
import { Link } from 'react-router-dom'
import { Users, CheckCircle, AlertTriangle, Clock, ArrowRight } from 'lucide-react'
import { FleetContext } from '../App.jsx'
import { Card } from '../components/common/Card.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { PanicBanner } from '../components/fleet/PanicBanner.jsx'
import { ChatMessage } from '../components/chat/ChatMessage.jsx'
import { FleetMap } from '../components/map/FleetMap.jsx'
import { formatAgo } from '../lib/formatters.js'

function KpiCard({ icon: Icon, value, label, color }) {
  return (
    <Card className="flex flex-col items-center p-3 text-center">
      <Icon className={`w-6 h-6 mb-1 ${color}`} aria-hidden="true" />
      <p className="text-2xl font-bold text-navy-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </Card>
  )
}

export function DashboardPage() {
  const { state } = useContext(FleetContext)
  const { boats, chatMessages, sharedPlan } = state

  const arrived = boats.filter(b => b.status === 'arrived').length
  const alerts = boats.filter(b => b.status === 'need_help' || b.status === 'fuel_issue').length
  const lastUpdate = boats.reduce((latest, b) => {
    if (!b.position?.updatedAt) return latest
    return !latest || b.position.updatedAt > latest ? b.position.updatedAt : latest
  }, null)
  const recentMessages = chatMessages.slice(-3)

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <PanicBanner />

      {/* KPI grid */}
      <div>
        <SectionHeader title="Fleet Overview" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <KpiCard icon={Users} value={boats.length} label="Total Boats" color="text-ocean-600" />
          <KpiCard icon={CheckCircle} value={arrived} label="Arrived" color="text-emerald-600" />
          <KpiCard icon={AlertTriangle} value={alerts} label="Active Alerts" color={alerts > 0 ? 'text-red-500' : 'text-gray-400'} />
          <KpiCard icon={Clock} value={lastUpdate ? formatAgo(lastUpdate) : '—'} label="Last Update" color="text-navy-500" />
        </div>
      </div>

      {/* Compact map preview */}
      <div>
        <SectionHeader
          title="Where is everyone?"
          action={
            <Link to="/map" className="flex items-center gap-1 text-xs text-ocean-600 hover:underline">
              Full map <ArrowRight className="w-3 h-3" />
            </Link>
          }
        />
        <div className="h-48 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
          <MapPreview />
        </div>
      </div>

      {/* Recent chat */}
      <div>
        <SectionHeader
          title="Recent Messages"
          action={
            <Link to="/chat" className="flex items-center gap-1 text-xs text-ocean-600 hover:underline">
              All <ArrowRight className="w-3 h-3" />
            </Link>
          }
        />
        <Card>
          {recentMessages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-2">No messages yet</p>
          ) : (
            recentMessages.map(m => (
              <ChatMessage key={m.id} message={m} isOwn={false} />
            ))
          )}
        </Card>
      </div>

      {/* Plan summary */}
      {sharedPlan.meetupPoint?.name && (
        <div>
          <SectionHeader
            title="Today's Plan"
            action={
              <Link to="/plan" className="flex items-center gap-1 text-xs text-ocean-600 hover:underline">
                Edit <ArrowRight className="w-3 h-3" />
              </Link>
            }
          />
          <Card className="bg-ocean-50 border border-ocean-200">
            <p className="font-semibold text-ocean-800">⚓ {sharedPlan.meetupPoint.name}</p>
            {sharedPlan.meetupPoint.etaWindow && (
              <p className="text-sm text-ocean-600 mt-0.5">⏱ {sharedPlan.meetupPoint.etaWindow}</p>
            )}
            {sharedPlan.fallbackCoves.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                🏝 {sharedPlan.fallbackCoves.length} fallback cove{sharedPlan.fallbackCoves.length > 1 ? 's' : ''} available
              </p>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}

// Simple error boundary for map
class MapBoundary extends Component {
  constructor(props) { super(props); this.state = { error: false } }
  static getDerivedStateFromError() { return { error: true } }
  render() {
    if (this.state.error) return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">Map unavailable</div>
    )
    return this.props.children
  }
}

function MapPreview() {
  return (
    <MapBoundary>
      <FleetMap compact={true} />
    </MapBoundary>
  )
}
