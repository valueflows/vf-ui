import { storiesOf, specs, describe, it } from '!/facade'
import { render } from '@testing-library/svelte'
import expect from 'expect'

import Card from './Card.svelte'
import markdownNotes from './Card.stories.md'

storiesOf('Kanban|Task card', module)

  .add(
    'empty state',
    () => {
      specs(() => describe('empty state', () => {
        it('should render', async () => {
          expect(render(Card)).toBeTruthy()
        })
      }))

      return {
        Component: Card,
      }
    },
    { notes: { markdown: markdownNotes } },
  )

  .add(
    'with linked task',
    () => {
      const props = {
        note: 'a task that needs doing',
        due: new Date(),
        members: [
          { image: 'https://randomuser.me/api/portraits/women/28.jpg' },
          { image: 'https://randomuser.me/api/portraits/women/23.jpg' },
        ],
      }

      specs(() => describe('with linked task', () => {
        it('should render', async () => {
          expect(render(Card, { props })).toBeTruthy()
        })
      }))

      return {
        Component: Card,
        props,
      }
    },
    { notes: { markdown: markdownNotes } },
  )
