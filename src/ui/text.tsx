import * as React from 'react'
import cx from 'clsx'

import styles from './text.module.css'

type TextProps = {
  align?: 'center'
  children: React.ReactNode
}
export function Text({children, align}: TextProps) {
  return (
    <div className={cx(styles.text, align === 'center' && styles.center)}>
      {children}
    </div>
  )
}
