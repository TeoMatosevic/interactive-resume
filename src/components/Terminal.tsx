import { useState, useEffect, useRef } from "react"
import { PrinterOptions, Block } from "../models"
import "../styles/Terminal.css"
import { usePrintOptions, useHistory, useFileSystem } from "../hooks"
import { getColor } from "../helpers/colors"

interface PrinterProps {
    refresh: number
}

const getWindowHeight = () => {
    return window.innerHeight
}

const findLastSpaceFromIndex = (input: string, index: number, direction: number | undefined): number => {
    if (direction === undefined || direction > 0) {
        for (let i = index; i < input.length; i++) {
            if (input[i] !== " ") {
                return i - 1
            }
        }
        if (input[index] === " ") {
            return input.length - 1
        } else {
            return index
        }
    } else {
        for (let i = index; i >= 0; i--) {
            if (input[i] !== " ") {
                return i
            }
        }
        if (input[index] === " ") {
            return 0
        } else {
            return index
        }
    }
}

const Terminal: React.FC<PrinterProps> = ({ refresh }) => {
    const { query, printCommandPrompt, printInit, printQuery, addProjects } = useFileSystem()
    const [options, setOptions] = useState<Block[]>(printInit)
    const { push, up, down, history, index } = useHistory()
    const [loading, setLoading] = useState<boolean>(false)
    const [inputText, setInputText] = useState("")
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [_windowHeight, setWindowHeight] = useState(getWindowHeight())
    const [showCursor, setShowCursor] = useState<boolean>(true)
    const [cursorOffset, setCursorOffset] = useState<number>(0)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const ref = useRef<HTMLSpanElement>(null)
    const lines = usePrintOptions(options, setLoading)

    const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>, ref: React.RefObject<HTMLTextAreaElement>) => {
        e.preventDefault()
        const input = ref.current?.value
        if (input) {
            const trimmedInput = input.trim()
            push(trimmedInput)
            let newOptions = [...options]
            if (trimmedInput === "clear") {
                newOptions = [printCommandPrompt()]
            } else {
                const queryOptions = printQuery(input)
                const queryResult = query(trimmedInput, history)
                queryOptions.options.forEach(opt => {
                    newOptions[options.length - 1].options.push(opt)
                })
                queryResult.forEach(opt => {
                    newOptions.push(opt)
                })
            }
            setOptions(newOptions)
            ref.current.value = ""
            setInputText("")
            setCursorOffset(0)
        }
    }

    const printBlock = (block: PrinterOptions[], index: number) => {
        if (index === lines.length - 1) {
            return (
                <div className="input-container w-full">
                    {block.map((opt, index) => {
                        return <span key={index}>{print(opt)}</span>
                    })}
                    {loading === false ? (
                        <>
                            <span className="relative">
                                <textarea
                                    onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            handleSubmit(e, inputRef)
                                        } else if (e.key === "ArrowUp") {
                                            e.preventDefault()
                                            up()
                                            setCursorOffset(0)
                                        } else if (e.key === "ArrowDown") {
                                            e.preventDefault()
                                            down()
                                            setCursorOffset(0)
                                        } else if (e.key === "ArrowLeft") {
                                            handleLeftArrow()
                                            const cursorPosition = inputRef.current?.selectionStart
                                            if (cursorPosition) {
                                                inputRef.current?.setSelectionRange(
                                                    cursorPosition - 1,
                                                    cursorPosition - 1
                                                )
                                                e.preventDefault()
                                            }
                                        } else if (e.key === "ArrowRight") {
                                            handleRightArrow()
                                            const cursorPosition = inputRef.current?.selectionStart
                                            if (cursorPosition) {
                                                inputRef.current?.setSelectionRange(
                                                    cursorPosition + 1,
                                                    cursorPosition + 1
                                                )
                                                e.preventDefault()
                                            }
                                        } else if (e.key === "Tab") {
                                            e.preventDefault()
                                        }
                                    }}
                                    onInput={handleInput}
                                    id="input"
                                    ref={inputRef}
                                    spellCheck="false"
                                    className="font-ubuntu-mono absolute top-0 left-0 h-[20px] text-opacity-0 pointer-events-none bg-transparent resize-none inline text-terminal-size caret-transparent text-terminal-white outline-none"
                                ></textarea>
                                <span
                                    ref={ref}
                                    className="font-ubuntu-mono h-[21px] text-terminal-white text-terminal-size"
                                >
                                    {inputText}
                                </span>
                            </span>
                            {showCursor ? (
                                <div
                                    className="blink"
                                    style={{
                                        position: "absolute",
                                        left: cursorPosition.x + "px",
                                        top: (cursorPosition.y / window.innerHeight) * 100 + "vh",
                                        backgroundColor: "rgba(208, 207, 204, 1)",
                                        width: "9px",
                                        height: "20px",
                                    }}
                                ></div>
                            ) : null}
                        </>
                    ) : null}
                </div>
            )
        } else {
            return block.map((opt, index) => {
                return <span key={index}>{print(opt)}</span>
            })
        }
    }

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView()
    }

    const handleInput = (e: any) => {
        if (e.nativeEvent.inputType === "deleteContentForward" && cursorOffset > 0) {
            setCursorOffset(prev => prev - 1)
        } else if (e.nativeEvent.inputType === "deleteWordForward" && cursorOffset > 0) {
            const currIndex = inputText.length - cursorOffset
            let indexUntilDeletion
            if (inputText[currIndex] === " ") {
                indexUntilDeletion = findLastSpaceFromIndex(inputText, currIndex, 1)
            } else {
                indexUntilDeletion =
                    inputText.substring(currIndex).indexOf(" ") === -1
                        ? inputText.length - 1
                        : findLastSpaceFromIndex(inputText, inputText.substring(currIndex).indexOf(" ") + currIndex, 1)
            }
            const newInputText = inputText.substring(0, currIndex) + inputText.substring(indexUntilDeletion + 1)
            const amoutOfCharsDeleted = inputText.length - newInputText.length
            setInputText(newInputText)
            setCursorOffset(prev => prev - amoutOfCharsDeleted)
            e.target.value = newInputText
        } else if (e.nativeEvent.inputType === "deleteWordBackward" && cursorOffset < inputText.length) {
            const currIndex = inputText.length - cursorOffset
            let indexUntilDeletion
            if (inputText[currIndex] === " ") {
                indexUntilDeletion = findLastSpaceFromIndex(inputText, currIndex, -1)
            } else {
                indexUntilDeletion =
                    inputText.substring(0, currIndex).lastIndexOf(" ") === -1
                        ? 0
                        : findLastSpaceFromIndex(inputText, inputText.substring(0, currIndex).lastIndexOf(" "), -1)
            }
            const newInputText = inputText.substring(0, indexUntilDeletion) + inputText.substring(currIndex)
            setInputText(newInputText)
            e.target.value = newInputText
        } else {
            setInputText(e.target.value)
        }
    }

    const handleLeftArrow = () => {
        if (inputRef.current?.value && inputRef.current?.value.length > cursorOffset) {
            setCursorOffset(prev => prev + 1)
        }
    }

    const handleRightArrow = () => {
        if (cursorOffset > 0) {
            setCursorOffset(prev => prev - 1)
        }
    }

    useEffect(() => {
        if (loading === true) {
            setTimeout(() => {
                setShowCursor(false)
            }, 0)
        } else {
            setTimeout(() => {
                setShowCursor(true)
            }, 0)
        }
    }, [loading])

    useEffect(() => {
        if (loading === true) {
            return
        }
        setTimeout(() => {
            const containerBounds = containerRef.current?.getBoundingClientRect()
            const refBounds = ref.current?.getBoundingClientRect()
            if (!containerBounds || !refBounds) return
            setCursorPosition({
                x: refBounds.x + refBounds.width - cursorOffset * 9,
                y: containerBounds?.height - 15,
            })
        }, 0)
    }, [inputText, loading, cursorOffset])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = history[index]
            setInputText(history[index])
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
        if (loading === false && inputRef.current) {
            inputRef.current.focus()
        }
    }, [loading])

    useEffect(() => {
        scrollToBottom()
    }, [lines, loading])

    useEffect(() => {
        addProjects()
        const handleResize = () => {
            setWindowHeight(getWindowHeight())
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div ref={containerRef}>
            {lines.map((opt, index) => {
                return <div key={index}>{printBlock(opt, index)}</div>
            })}
            <div ref={bottomRef}></div>
        </div>
    )
}

const print = (opt: PrinterOptions) => {
    const textColor: string = getColor(opt.color)
    const additionalClassName = opt.className ? opt.className : ""
    return (
        <span className={`font-ubuntu-mono whitespace-pre-wrap text-terminal-size ${textColor} ${additionalClassName}`}>
            {opt.text}
        </span>
    )
}

export default Terminal
