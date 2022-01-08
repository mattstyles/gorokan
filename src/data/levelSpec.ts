export type LevelSpec = {
  tiles: number[]
  meta: {
    width: number
    height: number
  }
}

// Tile number types
// 0 void
// 1 wall
// 2 floor
// 3 start
// 4-14 food
// 15 goro
