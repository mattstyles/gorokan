import {Sprite} from 'pixi.js'

/**
 * Reusable sprites, to avoid GC thrashing, go careful though with resetting
 * state between use.
 */
export class SpritePool {
  used: Map<number, Sprite>
  pool: Sprite[]
  count: number = 0

  constructor({length = 10}: {length?: number} = {}) {
    this.pool = new Array(length).fill(null).map(() => {
      return new Sprite()
    })
    this.used = new Map()
  }

  get(): null | {sprite: Sprite; id: number} {
    if (this.pool.length <= 0) {
      return null
    }

    const sprite = this.pool.pop()
    const id = this.count
    this.count = this.count + 1
    this.used.set(id, sprite)
    return {
      id,
      sprite,
    }
  }

  release(id: number): boolean {
    if (!this.used.has(id)) {
      return false
    }

    const sprite = this.used.get(id)
    sprite.visible = false
    sprite.texture = null
    this.pool.push(sprite)
    return true
  }
}
