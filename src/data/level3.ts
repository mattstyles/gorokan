import {LevelSpec} from './levelSpec'

export function level3(): LevelSpec {
  return {
    meta: {
      width: 9,
      height: 9,
      text: 'You can only push one thing at a time.',
    },
    // prettier-ignore
    tiles: [
      0, 0, 0, 0, 0, 1, 1, 1, 1,
      0, 1, 1, 1, 1, 1, 2, 2, 1,
      0, 1, 2, 2, 2, 2, 2, 2, 1,
      0, 1, 2, 2, 1, 1, 2, 2, 1,
      1, 1, 1, 2, 1, 1, 2, 2, 1,
      1, 2, 2, 2, 1, 1, 1, 2, 1,
      1, 3, 2, 4, 5, 15, 1, 15, 1,
      1, 2, 2, 2, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 0, 0, 0, 0
    ]
  }
}
