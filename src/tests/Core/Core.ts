import { Core } from "../../core"

export default function (): void {
    const core = new Core()

    console.log(core.canvas)
    
    if (core.canvas !== null || core.canvas !== undefined) console.log("Core pass")
    else throw console.error("Core not passed")
}