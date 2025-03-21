import { useState, useEffect } from "react"
import { usePrinter } from "."
import { Block, ListNode, NodeType, QueryResult, Repository } from "../models"
import { cv_md, cv_txt, user_manual_txt } from "../helpers/file_contents"

const apiUrl = import.meta.env.VITE_API_URL

enum ChangeDirectoryCommand {
    CD = "cd",
    LS = "ls",
    CAT = "cat",
    READ = "read",
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
                            name: "CV.txt",
                            children: [],
                            type: NodeType.File,
                            contents: cv_txt,
                        },
                        {
                            name: "CV.md",
                            children: [],
                            type: NodeType.File,
                            contents: cv_md,
                        },
                        {
                            name: "user_manual.txt",
                            children: [],
                            type: NodeType.File,
                            contents: user_manual_txt,
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
        printCatSuccess,
        printCatFail,
        printBlank,
    } = usePrinter()
    const [fileSystem, setFileSystem] = useState<Node>(initFileSystem())
    const [currentNode, setCurrentNode] = useState<Node>(fileSystem.children[0].children[0])
    const [loading, setLoading] = useState<boolean>(true)
    const [markdown, setMarkdown] = useState<string | null>(null)
    const [justClosedMarkdown, setJustClosedMarkdown] = useState<boolean>(false)

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

    const toQueryResult = (blocks: Block[], markdown: string | null): QueryResult => {
        return {
            blocks: blocks,
            markdown: markdown,
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
            type: NodeType.File, contents: content,
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

        const projectsFolder = findNodeByName(newFileSystem, "Projects")
        if (projectsFolder) {
            projectsFolder.children.push(folder)
        }

        return newFileSystem
    }

    const addProjects = () => {
        const folderStructureWithGithubProjects = addGithubProjects(fileSystem)
        setFileSystem(folderStructureWithGithubProjects)
    }

    const findNodeByName = (node: Node, name: string): Node | undefined => {
        if (node.name === name) {
            return node
        } else {
            for (const child of node.children) {
                const found = findNodeByName(child, name)
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
            return findNodeByName(fileSystem, name)
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

    const ls = (name: string): ChangeDirectoryStatus => {
        if (name.startsWith("/")) {
            return {
                success: false,
                message: `tmatosevic: ls: permission denied: guest`,
            }
        }
        const paths = name.split("/")
        let currNode = currentNode
        for (const p of paths) {
            const status = changeDirectory(p, currNode, ChangeDirectoryCommand.LS)
            if (!status.success) {
                return status
            }
            currNode = status.node!
        }
        return {
            success: true,
            message: "",
            path: getPath(currNode),
            node: currNode,
        }
    }

    const cat = (name: string): ChangeDirectoryStatus => {
        if (name.startsWith("/")) {
            return {
                success: false,
                message: `tmatosevic: cat: permission denied: guest`,
            }
        }
        const paths = name.split("/")
        let currNode = currentNode
        for (const p of paths) {
            const status = changeDirectory(p, currNode, ChangeDirectoryCommand.CAT)
            if (!status.success) {
                return status
            }
            currNode = status.node!
        }
        if (currNode.type === NodeType.Folder) {
            return {
                success: false,
                message: `tmatosevic: cat: ${name}: Is a directory`,
            }
        }
        return {
            success: true,
            message: "",
            path: getPath(currNode),
            node: currNode,
        }
    }

    const read = (name: string): ChangeDirectoryStatus => {
        if (name.startsWith("/")) {
            return {
                success: false,
                message: `tmatosevic: read: permission denied: guest`,
            }
        }
        const paths = name.split("/")
        let currNode = currentNode
        for (const p of paths) {
            const status = changeDirectory(p, currNode, ChangeDirectoryCommand.READ)
            if (!status.success) {
                return status
            }
            currNode = status.node!
        }
        if (currNode.type === NodeType.Folder) {
            return {
                success: false,
                message: `tmatosevic: read: ${name}: Is a directory`,
            }
        }
        if (!currNode.name.endsWith(".md")) {
            return {
                success: false,
                message: `tmatosevic: read: ${name}: Not a markdown file`,
            }
        }
        return {
            success: true,
            message: "",
            path: getPath(currNode),
            node: currNode,
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

    const query = (query: string, history: string[]): QueryResult => {
        if (query.split(" ")[0] === "help") {
            return toQueryResult(printHelpCommand(getPath(currentNode)), null)
        } else if (query.split(" ")[0] === "whoami") {
            return toQueryResult(printWhoAmICommand(getPath(currentNode)), null)
        } else if (query.split(" ")[0] === "whois") {
            return toQueryResult(printWhoIsCommand(getPath(currentNode)), null)
        } else if (query.split(" ")[0] === "history") {
            return toQueryResult(printHistoryCommand(history, getPath(currentNode)), null)
        } else if (query.split(" ")[0] === "cd") {
            if (query.split(" ").length === 1) {
                return toQueryResult(printCdFail("tmatosevic: cd: missing operand", getPath(currentNode)), null)
            }
            const path = query.split(" ")[1]
            const status = cd(path)
            if (status.success) {
                return toQueryResult(printCdSuccess(status.path!), null)
            }
            return toQueryResult(printCdFail(status.message, getPath(currentNode)), null)
        } else if (query.split(" ")[0] === "cat") {
            if (query.split(" ").length === 1) {
                return toQueryResult(printCatFail("tmatosevic: cat: missing operand", getPath(currentNode)), null)
            }
            const path = query.split(" ")[1]
            const status = cat(path)
            if (status.success) {
                return toQueryResult(printCatSuccess(status.node!.contents!, getPath(currentNode)), null)
            }
            return toQueryResult(printCatFail(status.message, getPath(currentNode)), null)
        } else if (query.split(" ")[0] === "ls") {
            if (query.split(" ").length === 1) {
                return toQueryResult(printLsSuccess(list(currentNode), getPath(currentNode)), null)
            }
            const path = query.split(" ")[1]
            const status = ls(path)
            if (status.success) {
                return toQueryResult(printLsSuccess(list(status.node!), getPath(currentNode)), null)
            }
            return toQueryResult(printLsFail(status.message, getPath(currentNode)), null)
        } else if (query.split(" ")[0] === "read") {
            if (query.split(" ").length === 1) {
                return toQueryResult(printCatFail("tmatosevic: read: missing operand", getPath(currentNode)), null)
            }
            const path = query.split(" ")[1]
            const status = read(path)
            if (status.success) {
                return toQueryResult(printBlank(getPath(currentNode)), status.node!.contents || null)
            }
            return toQueryResult(printCatFail(status.message, getPath(currentNode)), null)
        } else {
            return toQueryResult(printCommandNotFound(query, getPath(currentNode)), null)
        }
    }

    const printCommandPrompt = (): Block => {
        return printPrompt(getPath(currentNode))
    }

    const printInit = () => {
        return printStartUp(getPath(currentNode))
    }

    useEffect(() => {
        addProjects()
    }, [])

    return { query, printCommandPrompt, printQuery, printInit, addProjects, loading, markdown, setMarkdown, justClosedMarkdown, setJustClosedMarkdown }
}

export default useFileSystem
