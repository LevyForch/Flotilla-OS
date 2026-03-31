import { LS_KEY } from './constants.js'

const DEFAULT_STATE = {
  boats: [],
  chatMessages: [],
  sharedPlan: {
    meetupPoint: { name: '', lat: 36.8, lng: -121.9, etaWindow: '' },
    fallbackCoves: [],
  },
  ui: {
    selectedBoatId: null,
    demoMode: true,
    mapFollowSelected: false,
  },
}

export function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Defensive merge with defaults
    return {
      ...DEFAULT_STATE,
      ...parsed,
      sharedPlan: {
        ...DEFAULT_STATE.sharedPlan,
        ...(parsed.sharedPlan || {}),
        meetupPoint: {
          ...DEFAULT_STATE.sharedPlan.meetupPoint,
          ...(parsed.sharedPlan?.meetupPoint || {}),
        },
        fallbackCoves: Array.isArray(parsed.sharedPlan?.fallbackCoves)
          ? parsed.sharedPlan.fallbackCoves
          : [],
      },
      ui: {
        ...DEFAULT_STATE.ui,
        ...(parsed.ui || {}),
      },
      boats: Array.isArray(parsed.boats) ? parsed.boats : [],
      chatMessages: Array.isArray(parsed.chatMessages) ? parsed.chatMessages : [],
    }
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  } catch {
    // Storage quota exceeded or unavailable – fail silently
  }
}

export { DEFAULT_STATE }
