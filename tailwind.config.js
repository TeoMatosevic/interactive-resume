/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#171421",
                "terminal-gray": "#262626",
                "terminal-gray-light": "#7A7A7A",
                "terminal-pink": "#E356A7",
                "terminal-pink-light": "#FF79C6",
                "terminal-green": "#42E66C",
                "terminal-green-light": "#50FA7B",
                "terminal-white": "#D0CFCC",
                "terminal-purple": "#9B6BDF",
                "terminal-purple-dark": "#6E46A4",
                "terminal-purple-light": "#BD93F9",
                "terminal-yellow": "#E4F34A",
                "terminal-yellow-light": "#F1FA8C",
                "terminal-red": "#E64747",
                "terminal-red-light": "#FF5555",
                "terminal-blue": "#75D7EC",
                "terminal-blue-light": "#8BE9FD",
                "terminal-brown": "#EFA554",
                "terminal-brown-light": "#FFB86C",
            },
            fontFamily: {
                "ubuntu-mono": ["Ubuntu Mono", "monospace"],
            },
            fontSize: {
                "terminal-size": "18px",
            },
        },
    },
    plugins: [],
}
