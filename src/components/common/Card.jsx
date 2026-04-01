import clsx from 'clsx'

export function Card({ children, className, onClick }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-card card-refined p-4',
        onClick && 'cursor-pointer hover:shadow-card-hover active:scale-[0.99]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
