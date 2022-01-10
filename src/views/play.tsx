import * as React from 'react'
import {useSnapshot} from 'valtio'

import {Canvas} from '../ui/canvas'
import {Page} from '../ui/page'
import {Spread} from '../ui/layout'
import {Spacer} from '../ui/spacer'
import {Text} from '../ui/text'
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
