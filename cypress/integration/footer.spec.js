describe('Footer', () => {
  context('With a single todo', () => {
    it('displays a singular todo in count', () => {
      cy.seedAndVisit([{id: 1, name: 'buy milk', isComplete: false}])
      cy.get('.todo-count')
      .should('contain', '1 todo left')
    });
  })

  context('with multiple todos', () => {
    beforeEach(() => {
      cy.seedAndVisit()
    })

    it('displays plural todos in count', () => {
      cy.get('.todo-count')
      .should('contain', '3 todos left')
    })

    it('Filters to active todos', () => {
      cy.contains('Active')
      .click()

      cy.get('.todo-list li')
      .should('have.length', 3)

      
    });
  })
})
