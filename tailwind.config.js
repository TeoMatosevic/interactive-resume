/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#171421",
                "terminal-green": "#42E66C",
                "terminal-text": "#D0CFCC",
                "terminal-purple": "#9B6BDF",
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
