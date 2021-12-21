import * as React from 'react'
import {useRef, useEffect} from 'react'

type CanvasProps = {
  onReady: ({canvas}: {canvas: HTMLCanvasElement}) => () => void
}
export function Canvas({onReady}: CanvasProps) {
  const canvasRef = useRef(null)
  useEffect(() => {
    if (canvasRef == null) {
      return
    }
    return onReady({
      canvas: canvasRef.current,
    })
  }, [canvasRef])

  return <canvas ref={canvasRef}></canvas>
}
