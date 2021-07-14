describe('Footer', () => {
  context('With a single todo', () => {
    it.only('displays a singular todo in count', () => {
      cy.seedAndVisit([{id: 1, name: 'buy milk', isComplete: false}])
      cy.get('.todo-count')
      .should('contain', '1 todo left')
    });
  })

  context('with multiple todos', () => {
    it.only('displays plural todos in count', () => {
      cy.seedAndVisit()

      cy.get('.todo-count')
      .should('contain', '3 todos left')
    })
  })
})
