import type {Container} from 'pixi.js'
import type {Camera} from 'pixi-holga'
import type {IWorld, System} from 'bitecs'
import {defineQuery, enterQuery, exitQuery, defineSystem} from 'bitecs'
import {Point} from 'mathutil'

import {SpritePool} from '../pool'
import {get} from '../texture'
import {Renderable} from '../components/renderable'
import {Sprite} from '../components/sprite'
import {Texture} from '../components/texture'
import {Position} from '../components/position'

type RenderingProps = {
  container: Container
  camera: Camera
}
export function createRenderingSystem({
  container,
  camera,
}: RenderingProps): System {
  const pool = new SpritePool({length: 1e4})

  const query = defineQuery([Renderable, Sprite, Texture, Position])
  const onEnter = enterQuery(query)
  const onExit = exitQuery(query)

  return defineSystem(
    (world: IWorld): IWorld => {
      const entering = onEnter(world)
      for (let i = 0; i < entering.length; i++) {
        const entity = entering[i]
        const {id, sprite} = pool.get()
        Sprite.id[entity] = id
        sprite.visible = true
        sprite.texture = get(Texture.id[entity])
        container.addChild(sprite)
      }

      const exiting = onExit(world)
      for (let i = 0; i < exiting.length; i++) {
        const id = exiting[i]
        const spriteId = Sprite.id[id]
        const sprite = pool.find(spriteId)
        pool.release(spriteId)
        container.removeChild(sprite)
      }

      const entities = query(world)
      for (let i = 0; i < entities.length; i++) {
        const id = entities[i]
        const spriteId = Sprite.id[id]
        const sprite = pool.find(spriteId)

        const projection = camera.applyProjection(
          Point.of(Position.x[id], Position.y[id])
        )
        sprite.position.set(projection.x, projection.y)
        sprite.scale.set(camera.scale.x, camera.scale.y)
        sprite.texture = get(Texture.id[id])
      }

      return world
    }
  )
}
