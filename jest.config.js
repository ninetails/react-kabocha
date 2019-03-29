module.exports = {
  browser: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts,tsx}'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest'
  }
}
