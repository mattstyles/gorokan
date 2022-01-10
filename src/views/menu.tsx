import * as React from 'react'

import {LevelSelect} from '../ui/levelSelect'
import {Heading} from '../ui/heading'
import {Text} from '../ui/text'
import {Page} from '../ui/page'
import {Spacer} from '../ui/spacer'

export function Menu() {
  return (
    <Page>
      <Spacer space={Spacer.space.large} />
      <Spacer space={Spacer.space.large} />
      <Spacer space={Spacer.space.large} />
      <Heading>Gorokan</Heading>
      <Spacer space={Spacer.space.large} />
      <Spacer space={Spacer.space.large} />
      <Text align='center'>Level select</Text>
      <Spacer space={Spacer.space.large} />
      <LevelSelect end={10} />
    </Page>
  )
}
