import { useContext } from 'react'
import { FleetContext } from '../../App.jsx'
import { Card } from '../common/Card.jsx'
import { SectionHeader } from '../common/SectionHeader.jsx'
import { MeetupEditor } from './MeetupEditor.jsx'
import { FallbackCovesEditor } from './FallbackCovesEditor.jsx'
import { MapPin, Anchor } from 'lucide-react'

export function SharedPlanPanel() {
  const { state } = useContext(FleetContext)
  const { meetupPoint } = state.sharedPlan

  return (
    <div className="space-y-4">
      {/* Current plan summary */}
      {meetupPoint?.name && (
        <div className="bg-ocean-gradient text-white rounded-2xl p-5 shadow-card-lg">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Anchor className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className="font-bold text-sm">Today's Meetup</span>
          </div>
          <p className="text-xl font-bold tracking-tight">{meetupPoint.name}</p>
          {meetupPoint.etaWindow && (
            <p className="text-sm text-ocean-200 mt-1">⏱ {meetupPoint.etaWindow}</p>
          )}
          <p className="text-xs text-white/50 mt-1.5">
            {meetupPoint.lat?.toFixed(4)}°, {meetupPoint.lng?.toFixed(4)}°
          </p>
        </div>
      )}

      <Card>
        <SectionHeader
          title="Meetup Point"
          subtitle="Set the primary rendezvous location"
        />
        <MeetupEditor />
      </Card>

      <Card>
        <SectionHeader
          title="Fallback Coves"
          subtitle="Emergency safe harbors"
        />
        <FallbackCovesEditor />
      </Card>
    </div>
  )
}
