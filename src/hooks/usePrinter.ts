import { PrinterOptions, Color } from "../models"

const usePrinter = () => {
    const printUser = (): PrinterOptions[] => {
        const options: PrinterOptions[] = [
            {
                color: Color.GREEN,
                text: "guest@teo",
            },
            {
                color: Color.WHITE,
                text: ":",
            },
            {
                color: Color.PURPLE,
                text: "~",
            },
            {
                color: Color.WHITE,
                text: "$ ",
            },
        ]
        return options
    }

    const printQuery = (query: string): PrinterOptions[] => {
        const options: PrinterOptions[] = [
            {
                color: Color.WHITE,
                text: query,
            },
        ]

        return options
    }

    const printStartUp = (): PrinterOptions[][] => {
        const options = [
            [
                {
                    color: Color.WHITE,
                    text: "For information about available commands insert: ",
                },
                {
                    color: Color.PURPLE,
                    text: "'help'",
                    className: "text-shadow",
                },
            ],
            [
                {
                    color: Color.GREEN,
                    text: "guest@teo",
                },
                {
                    color: Color.WHITE,
                    text: ":",
                },
                {
                    color: Color.PURPLE,
                    text: "~",
                },
                {
                    color: Color.WHITE,
                    text: "$ ",
                },
            ],
        ]

        return options
    }

    const printHelpCommand = (): PrinterOptions[] => {
        const options: PrinterOptions[] = [
            {
                color: Color.GREEN,
                text: "Available commands:\n",
            },
            {
                color: Color.WHITE,
                text: `\
    'help'
`,
            },
            {
                color: Color.WHITE,
                text: `\
    'about'
`,
            },
            {
                color: Color.WHITE,
                text: `\
    'projects'
`,
            },
        ]
        return options
    }

    const printCommandNotFound = (query: string): PrinterOptions[] => {
        const options: PrinterOptions[] = [
            {
                color: Color.WHITE,
                text: "Command not found: " + query + "\n",
            },
        ]
        return options
    }

    return { printUser, printQuery, printStartUp, printHelpCommand, printCommandNotFound }
}

export default usePrinter
