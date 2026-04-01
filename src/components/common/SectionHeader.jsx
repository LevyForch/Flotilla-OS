export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-3">
      <div>
        <h2 className="text-base font-bold text-navy-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="ml-2">{action}</div>}
    </div>
  )
}
