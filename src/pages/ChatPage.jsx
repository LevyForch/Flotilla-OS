import { useContext, useState } from 'react'
import { FleetContext } from '../App.jsx'
import { ChatPanel } from '../components/chat/ChatPanel.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { ChevronDown } from 'lucide-react'

export function ChatPage() {
  const { state } = useContext(FleetContext)
  const [identityId, setIdentityId] = useState('coordinator')

  const identities = [
    { id: 'coordinator', name: 'Coordinator' },
    ...state.boats.map(b => ({ id: b.id, name: b.name })),
  ]
  const selectedIdentity = identities.find(i => i.id === identityId) || identities[0]

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2 flex-shrink-0">
        <SectionHeader
          title="Group Chat"
          subtitle="Messages are stored locally"
          action={
            <div className="relative">
              <select
                value={identityId}
                onChange={e => setIdentityId(e.target.value)}
                className="appearance-none bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs rounded-xl pl-3 pr-7 py-1.5 focus:outline-none focus:ring-2 focus:ring-ocean-400 cursor-pointer"
                aria-label="Send messages as"
              >
                {identities.map(i => (
                  <option key={i.id} value={i.id}>{i.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-ocean-600 pointer-events-none" />
            </div>
          }
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatPanel selectedIdentity={selectedIdentity} />
      </div>
    </div>
  )
}
