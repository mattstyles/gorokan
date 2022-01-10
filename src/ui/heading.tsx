import * as React from 'react'

import styles from './heading.module.css'

export function Heading({children}: {children: React.ReactNode}) {
  return <h1 className={styles.heading}>{children}</h1>
}
