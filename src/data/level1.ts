import {LevelSpec} from './levelSpec'

export function level1(): LevelSpec {
  return {
    meta: {
      width: 7,
      height: 5,
      text: 'A goro is a spirit, they need food to evolve.',
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
