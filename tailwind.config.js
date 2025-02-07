module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // This includes all files in the app directory
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8D77AB',
        secondary: '#F9F6E6',
        white: '#FFFFFF',
      },
      fontSize: {
        xs: '0.75rem', // Extra small font size (12px)
        sm: '0.875rem', // Small font size (14px)
        base: '1rem', // Default base font size (16px)
        lg: '1.125rem', // Large font size (18px)
        xl: '1.25rem', // Extra large font size (20px)
        '2xl': '1.5rem', // 2x extra large font size (24px)
        '3xl': '1.875rem', // 3x extra large font size (30px)
        '4xl': '2.25rem', // 4x extra large font size (36px)
        '5xl': '3rem', // 5x extra large font size (48px)
        '6xl': '4rem', // 6x extra large font size (64px)
        '7xl': '5rem', // 7x extra large font size (80px)
        '8xl': '6rem', // 8x extra large font size (96px)
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
