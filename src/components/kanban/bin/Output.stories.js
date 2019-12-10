import { storiesOf, specs, describe, it } from '!/facade'
import { render, cleanup } from '@testing-library/svelte'
import expect from 'expect'

import Output from './Output.svelte'
import markdownNotes from './Output.stories.md'

storiesOf('Kanban|Batch output', module)

  .add(
    'empty state',
    () => {
      specs(() => describe('empty state', () => {
        it('should render', async () => {
          expect(render(Output)).toBeTruthy()
          cleanup()
        })
      }))

      return {
        Component: Output,
      }
    },
    { notes: { markdown: markdownNotes } },
  )

  .add(
    'with output resources',
    () => {
      const props = {
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
      }

      specs(() => describe('with output resources', () => {
        it('should render', async () => {
          expect(render(Output, { props })).toBeTruthy()
          cleanup()
        })
      }))

      return {
        Component: Output,
        props,
      }
    },
    { notes: { markdown: markdownNotes } },
  )
