"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Scene } from "@/components/cube/Scene"
import { StateDisplay } from "@/components/ui/state-display"
import { Instructions } from "@/components/ui/instructions"
import { ProgressIndicator } from "@/components/ui/progress-indicator"
import { MAX_STATES, bigIntMax, bigIntMin } from "@/lib/cube-utils"

export default function Component() {
  const [stateIndex, setStateIndex] = useState(0n)

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      
      const delta = event.deltaY > 0 ? 1 : -1
      setStateIndex(prev => bigIntMax(0n, bigIntMin(MAX_STATES - 1n, prev + BigInt(delta))))
    }
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setStateIndex(prev => bigIntMax(0n, prev - 1n))
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setStateIndex(prev => bigIntMin(MAX_STATES - 1n, prev + 1n)) 
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="w-full h-screen bg-gradient-to-br from-background to-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="px-3 sm:px-6 py-3">
          <ProgressIndicator currentState={stateIndex} />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-4 sm:gap-0">
              <StateDisplay currentState={stateIndex} onStateChange={setStateIndex} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-10">
        <Instructions />
      </div>

      <Canvas 
        camera={{ position: [6, 6, 6], fov: 50 }} 
        style={{ background: "hsl(var(--background))" }}
      >
        <Scene stateIndex={stateIndex} />
      </Canvas>
    </div>
  )
}
