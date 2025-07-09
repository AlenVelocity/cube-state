import { OrbitControls } from "@react-three/drei"
import { RubiksCube } from "./rubiks-cube"
import { useIsMobile } from "@/hooks/use-mobile"

interface SceneProps {
  stateIndex: bigint
}

export function Scene({ stateIndex }: SceneProps) {
  const isMobile = useIsMobile()
  const distance = isMobile ? 6 : 8
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      <directionalLight position={[0, 10, 0]} intensity={0.3} />
      <RubiksCube stateIndex={stateIndex} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        minDistance={distance}
        maxDistance={distance}
        autoRotate={false}
      />
    </>
  )
} 