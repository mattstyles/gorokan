import cx from 'clsx'
import * as React from 'react'

import * as styles from './spacer.module.css'

enum Space {
  small,
  medium,
  large,
}

enum Direction {
  horizontal,
  vertical,
}

type SpacerProps = {
  space: Space
  direction?: Direction
}
export function Spacer({space, direction = Direction.vertical}: SpacerProps) {
  return (
    <div
      className={cx(
        space === Space.small &&
          direction === Direction.horizontal &&
          styles['h-small'],
        space === Space.medium &&
          direction === Direction.horizontal &&
          styles['h-medium'],
        space === Space.large &&
          direction === Direction.horizontal &&
          styles['h-large'],

        space === Space.small &&
          direction === Direction.vertical &&
          styles['v-small'],
        space === Space.medium &&
          direction === Direction.vertical &&
          styles['v-medium'],
        space === Space.large &&
          direction === Direction.vertical &&
          styles['v-large']
      )}
    ></div>
  )
}

Spacer.space = Space
Spacer.direction = Direction
