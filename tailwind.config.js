module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",  // This includes all files in the app directory
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8D77AB',
        secondary: '#F9F6E6',
      },
    },
  },
  plugins: [],
}