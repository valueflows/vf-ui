const path = require('path')

const svelteOptions = require(path.join(process.cwd(), 'svelte.config'))

module.exports = ({ config, mode }) => {

  const svelteLoaderPath = require.resolve('svelte-loader')

  // :NOTE: only visible when run with `--debug-webpack` CLI flag
  require('util').inspect(config, { depth: null, colors: true })

  // enable sourcemaps
  if (mode === 'DEVELOPMENT') {
    config.devtool = 'inline-source-map'
  }

  config.module.rules.forEach(rule => {
    // inject preprocessor plugin into Svelte
    if (rule.loader === svelteLoaderPath) {
      rule.options = svelteOptions
    }
  })

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
    // :TODO: re-enabel this when it no longer breaks sourcemaps
    // {
    //   test: /\.stories\.js?$/,
    //   loaders: [require.resolve('@storybook/addon-storysource/loader')],
    //   include: [path.resolve(__dirname, '../src')],
    //   enforce: 'pre',
    // },
  );

  return config;
};
