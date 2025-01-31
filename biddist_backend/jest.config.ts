export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    setupFiles: ['./setup.ts'],
    testPathIgnorePatterns: ['./dist'],
    maxWorkers: 1,
  };
  