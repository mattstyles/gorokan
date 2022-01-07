import type {IWorld} from 'bitecs'
import type {Point} from 'mathutil'

import {addEntity, addComponent} from 'bitecs'

import {Renderable} from '../components/renderable'
import {Sprite} from '../components/sprite'
import {Texture} from '../components/texture'
import {Position} from '../components/position'
import {Pushable} from '../components/pushable'
import {Collider} from '../components/collider'
import {Consumable} from '../components/consumable'

type FoodProps = {
  world: IWorld
  position: Point
  texture: number
}
export function createFood({position, texture, world}: FoodProps) {
  const entity = addEntity(world)

  addComponent(world, Renderable, entity)
  addComponent(world, Sprite, entity)

  addComponent(world, Texture, entity)
  Texture.id[entity] = texture

  addComponent(world, Position, entity)
  Position.x[entity] = position.x
  Position.y[entity] = position.y

  addComponent(world, Collider, entity)
  addComponent(world, Consumable, entity)
  addComponent(world, Pushable, entity)

  return entity
}
