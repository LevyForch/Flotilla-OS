import { useContext, useState } from 'react'
import { FleetContext } from '../App.jsx'
import { ChatPanel } from '../components/chat/ChatPanel.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { ChevronDown, MessageCircle } from 'lucide-react'

export function ChatPage() {
  const { state } = useContext(FleetContext)
  const [identityId, setIdentityId] = useState('coordinator')

  const identities = [
    { id: 'coordinator', name: 'Coordinator' },
    ...state.boats.map(b => ({ id: b.id, name: b.name })),
  ]
  const selectedIdentity = identities.find(i => i.id === identityId) || identities[0]

  return (
    <div className="flex flex-col h-full page-enter">
      <div className="px-5 pt-4 pb-2 flex-shrink-0 bg-white/50 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-ocean-500" aria-hidden="true" />
              <h2 className="text-base font-bold text-navy-900 tracking-tight">Group Chat</h2>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Messages are stored locally</p>
          </div>
          <div className="relative">
            <select
              value={identityId}
              onChange={e => setIdentityId(e.target.value)}
              className="appearance-none bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs rounded-xl pl-3 pr-7 py-1.5 focus:outline-none focus:ring-2 focus:ring-ocean-400 cursor-pointer transition-colors hover:bg-ocean-100"
              aria-label="Send messages as"
            >
              {identities.map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-ocean-600 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatPanel selectedIdentity={selectedIdentity} />
      </div>
    </div>
  )
}
