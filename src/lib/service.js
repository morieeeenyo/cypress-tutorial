import axios from 'axios'

export const saveTodo = (todo) => 
  axios.post('/api/todos', todo)

export const loadTodos = () => 
  axios.get('/api/todos')