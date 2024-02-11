import { PrinterOptions } from "../models"
import { usePrinter } from "."

const useQuery = () => {
    const { printHelpCommand, printCommandNotFound } = usePrinter()
    const query = (query: string): PrinterOptions[] => {
        if (query === "help") {
            return printHelpCommand()
        } else {
            return printCommandNotFound(query)
        }
    }

    return { query }
}

export default useQuery
