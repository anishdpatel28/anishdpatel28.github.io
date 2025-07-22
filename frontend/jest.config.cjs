module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testMatch: [
    '<rootDir>/tests/**/*.(test|spec).(ts|tsx)'
  ],
  moduleNameMapper: {
    '^gsap$': '<rootDir>/../__mocks__/gsap.js',
    '^gsap/ScrollTrigger$': '<rootDir>/../__mocks__/gsap/ScrollTrigger.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}; 