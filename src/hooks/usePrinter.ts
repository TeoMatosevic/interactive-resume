import { Color, Block } from "../models"

const usePrinter = () => {
    const printUser = (): Block => {
        const block: Block = {
            options: [
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
                    },
                    {
                        color: Color.WHITE,
                        text: `
                        dGGGGMMb`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                       @p~qp~~qMb`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                       M|@||@) M|`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                       @,----.JM|`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                      JS^\\__/  qKL`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                     dZP        qKRb`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                    dZP          qKKb`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                   fZP            SMMb`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                   HZM            MMMM`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                   FqM            MMMM`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                 __| ".        |\\dS"qML`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                 |    \`.       | \`' \\Zq`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                _)      \\.___.,|     .'`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                \\____   )MMMMMP|   .'`,
                    },
                    {
                        color: Color.WHITE,
                        text: `
                     \`-'       \`--' `,
                    },
                ],
                async: true,
            },
            {
                options: [
                    {
                        color: Color.WHITE,
                        text: "For more information about available command insert: ",
                    },
                    {
                        color: Color.PURPLE,
                        text: "'help'",
                    },
                ],
                async: false,
            },
            {
                options: [
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
                async: false,
            },
        ]

        return blocks
    }

    const printHelpCommand = (): Block => {
        const block: Block = {
            options: [
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
                    text: "Command not found: " + query + "\n",
                },
            ],
            async: false,
        }
        return block
    }

    return { printUser, printQuery, printStartUp, printHelpCommand, printCommandNotFound }
}

export default usePrinter
