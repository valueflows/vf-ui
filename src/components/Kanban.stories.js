import { storiesOf } from '@storybook/svelte'
import Kanban from './Kanban.svelte'
import markdownNotes from './Kanban.stories.md'

storiesOf('Kanban|Whole board', module)
  .add(
    'empty state',
    () => ({
      Component: Kanban,
      props: {
      },
    }),
    { notes: { markdown: markdownNotes } },
  )
