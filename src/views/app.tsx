import type {RouteProps} from 'tiny-component-router'

import * as React from 'react'
import {useSnapshot} from 'valtio'
import {TinyComponentRouter} from 'tiny-component-router'

import {Play} from './play'
import {Menu} from './menu'
import {state} from '../state/main'
import {GameState} from '../state/gamestates'

class Router extends TinyComponentRouter<GameState> {}

export function App() {
  const snap = useSnapshot(state)

  return (
    <Router match={snap.gameState}>
      <View match={GameState.Game}>
        <Play />
      </View>
      <View match={GameState.Menu}>
        <Menu />
      </View>
    </Router>
  )
}

interface ViewProps extends RouteProps<GameState> {
  children: React.ReactNode
}
function View({children}: ViewProps) {
  return <>{children}</>
}
