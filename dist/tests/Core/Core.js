"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var core_1 = require("../../core");
function default_1() {
    var core = new core_1.Core();
    console.log(core.canvas);
    if (core.canvas !== null || core.canvas !== undefined)
        console.log("Core pass");
    else
        throw console.error("Core not passed");
}
//# sourceMappingURL=Core.js.map