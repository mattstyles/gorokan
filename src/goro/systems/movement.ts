import type {System, IWorld} from 'bitecs'
import {defineSystem, defineQuery, removeComponent, hasComponent} from 'bitecs'
import {Point} from 'mathutil'

import {Queue} from '../list'
import {Tilemap, TileType} from '../tilemap'
import {Position, Movement} from '../components/position'
import {Collider} from '../components/collider'
import {Pushable} from '../components/pushable'
import {Yuji} from '../components/types'
import {Consumable, Consumer} from '../components/consumable'

enum EventTypes {
  Push,
  Consume,
}
type Eid = number
type GenericCollisionEvent = {
  type: 'Collision'
  payload: {
    origin: Eid
    target: Eid
  }
}
type CollisionEvent =
  | {
      type: EventTypes.Push
      payload: {
        origin: Eid
        target: Eid
        movement: Point
      }
    }
  | {
      type: EventTypes.Consume
      payload: {
        origin: Eid
        target: Eid
      }
    }

type MovementProps = {
  tiles: Tilemap
}
export function createMovementSystem({tiles}: MovementProps): System {
  const collideQuery = defineQuery([Collider])
  const query = defineQuery([Movement, Position])

  return defineSystem(
    (world: IWorld): IWorld => {
      const collisions = new Queue<GenericCollisionEvent>()

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
        const colliders = collideQuery(world)
        let hasCollided = false
        for (let i = 0; i < colliders.length; i++) {
          const pid = colliders[i]
          const targetPos = Point.of(Position.x[pid], Position.y[pid])

          if (pos.equals(targetPos)) {
            // Generate collision event
            collisions.push({
              type: 'Collision',
              payload: {
                origin: id,
                target: pid,
              },
            })
            hasCollided = true
          }
        }

        // If we're good to go, then go
        if (!hasCollided) {
          performMovement(id, pos, world)
        }
      }

      // Drain the collision queue
      const queue = refineCollisionQueue(collisions, world)
      drainCollisionQueue(queue, world, tiles)

      return world
    }
  )
}

function performMovement(entity: Eid, position: Point, world: IWorld) {
  Position.x[entity] = position.x
  Position.y[entity] = position.y

  removeComponent(world, Movement, entity)
}

// Match up entity types, for simplicity lets go brute force for now
function refineCollisionQueue(
  queue: Queue<GenericCollisionEvent>,
  world: IWorld
): Queue<CollisionEvent> {
  const refinedQueue = new Queue<CollisionEvent>()
  while (queue.peek() !== null) {
    const {
      payload: {origin, target},
    } = queue.pop()

    if (
      hasComponent(world, Yuji, origin) &&
      hasComponent(world, Pushable, target)
    ) {
      refinedQueue.push({
        type: EventTypes.Push,
        payload: {
          origin: origin,
          target: target,
          movement: Point.of(Movement.x[origin], Movement.y[origin]),
        },
      })

      continue
    }

    if (
      hasComponent(world, Consumer, origin) &&
      hasComponent(world, Consumable, target)
    ) {
      refinedQueue.push({
        type: EventTypes.Consume,
        payload: {
          origin: origin,
          target: target,
        },
      })
      continue
    }
  }
  return refinedQueue
}

function drainCollisionQueue(
  queue: Queue<CollisionEvent>,
  world: IWorld,
  tiles: Tilemap
) {
  while (queue.peek() !== null) {
    const event = queue.pop()
    switch (event.type) {
      case EventTypes.Push:
        handlePushEvent(event.payload, world, tiles)
        break

      case EventTypes.Consume:
        // Will currently never happen as we handle everything via push
        break
    }
  }
}

function handlePushEvent(
  payload: {origin: Eid; target: Eid; movement: Point},
  world: IWorld,
  tiles: Tilemap
) {
  const {origin, target, movement} = payload
  const pushPosition = Point.of(
    Position.x[target] + movement.x,
    Position.y[target] + movement.y
  )

  // Check for empty location at pushable target
  if (tiles.get(pushPosition.x, pushPosition.y) !== TileType.floor) {
    return null
  }

  // Check for collision with a consumer (we're kinda cheating here, as we know that the pushable is also a consumable)
  const query = defineQuery([Consumer])
  const entities = query(world)
  for (let i = 0; i < entities.length; i++) {
    const id = entities[i]
    const pos = Point.of(Position.x[id], Position.y[id])

    if (pos.equals(pushPosition)) {
      console.log('Pushed food into a Goro, yay')

      // @TODO handle removing Food, moving Yuji, updating the Goro
      return
    }
  }

  // Check for collision with anything else. What we should do is generate additional collisions, but, we don't really need to worry for our use case so we'll do it all manually.
  const collisionQuery = defineQuery([Collider])
  const collisions = collisionQuery(world)
  for (let i = 0; i < collisions.length; i++) {
    const id = collisions[i]
    const pos = Point.of(Position.x[id], Position.y[id])

    if (pos.equals(pushPosition)) {
      // We don't need to do anything, but we'll bail as no movement occurs
      return
    }
  }

  // If we got here then we'll all good to initiate the movement
  performMovement(target, pushPosition, world)
  performMovement(
    origin,
    Point.of(
      Position.x[origin] + Movement.x[origin],
      Position.y[origin] + Movement.y[origin]
    ),
    world
  )
}
