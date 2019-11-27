import { storiesOf } from '@storybook/svelte'
import Bin from './Bin.svelte'
import markdownNotes from './Bin.stories.md'

storiesOf('Kanban|Task batch', module)

  .add(
    'empty state',
    () => ({
      Component: Bin,
      props: {
        title: 'an empty task bin',
      },
    }),
    { notes: { markdown: markdownNotes } },
  )

  .add(
    'with cards',
    () => ({
      Component: Bin,
      props: {
        title: 'bin with cards',
        cards: [
          {
            members: [{ image: 'https://randomuser.me/api/portraits/women/28.jpg' }],
            due: new Date(),
            note: 'need to do a thing',
            title: 'first task',
          },
        ],
      },
    }),
    { notes: { markdown: markdownNotes } },
  )
