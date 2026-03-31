import { useContext } from 'react'
import { FleetContext } from '../App.jsx'
import { ACTIONS } from '../lib/fleetReducer.js'
import { Card } from '../components/common/Card.jsx'
import { Button } from '../components/common/Button.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { RotateCcw, Play, Square } from 'lucide-react'
import { APP_NAME } from '../lib/constants.js'

export function SettingsPage() {
  const { state, dispatch, resetToDemo } = useContext(FleetContext)
  const { demoMode } = state.ui

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <SectionHeader title="Settings" />

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
        <SectionHeader title="About" />
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
  )
}
