"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
var Canvas_1 = require("./core/models/Canvas");
var Interface = new core_1.Render();
Interface.canvas.setCanvasCellValue(20, 5, "Hp: 100");
Interface.canvas.setCanvasCellValue(20, 6, "Mana: 100");
Interface.canvas.setCanvasCellValue(120, 6, "Skill: Storm");
Interface.canvas.setCanvasCellValueAlign(Canvas_1.CanvasCellAlignX.Left, Canvas_1.CanvasCellAlignY.Top, "test1234131sdsdsdsdsadsd", 5, Canvas_1.alignPaddingFormat.percent, 20, Canvas_1.alignPaddingFormat.percent);
Interface.canvas.setCanvasCellValueAlign(Canvas_1.CanvasCellAlignX.Right, Canvas_1.CanvasCellAlignY.Bottom, "test1234131sdsdsdsdsadsd", 5, Canvas_1.alignPaddingFormat.percent, 20, Canvas_1.alignPaddingFormat.percent);
Interface.canvas.setCanvasCellValueAlign(Canvas_1.CanvasCellAlignX.Center, Canvas_1.CanvasCellAlignY.Center, "text");
Interface.printCanvas();
Interface.runIntervalPrintCanvas();
Interface.printCanvasSize();
//# sourceMappingURL=index.js.map