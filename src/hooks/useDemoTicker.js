import { useEffect, useRef } from 'react'
import { ACTIONS } from '../lib/fleetReducer.js'
import { DEMO_TICK_MS } from '../lib/constants.js'

export function useDemoTicker(dispatch, demoMode) {
  const tickRef = useRef(0)

  useEffect(() => {
    if (!demoMode) return
    const id = setInterval(() => {
      tickRef.current += 1
      dispatch({ type: ACTIONS.DEMO_TICK, payload: { tick: tickRef.current } })
    }, DEMO_TICK_MS)
    return () => clearInterval(id)
  }, [demoMode, dispatch])
}
