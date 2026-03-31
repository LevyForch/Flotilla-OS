import { useReducer, useEffect, useCallback } from 'react'
import { fleetReducer, ACTIONS } from '../lib/fleetReducer.js'
import { loadState, saveState, DEFAULT_STATE } from '../lib/storage.js'
import { buildDemoBoats, buildDemoMessages, buildDemoPlan } from '../lib/demoData.js'

function buildInitialState() {
  const saved = loadState()
  if (saved && saved.boats && saved.boats.length > 0) return saved
  // First run: seed with demo data
  const boats = buildDemoBoats()
  return {
    ...DEFAULT_STATE,
    boats,
    chatMessages: buildDemoMessages(boats),
    sharedPlan: buildDemoPlan(),
    ui: { ...DEFAULT_STATE.ui, demoMode: true },
  }
}

export function useFleetState() {
  const [state, dispatch] = useReducer(fleetReducer, null, buildInitialState)

  // Persist to localStorage on every state change
  useEffect(() => {
    saveState(state)
  }, [state])

  const resetToDemo = useCallback(() => {
    const boats = buildDemoBoats()
    dispatch({
      type: ACTIONS.STATE_RESET,
      payload: {
        ...DEFAULT_STATE,
        boats,
        chatMessages: buildDemoMessages(boats),
        sharedPlan: buildDemoPlan(),
        ui: { ...DEFAULT_STATE.ui, demoMode: true },
      },
    })
  }, [])

  return { state, dispatch, resetToDemo }
}
