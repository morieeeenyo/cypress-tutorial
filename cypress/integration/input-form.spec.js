describe('Input form', () => {
  beforeEach(() => {
    // ルートパスにアクセス
    cy.seedAndVisit([])
  })

  it('focuses input on load', () => {
    // autofocusの検証
    cy.focused()
    .should('have.class', 'new-todo')
  });

  it('accepts input', () => {
    const typedText = 'Buy Milk'

    // フォームに入力したときのonChangeイベントの検証
    cy.get('.new-todo')
    .type(typedText)
    .should('have.value', typedText)    
  });

  context("Form submission", () => {
    beforeEach(() => {
      // サーバー側と通信した際の挙動をstubするときに使う
      cy.server()
    })

    it('Adds a new todo on submit', () => {
      const itemText = 'Buy eggs'

      // cy.serverでstubした通信処理を書き換えるときに使う。
      cy.route('POST', '/api/todos', {
        name: itemText,
        id: 1,
        isComplete: false
      })

      // フォームの入力欄がリセットされることを検証
      cy.get('.new-todo')
        .type('Buy eggs')
        .type('{enter}')
        .should('have.value', '')

      // todoが追加されるかの検証
      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', itemText)
    });

    it('Shows an error message on a failed submission', () => {
      // routeを設定してエラーを吐かせる
      cy.route({
        method: 'POST', 
        url: '/api/todos', 
        status: 500,
        response: {}
      })

      cy.get('.new-todo')
        .type('test{enter}')

      // todoが追加されていないこと
      cy.get('todo-list li')
        .should('not.exist')

      // エラーが発生していること
      cy.get('.error')
        .should('be.visible')
    })
  });
})
