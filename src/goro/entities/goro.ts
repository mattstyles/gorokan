import type {IWorld} from 'bitecs'
import type {Point} from 'mathutil'

import {addEntity, addComponent} from 'bitecs'

import {Renderable} from '../components/renderable'
import {Sprite} from '../components/sprite'
import {Texture} from '../components/texture'
import {Position} from '../components/position'
import {Collider} from '../components/collider'
import {Consumer} from '../components/consumable'

type GoroProps = {
  world: IWorld
  position: Point
}
export function createGoro({position, world}: GoroProps) {
  const entity = addEntity(world)

  addComponent(world, Renderable, entity)
  addComponent(world, Sprite, entity)

  addComponent(world, Texture, entity)
  Texture.id[entity] = 0

  addComponent(world, Position, entity)
  Position.x[entity] = position.x
  Position.y[entity] = position.y

  addComponent(world, Collider, entity)
  addComponent(world, Consumer, entity)

  return entity
}
