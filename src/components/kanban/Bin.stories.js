import { storiesOf, specs, describe, it } from '!/facade'
import { render } from '@testing-library/svelte'
import expect from 'expect'

import Bin from './Bin.svelte'
import markdownNotes from './Bin.stories.md'

storiesOf('Kanban|Task batch', module)

  .add(
    'empty state',
    () => {
      const props = {
        title: 'an empty task bin',
      }

      specs(() => describe('empty state', () => {
        it('should render', async () => {
          expect(render(Bin, { props })).toBeTruthy()
        })
      }))

      return {
        Component: Bin,
        props,
      }
    },
    { notes: { markdown: markdownNotes } },
  )

  .add(
    'with cards',
    () => {
      const props = {
        title: 'bin with cards',
        cards: [
          {
            members: [{ image: 'https://randomuser.me/api/portraits/women/28.jpg' }],
            due: new Date(),
            note: 'need to do a thing',
            title: 'first task',
          },
        ],
      }

      specs(() => describe('with cards', () => {
        it('should render', async () => {
          expect(render(Bin, { props })).toBeTruthy()
        })
      }))

      return {
        Component: Bin,
        props,
      }
    },
    { notes: { markdown: markdownNotes } },
  )
