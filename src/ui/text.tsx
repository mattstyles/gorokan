import * as React from 'react'

import styles from './text.module.css'

type TextProps = {
  children: React.ReactNode
}
export function Text({children}: TextProps) {
  return <div className={styles.text}>{children}</div>
}
