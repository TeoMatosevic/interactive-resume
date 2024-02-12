import { PrinterOptions } from "."

export default interface Block {
    options: PrinterOptions[]
    async: boolean
}
