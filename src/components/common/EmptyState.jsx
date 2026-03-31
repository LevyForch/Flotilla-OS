export function EmptyState({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400">
      {icon && <div className="text-4xl mb-3">{icon}</div>}
      <p className="font-semibold text-gray-600">{title}</p>
      {description && <p className="text-sm mt-1">{description}</p>}
    </div>
  )
}
