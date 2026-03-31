import { FleetList } from '../components/fleet/FleetList.jsx'
import { PanicBanner } from '../components/fleet/PanicBanner.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'

export function FleetPage() {
  return (
    <div>
      <PanicBanner />
      <div className="px-4 pt-4 pb-6">
        <SectionHeader title="Fleet" subtitle="All boats sorted by alert severity" />
        <FleetList />
      </div>
    </div>
  )
}
