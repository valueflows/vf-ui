import { componentStories, it, render, expect } from '!/testing-framework'

import Output from './Output.svelte'
import markdownNotes from './Output.stories.md'

componentStories('Kanban|Batch output', Output, module, markdownNotes)

  .add('empty state', {}, (props) => {
    it('should render', async () => {
      expect(render(Output, { props })).toBeTruthy()
    })
  })

  .add('with output resources', {
    outputs: [
      {
        resourceClassifiedAs: {
          name: 'an output resource',
        },
      },
      {
        resourceClassifiedAs: {
          name: 'another output resource',
        },
      },
    ],
  }, (props) => {
    it('should render', async () => {
      expect(render(Output, { props })).toBeTruthy()
    })
  })
