import axios from 'axios'

export const saveTodo = (todo) => 
  axios.post('http://localhost:3001/api/todos', todo)

export const loadTodos = () => 
  axios.get('http://localhost:3001/api/todos')

export const destroyTodo = (id) => 
  axios.delete(`http://localhost:3001/api/todos/${id}`)