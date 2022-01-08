import {LevelSpec} from './levelSpec'

export function level2(): LevelSpec {
  return {
    meta: {
      width: 9,
      height: 9,
      text: 'Help every goro to evolve to progress.',
    },
    // prettier-ignore
    tiles: [
      0, 0, 0, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 1, 15, 1, 0, 0, 0,
      0, 0, 1, 1, 6, 1, 1, 0, 0,
      1, 1, 1, 2, 2, 2, 1, 1, 1,
      1, 15, 4, 2, 3, 2, 5, 15, 1,
      1, 1, 1, 2, 2, 2, 1, 1, 1,
      0, 0, 1, 1, 8, 1, 1, 0, 0,
      0, 0, 0, 1, 15, 1, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 0, 0, 0,
    ]
  }
}
