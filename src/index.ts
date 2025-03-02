import { Render } from "./core"
import { alignPaddingFormat, CanvasCellAlignX, CanvasCellAlignY } from "./core/models/Canvas"

const Interface = new Render()
Interface.canvas.setCanvasCellValue(20, 5, "Hp: 100")
Interface.canvas.setCanvasCellValue(20, 6, "Mana: 100")
Interface.canvas.setCanvasCellValue(120, 6, "Skill: Storm")
Interface.canvas.setCanvasCellValueAlign(CanvasCellAlignX.Left, CanvasCellAlignY.Top, "test1234131sdsdsdsdsadsd", 5, alignPaddingFormat.percent, 20, alignPaddingFormat.percent)
Interface.canvas.setCanvasCellValueAlign(CanvasCellAlignX.Right, CanvasCellAlignY.Bottom, "test1234131sdsdsdsdsadsd", 5, alignPaddingFormat.percent, 20, alignPaddingFormat.percent)
Interface.canvas.setCanvasCellValueAlign(CanvasCellAlignX.Center, CanvasCellAlignY.Center, "text")
Interface.printCanvas()
Interface.runIntervalPrintCanvas()
Interface.printCanvasSize()