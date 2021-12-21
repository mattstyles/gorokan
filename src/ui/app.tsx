import * as React from 'react'
import {Application} from 'pixi.js'

import {state} from '../state/main'
import {Canvas} from './canvas'

export function App() {
  return <Canvas onReady={onReady} />
}

function onReady({canvas}: {canvas: HTMLCanvasElement}) {
  const app = new Application({
    resolution: window.devicePixelRatio,
    backgroundColor: 0x293042,
    antialias: true,
    autoDensity: true,
    resizeTo: window,
    view: canvas,
  })

  state.app = app

  return () => {
    app.destroy(true, {
      children: true,
    })
  }
}
