import * as React from 'react'
import {useSnapshot} from 'valtio'

import {Canvas} from './canvas'
import {Text} from './text'
import {Gorokan} from '../goro/application'
import {state} from '../state/main'

export function App() {
  const snap = useSnapshot(state)
  return (
    <>
      <div>
        <Text>Score: {snap.score}</Text>
      </div>
      <Canvas onReady={onReady} />
    </>
  )
}

function onReady({canvas}: {canvas: HTMLCanvasElement}) {
  const app = new Gorokan({canvas})

  return () => {
    app.release()
  }
}
