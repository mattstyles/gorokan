import type {Application} from 'pixi.js'

import {proxy} from 'valtio'

import {GameState} from './gamestates'

export type StepsPerLevel = number
export type MainState = {
  app: Application | null
  score: number
  goroToFeed: number
  steps: number
  currentLevel: number
  levelText: string
  gameState: GameState
  showLevelWinModal: boolean
  levelProgress: StepsPerLevel[]
  totalNumLevels: number
}

export const state = proxy<MainState>({
  app: null,
  score: 0,
  goroToFeed: 0,
  steps: 0,
  currentLevel: 0,
  levelText: '',
  gameState: GameState.Menu,
  showLevelWinModal: false,
  totalNumLevels: 10,
  levelProgress: new Array(10).fill(0),
})
