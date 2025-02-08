import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Mock `useRouter` from `next/navigation`
    '^next/navigation$': '<rootDir>src/mocks/next/navigation.ts',
    '^@/context/AppContext': '<rootDir>src/mocks/useApp/useApp.ts',
    // Optionally mock other Next.js modules like `next/head`, `next/link`, etc.
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
