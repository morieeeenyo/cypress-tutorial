describe('Smoke tests', () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')
      .its('body')
      .each(todo => cy.request('DELETE', `api/todos/${todo.id}`))
  })

  context('With no todos', () => {
    it('Save new todos', () => {
      const items = [
        'Buy milk',
        'Buy eggs',
        'Buy meat'
      ]

      cy.visit('/')
      cy.server()
      cy.route('POST', '/api/todos')
        .as('create')

      cy.wrap(items)
      .each(item => {
        cy.focused()
        .type(item)
        .type('{enter}')

        cy.wait('@create')
  
        cy.get('.todo-list li')
        .should('have.length', items.indexOf(item) + 1)   
      })

    });
  })
})
