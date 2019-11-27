import { storiesOf } from '@storybook/svelte'
import Card from './Card.svelte'
import markdownNotes from './Card.stories.md'

storiesOf('Kanban|Task card', module)

  .add(
    'empty state',
    () => ({
      Component: Card,
      props: {
      },
    }),
    { notes: { markdown: markdownNotes } },
  )

  .add(
    'with linked task',
    () => ({
      Component: Card,
      props: {
        note: 'a task that needs doing',
        due: new Date(),
        members: [
          { image: 'https://randomuser.me/api/portraits/women/28.jpg' },
          { image: 'https://randomuser.me/api/portraits/women/23.jpg' },
        ],
      },
    }),
    { notes: { markdown: markdownNotes } },
  )
