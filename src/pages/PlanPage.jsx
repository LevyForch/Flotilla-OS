import { SharedPlanPanel } from '../components/plan/SharedPlanPanel.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { BookOpen } from 'lucide-react'

export function PlanPage() {
  return (
    <div className="page-enter">
      <div className="bg-hero-gradient px-5 pt-5 pb-8 -mb-4">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-ocean-300" aria-hidden="true" />
          <span className="text-ocean-300 text-xs font-medium uppercase tracking-wider">Coordination</span>
        </div>
        <h1 className="text-white text-xl font-bold tracking-tight">Shared Plan</h1>
        <p className="text-ocean-300/70 text-sm mt-0.5">Meetup point and fallback coves</p>
      </div>
      <div className="px-4 pb-6">
        <SharedPlanPanel />
      </div>
    </div>
  )
}
