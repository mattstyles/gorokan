import * as React from 'react'
import {Application, Sprite} from 'pixi.js'

import {state} from '../state/main'
import {Canvas} from './canvas'
import {textures} from '../goro/texture'

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

  const sprite = new Sprite(textures.get('goro-free'))
  sprite.anchor.set(0.5, 0.5)
  sprite.position.set(20, 20)
  app.stage.addChild(sprite)
  sprite.scale.set(4, 4)

  return () => {
    app.destroy(true, {
      children: true,
    })
  }
}
