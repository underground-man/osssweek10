import React, { useState, useEffect } from 'react';
import ToDo from './ToDo';
import ToDoCount from './ToDoCount';
import ToDoForm from './ToDoForm';

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (localStorage.getItem('localToDos')) {
      const storedList = JSON.parse(localStorage.getItem('localToDos'));
      setTodos(storedList);
    }
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    localStorage.setItem('localToDos', JSON.stringify([todo, ...todos]));
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, isComplete: !todo.isComplete }
        : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem('localToDos', JSON.stringify(updatedTodos));
  };

  const removeTodo = (id) => {
    const deleted = [...todos].filter((todo) => todo.id !== id);
    setTodos(deleted);
    localStorage.setItem('localToDos', JSON.stringify(deleted));
  };

  const clearTodo = () => {
    setTodos([]);
    localStorage.removeItem('localToDos');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.isComplete;
    }

    if (filter === 'completed') {
      return todo.isComplete;
    }

    return true;
  });

  return (
    <div>
      <h1>학생 과제 관리</h1>
      <ToDoForm onSubmit={addTodo} clearTodo={clearTodo} />
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>
          전체
        </button>
        <button onClick={() => setFilter('active')}>
          진행 중
        </button>
        <button onClick={() => setFilter('completed')}>
          완료
        </button>
      </div>
      <ToDoCount todos={todos} />
      <ToDo
        todos={filteredTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    </div>
  );
}

export default ToDoList;
