import { useContext } from 'react'
import { FleetContext } from '../App.jsx'
import { ACTIONS } from '../lib/fleetReducer.js'
import { Card } from '../components/common/Card.jsx'
import { Button } from '../components/common/Button.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { RotateCcw, Play, Square, Settings as SettingsIcon, Info } from 'lucide-react'
import { APP_NAME } from '../lib/constants.js'

export function SettingsPage() {
  const { state, dispatch, resetToDemo } = useContext(FleetContext)
  const { demoMode } = state.ui

  return (
    <div className="page-enter">
      <div className="bg-hero-gradient px-5 pt-5 pb-8 -mb-4">
        <div className="flex items-center gap-2 mb-1">
          <SettingsIcon className="w-4 h-4 text-ocean-300" aria-hidden="true" />
          <span className="text-ocean-300 text-xs font-medium uppercase tracking-wider">Configuration</span>
        </div>
        <h1 className="text-white text-xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="px-4 pb-6 space-y-4">
        <Card>
          <SectionHeader title="Demo Mode" subtitle="Simulates boat movement and status updates" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {demoMode ? '🟢 Demo mode is ON — boats are moving' : '⏸ Demo mode is OFF'}
            </span>
            <Button
              variant={demoMode ? 'warning' : 'primary'}
              size="sm"
              onClick={() => dispatch({ type: ACTIONS.DEMO_MODE_TOGGLED })}
              aria-label={demoMode ? 'Disable demo mode' : 'Enable demo mode'}
            >
              {demoMode ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {demoMode ? 'Stop Demo' : 'Start Demo'}
            </Button>
          </div>
        </Card>

        <Card>
          <SectionHeader title="Reset Data" subtitle="Restore all 8 demo boats and messages" />
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (window.confirm('Reset all data to demo defaults? This cannot be undone.')) {
                resetToDemo()
              }
            }}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Demo Data
          </Button>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-ocean-gradient flex items-center justify-center">
              <Info className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-base font-bold text-navy-900 tracking-tight">About</h2>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            <strong>{APP_NAME}</strong> is a local-first flotilla coordination tool.
            All data is stored in your browser's localStorage.
          </p>
          <p className="text-xs text-gray-400">
            ⚠️ This is an MVP demo. No real-time network sync. For production use,
            connect to a backend service.
          </p>
        </Card>
      </div>
    </div>
  )
}
