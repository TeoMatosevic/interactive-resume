import { useState, useEffect, useRef } from "react"
import { PrinterOptions, Block } from "../models"
import "../styles/Printer.css"
import { usePrintOptions, useHistory, useFileSystem } from "../hooks"
import { getColor } from "../helpers/colors"

interface PrinterProps {
    refresh: number
}

const Terminal: React.FC<PrinterProps> = ({ refresh }) => {
    const { query, printCommandPrompt, printInit, printQuery } = useFileSystem()
    const [options, setOptions] = useState<Block[]>(printInit)
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
                newOptions = [printCommandPrompt()]
            } else {
                const queryOptions = printQuery(input)
                const queryResult = query(input, history)
                queryOptions.options.forEach((opt) => {
                    newOptions[options.length - 1].options.push(opt)
                })
                queryResult.forEach((opt) => {
                    newOptions.push(opt)
                })
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

export default Terminal
