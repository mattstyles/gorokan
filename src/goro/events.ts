import EventEmitter from 'eventemitter3'

export enum GlobalEventType {
  FeedGoro = 'feedGoro',
  TakeStep = 'takeStep',
}
export type GlobalEvent =
  | {
      type: GlobalEventType.FeedGoro
      payload?: null
    }
  | {
      type: GlobalEventType.TakeStep
      payload?: null
    }

const events = new EventEmitter()

// This makes it type safe across type and payload
export function emit(event: GlobalEvent) {
  events.emit(event.type, event?.payload ?? null)
}

// Ideally we want to type the callback to receive the shape of the payload for the specified type but I don't know how to do that with TS @TODO
export function subscribe(type: GlobalEventType, cb: any) {
  events.on(type, cb)
}
