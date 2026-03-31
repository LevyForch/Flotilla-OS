import { nudgePosition } from './geo.js'
import { genId } from './id.js'
import { BOAT_STATUSES } from './constants.js'

// Action types
export const ACTIONS = {
  BOAT_POSITION_UPDATED: 'BOAT_POSITION_UPDATED',
  BOAT_STATUS_SET: 'BOAT_STATUS_SET',
  CHAT_MESSAGE_ADDED: 'CHAT_MESSAGE_ADDED',
  MEETUP_POINT_UPDATED: 'MEETUP_POINT_UPDATED',
  FALLBACK_COVE_ADDED: 'FALLBACK_COVE_ADDED',
  FALLBACK_COVE_UPDATED: 'FALLBACK_COVE_UPDATED',
  FALLBACK_COVE_REMOVED: 'FALLBACK_COVE_REMOVED',
  DEMO_MODE_TOGGLED: 'DEMO_MODE_TOGGLED',
  DEMO_TICK: 'DEMO_TICK',
  BOAT_SELECTED: 'BOAT_SELECTED',
  MAP_FOLLOW_TOGGLED: 'MAP_FOLLOW_TOGGLED',
  STATE_RESET: 'STATE_RESET',
}

export function fleetReducer(state, action) {
  switch (action.type) {
    case ACTIONS.BOAT_POSITION_UPDATED: {
      const { boatId, position } = action.payload
      return {
        ...state,
        boats: state.boats.map(b => b.id === boatId ? { ...b, position: { ...b.position, ...position } } : b),
      }
    }

    case ACTIONS.BOAT_STATUS_SET: {
      const { boatId, status, note } = action.payload
      const boat = state.boats.find(b => b.id === boatId)
      const systemMsg = boat
        ? {
            id: genId('msg'),
            boatId,
            sender: 'System',
            text: `${boat.name} marked ${BOAT_STATUSES[status]?.label ?? status}`,
            createdAt: new Date().toISOString(),
            isSystem: true,
          }
        : null
      return {
        ...state,
        boats: state.boats.map(b =>
          b.id === boatId ? { ...b, status, note: note ?? b.note } : b
        ),
        chatMessages: systemMsg
          ? [...state.chatMessages, systemMsg]
          : state.chatMessages,
      }
    }

    case ACTIONS.CHAT_MESSAGE_ADDED: {
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
      }
    }

    case ACTIONS.MEETUP_POINT_UPDATED: {
      return {
        ...state,
        sharedPlan: {
          ...state.sharedPlan,
          meetupPoint: { ...state.sharedPlan.meetupPoint, ...action.payload },
        },
      }
    }

    case ACTIONS.FALLBACK_COVE_ADDED: {
      return {
        ...state,
        sharedPlan: {
          ...state.sharedPlan,
          fallbackCoves: [...state.sharedPlan.fallbackCoves, action.payload],
        },
      }
    }

    case ACTIONS.FALLBACK_COVE_UPDATED: {
      return {
        ...state,
        sharedPlan: {
          ...state.sharedPlan,
          fallbackCoves: state.sharedPlan.fallbackCoves.map(c =>
            c.id === action.payload.id ? { ...c, ...action.payload } : c
          ),
        },
      }
    }

    case ACTIONS.FALLBACK_COVE_REMOVED: {
      return {
        ...state,
        sharedPlan: {
          ...state.sharedPlan,
          fallbackCoves: state.sharedPlan.fallbackCoves.filter(c => c.id !== action.payload.id),
        },
      }
    }

    case ACTIONS.DEMO_MODE_TOGGLED: {
      return {
        ...state,
        ui: { ...state.ui, demoMode: !state.ui.demoMode },
      }
    }

    case ACTIONS.DEMO_TICK: {
      // Move boats slightly and occasionally flip status
      const boats = state.boats.map((b, i) => {
        const tickSeed = action.payload.tick + i
        const moveChance = (tickSeed % 3) !== 0 // most ticks move
        const statusChance = (tickSeed % 47) === 0 // rare status change
        // 75% chance of ok, 25% chance of arrived (status normalizes over time in demo)
        const newStatus = statusChance
          ? ['ok', 'ok', 'ok', 'arrived'][tickSeed % 4]
          : b.status
        return {
          ...b,
          position: moveChance ? nudgePosition(b.position, 0.002) : b.position,
          status: newStatus,
        }
      })
      return { ...state, boats }
    }

    case ACTIONS.BOAT_SELECTED: {
      return {
        ...state,
        ui: { ...state.ui, selectedBoatId: action.payload.boatId },
      }
    }

    case ACTIONS.MAP_FOLLOW_TOGGLED: {
      return {
        ...state,
        ui: { ...state.ui, mapFollowSelected: !state.ui.mapFollowSelected },
      }
    }

    case ACTIONS.STATE_RESET: {
      return action.payload
    }

    default:
      return state
  }
}
