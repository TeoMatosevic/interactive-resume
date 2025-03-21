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

    const printStartUp = (currPath: string): Block[] => {
        const blocks: Block[] = [
            {
                options: [
                    {
                        color: Color.WHITE,
                        text: `
  ______   ______     ______        __`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `\
    __     ______     ______   ______     ______`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `\
     ______     __   __   __     ______ `,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
 /\\__  _\\ /\\  ___\\   /\\  __ \\      /\\ "-./  \\`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `\
   /\\  __ \\   /\\__  _\\ /\\  __ \\   /\\  ___\\   /\\  ___\\`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `\
   /\\ \\ / /  /\\ \\   /\\  ___\\  `,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
 \\/_/\\ \\/ \\ \\  __\\   \\ \\ \\/\\ \\     \\ \\ \\-./\\`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `\
 \\  \\ \\  __ \\  \\/_/\\ \\/ \\ \\ \\/\\ \\  \\ \\___  \\`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `\
  \\ \\  __\\   \\ \\ \\'/   \\ \\ \\  \\ \\ \\____ `,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
    \\ \\_\\  \\ \\_____\\  \\ \\_____\\     \\ \\_\\ \\`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `\
 \\_\\  \\ \\_\\ \\_\\    \\ \\_\\  \\ \\_____\\  \\/\\_____\\`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `\
  \\ \\_____\\  \\ \\__|    \\ \\_\\  \\ \\_____\\ `,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `
     \\/_/   \\/_____/   \\/_____/`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `\
      \\/_/  \\/_/   \\/_/\\/_/     \\/_/   \\/_____/`,
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: `\
   \\/_____/   \\/_____/   \\/_/      \\/_/   \\/_____/ \n`,
                        className: "font-bold",
                    },
                ],
                async: true,
            },
            {
                options: [
                    {
                        color: Color.WHITE,
                        text: "\nHello!",
                    },
                    {
                        color: Color.WHITE,
                        text: " Welcome to my personal website.\n",
                    },
                    {
                        color: Color.WHITE,
                        text: "This is a terminal emulator that you",
                    },
                    {
                        color: Color.WHITE,
                        text: " can use to navigate through my personal",
                    },
                    {
                        color: Color.WHITE,
                        text: " projects and learn more about me.\n",
                    },
                    {
                        color: Color.WHITE,
                        text: "If nothing appears when you type, ",
                    },
                    {
                        color: Color.WHITE,
                        text: "click anywhere on the page to focus the terminal.\n",
                    },
                    {
                        color: Color.WHITE,
                        text: "For information about available commands type ",
                    },
                    {
                        color: Color.WHITE,
                        text: "'",
                        className: "font-bold",
                    },
                    {
                        color: Color.PURPLE,
                        text: "help",
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: "'",
                        className: "font-bold",
                    },
                    {
                        color: Color.WHITE,
                        text: ".\n",
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
                    color: Color.WHITE,
                    text: `\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    cat`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `        - Prints file contents (available files can be listed with `,
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: "ls",
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: " command), for example ",
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: "cat about.txt",
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: `.\n                 Files are `,
                },
                {
                    color: Color.WHITE,
                    text: "white",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: ".\n",
                },
                {
                    color: Color.PURPLE,
                    text: `\
    cd`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `         - Change the current directory (available directories can be listed with `,
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: "ls",
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: " command), for example ",
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: "cd Projects",
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: ".\n",
                },
                {
                    color: Color.WHITE,
                    text: `                 Directories are `,
                },
                {
                    color: Color.PURPLE,
                    text: "purple",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: ".\n",
                },
                {
                    color: Color.PURPLE,
                    text: `\
    clear`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `      - Clear the terminal.\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    help`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `       - You already know what this does.\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    history`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `    - Show command history.\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    ls`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `         - List directory contents.\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    read`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `       - Displays markdown files (available files can be listed with `,
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: "ls",
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: " command), for example ",
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: "read README.md",
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: `.\n                 Markdown files are `,
                },
                {
                    color: Color.WHITE,
                    text: "white",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: " and end with ",
                },
                {
                    color: Color.WHITE,
                    text: "'.md'",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: `\
    whoami`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `     - Who `,
                },
                {
                    color: Color.WHITE,
                    text: `are`,
                    className: "font-bold text-shadow-white",
                },
                {
                    color: Color.WHITE,
                    text: ` you.\n`,
                },
                {
                    color: Color.PURPLE,
                    text: `\
    whois`,
                    className: "font-bold text-shadow-purple",
                },
                {
                    color: Color.WHITE,
                    text: `      - Who `,
                },
                {
                    color: Color.WHITE,
                    text: `is`,
                    className: "font-bold text-shadow-white",
                },
                {
                    color: Color.WHITE,
                    text: ` Teo Matošević.\n`,
                },
                {
                    color: Color.WHITE,
                    text: `\nBest way to start using this terminal is to type `,
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: "cat user_manual.txt",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: " and follow the instructions.\n",
                },
                {
                    color: Color.PURPLE,
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
                    className: "font-bold",
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
                    color: Color.WHITE,
                    text: "'",
                    className: "font-bold",
                },
                {
                    color: Color.PURPLE,
                    text: "help",
                    className: "font-bold",
                },
                {
                    color: Color.WHITE,
                    text: "'.\n",
                    className: "font-bold",
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
                    color: Color.BLUE,
                    text: "“Be who you are and say what you feel, ",
                },
                {
                    color: Color.BLUE,
                    text: "because those who mind don’t matter,",
                },
                {
                    color: Color.BLUE,
                    text: " and those who matter don’t mind.”",
                },
                {
                    color: Color.BLUE,
                    className: "font-bold",
                    text: " - Bernard",
                },
                {
                    color: Color.BLUE,
                    className: "font-bold",
                    text: " M.",
                },
                {
                    color: Color.BLUE,
                    className: "font-bold",
                    text: " Baruch\n",
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
                    color: Color.BLUE,
                    className: "font-bold",
                    text: "Teo Matošević ",
                },
                {
                    color: Color.BLUE,
                    text: "is a software developer.\n",
                },
                {
                    color: Color.BLUE,
                    text: "He is ",
                },
                {
                    color: Color.BLUE,
                    className: "font-bold",
                    text: "passionate ",
                },
                {
                    color: Color.BLUE,
                    text: "about tech, coding and learning new things.\n",
                },
                {
                    color: Color.BLUE,
                    text: "This website is a showcase of his ",
                },
                {
                    color: Color.BLUE,
                    className: "font-bold",
                    text: "skills",
                },
                {
                    color: Color.BLUE,
                    text: " and ",
                },
                {
                    color: Color.BLUE,
                    className: "font-bold",
                    text: "projects.\n",
                },
                {
                    color: Color.BLUE,
                    text: "In his ",
                },
                {
                    color: Color.BLUE,
                    className: "font-bold",
                    text: "free time",
                },
                {
                    color: Color.BLUE,
                    text: ", he enjoys spending time with his family and friends.\n",
                },
                {
                    color: Color.BLUE,
                    text: "He ",
                },
                {
                    color: Color.BLUE,
                    className: "font-bold",
                    text: "enyojs ",
                },
                {
                    color: Color.BLUE,
                    text: "playing video games and watching sports, especially football.\n",
                },
                {
                    color: Color.BLUE,
                    text: "Feel free to ",
                },
                {
                    color: Color.BLUE,
                    className: "font-bold",
                    text: "explore ",
                },
                {
                    color: Color.BLUE,
                    text: "and ",
                },
                {
                    color: Color.BLUE,
                    className: "font-bold",
                    text: "learn ",
                },
                {
                    color: Color.BLUE,
                    text: "more about him.\n",
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

    const printCatSuccess = (contents: string, currPath: string): Block[] => {
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
        printCatSuccess,
        printCatFail,
        printBlank,
    }
}

export default usePrinter
