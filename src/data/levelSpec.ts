export type LevelSpec = {
  tiles: number[]
  meta: {
    width: number
    height: number
    text: string
  }
}

// Tile number types
// 0 void
// 1 wall
// 2 floor
// 3 start
// 4-13 food
// 15 goro
