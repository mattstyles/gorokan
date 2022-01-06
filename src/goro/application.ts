import {Application, Container} from 'pixi.js'
import {Camera} from 'pixi-holga'
import {SpritePool} from 'pixi-spritepool'
import {Point} from 'mathutil'
import {ref} from 'valtio'
import {actions} from '@raid/streams/keys'
import {createWorld} from 'bitecs'

import {state} from '../state/main'
import {get} from './texture'
import {Tilemap} from './tilemap'
import {keyEvents} from './keyEvents'
import {createRenderingSystem} from './systems/rendering'
import {createGoro} from './entities/goro'

export class Gorokan {
  app: Application
  camera: Camera
  tilemap: Tilemap
  keyhandlerDispose: () => void

  constructor({canvas}: {canvas: HTMLCanvasElement}) {
    const tileSize = 30
    const textureSize = 10
    const tw = 32
    const th = 24
    const canvasWidth = tw * tileSize
    const canvasHeight = th * tileSize

    this.app = new Application({
      resolution: window.devicePixelRatio,
      backgroundColor: 0x293042,
      antialias: true,
      autoDensity: true,
      width: canvasWidth,
      height: canvasHeight,
      view: canvas,
    })

    state.app = ref(this.app)

    const container = new Container()
    this.app.stage.addChild(container)

    this.tilemap = new Tilemap({width: tw, height: th})
    this.tilemap.pool.attach(container)

    const zoom = tileSize / textureSize
    this.camera = Camera.of({
      position: Point.of(tw * 0.5, th * 0.5),
      fov: Point.of(tw * 0.5 * zoom, th * 0.5 * zoom),
      zoom: zoom,
      projection: Point.of(textureSize, textureSize),
    })

    this.app.ticker.add(this.render)

    this.keyhandlerDispose = keyEvents.observe((event) => {
      if (event.type === actions.keydown) {
        if (event.payload.key === '<left>') {
          console.log('lefty loosey')
        }
      }
    })

    const pool = SpritePool.of({
      length: 100,
      container: container,
    })

    const sprite = pool.get(0)
    sprite.visible = true
    sprite.texture = get('goro-hungry')
    const position = Point.of(0, 0)
    const pos = this.camera.applyProjection(position)
    sprite.position.set(pos.x, pos.y)
    sprite.scale.set(this.camera.scale.x, this.camera.scale.y)

    const renderingSystem = createRenderingSystem({
      camera: this.camera,
      container,
    })

    const world = createWorld()

    const goro = createGoro({position: Point.of(2, 2), world: world})

    renderingSystem(world)
  }

  release() {
    this.app.destroy(true, {
      children: true,
    })
    this.keyhandlerDispose()
  }

  render = () => {
    this.tilemap.renderMap((x, y, _, sprite) => {
      const projection = this.camera.applyProjection(Point.of(x, y))
      sprite.position.set(projection.x, projection.y)
      sprite.scale.set(this.camera.scale.x, this.camera.scale.y)
    })
  }
}
