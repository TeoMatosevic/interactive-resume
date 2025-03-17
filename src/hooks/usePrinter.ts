import { Color, Block, ListNode, NodeType } from "../models"

const usePrinter = () => {
    const printPrompt = (currPath?: string): Block => {
        const block: Block = {
            options: [
                {
                    color: Color.GREEN,
                    text: "guest@tmatosevic",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: ":",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: currPath ? `~/${currPath}` : "~",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: "$ ",
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

    const printStartUp = (currPath: string): Block[] => {
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
            printPrompt(currPath),
        ]

        return blocks
    }

    const printHelpCommand = (currPath: string): Block[] => {
        const block: Block = {
            options: [
                {
                    color: Color.PURPLE,
                    text: `
    'help'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `       - you already know what this does`,
                },
                {
                    color: Color.YELLOW_LIGHT,
                    text: ` (`,
                    className: "font-bold text-shadow-yellow",
                },
                {
                    color: Color.BLUE,
                    text: `⚈`,
                    className: "font-bold text-shadow-blue",
                },
                {
                    color: Color.YELLOW_LIGHT,
                    text: `╭`,
                    className: "font-bold text-shadow-yellow",
                },
                {
                    color: Color.BLUE_LIGHT,
                    text: `⚈`,
                    className: "font-bold text-shadow-blue",
                },
                {
                    color: Color.YELLOW_LIGHT,
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
                    color: Color.WHITE,
                    text: `     - who `,
                },
                {
                    color: Color.WHITE,
                    text: `are`,
                    className: "font-bold text-shadow-yellow",
                },
                {
                    color: Color.WHITE,
                    text: ` you\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    'whois'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `      - who `,
                },
                {
                    color: Color.WHITE,
                    text: `is`,
                    className: "font-bold text-shadow-yellow",
                },
                {
                    color: Color.WHITE,
                    text: ` Teo Matošević\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    'clear'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `      - clear the terminal\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    'history'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `    - show command history\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    'cd'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `         - change directory (available directories can be listed with `,
                },
                {
                    color: Color.PURPLE,
                    text: "'ls'",
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: " command), for example ",
                },
                {
                    color: Color.PURPLE,
                    text: "'cd Projects'",
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: ",\n",
                },
                {
                    color: Color.WHITE,
                    text: `                   directories are `,
                },
                {
                    color: Color.PURPLE,
                    text: "purple\n",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: `\
    'ls'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `         - list directory contents\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    'cat'`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `        - prints file contents (available files can be listed with `,
                },
                {
                    color: Color.PURPLE,
                    text: "'ls'",
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: " command), for example ",
                },
                {
                    color: Color.PURPLE,
                    text: "'cat about.txt'",
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: ",\n",
                },
                {
                    color: Color.WHITE,
                    text: `                   files are `,
                },
                {
                    color: Color.WHITE,
                    text: "white\n",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: `\n`,
                },
            ],
            async: true,
        }
        return [block, printPrompt(currPath)]
    }

    const printCommandNotFound = (query: string, currPath: string): Block[] => {
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
        return [block, printPrompt(currPath)]
    }

    const printWhoAmICommand = (currPath: string): Block[] => {
        const block: Block = {
            options: [
                {
                    color: Color.RED,
                    text: "You are not a special snowflake.\n",
                },
            ],
            async: true,
        }
        return [block, printPrompt(currPath)]
    }

    const printWhoIsCommand = (currPath: string): Block[] => {
        const block: Block = {
            options: [
                {
                    color: Color.RED,
                    text: "Teo Matošević is a software developer.\n",
                },
            ],
            async: true,
        }
        return [block, printPrompt(currPath)]
    }

    const printHistoryCommand = (history: string[], currPath: string): Block[] => {
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
        return [block, printPrompt(currPath)]
    }

    const printLsSuccess = (contents: ListNode[], currPath: string) => {
        const block: Block = {
            options: contents.map((node) => {
                return {
                    color: node.type === NodeType.File ? Color.WHITE : Color.PURPLE,
                    text: `${node.name} `,
                    className: node.type === NodeType.File ? "" : "font-bold",
                }
            }),
            async: true,
        }
        if (block.options.length > 0) {
            block.options.push({
                color: Color.WHITE,
                text: "\n",
            })
        }
        return [block, printPrompt(currPath)]
    }

    const printLsFail = (message: string, currPath: string): Block[] => {
        const block: Block = {
            options: [
                {
                    color: Color.RED,
                    text: message + "\n",
                },
            ],
            async: true,
        }
        return [block, printPrompt(currPath)]
    }

    const printCdFail = (message: string, currPath: string): Block[] => {
        const block: Block = {
            options: [
                {
                    color: Color.RED,
                    text: message + "\n",
                },
            ],
            async: true,
        }
        return [block, printPrompt(currPath)]
    }

    const printCdSuccess = (currPath: string): Block[] => {
        const block: Block = {
            options: [
                {
                    color: Color.WHITE,
                    text: ``,
                },
            ],
            async: true,
        }
        return [block, printPrompt(currPath)]
    }

    const printCatCommand = (contents: string, currPath: string): Block[] => {
        const block: Block = {
            options: contents.split("\n").map((line) => {
                return {
                    color: Color.WHITE,
                    text: line + "\n",
                }
            }),
            async: true,
        }
        return [block, printPrompt(currPath)]
    }

    const printCatFail = (message: string, currPath: string): Block[] => {
        const block: Block = {
            options: [
                {
                    color: Color.RED,
                    text: message + "\n",
                },
            ],
            async: true,
        }
        return [block, printPrompt(currPath)]
    }

    const printBlank = (currPath: string): Block[] => {
        const block: Block = {
            options: [
                {
                    color: Color.WHITE,
                    text: "",
                },
            ],
            async: true,
        }
        return [block, printPrompt(currPath)]
    }

    return {
        printPrompt,
        printQuery,
        printStartUp,
        printHelpCommand,
        printCommandNotFound,
        printWhoAmICommand,
        printWhoIsCommand,
        printHistoryCommand,
        printCdFail,
        printCdSuccess,
        printLsSuccess,
        printLsFail,
        printCatCommand,
        printCatFail,
        printBlank,
    }
}

export default usePrinter
