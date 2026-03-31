import { SharedPlanPanel } from '../components/plan/SharedPlanPanel.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'

export function PlanPage() {
  return (
    <div className="px-4 pt-4 pb-6">
      <SectionHeader title="Shared Plan" subtitle="Meetup point and fallback coves" />
      <SharedPlanPanel />
    </div>
  )
}
