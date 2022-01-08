import {LevelSpec} from './levelSpec'

export function level1(): LevelSpec {
  return {
    meta: {
      width: 7,
      height: 5,
    },
    // prettier-ignore
    tiles: [
      1, 1, 1, 1, 1, 1, 1,
      1, 2, 2, 2, 1, 1, 1,
      1, 3, 2, 2, 7, 15, 1,
      1, 2, 2, 2, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
    ]
  }
}
