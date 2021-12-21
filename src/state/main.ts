import {proxy} from 'valtio'
import type {Application} from 'pixi.js'

export type MainState = {
  app: Application | null
}

export const state = proxy<MainState>({
  app: null,
})
