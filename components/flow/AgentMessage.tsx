import { RobotIcon as Robot } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

interface AgentMessageProps {
  children: React.ReactNode
  className?: string
}

export function AgentMessage({ children, className }: AgentMessageProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Robot size={32} weight="duotone" />
      </div>
      <div className="flex-1 bg-muted rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-ink leading-relaxed">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1">
          LIIF Grant Agent
        </p>
        {children}
      </div>
    </div>
  )
}
