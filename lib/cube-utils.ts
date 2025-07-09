export const COLORS = {
  white: "#f8fafc",
  yellow: "#fbbf24",
  red: "#ef4444",
  orange: "#f97316",
  blue: "#3b82f6",
  green: "#10b981",
} as const

export type FaceColor = keyof typeof COLORS

export interface CubeState {
  position: [number, number, number]
  faces: {
    top: FaceColor
    bottom: FaceColor
    front: FaceColor
    back: FaceColor
    right: FaceColor
    left: FaceColor
  }
}

export const MOVES = ['R', 'L', 'U', 'D', 'F', 'B', "R'", "L'", "U'", "D'", "F'", "B'", 'R2', 'L2', 'U2', 'D2', 'F2', 'B2']

export const MAX_STATES = 43252003274489856000n

export const bigIntMax = (...args: bigint[]) => args.reduce((m, e) => e > m ? e : m);
export const bigIntMin = (...args: bigint[]) => args.reduce((m, e) => e < m ? e : m);

export function createSolvedCube(): CubeState[] {
  const cubes: CubeState[] = []

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubes.push({
          position: [x, y, z],
          faces: {
            top: y === 1 ? 'white' : y === 0 ? 'white' : 'white',
            bottom: y === -1 ? 'yellow' : y === 0 ? 'yellow' : 'yellow',
            front: z === 1 ? 'red' : z === 0 ? 'red' : 'red',
            back: z === -1 ? 'orange' : z === 0 ? 'orange' : 'orange',
            right: x === 1 ? 'blue' : x === 0 ? 'blue' : 'blue',
            left: x === -1 ? 'green' : x === 0 ? 'green' : 'green',
          }
        })
      }
    }
  }
  
  return cubes
}

export function applyCubeMove(state: CubeState[], move: string): CubeState[] {
  const newState = JSON.parse(JSON.stringify(state))
  
  switch (move) {
    case 'R':
      rotateLayer(newState, (cube) => cube.position[0] === 1, 'x', 1)
      break
    case "R'":
      rotateLayer(newState, (cube) => cube.position[0] === 1, 'x', -1)
      break
    case 'R2':
      rotateLayer(newState, (cube) => cube.position[0] === 1, 'x', 2)
      break
    case 'L':
      rotateLayer(newState, (cube) => cube.position[0] === -1, 'x', -1)
      break
    case "L'":
      rotateLayer(newState, (cube) => cube.position[0] === -1, 'x', 1)
      break
    case 'L2':
      rotateLayer(newState, (cube) => cube.position[0] === -1, 'x', 2)
      break
    case 'U':
      rotateLayer(newState, (cube) => cube.position[1] === 1, 'y', 1)
      break
    case "U'":
      rotateLayer(newState, (cube) => cube.position[1] === 1, 'y', -1)
      break
    case 'U2':
      rotateLayer(newState, (cube) => cube.position[1] === 1, 'y', 2)
      break
    case 'D':
      rotateLayer(newState, (cube) => cube.position[1] === -1, 'y', -1)
      break
    case "D'":
      rotateLayer(newState, (cube) => cube.position[1] === -1, 'y', 1)
      break
    case 'D2':
      rotateLayer(newState, (cube) => cube.position[1] === -1, 'y', 2)
      break
    case 'F':
      rotateLayer(newState, (cube) => cube.position[2] === 1, 'z', 1)
      break
    case "F'":
      rotateLayer(newState, (cube) => cube.position[2] === 1, 'z', -1)
      break
    case 'F2':
      rotateLayer(newState, (cube) => cube.position[2] === 1, 'z', 2)
      break
    case 'B':
      rotateLayer(newState, (cube) => cube.position[2] === -1, 'z', -1)
      break
    case "B'":
      rotateLayer(newState, (cube) => cube.position[2] === -1, 'z', 1)
      break
    case 'B2':
      rotateLayer(newState, (cube) => cube.position[2] === -1, 'z', 2)
      break
  }
  
  return newState
}

function rotateLayer(state: CubeState[], selector: (cube: CubeState) => boolean, axis: 'x' | 'y' | 'z', turns: number) {
  const layerCubes = state.filter(selector)
  
  for (let turn = 0; turn < Math.abs(turns); turn++) {
    const direction = turns > 0 ? 1 : -1
    
    layerCubes.forEach(cube => {
      const [x, y, z] = cube.position
      
      if (axis === 'x') {
        const newY = direction > 0 ? -z : z
        const newZ = direction > 0 ? y : -y
        cube.position = [x, newY, newZ]
        rotateFaces(cube, axis, direction)
      } else if (axis === 'y') {
        const newX = direction > 0 ? z : -z
        const newZ = direction > 0 ? -x : x
        cube.position = [newX, y, newZ]
        rotateFaces(cube, axis, direction)
      } else if (axis === 'z') {
        const newX = direction > 0 ? -y : y
        const newY = direction > 0 ? x : -x
        cube.position = [newX, newY, z]
        rotateFaces(cube, axis, direction)
      }
    })
  }
}

function rotateFaces(cube: CubeState, axis: 'x' | 'y' | 'z', direction: number) {
  const { faces } = cube
  
  if (axis === 'x') {
    if (direction > 0) {
      const temp = faces.top
      faces.top = faces.front
      faces.front = faces.bottom
      faces.bottom = faces.back
      faces.back = temp
    } else {
      const temp = faces.top
      faces.top = faces.back
      faces.back = faces.bottom
      faces.bottom = faces.front
      faces.front = temp
    }
  } else if (axis === 'y') {
    if (direction > 0) {
      const temp = faces.front
      faces.front = faces.right
      faces.right = faces.back
      faces.back = faces.left
      faces.left = temp
    } else {
      const temp = faces.front
      faces.front = faces.left
      faces.left = faces.back
      faces.back = faces.right
      faces.right = temp
    }
  } else if (axis === 'z') {
    if (direction > 0) {
      const temp = faces.top
      faces.top = faces.left
      faces.left = faces.bottom
      faces.bottom = faces.right
      faces.right = temp
    } else {
      const temp = faces.top
      faces.top = faces.right
      faces.right = faces.bottom
      faces.bottom = faces.left
      faces.left = temp
    }
  }
}

export function generateStateFromIndex(index: bigint): CubeState[] {
  let state = createSolvedCube()
  
  if (index === 0n) return state
  
  const moveSequence = indexToMoveSequence(index)
  
  for (const move of moveSequence) {
    state = applyCubeMove(state, move)
  }
  
  return state
}

function indexToMoveSequence(index: bigint): string[] {
  const moves: string[] = []
  const maxMoves = 20
  
  let remaining = index
  
  for (let i = 0; i < maxMoves && remaining > 0; i++) {
    const moveIndex = Number(remaining % BigInt(MOVES.length))
    moves.push(MOVES[moveIndex])
    remaining = remaining / BigInt(MOVES.length)
  }
  
  return moves
} 