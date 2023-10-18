/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "Goldman": ['Goldman']
      }
    },
    colors: {
      background: {
        default: "#1D2025",
      },
      "primary": {
        default: "#EFC9A4",
      },
      "secondary": {
        default: "#02D9C5"
      },
      "text": {
        default: "#B0B4B7",
        "50%": "rgba(176, 180, 183, 0.5)"
      }
    }
  },
  plugins: [],
}

