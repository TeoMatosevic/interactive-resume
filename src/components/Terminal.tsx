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
    const lines = usePrintOptions(options, setLoading)

    const handleSubmit = (e: React.KeyboardEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
        e.preventDefault()
        const input = ref.current?.innerText
        if (input) {
            push(input)
            const newOptions = [...options]
            const queryOptions = printQuery(input)
            const queryResult = query(input)
            const userOptions = printUser()
            queryOptions.options.forEach((opt) => {
                newOptions[options.length - 1].options.push(opt)
            })
            newOptions.push(queryResult)
            newOptions.push(userOptions)
            setOptions(newOptions)
            ref.current.innerText = ""
        }
    }

    const printBlock = (block: PrinterOptions[], index: number) => {
        if (index === options.length - 1) {
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
                            className="font-ubuntu-mono inline font-bold text-terminal-size text-terminal-text outline-none"
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

    return (
        <>
            {lines.map((opt, index) => {
                return <div key={index}>{printBlock(opt, index)}</div>
            })}
        </>
    )
}

const print = (opt: PrinterOptions) => {
    const textColor: string =
        opt.color === Color.WHITE ? "text-terminal-text" : opt.color === Color.GREEN ? "text-terminal-green" : "text-terminal-purple"
    const additionalClassName = opt.className ? opt.className : ""
    return (
        <span className={`font-ubuntu-mono whitespace-pre-wrap font-bold text-terminal-size ${textColor} ${additionalClassName}`}>
            {opt.text}
        </span>
    )
}

export default Terminal
