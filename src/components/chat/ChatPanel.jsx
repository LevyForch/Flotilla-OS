import { useContext, useEffect, useRef } from 'react'
import { FleetContext } from '../../App.jsx'
import { ChatMessage } from './ChatMessage.jsx'
import { ChatComposer } from './ChatComposer.jsx'
import { EmptyState } from '../common/EmptyState.jsx'

export function ChatPanel({ selectedIdentity }) {
  const { state } = useContext(FleetContext)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state.chatMessages.length])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        {state.chatMessages.length === 0 ? (
          <EmptyState icon="💬" title="No messages yet" description="Be the first to check in!" />
        ) : (
          state.chatMessages.map(msg => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isOwn={msg.boatId === (selectedIdentity?.id || 'coordinator')}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatComposer identity={selectedIdentity} />
    </div>
  )
}
