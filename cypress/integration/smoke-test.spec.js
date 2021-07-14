describe('Smoke tests', () => {
  beforeEach(() => {
    // db.jsonに入っているtodoを取得して、全て削除する
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

      // ルートに対するエイリアスを定義
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

  context('With active todos', () => {
    beforeEach(() => {
      // fixtureからとってきたtodoをDBに保存
      cy.fixture('todos')
        .each(todo => {
        const newTodo = Cypress._.merge(todo, {isComplete: false})
        cy.request('POST', '/api/todos', newTodo)
      })
      cy.visit('/')
    })

    it('Loads existing data from the DB', () => {
      // 保存されたtodoが全て表示されていること
      cy.get('.todo-list li')
      .should('have.length', 4)
    });

    it('Delete todos', () => {
      cy.server()
      cy.route('DELETE', '/api/todos/*')
      .as('delete')

      // 保存済みのtodoを削除
      cy.get('.todo-list li')
      .each($el => {
        cy.wrap($el)
        .find('.destroy')
        .invoke('show')
        .click()
        cy.wait('@delete')
      })
      .should('not.exist')
    })

    it('Toggles todos', () => {
      // 保存済みのtodoのtoggleをクリックしてcheckする
      const clieckAndAwait = ($el) => {
        cy.wrap($el)
          .as('item')
          .find('.toggle')
          .click()

          cy.wait('@update')
      }

      cy.server()
      cy.route('PUT', '/api/todos/*')
      .as('update')

      // チェックされたtodoは完了済みになっている
      cy.get('.todo-list li')
      .each($el => {
        clieckAndAwait($el)

        cy.get('@item')
        .should('have.class', 'completed')
      })
      // もう一回toggleをクリックすると未完了になる
      .each($el => {
        clieckAndAwait($el)
        cy.get('@item')
        .should('not.have.class', 'completed')
      })
    });
  })
})
