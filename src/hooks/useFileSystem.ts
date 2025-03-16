import { useState, useEffect } from "react"
import { usePrinter } from "."
import { Block, ListNode, NodeType, Repository } from "../models"

const apiUrl = import.meta.env.VITE_API_URL

enum ChangeDirectoryCommand {
    CD = "cd",
    LS = "ls",
}

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
    node?: Node
}

const initFileSystem = (): Node => {
    return {
        name: "root", children: [{
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
    }
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
        printLsFail,
        printLsSuccess,
        printCatCommand,
        printCatFail,
    } = usePrinter()
    const [fileSystem, setFileSystem] = useState<Node>(initFileSystem())
    const [currentNode, setCurrentNode] = useState<Node>(fileSystem.children[0].children[0])
    const [loading, setLoading] = useState<boolean>(true)

    const parseToRepository = (data: any): Repository => {
        return {
            id: data.id,
            name: data.name,
            full_name: data.full_name,
            description: data.description,
            readme: data.readme,
            languages: data.languages,
            last_updated: new Date(data.last_update).toLocaleString(),
        }
    }

    const toAbout = (repository: Repository): Node => {
        let content = repository.description
        let numOfBytes: number = 0
        for (const lang in repository.languages) {
            numOfBytes += repository.languages[lang]
        }
        if (content !== "" && repository.languages) {
            content += "\n\n"
        }
        if (repository.languages) {
            const languages = []
            for (const lang in repository.languages) {
                languages.push({ [lang]: repository.languages[lang] })
            }
            languages.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
            content += "Languages used:\n"
            languages.forEach(lang => {
                const key = Object.keys(lang)[0]
                const value = Object.values(lang)[0]
                const percentage = ((value / numOfBytes) * 100).toFixed(2)
                content += `  - ${key}: ${percentage}%\n`
            })
        }

        if (content !== "") {
            content += "\n"
            content += `Last updated: ${repository.last_updated}`
        }

        return {
            name: "about.txt",
            children: [],
            type: NodeType.File,
            contents: content,
        }
    }

    const addGithubProjects = (previousFolderStructure: Node): Node => {
        const folder: Node = {
            name: "github-projects",
            children: [],
            type: NodeType.Folder,
        }

        fetch(apiUrl + "/api/v1/data")
            .then(response => response.json())
            .then(data => {
                if (!data.repositories) {
                    return
                }
                data.repositories.forEach((d: any) => {
                    const repository = parseToRepository(d)
                    const node: Node = {
                        name: repository.name,
                        children: [],
                        type: NodeType.Folder,
                    }
                    let readmeContent = repository.readme
                    if (readmeContent === "") {
                        readmeContent = `${repository.name}`
                    }
                    const readme: Node = {
                        name: "README.md",
                        children: [],
                        type: NodeType.File,
                        contents: readmeContent,
                    }
                    if (!!repository.languages || repository.description !== "") {
                        const about = toAbout(repository)
                        node.children.push(about)
                    }
                    node.children.push(readme)
                    folder.children.push(node)
                })
                setTimeout(() => setLoading(false), 2000)
            })
        const newFileSystem = { ...previousFolderStructure }

        const projectsFolder = findNodeRecursively(newFileSystem, "Projects")
        if (projectsFolder) {
            projectsFolder.children.push(folder)
        }

        return newFileSystem
    }

    const addProjects = () => {
        const folderStructureWithGithubProjects = addGithubProjects(fileSystem)
        setFileSystem(folderStructureWithGithubProjects)
    }

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

    const findParentRecursively = (node: Node, child: Node): Node | undefined => {
        if (node.children.includes(child)) {
            return node
        } else {
            for (const n of node.children) {
                const found = findParentRecursively(n, child)
                if (found) {
                    return found
                }
            }
        }
    }

    const findParent = (node: Node): Node | undefined => {
        return findParentRecursively(fileSystem, node)
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

    const cd = (name: string): ChangeDirectoryStatus => {
        if (name.startsWith("/")) {
            return {
                success: false,
                message: `tmatosevic: cd: permission denied: guest`,
            }
        }
        const paths = name.split("/")
        let currNode = currentNode
        for (const p of paths) {
            const status = changeDirectory(p, currNode, ChangeDirectoryCommand.CD)
            if (!status.success) {
                return status
            }
            currNode = status.node!
        }
        setCurrentNode(currNode)
        return {
            success: true,
            message: "",
            path: getPath(currNode),
        }
    }

    const changeDirectory = (name: string, currNode: Node, cdc: ChangeDirectoryCommand): ChangeDirectoryStatus => {
        if (name === ".") {
            return {
                success: true,
                message: "",
                path: getPath(currNode),
                node: currNode,
            }
        } else if (name === "..") {
            if (currNode.name === "guest") {
                return {
                    success: false,
                    message: `tmatosevic: ${cdc}: permission denied: guest`,
                }
            }
            const parent = findParent(currNode)
            if (parent) {
                return {
                    success: true,
                    message: "",
                    path: getPath(parent),
                    node: parent,
                }
            }
            return {
                success: false,
                message: `tmatosevic: ${cdc}: permission denied: root`,
            }
        } else if (name.startsWith("/")) {
            return {
                success: false,
                message: `tmatosevic: ${cdc}: permission denied: guest`,
            }
        }
        const node = findNode(currNode, name)
        if (node) {
            if (node.type === NodeType.File && cdc === ChangeDirectoryCommand.CD) {
                return {
                    success: false,
                    message: `tmatosevic: ${cdc}: ${name}: Not a directory`,
                }
            }
            return {
                success: true,
                message: "",
                path: getPath(node),
                node: node,
            }
        } else {
            return {
                success: false,
                message: `tmatosevic: ${cdc}: ${name}: No such file or directory`,
            }
        }
    }

    const list = (node: Node): ListNode[] => {
        if (node.type === NodeType.File) {
            return [{ name: node.name, type: node.type }]
        }
        return node.children.map(child => {
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
        } else if (query === "whois") {
            return printWhoIsCommand(getPath(currentNode))
        } else if (query === "history") {
            return printHistoryCommand(history, getPath(currentNode))
        } else if (query.split(" ")[0] === "cd") {
            const name = query.split(" ")[1]
            const status = cd(name)
            if (status.success) {
                return printCdSuccess(status.path!)
            } else {
                return printCdFail(status.message, getPath(currentNode))
            }
        } else if (query.split(" ")[0] === "cat") {
            const file = query.split(" ")[1]
            return printFile(file)
        } else if (query.split(" ")[0] === "ls") {
            if (query.split(" ").length === 1) {
                return printLsSuccess(list(currentNode), getPath(currentNode))
            } else {
                const path = query.split(" ")[1]
                const paths = path.split("/")
                let nodeToList = currentNode
                for (const p of paths) {
                    const node = changeDirectory(p, nodeToList, ChangeDirectoryCommand.LS)
                    if (!node.success) {
                        return printLsFail(node.message, getPath(currentNode))
                    }
                    nodeToList = node.node!
                }
                return printLsSuccess(list(nodeToList), getPath(currentNode))
            }
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

    /*
    const findCurrentNode = (node: Node, name: string): Node | undefined => {
        if (node.name === name) {
            return node
        } else {
            for (const child of node.children) {
                const found = findCurrentNode(child, name)
                if (found) {
                    return found
                }
            }
        }
    }

    const refreshCurrentNode = () => {
        const node = findCurrentNode(fileSystem, currentNode.name)
        if (node) {
            setCurrentNode(node)
        }
    }
    */

    useEffect(() => {
        addProjects()
    }, [])

    return { query, printCommandPrompt, printQuery, printInit, addProjects, loading }
}

export default useFileSystem
