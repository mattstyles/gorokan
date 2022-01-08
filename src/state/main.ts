import {proxy} from 'valtio'
import type {Application} from 'pixi.js'

export type MainState = {
  app: Application | null
  score: number
  goroToFeed: number
  steps: number
  currentLevel: number
  levelText: string
}

export const state = proxy<MainState>({
  app: null,
  score: 0,
  goroToFeed: 0,
  steps: 0,
  currentLevel: 2,
  levelText: '',
})
