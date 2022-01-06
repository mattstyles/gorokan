import {Types, defineComponent} from 'bitecs'

export const Position = defineComponent({
  x: Types.i16,
  y: Types.i16,
})

export const Movement = defineComponent({
  x: Types.i8,
  y: Types.i8,
})
