import type {System, IWorld} from 'bitecs'
import {defineSystem, defineQuery, enterQuery, removeComponent} from 'bitecs'
import {Point} from 'mathutil'

import {Tilemap, TileType} from '../tilemap'
import {Position, Movement} from '../components/position'
import {Pushable} from '../components/pushable'

type MovementProps = {
  tiles: Tilemap
}
export function createMovementSystem({tiles}: MovementProps): System {
  const pushableQuery = defineQuery([Pushable])
  const query = defineQuery([Movement, Position])
  const onEnter = enterQuery(query)

  return defineSystem(
    (world: IWorld): IWorld => {
      // Don't need an enter query, the process of adding the movement component
      // triggers this system. Not too advanced, but it'll work here.
      // const entering = onEnter(world)
      // for (let i = 0; i < entering.length; i++) {
      //   console.log('New movement event', entering.length)
      // }

      const entities = query(world)
      for (let i = 0; i < entities.length; i++) {
        const id = entities[i]

        // New position
        const pos = Point.of(
          Position.x[id] + Movement.x[id],
          Position.y[id] + Movement.y[id]
        )

        // Check tilemap collision
        const tile = tiles.get(pos.x, pos.y)

        // Bail on this movement event if the tilemap won't allow movement
        if (tile !== TileType.floor) {
          continue
        }

        // Check for collision with something pushable
        const pushables = pushableQuery(world)
        for (let i = 0; i < pushables.length; i++) {
          const pid = pushables[i]
          const targetPos = Point.of(Position.x[pid], Position.y[pid])

          if (pos.equals(targetPos)) {
            console.log('we have collision')
            // Need to check if the pushable can move

            // For now, as a test, lets bail, oh, well, we can't, we'll always
            // hit the perforeMovement bit, hmm? Some sort of queue and draining
            // should be the answer here
          }
        }

        // If we're good to go, then go
        if (tile === TileType.floor) {
          performMovement(id, pos, world)
        }
      }

      return world
    }
  )
}

function performMovement(id: number, position: Point, world: IWorld) {
  Position.x[id] = position.x
  Position.y[id] = position.y

  removeComponent(world, Movement, id)
}
