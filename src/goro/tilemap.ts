import type {Texture} from 'pixi.js'
import {Sprite} from 'pixi.js'
import {Rect, clamp} from 'mathutil'
import {SpritePool} from 'pixi-spritepool'

import {get} from './texture'

enum TileType {
  void = 0,
  wall = 1,
  floor = 2,
}

type Tile = number

export class Tilemap {
  width: number
  height: number
  data: Tile[]
  pool: SpritePool

  constructor({width, height}: {width: number; height: number}) {
    this.width = width
    this.height = height
    this.data = generateDummyMap(width, height)

    // For now the map is always entirely in view
    this.pool = SpritePool.of({
      length: width * height,
      onCreateItem: () => {
        const sprite = new Sprite()
        sprite.visible = true
        return sprite
      },
    })
  }

  // Helper to render the entire map
  renderMap(
    cb: (x: number, y: number, tile: TileType, sprite: Sprite) => void
  ) {
    let count = 0
    this.iterate((x, y, tile) => {
      const sprite = this.pool.get(count)
      const texture = getTileTexture(tile)
      sprite.texture = texture
      cb(x, y, tile, sprite)
      count = count + 1
    })
  }

  get(x: number, y: number): TileType {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      // error or just a void tile?
      return TileType.void
    }

    return this.data[y * this.width + x]
  }

  iterate(cb: (x: number, y: number, tile: TileType) => void, region?: Rect) {
    if (region == null) {
      region = Rect.of(0, 0, this.width, this.height)
    }

    const startX = clamp(0, this.width, region.pos[0])
    const endX = clamp(0, this.width, region.pos[2])
    const startY = clamp(0, this.height, region.pos[1])
    const endY = clamp(0, this.height, region.pos[3])

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        cb(x, y, this.get(x, y))
      }
    }
  }
}

function getTileTexture(tile: TileType): Texture {
  switch (tile) {
    case TileType.void:
      return null
    case TileType.floor:
      return get('floor-1')
    case TileType.wall:
      return get('wall')
  }
}

function generateDummyMap(width: number, height: number) {
  const data: Tile[] = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
        data.push(TileType.wall)
        continue
      }

      if (Math.random() > 0.85) {
        data.push(TileType.void)
        continue
      }

      data.push(Math.random() > 0.75 ? TileType.floor : TileType.wall)
    }
  }
  return data
}
