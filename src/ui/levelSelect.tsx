import * as React from 'react'
import {useState, useMemo, useEffect} from 'react'
import cx from 'clsx'
import {actions} from '@raid/streams/keys'
import {useSnapshot} from 'valtio'

import type {GridColumns} from './grid'

import styles from './levelSelect.module.css'
import tiles from '../assets/tiles.png'
import {Grid} from './grid'
import {Text} from './text'
import {Image} from './image'
import {keyEvents} from '../goro/keyEvents'
import {state} from '../state/main'
import {GameState} from '../state/gamestates'

type LevelSelectProps = {
  start?: number
  width?: GridColumns
  onSelect?: (newLevel: number) => void
  end: number
}
export function LevelSelect({
  start = 1,
  width = Grid.Columns.five,
  onSelect = () => {},
  end,
}: LevelSelectProps) {
  const snap = useSnapshot(state)
  const {index: currentIndex, onAction} = useKeys({
    width: 5,
    total: end - start,
    initial: snap.currentLevel,
  })
  useEffect(() => {
    if (onAction) {
      state.currentLevel = currentIndex + start
      state.gameState = GameState.Game
      onSelect(state.currentLevel)
    }
  }, [onAction])
  const children = useMemo(() => {
    return new Array(end + 1 - start).fill(null).map((_, index) => {
      return (
        <button
          autoFocus={false}
          key={index}
          onClick={() => {
            state.currentLevel = index + start
            state.gameState = GameState.Game
            onSelect(state.currentLevel)
          }}
          className={cx(
            styles.reset,
            styles.select,
            index === currentIndex && styles['select-focus']
          )}
        >
          {snap.levelProgress[index + start] > 0 ? (
            <Image size={25} ux={1} uy={0} src={tiles} />
          ) : (
            <Text>{start + index}</Text>
          )}
        </button>
      )
    })
  }, [start, end, currentIndex])

  return (
    <Grid gap={Grid.Gap.large} columns={width}>
      {children}
    </Grid>
  )
}

type KeyInput = {width: number; total: number; initial: number}
function useKeys({width, total, initial}: KeyInput) {
  const [index, setIndex] = useState(initial)
  const [onAction, setOnAction] = useState(false)
  useEffect(() => {
    return keyEvents.observe((event) => {
      if (event.type === actions.keydown) {
        if (event.payload.key === '<left>') {
          if (index % width !== 0) {
            setIndex(index - 1)
          }
        }
        if (event.payload.key === '<right>') {
          if ((index + 1) % width !== 0) {
            setIndex(index + 1)
          }
        }
        if (event.payload.key === '<up>') {
          if (index > width - 1) {
            setIndex(index - width)
          }
        }
        if (event.payload.key === '<down>') {
          if (index <= total - width) {
            setIndex(index + width)
          }
        }

        if (
          event.payload.key === '<space>' ||
          event.payload.key === '<enter>'
        ) {
          setOnAction(true)
        }
      }
    })
  }, [width, index])

  return {index, onAction}
}
