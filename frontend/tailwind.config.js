/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Safelist ensures dynamically composed classes are not purged.
  // Adjust the palette/levels to match what you actually use in data.
  safelist: [
    {
      // text color tokens used by dynamic icon classes: e.g. "text-sky-500"
      pattern:
        /^text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:400|500|600)$/,
    },
    // If you ever pass dynamic bg colors from data, uncomment:
    // {
    //   pattern:
    //     /^bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:100|200|500)$/,
    // },
  ],

  // Opt-in future behavior to reduce useless :hover rules on devices without hover
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

  // Usage tip (not a config): prefer `motion-safe:animate-glitch` in markup,
  // so users with `prefers-reduced-motion` are not forced to see heavy animation.
};
