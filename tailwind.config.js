module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 3s  infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
