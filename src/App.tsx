import { Printer } from "./components"
import { useState } from "react"

const App = () => {
    const [counter, setCounter] = useState(0)

    const incrementCounter = () => {
        setCounter((prev) => prev + 1)
    }

    return (
        <div className="h-full w-full">
            <div onClick={incrementCounter} className="p-2 bg-background h-full w-full">
                <Printer refresh={counter} />
            </div>
        </div>
    )
}

export default App
