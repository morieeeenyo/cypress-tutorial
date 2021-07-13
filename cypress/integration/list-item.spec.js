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

    cy.get('@list')
      .should('have.length', 3)
      .and('not.contain', 'Milk')
    
  });
})
