import { useState, useEffect } from "react"

const useHistory = () => {
    const [history, setHistory] = useState<string[]>([""])
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        setIndex(history.length - 1)
    }, [history])

    const push = (input: string) => {
        const historyCopy = history.slice(0, -1)
        setHistory([...historyCopy, input, ""])
    }

    const up = () => {
        if (index > 0) {
            setIndex((prev) => prev - 1)
        }
    }

    const down = () => {
        if (index < history.length - 1) {
            setIndex((prev) => prev + 1)
        }
    }

    return { history, index, push, up, down }
}

export default useHistory
