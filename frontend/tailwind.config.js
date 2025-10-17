/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Keep safelist minimal — only dynamic color tokens actually used in data-driven icons.
  safelist: [
    { pattern: /^text-(?:sky|blue|indigo|emerald|orange)-(?:400|500|600)$/ },
  ],

  // Avoid generating :hover utilities on touch devices
  future: {
    hoverOnlyWhenSupported: true,
  },

  theme: {
    extend: {
      // Keep animations lightweight; use only where motion-safe
      animation: {
        "slide-in": "slideIn 0.25s ease-out both",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateY(-0.25rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },

  plugins: [],
};
