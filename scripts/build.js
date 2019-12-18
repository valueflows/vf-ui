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

  function addError (messagePrefix, err) {
    if (messagePrefix) {
      err.message = `${messagePrefix}: ${err.message}`
    }
    errors.push(err)
  }

  function extractWarnings (path, warnings) {
    if (warnings && warnings.length) {
      warnings.forEach(w => {
        w.message = `Warning: ${w.message}`
      })
      errors = errors.concat(warnings)
    }
  }

  // iterate over all Svelte components
  for await (const path of globby.stream(MATCH_PATHS)) {
    threads.push(new Promise((resolve, reject) => {
      fs.readFile(path, async (err, file) => {
        if (err) {
          addError(`Error reading ${path}`, err)
          return resolve() // always return success, log errors non-fatally & separately
        }

        const thisFileOpts = { filename: path }
        const cssId = getFileId(path, 'css')

        // compile the component
        let compiled

        try {
          const processed = await preprocess(file.toString(), globalConfig.preprocess, thisFileOpts)
          extractWarnings(path, processed.warnings)

          compiled = compile(
            processed.toString(),
            Object.assign({}, config, thisFileOpts),
          )
          extractWarnings(path, compiled.warnings)
        } catch (err) {
          addError('', err)
          return resolve()
        }

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
          addError(`Error writing ${path}`, err)
        }

        // mark component as completed
        resolve()
      })
    }))
  }

  Promise.all(threads).then(() => {
    if (errors.length) {
      console.log('Finished with errors.')
      console.error('')
      errors.forEach(renderError)
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

  // :TODO: write JS sourcemap; write CSS sourcemap separately
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

const RESET = '\x1b[0m'
const BRIGHT = '\x1b[1m'
const DIM = '\x1b[2m'

const BG_RED = '\x1b[41m'

const FG_WHITE = '\x1b[37m'
const FG_YELLOW = '\x1b[33m'

const STYL_LBL = `${BRIGHT}${BG_RED}${FG_WHITE}`
const STYL_PATH = `${DIM}${FG_WHITE}`
const STYL_MSG = `${FG_WHITE}`
const STYL_FRAME = `${FG_YELLOW}`

function renderError (error) {
  const stack = error.stack
  const filename = error.filename
  const message = error.message
  const frame = error.frame
  const line = error.start ? error.start.line : ''
  let kind

  if (error.kind) {
    kind = error.kind
  } else if (typeof stack === 'string') {
    const m = stack.match(/^([a-zA-Z0-9\_\$]+):\ /)
    if (m) {
      kind = m[1]
    }
  }

  console.error(`${STYL_LBL}${kind || 'Error'}${RESET}: ${STYL_PATH}${filename}${line ? `:${line}` : ''}${RESET}`)
  console.error(`\t${STYL_MSG}${message}${RESET}`)
  if (frame) {
    console.error(`${STYL_FRAME}${frame}${RESET}`)
  } else {
    console.error(`${STYL_FRAME}${stack}${RESET}`)
  }
  console.error()
}

main()
