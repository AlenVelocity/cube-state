import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MAX_STATES } from "@/lib/cube-utils"
import { Dices } from "lucide-react"

interface StateDisplayProps {
  currentState: bigint
  onStateChange: (state: bigint) => void
}

export function StateDisplay({ currentState, onStateChange }: StateDisplayProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleClick = () => {
    setInputValue(currentState.toString())
    setIsEditing(true)
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

  const handleSubmit = () => {
    try {
      const targetState = BigInt(inputValue)
      if (targetState >= 0n && targetState < MAX_STATES) {
        onStateChange(targetState)
      }
    } catch (e) {
      // Invalid input, revert to current state
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  const handleRandom = () => {
    const randomState = BigInt(Math.floor(Math.random() * Number(MAX_STATES)))
    onStateChange(randomState)
  }

  return (
    <div className="text-foreground font-mono">
      <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
        <span>State:</span>
        {isEditing ? (
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            className="w-64 h-8 text-base font-mono bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none rounded-md"
            autoFocus
          />
        ) : (
          <span 
            onClick={handleClick}
            className="cursor-pointer hover:bg-secondary/50 px-2 py-1 rounded transition-colors break-all"
          >
            {currentState.toString().padStart(20, "0")}
          </span>
        )}
        <Button
          onClick={handleRandom}
          className="h-8 px-3 text-sm bg-secondary hover:bg-secondary/90 text-secondary-foreground font-mono flex-shrink-0"
        >
          <Dices className="w-4 h-4" />
        </Button>
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground mt-1">
        {MAX_STATES.toLocaleString('en-US')} total states
      </div>
    </div>
  )
} 