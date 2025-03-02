export default interface ICore {
    printCanvas(): void
    printCanvasSize(): void
    runIntervalPrintCanvas(timeout?: number): void
}