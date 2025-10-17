/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Keep safelist minimal: only the color tokens we actually use for dynamic icon classes.
  // If you need more later, add colors explicitly instead of a wide regex.
  safelist: [
    { pattern: /^text-(?:sky|blue|indigo|emerald|orange)-(?:400|500|600)$/ },
  ],

  // Reduce useless :hover rules on touch-only devices
  future: {
    hoverOnlyWhenSupported: true,
  },

  theme: {
    extend: {
      animation: {
        glitch: "glitch 1s infinite",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        glitch: {
          "0%": { transform: "none", opacity: 1 },
          "10%": {
            transform: "skew(0.5deg, -0.9deg) translate(2px, -1px)",
            opacity: 0.8,
          },
          "20%": {
            transform: "skew(-1deg, 0.5deg) translate(-1px, 1px)",
            opacity: 1,
          },
          "30%": { transform: "translate(3px, 0)", opacity: 0.9 },
          "40%": { transform: "translate(-3px, 1px)", opacity: 0.6 },
          "50%": { transform: "none", opacity: 1 },
          "60%": { transform: "translate(1px, -2px)", opacity: 0.7 },
          "70%": { transform: "translate(-2px, 2px)", opacity: 0.95 },
          "80%": {
            transform: "skew(1deg, -1deg) translate(0, 0)",
            opacity: 0.9,
          },
          "90%": { transform: "translate(1px, 1px)", opacity: 1 },
          "100%": { transform: "none", opacity: 1 },
        },
        slideIn: {
          "0%": { opacity: 0, transform: "translateY(-0.5rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },

  plugins: [],

  // Usage tip: in markup, prefer `motion-safe:animate-*` so users with
  // prefers-reduced-motion won't get heavy animations.
};
