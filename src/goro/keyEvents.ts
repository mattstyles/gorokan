/**
 * Key Events are a global singleton for responding to key events
 */

import {keys} from '@raid/streams/keys'

import {Stack} from './list'

type Observer = (event: any) => void
class KeyEvents {
  observers: Stack<Observer> = new Stack()
  stream: any
  keys: Map<string, number>

  constructor() {
    this.keys = new Map<string, number>()
    this.stream = keys({keys: this.keys})

    this.stream.observe((event: any) => {
      const observer = this.observers.peek()
      observer(event)
    })
  }

  observe(observer: Observer): () => void {
    this.observers.push(observer)

    return () => {
      // @TODO fix this, this probably is not accurate enough
      this.observers.pop()
    }
  }
}

export const keyEvents = new KeyEvents()
