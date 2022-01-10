import * as React from 'react'
import {useState, useMemo, useEffect} from 'react'
import cx from 'clsx'
import {actions} from '@raid/streams/keys'

import type {GridColumns} from './grid'

import styles from './levelSelect.module.css'
import {Grid} from './grid'
import {Text} from './text'
import {keyEvents} from '../goro/keyEvents'
import {state} from '../state/main'
import {GameState} from '../state/gamestates'

type LevelSelectProps = {
  start?: number
  width?: GridColumns
  end: number
}
export function LevelSelect({
  start = 1,
  width = Grid.Columns.five,
  end,
}: LevelSelectProps) {
  const {index: currentIndex, onAction} = useKeys({
    width: 5,
    total: end - start,
  })
  useEffect(() => {
    if (onAction) {
      state.currentLevel = currentIndex + start
      state.gameState = GameState.Game
    }
  }, [onAction])
  const children = useMemo(() => {
    return new Array(end + 1 - start).fill(null).map((_, index) => {
      return (
        <button
          key={index}
          onClick={() => {
            state.currentLevel = index + start
            state.gameState = GameState.Game
          }}
          className={cx(
            styles.reset,
            styles.select,
            index === currentIndex && styles['select-focus']
          )}
        >
          <Text>{start + index}</Text>
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

function useKeys({width, total}: {width: number; total: number}) {
  const [index, setIndex] = useState(0)
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
  })

  return {index, onAction}
}
