// @see https://github.com/sveltejs/rollup-plugin-svelte/blob/master/index.js

const path = require('path')
const fs = require('fs')
const globby = require('globby')
const { compile, preprocess } = require('svelte/compiler')

// :TODO: make config path, build dir and match expression configurable

const globalConfig = require(path.resolve(process.cwd(), 'svelte.config')) // :NOTE: loads from working directory
const config = Object.assign({}, globalConfig)
/* eslint dot-notation: 0 */
delete config['preprocess']

const MATCH_PATHS = 'src/**/*.svelte'
const BUILD_BASEDIR = path.resolve(process.cwd(), 'build/')

const main = async () => {
  let errors = []
  const threads = []

  function extractWarnings (warnings) {
    errors = errors.concat(warnings)
  }

  for await (const path of globby.stream(MATCH_PATHS)) {
    threads.push(new Promise((resolve, reject) => {
      fs.readFile(path, async (err, file) => {
        if (err) {
          return reject(new Error(`Error reading ${path}:`, err))
        }

        const thisFileOpts = { filename: path }
        const cssId = getFileId(path, 'css')

        // compile the component
        const processed = await preprocess(file.toString(), globalConfig.preprocess, thisFileOpts)
        extractWarnings(processed.warnings)

        const compiled = compile(
          processed.toString(),
          Object.assign({}, config, thisFileOpts),
        )
        extractWarnings(compiled.warnings)

        if (compiled.css.code) {
          // add CSS sourcemap
          const sourcemapComment = `/*# sourceMappingURL=${compiled.css.map.toUrl()} */`
          compiled.css.code += `\n${sourcemapComment}`

          // add import of CSS into JS component
          compiled.js.code = `import ${JSON.stringify(cssId)}\n\n` + compiled.js.code
        }

        // write assets to disk
        await writeComponentFiles(path, compiled)

        // mark component as completed
        resolve()
      })
    }))
  }

  Promise.all(threads).then(() => {
    if (errors.length) {
      console.error('Finished with errors.')
    } else {
      console.log('Compiled successfully.')
    }
  })
}

async function writeComponentFiles (path, compiled) {
  const dest = path.join(BUILD_BASEDIR, path)

  // :TODO:
}

function getFileId (path, newExt) {
  return path.replace(/\.svelte$/, `.${newExt}`)
}

main()
