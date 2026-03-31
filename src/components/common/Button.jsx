import clsx from 'clsx'

const variants = {
  primary: 'bg-ocean-600 text-white hover:bg-ocean-700 focus-visible:ring-ocean-400',
  secondary: 'bg-navy-800 text-white hover:bg-navy-700 focus-visible:ring-navy-400',
  danger: 'bg-coral-500 text-white hover:bg-coral-600 focus-visible:ring-coral-400',
  warning: 'bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-400',
  success: 'bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-400',
  ghost: 'bg-transparent text-ocean-600 hover:bg-ocean-50 focus-visible:ring-ocean-400',
  outline: 'bg-transparent border border-ocean-300 text-ocean-700 hover:bg-ocean-50 focus-visible:ring-ocean-400',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2 text-sm min-h-[44px]',
  lg: 'px-6 py-3 text-base min-h-[48px]',
  icon: 'p-2 min-h-[44px] min-w-[44px]',
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
