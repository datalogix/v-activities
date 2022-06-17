import { mount } from '@cypress/vue'
import MemoryGame from '../../src/components/activities/MemoryGame/Index.vue'

describe('Basic', () => {
  it('renders the todo list', () => {
    mount(MemoryGame)

    cy.get('[data-testid=todo-list]').should('exist')
  })
})
