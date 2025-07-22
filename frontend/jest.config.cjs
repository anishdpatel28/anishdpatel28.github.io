module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
    '^.+\\.svg$': '<rootDir>/__mocks__/svgTransform.cjs',
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
    '\\.(svg)$': '<rootDir>/__mocks__/svgMock.js',
  },
}; 