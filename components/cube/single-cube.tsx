import * as THREE from "three"
import { COLORS, CubeState } from "@/lib/cube-utils"

interface SingleCubeProps {
  cubeData: CubeState
}

export function SingleCube({ cubeData }: SingleCubeProps) {
  const materials = [
    new THREE.MeshStandardMaterial({ color: COLORS[cubeData.faces.right] }),
    new THREE.MeshStandardMaterial({ color: COLORS[cubeData.faces.left] }),
    new THREE.MeshStandardMaterial({ color: COLORS[cubeData.faces.top] }),
    new THREE.MeshStandardMaterial({ color: COLORS[cubeData.faces.bottom] }),
    new THREE.MeshStandardMaterial({ color: COLORS[cubeData.faces.front] }),
    new THREE.MeshStandardMaterial({ color: COLORS[cubeData.faces.back] }),
  ]
  
  return (
    <group position={cubeData.position}>
      <mesh material={materials}>
        <boxGeometry args={[0.98, 0.98, 0.98]} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.98, 0.98, 0.98)]} />
        <lineBasicMaterial color="#374151" linewidth={2} />
      </lineSegments>
    </group>
  )
} 