// :NOTE: This file is picked up by some editor tooling and will determine how syntax is
//        handled in different Svelte template blocks.

const path = require('path')
const sveltePreprocess = require('svelte-preprocess')

module.exports = {
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
