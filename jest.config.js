const path = require('path')

module.exports = {
  testMatch: [
    '**/?(*.)+(stories|spec|test).[tj]s?(x)',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
  },
  moduleFileExtensions: ['js', 'svelte'],
  bail: false,
  verbose: false,
  automock: false,
  setupFiles: [
    path.resolve(__dirname, './.storybook/jest.setup.js'),
  ],
  setupFilesAfterEnv: [
    // '@testing-library/svelte/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect',
  ],
}
