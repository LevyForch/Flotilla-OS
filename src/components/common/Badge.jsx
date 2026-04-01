import clsx from 'clsx'

const colors = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50',
  ocean: 'bg-ocean-50 text-ocean-700 ring-1 ring-ocean-200/50',
  coral: 'bg-red-50 text-red-700 ring-1 ring-red-200/50',
  amber: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200/50',
  gray: 'bg-gray-50 text-gray-600 ring-1 ring-gray-200/50',
  navy: 'bg-navy-50 text-navy-700 ring-1 ring-navy-200/50',
}

export function Badge({ color = 'gray', children, className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        colors[color] || colors.gray,
        className
      )}
    >
      {children}
    </span>
  )
}
