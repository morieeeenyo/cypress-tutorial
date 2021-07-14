describe('Footer', () => {
  context('With a single todo', () => {
    it('displays a singular todo in count', () => {
      // 初期値を渡す
      cy.seedAndVisit([{id: 1, name: 'buy milk', isComplete: false}])
      // 1個しかtodoがないので単数形でテキストが表示される
      cy.get('.todo-count')
      .should('contain', '1 todo left')
    });
  })

  context('with multiple todos', () => {
    beforeEach(() => {
      cy.seedAndVisit()
    })

    it('displays plural todos in count', () => {
      // 複数のtodoがある場合は複数形で表示される
      cy.get('.todo-count')
      .should('contain', '3 todos left')
    })

    it('Filters todos', () => {
      // 事前にfilterを用意しておくことで後からの追加が用意
      const filters = [
        {link: 'Active', expectedLength: 3},
        {link: 'Completed', expectedLength: 1},
        {link: 'All', expectedLength: 4}
      ]

      // cy.eachはArrayには使えない。wrapを用いてオブジェクトにする
      cy.wrap(filters)
      .each(filter => {
        cy.contains(filter.link)
        .click()
        cy.get('.todo-list li')
        .should('have.length', filter.expectedLength)
      })
    });;
  })
})
