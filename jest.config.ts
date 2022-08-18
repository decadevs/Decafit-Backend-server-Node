import type {Config} from '@jest/types'

const config:Config.InitialOptions ={
  preset:'ts-jest',
  testEnvironment:'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "text",
    "lcov",
  ],
  globalSetup: './src/config/test/globalSetup.ts',
  globalTeardown: './src/config/test/globalTeardown.ts',
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  roots: [
    "<rootDir>/src/"
  ],
  setupFilesAfterEnv: ['./src/config/test/setups.ts'],
  testMatch: [
    "**/__tests__/**/*.ts",
    "**/?(*.)+(spec|test).ts"
  ],
  testPathIgnorePatterns: [
    "/node_modules/", "/dist/"
  ],
  transformIgnorePatterns: [],
};
