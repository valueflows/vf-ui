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

  .add(
    'with tasks',
    () => ({
      Component: Kanban,
      props: {
        bins: [{
          title: 'first batch of tasks',
          note: 'doing stuff',
          due: new Date(),
          cards: [{
            note: 'a task that needs doing',
            due: new Date(),
            members: [
              { image: 'https://randomuser.me/api/portraits/women/28.jpg' },
              { image: 'https://randomuser.me/api/portraits/women/23.jpg' },
            ],
          }],
          outputs: [{
            resourceClassifiedAs: {
              name: 'an output resource',
            },
          }],
        }],
      },
    }),
    { notes: { markdown: markdownNotes } },
  )
