import { h } from 'vue'

const svgBase = (attrs) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '1.5',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  ...attrs,
})

export const RocketIcon = (_, { attrs }) => h('svg', svgBase(attrs), [
  h('path', { d: 'M12 2S8 5.5 8 11v1H6l-2 3h4v2.5l2 .5 2-.5V15h4l-2-3h-2v-1c0-5.5-2-9-2-9z' }),
  h('circle', { cx: '12', cy: '8.5', r: '1.5' }),
])

export const OrbitIcon = (_, { attrs }) => h('svg', svgBase(attrs), [
  h('circle', { cx: '12', cy: '12', r: '2.5' }),
  h('ellipse', { cx: '12', cy: '12', rx: '10', ry: '4', transform: 'rotate(-20 12 12)' }),
])

export const FlameIcon = (_, { attrs }) => h('svg', svgBase(attrs), [
  h('path', {
    d: 'M12 2.5c1.2 2.8-2.3 4.4-2.3 8a2.3 2.3 0 0 0 4.6 0c0-.8-.5-1.3-.5-1.3.9 2.2 2.7 3.3 2.7 6a4.5 4.5 0 0 1-9 0c0-4.6 2.8-6.8 3.6-9.2.3-1 .5-2.2.9-3.5z',
  }),
])

export const FlagIcon = (_, { attrs }) => h('svg', svgBase(attrs), [
  h('line', { x1: '5', y1: '3', x2: '5', y2: '21' }),
  h('path', { d: 'M5 4h13l-3 4 3 4H5' }),
])
