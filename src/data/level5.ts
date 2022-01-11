import {LevelSpec} from './levelSpec'

export function level5(): LevelSpec {
  return {
    meta: {
      width: 11,
      height: 13,
      text: 'An ancient story tells of how Goros came to live in our world.',
    },
    // prettier-ignore
    tiles: [
      0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
      0, 0, 1, 15, 1, 15, 1, 0, 0, 0, 0,
      0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0,
      0, 0, 1, 2, 3, 2, 1, 1, 1, 0, 0,
      0, 0, 1, 7, 8, 6, 9, 2, 1, 0, 0,
      0, 0, 1, 2, 1, 2, 1, 2, 1, 0, 0,
      0, 0, 1, 2, 1, 2, 1, 2, 1, 0, 0,
      1, 1, 1, 2, 1, 2, 1, 2, 1, 0, 0,
      1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1,
      1, 2, 1, 2, 2, 2, 2, 2, 2, 15, 1,
      1, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1,
      1, 2, 2, 2, 2, 2, 15, 1, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0
    ]
  }
}
