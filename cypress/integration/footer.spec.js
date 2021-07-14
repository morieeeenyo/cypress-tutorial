describe('Footer', () => {
  context('With a single todo', () => {
    it.only('displays a singular todo in count', () => {
      cy.seedAndVisit([{id: 1, name: 'buy milk', isComplete: false}])
      cy.get('.todo-count')
      .should('contain', '1 todo left')

      
    });
  })
  
})
