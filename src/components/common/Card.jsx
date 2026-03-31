import clsx from 'clsx'

export function Card({ children, className, onClick }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-card p-4 transition-shadow',
        onClick && 'cursor-pointer hover:shadow-card-hover',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
