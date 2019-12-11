import { componentStories, it, render, expect } from '!/testing-framework'

import Bin from './Bin.svelte'
import markdownNotes from './Bin.stories.md'

componentStories('Kanban|Task batch', Bin, module, markdownNotes)

  .add('empty state', {
    title: 'an empty task bin',
  }, (props) => {
    it('should render', async () => {
      expect(render(Bin, { props })).toBeTruthy()
    })
  })

  .add('with cards', {
    title: 'bin with cards',
    cards: [
      {
        members: [{ image: 'https://randomuser.me/api/portraits/women/28.jpg' }],
        due: new Date(),
        note: 'need to do a thing',
        title: 'first task',
      },
    ],
  }, (props) => {
    it('should render', async () => {
      expect(render(Bin, { props })).toBeTruthy()
    })
  })
