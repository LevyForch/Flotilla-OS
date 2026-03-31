import clsx from 'clsx'
import { formatTime } from '../../lib/formatters.js'

export function ChatMessage({ message, isOwn }) {
  return (
    <div className={clsx('flex flex-col', isOwn ? 'items-end' : 'items-start', 'mb-3 animate-slide-up')}>
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className={clsx('text-xs font-semibold', message.isSystem ? 'text-gray-400' : 'text-navy-700')}>
          {message.sender}
        </span>
        <span className="text-[10px] text-gray-400">{formatTime(message.createdAt)}</span>
      </div>
      <div
        className={clsx(
          'rounded-2xl px-3 py-2 max-w-[80%] text-sm',
          message.isSystem
            ? 'bg-gray-100 text-gray-600 italic text-xs'
            : isOwn
            ? 'bg-ocean-600 text-white rounded-br-sm'
            : 'bg-white border border-gray-200 text-navy-900 rounded-bl-sm shadow-sm'
        )}
      >
        {message.text}
      </div>
    </div>
  )
}
