import { useState, useRef, useEffect } from "react"
import { MAX_STATES } from "@/lib/cube-utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface MobileNavigationProps {
  currentState: bigint
  onStateChange: (state: bigint) => void
}

export function MobileNavigation({ currentState, onStateChange }: MobileNavigationProps) {
  const isMobile = useIsMobile()
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const progress = Number((currentState * 100n) / MAX_STATES)

  const handleInteraction = (clientX: number) => {
    if (!sliderRef.current) return
    
    const rect = sliderRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    const newState = BigInt(Math.floor(percentage * Number(MAX_STATES)))
    
    onStateChange(newState)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    handleInteraction(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    handleInteraction(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    handleInteraction(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    handleInteraction(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      handleInteraction(e.clientX)
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      e.preventDefault()
      handleInteraction(e.touches[0].clientX)
    }

    const handleGlobalTouchEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false })
      document.addEventListener('mouseup', handleGlobalMouseUp)
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false })
      document.addEventListener('touchend', handleGlobalTouchEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      document.removeEventListener('touchmove', handleGlobalTouchMove)
      document.removeEventListener('touchend', handleGlobalTouchEnd)
    }
  }, [isDragging])

  if (!isMobile) return null

  const totalTicks = 100
  const majorTickInterval = 10
  const mediumTickInterval = 5

  const getTickHeight = (index: number) => {
    if (index % majorTickInterval === 0) return 'h-3'
    if (index % mediumTickInterval === 0) return 'h-2'
    return 'h-1'
  }

  const getTickWidth = (index: number) => {
    if (index % majorTickInterval === 0) return 'w-0.5'
    if (index % mediumTickInterval === 0) return 'w-px'
    return 'w-px'
  }

  return (
    <div className="w-full px-4 py-4 min-h-[4rem] flex items-center">
      <div 
        ref={sliderRef}
        className="relative w-full h-8 cursor-pointer select-none touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute bottom-0 left-0 right-0 h-6 flex items-end justify-between px-1">
          {Array.from({ length: totalTicks + 1 }, (_, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div
                className={`${getTickHeight(i)} ${getTickWidth(i)} transition-all duration-200 ${
                  i <= (progress / 100) * totalTicks 
                    ? 'bg-primary' 
                    : 'bg-foreground/40'
                }`}
              />
            </div>
          ))}
        </div>
        
        <div 
          className="absolute bottom-0 w-1 h-6 bg-primary rounded-full shadow-lg transition-all duration-200 z-10"
          style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
        />
      </div>
    </div>
  )
} 