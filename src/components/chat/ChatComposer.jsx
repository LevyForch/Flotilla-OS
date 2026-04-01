import { useState, useContext } from 'react'
import { Send } from 'lucide-react'
import { FleetContext } from '../../App.jsx'
import { ACTIONS } from '../../lib/fleetReducer.js'
import { genId } from '../../lib/id.js'

export function ChatComposer({ identity }) {
  const { dispatch } = useContext(FleetContext)
  const [text, setText] = useState('')

  function send() {
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch({
      type: ACTIONS.CHAT_MESSAGE_ADDED,
      payload: {
        id: genId('msg'),
        boatId: identity?.id || 'coordinator',
        sender: identity?.name || 'Coordinator',
        text: trimmed,
        createdAt: new Date().toISOString(),
      },
    })
    setText('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="flex items-end gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-gray-100">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`Message as ${identity?.name || 'Coordinator'}…`}
        rows={1}
        className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent min-h-[44px] max-h-[120px] transition-all bg-gray-50/50 placeholder:text-gray-400"
        aria-label="Message input"
      />
      <button
        onClick={send}
        disabled={!text.trim()}
        className="bg-gradient-to-r from-ocean-600 to-ocean-500 text-white p-2.5 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center hover:from-ocean-700 hover:to-ocean-600 disabled:opacity-40 transition-all active:scale-95 shadow-sm"
        aria-label="Send message"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  )
}
