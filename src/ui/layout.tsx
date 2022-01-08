import * as React from 'react'

import styles from './layout.module.css'

type SpreadProps = {
  children: React.ReactNode
}
export function Spread({children}: SpreadProps) {
  return <div className={styles.spread}>{children}</div>
}
