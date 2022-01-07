import type {IWorld, System} from 'bitecs'

import {Application, Container} from 'pixi.js'
import {Camera} from 'pixi-holga'
import {Point} from 'mathutil'
import {ref} from 'valtio'
import {actions} from '@raid/streams/keys'
import {createWorld, addComponent} from 'bitecs'

import {state} from '../state/main'
import {Tilemap} from './tilemap'
import {keyEvents} from './keyEvents'
import {createRenderingSystem} from './systems/rendering'
import {createMovementSystem} from './systems/movement'
import {createGoro} from './entities/goro'
import {createYuji} from './entities/yuji'
import {createFood} from './entities/food'
import {Movement} from './components/position'

export class Gorokan {
  app: Application
  camera: Camera
  tilemap: Tilemap
  cleanup: Set<() => void> = new Set()
  world: IWorld
  systems: Map<string, System> = new Map()

  constructor({canvas}: {canvas: HTMLCanvasElement}) {
    const tileSize = 30
    const textureSize = 10
    const tw = 32
    const th = 24
    const canvasWidth = tw * tileSize
    const canvasHeight = th * tileSize

    /**
     * Staging (screen)
     */
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
    this.cleanup.add(() => {
      console.log('disposing app')
      this.app.destroy(true, {
        children: true,
      })
    })

    const container = new Container()
    this.app.stage.addChild(container)

    /**
     * Tilemap representation
     */
    this.tilemap = new Tilemap({width: tw, height: th})
    this.tilemap.pool.attach(container)

    /**
     * Camera
     */
    const zoom = tileSize / textureSize
    this.camera = Camera.of({
      position: Point.of(tw * 0.5, th * 0.5),
      fov: Point.of(tw * 0.5 * zoom, th * 0.5 * zoom),
      zoom: zoom,
      projection: Point.of(textureSize, textureSize),
    })

    /**
     * ECS
     */
    this.world = createWorld()

    createGoro({position: Point.of(1, 1), world: this.world})
    const yuji = createYuji({position: Point.of(4, 4), world: this.world})
    createFood({position: Point.of(5, 4), texture: 2, world: this.world})
    createFood({position: Point.of(8, 4), texture: 5, world: this.world})

    this.systems.set(
      'rendering',
      createRenderingSystem({
        camera: this.camera,
        container,
      })
    )

    const movementSystem = createMovementSystem({tiles: this.tilemap})

    /**
     * Events
     */
    this.app.ticker.add(this.render)

    /**
     * Input
     */
    const dispose = keyEvents.observe((event) => {
      if (event.type === actions.keydown) {
        if (event.payload.key === '<left>') {
          addComponent(this.world, Movement, yuji)
          Movement.x[yuji] = -1
          Movement.y[yuji] = 0
          movementSystem(this.world)
        }

        if (event.payload.key === '<right>') {
          addComponent(this.world, Movement, yuji)
          Movement.x[yuji] = 1
          Movement.y[yuji] = 0
          movementSystem(this.world)
        }

        if (event.payload.key === '<up>') {
          addComponent(this.world, Movement, yuji)
          Movement.x[yuji] = 0
          Movement.y[yuji] = -1
          movementSystem(this.world)
        }

        if (event.payload.key === '<down>') {
          addComponent(this.world, Movement, yuji)
          Movement.x[yuji] = 0
          Movement.y[yuji] = 1
          movementSystem(this.world)
        }
      }
    })
    this.cleanup.add(dispose)
  }

  /**
   * Cleanup for the main class
   */
  release() {
    this.cleanup.forEach((fn) => fn())
  }

  /**
   * Render function
   */
  render = () => {
    // Render tilemap
    this.tilemap.renderMap((x, y, _, sprite) => {
      const projection = this.camera.applyProjection(Point.of(x, y))
      sprite.position.set(projection.x, projection.y)
      sprite.scale.set(this.camera.scale.x, this.camera.scale.y)
    })

    // Render ECS
    this.systems.get('rendering')(this.world)
  }
}
