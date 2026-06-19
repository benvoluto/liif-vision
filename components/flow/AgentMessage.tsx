import SmartToyOutlined from '@mui/icons-material/SmartToyOutlined'
import { cn } from '@/lib/utils'

interface AgentMessageProps {
  children: React.ReactNode
  className?: string
}

export function AgentMessage({ children, className }: AgentMessageProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-ink-muted">
        <SmartToyOutlined sx={{ fontSize: 18 }} />
      </div>
      <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-ink leading-relaxed">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1">
          LIIF Grant Agent
        </p>
        {children}
      </div>
    </div>
  )
}
