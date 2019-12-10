import { storiesOf, specs, describe, it } from '!/facade'
import { render, cleanup } from '@testing-library/svelte'
import expect from 'expect'

import Kanban from './Kanban.svelte'
import markdownNotes from './Kanban.stories.md'

storiesOf('Kanban|Whole board', module)

  .add('empty state',
    () => {
      specs(() => describe('empty state', () => {
        it('should render', async () => {
          expect(render(Kanban)).toBeTruthy()
          cleanup()
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
    () => {
      const props = {
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
      }

      specs(() => describe('with tasks', () => {
        it('should render', async () => {
          expect(render(Kanban, { props })).toBeTruthy()
          cleanup()
        })
      }))

      return {
        Component: Kanban,
        props,
      }
    },
    { notes: { markdown: markdownNotes } },
  )
