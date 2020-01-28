import React from 'react';

import '../styles/Todo.css';

function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div className='todo'>
      <label>
        <input
          type='checkbox'
          checked={todo.complete}
          onChange={handleTodoClick}
          className='red'
        />
        <span>{todo.name}</span>
      </label>
    </div>
  );
}

export default Todo;
