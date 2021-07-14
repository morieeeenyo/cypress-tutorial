import { listenerCount } from "cluster";

describe('List items', () => {
  beforeEach(() => {
    // カスタムコマンドでfixtureから値をセットしつつルートパスへ
    cy.seedAndVisit()
  })
  
  it('properly displayed completed items', () => {
    // completeになっているものの数と中身が一致しているか
    cy.get('.todo-list li')
    // todo-list liのうちcompletedクラスが付与された要素のみを抽出
    .filter('.completed')
    .should('have.length', 1)
    .and('contain', 'Eggs')
    // 子要素孫要素を取得する
    .find('.toggle')
    .should('be.checked')
  });

  it('Shows remining todos in the footer', () => {
    // 未完了のタスクの数が一致しているか
    cy.get('.todo-count')
    .should('contain', 3)
  });

  it('Removes a todo', () => {
    cy.route({
      url: '/api/todos/1',
      method: 'DELETE',
      status: 200,
      response: {}
    })

    // todo-list liをlistという名前で扱う
    cy.get('.todo-list li')
      .as('list')

    // @+asの中身で扱うことができる
    cy.get('@list')
      .first()
      .find('.destroy')
      // showメソッドを呼び出して強制的にdisplay: block;に変える
      .invoke('show')
      .click()

    // 削除後のリストアイテムの数と削除した要素が含まれていないことを検証
    cy.get('@list')
      .should('have.length', 3)
      .and('not.contain', 'Milk')
    
  });

  it('Marks an incomplete item complete', () => {
    cy.fixture('todos')
      .then(todos => {
        // リクエストヘッダにtodoの情報を乗っける
        const target = Cypress._.head(todos)
        cy.route(
          'PUT',
          `/api/todos/${target.id}`,
          Cypress._.merge(target, {isComplete: true})
        )
      })

      cy.get('.todo-list li')
        .first()
        .as('first-todo')

        // チェックボックスにチェックが入るかどうか検証
        cy.get('@first-todo')
        .find('.toggle')
        .click()
        .should('be.checked')

        // チェックしたリストアイテムがチェック完了状態になっているか
        cy.get('@first-todo')
        .should('have.class', 'completed')

        // 未完了のtodoの数を検証
        cy.get('.todo-count')
        .should('contain', 2)
    
  });
})
