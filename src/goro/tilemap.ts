import type {Texture} from 'pixi.js'
import {Sprite} from 'pixi.js'
import {Rect, clamp} from 'mathutil'
import {SpritePool} from 'pixi-spritepool'

import {get} from './texture'

export enum TileType {
  void = 0,
  wall = 1,
  floor = 2,
}

export type Tile = number
export type TileMapData = Tile[]
export type CreateMapDataFn = () => TileMapData

export class Tilemap {
  width: number
  height: number
  data: Tile[]
  pool: SpritePool

  constructor({
    width,
    height,
    createMapData,
  }: {
    width: number
    height: number
    createMapData: CreateMapDataFn
  }) {
    this.width = width
    this.height = height
    // this.data = generateDummyMap(width, height)
    this.data = createMapData()

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

  setTileData(tiles: TileMapData) {
    this.data = tiles
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
