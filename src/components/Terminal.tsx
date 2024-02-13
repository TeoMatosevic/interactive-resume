import { useState, useEffect, useRef } from "react"
import { PrinterOptions, Color, Block } from "../models"
import "../styles/Printer.css"
import { useQuery, usePrinter, usePrintOptions, useHistory } from "../hooks"

interface PrinterProps {
    refresh: number
}

const Terminal: React.FC<PrinterProps> = ({ refresh }) => {
    const { printUser, printQuery, printStartUp } = usePrinter()
    const { query } = useQuery()
    const [options, setOptions] = useState<Block[]>(printStartUp)
    const { push, up, down, history, index } = useHistory()
    const [loading, setLoading] = useState<boolean>(false)
    const inputRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const lines = usePrintOptions(options, setLoading)

    const handleSubmit = (e: React.KeyboardEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
        e.preventDefault()
        const input = ref.current?.innerText
        if (input) {
            push(input)
            let newOptions = [...options]
            if (input === "clear") {
                newOptions = [printUser()]
            } else {
                const queryOptions = printQuery(input)
                const queryResult = query(input, history)
                const userOptions = printUser()
                queryOptions.options.forEach((opt) => {
                    newOptions[options.length - 1].options.push(opt)
                })
                newOptions.push(queryResult)
                newOptions.push(userOptions)
            }
            setOptions(newOptions)
            ref.current.innerText = ""
        }
    }

    const printBlock = (block: PrinterOptions[], index: number) => {
        if (index === lines.length - 1) {
            return (
                <div className="input-container w-full">
                    {block.map((opt, index) => {
                        return (
                            <span className="inline" key={index}>
                                {print(opt)}
                            </span>
                        )
                    })}
                    {loading === false ? (
                        <div
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(e, inputRef)
                                } else if (e.key === "ArrowUp") {
                                    e.preventDefault()
                                    up()
                                } else if (e.key === "ArrowDown") {
                                    e.preventDefault()
                                    down()
                                }
                            }}
                            id="input"
                            ref={inputRef}
                            spellCheck="false"
                            className="font-ubuntu-mono inline text-terminal-size text-terminal-white outline-none"
                            contentEditable></div>
                    ) : null}
                </div>
            )
        } else {
            return block.map((opt, index) => {
                return <span key={index}>{print(opt)}</span>
            })
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.innerText = history[index]
            setTimeout(() => {
                const input = document.getElementById("input")
                if (input && input.firstChild) {
                    const range = document.createRange()
                    const sel = window.getSelection()
                    range.setStart(input.firstChild, input.innerText.length)
                    sel?.removeAllRanges()
                    sel?.addRange(range)
                }
            }, 0)
        }
    }, [index])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [options, inputRef.current, refresh])

    useEffect(() => {
        if (loading === false) {
            inputRef.current?.focus()
        }
    }, [loading])

    const scrollToBottom = () => {
        const lastChild = containerRef.current?.lastElementChild
        if (lastChild) {
            lastChild.scrollIntoView()
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [lines, loading])

    return (
        <div ref={containerRef}>
            {lines.map((opt, index) => {
                return <div key={index}>{printBlock(opt, index)}</div>
            })}
        </div>
    )
}

const print = (opt: PrinterOptions) => {
    const textColor: string = getColor(opt.color)
    const additionalClassName = opt.className ? opt.className : ""
    return <span className={`font-ubuntu-mono whitespace-pre-wrap text-terminal-size ${textColor} ${additionalClassName}`}>{opt.text}</span>
}

const getColor = (color: Color) => {
    switch (color) {
        case Color.GRAY:
            return "text-terminal-gray"
        case Color.GRAY_LIGHT:
            return "text-terminal-gray-light"
        case Color.PINK:
            return "text-terminal-pink"
        case Color.PINK_LIGHT:
            return "text-terminal-pink-light"
        case Color.WHITE:
            return "text-terminal-white"
        case Color.GREEN:
            return "text-terminal-green"
        case Color.GREEN_LIGHT:
            return "text-terminal-green-light"
        case Color.PURPLE:
            return "text-terminal-purple"
        case Color.PURPLE_LIGHT:
            return "text-terminal-purple-light"
        case Color.PURPLE_DARK:
            return "text-terminal-purple-dark"
        case Color.YELLOW:
            return "text-terminal-yellow"
        case Color.YELLOW_LIGHT:
            return "text-terminal-yellow-light"
        case Color.RED:
            return "text-terminal-red"
        case Color.RED_LIGHT:
            return "text-terminal-red-light"
        case Color.BLUE:
            return "text-terminal-blue"
        case Color.BLUE_LIGHT:
            return "text-terminal-blue-light"
        case Color.BROWN:
            return "text-terminal-brown"
        case Color.BROWN_LIGHT:
            return "text-terminal-brown-light"
        default:
            return "text-terminal-white"
    }
}

export default Terminal
