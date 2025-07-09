import { MAX_STATES } from "@/lib/cube-utils"

interface ProgressIndicatorProps {
  currentState: bigint
}

export function ProgressIndicator({ currentState }: ProgressIndicatorProps) {
  const progress = Number((currentState * 100n) / MAX_STATES)
  
  return (
    <div className="w-full bg-secondary rounded-full h-1.5 mb-1">
      <div 
        className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
} 