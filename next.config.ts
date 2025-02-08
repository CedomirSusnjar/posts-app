module.exports = {
  eslint: {
    dirs: ['pages', 'app'], // Run ESLint in these directories
    ignoreDuringBuilds: true, // Ignore ESLint errors during production builds (optional)
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
};
