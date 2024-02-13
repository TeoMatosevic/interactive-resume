import { Block } from "../models"
import { usePrinter } from "."

const useQuery = () => {
    const { printHelpCommand, printCommandNotFound, printWhoAmICommand, printWhoIsCommand, printHistoryCommand } = usePrinter()
    const query = (query: string, history: string[]): Block => {
        if (query === "help") {
            return printHelpCommand()
        } else if (query === "whoami") {
            return printWhoAmICommand()
        } else if (query.startsWith("whois")) {
            return printWhoIsCommand()
        } else if (query === "history") {
            return printHistoryCommand(history)
        } else {
            return printCommandNotFound(query)
        }
    }

    return { query }
}

export default useQuery
