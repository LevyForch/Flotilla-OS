import clsx from 'clsx'

const variants = {
  primary: 'bg-gradient-to-r from-ocean-600 to-ocean-500 text-white hover:from-ocean-700 hover:to-ocean-600 focus-visible:ring-ocean-400 shadow-sm hover:shadow-md',
  secondary: 'bg-navy-800 text-white hover:bg-navy-700 focus-visible:ring-navy-400',
  danger: 'bg-gradient-to-r from-coral-600 to-coral-500 text-white hover:from-coral-600 hover:to-coral-600 focus-visible:ring-coral-400 shadow-sm',
  warning: 'bg-gradient-to-r from-amber-500 to-amber-400 text-white hover:from-amber-600 hover:to-amber-500 focus-visible:ring-amber-400 shadow-sm',
  success: 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-600 hover:to-emerald-600 focus-visible:ring-emerald-400 shadow-sm',
  ghost: 'bg-transparent text-ocean-600 hover:bg-ocean-50 focus-visible:ring-ocean-400',
  outline: 'bg-transparent border border-ocean-200 text-ocean-700 hover:bg-ocean-50 hover:border-ocean-300 focus-visible:ring-ocean-400',
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
        'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]',
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
