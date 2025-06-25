/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          red:    "#E10600",
          purple: "#7E00FF",
        },
        dark: {
          DEFAULT: "#0A0A0A",
          800:     "#1A1A1A",
        },
        light: {
          DEFAULT: "#F5F5F5",
        }
      },
      backgroundImage: {
        "showroom-night": "url('/assets/fondo01.png')",
      },
      fontFamily: {
        heading: ["Montserrat","sans-serif"],
        body:    ["Poppins","sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}