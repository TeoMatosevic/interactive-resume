import { useState, useEffect, useRef } from "react"
import { PrinterOptions, Color } from "../models"
import "../styles/Printer.css"
import { useQuery, usePrinter } from "../hooks"

interface PrinterProps {
    refresh: number
}

const Printer: React.FC<PrinterProps> = ({ refresh }) => {
    const { printUser, printQuery, printStartUp } = usePrinter()
    const [options, setOptions] = useState<PrinterOptions[][]>(printStartUp)
    const inputRef = useRef<HTMLDivElement>(null)
    const { query } = useQuery()

    const handleSubmit = (e: React.KeyboardEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
        e.preventDefault()
        const input = ref.current?.innerText
        if (input) {
            const newOptions = [...options]
            const queryOptions = printQuery(input)
            queryOptions.forEach((opt) => {
                newOptions[options.length - 1].push(opt)
            })
            const queryResult = query(input)
            newOptions.push(queryResult)
            const userOptions = printUser()
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
                    <div
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit(e, inputRef)
                            }
                        }}
                        ref={inputRef}
                        spellCheck="false"
                        className="font-ubuntu-mono inline font-bold text-terminal-size text-terminal-text outline-none"
                        contentEditable></div>
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
            inputRef.current.focus()
        }
    }, [options, inputRef.current, refresh])

    return (
        <>
            {options.map((opt, index) => {
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

export default Printer
