import * as React from 'react'
import {Dialog} from '@reach/dialog'

import styles from './winModal.module.css'
import {state} from '../state/main'
import {Heading} from './heading'
import {Spacer} from './spacer'
import {LevelSelect} from './levelSelect'

export function WinModal() {
  const onDismiss = () => {
    state.showLevelWinModal = false
  }
  return (
    <Dialog isOpen aria-labelledby='win' className={styles.dialog}>
      <div id='win'>
        <Heading>Gorokan!</Heading>
      </div>
      <Spacer space={Spacer.space.large} />
      <LevelSelect end={10} onSelect={onDismiss} />
    </Dialog>
  )
}
