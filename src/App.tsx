import { Terminal, Loading } from "./components"
import { useState, useEffect } from "react"
import { useFileSystem } from "./hooks"

const App = () => {
    const [counter, setCounter] = useState(0)
    const { loading, addProjects } = useFileSystem()

    const incrementCounter = () => {
        setCounter((prev) => prev + 1)
    }

    useEffect(() => {
        addProjects()
    }, [])

    return (
        <div className="h-full w-full">
            {loading &&
                <div className="p-2 bg-background h-full w-full">
                    <Loading />
                </div>
            }
            {!loading &&
                <div onClick={incrementCounter} className="p-2 bg-background h-full w-full">
                    <Terminal refresh={counter} />
                </div>
            }
        </div>
    )
}

export default App
