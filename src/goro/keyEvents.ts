/**
 * Key Events are a global singleton for responding to key events
 */

import {keys} from '@raid/streams/keys'

class Stack<T> {
  data: T[] = []

  push(item: T) {
    this.data.unshift(item)
  }

  pop(): T {
    return this.data.shift()
  }

  get(): T | null {
    return this.data[0] ?? null
  }
}

type Observer = (event: any) => void
class KeyEvents {
  observers: Stack<Observer> = new Stack()
  stream: any

  constructor() {
    this.stream = keys()

    this.stream.observe((event) => {
      const observer = this.observers.get()
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
