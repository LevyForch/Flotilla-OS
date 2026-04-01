import { FleetList } from '../components/fleet/FleetList.jsx'
import { PanicBanner } from '../components/fleet/PanicBanner.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { Users } from 'lucide-react'

export function FleetPage() {
  return (
    <div className="page-enter">
      <PanicBanner />
      <div className="bg-hero-gradient px-5 pt-5 pb-8 -mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-ocean-300" aria-hidden="true" />
          <span className="text-ocean-300 text-xs font-medium uppercase tracking-wider">Fleet Status</span>
        </div>
        <h1 className="text-white text-xl font-bold tracking-tight">Your Fleet</h1>
        <p className="text-ocean-300/70 text-sm mt-0.5">Sorted by alert severity</p>
      </div>
      <div className="px-4 pb-6">
        <FleetList />
      </div>
    </div>
  )
}
