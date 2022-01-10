import * as React from 'react'
import cx from 'clsx'

import styles from './grid.module.css'

export enum GridGap {
  small,
  medium,
  large,
}

export enum GridColumns {
  three,
  five,
  ten,
}

type GridProps = {
  children: React.ReactNode
  gap?: GridGap
  columns?: GridColumns
}

export function Grid({
  gap = GridGap.medium,
  columns = GridColumns.five,
  children,
}: GridProps) {
  return (
    <div
      className={cx(
        styles.grid,
        gap === GridGap.small && styles['grid-gap-small'],
        gap === GridGap.medium && styles['grid-gap-medium'],
        gap === GridGap.large && styles['grid-gap-large'],
        columns === GridColumns.three && styles['grid-col-3'],
        columns === GridColumns.five && styles['grid-col-5'],
        columns === GridColumns.ten && styles['grid-col-10']
      )}
    >
      {children}
    </div>
  )
}

Grid.Gap = GridGap
Grid.Columns = GridColumns
