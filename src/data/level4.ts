import {LevelSpec} from './levelSpec'

export function level4(): LevelSpec {
  return {
    meta: {
      width: 9,
      height: 9,
      text:
        'Goros are water spirits that live in caves in the wetlands to the West.',
    },
    // prettier-ignore
    tiles: [
      1, 1, 1, 1, 1, 1, 1, 1, 0,
      1, 3, 10, 2, 15, 1, 15, 1, 0,
      1, 2, 2, 5, 1, 1, 2, 1, 1,
      1, 2, 4, 2, 1, 2, 9, 15, 1,
      1, 2, 1, 2, 1, 2, 2, 1, 1,
      1, 2, 1, 2, 1, 2, 2, 2, 1,
      1, 2, 2, 2, 2, 2, 2, 2, 1,
      1, 1, 1, 15, 1, 1, 2, 2, 1,
      0, 0, 1, 1, 1, 1, 1, 1, 1
    ]
  }
}
