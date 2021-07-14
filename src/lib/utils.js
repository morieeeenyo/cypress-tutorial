export const filterTodos = (filter, todos) => filter 
  // filterがcompletedのときはtrue,activeのときはfalseのtodoを抽出
  ? todos.filter(todo => todo.isComplete ===  (filter === 'completed'))
  : todos