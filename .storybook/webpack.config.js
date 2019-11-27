const path = require('path')

module.exports = ({ config, mode }) => {
  config.module.rules.push(
    // load in any raw CSS files using PostCSS
    {
      test: /\.css$/,
      loaders: [
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './.storybook/',
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../src/'),
    },
    // inject story source addon
    {
      test: /\.stories\.js?$/,
      loaders: [require.resolve('@storybook/addon-storysource/loader')],
      include: [path.resolve(__dirname, '../src')],
      enforce: 'pre',
    },
  );

  return config;
};
