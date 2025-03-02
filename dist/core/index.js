"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Render = exports.Canvas = exports.Core = void 0;
var Canvas_1 = require("./models/Canvas");
Object.defineProperty(exports, "Canvas", { enumerable: true, get: function () { return Canvas_1.Canvas; } });
var Core = (function () {
    function Core() {
        this.canvas = new Canvas_1.Canvas();
        this.interval = null;
    }
    Core.prototype.printCanvas = function () {
        this.canvas.print();
    };
    Core.prototype.printCanvasSize = function () {
        this.canvas.printSize();
    };
    Core.prototype.runIntervalPrintCanvas = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 16.66; }
        this.interval = setInterval(function () {
            _this.printCanvas();
        }, timeout);
    };
    return Core;
}());
exports.Core = Core;
var Render_1 = require("./models/Render");
Object.defineProperty(exports, "Render", { enumerable: true, get: function () { return Render_1.Render; } });
//# sourceMappingURL=index.js.map