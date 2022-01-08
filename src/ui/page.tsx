import * as React from 'react'

import styles from './page.module.css'

type PageProps = {
  children: React.ReactNode
}
export function Page({children}: PageProps) {
  return <div className={styles.container}>{children}</div>
}
