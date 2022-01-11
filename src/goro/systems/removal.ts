import type {System, IWorld} from 'bitecs'
import {defineSystem, defineQuery, removeEntity} from 'bitecs'

import {Destroy} from '../components/destroy'

export function createRemovalSystem(): System {
  const query = defineQuery([Destroy])

  return defineSystem(
    (world: IWorld): IWorld => {
      const removals = query(world)

      for (let i = 0; i < removals.length; i++) {
        const id = removals[i]

        removeEntity(world, id)
      }
      return world
    }
  )
}
