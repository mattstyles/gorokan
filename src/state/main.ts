import {proxy} from 'valtio'
import type {Application} from 'pixi.js'

export type MainState = {
  app: Application | null
  score: number
  goroToFeed: number
}

export const state = proxy<MainState>({
  app: null,
  score: 0,
  goroToFeed: 0,
})
