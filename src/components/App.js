import React, { useState, useRef, useEffect } from 'react';
import uuidv4 from 'uuid/v4';
import '../styles/App.css';

import TodoList from './TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;
    todoNameRef.current.value = null;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className='container'>
      <div className='title'>
        <h1>Todos</h1>
      </div>
      <div className='form-control-group'>
        <input ref={todoNameRef} type='text' placeholder='Todo'></input>
        <div className='form-btns'>
          <button onClick={handleAddTodo}>Add Todo</button>
          <button onClick={handleClearTodos}>Clear Todo</button>
        </div>
        <div className='form-txt'>
          <span>{todos.filter(todo => !todo.complete).length}</span> left to do
        </div>
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
