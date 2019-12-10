import { storiesOf, specs, describe, it } from '!/facade'
import { render } from '@testing-library/svelte'
import expect from 'expect'

import Kanban from './Kanban.svelte'
import markdownNotes from './Kanban.stories.md'

storiesOf('Kanban|Whole board', module)

  .add('empty state',
    () => {
      specs(() => describe('empty state', function () {
        it('Should render OK without any props provided', function () {
          expect(render(Kanban)).toBeTruthy()
        })
      }))

      return {
        Component: Kanban,
        props: {
        },
      }
    },
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
