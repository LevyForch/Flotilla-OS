import { TopBar } from './TopBar.jsx'
import { BottomNav } from './BottomNav.jsx'

export function AppShell({ children }) {
  return (
    <div className="flex flex-col h-dvh bg-slate-50 overflow-hidden">
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-safe">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
