import * as React from 'react'
import {Application, Container} from 'pixi.js'
import {Camera} from 'pixi-holga'
import {SpritePool} from 'pixi-spritepool'
import {Point} from 'mathutil'
import {ref} from 'valtio'

import {state} from '../state/main'
import {Canvas} from './canvas'
import {get} from '../goro/texture'

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

  state.app = ref(app)

  const container = new Container()
  container.position.set(10, 40)
  app.stage.addChild(container)

  const pool = SpritePool.of({
    length: 1e4,
    container: container,
  })

  const camera = Camera.of({
    position: Point.of(10, 10),
    fov: Point.of(16, 16),
    zoom: 4,
    projection: Point.of(10, 10),
  })

  console.log(camera)

  const sprite = pool.get(0)
  sprite.visible = true
  sprite.texture = get('goro-hungry')
  const position = Point.of(6, 6)
  const pos = camera.applyProjection(position)
  sprite.position.set(pos.x, pos.y)
  sprite.scale.set(camera.scale.x, camera.scale.y)

  return () => {
    app.destroy(true, {
      children: true,
    })
  }
}
