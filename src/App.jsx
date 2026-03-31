import { createContext } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { MapPage } from './pages/MapPage.jsx'
import { FleetPage } from './pages/FleetPage.jsx'
import { ChatPage } from './pages/ChatPage.jsx'
import { PlanPage } from './pages/PlanPage.jsx'
import { SettingsPage } from './pages/SettingsPage.jsx'
import { useFleetState } from './hooks/useFleetState.js'
import { useDemoTicker } from './hooks/useDemoTicker.js'

export const FleetContext = createContext(null)

export default function App() {
  const { state, dispatch, resetToDemo } = useFleetState()
  useDemoTicker(dispatch, state.ui.demoMode)

  return (
    <FleetContext.Provider value={{ state, dispatch, resetToDemo }}>
      <HashRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AppShell>
      </HashRouter>
    </FleetContext.Provider>
  )
}
