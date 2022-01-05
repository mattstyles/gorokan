import {BaseTexture, Texture, Rectangle, SCALE_MODES} from 'pixi.js'

import img from '../assets/tiles.png'

const base = new BaseTexture(img)
base.scaleMode = SCALE_MODES.NEAREST
export const textures = new Map<string, Texture>()
const gridSize = 10
function getTexture(x: number, y: number): Texture {
  return new Texture(
    base,
    new Rectangle(x * gridSize, y * gridSize, gridSize, gridSize)
  )
}

export function get(name: string): Texture
export function get(name: number): Texture
export function get(name: string | number): Texture {
  if (typeof name === 'number') {
    name = getTextureById(name)
  }
  const texture = textures.get(name)

  if (texture == null) {
    throw new Error(`Unrecognised texture name: ${name}`)
  }

  return texture
}

const map = [
  'goro-hungry',
  'goro-free',
  'food-0',
  'food-1',
  'food-2',
  'food-3',
  'food-4',
  'food-5',
  'food-6',
  'food-7',
  'food-8',
  'food-9',
  'wall',
  'floor-1',
  'floor-2',
  'floor-red-1',
  'floor-red-2',
]
function getTextureById(id: number): string {
  return map[id]
}

textures.set('goro-hungry', getTexture(0, 0))
textures.set('goro-free', getTexture(1, 0))

new Array(10)
  .fill('food-')
  .map((v, i) => v + i)
  .map((name, i) => {
    textures.set(name, getTexture(i, 1))
  })

textures.set('wall', getTexture(0, 2))
textures.set('floor-1', getTexture(0, 3))
textures.set('floor-2', getTexture(1, 3))
textures.set('floor-red-1', getTexture(2, 3))
textures.set('floor-red-2', getTexture(3, 3))
