import type {StepsPerLevel} from '../state/main'

import * as React from 'react'
import {Dialog} from '@reach/dialog'
import {useSnapshot} from 'valtio'

import styles from './winModal.module.css'
import {state} from '../state/main'
import {Heading} from './heading'
import {Spacer} from './spacer'
import {LevelSelect} from './levelSelect'

export function WinModal() {
  const snap = useSnapshot(state)
  const onDismiss = () => {
    state.showLevelWinModal = false
  }
  const isComplete = areAllLevelsComplete(snap.levelProgress)

  return (
    <Dialog isOpen aria-labelledby='win' className={styles.dialog}>
      <div id='win'>
        <Heading>Gorokan!</Heading>
      </div>
      <Spacer space={Spacer.space.large} />
      <LevelSelect end={10} onSelect={onDismiss} />
      {isComplete && (
        <>
          <Spacer space={Spacer.space.large} />
          <Heading>Well done!</Heading>
          <Spacer space={Spacer.space.small} />
        </>
      )}
    </Dialog>
  )
}

function areAllLevelsComplete(levels: StepsPerLevel[]): boolean {
  let i = levels.length
  while (i-- >= 0) {
    if (levels[i] === 0) {
      return false
    }
  }

  return true
}
