import { useContext, Component } from 'react'
import { Link } from 'react-router-dom'
import { Users, CheckCircle, AlertTriangle, Clock, ArrowRight, Waves } from 'lucide-react'
import { FleetContext } from '../App.jsx'
import { Card } from '../components/common/Card.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { PanicBanner } from '../components/fleet/PanicBanner.jsx'
import { ChatMessage } from '../components/chat/ChatMessage.jsx'
import { FleetMap } from '../components/map/FleetMap.jsx'
import { formatAgo } from '../lib/formatters.js'

function KpiCard({ icon: Icon, value, label, color }) {
  return (
    <Card className="flex flex-col items-center p-3 text-center group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110 ${color.replace('text-', 'bg-').replace('-600', '-50').replace('-500', '-50').replace('-400', '-50')}`}>
        <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
      </div>
      <p className="text-2xl font-bold text-navy-900 tracking-tight">{value}</p>
      <p className="text-[11px] text-gray-400 font-medium">{label}</p>
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
    <div className="page-enter">
      <PanicBanner />

      {/* Hero gradient header */}
      <div className="bg-hero-gradient px-5 pt-5 pb-8 -mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Waves className="w-4 h-4 text-ocean-300" aria-hidden="true" />
          <span className="text-ocean-300 text-xs font-medium uppercase tracking-wider">Fleet Overview</span>
        </div>
        <h1 className="text-white text-xl font-bold tracking-tight">
          {boats.length} Boat{boats.length !== 1 ? 's' : ''} on the Water
        </h1>
        <p className="text-ocean-300/70 text-sm mt-0.5">
          {arrived} arrived · {alerts} alert{alerts !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="px-4 pb-6 space-y-4">
        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <KpiCard icon={Users} value={boats.length} label="Total Boats" color="text-ocean-600" />
          <KpiCard icon={CheckCircle} value={arrived} label="Arrived" color="text-emerald-600" />
          <KpiCard icon={AlertTriangle} value={alerts} label="Active Alerts" color={alerts > 0 ? 'text-coral-500' : 'text-gray-400'} />
          <KpiCard icon={Clock} value={lastUpdate ? formatAgo(lastUpdate) : '—'} label="Last Update" color="text-navy-500" />
        </div>

        {/* Compact map preview */}
        <div>
          <SectionHeader
            title="Where is everyone?"
            action={
              <Link to="/map" className="flex items-center gap-1 text-xs text-ocean-600 font-medium hover:text-ocean-700 transition-colors">
                Full map <ArrowRight className="w-3 h-3" />
              </Link>
            }
          />
          <div className="h-52 rounded-2xl overflow-hidden border border-gray-100 shadow-card-lg">
            <MapPreview />
          </div>
        </div>

        {/* Recent chat */}
        <div>
          <SectionHeader
            title="Recent Messages"
            action={
              <Link to="/chat" className="flex items-center gap-1 text-xs text-ocean-600 font-medium hover:text-ocean-700 transition-colors">
                All <ArrowRight className="w-3 h-3" />
              </Link>
            }
          />
          <Card>
            {recentMessages.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No messages yet</p>
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
                <Link to="/plan" className="flex items-center gap-1 text-xs text-ocean-600 font-medium hover:text-ocean-700 transition-colors">
                  Edit <ArrowRight className="w-3 h-3" />
                </Link>
              }
            />
            <Card className="bg-gradient-to-br from-ocean-50 to-ocean-100/50 border border-ocean-100">
              <p className="font-semibold text-ocean-800">⚓ {sharedPlan.meetupPoint.name}</p>
              {sharedPlan.meetupPoint.etaWindow && (
                <p className="text-sm text-ocean-600 mt-0.5">⏱ {sharedPlan.meetupPoint.etaWindow}</p>
              )}
              {sharedPlan.fallbackCoves.length > 0 && (
                <p className="text-xs text-ocean-500/70 mt-1.5">
                  🏝 {sharedPlan.fallbackCoves.length} fallback cove{sharedPlan.fallbackCoves.length > 1 ? 's' : ''} available
                </p>
              )}
            </Card>
          </div>
        )}
      </div>
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
