import { storiesOf } from '@storybook/svelte'
import Output from './Output.svelte'
import markdownNotes from './Output.stories.md'

storiesOf('Kanban|Batch output', module)

  .add(
    'empty state',
    () => ({
      Component: Output,
      props: {
      },
    }),
    { notes: { markdown: markdownNotes } },
  )

  .add(
    'with output resources',
    () => ({
      Component: Output,
      props: {
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
      },
    }),
    { notes: { markdown: markdownNotes } },
  )
