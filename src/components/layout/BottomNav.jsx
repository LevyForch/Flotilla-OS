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
      className="glass-nav border-t border-white/10 flex justify-around items-center h-16 pb-safe flex-shrink-0 shadow-nav"
      aria-label="Main navigation"
    >
      {links.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl text-[10px] font-medium min-w-[48px] min-h-[44px] justify-center transition-all duration-300',
              isActive
                ? 'text-ocean-400 nav-active-pill'
                : 'text-navy-400 hover:text-white'
            )
          }
          aria-label={label}
        >
          {({ isActive }) => (
            <>
              <div className={clsx(
                'p-1 rounded-xl transition-all duration-300',
                isActive && 'bg-ocean-500/15'
              )}>
                <Icon className={clsx('w-5 h-5 transition-colors', isActive ? 'text-ocean-400' : '')} aria-hidden="true" />
              </div>
              <span className={clsx(isActive && 'font-semibold')}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
