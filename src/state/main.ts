import type {Application} from 'pixi.js'

import {proxy} from 'valtio'

import {GameState} from './gamestates'

export type MainState = {
  app: Application | null
  score: number
  goroToFeed: number
  steps: number
  currentLevel: number
  levelText: string
  gameState: GameState
}

export const state = proxy<MainState>({
  app: null,
  score: 0,
  goroToFeed: 0,
  steps: 0,
  currentLevel: 3,
  levelText: '',
  gameState: GameState.Menu,
})
