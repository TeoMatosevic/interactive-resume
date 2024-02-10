import { useState, useEffect, useCallback, useRef } from "react"
import { PrinterOptions, Color } from "../models"
import "../styles/Printer.css"

interface PrinterProps {
    refresh: number
}

const Printer: React.FC<PrinterProps> = ({ refresh }) => {
    // const [printedBlocksCounter, setPrintedBlocksCounter] = useState(0)
    // const [unprintedBlocksCounter, setUnprintedBlocksCounter] = useState(0)
    const [options, setOptions] = useState<PrinterOptions[][]>([
        [
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
    ])
    const inputRef = useRef<HTMLDivElement>(null)

    const query = (input: string) => {}

    const handleSubmit = (e: React.KeyboardEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
        e.preventDefault()
        const input = ref.current?.innerText
        if (input) {
            const newOptions = [...options]
            newOptions[options.length - 1].push({ color: Color.WHITE, text: input })
            newOptions[options.length - 1].push({ color: Color.WHITE, text: "\n" })
            newOptions.push([
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
            ])
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
    const textColor = opt.color == Color.PURPLE ? "purple" : opt.color == Color.GREEN ? "green" : "text"
    return <span className={`font-ubuntu-mono font-bold text-terminal-size text-terminal-${textColor}`}>{opt.text}</span>
}

export default Printer
