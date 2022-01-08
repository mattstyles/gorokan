import type {IWorld} from 'bitecs'
import type {Tile, TileMapData} from './tilemap'
import type {LevelSpec} from '../data/levelSpec'

import {Point} from 'mathutil'

import {TileType} from './tilemap'
import {createGoro} from './entities/goro'
import {createFood} from './entities/food'

import {level1} from '../data/root'

const width = 32
const height = 24

type LevelInput = {
  level: number
}
type LevelOutput = {
  genTiles: () => TileMapData
  genEntities: (world: IWorld) => void
  startPosition: Point
  goros: number
}
export function getLevelData({level}: LevelInput): LevelOutput {
  const spec = getLevel(level)

  const fullLevelData = padLevel({
    lw: spec.meta.width,
    lh: spec.meta.height,
    tiles: spec.tiles,
  })
  const entityData = generateEntityData(fullLevelData)

  const startPosition = entityData.find((entity) => entity.type === 3)
  let numGoro = 0
  entityData.forEach((entity) => {
    if (entity.type === 15) {
      numGoro = numGoro + 1
    }
  })

  return {
    // genTiles: () => generateDummyMap(),
    genTiles: () => {
      return convertLevel(fullLevelData)
    },

    genEntities: (world) => {
      entityData.forEach((entity) => {
        // We've encoded start position as an entity, so ignore it
        if (entity.type === 3) {
          return
        }

        // Goro
        if (entity.type === 15) {
          createGoro({position: entity.position, world: world})
          return
        }

        // Double check on food numbers
        if (entity.type >= 4 && entity.type <= 14) {
          createFood({
            position: entity.position,
            texture: entity.texture,
            world: world,
          })
        }
      })
    },
    startPosition: startPosition.position,
    goros: numGoro,
  }
}

function getLevel(level: number): LevelSpec {
  const levels = [level1]

  const levelSpec = levels[level - 1]()

  if (levelSpec == null) {
    throw new Error('Can not load level')
  }

  return levelSpec
}

// function generateDummyMap(): TileMapData {
//   const data: Tile[] = []
//   for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       // Perimeter wall
//       if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
//         data.push(TileType.wall)
//         continue
//       }
//
//       // Open section for testing
//       if (x > 0 && x < 12 && y > 0 && y < 8) {
//         data.push(TileType.floor)
//         continue
//       }
//
//       // if (Math.random() > 0.85) {
//       //   data.push(TileType.void)
//       //   continue
//       // }
//
//       data.push(Math.random() > 0.75 ? TileType.floor : TileType.wall)
//     }
//   }
//   return data
// }

type PadLevelInput = {
  lw: number
  lh: number
  tiles: LevelSpec['tiles']
}
function padLevel({lw, lh, tiles}: PadLevelInput): LevelSpec['tiles'] {
  const output = new Array(width * height).fill(0)
  const padH = (width - lw) / 2
  const padV = (height - lh) / 2
  const padLeft = padH % 2 === 0 ? padH : padH - 0.5
  const padTop = padV % 2 === 0 ? padV : padV - 0.5

  for (let y = 0; y < lh; y++) {
    for (let x = 0; x < lw; x++) {
      let xx = x + padLeft
      let yy = y + padTop
      output[xx + yy * width] = get2d(lw, x, y, tiles)
    }
  }

  return output
}

function get2d(w: number, x: number, y: number, data: number[]): number {
  return data[x + y * w]
}

// Converts from level data to tilemap data
function convertLevel(tiles: LevelSpec['tiles']): Tile[] {
  return tiles.map((tile) => {
    switch (tile) {
      // Void
      case 0:
        return TileType.void
      // Wall
      case 1:
        return TileType.wall
      // Anything else is floor
      default:
        return TileType.floor
    }
  })
}

type EntityData = {
  type: number
  position: Point
  texture?: number
}
// Assumes a full padded grid
function generateEntityData(tiles: LevelSpec['tiles']): EntityData[] {
  const entities = []
  tiles.forEach((tile, index) => {
    // Ditch void, floor, wall
    if (tile <= 2) {
      return
    }

    entities.push({
      type: tile,
      position: Point.of(index % width, (index / width) | 1),
      texture: tile - 2,
    })
  })

  return entities
}
