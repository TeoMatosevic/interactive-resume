import { useState } from "react"
import { usePrinter } from "."
import { Block, ListNode, NodeType } from "../models"

interface Node {
    name: string
    children: Node[]
    type: NodeType
    contents?: string
}

interface ChangeDirectoryStatus {
    success: boolean
    message: string
    path?: string
}

const useFileSystem = () => {
    const {
        printHelpCommand,
        printCommandNotFound,
        printWhoAmICommand,
        printWhoIsCommand,
        printHistoryCommand,
        printCdFail,
        printPrompt,
        printStartUp,
        printQuery,
        printCdSuccess,
        printLsCommand,
        printCatCommand,
        printCatFail,
    } = usePrinter()
    const [fileSystem, setFileSystem] = useState<Node>({
        name: "root",
        children: [
            {
                name: "home",
                children: [
                    {
                        name: "guest",
                        children: [
                            {
                                name: "Projects",
                                children: [],
                                type: NodeType.Folder,
                            },
                            {
                                name: "about.txt",
                                children: [],
                                type: NodeType.File,
                                contents: `\
This is a project created by Teo Matošević.
Its purpose is to showcase my skills and knowledge.
I hope you like it!`,
                            },
                        ],
                        type: NodeType.Folder,
                    },
                ],
                type: NodeType.Folder,
            },
        ],
        type: NodeType.Folder,
    })
    const [currentNode, setCurrentNode] = useState<Node>(fileSystem.children[0].children[0])

    const findNodeRecursively = (node: Node, name: string): Node | undefined => {
        if (node.name === name) {
            return node
        } else {
            for (const child of node.children) {
                const found = findNodeRecursively(child, name)
                if (found) {
                    return found
                }
            }
        }
    }

    const findNode = (node: Node | undefined, name: string): Node | undefined => {
        if (node) {
            for (const child of node.children) {
                if (child.name === name) {
                    return child
                }
            }
        } else {
            return findNodeRecursively(fileSystem, name)
        }
    }

    const findParent = (node: Node): Node | undefined => {
        if (node.children.length === 0) {
            return
        }
        for (const child of fileSystem.children) {
            if (child.children.includes(node)) {
                return child
            }
            return findParent(child)
        }
    }

    const getPath = (currNode: Node): string => {
        let node = currNode
        let path = node.name
        let parent = findParent(node)
        while (parent && parent.name !== "guest" && parent.name !== "root" && parent.name !== "home") {
            path = `${parent.name}/${path}`
            parent = findParent(parent)
        }
        return path.replace("guest", "")
    }

    const changeDirectory = (name: string): ChangeDirectoryStatus => {
        if (name === ".") {
            return {
                success: true,
                message: "",
                path: getPath(currentNode),
            }
        } else if (name === "..") {
            if (currentNode.name === "guest") {
                return {
                    success: false,
                    message: "tmatosevic: cd: permission denied: guest",
                }
            }
            const parent = findParent(currentNode)
            if (parent) {
                setCurrentNode(parent)
                return {
                    success: true,
                    message: "",
                    path: getPath(parent),
                }
            }
            return {
                success: false,
                message: "tmatosevic: cd: permission denied: root",
            }
        } else if (name.startsWith("/")) {
            return {
                success: false,
                message: "tmatosevic: cd: permission denied: guest",
            }
        }
        const node = findNode(currentNode, name)
        if (node) {
            setCurrentNode(node)
            return {
                success: true,
                message: "",
                path: getPath(node),
            }
        } else {
            return {
                success: false,
                message: `tmatosevic: cd: ${name}: No such file or directory`,
            }
        }
    }

    const list = (): ListNode[] => {
        return currentNode.children.map((child) => {
            return {
                name: child.name,
                type: child.type,
            }
        })
    }

    const query = (query: string, history: string[]): Block[] => {
        if (query === "help") {
            return printHelpCommand(getPath(currentNode))
        } else if (query === "whoami") {
            return printWhoAmICommand(getPath(currentNode))
        } else if (query.startsWith("whois")) {
            return printWhoIsCommand(getPath(currentNode))
        } else if (query === "history") {
            return printHistoryCommand(history, getPath(currentNode))
        } else if (query.split(" ")[0] === "cd") {
            const name = query.split(" ")[1]
            const status = changeDirectory(name)
            if (status.success) {
                return printCdSuccess(status.path!)
            } else {
                return printCdFail(status.message, getPath(currentNode))
            }
        } else if (query.split(" ")[0] === "cat") {
            const file = query.split(" ")[1]
            return printFile(file)
        } else if (query === "ls") {
            return printLsCommand(list(), getPath(currentNode))
        } else {
            return printCommandNotFound(query, getPath(currentNode))
        }
    }

    const printCommandPrompt = (): Block => {
        return printPrompt(getPath(currentNode))
    }

    const printInit = () => {
        return printStartUp(getPath(currentNode))
    }

    const printFile = (file: string): Block[] => {
        const node = findNode(currentNode, file)
        if (node) {
            if (node.type === NodeType.File && node.contents) {
                return printCatCommand(node.contents, getPath(currentNode))
            } else if (node.type === NodeType.Folder) {
                return printCatFail(`cat: ${file}: Is a directory`, getPath(currentNode))
            } else {
                return printCatCommand("", getPath(currentNode))
            }
        } else {
            return printCatFail(`cat: ${file}: No such file or directory`, getPath(currentNode))
        }
    }

    return { changeDirectory, query, printCommandPrompt, printQuery, printInit, list, printFile }
}

export default useFileSystem
