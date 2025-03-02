import { alignPaddingFormat } from "../models/Canvas"

export default interface ICanvas {
    getCanvasSize(): number[]
    updateCanvasSize(): void
    clearCanvas(): void

    setCanvasCellValue(x: number, y: number, value: string, alignXPadding?: number, alignPaddingFormat?: alignPaddingFormat, alignYPadding?: number, alignYPaddingFormat?: alignPaddingFormat): void
    getCanvasStringCellArray(): Array<String[]>
    getCanvasString(): string

    print(): void
    printSize(): void
}
