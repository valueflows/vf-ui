const path = require('path')

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['babel-plugin-root-import', {
      paths: [
        {
          rootPathSuffix: path.resolve(__dirname, './src'),
          rootPathPrefix: '~/',
        },
        {
          rootPathSuffix: path.resolve(__dirname, './.storybook'),
          rootPathPrefix: '!/',
        },
      ],
    }],
    ['@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
}
