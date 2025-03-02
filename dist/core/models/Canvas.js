"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = exports.alignPaddingFormat = exports.CanvasCellAlignY = exports.CanvasCellAlignX = void 0;
var CellCol_1 = __importDefault(require("./CellCol"));
var CellRow_1 = __importDefault(require("./CellRow"));
var CanvasCellAlignX;
(function (CanvasCellAlignX) {
    CanvasCellAlignX[CanvasCellAlignX["Left"] = 0] = "Left";
    CanvasCellAlignX[CanvasCellAlignX["Right"] = 1] = "Right";
    CanvasCellAlignX[CanvasCellAlignX["Center"] = 2] = "Center";
})(CanvasCellAlignX || (exports.CanvasCellAlignX = CanvasCellAlignX = {}));
var CanvasCellAlignY;
(function (CanvasCellAlignY) {
    CanvasCellAlignY[CanvasCellAlignY["Top"] = 0] = "Top";
    CanvasCellAlignY[CanvasCellAlignY["Bottom"] = 1] = "Bottom";
    CanvasCellAlignY[CanvasCellAlignY["Center"] = 2] = "Center";
})(CanvasCellAlignY || (exports.CanvasCellAlignY = CanvasCellAlignY = {}));
var alignPaddingFormat;
(function (alignPaddingFormat) {
    alignPaddingFormat[alignPaddingFormat["default"] = 0] = "default";
    alignPaddingFormat[alignPaddingFormat["percent"] = 1] = "percent";
})(alignPaddingFormat || (exports.alignPaddingFormat = alignPaddingFormat = {}));
var Canvas = (function () {
    function Canvas() {
        this.width = process.stdout.getWindowSize()[0];
        this.height = process.stdout.getWindowSize()[1] - 1;
        this.canvas = [];
        this.clearCanvas();
    }
    Canvas.prototype.getCanvasSize = function () {
        return [this.width, this.height];
    };
    Canvas.prototype.updateCanvasSize = function () {
        this.width = process.stdout.getWindowSize()[0];
        this.height = process.stdout.getWindowSize()[1] - 1;
    };
    Canvas.prototype.clearCanvas = function () {
        this.updateCanvasSize();
        this.canvas = [];
        for (var index = 0; index < this.height; index++) {
            this.canvas.push(new CellRow_1.default());
            for (var index2 = 0; index2 < this.width; index2++) {
                this.canvas[index].value.push(new CellCol_1.default());
            }
        }
    };
    Canvas.prototype.setCanvasCellValueAlign = function (alignX, alignY, value, alignXPadding, alignXPaddingFormat, alignYPadding, alignYPaddingFormat) {
        if (alignXPadding === void 0) { alignXPadding = 0; }
        if (alignXPaddingFormat === void 0) { alignXPaddingFormat = alignPaddingFormat.default; }
        if (alignYPadding === void 0) { alignYPadding = 0; }
        if (alignYPaddingFormat === void 0) { alignYPaddingFormat = alignPaddingFormat.default; }
        var result = { x: 0, y: 0, alignXPadding: 0, alignYPadding: 0 };
        switch (alignXPaddingFormat) {
            case alignPaddingFormat.default:
                result.alignXPadding = alignXPadding;
                break;
            case alignPaddingFormat.percent:
                result.alignXPadding = Math.round(parseFloat(alignXPadding > 9 ? "0." + alignXPadding : "0.0" + alignXPadding) * (this.width - value.length));
                break;
            default: result.alignXPadding = alignXPadding;
        }
        switch (alignYPaddingFormat) {
            case alignPaddingFormat.default:
                result.alignYPadding = alignYPadding;
                break;
            case alignPaddingFormat.percent:
                result.alignYPadding = Math.round(parseFloat(alignYPadding > 9 ? "0." + alignYPadding : "0.0" + alignYPadding) * (this.height - 1));
                break;
            default: result.alignYPadding = alignYPadding;
        }
        switch (alignX) {
            case CanvasCellAlignX.Center:
                result.x = Math.round((this.width - value.length) / 2);
                break;
            case CanvasCellAlignX.Left:
                result.x = result.alignXPadding;
                break;
            case CanvasCellAlignX.Right:
                result.x = this.width - result.alignXPadding - value.length;
                break;
            default:
                result.x = result.alignXPadding;
                break;
        }
        switch (alignY) {
            case CanvasCellAlignY.Center:
                result.y = Math.round(this.height / 2) - 1;
                break;
            case CanvasCellAlignY.Top:
                result.y = result.alignYPadding;
                break;
            case CanvasCellAlignY.Bottom:
                result.y = this.height - result.alignYPadding - 1;
                break;
            default:
                result.y = result.alignYPadding;
                break;
        }
        this.setCanvasCellValue(result.x, result.y, value);
    };
    Canvas.prototype.setCanvasCellValue = function (x, y, value) {
        var _this = this;
        if (!value)
            return;
        if (value.length == 1) {
            this.canvas[y].value[x].value = value;
            return;
        }
        if (value.length > 1) {
            var result = value.split("");
            result.forEach(function (valueSymbol, i) {
                if (!_this.canvas[y] || !_this.canvas[y].value[x + i])
                    return;
                _this.canvas[y].value[x + i].value = valueSymbol;
            });
        }
    };
    Canvas.prototype.getCanvasStringCellArray = function () {
        var result = [];
        this.canvas.forEach(function (cellRow, i) {
            result.push([]);
            cellRow.value.forEach(function (cellCol) {
                result[i].push(cellCol.value);
            });
        });
        return result;
    };
    Canvas.prototype.getCanvasString = function () {
        var result = "";
        this.getCanvasStringCellArray().forEach(function (cellRow) {
            result += "\n";
            cellRow.forEach(function (cellCol) {
                result += cellCol;
            });
        });
        result = result.slice(2);
        return result;
    };
    Canvas.prototype.print = function () {
        this.updateCanvasSize();
        var result = this.getCanvasString();
        console.clear();
        console.log(result);
    };
    Canvas.prototype.printSize = function () {
        this.updateCanvasSize();
        console.log(this.width, this.height);
    };
    return Canvas;
}());
exports.Canvas = Canvas;
//# sourceMappingURL=Canvas.js.map