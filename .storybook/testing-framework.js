import { storiesOf, specs, describe, it } from './facade'
import { cleanup, render } from '@testing-library/svelte'
import expect from 'expect'

export const componentStories = (componentName, component, mod, markdownNotes = '') => {
  const stories = storiesOf(componentName, mod)
  const oldAdd = stories.add.bind(stories)
  // const oldAddWI = stories.addWithInfo.bind(stories)

  function wrap(originalMethod, testName, props, assertions) {
    return originalMethod(
      testName,
      () => {
        specs(() => describe(testName, () => {
          assertions(props)
          cleanup()
        }))

        return { Component: component, props }
      },
      { notes: { markdown: markdownNotes } },
    )
  }

  stories.add = wrap.bind(stories, oldAdd)
  // stories.addWithInfo = wrap.bind(stories, oldAddWI)

  return stories
}

export { it, render, expect }
