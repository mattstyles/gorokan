import type {IWorld} from 'bitecs'
import type {Point} from 'mathutil'

import {addEntity, addComponent} from 'bitecs'

import {Renderable} from '../components/renderable'
import {Sprite} from '../components/sprite'
import {Texture} from '../components/texture'
import {Position} from '../components/position'
import {Yuji} from '../components/types'

type YujiProps = {
  world: IWorld
  position: Point
}
export function createYuji({position, world}: YujiProps) {
  const entity = addEntity(world)

  addComponent(world, Yuji, entity)
  addComponent(world, Renderable, entity)
  addComponent(world, Sprite, entity)

  addComponent(world, Texture, entity)
  Texture.id[entity] = 1

  addComponent(world, Position, entity)
  Position.x[entity] = position.x
  Position.y[entity] = position.y

  return entity
}
