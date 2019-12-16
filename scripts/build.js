/**
 * Build script to turn Svelte components into compiled, ready-to-go, runtime-specific
 * components that can be dropped in to native web, React & Angular projects (and
 * potentially others in future) without requiring any bundler / loader configuration.
 *
 * @see https://github.com/sveltejs/rollup-plugin-svelte/blob/master/index.js
 *
 * @package: HoloREA
 * @since:   2019-12-16
 */

const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp-promise')
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
    if (warnings && warnings.length) {
      errors = errors.concat(warnings)
    }
  }

  // iterate over all Svelte components
  for await (const path of globby.stream(MATCH_PATHS)) {
    threads.push(new Promise((resolve, reject) => {
      fs.readFile(path, async (err, file) => {
        if (err) {
          err.message = `Error reading ${path}: ${err.message}`
          errors.push(err)
          return resolve() // always return success, log errors non-fatally & separately
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
        try {
          await writeComponentFiles(path, compiled)
        } catch (err) {
          err.message = `Error writing ${path}: ${err.message}`
          errors.push(err)
        }

        // mark component as completed
        resolve()
      })
    }))
  }

  Promise.all(threads).then(() => {
    if (errors.length) {
      console.error('Finished with errors:')
      errors.forEach(err => {
        console.error("\n" + err.toString())
      })
    } else {
      console.log('Compiled successfully.')
    }
  })
}

async function writeComponentFiles (filePath, compiled) {
  const dest = path.resolve(BUILD_BASEDIR, filePath)

  await mkdirp(path.dirname(dest))

  if (compiled.css.code) {
    await writeFilePromise(getFileId(dest, 'css'), compiled.css.code)
  }
  if (compiled.js.code) {
    await writeFilePromise(getFileId(dest, 'js'), compiled.js.code)
  }
}

function getFileId (path, newExt) {
  return path.replace(/\.svelte$/, `.${newExt}`)
}

function writeFilePromise (filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err, res) => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

main()
