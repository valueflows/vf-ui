import { componentStories, it, render, expect } from '!/testing-framework'

import Card from './Card.svelte'
import markdownNotes from './Card.stories.md'

componentStories('Kanban|Task card', Card, module, markdownNotes)

  .add('empty state', {}, (props) => {
    it('should render', async () => {
      expect(render(Card, { props })).toBeTruthy()
    })
  })

  .add('with linked task', {
    note: 'a task that needs doing',
    due: new Date(),
    members: [
      { image: 'https://randomuser.me/api/portraits/women/28.jpg' },
      { image: 'https://randomuser.me/api/portraits/women/23.jpg' },
    ],
  }, (props) => {
    it('should render', async () => {
      expect(render(Card, { props })).toBeTruthy()
    })
  })
