describe('App initialization', () => {
  it('Loads todos on page load', () => {
    // fixtureで定義したtodo-listが表示されていること
    cy.seedAndVisit()
    cy.get('.todo-list li')
      .should('have.length', 4)

  })

  it('Displays an error on failure', () => {
    cy.server()
    // エラーをモックする
    cy.route({
      url: '/api/todos',
      method: 'GET',
      status: 500,
      response: {}
    })

    cy.visit('/')

    // todo-listが表示されていないこと
    cy.get('.todo-list li')
      .should('not.exist')

      // エラーが発生していること
    cy.get('.error')
      .should('be.visible')

  })
})
