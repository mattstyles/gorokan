import * as React from 'react'

import {Canvas} from './canvas'
import {Gorokan} from '../goro/application'

export function App() {
  return <Canvas onReady={onReady} />
}

function onReady({canvas}: {canvas: HTMLCanvasElement}) {
  const app = new Gorokan({canvas})

  return () => {
    app.release()
  }
}
