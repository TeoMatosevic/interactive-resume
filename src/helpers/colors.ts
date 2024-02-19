import { Color } from "../models"

const getColor = (color: Color) => {
    switch (color) {
        case Color.GRAY:
            return "text-terminal-gray"
        case Color.GRAY_LIGHT:
            return "text-terminal-gray-light"
        case Color.PINK:
            return "text-terminal-pink"
        case Color.PINK_LIGHT:
            return "text-terminal-pink-light"
        case Color.WHITE:
            return "text-terminal-white"
        case Color.GREEN:
            return "text-terminal-green"
        case Color.GREEN_LIGHT:
            return "text-terminal-green-light"
        case Color.PURPLE:
            return "text-terminal-purple"
        case Color.PURPLE_LIGHT:
            return "text-terminal-purple-light"
        case Color.PURPLE_DARK:
            return "text-terminal-purple-dark"
        case Color.YELLOW:
            return "text-terminal-yellow"
        case Color.YELLOW_LIGHT:
            return "text-terminal-yellow-light"
        case Color.RED:
            return "text-terminal-red"
        case Color.RED_LIGHT:
            return "text-terminal-red-light"
        case Color.BLUE:
            return "text-terminal-blue"
        case Color.BLUE_LIGHT:
            return "text-terminal-blue-light"
        case Color.BROWN:
            return "text-terminal-brown"
        case Color.BROWN_LIGHT:
            return "text-terminal-brown-light"
        default:
            return "text-terminal-white"
    }
}

export { getColor }
