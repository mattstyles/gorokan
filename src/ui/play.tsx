import * as React from 'react'
import {useSnapshot} from 'valtio'

import {Canvas} from './canvas'
import {Page} from './page'
import {Spread} from './layout'
import {Spacer} from './spacer'
import {Text} from './text'
import {Gorokan} from '../goro/application'
import {state} from '../state/main'

export function Play() {
  const snap = useSnapshot(state)
  return (
    <Page>
      <Spacer space={Spacer.space.small} />
      <Text>Level: {snap.currentLevel}</Text>
      <Spread>
        <Text>Score: {snap.score}</Text>
        <Text>Steps: {snap.steps}</Text>
      </Spread>
      <Spacer space={Spacer.space.small} />
      <Canvas onReady={onReady} />
      <Spacer space={Spacer.space.small} />
      {snap.levelText.length && <Text>{snap.levelText}</Text>}
    </Page>
  )
}

function onReady({canvas}: {canvas: HTMLCanvasElement}) {
  const app = new Gorokan({canvas})

  return () => {
    app.release()
  }
}
