// This is a standard Jest config, completely bypassing next/jest to avoid SWC issues.
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // The transform section is the most critical part.
  // It explicitly tells Jest to use babel-jest for all JS/TS files.
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    // These mocks are essential and were previously handled by next/jest.
    // We must now handle them manually.
    'lucide-react': '<rootDir>/src/__mocks__/lucide-react.tsx',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Ignore transformations for node_modules, except for specific ESM modules if needed
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
