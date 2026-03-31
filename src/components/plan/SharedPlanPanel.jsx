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
        <div className="bg-ocean-600 text-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Anchor className="w-5 h-5" aria-hidden="true" />
            <span className="font-bold">Today's Meetup</span>
          </div>
          <p className="text-lg font-bold">{meetupPoint.name}</p>
          {meetupPoint.etaWindow && (
            <p className="text-sm text-ocean-200 mt-0.5">⏱ {meetupPoint.etaWindow}</p>
          )}
          <p className="text-xs text-ocean-300 mt-1">
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
