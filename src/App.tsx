import { Terminal, Loading } from "./components"
import { useState, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useFileSystem } from "./hooks"
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import MarkdownContext from "./contexts/MarkdownContext"
import { isMobile, useMobileOrientation } from 'react-device-detect'

const App = () => {
    const [counter, setCounter] = useState(0)
    const { loading, markdown, setMarkdown, justClosedMarkdown, setJustClosedMarkdown } = useFileSystem()
    const ref = useRef<HTMLDivElement>(null)
    const { isLandscape } = useMobileOrientation()

    const incrementCounter = () => {
        setCounter((prev) => prev + 1)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (markdown === null) {
                return
            }
            if (e.key === "q") {
                setMarkdown(null)
                setJustClosedMarkdown(true)
                ref.current?.focus()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [markdown])

    return (
        <>
            {
                isMobile === true ? (<div className="p-2 text-terminal-white font-ubuntu-mono text-lg text-center h-full">
                    {isLandscape === false ? (
                        <div className="absolute top-0 w-full flex justify-center items-center blink">
                            Please view this on a desktop browser for the best experience. <br />
                            Flip your device for a better view. Thank you! :)
                        </div>
                    ) : null}
                    <div className="flex justify-center items-center h-full">
                        <img src="https://s6.gifyu.com/images/bzoUl.gif" alt="video" />
                    </div>
                </div>) : (
                    <MarkdownContext.Provider value={[markdown, setMarkdown, justClosedMarkdown, setJustClosedMarkdown]} >
                        <div className="h-full w-full relative">
                            {loading ?
                                <div className="p-2 bg-background h-full w-full">
                                    <Loading />
                                </div>
                                :
                                <div onClick={incrementCounter} className="p-2 bg-background h-full w-full">
                                    <Terminal refresh={counter} />
                                </div>
                            }
                            {markdown !== null &&
                                <div
                                    className="fixed top-[5%] left-[5%] w-[90%] h-[90%] overflow-scroll z-50 border-8 border-terminal-gray-light rounded-2xl bg-terminal-white scrollbar-none"
                                    ref={ref}
                                >
                                    <div className="relative">
                                        <div className="p-6">
                                            <ReactMarkdown components={{
                                                code(props) {
                                                    const { children, className, node, ...rest } = props
                                                    const match = /language-(\w+)/.exec(className || '')
                                                    return match ? (
                                                        <SyntaxHighlighter
                                                            PreTag="div"
                                                            children={String(children).replace(/\n$/, '')}
                                                            language={match[1]}
                                                            style={dark}
                                                        />
                                                    ) : (
                                                        <code {...rest} className={className}>
                                                            {children}
                                                        </code>
                                                    )
                                                }
                                            }} remarkPlugins={[remarkGfm]}>{markdown}
                                            </ReactMarkdown>
                                        </div>
                                        <div className="absolute top-0 right-0 p-2 pr-4 text-terminal-black font-ubuntu-mono text-2xl">
                                            Press 'q' to exit
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </MarkdownContext.Provider >
                )
            }
        </>
    )
}

export default App
