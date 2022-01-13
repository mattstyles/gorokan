import * as React from 'react'

import styles from './image.module.css'

const scaleFactor = 10

type ImageProps = {
  size: number
  ux: number
  uy: number
  src: string
}
export function Image({size, ux, uy, src}: ImageProps) {
  return (
    <div className={styles.container} style={{width: size, height: size}}>
      <div
        className={styles.image}
        style={{
          background: `url(${src}) -${ux * 10}px -${uy * 10}px`,
          transform: `scale(${size / scaleFactor})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  )
}
