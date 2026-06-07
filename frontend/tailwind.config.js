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
        "splash-fade-in": "splashFadeIn 500ms ease-out forwards",
        "splash-pulse": "splashPulse 3s ease-in-out infinite",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateY(-0.25rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        splashFadeIn: {
          "0%": { opacity: 0, transform: "scale(0.88)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        splashPulse: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.7, transform: "scale(1.12)" },
        },
      },
    },
  },

  plugins: [],
};
