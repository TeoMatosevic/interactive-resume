import { Color, Block } from "../models"

const usePrinter = () => {
    const printUser = (): Block => {
        const block: Block = {
            options: [
                {
                    color: Color.GREEN,
                    text: "guest@teo",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: ":",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: "~",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: "$ ",
                    className: "font-bold",
                },
            ],
            async: false,
        }
        return block
    }

    const printQuery = (query: string): Block => {
        const block: Block = {
            options: [
                {
                    color: Color.WHITE,
                    text: query,
                },
            ],
            async: false,
        }

        return block
    }

    const printStartUp = (): Block[] => {
        const blocks: Block[] = [
            {
                options: [
                    {
                        color: Color.WHITE,
                        text: `\
                        _nnnn_`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                        dGGGGMMb`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                       @p~qp~~qMb`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                       M|@||@) M|`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                       @,----.JM|`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                      JS^\\__/  qKL`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                     dZP        qKRb`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                    dZP          qKKb`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                   fZP            SMMb`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                   HZM            MMMM`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                   FqM            MMMM`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                 __| ".        |\\dS"qML`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                 |    \`.       | \`' \\Zq`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                _)      \\.___.,|     .'`,
                        className: "font-bold",
                    },

                    {
                        color: Color.WHITE,
                        text: `
                \\____   )MMMMMP|   .'`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
                     \`-'       \`--' \n`,
                        className: "font-bold",
                    },
                ],
                async: true,
            },
            {
                options: [
                    {
                        color: Color.WHITE,
                        text: "For information about available commands type ",
                    },
                    {
                        color: Color.PURPLE,
                        text: "'help'",
                        className: "text-shadow-purple font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: ".\n",
                        className: "font-bold",
                    },
                ],
                async: false,
            },
            {
                options: [
                    {
                        color: Color.GREEN,
                        text: "guest@teo",
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: ":",
                        className: "font-bold",
                    },
                    {
                        color: Color.PURPLE,
                        text: "~",
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: "$ ",
                        className: "font-bold",
                    },
                ],
                async: false,
            },
        ]

        return blocks
    }

    const printHelpCommand = (): Block => {
        const block: Block = {
            options: [
                {
                    color: Color.PURPLE,
                    text: `
    'help'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.YELLOW_LIGHT,
                    text: ` - nothing to explain here`,
                },
                {
                    color: Color.YELLOW,
                    text: ` (`,
                    className: "font-bold text-shadow-yellow",
                },
                {
                    color: Color.BLUE,
                    text: `⚈`,
                    className: "font-bold text-shadow-blue",
                },
                {
                    color: Color.YELLOW,
                    text: `╭`,
                    className: "font-bold text-shadow-yellow",
                },
                {
                    color: Color.BLUE_LIGHT,
                    text: `⚈`,
                    className: "font-bold text-shadow-blue",
                },
                {
                    color: Color.YELLOW,
                    text: `)\n`,
                    className: "font-bold text-shadow-yellow",
                },
                {
                    color: Color.PURPLE,
                    text: `\
    'whoami'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.YELLOW,
                    text: ` - who `,
                },
                {
                    color: Color.YELLOW,
                    text: `are`,
                    className: "font-bold text-shadow-yellow",
                },
                {
                    color: Color.YELLOW,
                    text: ` you\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    'whois'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.YELLOW,
                    text: ` - who `,
                },
                {
                    color: Color.YELLOW,
                    text: `is`,
                    className: "font-bold text-shadow-yellow",
                },
                {
                    color: Color.YELLOW,
                    text: ` Teo Matošević\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    'clear'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.YELLOW,
                    text: ` - clear the terminal\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    'history'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.YELLOW,
                    text: ` - show command history\n`,
                },
                {
                    color: Color.WHITE,
                    text: `\n`,
                },
            ],
            async: true,
        }
        return block
    }

    const printCommandNotFound = (query: string): Block => {
        const block: Block = {
            options: [
                {
                    color: Color.WHITE,
                    text: "Command ",
                },
                {
                    color: Color.PURPLE,
                    text: query,
                    className: "text-shadow-purple font-bold",
                },
                {
                    color: Color.WHITE,
                    text: " not found.\n",
                },
                {
                    color: Color.WHITE,
                    text: "For information about available commands type ",
                },
                {
                    color: Color.PURPLE,
                    text: "'help'",
                    className: "text-shadow-purple font-bold",
                },
                {
                    color: Color.WHITE,
                    text: ".\n",
                },
            ],
            async: true,
        }
        return block
    }

    const printWhoAmICommand = (): Block => {
        const block: Block = {
            options: [
                {
                    color: Color.RED,
                    text: "You are not a special snowflake.\n",
                },
            ],
            async: true,
        }
        return block
    }

    const printWhoIsCommand = (): Block => {
        const block: Block = {
            options: [
                {
                    color: Color.RED,
                    text: "Teo Matošević is a software developer.\n",
                },
            ],
            async: true,
        }
        return block
    }

    const printHistoryCommand = (history: string[]): Block => {
        const maxDigits = history.length.toString().length
        const block: Block = {
            options: history
                .filter((query) => query !== "")
                .map((query, index) => {
                    return {
                        color: Color.WHITE,
                        text: ` ${(index + 1).toString().padStart(maxDigits, " ")}  ${query}\n`,
                    }
                }),
            async: true,
        }
        const lastIndex = history.length - 1
        block.options.push({
            color: Color.WHITE,
            text: ` ${lastIndex + 1}  history\n`,
        })
        return block
    }

    return {
        printUser,
        printQuery,
        printStartUp,
        printHelpCommand,
        printCommandNotFound,
        printWhoAmICommand,
        printWhoIsCommand,
        printHistoryCommand,
    }
}

export default usePrinter
