import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Map, Users, MessageCircle, BookOpen, Settings } from 'lucide-react'
import clsx from 'clsx'

const links = [
  { to: '/', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/map', label: 'Map', Icon: Map },
  { to: '/fleet', label: 'Fleet', Icon: Users },
  { to: '/chat', label: 'Chat', Icon: MessageCircle },
  { to: '/plan', label: 'Plan', Icon: BookOpen },
  { to: '/settings', label: 'Settings', Icon: Settings },
]

export function BottomNav() {
  return (
    <nav
      className="bg-navy-900 border-t border-navy-800 flex justify-around items-center h-14 pb-safe flex-shrink-0"
      aria-label="Main navigation"
    >
      {links.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-medium min-w-[44px] min-h-[44px] justify-center transition-colors',
              isActive
                ? 'text-ocean-400'
                : 'text-navy-300 hover:text-white'
            )
          }
          aria-label={label}
        >
          {({ isActive }) => (
            <>
              <Icon className={clsx('w-5 h-5', isActive ? 'text-ocean-400' : '')} aria-hidden="true" />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
