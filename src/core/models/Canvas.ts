import ICanvas from "../interfaces/ICanvas"
import CellCol from "./CellCol"
import CellRow from "./CellRow"

export enum CanvasCellAlignX {
  Left,
  Right, 
  Center
}

export enum CanvasCellAlignY {
  Top,
  Bottom,
  Center
}

export enum alignPaddingFormat {
  default,
  percent
}

export class Canvas implements ICanvas {
  private width: number = process.stdout.getWindowSize()[0]
  private height: number = process.stdout.getWindowSize()[1] - 1
  private canvas: CellRow[] = []

  constructor() {
    this.clearCanvas()
  }

  getCanvasSize(): number[] {
    return [this.width, this.height]
  }

  updateCanvasSize(): void {
    this.width = process.stdout.getWindowSize()[0]
    this.height = process.stdout.getWindowSize()[1] - 1
  }

  clearCanvas(): void {
    this.updateCanvasSize()

    this.canvas = []

    for (let index = 0; index < this.height; index++) {
      this.canvas.push(new CellRow())

      for (let index2 = 0; index2 < this.width; index2++) {
        this.canvas[index].value.push(new CellCol())
      }
    }
  }

  setCanvasCellValueAlign(alignX: CanvasCellAlignX, alignY: CanvasCellAlignY, value: string,
     alignXPadding: number = 0, alignXPaddingFormat: alignPaddingFormat = alignPaddingFormat.default, alignYPadding: number = 0, alignYPaddingFormat: alignPaddingFormat = alignPaddingFormat.default) {
    const result = { x: 0, y: 0, alignXPadding: 0, alignYPadding: 0 }

    switch (alignXPaddingFormat) {
      case alignPaddingFormat.default:
        result.alignXPadding = alignXPadding
        break
      case alignPaddingFormat.percent:
        result.alignXPadding = Math.round(parseFloat(alignXPadding > 9 ? "0." + alignXPadding : "0.0" + alignXPadding) * (this.width - value.length))
        break

      default: result.alignXPadding = alignXPadding
    }

    switch (alignYPaddingFormat) {
      case alignPaddingFormat.default:
        result.alignYPadding = alignYPadding
        break
      case alignPaddingFormat.percent:
        result.alignYPadding = Math.round(parseFloat(alignYPadding > 9 ? "0." + alignYPadding : "0.0" + alignYPadding) * (this.height - 1))
        break

      default: result.alignYPadding = alignYPadding
    }

    switch (alignX) {
      case CanvasCellAlignX.Center:
        result.x = Math.round((this.width - value.length) / 2)
        break
      case CanvasCellAlignX.Left:
        result.x = result.alignXPadding
        break
      case CanvasCellAlignX.Right:
        result.x = this.width - result.alignXPadding - value.length
        break
    
      default: result.x = result.alignXPadding; break
    }

    switch (alignY) {
      case CanvasCellAlignY.Center:
        result.y = Math.round(this.height / 2) - 1
        break
      case CanvasCellAlignY.Top:
        result.y = result.alignYPadding
        break
      case CanvasCellAlignY.Bottom:
        result.y = this.height - result.alignYPadding - 1
        break

      default: result.y = result.alignYPadding; break
    }

    this.setCanvasCellValue(result.x, result.y, value)
  }

  setCanvasCellValue(x: number, y: number, value: string): void {
    if (!value) return

    if (value.length == 1) {
      this.canvas[y].value[x].value = value

      return
    }

    if (value.length > 1) {
      const result = value.split("")

      result.forEach((valueSymbol, i) => {
        if (!this.canvas[y] || !this.canvas[y].value[x+i]) return

        this.canvas[y].value[x+i].value = valueSymbol
      })
    }
  }

  getCanvasStringCellArray(): Array<String[]> {
    const result: Array<String[]> = []

    this.canvas.forEach((cellRow: CellRow, i) => {
      result.push([])

      cellRow.value.forEach((cellCol: CellCol) => {
        result[i].push(cellCol.value)
      })
    })

    // result.pop()

    return result
  }

  getCanvasString(): string {
    let result: string = ""

    this.getCanvasStringCellArray().forEach((cellRow) => {
      result += "\n"

      cellRow.forEach((cellCol) => {
        result += cellCol
      })
    })

    result = result.slice(2)

    return result
  }

  print(): void {
    this.updateCanvasSize()

    let result: string = this.getCanvasString()

    console.clear()
    console.log(result)
  }

  printSize(): void {
    this.updateCanvasSize()

    console.log(this.width, this.height)
  }
}