import { Canvas } from "./models/Canvas"
import ICore from "./interfaces/ICore"

export class Core implements ICore {
  canvas: Canvas = new Canvas()
  interval: NodeJS.Timeout | null = null

  printCanvas(): void {
    this.canvas.print()
  }

  printCanvasSize(): void {
    this.canvas.printSize()
  }

  runIntervalPrintCanvas(timeout: number = 16.66): void {
    this.interval = setInterval(() => {
      this.printCanvas()
      // this.printCanvasSize()
    }, timeout)
  }
}

import { Render } from "./models/Render"
export { Canvas, Render }