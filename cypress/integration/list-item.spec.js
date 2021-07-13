describe('List items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })
  
  it('properly displayed completed items', () => {
    cy.get('.todo-list li')
    .filter('.completed')
    .should('have.length', 1)
    .and('contain', 'Eggs')
    .find('.toggle')
    .should('be.checked')
  });

  it('Shows remining todos in the footer', () => {
    cy.get('.todo-count')
    .should('contain', 3)
    
    
  });
})
