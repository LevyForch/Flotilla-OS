import { BOAT_STATUSES } from '../../lib/constants.js'
import { Badge } from '../common/Badge.jsx'
import clsx from 'clsx'

const colorMap = {
  ok: 'emerald',
  arrived: 'ocean',
  need_help: 'coral',
  fuel_issue: 'amber',
}

export function StatusPill({ status }) {
  const info = BOAT_STATUSES[status] || { label: status, emoji: '?', color: 'gray' }
  const color = colorMap[status] || 'gray'
  return (
    <Badge color={color}>
      {info.emoji} {info.label}
    </Badge>
  )
}
