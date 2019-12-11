import { componentStories, it, render, expect } from '!/testing-framework'

import Kanban from './Kanban.svelte'
import markdownNotes from './Kanban.stories.md'

componentStories('Kanban|Whole board', Kanban, module, markdownNotes)

  .add('empty state', {}, (props) => {
    it('should render', async () => {
      expect(render(Kanban, { props })).toBeTruthy()
    })
  })

  .add('with tasks', {
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
  }, (props) => {
    it('should render', async () => {
      expect(render(Kanban, { props })).toBeTruthy()
    })
  })
