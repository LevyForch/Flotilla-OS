import clsx from 'clsx'

const colors = {
  emerald: 'bg-emerald-100 text-emerald-700',
  ocean: 'bg-ocean-100 text-ocean-700',
  coral: 'bg-red-100 text-red-700',
  amber: 'bg-amber-100 text-amber-800',
  gray: 'bg-gray-100 text-gray-600',
  navy: 'bg-navy-100 text-navy-700',
}

export function Badge({ color = 'gray', children, className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
        colors[color] || colors.gray,
        className
      )}
    >
      {children}
    </span>
  )
}
