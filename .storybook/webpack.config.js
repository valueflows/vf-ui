const path = require('path')

const sveltePreprocess = require('svelte-preprocess')

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
      rule.options = {
        preprocess: [
          sveltePreprocess({
            postcss: true,
            // :TODO: has issues with Svelte `3.15.0`, subsequent versions may fix
            // typescript: {
            //   tsconfigDirectory: path.resolve(__dirname, '../'),
            //   transpileOnly: false,
            // },
            stylus: false,
            scss: false,
            pug: false,
          }),
        ],
      }
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
