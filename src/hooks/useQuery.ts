import { Block } from "../models"
import { usePrinter } from "."

const useQuery = () => {
    const { printHelpCommand, printCommandNotFound } = usePrinter()
    const query = (query: string): Block => {
        if (query === "help") {
            return printHelpCommand()
        } else {
            return printCommandNotFound(query)
        }
    }

    return { query }
}

export default useQuery
