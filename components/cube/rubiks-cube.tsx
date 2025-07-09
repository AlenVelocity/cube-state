import { generateStateFromIndex } from "@/lib/cube-utils"
import { SingleCube } from "./single-cube"
import { useIsMobile } from "@/hooks/use-mobile"

interface RubiksCubeProps {
  stateIndex: bigint
}

export function RubiksCube({ stateIndex }: RubiksCubeProps) {
  const currentState = generateStateFromIndex(stateIndex)
  const isMobile = useIsMobile()
  
  const scale = isMobile ? 0.5 : 1
  
  return (
    <group scale={[scale, scale, scale]}>
      {currentState.map((cubeData, index) => (
        <SingleCube key={index} cubeData={cubeData} />
      ))}
    </group>
  )
} 