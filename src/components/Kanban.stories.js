import { storiesOf } from '@storybook/svelte'
import Kanban from './Kanban.svelte'

storiesOf('Kanban|Whole board', module)
  .add(
    'empty state',
    () => ({
      Component: Kanban,
      props: {
      },
    }),
  )
