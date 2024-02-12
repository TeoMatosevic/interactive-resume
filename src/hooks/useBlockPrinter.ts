import { useEffect, useState } from "react"
import { Block, PrinterOptions } from "../models"

const TIME_DIFF = 100
const TIME_EXTRA_DIVIDER = 40

const usePrintOptions = (blocks: Block[], setLoading: (loading: boolean) => void) => {
    const [lines, setLines] = useState<PrinterOptions[][]>([])

    useEffect(() => {
        setLoading(true)
        const lastAsyncBlockIndex = blocks.map((block) => block.async).lastIndexOf(true)
        const asyncBlocks = blocks.slice(lastAsyncBlockIndex)
        const syncBlocks = blocks.slice(0, lastAsyncBlockIndex)
        const syncLines = syncBlocks.map((block) => block.options)

        setLines(syncLines)
        let delay = 0
        let nextDelay = 0
        asyncBlocks.forEach((block, index) => {
            delay = nextDelay
            nextDelay += block.options.length * TIME_DIFF + (block.options.length * TIME_DIFF) / TIME_EXTRA_DIVIDER
            setTimeout(() => {
                let currentIndex = 0
                const interval = setInterval(() => {
                    if (currentIndex < block.options.length) {
                        setLines((prev) => {
                            const newLines = [...prev]
                            if (currentIndex === 0) {
                                newLines.push([block.options[currentIndex]])
                            } else {
                                newLines[prev.length - 1].push(block.options[currentIndex])
                            }
                            currentIndex++
                            return newLines
                        })
                    } else {
                        clearInterval(interval)
                        if (index === asyncBlocks.length - 1) {
                            setLoading(false)
                        }
                    }
                }, TIME_DIFF)
            }, delay)
        })
    }, [blocks])

    return lines
}

export default usePrintOptions
