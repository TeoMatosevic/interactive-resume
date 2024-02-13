import { useEffect, useState } from "react"
import { Block, PrinterOptions } from "../models"

const TIME_DIFF = 50

const usePrintOptions = (blocks: Block[], setLoading: (loading: boolean) => void) => {
    const [lines, setLines] = useState<PrinterOptions[][]>([])

    useEffect(() => {
        setLoading(true)
        const lastAsyncBlockIndex = blocks.map((block) => block.async).lastIndexOf(true)
        const asyncBlocks = blocks.slice(lastAsyncBlockIndex)
        const syncBlocks = blocks.slice(0, lastAsyncBlockIndex)
        const syncLines = syncBlocks.map((block) => block.options)

        setLines(syncLines)
        const flatAsyncOptions = asyncBlocks.flatMap((block) => block.options)
        let currentIndex = 0
        const interval = setInterval(() => {
            if (currentIndex < flatAsyncOptions.length) {
                setLines((prev) => {
                    const newLines = [...prev]
                    if (currentIndex === 0) {
                        newLines.push([flatAsyncOptions[currentIndex]])
                    } else {
                        newLines[prev.length - 1].push(flatAsyncOptions[currentIndex])
                    }
                    currentIndex++
                    return newLines
                })
            } else {
                clearInterval(interval)
                setLoading(false)
            }
        }, TIME_DIFF)
    }, [blocks])

    return lines
}

export default usePrintOptions
